
import React, { useState } from 'react';
import DashboardLayout from "@/components/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import GoldButton from '@/components/GoldButton';
import FloorPlanner from '@/components/floor-planner/FloorPlanner';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';

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

  const form = useForm<Venue>({
    defaultValues: {
      id: '',
      name: '',
      partner: '',
      location: '',
      capacity: 0,
      description: '',
      floorPlan: undefined
    }
  });

  React.useEffect(() => {
    if (selectedVenue) {
      form.reset(selectedVenue);
    } else {
      form.reset({
        id: Date.now().toString(),
        name: '',
        partner: '',
        location: '',
        capacity: 0,
        description: '',
        floorPlan: undefined
      });
    }
  }, [selectedVenue, form]);

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
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <GoldButton onClick={() => setSelectedVenue(null)}>
                <Plus className="mr-2 h-4 w-4" /> Ajouter une salle
              </GoldButton>
            </DialogTrigger>
            <DialogContent className="bg-vip-gray-900 border-vip-gray-800 text-vip-white">
              <DialogHeader>
                <DialogTitle>{selectedVenue ? 'Modifier une salle' : 'Ajouter une salle'}</DialogTitle>
                <DialogDescription className="text-vip-gray-400">
                  {selectedVenue 
                    ? 'Modifiez les informations de la salle de réception' 
                    : 'Ajoutez une nouvelle salle de réception partenaire'}
                </DialogDescription>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSaveVenue)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom de la salle</FormLabel>
                          <FormControl>
                            <Input 
                              className="bg-vip-gray-800 border-vip-gray-700 text-vip-white" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="partner"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Partenaire</FormLabel>
                          <FormControl>
                            <Input 
                              className="bg-vip-gray-800 border-vip-gray-700 text-vip-white" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Emplacement</FormLabel>
                          <FormControl>
                            <Input 
                              className="bg-vip-gray-800 border-vip-gray-700 text-vip-white" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="capacity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Capacité (personnes)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number"
                              className="bg-vip-gray-800 border-vip-gray-700 text-vip-white" 
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            className="bg-vip-gray-800 border-vip-gray-700 text-vip-white min-h-[100px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter>
                    <Button 
                      type="button"
                      variant="outline" 
                      className="border-vip-gray-700 text-vip-gray-400 hover:text-vip-white"
                      onClick={() => {
                        setIsAddDialogOpen(false);
                        setSelectedVenue(null);
                      }}
                    >
                      Annuler
                    </Button>
                    <GoldButton type="submit">
                      {selectedVenue ? 'Mettre à jour' : 'Ajouter'}
                    </GoldButton>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="bg-vip-gray-900 border-vip-gray-800">
          <CardHeader>
            <CardTitle>Liste des salles</CardTitle>
            <CardDescription>Gérez les salles de réception disponibles pour vos clients VIP</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b-vip-gray-800 hover:bg-transparent">
                    <TableHead className="text-vip-gray-400">Nom</TableHead>
                    <TableHead className="text-vip-gray-400">Partenaire</TableHead>
                    <TableHead className="text-vip-gray-400">Emplacement</TableHead>
                    <TableHead className="text-vip-gray-400">Capacité</TableHead>
                    <TableHead className="text-vip-gray-400">Plan</TableHead>
                    <TableHead className="text-vip-gray-400 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVenues.length > 0 ? (
                    filteredVenues.map((venue) => (
                      <TableRow key={venue.id} className="border-b border-vip-gray-800 hover:bg-vip-gray-800/50">
                        <TableCell className="font-medium text-vip-white">
                          {venue.name}
                        </TableCell>
                        <TableCell className="text-vip-gray-400">
                          {venue.partner}
                        </TableCell>
                        <TableCell className="text-vip-gray-400">
                          {venue.location}
                        </TableCell>
                        <TableCell className="text-vip-white">
                          {venue.capacity} personnes
                        </TableCell>
                        <TableCell className="text-vip-white">
                          {venue.floorPlan ? (
                            <span className="text-green-500">Disponible</span>
                          ) : (
                            <span className="text-red-500">Non disponible</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedVenue(venue);
                                setViewFloorPlan(true);
                              }}
                              className="h-8 text-vip-gray-400 hover:text-vip-white"
                              disabled={!venue.floorPlan}
                            >
                              <Eye size={16} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditFloorPlan(venue)}
                              className="h-8 text-vip-gray-400 hover:text-vip-white"
                            >
                              <Edit size={16} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedVenue(venue);
                                setIsAddDialogOpen(true);
                              }}
                              className="h-8 text-vip-gray-400 hover:text-vip-white"
                            >
                              <Edit size={16} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveVenue(venue.id)}
                              className="h-8 text-vip-gray-400 hover:text-red-500"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6 text-vip-gray-400">
                        Aucune salle trouvée
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal pour visualiser le plan */}
      <Dialog open={viewFloorPlan} onOpenChange={setViewFloorPlan}>
        <DialogContent className="bg-vip-gray-900 border-vip-gray-800 text-vip-white max-w-5xl">
          <DialogHeader>
            <DialogTitle>Plan de salle: {selectedVenue?.name}</DialogTitle>
            <DialogDescription className="text-vip-gray-400">
              Capacité: {selectedVenue?.capacity} personnes | Partenaire: {selectedVenue?.partner}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            {selectedVenue?.floorPlan ? (
              <FloorPlanner initialData={selectedVenue.floorPlan} readOnly={true} />
            ) : (
              <div className="text-center py-10 text-vip-gray-400">
                Plan non disponible pour cette salle
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              className="border-vip-gray-700 text-vip-gray-400 hover:text-vip-white"
              onClick={() => setViewFloorPlan(false)}
            >
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal pour éditer le plan */}
      <Dialog open={isEditingFloorPlan} onOpenChange={setIsEditingFloorPlan}>
        <DialogContent className="bg-vip-gray-900 border-vip-gray-800 text-vip-white max-w-6xl h-[90vh]">
          <DialogHeader>
            <DialogTitle>Éditer le plan: {selectedVenue?.name}</DialogTitle>
            <DialogDescription className="text-vip-gray-400">
              Créez ou modifiez le plan de cette salle
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 h-full overflow-auto">
            {selectedVenue && (
              <FloorPlanner 
                initialData={selectedVenue.floorPlan} 
                onSave={handleSaveFloorPlan} 
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default AdminVenues;
