
import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useMapContext } from './MapContext';

const MapKeyInput: React.FC = () => {
  const { setMapKey } = useMapContext();
  const [mapKeyInput, setMapKeyInput] = useState<string>("");

  const handleKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMapKey(mapKeyInput);
  };

  return (
    <div className="w-full h-[500px] flex items-center justify-center bg-vip-gray-800 rounded-lg border border-vip-gray-700">
      <div className="text-center p-6 max-w-md">
        <MapPin className="h-12 w-12 text-vip-gold mb-4 mx-auto" />
        <h3 className="text-white text-lg font-semibold mb-2">Configuration Google Maps requise</h3>
        <p className="text-vip-gray-400 mb-4">
          Pour afficher la carte des salles partenaires, veuillez entrer votre clé API Google Maps.
        </p>
        <form onSubmit={handleKeySubmit} className="space-y-3">
          <input
            type="text"
            value={mapKeyInput}
            onChange={(e) => setMapKeyInput(e.target.value)}
            placeholder="Entrez votre clé API Google Maps"
            className="w-full px-3 py-2 bg-vip-gray-900 border border-vip-gray-700 text-white rounded-md focus:ring-2 focus:ring-vip-gold focus:border-transparent"
          />
          <Button 
            type="submit" 
            className="w-full bg-vip-gold hover:bg-vip-gold/80 text-vip-black"
          >
            Configurer la carte
          </Button>
        </form>
        <p className="text-vip-gray-500 text-xs mt-3">
          Vous pouvez obtenir une clé API sur la 
          <a href="https://developers.google.com/maps/documentation/javascript/get-api-key" target="_blank" rel="noopener noreferrer" className="text-vip-gold hover:underline"> console Google Cloud</a>.
        </p>
      </div>
    </div>
  );
};

export default MapKeyInput;
