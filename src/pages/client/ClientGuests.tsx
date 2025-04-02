
import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import GuestInvitationManager from "@/components/guests/GuestInvitationManager";
import GuestStatistics from "@/components/guests/GuestStatistics";
import GuestInvitationActions from "@/components/guests/GuestInvitationActions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockGuestsData } from "@/data/mockGuestsData";

const ClientGuests = () => {
  const [activeTab, setActiveTab] = useState("invites");

  return (
    <DashboardLayout type="client">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Gestion des Invités</h1>
            <p className="text-gray-500">
              Invitez vos proches et suivez leurs réponses
            </p>
          </div>
          <Button className="gap-2 sm:self-start">
            <PlusCircle size={16} />
            Ajouter un invité
          </Button>
        </div>
        
        <GuestStatistics guests={mockGuestsData} />
        
        <GuestInvitationActions />
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList>
            <TabsTrigger value="invites">Liste des invités</TabsTrigger>
            <TabsTrigger value="groups">Groupes</TabsTrigger>
            <TabsTrigger value="seating">Plan de table</TabsTrigger>
          </TabsList>
          
          <TabsContent value="invites" className="space-y-4">
            <GuestInvitationManager />
          </TabsContent>
          
          <TabsContent value="groups" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Groupes d'invités</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Fonctionnalité à venir: Organisez vos invités en groupes pour faciliter la gestion
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="seating" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Plan de table</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Fonctionnalité à venir: Assignez vos invités à des tables pour créer votre plan de table
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ClientGuests;
