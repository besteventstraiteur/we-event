
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { UserRole } from "@/utils/accessControl";
import { useToast } from "@/hooks/use-toast";
import { useBiometricLogin } from "@/hooks/useBiometricLogin";

interface AuthDebugInfo {
  email?: string;
  userType?: string;
  redirectPath?: string;
  redirectAttempted?: boolean;
}

export const useLoginPageLogic = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { login, loginWithProvider, isAuthenticated, user } = useAuth();
  
  const [authDebugInfo, setAuthDebugInfo] = useState<AuthDebugInfo>({});

  const { 
    isBiometricSupported,
    isBiometricEnabled,
    isNative,
    biometricError,
    biometricAttempt,
    isLoading: biometricLoading,
    handleBiometricAuth
  } = useBiometricLogin();

  useEffect(() => {
    if (isAuthenticated && user) {
      const redirectTo = getRedirectPathForUser(user.role);
      console.log("Authenticated user with role:", user.role, "redirecting to:", redirectTo);
      navigate(redirectTo, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const handleLoginSubmit = async (email: string, password: string, rememberMe: boolean) => {
    setIsLoading(true);

    try {
      const result = await login({ email, password, rememberMe });
      
      if (result.success) {
        const requires2FA = email.includes("secure") || localStorage.getItem('2fa_enabled') === 'true';
        
        if (requires2FA) {
          setShowTwoFactor(true);
          toast({
            title: "Vérification supplémentaire requise",
            description: "Veuillez entrer le code de sécurité envoyé à votre appareil.",
          });
        } else {
          const redirectPath = getRedirectPathForUser(result.user?.role);
          console.log("Login successful, redirecting to:", redirectPath);
          
          toast({
            title: "Connexion réussie",
            description: "Bienvenue sur votre espace VIP",
          });
          
          navigate(redirectPath, { replace: true });
        }
      } else {
        toast({
          variant: "destructive",
          title: "Erreur de connexion",
          description: result.message || "Identifiants incorrects. Veuillez réessayer.",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: "Une erreur inattendue s'est produite. Veuillez réessayer.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (email: string) => {
    setIsLoading(true);

    try {
      setTimeout(() => {
        setResetSent(true);
        toast({
          title: "Email envoyé",
          description: "Instructions de récupération envoyées à votre adresse email",
        });
      }, 1000);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'envoyer l'email de récupération. Veuillez réessayer.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (code: string): Promise<boolean> => {
    const isValid = code === "123456"; // Code de démo
    
    if (isValid) {
      return true;
    }
    
    return false;
  };

  const handleSocialLoginSuccess = async (provider: string, userData?: any) => {
    try {
      const result = await loginWithProvider(provider);
      
      if (result.success) {
        toast({
          title: "Connexion réussie",
          description: `Bienvenue ${result.user?.name || ''}`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Échec de connexion",
          description: result.message || `Problème de connexion avec ${provider}`,
        });
      }
    } catch (error) {
      console.error("Social login error:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: `Problème de connexion avec ${provider}. Veuillez réessayer.`,
      });
    }
  };

  const handleBiometricLogin = async () => {
    const result = await handleBiometricAuth();
    if (result.success) {
      const storedEmail = localStorage.getItem('weddingPlannerEmail') || 'client@example.com';
      const loginResult = await login({
        email: storedEmail,
        password: "biometric-auth",
        rememberMe: true
      });
      
      if (loginResult.success) {
        const redirectPath = getRedirectPathForUser(loginResult.user?.role);
        console.log("Biometric login successful, redirecting to:", redirectPath);
        navigate(redirectPath, { replace: true });
      }
    }
  };

  const getRedirectPathForUser = (role?: UserRole): string => {
    if (!role) {
      return '/client/dashboard';
    }
    
    switch (role) {
      case UserRole.ADMIN:
        return '/admin/dashboard';
      case UserRole.PARTNER:
        return '/partner/dashboard';
      case UserRole.CLIENT:
      default:
        return '/client/dashboard';
    }
  };

  return {
    // State
    isLoading,
    forgotPassword,
    resetSent,
    showTwoFactor,
    authDebugInfo,
    
    // Biometric
    biometricAttempt,
    isBiometricEnabled,
    isNative,
    biometricError,
    biometricLoading,
    
    // Functions
    setForgotPassword,
    handleLoginSubmit,
    handleResetPassword,
    handleVerifyOTP,
    handleSocialLoginSuccess,
    handleBiometricLogin,
  };
};
