
import { createClient } from '@supabase/supabase-js';

// Supabase configuration using the environment variables
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Add proper types for auth user
export type Profile = {
  id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  role: string;
  partner_type?: string | null;
  phone?: string | null;
  created_at: string;
}

// Auth helper functions
export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  return { session: data.session, error };
};

export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  return { profile: data as Profile | null, error };
};

export const signOut = async () => {
  return await supabase.auth.signOut();
};
