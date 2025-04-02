
import React, { useState, useCallback } from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
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

const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

const defaultCenter = {
  lat: 46.603354, // Center of France approximately
  lng: 1.888334
};

const VenuesMap: React.FC<VenueMapProps> = ({ venues, onVenueSelect }) => {
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const [mapKey, setMapKey] = useState<string>("");
  const [mapKeyInput, setMapKeyInput] = useState<string>("");
  const [isKeySet, setIsKeySet] = useState<boolean>(false);
  
  // Create markers from venue data
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

  // Load Google Maps API
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: mapKey || 'PLACEHOLDER_API_KEY', // Replace with your API key
    id: 'google-map-script'
  });

  const handleMarkerClick = (marker: MapMarker) => {
    setSelectedMarker(marker);
    if (onVenueSelect) {
      onVenueSelect(marker.id);
    }
  };

  const handleMapClick = () => {
    setSelectedMarker(null);
  };

  const handleKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMapKey(mapKeyInput);
    localStorage.setItem('google_maps_api_key', mapKeyInput);
    setIsKeySet(true);
  };

  // On component mount, check if API key is in localStorage
  React.useEffect(() => {
    const savedKey = localStorage.getItem('google_maps_api_key');
    if (savedKey) {
      setMapKey(savedKey);
      setIsKeySet(true);
    }
  }, []);

  if (loadError) {
    return (
      <div className="w-full h-[500px] flex items-center justify-center bg-vip-gray-800 rounded-lg border border-vip-gray-700">
        <div className="text-center p-6">
          <MapPin className="h-12 w-12 text-vip-gold mb-4 mx-auto" />
          <h3 className="text-white text-lg font-semibold mb-2">Erreur de chargement de la carte</h3>
          <p className="text-vip-gray-400">Impossible de charger Google Maps. Veuillez vérifier votre connexion et réessayer.</p>
        </div>
      </div>
    );
  }

  if (!isKeySet) {
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
  }

  return (
    <div className="w-full h-[500px] relative overflow-hidden rounded-lg border border-vip-gray-700 bg-vip-gray-800 mb-4">
      {!isLoaded ? (
        // Loading indicator
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-vip-gold"></div>
        </div>
      ) : (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={selectedMarker ? { lat: selectedMarker.lat, lng: selectedMarker.lng } : defaultCenter}
          zoom={selectedMarker ? 12 : 6}
          onClick={handleMapClick}
          options={{
            styles: [
              { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
              { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
              { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
              {
                featureType: "administrative.locality",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
              },
              {
                featureType: "poi",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
              },
              {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [{ color: "#263c3f" }],
              },
              {
                featureType: "poi.park",
                elementType: "labels.text.fill",
                stylers: [{ color: "#6b9a76" }],
              },
              {
                featureType: "road",
                elementType: "geometry",
                stylers: [{ color: "#38414e" }],
              },
              {
                featureType: "road",
                elementType: "geometry.stroke",
                stylers: [{ color: "#212a37" }],
              },
              {
                featureType: "road",
                elementType: "labels.text.fill",
                stylers: [{ color: "#9ca5b3" }],
              },
              {
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [{ color: "#746855" }],
              },
              {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [{ color: "#1f2835" }],
              },
              {
                featureType: "road.highway",
                elementType: "labels.text.fill",
                stylers: [{ color: "#f3d19c" }],
              },
              {
                featureType: "transit",
                elementType: "geometry",
                stylers: [{ color: "#2f3948" }],
              },
              {
                featureType: "transit.station",
                elementType: "labels.text.fill",
                stylers: [{ color: "#d59563" }],
              },
              {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#17263c" }],
              },
              {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [{ color: "#515c6d" }],
              },
              {
                featureType: "water",
                elementType: "labels.text.stroke",
                stylers: [{ color: "#17263c" }],
              },
            ],
          }}
        >
          {/* Render markers on the map */}
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => handleMarkerClick(marker)}
              icon={{
                url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTExLjI5MDUgMjEuNzYyMkMxMS4yOTA1IDIxLjc2MjIgMTkuMjkwNSAxNi43NjIyIDE5LjI5MDUgMTAuNzYyMkMxOS4yOTA1IDYuNDQ3OTEgMTUuNjA0OCAzIDE5LjI5MDUgM0M2Ljk3NzE3IDMgMi4yOTA1NCA3LjY4NjYzIDIyLjI5MDUgMTAuNzYyMkMyLjI5MDU0IDE2Ljc2MjIgMTAuMjkwNSAyMS43NjIyIDEwLjI5MDUgMjEuNzYyMkMxMC41NTcgMjIuMDc5NiAxMS4wMjQgMjIuMDc5NiAxMS4yOTA1IDIxLjc2MjJaIiBmaWxsPSIjRDRBRjM3IiBzdHJva2U9IiNENEFGMzciIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+',
                scaledSize: new google.maps.Size(32, 32),
                anchor: new google.maps.Point(16, 32),
              }}
            />
          ))}

          {/* InfoWindow for the selected marker */}
          {selectedMarker && (
            <InfoWindow
              position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <Card className="bg-vip-gray-800 border-vip-gray-700 shadow-xl max-w-[250px]">
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
            </InfoWindow>
          )}
        </GoogleMap>
      )}
      
      {/* Add gradient overlay for aesthetics */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-vip-gray-900/20"></div>
    </div>
  );
};

export default VenuesMap;
