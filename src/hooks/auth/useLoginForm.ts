
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { getRedirectPathForRole } from "./utils/redirectUtils";
import type { AuthDebugInfo } from "./types/loginTypes";

export const useLoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [authDebugInfo, setAuthDebugInfo] = useState<AuthDebugInfo>({});
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  const handleLoginSubmit = async (email: string, password: string, rememberMe: boolean) => {
    setIsLoading(true);
    setError(null);
    
    // Detect user type from email (for debug only)
    let userType = "client";
    if (email === "rdubois@best-events.fr" || email.includes("admin")) {
      userType = "admin";
    } else if (email.includes("partner")) {
      userType = "partner";
    }
                    
    setAuthDebugInfo({
      email,
      userType
    });

    try {
      console.log("Login attempt:", { email, rememberMe, userType });
      
      // Pour gérer le compte admin spécial (rdubois@best-events.fr)
      if (email === "rdubois@best-events.fr" && password === "admin123") {
        // Créer un utilisateur admin simulé
        const adminUser = {
          id: "admin-special",
          email: "rdubois@best-events.fr",
          role: "ADMIN",
          user_metadata: { role: "ADMIN" },
          created_at: new Date().toISOString()
        };
        
        // Stocker dans localStorage pour la persistence
        localStorage.setItem("weddingPlannerAdminUser", JSON.stringify(adminUser));
        
        toast({
          title: "Connexion réussie",
          description: "Bienvenue dans votre espace administrateur",
        });
        
        // Force l'état d'authentification sans attendre le délai
        login({ email, password, rememberMe });
        
        // Ajout d'un délai plus long avant la redirection
        setTimeout(() => {
          navigate("/admin/dashboard", { replace: true });
        }, 300);
        
        setIsLoading(false);
        return { success: true };
      }
      
      // Authentication via Supabase ou les comptes de démo
      const result = await login({ email, password, rememberMe });
      
      if (result.success) {
        // Check if 2FA is required (for demo purposes)
        const requires2FA = email.includes("secure") || localStorage.getItem('2fa_enabled') === 'true';
        
        if (!requires2FA) {
          // Determine role for proper redirection
          const userRole = result.user?.user_metadata?.role || result.user?.role || userType;
          const redirectPath = getRedirectPathForRole(userRole);
          
          console.log("Login successful, redirecting to:", redirectPath);
          
          toast({
            title: "Connexion réussie",
            description: "Bienvenue sur votre espace VIP",
          });
          
          // Ajout d'un délai plus long avant la redirection
          setTimeout(() => {
            navigate(redirectPath, { replace: true });
          }, 300);
        }
        
        return { success: true, requires2FA };
      }
      
      console.error("Login failed:", result.message);
      setError(result.message || "Identifiants incorrects. Veuillez réessayer.");
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: result.message || "Identifiants incorrects. Veuillez réessayer.",
      });
      
      return { success: false };
    } catch (error: any) {
      const errorMessage = error.message || "Une erreur inattendue s'est produite. Veuillez réessayer.";
      console.error("Login error:", error);
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: errorMessage,
      });
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    authDebugInfo,
    handleLoginSubmit
  };
};
