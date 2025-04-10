
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PartnerTypeRoute from "@/components/security/PartnerTypeRoute";
import { PartnerType, UserRole } from "@/utils/accessControl";
import { Input } from "@/components/ui/input";

const PartnerMenus = () => {
  const { toast } = useToast();
  const [clientEmail, setClientEmail] = useState("");
  
  const handleShareMenu = () => {
    if (clientEmail) {
      toast({
        title: "Menu partagé",
        description: `Le menu a été partagé avec ${clientEmail} avec succès.`
      });
      setClientEmail("");
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
          <h1 className="text-2xl font-bold">Gestion des menus</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nouveau menu
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Menus proposés</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">
              Cette section vous permet de gérer les menus proposés à vos clients.
              Vous pouvez ajouter, modifier et partager des options de menu.
            </p>
            
            <div className="border rounded-lg p-4 mb-4">
              <h3 className="font-medium mb-2">Menu Prestige</h3>
              <p className="text-sm text-gray-500 mb-4">
                Un menu gastronomique élaboré avec les meilleurs produits de saison.
              </p>
              
              <div className="flex items-center mt-4 space-x-2">
                <Input
                  placeholder="Email du client"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="max-w-xs"
                />
                <Button variant="outline" onClick={handleShareMenu}>
                  Partager
                </Button>
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <Button variant="outline">Ajouter un menu</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

// Wrap the component with the PartnerTypeRoute to restrict access
const ProtectedPartnerMenus = () => (
  <PartnerTypeRoute 
    requiredRole={UserRole.PARTNER}
    allowedTypes={[PartnerType.CATERER, PartnerType.GENERAL]}
  >
    <PartnerMenus />
  </PartnerTypeRoute>
);

export default ProtectedPartnerMenus;
