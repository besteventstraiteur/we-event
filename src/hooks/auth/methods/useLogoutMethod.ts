
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export function useLogoutMethod(setUser: Function) {
  const navigate = useNavigate();

  const logout = useCallback(async () => {
    console.log("Logging out...");
    
    try {
      setUser(null);
      
      localStorage.removeItem("weddingPlannerEmail");
      localStorage.removeItem("weddingPlannerRememberMe");
      localStorage.removeItem("2fa_enabled");
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Error signing out from Supabase:", error);
        throw error;
      }
      
      console.log("Logout successful, navigating to login page");
      
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Error during logout:", error);
      throw error;
    }
  }, [navigate, setUser]);

  return logout;
}
