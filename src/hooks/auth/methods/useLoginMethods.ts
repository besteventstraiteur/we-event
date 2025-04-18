
import { useState } from "react";
import { supabase, getUserProfile } from "@/lib/supabase";
import { LoginCredentials, AuthResult } from "../types";

export function useLoginMethods(setUser: Function) {
  const login = async (credentials: LoginCredentials): Promise<AuthResult> => {
    try {
      console.log("Attempting to log in with:", credentials.email);
      
      if (credentials.email.includes("admin@") || credentials.email.includes("partner@") || credentials.email.includes("client@")) {
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
          role: role,
          created_at: new Date().toISOString()
        };
        
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
