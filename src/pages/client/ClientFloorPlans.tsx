
import React, { useState, useEffect } from 'react';
import DashboardLayout from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FloorPlanner from '@/components/floor-planner/FloorPlanner';
import GuestList from '@/components/guests/GuestList';
import VenuesList from '@/components/venues/VenuesList';
import TableCreation from '@/components/floor-planner/TableCreation';
import TableAssignment from '@/components/floor-planner/TableAssignment';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { useGuestAssignment } from '@/hooks/useGuestAssignment';

// Liste d'invités initiale
const initialGuests = [
  {
    id: "1",
    nom: "Dupont",
    prenom: "Jean",
    email: "jean.dupont@example.com",
    telephone: "0612345678",
    ceremonie: true,
    vin: true,
    repas: true,
    brunch: false,
    conjoint: true,
    enfants: 0,
    table: "",
    notes: "",
    menuChoice: "standard"
  },
  {
    id: "2",
    nom: "Martin",
    prenom: "Sophie",
    email: "sophie.martin@example.com",
    telephone: "0687654321",
    ceremonie: true,
    vin: true,
    repas: true,
    brunch: true,
    conjoint: false,
    enfants: 1,
    table: "",
    notes: "Allergie aux fruits de mer",
    menuChoice: "allergies"
  },
  {
    id: "3",
    nom: "Petit",
    prenom: "Nicolas",
    email: "nicolas.petit@example.com",
    telephone: "0678901234",
    ceremonie: true,
    vin: true,
    repas: true,
    brunch: false,
    conjoint: true,
    enfants: 2,
    table: "",
    notes: "",
    menuChoice: "standard"
  },
  {
    id: "4",
    nom: "Durand",
    prenom: "Marie",
    email: "marie.durand@example.com",
    telephone: "0643218765",
    ceremonie: false,
    vin: true,
    repas: true,
    brunch: true,
    conjoint: false,
    enfants: 0,
    table: "",
    notes: "Végétarienne",
    menuChoice: "vegetarien"
  }
];

