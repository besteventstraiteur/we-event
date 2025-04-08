
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { isBiometricAvailable, authenticateWithBiometrics } from "@/utils/biometricAuth";
import { Capacitor } from "@capacitor/core";
import { useDeviceType } from "@/hooks/use-mobile";

export function useBiometricLogin() {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);
  const [isNative, setIsNative] = useState(false);
  const [biometricError, setBiometricError] = useState<string | null>(null);
  const [biometricAttempt, setBiometricAttempt] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
        return { success: true, userId: result.userId };
      } else {
        setBiometricError("L'authentification biométrique a échoué. Veuillez réessayer ou utiliser une autre méthode de connexion.");
        return { success: false };
      }
    } catch (error) {
      console.error("Erreur biométrique:", error);
      setBiometricError("Une erreur est survenue lors de l'authentification biométrique.");
      return { success: false };
    } finally {
      setIsLoading(false);
      setBiometricAttempt(false);
    }
  };

  return {
    isBiometricSupported,
    isBiometricEnabled,
    isNative,
    biometricError,
    biometricAttempt,
    isLoading,
    handleBiometricAuth
  };
}
