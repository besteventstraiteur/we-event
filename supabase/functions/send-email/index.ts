
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { to, subject, html } = await req.json()

    // Log the incoming request for debugging
    console.log('Email request received:', { to, subject })

    // For now, just simulate sending an email
    // We'll implement actual email sending later when we integrate an email service
    console.log('Would send email to:', to)
    console.log('Subject:', subject)
    console.log('Content:', html)

    return new Response(
      JSON.stringify({ success: true, message: 'Email scheduled for delivery' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error in send-email function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
