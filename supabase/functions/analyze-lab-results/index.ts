
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const mistralApiKey = Deno.env.get('MISTRAL_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

if (!mistralApiKey) {
  console.error('MISTRAL_API_KEY is not set');
}

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set');
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the JWT token from the Authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.error('No Authorization header provided');
      throw new Error('No Authorization header provided');
    }

    // Parse the request body
    let body;
    try {
      body = await req.json();
    } catch (error) {
      console.error('Error parsing request body:', error);
      throw new Error('Invalid request body');
    }
    
    const { labResult } = body;
    if (!labResult) {
      console.error('Missing labResult in request body');
      throw new Error('Missing labResult in request body');
    }

    console.log('Received lab result for analysis:', JSON.stringify(labResult));

    // Validate that the required fields are present
    if (!labResult.id || !labResult.results || !labResult.created_by) {
      console.error('Invalid lab result data:', labResult);
      throw new Error('Invalid lab result data. Missing required fields.');
    }

    // Make request to Mistral API
    console.log('Making request to Mistral API');
    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${mistralApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mistral-small',
        messages: [
          {
            role: 'system',
            content: 'You are a medical lab results analyzer. Analyze the lab results and provide a summary, recommendations, and highlight concerning values. Return the response in JSON format with the following structure: { summary: string, recommendations: string[], interpretation: { concerning_values: Array<{test_name: string, value: string, implication: string}>, normal_values: string[] } }'
          },
          {
            role: 'user',
            content: `Please analyze these lab results: ${JSON.stringify(labResult)}`
          }
        ],
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Mistral API error:', response.status, response.statusText, errorText);
      throw new Error(`Failed to analyze results with Mistral AI: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Received Mistral AI response:', data);
    
    let interpretation;
    try {
      interpretation = JSON.parse(data.choices[0].message.content);
    } catch (error) {
      console.error('Error parsing Mistral AI response:', error);
      throw new Error('Failed to parse AI response');
    }

    // Create supabase client with service role key
    const supabase = createClient(supabaseUrl ?? '', supabaseServiceKey ?? '');

    // Save interpretation to database
    console.log('Saving interpretation to database');
    const { error } = await supabase
      .from('report_interpretations')
      .insert({
        lab_result_id: labResult.id,
        interpretation: interpretation.interpretation,
        recommendations: interpretation.recommendations,
        summary: interpretation.summary,
        created_by: labResult.created_by,
      });

    if (error) {
      console.error('Error saving interpretation to database:', error);
      throw error;
    }

    console.log('Successfully saved interpretation to database');

    return new Response(JSON.stringify(interpretation), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in analyze-lab-results function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
