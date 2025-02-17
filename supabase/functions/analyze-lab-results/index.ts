
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TestResult {
  testName: string;
  value: number;
  unit: string;
  referenceRange: {
    min: number;
    max: number;
  };
  status: 'normal' | 'abnormal' | 'pending';
}

interface LabResult {
  patientName: string;
  patientId: string;
  date: Date;
  results: TestResult[];
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { labResult, labResultId } = await req.json() as { labResult: LabResult; labResultId: string };

    // Create prompt for GPT
    const prompt = `Analyze the following lab test results for patient ${labResult.patientName} (ID: ${labResult.patientId}):

${labResult.results.map(test => `
Test: ${test.testName}
Value: ${test.value} ${test.unit}
Reference Range: ${test.referenceRange.min} - ${test.referenceRange.max} ${test.unit}
Status: ${test.status}
`).join('\n')}

Please provide:
1. A brief summary of the overall results
2. List any concerning values and possible implications
3. General health recommendations based on these results
Format the response as JSON with the following structure:
{
  "summary": "overall summary",
  "recommendations": ["recommendation1", "recommendation2", ...],
  "interpretation": {
    "concerning_values": [{
      "test_name": "name",
      "value": "value",
      "implication": "what this might mean"
    }],
    "normal_values": ["test1", "test2"]
  }
}`;

    // Call OpenAI API
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a medical lab assistant AI that helps interpret lab results. Provide clear, professional analysis while noting that these are general interpretations and patients should consult healthcare providers for specific medical advice.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    });

    if (!openAIResponse.ok) {
      throw new Error('Failed to get AI interpretation');
    }

    const aiData = await openAIResponse.json();
    const interpretation = JSON.parse(aiData.choices[0].message.content);

    // Store interpretation in Supabase
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { error: insertError } = await supabase
      .from('report_interpretations')
      .insert({
        lab_result_id: labResultId,
        summary: interpretation.summary,
        recommendations: interpretation.recommendations,
        interpretation: interpretation.interpretation,
        created_by: (await req.json()).userId,
      });

    if (insertError) {
      throw insertError;
    }

    return new Response(
      JSON.stringify(interpretation),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    console.error('Error in analyze-lab-results function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }
});
