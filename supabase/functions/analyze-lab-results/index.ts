
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const mistralApiKey = Deno.env.get('MISTRAL_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { labResult } = await req.json();

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
      const errorData = await response.json();
      console.error('Mistral API error:', errorData);
      throw new Error('Failed to analyze results with Mistral AI');
    }

    const data = await response.json();
    const interpretation = JSON.parse(data.choices[0].message.content);

    // Save interpretation to database
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { error } = await supabase
      .from('report_interpretations')
      .insert({
        lab_result_id: labResult.id,
        interpretation: interpretation.interpretation,
        recommendations: interpretation.recommendations,
        summary: interpretation.summary,
        created_by: labResult.created_by,
      });

    if (error) throw error;

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
