
import React, { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { useIsMobile } from '@/hooks/use-mobile';

interface AppWrapperProps {
  children: React.ReactNode;
}

const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  const [isNative, setIsNative] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Vérifier si l'application est exécutée en tant qu'application native
    setIsNative(Capacitor.isNativePlatform());
    
    // Désactiver le zoom sur mobile
    if (isMobile) {
      const metaViewport = document.querySelector('meta[name=viewport]');
      if (metaViewport) {
        metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover');
      }
      
      // Disable horizontal scrolling at the document level
      document.documentElement.style.overflowX = 'hidden';
      document.body.style.overflowX = 'hidden';
    }
  }, [isMobile]);

  return (
    <div className={`app-container ${isNative ? 'native-app' : 'web-app'} ${isMobile ? 'mobile-view' : ''} w-full max-w-full overflow-x-hidden`}>
      {/* Ajout d'une barre de statut pour l'application mobile */}
      {isNative && (
        <div className="status-bar-spacer h-6 bg-white w-full"></div>
      )}
      {children}
    </div>
  );
};

export default AppWrapper;
