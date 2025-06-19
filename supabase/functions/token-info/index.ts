// This edge function fetches detailed token information from CoinMarketCap API

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    // Only accept POST requests
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      });
    }

    // Parse the request body
    const body = await req.json();
    const { apiKey, id } = body;

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "API key is required" }), {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      });
    }

    if (!id) {
      return new Response(JSON.stringify({ error: "Token ID is required" }), {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      });
    }

    // Make two requests concurrently: one for token info, one for latest market data
    const infoUrl = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?id=${id}`;
    const priceUrl = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=${id}`;
    
    console.log(`Fetching token info from: ${infoUrl}`);
    console.log(`Fetching token price data from: ${priceUrl}`);
    
    // Execute both requests in parallel
    const [infoResponse, priceResponse] = await Promise.all([
      fetch(infoUrl, {
        headers: {
          "X-CMC_PRO_API_KEY": apiKey,
          "Accept": "application/json",
        },
      }),
      fetch(priceUrl, {
        headers: {
          "X-CMC_PRO_API_KEY": apiKey,
          "Accept": "application/json",
        },
      })
    ]);

    // Check for errors in the info response
    if (!infoResponse.ok) {
      const errorText = await infoResponse.text();
      console.error(`CoinMarketCap Info API error (${infoResponse.status}): ${errorText}`);
      
      return new Response(
        JSON.stringify({
          error: `CoinMarketCap API error: ${infoResponse.status} ${infoResponse.statusText}`,
        }),
        {
          status: infoResponse.status,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }
    
    // Check for errors in the price response
    if (!priceResponse.ok) {
      const errorText = await priceResponse.text();
      console.error(`CoinMarketCap Price API error (${priceResponse.status}): ${errorText}`);
      
      // Continue with just the info data if price data fails
      console.log("Continuing with just info data since price data failed");
    }

    // Parse both responses
    const infoData = await infoResponse.json();
    let priceData = null;
    
    try {
      if (priceResponse.ok) {
        priceData = await priceResponse.json();
      }
    } catch (e) {
      console.error("Error parsing price data:", e);
    }
    
    // Merge the data
    const mergedData = { ...infoData };
    
    // If we have price data, add the market cap and rank to the info data
    if (priceData?.data && priceData.data[id]) {
      const tokenData = priceData.data[id];
      
      // For each token in the infoData, add market cap and rank if available
      if (mergedData.data && mergedData.data[id]) {
        mergedData.data[id].market_cap = tokenData.quote?.USD?.market_cap;
        mergedData.data[id].cmc_rank = tokenData.cmc_rank;
        mergedData.data[id].quote = tokenData.quote;
      }
    }

    // Return the merged response
    return new Response(JSON.stringify(mergedData), {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error in token-info edge function:", error);

    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});