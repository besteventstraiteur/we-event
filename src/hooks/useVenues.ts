
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Venue } from '@/types/venueTypes';

// Initial mock data for venues
const initialVenues: Venue[] = [
  {
    id: "1",
    name: "Château de Versailles",
    partner: "Châteaux Prestige",
    location: "Versailles, Île-de-France",
    capacity: 300,
    description: "Un lieu d'exception pour vos événements de prestige.",
    floorPlan: JSON.stringify({
      objects: [
        {
          type: 'rect',
          left: 50,
          top: 50,
          width: 700,
          height: 500,
          fill: 'white',
          stroke: '#ccc',
          strokeWidth: 2
        }
      ],
      background: "#f5f5f5"
    })
  },
  {
    id: "2",
    name: "Domaine des Roses",
    partner: "Jardins & Domaines",
    location: "Cannes, PACA",
    capacity: 150,
    description: "Un cadre idyllique pour vos cérémonies et réceptions.",
    floorPlan: JSON.stringify({
      objects: [
        {
          type: 'rect',
          left: 50,
          top: 50,
          width: 700,
          height: 400,
          fill: 'white',
          stroke: '#ccc',
          strokeWidth: 2
        }
      ],
      background: "#f5f5f5"
    })
  },
];

export const useVenues = () => {
  const [venues, setVenues] = useState<Venue[]>(initialVenues);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditingFloorPlan, setIsEditingFloorPlan] = useState(false);
  const [viewFloorPlan, setViewFloorPlan] = useState(false);
  const { toast } = useToast();

  const filteredVenues = venues.filter(venue => 
    venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    venue.partner.toLowerCase().includes(searchTerm.toLowerCase()) ||
    venue.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveVenue = (data: Venue) => {
    if (selectedVenue) {
      // Update existing venue
      setVenues(venues.map(v => v.id === selectedVenue.id ? {...data, id: selectedVenue.id, floorPlan: selectedVenue.floorPlan} : v));
      toast({
        title: "Salle modifiée",
        description: `La salle ${data.name} a été mise à jour avec succès`
      });
    } else {
      // Add new venue
      setVenues([...venues, {...data, id: Date.now().toString()}]);
      toast({
        title: "Salle ajoutée",
        description: `La salle ${data.name} a été ajoutée avec succès`
      });
    }
    
    setIsAddDialogOpen(false);
    setSelectedVenue(null);
  };

  const handleEditFloorPlan = (venue: Venue) => {
    setSelectedVenue(venue);
    setIsEditingFloorPlan(true);
  };

  const handleViewFloorPlan = (venue: Venue) => {
    setSelectedVenue(venue);
    setViewFloorPlan(true);
  };

  const handleEditVenue = (venue: Venue) => {
    setSelectedVenue(venue);
    setIsAddDialogOpen(true);
  };

  const handleSaveFloorPlan = (data: string) => {
    if (selectedVenue) {
      setVenues(venues.map(v => 
        v.id === selectedVenue.id 
          ? {...v, floorPlan: data} 
          : v
      ));
      toast({
        title: "Plan sauvegardé",
        description: `Le plan de ${selectedVenue.name} a été mis à jour avec succès`
      });
    }
    setIsEditingFloorPlan(false);
  };

  const handleRemoveVenue = (id: string) => {
    setVenues(venues.filter(v => v.id !== id));
    toast({
      title: "Salle supprimée",
      description: "La salle a été supprimée avec succès"
    });
  };

  return {
    venues: filteredVenues,
    searchTerm,
    setSearchTerm,
    selectedVenue,
    setSelectedVenue,
    isAddDialogOpen,
    setIsAddDialogOpen,
    isEditingFloorPlan,
    setIsEditingFloorPlan,
    viewFloorPlan,
    setViewFloorPlan,
    handleSaveVenue,
    handleEditFloorPlan,
    handleViewFloorPlan,
    handleEditVenue,
    handleSaveFloorPlan,
    handleRemoveVenue
  };
};
