
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './styles/calendar.css'; // Import our calendar styles
import './mobile-styles.css'; // Import mobile-specific styles
import { Toaster } from "@/components/ui/toaster";
import { Capacitor } from '@capacitor/core';

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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Toaster />
  </React.StrictMode>,
);

// Détection de la connectivité réseau
window.addEventListener('online', () => {
  console.log('App is online');
  // Vous pourriez synchroniser des données ici
});

window.addEventListener('offline', () => {
  console.log('App is offline');
  // Notifier l'utilisateur et activer le mode hors ligne
});

// Gestion de l'état de l'application pour les plates-formes natives
document.addEventListener('pause', () => {
  console.log('App paused');
  // Par exemple, mettez en pause la lecture multimédia ici
}, false);

document.addEventListener('resume', () => {
  console.log('App resumed');
  // Par exemple, rafraîchissez les données ici
}, false);
