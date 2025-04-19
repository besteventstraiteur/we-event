
import React from "react";
import { Heart, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGuest } from "@/hooks/useGuest";
import GuestMenuSelection from "@/components/guest-menu/GuestMenuSelection";
import DashboardLayout from "@/components/DashboardLayout";
import { useParams } from "react-router-dom";
import { useEvent } from "@/hooks/useEvent";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GuestEventDetails from "@/components/guest/GuestEventDetails";
import GuestRSVP from "@/components/guest/GuestRSVP";
import GuestGiftRegistry from "@/components/guest/GuestGiftRegistry";
import GuestPhotos from "@/components/guest/GuestPhotos";
import { Separator } from "@/components/ui/separator";

const GuestDashboard = () => {
  const { guestId } = useParams();
  const { guest, isLoading: isGuestLoading } = useGuest(guestId);
  const { event, isLoading: isEventLoading } = useEvent(guest?.event_id);
  
  const isLoading = isGuestLoading || isEventLoading;
  
  if (isLoading) {
    return (
      <DashboardLayout type="guest">
        <div className="flex items-center justify-center h-64">
          <p>Chargement des informations...</p>
        </div>
      </DashboardLayout>
    );
  }
  
  if (!guest || !event) {
    return (
      <DashboardLayout type="guest">
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-red-500 mb-4">Invité ou événement non trouvé</p>
          <Button variant="outline">Retour</Button>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout type="guest">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{event.title}</h1>
            <p className="text-muted-foreground">
              {new Date(event.date).toLocaleDateString('fr-FR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <Badge variant={guest.rsvp_status === 'confirmed' ? "success" : "outline"}>
            {guest.rsvp_status === 'confirmed' ? "Confirmé" : "En attente"}
          </Badge>
        </div>
        
        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <Heart className="h-8 w-8 text-red-500" />
              <span>Votre événement</span>
            </div>
            <Gift className="h-8 w-8 text-gold-500" />
          </CardContent>
        </Card>
        
        <Tabs defaultValue="details">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="details">Détails</TabsTrigger>
            <TabsTrigger value="rsvp">RSVP</TabsTrigger>
            <TabsTrigger value="gifts">Cadeaux</TabsTrigger>
            <TabsTrigger value="photos">Photos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details">
            <GuestEventDetails event={event} />
          </TabsContent>
          
          <TabsContent value="rsvp">
            <GuestRSVP guest={guest} event={event} />
          </TabsContent>
          
          <TabsContent value="gifts">
            <GuestGiftRegistry event={event} />
          </TabsContent>
          
          <TabsContent value="photos">
            <GuestPhotos event={event} />
          </TabsContent>
        </Tabs>
        
        <Separator />
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Sélection du menu</h2>
          <GuestMenuSelection />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default GuestDashboard;
