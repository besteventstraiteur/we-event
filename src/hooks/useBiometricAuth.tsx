
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Capacitor } from "@capacitor/core";
import { isBiometricAvailable, setupBiometricAuth, disableBiometricAuth } from "@/utils/biometricAuth";
import { useDeviceType } from "@/hooks/use-mobile";

export function useBiometricAuth() {
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [isNative, setIsNative] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const deviceType = useDeviceType();
  const isMobileDevice = deviceType === 'mobile' || deviceType === 'tablet';

  useEffect(() => {
    // Vérifier si l'application s'exécute dans un environnement natif
    const nativePlatform = Capacitor.isNativePlatform();
    setIsNative(nativePlatform);

    // Vérifier si la biométrie est prise en charge
    const checkBiometricSupport = async () => {
      if (nativePlatform || isMobileDevice) {
        try {
          const isSupported = await isBiometricAvailable();
          setIsBiometricSupported(isSupported);
          console.log("Biometric support:", isSupported);
        } catch (error) {
          console.error("Error checking biometric availability:", error);
          setIsBiometricSupported(false);
        }
      }
    };

    // Vérifier si la biométrie est activée
    const checkBiometricEnabled = () => {
      const enabled = localStorage.getItem('biometric_enabled') === 'true';
      setIsBiometricEnabled(enabled);
    };

    checkBiometricSupport();
    checkBiometricEnabled();
  }, [isMobileDevice]);

  // Gérer l'activation/désactivation de la biométrie
  const handleToggleBiometric = async () => {
    if (!isNative && !isMobileDevice) {
      toast({
        variant: "destructive",
        title: "Non disponible",
        description: "L'authentification biométrique n'est pas disponible sur cet appareil."
      });
      return;
    }
    
    if (!isBiometricSupported) {
      toast({
        variant: "destructive",
        title: "Non supporté",
        description: "Votre appareil ne prend pas en charge l'authentification biométrique."
      });
      return;
    }

    setIsLoading(true);
    
    try {
      if (isBiometricEnabled) {
        // Désactiver la biométrie
        const success = await disableBiometricAuth();
        if (success) {
          setIsBiometricEnabled(false);
          toast({
            title: "Biométrie désactivée",
            description: "L'authentification biométrique a été désactivée."
          });
        } else {
          throw new Error("Erreur lors de la désactivation");
        }
      } else {
        // Activer la biométrie
        const userId = `user_${Date.now()}`; // En production, utiliser l'ID réel de l'utilisateur
        const success = await setupBiometricAuth(userId);
        if (success) {
          setIsBiometricEnabled(true);
          toast({
            title: "Biométrie activée",
            description: "L'authentification biométrique a été activée avec succès."
          });
        } else {
          throw new Error("Erreur lors de l'activation");
        }
      }
    } catch (error) {
      console.error("Erreur biométrie:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isBiometricEnabled,
    isBiometricSupported,
    isNative,
    isLoading,
    handleToggleBiometric
  };
}
