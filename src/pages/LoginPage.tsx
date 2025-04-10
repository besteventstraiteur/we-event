
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthLayout from "@/components/AuthLayout";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import SocialLoginButtons from "@/components/auth/SocialLoginButtons";
import LoginForm from "@/components/auth/LoginForm";
import PasswordResetForm from "@/components/auth/PasswordResetForm";
import TwoFactorVerification from "@/components/auth/TwoFactorVerification";
import BiometricLoginPrompt from "@/components/auth/BiometricLoginPrompt";
import LoginDebugInfo from "@/components/auth/LoginDebugInfo";
import { useBiometricLogin } from "@/hooks/useBiometricLogin";
import { useDeviceType } from "@/hooks/use-mobile";
import MobileOptimizedLayout from "@/components/layouts/MobileOptimizedLayout";
import { useAuth } from "@/hooks/useAuth";
import { UserRole } from "@/utils/accessControl";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const deviceType = useDeviceType();
  const isMobileDevice = deviceType === 'mobile' || deviceType === 'tablet';
  const { login, loginWithProvider, isAuthenticated, user } = useAuth();
  
  const [authDebugInfo, setAuthDebugInfo] = useState<{
    email?: string;
    userType?: string;
    redirectPath?: string;
    redirectAttempted?: boolean;
  }>({});

  const { 
    isBiometricSupported,
    isBiometricEnabled,
    isNative,
    biometricError,
    biometricAttempt,
    isLoading: biometricLoading,
    handleBiometricAuth
  } = useBiometricLogin();

  // Rediriger si déjà connecté
  useEffect(() => {
    if (isAuthenticated && user) {
      const redirectTo = getRedirectPathForUser(user.role);
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
          // La redirection sera gérée par l'effet useEffect qui surveille isAuthenticated
          toast({
            title: "Connexion réussie",
            description: "Bienvenue sur votre espace VIP",
          });
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
      // Redirection gérée par l'effet useEffect
      return true;
    }
    
    return false;
  };

  const handleSocialLoginSuccess = async (provider: string, userData?: any) => {
    try {
      // Utiliser le service d'authentification pour la connexion sociale
      const result = await loginWithProvider(provider);
      
      if (result.success) {
        // Redirection gérée par l'effet useEffect
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
      // Simuler une connexion avec l'e-mail stocké
      const storedEmail = localStorage.getItem('weddingPlannerEmail') || 'client@example.com';
      await login({
        email: storedEmail,
        password: "biometric-auth", // Mot de passe factice pour l'authentification biométrique
        rememberMe: true
      });
    }
  };

  const getRedirectPathForUser = (role: UserRole): string => {
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

  if (showTwoFactor) {
    return (
      <MobileOptimizedLayout fullHeight>
        <AuthLayout 
          title="Vérification en deux étapes" 
          subtitle="Un code de vérification a été envoyé à votre appareil"
        >
          <TwoFactorVerification 
            onVerify={handleVerifyOTP}
            onCancel={() => setShowTwoFactor(false)}
            onResend={async () => {
              toast({
                title: "Code renvoyé",
                description: "Un nouveau code a été envoyé à votre appareil.",
              });
            }}
          />
          <div className="text-center text-sm text-gray-500 mt-4">
            <p>Pour les besoins de la démo, le code valide est: 123456</p>
          </div>
        </AuthLayout>
      </MobileOptimizedLayout>
    );
  }

  return (
    <MobileOptimizedLayout fullHeight>
      <AuthLayout 
        title={forgotPassword ? "Récupération de mot de passe" : "Connexion"} 
        subtitle={forgotPassword ? "Nous vous enverrons un lien de récupération" : "Accédez à votre espace VIP"}
      >
        {!forgotPassword ? (
          <>
            <BiometricLoginPrompt 
              biometricAttempt={biometricAttempt}
              isBiometricEnabled={isBiometricEnabled}
              isNative={isNative}
              isMobileDevice={isMobileDevice}
              biometricError={biometricError}
              isLoading={biometricLoading}
              onBiometricLogin={handleBiometricLogin}
            />

            <SocialLoginButtons onLoginSuccess={handleSocialLoginSuccess} />

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-2 text-sm text-gray-500">ou</span>
              </div>
            </div>

            <LoginForm 
              onSubmit={handleLoginSubmit} 
              onForgotPassword={() => setForgotPassword(true)} 
              isLoading={isLoading} 
            />
          </>
        ) : (
          <PasswordResetForm 
            onSubmit={handleResetPassword}
            onCancel={() => setForgotPassword(false)}
            isLoading={isLoading}
            resetSent={resetSent}
          />
        )}
        
        <LoginDebugInfo {...authDebugInfo} />
      </AuthLayout>
    </MobileOptimizedLayout>
  );
};

export default LoginPage;
