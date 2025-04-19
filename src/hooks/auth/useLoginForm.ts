
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/auth/useAuth";
import { useToast } from "@/hooks/use-toast";
import { getRedirectPathForRole } from "./utils/redirectUtils";
import type { AuthDebugInfo } from "./types/loginTypes";

export const useLoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [authDebugInfo, setAuthDebugInfo] = useState<AuthDebugInfo>({});
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  const handleLoginSubmit = async (email: string, password: string, rememberMe: boolean) => {
    setIsLoading(true);
    
    // Determine user type from email for demo accounts
    let userType = "client";
    if (email.includes("admin")) {
      userType = "admin";
    } else if (email.includes("partner")) {
      userType = "partner";
    }
                    
    setAuthDebugInfo({
      email,
      userType
    });

    try {
      console.log("Login attempt:", { email, password: "******", rememberMe, userType });
      
      const result = await login({ email, password, rememberMe });
      
      if (result.success) {
        const requires2FA = email.includes("secure") || localStorage.getItem('2fa_enabled') === 'true';
        
        if (!requires2FA) {
          toast({
            title: "Connexion réussie",
            description: "Bienvenue sur votre espace VIP",
          });
          
          // Let the LoginPage component handle the redirection based on user role
          // This simplifies the flow and ensures consistent redirection logic
        }
        
        return { success: true, requires2FA };
      }
      
      console.error("Login failed:", result.message);
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: result.message || "Identifiants incorrects. Veuillez réessayer.",
      });
      
      return { success: false };
    } catch (error) {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: "Une erreur inattendue s'est produite. Veuillez réessayer.",
      });
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    authDebugInfo,
    handleLoginSubmit
  };
};
