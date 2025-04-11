
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RecommendationForm from "@/components/partner/RecommendationForm";

const PartnerRecommendations = () => {
  return (
    <DashboardLayout type="partner">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Recommandations</h1>
          <p className="text-gray-500">
            Recommandez d'autres partenaires à vos clients et suivez vos recommandations
          </p>
        </div>
        
        <Tabs defaultValue="create" className="w-full">
          <TabsList>
            <TabsTrigger value="create">Créer une recommandation</TabsTrigger>
            <TabsTrigger value="sent">Envoyées</TabsTrigger>
            <TabsTrigger value="received">Reçues</TabsTrigger>
          </TabsList>
          
          <TabsContent value="create" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recommander un partenaire</CardTitle>
              </CardHeader>
              <CardContent>
                <RecommendationForm />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="sent" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recommandations envoyées</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Vous n'avez pas encore envoyé de recommandations.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="received" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recommandations reçues</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Vous n'avez pas encore reçu de recommandations.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default PartnerRecommendations;
