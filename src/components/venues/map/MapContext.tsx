
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useGoogleMapsApiKey } from '@/hooks/useGoogleMapsApiKey';

interface MapContextProps {
  mapKey: string;
  setMapKey: (key: string) => void;
  isKeySet: boolean;
  clearMapKey: () => void;
  selectedMarkerId: string | null;
  setSelectedMarkerId: (id: string | null) => void;
}

const MapContext = createContext<MapContextProps | undefined>(undefined);

export const MapProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { apiKey, setApiKey, isKeyValid, clearApiKey } = useGoogleMapsApiKey();
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);

  return (
    <MapContext.Provider 
      value={{ 
        mapKey: apiKey, 
        setMapKey: setApiKey, 
        isKeySet: isKeyValid,
        clearMapKey: clearApiKey,
        selectedMarkerId, 
        setSelectedMarkerId 
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = (): MapContextProps => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error('useMapContext must be used within a MapProvider');
  }
  return context;
};
