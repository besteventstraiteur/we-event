
import { supabase } from '@/lib/supabase';
import { AUTH_CONSTANTS } from '@/config/auth.config';
import type { AuthResult } from '@/types/auth';
import type { UserRole } from '@/utils/accessControl';

export const supabaseAuth = {
  async signInWithEmail(email: string, password: string): Promise<AuthResult> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      return {
        success: true,
        user: data.user,
        token: data.session?.access_token
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || AUTH_CONSTANTS.MESSAGES.LOGIN.ERROR
      };
    }
  },

  async signInWithProvider(provider: 'google' | 'facebook' | 'github'): Promise<AuthResult> {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}${AUTH_CONSTANTS.ROUTES.AUTH_CALLBACK}`
        }
      });

      if (error) throw error;

      return { 
        success: true, 
        data 
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || `Échec de l'authentification avec ${provider}`
      };
    }
  },

  async signOut(): Promise<void> {
    await supabase.auth.signOut();
  },

  async signUp(email: string, password: string, metadata?: { role?: UserRole; name?: string }) {
    return supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    });
  }
};

