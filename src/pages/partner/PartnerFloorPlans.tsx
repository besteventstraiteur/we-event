
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Grid3X3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import FloorPlanEditDialog from "@/components/venues/FloorPlanEditDialog";
import { useVenues } from "@/hooks/useVenues";
import PartnerTypeRoute from "@/components/security/PartnerTypeRoute";
import { PartnerType } from "@/utils/accessControl";

const PartnerFloorPlans = () => {
  const { toast } = useToast();
  const [isFloorPlanDialogOpen, setIsFloorPlanDialogOpen] = useState(false);
  
  // Utiliser le hook useVenues pour la gestion des plans de salle
  const {
    venues,
    selectedVenue,
    setSelectedVenue,
    handleSaveFloorPlan
  } = useVenues();
  
  // Simuler la venue du partenaire connecté
  const partnerVenue = venues.length > 0 ? venues[0] : null;

  return (
    <DashboardLayout type="partner">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Gestion des plans de salle</h1>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Plans de votre lieu de réception</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">
              Cette section vous permet de gérer les plans de votre lieu de réception.
              Les clients pourront consulter ces plans pour mieux visualiser l'espace.
            </p>
            
            {partnerVenue ? (
              <div className="space-y-4">
                <div className="border rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{partnerVenue.name}</h3>
                    <p className="text-sm text-gray-500">
                      Capacité: {partnerVenue.capacity} personnes | Localisation: {partnerVenue.location}
                    </p>
                  </div>
                  <Button 
                    onClick={() => {
                      setSelectedVenue(partnerVenue);
                      setIsFloorPlanDialogOpen(true);
                    }}
                  >
                    {partnerVenue.floorPlan ? "Modifier le plan" : "Ajouter un plan"}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                Aucun lieu de réception associé à votre compte.
              </div>
            )}
            
            <div className="flex justify-end mt-8">
              <Button 
                onClick={() => {
                  toast({
                    title: "Fonctionnalité à venir",
                    description: "L'ajout de nouveaux lieux sera bientôt disponible."
                  });
                }}
              >
                <Plus className="mr-2 h-4 w-4" /> 
                Ajouter un lieu
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Dialog pour éditer le plan de salle */}
      <FloorPlanEditDialog
        open={isFloorPlanDialogOpen}
        onOpenChange={setIsFloorPlanDialogOpen}
        venue={selectedVenue}
        onSave={(floorPlanData) => {
          handleSaveFloorPlan(floorPlanData);
          setIsFloorPlanDialogOpen(false);
          toast({
            title: "Plan sauvegardé",
            description: "Le plan de votre lieu de réception a été mis à jour."
          });
        }}
      />
    </DashboardLayout>
  );
};

// Wrap the component with the PartnerTypeRoute to restrict access
const ProtectedPartnerFloorPlans = () => (
  <PartnerTypeRoute allowedTypes={[PartnerType.VENUE, PartnerType.GENERAL]}>
    <PartnerFloorPlans />
  </PartnerTypeRoute>
);

export default ProtectedPartnerFloorPlans;
