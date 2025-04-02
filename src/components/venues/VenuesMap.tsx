
import React, { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface VenueMapProps {
  venues: any[];
  onVenueSelect?: (venueId: string) => void;
}

interface MapMarker {
  id: string;
  name: string;
  lat: number;
  lng: number;
  price?: string;
  imageUrl?: string;
}

const VenuesMap: React.FC<VenueMapProps> = ({ venues, onVenueSelect }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const [mapKey, setMapKey] = useState<string>("");
  
  // Créer les marqueurs à partir des données des salles
  const markers: MapMarker[] = venues
    .filter(venue => venue.coordinates?.lat && venue.coordinates?.lng)
    .map(venue => ({
      id: venue.id,
      name: venue.name,
      lat: venue.coordinates.lat,
      lng: venue.coordinates.lng,
      price: venue.price,
      imageUrl: venue.imageUrl
    }));

  useEffect(() => {
    // Cette fonction simule l'affichage d'une carte interactive
    // Dans un environnement de production, on utiliserait une vraie API cartographique
    const initMap = () => {
      if (!mapContainerRef.current) return;
      
      // Simuler un chargement de carte
      setTimeout(() => {
        setMapLoaded(true);
      }, 500);
    };

    initMap();
  }, []);

  const handleMarkerClick = (marker: MapMarker) => {
    setSelectedMarker(marker);
    if (onVenueSelect) {
      onVenueSelect(marker.id);
    }
  };

  return (
    <div className="w-full h-[500px] relative overflow-hidden rounded-lg border border-vip-gray-700 bg-vip-gray-800 mb-4">
      {/* Zone de carte simulée */}
      <div ref={mapContainerRef} className="w-full h-full bg-vip-gray-900 relative">
        {mapLoaded ? (
          <>
            {/* Afficher les marqueurs sur la carte */}
            {markers.map((marker) => (
              <div 
                key={marker.id}
                className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 
                  ${selectedMarker?.id === marker.id ? 'scale-125 z-20' : 'z-10 hover:scale-110'}`}
                style={{
                  // Positionnement simulé des marqueurs sur la carte
                  left: `${10 + (marker.lng + 180) * (80 / 360)}%`, 
                  top: `${30 + (90 - marker.lat) * (60 / 180)}%`
                }}
                onClick={() => handleMarkerClick(marker)}
              >
                <div className="flex flex-col items-center">
                  <div className={`text-vip-gold ${selectedMarker?.id === marker.id ? 'animate-pulse' : ''}`}>
                    <MapPin size={30} fill={selectedMarker?.id === marker.id ? "rgba(212, 175, 55, 0.3)" : "transparent"} />
                  </div>
                  <span className="text-xs font-semibold bg-vip-black bg-opacity-70 text-white px-2 py-1 rounded whitespace-nowrap">
                    {marker.name}
                  </span>
                </div>
              </div>
            ))}

            {/* Info popup pour le marqueur sélectionné */}
            {selectedMarker && (
              <div 
                className="absolute z-30 w-64 transform -translate-x-1/2"
                style={{
                  left: `${10 + (selectedMarker.lng + 180) * (80 / 360)}%`, 
                  top: `${15 + (90 - selectedMarker.lat) * (60 / 180)}%`
                }}
              >
                <Card className="bg-vip-gray-800 border-vip-gray-700 shadow-xl">
                  <div className="h-32 bg-vip-gray-700 relative overflow-hidden">
                    {selectedMarker.imageUrl ? (
                      <img 
                        src={selectedMarker.imageUrl} 
                        alt={selectedMarker.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-vip-gray-500">
                        <MapPin size={24} />
                      </div>
                    )}
                    {selectedMarker.price && (
                      <Badge className="absolute top-2 right-2 bg-vip-gold text-vip-black">
                        {selectedMarker.price}
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-medium text-white mb-2">{selectedMarker.name}</h3>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full border-vip-gray-600 text-vip-gray-400 hover:text-vip-white"
                      onClick={() => onVenueSelect?.(selectedMarker.id)}
                    >
                      Voir les détails
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </>
        ) : (
          // Affichage pendant le chargement
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-vip-gold"></div>
          </div>
        )}
        
        {/* Superposer un gradient pour un effet plus esthétique */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-vip-gray-900/20"></div>
        
        {/* Message d'information pour cette démo */}
        <div className="absolute bottom-4 left-4 right-4 bg-vip-black bg-opacity-70 text-white text-xs p-2 rounded">
          Note: Ceci est une simulation de carte. Dans une version en production, utilisez une API cartographique comme Mapbox ou Google Maps.
        </div>
      </div>
    </div>
  );
};

export default VenuesMap;
