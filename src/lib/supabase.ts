
import { createClient } from '@supabase/supabase-js';

// Get the environment variables - using import.meta.env to access Vite environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if the environment variables are defined
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Using placeholder Supabase credentials. Authentication and database features will not work until proper credentials are provided.');
}

// Create the Supabase client with proper error handling
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

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
