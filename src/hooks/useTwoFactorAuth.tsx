
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function useTwoFactorAuth() {
  const [is2FAEnabled, setIs2FAEnabled] = useState(() => {
    return localStorage.getItem('2fa_enabled') === 'true';
  });
  
  const [showVerification, setShowVerification] = useState(false);
  const [verificationMethod, setVerificationMethod] = useState<"email" | "app">("email");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Simuler l'activation/désactivation du 2FA
  const handleToggle2FA = () => {
    if (is2FAEnabled) {
      // Demander confirmation avant de désactiver
      if (window.confirm("Êtes-vous sûr de vouloir désactiver l'authentification à deux facteurs ? Cela réduira la sécurité de votre compte.")) {
        // Logique de désactivation
        setIsLoading(true);
        setTimeout(() => {
          setIs2FAEnabled(false);
          localStorage.setItem('2fa_enabled', 'false');
          setIsLoading(false);
          toast({
            title: "2FA désactivé",
            description: "L'authentification à deux facteurs a été désactivée."
          });
        }, 500);
      }
    } else {
      // Activer le processus de configuration
      setShowVerification(true);
    }
  };

  // Simuler la vérification du code OTP
  const handleVerifyOTP = async (code: string): Promise<boolean> => {
    console.log("Code OTP:", code);
    
    // Simuler une vérification réussie si le code est 123456 (pour démonstration)
    return new Promise((resolve) => {
      setTimeout(() => {
        const isValid = code === "123456";
        if (isValid) {
          setIs2FAEnabled(true);
          localStorage.setItem('2fa_enabled', 'true');
          setShowVerification(false);
        }
        resolve(isValid);
      }, 1000);
    });
  };

  // Simuler l'envoi d'un nouveau code
  const handleResendCode = async (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Nouveau code envoyé à", verificationMethod);
        toast({
          title: "Code envoyé",
          description: `Un nouveau code a été envoyé via ${verificationMethod === 'email' ? 'email' : 'application d\'authentification'}.`
        });
        resolve();
      }, 1000);
    });
  };

  return {
    is2FAEnabled,
    showVerification,
    setShowVerification,
    verificationMethod,
    setVerificationMethod,
    isLoading,
    handleToggle2FA,
    handleVerifyOTP,
    handleResendCode,
  };
}
