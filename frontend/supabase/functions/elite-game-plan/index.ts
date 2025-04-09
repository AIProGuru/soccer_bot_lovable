
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
    const { teamName } = await req.json();
    
    if (!teamName || !teamName.trim()) {
      return new Response(JSON.stringify({ error: 'Team name is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Generating elite game plan for team: ${teamName}`);

    // Request game plan
    const gamePlanResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an elite football coach with years of professional experience. When asked for a game plan, provide an advanced strategy to win, elite tactical advice, opponent-specific counter strategies, key player instructions, and training recommendations.' },
          { role: 'user', content: `Coach, I need an elite game plan to defeat ${teamName}. Provide advanced tactical strategies, key adjustments, pressing style, counter-attacking setups, set-piece routines, and in-game adjustments.` }
        ],
      }),
    });

    const gamePlanData = await gamePlanResponse.json();
    
    // Request match scenario
    const scenarioResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an elite football coach providing strategic adjustments for different match scenarios.' },
          { role: 'user', content: `Coach, give me match scenario strategies for playing against ${teamName}. Provide adjustments for when leading, losing, and tied situations.` }
        ],
      }),
    });

    const scenarioData = await scenarioResponse.json();

    return new Response(JSON.stringify({
      gamePlan: gamePlanData.choices?.[0]?.message?.content || "Failed to generate game plan",
      matchScenario: scenarioData.choices?.[0]?.message?.content || "Failed to generate match scenarios"
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in elite-game-plan function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
