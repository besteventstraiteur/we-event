
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "@/components/AuthLayout";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import SocialLoginButtons from "@/components/auth/SocialLoginButtons";
import LoginForm from "@/components/auth/LoginForm";
import PasswordResetForm from "@/components/auth/PasswordResetForm";
import TwoFactorVerification from "@/components/auth/TwoFactorVerification";
import { useBiometricLogin } from "@/hooks/useBiometricLogin";
import { prepareUserData, getRedirectPathForUser } from "@/utils/loginUtils";
import { useDeviceType } from "@/hooks/use-mobile";
import MobileOptimizedLayout from "@/components/layouts/MobileOptimizedLayout";
import BiometricLoginPrompt from "@/components/auth/BiometricLoginPrompt";
import LoginDebugInfo from "@/components/auth/LoginDebugInfo";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const deviceType = useDeviceType();
  const isMobileDevice = deviceType === 'mobile' || deviceType === 'tablet';
  
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

  const handleLoginSubmit = async (email: string, password: string, rememberMe: boolean) => {
    setIsLoading(true);

    try {
      if (rememberMe) {
        localStorage.setItem("weddingPlannerEmail", email);
        localStorage.setItem("weddingPlannerRememberMe", "true");
      } else {
        localStorage.removeItem("weddingPlannerEmail");
        localStorage.removeItem("weddingPlannerRememberMe");
      }

      const userData = prepareUserData(email);
      localStorage.setItem('currentUser', JSON.stringify(userData));
      
      console.log("Login - User data stored in localStorage:", userData);

      setTimeout(() => {
        const requires2FA = email.includes("secure") || localStorage.getItem('2fa_enabled') === 'true';
        
        if (requires2FA) {
          setShowTwoFactor(true);
          setIsLoading(false);
          toast({
            title: "Vérification supplémentaire requise",
            description: "Veuillez entrer le code de sécurité envoyé à votre appareil.",
          });
        } else {
          redirectAfterLogin(email);
        }
      }, 1000);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: "Identifiants incorrects. Veuillez réessayer.",
      });
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
    const isValid = code === "123456";
    
    if (isValid) {
      setTimeout(() => {
        redirectAfterLogin();
      }, 500);
    }
    
    return isValid;
  };

  const redirectAfterLogin = (userEmail: string = '') => {
    const email = userEmail || localStorage.getItem('weddingPlannerEmail') || '';
    const redirectPath = getRedirectPathForUser(email);
    
    setAuthDebugInfo({
      email,
      userType: email.includes("admin") ? "admin" : 
               email.includes("partner") ? "partner" : 
               email.includes("client") ? "client" : "unknown",
      redirectPath,
      redirectAttempted: true
    });
    
    console.log(`Redirecting to ${redirectPath}`);
    
    // Utiliser navigate au lieu de window.location.href pour une navigation SPA
    navigate(redirectPath, { replace: true });
    
    toast({
      title: "Connexion réussie",
      description: "Bienvenue sur votre espace VIP",
    });
  };

  const handleBiometricLogin = async () => {
    const result = await handleBiometricAuth();
    if (result.success) {
      redirectAfterLogin(result.userId);
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

            <SocialLoginButtons onLoginSuccess={redirectAfterLogin} />

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
