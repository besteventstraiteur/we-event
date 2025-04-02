
import React, { useState } from "react";
import { PlusCircle, Users } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import GuestInvitationManager from "@/components/guests/GuestInvitationManager";
import GuestStatistics from "@/components/guests/GuestStatistics";
import GuestInvitationActions from "@/components/guests/GuestInvitationActions";
import GuestInvitationSender from "@/components/guests/GuestInvitationSender";
import GuestAccountsManager from "@/components/guests/GuestAccountsManager";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog } from "@/components/ui/dialog";
import { mockGuestsData } from "@/data/mockGuestsData";
import GuestFormDialog from "@/components/admin/guests/GuestFormDialog";
import { useToast } from "@/hooks/use-toast";
import { Guest } from "@/types/floorPlanTypes";

const ClientGuests = () => {
  const [activeTab, setActiveTab] = useState("invites");
  const [showGuestForm, setShowGuestForm] = useState(false);
  const [currentGuest, setCurrentGuest] = useState<Guest | null>(null);
  const [guests, setGuests] = useState(mockGuestsData);
  const { toast } = useToast();
  
  const handleAddGuest = () => {
    setCurrentGuest(null);
    setShowGuestForm(true);
  };
  
  const handleSaveGuest = (guest: Guest) => {
    if (currentGuest) {
      // Update existing guest
      setGuests(guests.map(g => g.id === guest.id ? guest : g));
      toast({
        title: "Invité mis à jour",
        description: "L'invité a été mis à jour avec succès"
      });
    } else {
      // Add new guest
      setGuests([...guests, {...guest, id: Date.now().toString()}]);
      toast({
        title: "Invité ajouté",
        description: "L'invité a été ajouté avec succès"
      });
    }
    setShowGuestForm(false);
  };

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
          <Button className="gap-2 sm:self-start" onClick={handleAddGuest}>
            <PlusCircle size={16} />
            Ajouter un invité
          </Button>
        </div>
        
        <GuestStatistics guests={guests} />
        
        <GuestInvitationSender guests={guests} />
        
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
            <TabsTrigger value="guestAccounts" className="flex items-center gap-1">
              <Users size={14} /> Espace Invités
            </TabsTrigger>
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
          
          <TabsContent value="guestAccounts" className="space-y-4">
            <GuestAccountsManager eventTitle="Notre Mariage - Sarah & Thomas" />
          </TabsContent>
        </Tabs>
        
        <Dialog open={showGuestForm} onOpenChange={setShowGuestForm}>
          <GuestFormDialog
            guest={currentGuest}
            onSave={handleSaveGuest}
            onCancel={() => setShowGuestForm(false)}
          />
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default ClientGuests;
