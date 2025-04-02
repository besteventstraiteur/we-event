
import React, { useState } from 'react';
import DashboardLayout from "@/components/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import GoldButton from '@/components/GoldButton';
import VenueFormDialog from '@/components/venues/VenueFormDialog';
import AdminVenuesList from '@/components/venues/AdminVenuesList';
import FloorPlanViewDialog from '@/components/venues/FloorPlanViewDialog';
import FloorPlanEditDialog from '@/components/venues/FloorPlanEditDialog';

interface Venue {
  id: string;
  name: string;
  partner: string;
  location: string;
  capacity: number;
  description: string;
  floorPlan?: string;
}

const AdminVenues: React.FC = () => {
  const [venues, setVenues] = useState<Venue[]>([
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
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditingFloorPlan, setIsEditingFloorPlan] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
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

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Gestion des salles de réception</h1>
          <p className="text-vip-gray-400">Gérez les salles de réception de vos partenaires</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-vip-gray-400" />
            <Input
              type="search"
              placeholder="Rechercher une salle..."
              className="pl-9 bg-vip-gray-900 border-vip-gray-800 text-vip-white w-full sm:w-80"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <VenueFormDialog
            open={isAddDialogOpen}
            onOpenChange={setIsAddDialogOpen}
            selectedVenue={selectedVenue}
            onSave={handleSaveVenue}
          />
          <DialogTrigger asChild>
            <GoldButton onClick={() => {
              setSelectedVenue(null);
              setIsAddDialogOpen(true);
            }}>
              <Plus className="mr-2 h-4 w-4" /> Ajouter une salle
            </GoldButton>
          </DialogTrigger>
        </div>

        <Card className="bg-vip-gray-900 border-vip-gray-800">
          <CardHeader>
            <CardTitle>Liste des salles</CardTitle>
            <CardDescription>Gérez les salles de réception disponibles pour vos clients VIP</CardDescription>
          </CardHeader>
          <CardContent>
            <AdminVenuesList
              venues={filteredVenues}
              onViewFloorPlan={handleViewFloorPlan}
              onEditFloorPlan={handleEditFloorPlan}
              onEditVenue={handleEditVenue}
              onRemoveVenue={handleRemoveVenue}
            />
          </CardContent>
        </Card>
      </div>

      {/* Dialogs for viewing and editing floor plans */}
      <FloorPlanViewDialog
        open={viewFloorPlan}
        onOpenChange={setViewFloorPlan}
        venue={selectedVenue}
      />

      <FloorPlanEditDialog
        open={isEditingFloorPlan}
        onOpenChange={setIsEditingFloorPlan}
        venue={selectedVenue}
        onSave={handleSaveFloorPlan}
      />
    </DashboardLayout>
  );
};

export default AdminVenues;
