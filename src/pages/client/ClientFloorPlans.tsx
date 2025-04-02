
import React, { useState, useEffect } from 'react';
import DashboardLayout from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FloorPlanner from '@/components/floor-planner/FloorPlanner';
import GuestList from '@/components/guests/GuestList';
import VenuesList from '@/components/venues/VenuesList';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const { toast } = useToast();
  const isMobile = useIsMobile();

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

          <TabsContent value="guests" className="space-y-3 mt-2">
            <GuestList />
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
