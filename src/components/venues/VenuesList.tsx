
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Search, Eye, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import FloorPlanner from '../floor-planner/FloorPlanner';

interface Venue {
  id: string;
  name: string;
  partner: string;
  location: string;
  capacity: number;
  floorPlan: string;
}

interface VenuesListProps {
  venues: Venue[];
}

const VenuesList: React.FC<VenuesListProps> = ({ venues = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [viewFloorPlan, setViewFloorPlan] = useState(false);
  const { toast } = useToast();

  const filteredVenues = venues.filter(venue => 
    venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    venue.partner.toLowerCase().includes(searchTerm.toLowerCase()) ||
    venue.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col">
      <Card className="bg-vip-gray-900 border-vip-gray-800 mb-4">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <CardTitle className="text-vip-white">Salles de réception partenaires</CardTitle>
              <CardDescription className="text-vip-gray-400">
                Explorez les plans des salles de nos partenaires
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative flex w-full max-w-sm mb-6">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-vip-gray-400" />
            <Input
              type="search"
              placeholder="Rechercher une salle..."
              className="pl-9 bg-vip-gray-800 border-vip-gray-700 text-vip-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredVenues.length > 0 ? (
              filteredVenues.map((venue) => (
                <Card key={venue.id} className="bg-vip-gray-800 border-vip-gray-700 overflow-hidden">
                  <div className="h-40 bg-vip-gray-700 flex items-center justify-center">
                    <svg className="h-12 w-12 text-vip-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-bold text-vip-white mb-1">{venue.name}</h3>
                    <p className="text-sm text-vip-gray-400 mb-2">{venue.partner}</p>
                    <div className="flex justify-between items-center text-sm text-vip-gray-400">
                      <span>{venue.location}</span>
                      <span>{venue.capacity} personnes</span>
                    </div>
                    <div className="flex mt-4 justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-vip-gray-400 border-vip-gray-600 hover:text-vip-white"
                        onClick={() => {
                          setSelectedVenue(venue);
                          setViewFloorPlan(true);
                        }}
                      >
                        <Eye size={16} className="mr-1" /> Voir le plan
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-vip-gray-400 hover:text-vip-white"
                        onClick={() => {
                          if (venue.floorPlan) {
                            const blob = new Blob([venue.floorPlan], { type: 'application/json' });
                            const link = document.createElement('a');
                            link.href = URL.createObjectURL(blob);
                            link.download = `${venue.name.replace(/\s+/g, '_').toLowerCase()}.json`;
                            link.click();
                            
                            toast({
                              description: `Plan téléchargé: ${venue.name}`
                            });
                          } else {
                            toast({
                              title: "Erreur",
                              description: "Plan non disponible",
                              variant: "destructive"
                            });
                          }
                        }}
                      >
                        <Download size={16} className="mr-1" /> Télécharger
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-vip-gray-400">
                Aucune salle trouvée
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modal pour afficher le plan */}
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
    </div>
  );
};

export default VenuesList;
