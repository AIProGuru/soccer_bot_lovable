
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'
import { OpenAI } from 'https://esm.sh/openai@4.26.0'

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Create OpenAI client
const openai = new OpenAI({
  apiKey: Deno.env.get('OPENAI_API_KEY')
})

// Create Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
const supabase = createClient(supabaseUrl, supabaseKey)

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Parse request body
    const { userQuery, tactics, previousMessages, aiSuggestions, matchDetails, keyTacticalPrinciples } = await req.json()
    
    // Input validation
    if (!userQuery) {
      return new Response(
        JSON.stringify({ error: 'Missing user query' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('Processing tactical follow-up for:', { tactics, matchDetails, keyTacticalPrinciples })

    // Format previous messages for the chat completion
    const messages = previousMessages.map(msg => ({
      role: msg.role,
      content: msg.content
    }))

    // Add the new user query
    messages.push({ role: 'user', content: userQuery })

    // Generate the system message with tactical context
    const systemMessage = `
You are an elite football coach providing tactical advice based on a specific game plan. Use the context below to inform your responses.

TACTICAL SETUP:
- Formation: ${tactics.formation || 'Not specified'}
- Play Style: ${tactics.playStyle || 'Not specified'}
- Team Mentality: ${tactics.defensiveStrategy || 'Not specified'}
- Opponent/Player Notes: ${tactics.playerNotes || 'Not specified'}
- Key Tactical Principles: ${keyTacticalPrinciples ? keyTacticalPrinciples : 'Not specified'}

PREVIOUS AI RECOMMENDATIONS:
${aiSuggestions || 'No previous recommendations available'}

Provide specific, actionable tactical advice that directly relates to the user's question. Include:
- Specific player positioning and movements based on the formation
- Specific tactical adjustments that match the play style
- Concrete examples from professional football when relevant
- Clear diagrams using text characters if it helps explain positioning

Your advice should be highly specific, technically sophisticated, and directly tied to their tactical approach. Do not be generic - your advice should feel tailored to their exact tactical approach.
`

    // Call OpenAI API
    console.log('Calling OpenAI API...')
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemMessage },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 1000
    })

    // Extract the AI response
    const aiResponse = completion.choices[0].message.content
    
    console.log('AI response generated successfully')

    // Return the response
    return new Response(
      JSON.stringify({
        success: true,
        response: aiResponse
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
    
  } catch (error) {
    console.error('Error generating tactical advice:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate tactical advice',
        details: error.message 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
