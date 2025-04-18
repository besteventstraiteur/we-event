import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './styles/calendar.css'; // Import our calendar styles
import './mobile-styles.css'; // Import mobile-specific styles
import { Toaster } from "@/components/ui/toaster";
import { Capacitor } from '@capacitor/core';
import LoadingFallback from '@/components/LoadingFallback';
import { useNetworkStatus } from '@/utils/networkUtils'; // Changed from .tsx to .ts

// Pour une gestion correcte de la hauteur de viewport sur mobile
const setVhProperty = () => {
  // Set the value of --vh to the actual viewport height
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

// Set the property initially and on resize
setVhProperty();
window.addEventListener('resize', setVhProperty);
window.addEventListener('orientationchange', setVhProperty);

// Optimisations pour les appareils natifs
if (Capacitor.isNativePlatform()) {
  // Ajouter la classe 'native-app' au body pour les styles spécifiques
  document.body.classList.add('native-app');

  // Désactiver certains comportements par défaut du navigateur sur iOS
  document.addEventListener('touchmove', (e) => {
    if (e.target instanceof HTMLElement && e.target.classList.contains('no-bounce')) {
      e.preventDefault();
    }
  }, { passive: false });

  // Gestion du bouton retour Android
  document.addEventListener('backbutton', () => {
    const path = window.location.pathname;
    
    // Si nous sommes sur une page d'accueil, demandez à l'utilisateur s'il souhaite quitter
    if (path === '/' || path === '/login' || path.endsWith('/dashboard')) {
      if (confirm('Voulez-vous quitter l\'application?')) {
        (navigator as any).app?.exitApp();
      }
    } else {
      // Sinon, revenez simplement à la page précédente
      window.history.back();
    }
  });
}

// Handle iOS PWA navigation bar appearance
if (window.navigator && (window.navigator as any).standalone === true) {
  document.body.classList.add('ios-pwa');
}

// Enhanced mobile detection
const isTouchDevice = () => {
  return (('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0) ||
    (navigator as any).msMaxTouchPoints > 0);
};

if (isTouchDevice()) {
  document.body.classList.add('touch-device');
  
  // Optimize click delays
  document.addEventListener('touchstart', function() {}, {passive: true});
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<LoadingFallback />}>
      <App />
    </Suspense>
    <Toaster />
  </React.StrictMode>,
);

// Network Status Manager - for improved network handling
const NetworkStatusManager = () => {
  const { notifyOnline, notifyOffline } = useNetworkStatus();
  
  // Setup network event listeners
  React.useEffect(() => {
    const handleOnline = () => {
      console.log('App is online');
      notifyOnline({
        timestamp: Date.now(),
        method: 'GET', 
      });
    };
    
    const handleOffline = () => {
      console.log('App is offline');
      notifyOffline({
        timestamp: Date.now()
      });
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [notifyOnline, notifyOffline]);
  
  return null; // This component doesn't render anything
};

// Gestion de l'état de l'application pour les plates-formes natives
document.addEventListener('pause', () => {
  console.log('App paused');
  // Par exemple, mettez en pause la lecture multimédia ici
}, false);

document.addEventListener('resume', () => {
  console.log('App resumed');
  // Par exemple, rafraîchissez les données ici
}, false);

// Fast Click polyfill for older devices
if (isTouchDevice() && 'addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    // Add a slight delay to prevent double-tap issues
    let touchStartTime: number, touchEndTime: number;
    
    document.body.addEventListener('touchstart', function(e) {
      touchStartTime = Date.now();
    }, false);
    
    document.body.addEventListener('touchend', function(e) {
      touchEndTime = Date.now();
      
      // If touch event was short enough, it was likely a tap
      if (touchEndTime - touchStartTime < 300) {
        const target = e.target as HTMLElement;
        if (target.tagName === 'A' || target.tagName === 'BUTTON') {
          e.preventDefault();
          target.click();
        }
      }
    }, false);
  }, false);
}
