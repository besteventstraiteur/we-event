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
      const userRole = String(user.role || '').toLowerCase();
      let redirectPath = getRedirectPathForRole(userRole);
      
      console.log("useLoginPageLogic - Authenticated user with role:", userRole, "redirecting to:", redirectPath);
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const handleLoginSubmit = async (email: string, password: string, rememberMe: boolean) => {
    setIsLoading(true);
    
    const userType = email.includes("admin") ? "admin" : 
                    email.includes("partner") ? "partner" : 
                    email.includes("client") ? "client" : "unknown";
                    
    setAuthDebugInfo({
      email,
      userType
    });

    try {
      console.log("Login attempt:", { email, password: "******", rememberMe });
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
          const userRole = String(result.user?.role || "client").toLowerCase();
          
          const redirectPath = getRedirectPathForRole(userRole);
          
          setAuthDebugInfo(prev => ({ 
            ...prev, 
            redirectPath,
            redirectAttempted: true
          }));
          
          console.log("Login successful for", userType, "user, redirecting to:", redirectPath);
          
          toast({
            title: "Connexion réussie",
            description: "Bienvenue sur votre espace VIP",
          });
          
          navigate(redirectPath, { replace: true });
        }
      } else {
        console.error("Login failed:", result.message);
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
      console.log("Password reset requested for:", email);
      
      setTimeout(() => {
        setResetSent(true);
        toast({
          title: "Email envoyé",
          description: "Instructions de récupération envoyées à votre adresse email",
        });
      }, 1000);
    } catch (error) {
      console.error("Password reset error:", error);
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
    console.log("Verifying OTP code:", code);
    const isValid = code === "123456"; // Demo code
    
    if (isValid) {
      return true;
    }
    
    return false;
  };

  const handleSocialLoginSuccess = async (provider: string, userData?: any) => {
    try {
      console.log("Social login attempt with provider:", provider);
      const result = await loginWithProvider(provider);
      
      if (result.success) {
        toast({
          title: "Connexion initiée",
          description: "Vous allez être redirigé vers le fournisseur d'authentification",
        });
      } else {
        console.error("Social login failed:", result.message);
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
    console.log("Biometric login attempt");
    const result = await handleBiometricAuth();
    if (result.success) {
      const storedEmail = localStorage.getItem('weddingPlannerEmail') || 'client@example.com';
      console.log("Biometric success, logging in with stored email:", storedEmail);
      
      const loginResult = await login({
        email: storedEmail,
        password: "biometric-auth",
        rememberMe: true
      });
      
      if (loginResult.success && loginResult.user) {
        const userRole = String(loginResult.user.role || "client").toLowerCase();
        const redirectPath = getRedirectPathForRole(userRole);
        console.log("Biometric login successful, redirecting to:", redirectPath);
        navigate(redirectPath, { replace: true });
      }
    }
  };

  const getRedirectPathForRole = (role: string): string => {
    const normalizedRole = String(role).toLowerCase();
    
    console.log("Getting redirect path for role:", normalizedRole);
    
    switch (normalizedRole) {
      case 'admin':
        return '/admin/dashboard';
      case 'partner':
        return '/partner/dashboard';
      case 'client':
      default:
        return '/client/dashboard';
    }
  };

  return {
    isLoading,
    forgotPassword,
    resetSent,
    showTwoFactor,
    authDebugInfo,
    biometricAttempt,
    isBiometricEnabled,
    isNative,
    biometricError,
    biometricLoading,
    setForgotPassword,
    handleLoginSubmit,
    handleResetPassword,
    handleVerifyOTP,
    handleSocialLoginSuccess,
    handleBiometricLogin
  };
};
