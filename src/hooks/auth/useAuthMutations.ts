
import { supabase } from '@/lib/supabase';
import { AuthError } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase-db';

type Profile = Database['public']['Tables']['profiles']['Row'];

export const useAuthMutations = () => {
  const registerClient = async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.firstName,
            last_name: data.lastName
          }
        }
      });

      if (error) throw error;
      return { data: authData, error: null };
    } catch (e) {
      const error = e as AuthError;
      return { data: null, error };
    }
  };

  const registerPartner = async (data: {
    email: string;
    password: string;
    companyName: string;
    category: string;
  }) => {
    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            company_name: data.companyName,
            category: data.category,
            role: 'PARTNER'
          }
        }
      });

      if (error) throw error;
      return { data: authData, error: null };
    } catch (e) {
      const error = e as AuthError;
      return { data: null, error };
    }
  };

  return {
    registerClient,
    registerPartner
  };
};
