
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface MapContextProps {
  mapKey: string;
  setMapKey: (key: string) => void;
  isKeySet: boolean;
  selectedMarkerId: string | null;
  setSelectedMarkerId: (id: string | null) => void;
}

const MapContext = createContext<MapContextProps | undefined>(undefined);

export const MapProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mapKey, setMapKey] = useState<string>("");
  const [isKeySet, setIsKeySet] = useState<boolean>(false);
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);
  
  // On component mount, check if API key is in localStorage
  useEffect(() => {
    const savedKey = localStorage.getItem('google_maps_api_key');
    if (savedKey) {
      setMapKey(savedKey);
      setIsKeySet(true);
    }
  }, []);

  const handleSetMapKey = (key: string) => {
    setMapKey(key);
    localStorage.setItem('google_maps_api_key', key);
    setIsKeySet(true);
  };

  return (
    <MapContext.Provider 
      value={{ 
        mapKey, 
        setMapKey: handleSetMapKey, 
        isKeySet, 
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
