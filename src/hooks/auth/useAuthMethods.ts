
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
      
      // Pour la démo, permettre des connexions de test avec des emails spécifiques
      if (credentials.email.includes("admin@") || credentials.email.includes("partner@") || credentials.email.includes("client@")) {
        console.log("Using demo login for:", credentials.email);
        
        // Déterminer le rôle basé sur l'email
        let role = "client";
        if (credentials.email.includes("admin@")) {
          role = "admin";
        } else if (credentials.email.includes("partner@")) {
          role = "partner";
        }
        
        // Créer un profil utilisateur simulé pour la démo
        const demoUser = {
          id: `demo-${Date.now()}`,
          email: credentials.email,
          name: `Demo ${role.charAt(0).toUpperCase() + role.slice(1)}`,
          avatar_url: null,
          role: role,
          created_at: new Date().toISOString()
        };
        
        // Stocker les infos de connexion si "se souvenir de moi" est activé
        if (credentials.rememberMe) {
          localStorage.setItem("weddingPlannerEmail", credentials.email);
          localStorage.setItem("weddingPlannerRememberMe", "true");
        }
        
        // Simuler un délai de connexion
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Définir l'utilisateur dans le contexte d'authentification
        setUser(demoUser);
        
        return {
          success: true,
          user: demoUser
        };
      }
      
      // Authentification réelle avec Supabase si ce n'est pas un compte de démo
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
      // Nettoyer les données utilisateur en local d'abord
      setUser(null);
      
      // Nettoyer les données stockées localement
      localStorage.removeItem("weddingPlannerEmail");
      localStorage.removeItem("weddingPlannerRememberMe");
      localStorage.removeItem("2fa_enabled");
      
      // Déconnexion de Supabase ensuite
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Error signing out from Supabase:", error);
        throw error;
      }
      
      console.log("Logout successful, navigating to login page");
      
      // Le toast sera affiché par le composant LogoutButton
      
      // Important: navigation après toutes les opérations de nettoyage
      navigate("/login", { replace: true });
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
