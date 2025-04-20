
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { LoginCredentials, AuthResult } from "../types";

export function useLoginMethods(setUser: Function) {
  const login = async (credentials: LoginCredentials): Promise<AuthResult> => {
    try {
      console.log("Attempting to log in with:", credentials.email);
      
      // Vérification des comptes de démonstration spécifiques (pour maintenir la compatibilité)
      if (credentials.email.includes("admin@") || credentials.email.includes("partner@") || credentials.email.includes("client@")) {
        if (credentials.password !== "password123") {
          return {
            success: false,
            message: "Mot de passe incorrect pour le compte de démonstration"
          };
        }
        
        console.log("Using demo login for:", credentials.email);
        
        let role = "client";
        if (credentials.email.includes("admin@")) {
          role = "admin";
        } else if (credentials.email.includes("partner@")) {
          role = "partner";
        }
        
        const demoUser = {
          id: `demo-${Date.now()}`,
          email: credentials.email,
          name: `Demo ${role.charAt(0).toUpperCase() + role.slice(1)}`,
          avatar_url: null,
          role: role.toUpperCase(),
          user_metadata: { role: role.toUpperCase() },
          partner_type: null,
          phone: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        // Stocker ces informations uniquement pour les comptes de démonstration
        if (credentials.rememberMe) {
          localStorage.setItem("weddingPlannerEmail", credentials.email);
          localStorage.setItem("weddingPlannerRememberMe", "true");
        }
        
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setUser(demoUser);
        
        return {
          success: true,
          user: demoUser
        };
      }
      
      // Utilisation de l'authentification Supabase
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
      
      // Récupération du profil utilisateur (si disponible)
      let profile = data.user;
      
      try {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();
          
        if (!profileError && profileData) {
          console.log("Profile found:", profileData);
          // Fusionner les données du profil avec l'utilisateur
          profile = { ...data.user, ...profileData };
        }
      } catch (e) {
        console.error("Error fetching profile:", e);
      }
      
      // Pour la compatibilité avec les comptes de démonstration, on utilise toujours localStorage
      // mais uniquement pour l'email
      if (credentials.rememberMe) {
        localStorage.setItem("weddingPlannerEmail", credentials.email);
        localStorage.setItem("weddingPlannerRememberMe", "true");
      } else {
        localStorage.removeItem("weddingPlannerEmail");
        localStorage.removeItem("weddingPlannerRememberMe");
      }
      
      setUser(profile);
      
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

  return {
    login,
    loginWithProvider
  };
}
