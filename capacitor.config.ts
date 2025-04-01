
import { CapacitorConfig } from '@capacitor/cli';

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
    statusBarStyle: 'light'
  },
  // Configuration spécifique pour Android
  android: {
    // Configuration du status bar
    backgroundColor: '#FFFFFF',
    // Utilisation des couleurs claires pour les icônes de status bar
    statusBarStyle: 'light'
  }
};

export default config;
