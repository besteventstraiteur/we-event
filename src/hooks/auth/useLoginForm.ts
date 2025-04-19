
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
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
      
      // Handle demo accounts directly
      if ((email.includes("admin@") || email.includes("partner@") || email.includes("client@")) && 
          password === "password123") {
        
        console.log("Using demo account for:", email);
        let role = userType;
        
        const demoUser = {
          id: `demo-${Date.now()}`,
          user_metadata: {
            email: email,
            name: `Demo ${role.charAt(0).toUpperCase() + role.slice(1)}`,
            role: role
          },
          email: email,
          role: role
        };
        
        // Store demo user information (simulating login)
        localStorage.setItem("supabase.auth.token", JSON.stringify({
          currentSession: {
            user: demoUser
          }
        }));
        
        if (rememberMe) {
          localStorage.setItem("weddingPlannerEmail", email);
          localStorage.setItem("weddingPlannerRememberMe", "true");
        }
        
        const redirectPath = getRedirectPathForRole(role);
        
        setAuthDebugInfo(prev => ({ 
          ...prev, 
          redirectPath,
          redirectAttempted: true
        }));
        
        console.log("Demo login successful for", role, "user, attempting redirect to:", redirectPath);
        
        toast({
          title: "Connexion réussie",
          description: "Bienvenue sur votre espace VIP",
        });
        
        // Check for stored redirect path
        const storedRedirect = sessionStorage.getItem("redirectAfterLogin");
        const finalRedirectPath = storedRedirect || redirectPath;
        
        console.log("Final redirect path:", finalRedirectPath);
        
        // Add a longer delay to ensure state updates before navigation
        setTimeout(() => {
          // Clear local storage first to avoid any race conditions
          if (storedRedirect) {
            sessionStorage.removeItem("redirectAfterLogin");
          }
          
          // Force a refresh of the auth state before redirecting
          window.dispatchEvent(new Event('auth-refresh'));
          
          // Navigate with replace to avoid back-button issues
          navigate(finalRedirectPath, { replace: true });
        }, 300);

        setIsLoading(false);
        return { success: true };
      }
      
      // If not a demo account, proceed with regular authentication
      const result = await login({ email, password, rememberMe });
      
      if (result.success) {
        const requires2FA = email.includes("secure") || localStorage.getItem('2fa_enabled') === 'true';
        
        if (!requires2FA) {
          const userRole = String(result.user?.user_metadata?.role || userType).toLowerCase();
          const redirectPath = getRedirectPathForRole(userRole);
          
          setAuthDebugInfo(prev => ({ 
            ...prev, 
            redirectPath,
            redirectAttempted: true
          }));
          
          console.log("Login successful for", userType, "user, attempting redirect to:", redirectPath);
          
          toast({
            title: "Connexion réussie",
            description: "Bienvenue sur votre espace VIP",
          });
          
          // Check for stored redirect path
          const storedRedirect = sessionStorage.getItem("redirectAfterLogin");
          const finalRedirectPath = storedRedirect || redirectPath;
          
          console.log("Final redirect path:", finalRedirectPath);
          
          // Add a slight delay to ensure state updates before navigation
          setTimeout(() => {
            // Clear stored redirect
            if (storedRedirect) {
              sessionStorage.removeItem("redirectAfterLogin");
            }
            
            // Force a refresh of the auth state before redirecting
            window.dispatchEvent(new Event('auth-refresh'));
            
            navigate(finalRedirectPath, { replace: true });
          }, 300);
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
