
// Import the supabase client from our integrations folder
import { supabase } from "@/integrations/supabase/client";

// Add proper types for auth user
export type Profile = {
  id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  role: string;
  partner_type?: string | null; // Keep the snake_case naming for DB consistency
  phone?: string | null;
  created_at: string;
}

// Auth helper functions
export const getSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    return { session: data.session, error };
  } catch (e) {
    console.error('Error getting session:', e);
    return { session: null, error: e };
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    return { profile: data as Profile | null, error };
  } catch (e) {
    console.error('Error getting user profile:', e);
    return { profile: null, error: e };
  }
};

export const signOut = async () => {
  return await supabase.auth.signOut();
};

// Re-export supabase for backward compatibility
export { supabase };
