
import { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'app.lovable.ca616c0b2d17467885719db03e397c9e',
  appName: 'best-events-vip-platform',
  webDir: 'dist',
  server: {
    url: 'https://ca616c0b-2d17-4678-8571-9db03e397c9e.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  // Configuration spécifique pour iOS
  ios: {
    contentInset: 'always',
    // Configuration du status bar
    statusBarStyle: 'dark'
  },
  // Configuration spécifique pour Android
  android: {
    // Configuration du status bar
    backgroundColor: '#FFFFFF',
    // Utilisation des couleurs foncées pour les icônes de status bar
    statusBarStyle: 'dark'
  }
};

export default config;
