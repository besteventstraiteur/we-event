
import { supabase } from "@/lib/supabase";
import { useToast } from '@/hooks/use-toast';

export function useLogoutMethod(setUser: Function) {
  const { toast } = useToast();

  return async (): Promise<void> => {
    try {
      console.log("Logging out...");
      
      // Suppression des données de démonstration stockées
      localStorage.removeItem("weddingPlannerEmail");
      localStorage.removeItem("weddingPlannerRememberMe");
      localStorage.removeItem("weddingPlannerAdminUser");
      localStorage.removeItem("currentUser");
      
      // Déconnexion Supabase - will automatically clear the auth cookie
      await supabase.auth.signOut();
      
      // Mise à jour de l'état utilisateur
      setUser(null);
      
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        variant: "destructive",
        title: "Erreur de déconnexion",
        description: "Une erreur s'est produite lors de la déconnexion"
      });
    }
  };
}
