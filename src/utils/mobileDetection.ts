
import { Capacitor } from '@capacitor/core';

/**
 * Vérifie si l'application s'exécute dans un environnement mobile natif
 */
export const isNativeApp = (): boolean => {
  return Capacitor.isNativePlatform();
};

/**
 * Vérifie si l'utilisateur est sur un appareil mobile (basé sur l'user agent)
 */
export const isMobileDevice = (): boolean => {
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  return /android|iphone|ipad|ipod|mobile|blackberry|webos|windows phone/i.test(userAgent);
};

/**
 * Vérifie si l'application s'exécute en mode PWA (Progressive Web App)
 */
export const isPWA = (): boolean => {
  return window.matchMedia('(display-mode: standalone)').matches || 
         (window.navigator as any).standalone === true;
};

/**
 * Retourne le type d'appareil actuel
 */
export const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  
  // Détection des tablettes
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobile))/i.test(userAgent)) {
    return 'tablet';
  }
  
  // Détection des mobiles
  if (/android|iphone|ipod|mobile|blackberry|webos|windows phone/i.test(userAgent)) {
    return 'mobile';
  }
  
  return 'desktop';
};

/**
 * Détecte si l'application doit fonctionner en mode mobile
 * (soit appareil mobile, soit app native, soit PWA)
 */
export const shouldUseMobileInterface = (): boolean => {
  return isNativeApp() || isMobileDevice() || isPWA();
};
