
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      drillName, 
      duration, 
      ageGroup, 
      trainingFocus, 
      playerCount, 
      physicalIntensity,
      trainingStyle,
      notes 
    } = await req.json();

    console.log("Received request with data:", { 
      drillName, 
      duration, 
      ageGroup, 
      trainingFocus, 
      playerCount, 
      physicalIntensity,
      trainingStyle
    });

    // Build a detailed prompt based on the provided data
    const prompt = `Create a detailed football training session plan with the following details:

Drill Name: ${drillName}
Duration: ${duration} minutes
Age Group: ${ageGroup}
Training Focus: ${trainingFocus || trainingStyle}
Number of Players: ${playerCount}
Physical Intensity: ${physicalIntensity}
Training Style: ${trainingStyle}
Additional Notes: ${notes || "None provided"}

The plan should include:
1. A 5-10 minute warm-up routine specific to this training focus
2. 2-3 main drills or exercises with clear instructions
3. A cool-down activity
4. Coaching points and key technical elements to focus on
5. Equipment needed
6. Space/pitch setup recommendations

Use professional football coaching terminology and be specific with timings for each section.`;

    if (!openAIApiKey) {
      console.error("OpenAI API key is not set");
      return new Response(
        JSON.stringify({ 
          error: "OpenAI API key is not configured",
          training_plan: "AI-generated plan could not be created because the OpenAI API key is not configured." 
        }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'You are an experienced football coach who creates detailed, practical training session plans.' 
          },
          { role: 'user', content: prompt }
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("OpenAI API error:", error);
      throw new Error(`OpenAI API error: ${JSON.stringify(error)}`);
    }

    const data = await response.json();
    const training_plan = data.choices[0].message.content;

    console.log("Successfully generated training plan");

    return new Response(
      JSON.stringify({ training_plan }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in generate-training-plan function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        training_plan: "An error occurred while generating the training plan. Please try again later." 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