// Exemple de données pour les salles partenaires
const partnerVenues = [
  {
    id: "1",
    name: "Château de Versailles",
    partner: "Châteaux Prestige",
    location: "Versailles, Île-de-France",
    capacity: 300,
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
  {
    id: "3",
    name: "Le Grand Hôtel",
    partner: "Prestige Hotels Group",
    location: "Paris, Île-de-France",
    capacity: 200,
    floorPlan: JSON.stringify({
      objects: [
        {
          type: 'rect',
          left: 50,
          top: 50,
          width: 600,
          height: 450,
          fill: 'white',
          stroke: '#ccc',
          strokeWidth: 2
        }
      ],
      background: "#f5f5f5"
    })
  },
  {
    id: "4",
    name: "Villa Méditerranée",
    partner: "RivieraEvents",
    location: "Nice, PACA",
    capacity: 120,
    floorPlan: JSON.stringify({
      objects: [
        {
          type: 'rect',
          left: 50,
          top: 50,
          width: 500,
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

const ClientFloorPlans: React.FC = () => {
  const [savedFloorPlan, setSavedFloorPlan] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('plan');
  const [activeTableTab, setActiveTableTab] = useState('create');
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  // Utiliser notre hook pour la gestion des tables et des invités
  const {
    guests,
    setGuests,
    tables,
    createTable,
    updateTableName,
    deleteTable,
    assignGuestToSeat,
    unassignGuestFromSeat,
    getGuestsForTable,
    findSeatByGuestId
  } = useGuestAssignment(initialGuests);

  // Charger le plan de salle sauvegardé depuis le localStorage
  useEffect(() => {
    const savedPlan = localStorage.getItem('clientFloorPlan');
    if (savedPlan) {
      setSavedFloorPlan(savedPlan);
    }
  }, []);

  const handleSaveFloorPlan = (data: string) => {
    localStorage.setItem('clientFloorPlan', data);
    setSavedFloorPlan(data);
    toast({
      title: "Plan sauvegardé",
      description: "Votre plan de salle a été sauvegardé avec succès"
    });
  };

  return (
    <DashboardLayout type="client">
      <div className="space-y-4">
        <div>
          <h1 className={`font-bold text-gray-900 ${isMobile ? 'text-xl' : 'text-3xl'}`}>Organisation de votre événement</h1>
          <p className="text-gray-500 text-sm sm:text-base">Planifiez votre salle de réception et gérez vos invités</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-3">
          <div className="overflow-x-auto -mx-2 px-2">
            <TabsList className="bg-white border border-gray-200 w-full">
              <TabsTrigger 
                value="plan" 
                className="data-[state=active]:bg-vip-gold data-[state=active]:text-vip-black text-xs sm:text-sm"
              >
                Plan de salle
              </TabsTrigger>
              <TabsTrigger 
                value="tables" 
                className="data-[state=active]:bg-vip-gold data-[state=active]:text-vip-black text-xs sm:text-sm"
              >
                Tables et placements
              </TabsTrigger>
              <TabsTrigger 
                value="guests" 
                className="data-[state=active]:bg-vip-gold data-[state=active]:text-vip-black text-xs sm:text-sm"
              >
                Liste d'invités
              </TabsTrigger>
              <TabsTrigger 
                value="venues" 
                className="data-[state=active]:bg-vip-gold data-[state=active]:text-vip-black text-xs sm:text-sm"
              >
                Salles partenaires
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="plan" className="space-y-3 mt-2">
            <FloorPlanner 
              initialData={savedFloorPlan || undefined} 
              onSave={handleSaveFloorPlan} 
            />
          </TabsContent>
          
          <TabsContent value="tables" className="space-y-3 mt-2">
            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle>Gestion des tables</CardTitle>
                <CardDescription>Créez des tables et placez vos invités</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTableTab} onValueChange={setActiveTableTab}>
                  <TabsList className="mb-4">
                    <TabsTrigger 
                      value="create" 
                      className="data-[state=active]:bg-vip-gold data-[state=active]:text-vip-black"
                    >
                      Créer une table
                    </TabsTrigger>
                    <TabsTrigger 
                      value="assign" 
                      className="data-[state=active]:bg-vip-gold data-[state=active]:text-vip-black"
                    >
                      Placer les invités
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="create" className="mt-2">
                    <TableCreation onCreateTable={createTable} />
                  </TabsContent>
                  
                  <TabsContent value="assign" className="mt-2">
                    {tables.length > 0 ? (
                      <TableAssignment 
                        tables={tables}
                        guests={guests}
                        onUpdateTableName={updateTableName}
                        onDeleteTable={deleteTable}
                        onAssignGuest={assignGuestToSeat}
                        onUnassignGuest={unassignGuestFromSeat}
                        getGuestsForTable={getGuestsForTable}
                        findSeatByGuestId={findSeatByGuestId}
                      />
                    ) : (
                      <div className="text-center py-8 bg-gray-50 rounded-md">
                        <p className="text-gray-500">Aucune table créée</p>
                        <p className="text-sm text-gray-400 mt-1">Commencez par créer une table dans l'onglet "Créer une table"</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="guests" className="space-y-3 mt-2">
            <GuestList 
              initialGuests={guests} 
              onSave={setGuests}
              tables={tables.map(table => ({ id: table.id, name: table.name }))}
              menuOptions={[
                { id: "1-1", name: "Bœuf Wellington", menuName: "Menu Standard" },
                { id: "1-2", name: "Saumon en croûte d'herbes", menuName: "Menu Standard" },
                { id: "2-1", name: "Risotto aux champignons", menuName: "Menu Végétarien" },
                { id: "2-2", name: "Wellington végétarien", menuName: "Menu Végétarien" },
              ]}
            />
          </TabsContent>

          <TabsContent value="venues" className="space-y-3 mt-2">
            <VenuesList venues={partnerVenues} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ClientFloorPlans;
