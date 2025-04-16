import { useCallback } from "react";
import { supabase, getUserProfile } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { LoginCredentials, AuthResult } from "./types";
import { UserRole } from "@/utils/accessControl";

export function useAuthMethods(setUser: Function) {
  const navigate = useNavigate();
  const { toast } = useToast();

  const login = async (credentials: LoginCredentials): Promise<AuthResult> => {
    try {
      console.log("Attempting to log in with:", credentials.email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
      });
      
      if (error) {
        console.error("Supabase login error:", error);
        return {
          success: false,
          message: error.message
        };
      }
      
      console.log("Login successful, getting profile for:", data.user.id);
      const { profile, error: profileError } = await getUserProfile(data.user.id);
      
      if (profileError || !profile) {
        console.error("Profile error after login:", profileError);
        return {
          success: false,
          message: "Could not load user profile"
        };
      }
      
      if (credentials.rememberMe) {
        localStorage.setItem("weddingPlannerEmail", credentials.email);
        localStorage.setItem("weddingPlannerRememberMe", "true");
      } else {
        localStorage.removeItem("weddingPlannerEmail");
        localStorage.removeItem("weddingPlannerRememberMe");
      }
      
      console.log("Login complete with profile:", profile);
      return {
        success: true,
        user: profile
      };
    } catch (error) {
      console.error("Unexpected login error:", error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Login failed"
      };
    }
  };

  const loginWithProvider = async (provider: string): Promise<AuthResult> => {
    try {
      console.log("Attempting to log in with provider:", provider);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider as any,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (error || !data) {
        console.error("Social login error:", error);
        return {
          success: false,
          message: error?.message || "Social login failed"
        };
      }
      
      console.log("Social auth initiated successfully");
      return { success: true };
    } catch (error) {
      console.error("Unexpected social login error:", error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Social login failed"
      };
    }
  };

  const logout = useCallback(async () => {
    console.log("Logging out...");
    
    try {
      // Déconnexion de Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Error signing out from Supabase:", error);
        throw error;
      }
      
      // Nettoyage des données utilisateur en local
      setUser(null);
      
      // Nettoyage des données stockées localement
      localStorage.removeItem("weddingPlannerEmail");
      localStorage.removeItem("weddingPlannerRememberMe");
      localStorage.removeItem("2fa_enabled");
      
      console.log("Logout successful, navigating to login page");
      navigate("/login", { replace: true });
      
      // Le toast sera affiché par le composant LogoutButton
    } catch (error) {
      console.error("Error during logout:", error);
      throw error;
    }
  }, [navigate, setUser]);

  const register = async (userData: { email: string; password: string; role?: UserRole; name?: string }): Promise<AuthResult> => {
    try {
      console.log("Registering new user:", userData.email);
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            name: userData.name,
            role: userData.role || UserRole.CLIENT
          }
        }
      });
      
      if (error) {
        console.error("Registration error:", error);
        return {
          success: false,
          message: error.message
        };
      }
      
      if (!data.user) {
        console.error("Registration failed - no user returned");
        return {
          success: false,
          message: "Registration failed"
        };
      }

      if (data?.user && !data?.session) {
        console.log("Registration successful, email confirmation required");
        return {
          success: true,
          message: "Registration successful. Please check your email for confirmation."
        };
      }

      console.log("Registration with auto-confirmation successful");
      const { profile } = await getUserProfile(data.user.id);
      
      return {
        success: true,
        user: profile || undefined,
        message: "Registration successful. You are now logged in."
      };
    } catch (error) {
      console.error("Unexpected registration error:", error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Registration failed"
      };
    }
  };

  return {
    login,
    loginWithProvider,
    logout,
    register
  };
}
