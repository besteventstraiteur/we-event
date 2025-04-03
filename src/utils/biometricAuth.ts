
import { Capacitor } from '@capacitor/core';

/**
 * Vérifie si l'authentification biométrique est disponible sur l'appareil
 */
export const isBiometricAvailable = async (): Promise<boolean> => {
  if (!Capacitor.isNativePlatform()) {
    return false;
  }

  try {
    // Dans une implémentation réelle, on utiliserait Capacitor Plugins comme:
    // import { NativeBiometric } from 'capacitor-native-biometric';
    // return await NativeBiometric.isAvailable();
    
    // Simulation pour la démo
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simuler que l'authentification biométrique est disponible sur 80% des appareils
        resolve(Math.random() < 0.8);
      }, 500);
    });
  } catch (error) {
    console.error('Erreur lors de la vérification de la biométrie:', error);
    return false;
  }
};

/**
 * Configure l'authentification biométrique pour l'utilisateur
 */
export const setupBiometricAuth = async (userId: string): Promise<boolean> => {
  if (!Capacitor.isNativePlatform()) {
    return false;
  }

  try {
    // Dans une implémentation réelle:
    // await NativeBiometric.setCredentials({
    //   username: userId,
    //   password: 'SECURE_TOKEN_' + userId,
    //   server: 'com.weddingplanner.app'
    // });
    
    // Simulation pour la démo
    return new Promise((resolve) => {
      setTimeout(() => {
        // Stocker un marqueur dans le localStorage pour simuler l'enregistrement biométrique
        localStorage.setItem('biometric_enabled', 'true');
        localStorage.setItem('biometric_user_id', userId);
        resolve(true);
      }, 1000);
    });
  } catch (error) {
    console.error('Erreur lors de la configuration biométrique:', error);
    return false;
  }
};

/**
 * Authentifie l'utilisateur via biométrie
 */
export const authenticateWithBiometrics = async (): Promise<{success: boolean, userId?: string}> => {
  if (!Capacitor.isNativePlatform()) {
    return { success: false };
  }

  // Vérifier si la biométrie est activée
  const isBiometricEnabled = localStorage.getItem('biometric_enabled') === 'true';
  if (!isBiometricEnabled) {
    return { success: false };
  }

  try {
    // Dans une implémentation réelle:
    // const result = await NativeBiometric.verifyIdentity({
    //   reason: "Connexion à votre compte Wedding Planner",
    //   title: "Authentification biométrique",
    //   subtitle: "Confirmer votre identité",
    //   description: "Utilisez votre empreinte digitale ou Face ID pour vous connecter rapidement"
    // });
    
    // Simulation pour la démo
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simuler une authentification réussie dans 90% des cas
        const success = Math.random() < 0.9;
        const userId = success ? localStorage.getItem('biometric_user_id') || undefined : undefined;
        resolve({ success, userId });
      }, 1500);
    });
  } catch (error) {
    console.error('Erreur lors de l\'authentification biométrique:', error);
    return { success: false };
  }
};

/**
 * Désactive l'authentification biométrique pour l'utilisateur actuel
 */
export const disableBiometricAuth = async (): Promise<boolean> => {
  if (!Capacitor.isNativePlatform()) {
    return false;
  }

  try {
    // Dans une implémentation réelle:
    // await NativeBiometric.deleteCredentials({
    //   server: 'com.weddingplanner.app'
    // });
    
    // Simulation pour la démo
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.removeItem('biometric_enabled');
        localStorage.removeItem('biometric_user_id');
        resolve(true);
      }, 500);
    });
  } catch (error) {
    console.error('Erreur lors de la désactivation biométrique:', error);
    return false;
  }
};
