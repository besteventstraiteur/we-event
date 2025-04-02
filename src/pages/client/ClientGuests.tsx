import React, { useState } from "react";
import { PlusCircle, Download, Upload, MailPlus } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import GuestInvitationManager from "@/components/guests/GuestInvitationManager";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { mockGuestsData } from "@/data/mockGuestsData";

const GuestInvitationStats = () => {
  // Mock data - in a real app, this would be fetched from an API
  const totalGuests = mockGuestsData.length;
  const invitedGuests = totalGuests;
  const respondedGuests = mockGuestsData.filter(guest => 
    guest.ceremonie || guest.vin || guest.repas
  ).length;
  const pendingGuests = totalGuests - respondedGuests;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-vip-gold">{totalGuests}</span>
            <span className="text-sm text-gray-500">Invités au total</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-green-600">{respondedGuests}</span>
            <span className="text-sm text-gray-500">Réponses reçues</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-amber-600">{pendingGuests}</span>
            <span className="text-sm text-gray-500">En attente de réponse</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const InvitationActions = () => {
  const { toast } = useToast();
  
  const handleSendInvitations = () => {
    toast({
      title: "Invitations envoyées",
      description: "Les invitations ont été envoyées avec succès à tous les invités sans réponse",
    });
  };
  
  const handleSendReminders = () => {
    toast({
      title: "Rappels envoyés",
      description: "Les rappels ont été envoyés avec succès à tous les invités sans réponse",
    });
  };
  
  const handleExportGuests = () => {
    toast({
      title: "Liste exportée",
      description: "La liste des invités a été exportée avec succès",
    });
  };
  
  const handleImportGuests = () => {
    // In a real app, we would open a file dialog
    toast({
      title: "Liste importée",
      description: "La liste des invités a été importée avec succès",
    });
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg">Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <Button 
            variant="outline" 
            onClick={handleSendInvitations}
            className="gap-2"
          >
            <MailPlus size={16} />
            Envoyer invitations
          </Button>
          <Button 
            variant="outline" 
            onClick={handleSendReminders}
            className="gap-2"
          >
            <MailPlus size={16} />
            Envoyer rappels
          </Button>
          <Button 
            variant="outline" 
            onClick={handleExportGuests}
            className="gap-2"
          >
            <Download size={16} />
            Exporter liste
          </Button>
          <Button 
            variant="outline" 
            onClick={handleImportGuests}
            className="gap-2"
          >
            <Upload size={16} />
            Importer liste
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

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
        
        <GuestInvitationStats />
        
        <InvitationActions />
        
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
