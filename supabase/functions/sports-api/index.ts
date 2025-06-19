// This edge function proxies requests to various sports APIs

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
    let body;
    try {
      body = await req.json();
    } catch (e) {
      console.error("Error parsing request body:", e);
      return new Response(JSON.stringify({ error: "Invalid JSON in request body" }), {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      });
    }

    const { endpoint, params, sportId, apiKey } = body;

    if (!endpoint) {
      return new Response(JSON.stringify({ error: "Endpoint is required" }), {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      });
    }

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "API key is required" }), {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      });
    }

    if (!sportId) {
      return new Response(JSON.stringify({ error: "Sport ID is required" }), {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      });
    }

    // Select the appropriate base URL based on the sport
    let baseUrl: string;
    switch (sportId) {
      case 'soccer':
        baseUrl = 'https://v3.football.api-sports.io';
        break;
      case 'basketball':
        baseUrl = 'https://v1.basketball.api-sports.io';
        break;
      case 'baseball':
        baseUrl = 'https://v1.baseball.api-sports.io';
        break;
      case 'american-football':
        baseUrl = 'https://v1.american-football.api-sports.io';
        break;
      case 'hockey':
        baseUrl = 'https://v1.hockey.api-sports.io';
        break;
      case 'mma':
        baseUrl = 'https://v1.mma.api-sports.io';
        break;
      default:
        baseUrl = 'https://v3.football.api-sports.io'; // Default to football API
    }

    // Construct the URL with query parameters
    let url = `${baseUrl}/${endpoint}`;
    if (params) {
      const queryParams = new URLSearchParams();
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value));
        }
      }
      const queryString = queryParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    console.log(`Making request to: ${url}`);

    // Set a timeout for the fetch operation
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
    
    try {
      // Make request to the sports API
      const response = await fetch(url, {
        headers: {
          "x-apisports-key": apiKey,
          "Accept": "application/json",
        },
        signal: controller.signal
      });
      
      // Clear timeout
      clearTimeout(timeoutId);

      // Check for errors
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Sports API error (${response.status}): ${errorText}`);
        
        return new Response(
          JSON.stringify({
            error: `Sports API error: ${response.status} ${response.statusText}`,
          }),
          {
            status: response.status,
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json",
            },
          }
        );
      }

      // Get the response data
      const data = await response.json();
      
      // Log the response status
      console.log(`Response from sports API: status ${response.status}, data length: ${JSON.stringify(data).length}`);

      // Return the response
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      });
    } catch (fetchError) {
      // Clear timeout
      clearTimeout(timeoutId);
      
      // Handle timeout errors specifically
      if (fetchError.name === 'AbortError') {
        console.error(`Request timeout exceeded for URL: ${url}`);
        return new Response(
          JSON.stringify({
            error: "Request timed out after 15 seconds",
          }),
          {
            status: 504, // Gateway Timeout
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json",
            },
          }
        );
      }
      
      // For baseball, return mock data in case of errors to prevent UI breakage
      if (sportId === 'baseball' && endpoint === 'teams' && params?.id) {
        console.log(`Returning fallback data for baseball team ID ${params.id}`);
        return new Response(
          JSON.stringify({
            response: [{
              id: params.id,
              name: `Team #${params.id}`,
              logo: '',
              country: 'USA'
            }]
          }),
          {
            status: 200,
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json",
            },
          }
        );
      }
      
      throw fetchError;
    }
  } catch (error) {
    console.error("Error in sports-api edge function:", error);

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