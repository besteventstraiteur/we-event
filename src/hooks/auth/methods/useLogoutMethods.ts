
import { supabase } from "@/lib/supabase";

export function useLogoutMethods(setUser: Function) {
  const logout = async (): Promise<void> => {
    try {
      console.log("Logging out...");
      
      // Vérifier si l'utilisateur est un utilisateur de démo
      const storedUser = localStorage.getItem("currentUser");
      const isDemo = storedUser && JSON.parse(storedUser).id?.toString().startsWith('demo-');
      
      if (isDemo) {
        // Pour les utilisateurs de démo, simplement supprimer les données stockées
        console.log("Logging out demo user");
        localStorage.removeItem("currentUser");
        localStorage.removeItem("weddingPlannerAdminUser");
        localStorage.removeItem("weddingPlannerEmail");
        localStorage.removeItem("weddingPlannerRememberMe");
        
        // Mettre à jour l'état utilisateur à null
        setUser(null);
      } else {
        // Pour les utilisateurs Supabase, appeler l'API de déconnexion
        console.log("Logging out Supabase user");
        await supabase.auth.signOut();
        
        // Nettoyer les données locales
        localStorage.removeItem("currentUser");
        localStorage.removeItem("weddingPlannerAdminUser");
        localStorage.removeItem("weddingPlannerEmail");
        localStorage.removeItem("weddingPlannerRememberMe");
        
        setUser(null);
      }
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  return { logout };
}
