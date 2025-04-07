
import { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'app.lovable.ca616c0b2d17467885719db03e397c9e',
  appName: 'Best Events VIP',
  webDir: 'dist',
  bundledWebRuntime: false,
  // Configuration de serveur pour le développement
  server: {
    url: 'https://ca616c0b-2d17-4678-8571-9db03e397c9e.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  // Configuration pour iOS
  ios: {
    contentInset: 'always',
    allowsLinkPreview: false,
    scrollEnabled: true,
    statusBarStyle: 'dark',
    preferredContentMode: 'mobile',
    // Configuration des permissions
    permissions: {
      camera: {
        description: "Nous utilisons votre caméra pour prendre des photos lors de l'événement"
      },
      photos: {
        description: "Nous utilisons vos photos pour personnaliser votre expérience"
      },
      notifications: {
        description: "Recevoir des notifications importantes concernant votre événement"
      },
      location: {
        description: "Pour vous aider à trouver les lieux d'événements à proximité"
      }
    },
    // Configuration des icônes & splash screen
    backgroundColor: "#ffffff",
    scheme: "bestvip"
  },
  // Configuration pour Android
  android: {
    backgroundColor: "#FFFFFF",
    statusBarStyle: 'dark',
    statusBarBackgroundColor: '#FFFFFF',
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: false,
    // Configuration d'engagement utilisateur
    overrideUserAgent: false,
    // Configuration des notifications
    includePlugins: [
      "@capacitor/push-notifications"
    ],
    // Optimisations UI
    captureInput: true,
    useLegacyBridge: false,
    windowSoftInputMode: "adjustResize"
  },
  // Configuration globale des plugins
  plugins: {
    SplashScreen: {
      launchAutoHide: true,
      showSpinner: false,
      backgroundColor: "#FFFFFF",
      spinnerColor: "#D4AF37",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP"
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"]
    },
    Keyboard: {
      resize: 'body',
      style: 'dark',
      resizeOnFullScreen: true,
    },
    App: {
      appName: "Best Events VIP",
      appVersion: "1.0.0",
      appBuild: "1"
    },
    LocalNotifications: {
      smallIcon: "ic_notification",
      iconColor: "#D4AF37",
      sound: "notification.wav"
    },
    Device: {},
    CapacitorHttp: {},
    CapacitorCookies: {},
    WebView: {
      allowFileAccess: true,
      allowContentAccess: true
    }
  }
};

export default config;
