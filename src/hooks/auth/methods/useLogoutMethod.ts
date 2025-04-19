
import { supabase } from "@/lib/supabase";

export function useLogoutMethod(setUser: Function) {
  return async (): Promise<void> => {
    try {
      console.log("Logging out...");
      
      // Suppression des données de démonstration stockées
      localStorage.removeItem("weddingPlannerEmail");
      localStorage.removeItem("weddingPlannerRememberMe");
      
      // Déconnexion Supabase - will automatically clear the auth cookie
      await supabase.auth.signOut();
      
      // Mise à jour de l'état utilisateur
      setUser(null);
      
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
}
