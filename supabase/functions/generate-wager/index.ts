// This edge function generates crypto wagers using OpenAI API

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
    const { prompt, resolvedToken, apiKey } = body;

    if (!prompt) {
      return new Response(JSON.stringify({ error: "Prompt is required" }), {
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

    // Construct the message for OpenAI
    let systemPrompt = `You are a crypto prediction market assistant. Extract the key details from a user's crypto wager prompt 
                      and return a structured JSON with the following fields:
                      - title: A clear, concise title for the wager
                      - description: Expanded details about the prediction
                      - deadline: When the prediction needs to be resolved (date)
                      - resolutionMethod: How the outcome will be determined (e.g., CoinMarketCap price data)
                      - condition: '>=' for price increase predictions, '<=' for price decrease predictions
                      - priceTarget: The target price mentioned in the prediction (numeric, without $ sign)`;
    
    // If we have resolved a token, include that in the system prompt
    if (resolvedToken) {
      systemPrompt += `\n\nThe user is referring to ${resolvedToken.name} (${resolvedToken.symbol}) with CMC ID ${resolvedToken.id}. 
                      Include these details in your response:
                      - cmcId: ${resolvedToken.id}
                      - name: "${resolvedToken.name}"
                      - symbol: "${resolvedToken.symbol}"
                      - slug: "${resolvedToken.slug}"`;
    }
                     
    systemPrompt += `\n\nFormat your response ONLY as valid JSON without any additional text.`;
    
    console.log('Making OpenAI API request with secure key');
    
    // Make request to OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    // Check for errors
    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      
      return new Response(
        JSON.stringify({
          error: errorData.error?.message || 'Failed to generate wager'
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
    const wagerData = data.choices[0].message.content;
    
    // Return the wager data with a timestamp
    return new Response(
      JSON.stringify({
        id: Date.now().toString(),
        ...JSON.parse(wagerData)
      }), 
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error in generate-wager edge function:", error);

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