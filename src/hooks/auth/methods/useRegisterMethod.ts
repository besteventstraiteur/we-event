
import { supabase, getUserProfile } from "@/lib/supabase";
import { AuthResult } from "../types";
import { UserRole } from "@/utils/accessControl";

export function useRegisterMethod() {
  const register = async (userData: { 
    email: string; 
    password: string; 
    role?: UserRole; 
    name?: string 
  }): Promise<AuthResult> => {
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

  return register;
}
