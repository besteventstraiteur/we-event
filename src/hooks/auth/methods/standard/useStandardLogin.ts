
import { supabase, getUserProfile } from "@/lib/supabase";
import { AuthResult, LoginCredentials } from "../../types";

export function useStandardLogin(setUser: Function) {
  const handleStandardLogin = async (credentials: LoginCredentials): Promise<AuthResult> => {
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
    
    setUser(profile);
    
    return {
      success: true,
      user: profile
    };
  };

  return { handleStandardLogin };
}
