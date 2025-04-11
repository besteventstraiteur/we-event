
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Share } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PartnerTypeRoute from "@/components/security/PartnerTypeRoute";
import { PartnerType, UserRole } from "@/utils/accessControl";
import { Input } from "@/components/ui/input";

const PartnerFloorPlans = () => {
  const { toast } = useToast();
  const [clientEmail, setClientEmail] = useState("");
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  
  const mockPlans = [
    {
      id: "plan-1",
      name: "Plan Salle Grande Réception",
      maxGuests: 150,
    },
    {
      id: "plan-2",
      name: "Plan Espace Cocktail",
      maxGuests: 80,
    }
  ];
  
  const handleSharePlan = (planId: string) => {
    if (clientEmail) {
      toast({
        title: "Plan partagé",
        description: `Le plan a été partagé avec ${clientEmail} avec succès.`
      });
      setClientEmail("");
      setSelectedPlanId(null);
    } else {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez saisir l'adresse email du client."
      });
    }
  };

  return (
    <DashboardLayout type="partner">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold mb-6">Plans d'Aménagement</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nouveau Plan
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Mes Plans d'Aménagement</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">
              Gérez vos plans d'aménagement de salle et partagez-les avec vos clients.
            </p>
            
            <div className="space-y-4">
              {mockPlans.map((plan) => (
                <div key={plan.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{plan.name}</h3>
                      <p className="text-sm text-gray-500">Capacité: {plan.maxGuests} personnes</p>
                    </div>
                    <Button 
                      variant="outline"
                      onClick={() => setSelectedPlanId(plan.id)}
                    >
                      Partager
                    </Button>
                  </div>
                  
                  {selectedPlanId === plan.id && (
                    <div className="mt-4 flex items-center space-x-2">
                      <Input
                        placeholder="Email du client"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className="max-w-xs"
                      />
                      <Button onClick={() => handleSharePlan(plan.id)}>
                        <Share className="mr-2 h-4 w-4" />
                        Partager
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

// Wrap the component with the PartnerTypeRoute to restrict access
const ProtectedPartnerFloorPlans = () => (
  <PartnerTypeRoute 
    requiredRole={UserRole.PARTNER}
    allowedTypes={[PartnerType.VENUE, PartnerType.GENERAL]}
  >
    <PartnerFloorPlans />
  </PartnerTypeRoute>
);

export default ProtectedPartnerFloorPlans;
