
import React, { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';

interface AppWrapperProps {
  children: React.ReactNode;
}

const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  const [isNative, setIsNative] = useState(false);
  
  useEffect(() => {
    // Vérifier si l'application est exécutée en tant qu'application native
    setIsNative(Capacitor.isNativePlatform());
  }, []);

  return (
    <div className={`app-container ${isNative ? 'native-app' : 'web-app'}`}>
      {/* Ajout d'une barre de statut pour l'application mobile */}
      {isNative && (
        <div className="status-bar-spacer h-6 bg-vip-gold w-full"></div>
      )}
      {children}
    </div>
  );
};

export default AppWrapper;
