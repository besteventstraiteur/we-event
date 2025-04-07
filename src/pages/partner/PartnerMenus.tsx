
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PartnerMenus = () => {
  return (
    <DashboardLayout type="partner">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Gestion des menus</h1>
          <Button variant="outline">Ajouter un menu</Button>
        </div>
        
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
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PartnerMenus;
