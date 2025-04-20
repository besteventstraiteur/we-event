
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders
    })
  }

  try {
    // Créer un client Supabase avec la clé service_role
    const supabaseAdmin = createClient(
      'https://awraiakbiahrzncoeyya.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3cmFpYWtiaWFocnpuY29leXlhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NDUyNjA5NSwiZXhwIjoyMDYwMTAyMDk1fQ.zv_EFVgpErGQ0xrGFtTGsPB3JClFirXGGKsyIOtoR9w',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    const adminId = '652a8108-9a3f-4fe7-8964-fb87fe001bd3'
    
    // Mettre à jour les métadonnées de l'utilisateur
    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
      adminId,
      { user_metadata: { role: 'ADMIN' } }
    )

    if (error) {
      throw error
    }

    // Mettre à jour aussi la table profiles
    await supabaseAdmin.from('profiles')
      .update({ role: 'ADMIN' })
      .eq('id', adminId)

    return new Response(
      JSON.stringify({ 
        message: 'Admin user updated successfully',
        user: data.user 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
})
