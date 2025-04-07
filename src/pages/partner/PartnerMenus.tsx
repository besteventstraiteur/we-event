
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, FileText, Grid3X3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import FloorPlanEditDialog from "@/components/venues/FloorPlanEditDialog";
import { useVenues } from "@/hooks/useVenues";

const PartnerMenus = () => {
  const [activeTab, setActiveTab] = useState("menus");
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
          <h1 className="text-2xl font-bold">Gestion du lieu de réception</h1>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 w-full max-w-md mb-6">
            <TabsTrigger value="menus" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Menus
            </TabsTrigger>
            <TabsTrigger value="floor-plans" className="flex items-center gap-2">
              <Grid3X3 className="h-4 w-4" />
              Plans de salle
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="menus">
            <Card>
              <CardHeader>
                <CardTitle>Menus proposés</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Cette section vous permet de gérer les menus proposés à vos clients.
                  Vous pouvez ajouter, modifier et supprimer des options de menu.
                </p>
                
                <div className="mt-6">
                  <div className="text-center py-8 text-gray-500">
                    Plus de fonctionnalités de gestion de menus seront bientôt disponibles.
                  </div>
                </div>
                
                <div className="flex justify-end mt-4">
                  <Button variant="outline">Ajouter un menu</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="floor-plans">
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
          </TabsContent>
        </Tabs>
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

export default PartnerMenus;
