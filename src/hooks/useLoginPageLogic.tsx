
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useBiometricLogin } from "@/hooks/useBiometricLogin";
import { useLoginForm } from "./auth/useLoginForm";
import { usePasswordReset } from "./auth/usePasswordReset";
import type { AuthDebugInfo } from "./auth/types/loginTypes";

export const useLoginPageLogic = () => {
  const [forgotPassword, setForgotPassword] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const { toast } = useToast();
  const { loginWithProvider } = useAuth();
  
  const { 
    isBiometricSupported,
    isBiometricEnabled,
    isNative,
    biometricError,
    biometricAttempt,
    isLoading: biometricLoading,
    handleBiometricAuth
  } = useBiometricLogin();

  const {
    isLoading: formLoading,
    error,
    authDebugInfo,
    handleLoginSubmit: handleFormSubmit
  } = useLoginForm();

  const {
    isLoading: resetLoading,
    resetSent,
    handleResetPassword
  } = usePasswordReset();

  const handleLoginSubmit = async (email: string, password: string, rememberMe: boolean) => {
    const result = await handleFormSubmit(email, password, rememberMe);
    if (result.requires2FA) {
      setShowTwoFactor(true);
      toast({
        title: "Vérification supplémentaire requise",
        description: "Veuillez entrer le code de sécurité envoyé à votre appareil.",
      });
    }
  };

  const handleVerifyOTP = async (code: string): Promise<boolean> => {
    console.log("Verifying OTP code:", code);
    const isValid = code === "123456"; // Demo code
    return isValid;
  };

  const handleSocialLoginSuccess = async (provider: "google" | "facebook" | "github") => {
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

  return {
    isLoading: formLoading || resetLoading || biometricLoading,
    forgotPassword,
    resetSent,
    showTwoFactor,
    authDebugInfo,
    error,
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
    handleBiometricAuth
  };
};
