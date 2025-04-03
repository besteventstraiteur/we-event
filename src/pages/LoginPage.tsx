import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "@/components/AuthLayout";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Fingerprint, AlertTriangle, LockKeyhole } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import SocialLoginButtons from "@/components/auth/SocialLoginButtons";
import LoginForm from "@/components/auth/LoginForm";
import PasswordResetForm from "@/components/auth/PasswordResetForm";
import TwoFactorVerification from "@/components/auth/TwoFactorVerification";
import { isBiometricAvailable, authenticateWithBiometrics } from "@/utils/biometricAuth";
import { Capacitor } from "@capacitor/core";
import { useDeviceType } from "@/hooks/use-mobile";
import MobileOptimizedLayout from "@/components/layouts/MobileOptimizedLayout";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);
  const [isNative, setIsNative] = useState(false);
  const [biometricError, setBiometricError] = useState<string | null>(null);
  const [biometricAttempt, setBiometricAttempt] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const deviceType = useDeviceType();
  const isMobileDevice = deviceType === 'mobile' || deviceType === 'tablet';

  useEffect(() => {
    const nativePlatform = Capacitor.isNativePlatform();
    setIsNative(nativePlatform);

    const checkBiometric = async () => {
      if (nativePlatform || isMobileDevice) {
        try {
          const isSupported = await isBiometricAvailable();
          setIsBiometricSupported(isSupported);
          
          const enabled = localStorage.getItem('biometric_enabled') === 'true';
          setIsBiometricEnabled(enabled && isSupported);
          
          if (enabled && isSupported) {
            setBiometricAttempt(true);
            setTimeout(() => {
              handleBiometricAuth();
            }, 500);
          }
        } catch (error) {
          console.error("Erreur lors de la vérification biométrique:", error);
        }
      }
    };

    checkBiometric();
  }, [isMobileDevice]);

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

  const handleBiometricAuth = async () => {
    setBiometricError(null);
    setIsLoading(true);
    
    try {
      const result = await authenticateWithBiometrics();
      
      if (result.success) {
        toast({
          title: "Authentification réussie",
          description: "Identité vérifiée par biométrie.",
        });
        redirectAfterLogin(result.userId);
      } else {
        setBiometricError("L'authentification biométrique a échoué. Veuillez réessayer ou utiliser une autre méthode de connexion.");
      }
    } catch (error) {
      console.error("Erreur biométrique:", error);
      setBiometricError("Une erreur est survenue lors de l'authentification biométrique.");
    } finally {
      setIsLoading(false);
      setBiometricAttempt(false);
    }
  };

  const redirectAfterLogin = (userEmail: string = '') => {
    const isClient = userEmail.includes("client");
    const isPartner = userEmail.includes("partner");
    const isAdmin = userEmail.includes("admin");

    if (isClient) {
      navigate("/client/dashboard");
    } else if (isPartner) {
      navigate("/partner/dashboard");
    } else if (isAdmin) {
      navigate("/admin/dashboard");
    } else {
      navigate("/client/dashboard");
    }

    toast({
      title: "Connexion réussie",
      description: "Bienvenue sur votre espace VIP",
    });
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
            {biometricAttempt && (
              <div className="mb-4 flex flex-col items-center justify-center py-6">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-3 animate-pulse">
                  <LockKeyhole className="h-8 w-8 text-primary" />
                </div>
                <p className="text-center text-sm font-medium">
                  Utilisez votre empreinte digitale ou Face ID pour vous connecter
                </p>
                <p className="text-center text-xs text-gray-500 mt-1">
                  Authentification biométrique en cours...
                </p>
              </div>
            )}

            {isBiometricEnabled && !biometricAttempt && (isNative || isMobileDevice) && (
              <div className="mb-6">
                <Button 
                  onClick={handleBiometricAuth} 
                  className="w-full flex items-center justify-center gap-2"
                  disabled={isLoading}
                  variant="outline"
                  size="lg"
                >
                  <Fingerprint size={18} />
                  Se connecter avec biométrie
                </Button>
                
                {biometricError && (
                  <Alert variant="destructive" className="mt-2">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      {biometricError}
                    </AlertDescription>
                  </Alert>
                )}
                
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-2 text-sm text-gray-500">ou</span>
                  </div>
                </div>
              </div>
            )}

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
      </AuthLayout>
    </MobileOptimizedLayout>
  );
};

export default LoginPage;
