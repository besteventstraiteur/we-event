import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { LoginCredentials, AuthResult } from "../types";
import { UserRole } from "@/utils/accessControl";

export function useLoginMethods(setUser: Function) {
  const login = async (credentials: LoginCredentials): Promise<AuthResult> => {
    try {
      console.log("Attempting to log in with:", credentials.email);
      
      // Vérification des comptes de démonstration spécifiques
      if (credentials.email.includes("admin@") || credentials.email.includes("partner@") || credentials.email.includes("client@")) {
        if (credentials.password !== "password123") {
          return {
            success: false,
            message: "Mot de passe incorrect pour le compte de démonstration"
          };
        }
        
        console.log("Using demo login for:", credentials.email);
        
        let role = "CLIENT";
        if (credentials.email.includes("admin@")) {
          role = "ADMIN";
        } else if (credentials.email.includes("partner@")) {
          role = "PARTNER";
        }
        
        // Créer un utilisateur de démonstration avec toutes les propriétés nécessaires
        const demoUser = {
          id: `demo-${Date.now()}`,
          email: credentials.email,
          name: `Demo ${role.charAt(0).toUpperCase() + role.slice(1)}`,
          avatar_url: null,
          role: role,
          user_metadata: { 
            role: role,
            partner_type: credentials.email.includes("partner@") ? "GENERAL" : null
          },
          partner_type: credentials.email.includes("partner@") ? "GENERAL" : null,
          phone: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        // Stocker ces informations uniquement pour les comptes de démonstration
        if (credentials.rememberMe) {
          localStorage.setItem("weddingPlannerEmail", credentials.email);
          localStorage.setItem("weddingPlannerRememberMe", "true");
        }
        
        // Simuler une latence réseau pour le réalisme
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Stocker dans localStorage pour persister après rafraîchissement
        localStorage.setItem("currentUser", JSON.stringify(demoUser));
        
        setUser(demoUser);
        
        return {
          success: true,
          user: demoUser
        };
      }
      
      // Utilisation de l'authentification Supabase pour les comptes non-démo
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
      
      // Create a base profile with all required fields from the auth user
      let profile: Profile = {
        id: data.user.id,
        email: data.user.email || '',
        name: data.user.user_metadata?.name || null,
        avatar_url: data.user.user_metadata?.avatar_url || null,
        role: data.user.user_metadata?.role || 'CLIENT',
        partner_type: data.user.user_metadata?.partner_type || null,
        phone: data.user.user_metadata?.phone || null,
        created_at: data.user.created_at || new Date().toISOString(),
        updated_at: data.user.updated_at || new Date().toISOString()
      };
      
      try {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();
          
        if (!profileError && profileData) {
          console.log("Profile found:", profileData);
          // Merge profile data with our base profile
          profile = { ...profile, ...profileData };
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
