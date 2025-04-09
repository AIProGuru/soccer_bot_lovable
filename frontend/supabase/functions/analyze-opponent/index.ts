
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { opponent, competition, venue } = await req.json();

    // Prepare the prompt for tactical analysis
    const prompt = `As an expert football analyst, provide tactical suggestions for playing against ${opponent} in a ${competition} match at ${venue}. Include:
    1. Recommended formation
    2. Play style and key tactical approaches
    3. Areas to focus on during the match
    Keep the response concise and actionable.`;

    // Call OpenAI API for tactical analysis
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
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
            content: 'You are an expert football analyst who provides tactical suggestions based on team analysis.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    const data = await response.json();
    const analysis = data.choices[0].message.content;

    // Parse the AI response into structured data
    // This is a simple parse - you might want to make it more robust
    const formation = analysis.match(/formation: ([0-9-]+)/i)?.[1] || "4-4-2";
    const playStyle = analysis.match(/style: ([^\n]+)/i)?.[1] || "Balanced";
    const focusArea = analysis.match(/focus: ([^\n]+)/i)?.[1] || "Overall game management";

    return new Response(
      JSON.stringify({
        suggestions: analysis,
        formation,
        playStyle,
        focusArea
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate tactical analysis' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
