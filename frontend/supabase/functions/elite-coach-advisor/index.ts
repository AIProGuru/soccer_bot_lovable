
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
    const { messages } = await req.json();
    
    // Prepare messages with the system prompt
    const systemPrompt = {
      role: "system",
      content: `You are an Elite Football Coach Advisor with extensive knowledge of football tactics, training methods, and match preparation. 
      
You have expertise in:
- Modern football formations and tactical trends
- Training methods for different age groups and skill levels
- Match analysis and opponent scouting
- Player development strategies
- Team management and motivation techniques
- Set-piece design and execution
- Physical conditioning and injury prevention

When giving advice:
- Be specific and practical
- Use football terminology correctly
- Consider the context of the question
- Provide examples when relevant
- Focus on actionable recommendations

Respond in a professional but approachable coaching style. Your goal is to help improve the user's coaching abilities through expert advice and guidance.`
    };
    
    const conversation = [systemPrompt, ...messages];
    
    console.log("Sending conversation to OpenAI:", JSON.stringify(conversation));
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: conversation,
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    const data = await response.json();
    console.log("OpenAI response:", JSON.stringify(data));
    
    if (data.error) {
      throw new Error(`OpenAI API error: ${data.error.message}`);
    }

    const generatedResponse = data.choices[0].message.content;

    return new Response(JSON.stringify({ response: generatedResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in elite-coach-advisor function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
