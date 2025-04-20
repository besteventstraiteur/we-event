
import { useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { UserRole } from "@/utils/accessControl";
import { User } from "@supabase/supabase-js";
import { AuthResult } from "./types/authContext.types";

export function useAuthMethods() {
  const navigate = useNavigate();

  const login = async (credentials: { email: string; password: string; rememberMe?: boolean }): Promise<AuthResult> => {
    try {
      const { email, password } = credentials;
      console.log("Login attempt with:", email);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      
      if (credentials.rememberMe) {
        localStorage.setItem("weddingPlannerEmail", email);
        localStorage.setItem("weddingPlannerRememberMe", "true");
      } else {
        localStorage.removeItem("weddingPlannerEmail");
        localStorage.removeItem("weddingPlannerRememberMe");
      }

      return { success: true, user: data.user as any };
    } catch (error: any) {
      console.error("Login error:", error);
      return { success: false, message: error.message || 'Erreur de connexion' };
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem("weddingPlannerEmail");
      localStorage.removeItem("weddingPlannerRememberMe");
      await supabase.auth.signOut();
      navigate('/login', { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const loginWithProvider = async (provider: "google" | "facebook" | "github"): Promise<AuthResult> => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) throw error;
      return { success: true, data };
    } catch (error: any) {
      console.error("Social login error:", error);
      return { success: false, message: error.message || 'Erreur de connexion sociale' };
    }
  };

  const register = async (userData: { 
    email: string; 
    password: string; 
    role?: UserRole; 
    name?: string 
  }): Promise<AuthResult> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            role: userData.role || UserRole.CLIENT,
            name: userData.name
          }
        }
      });
      
      if (error) throw error;
      return { success: true, user: data.user as any };
    } catch (error: any) {
      console.error("Registration error:", error);
      return { success: false, message: error.message || 'Erreur d\'inscription' };
    }
  };

  return { login, logout, loginWithProvider, register };
}
