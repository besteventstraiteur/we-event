
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Headphones, Clock, Users, Bell } from "lucide-react";
import GoldButton from "@/components/GoldButton";
import EventCountdown from "@/components/client/EventCountdown";
import VendorChecklist from "@/components/client/VendorChecklist";

const ClientDashboard = () => {
  // Date fictive pour l'événement (à 3 mois dans le futur)
  const eventDate = new Date();
  eventDate.setMonth(eventDate.getMonth() + 3);
  
  return (
    <DashboardLayout type="client">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Bienvenue, Client VIP</h1>
          <p className="text-muted-foreground">Voici vos informations et vos avantages exclusifs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-vip-gold flex items-center gap-2">
                <Users size={18} /> Partenaires
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">23</p>
              <p className="text-sm text-muted-foreground">Partenaires VIP disponibles</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-vip-gold flex items-center gap-2">
                <Bell size={18} /> Demandes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">3</p>
              <p className="text-sm text-muted-foreground">Demandes en cours</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-vip-gold flex items-center gap-2">
                <Headphones size={18} /> Podcasts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-muted-foreground">Nouveaux contenus exclusifs</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-vip-gold flex items-center gap-2">
                <Clock size={18} /> Compte
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">Illimité</p>
              <p className="text-sm text-muted-foreground">Durée d'accès</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-6 lg:col-span-2">
            <EventCountdown 
              eventDate={eventDate} 
              eventName="Mon Mariage"
              eventLocation="Domaine des Roses, Paris"
            />
            
            <VendorChecklist />
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Derniers podcasts</CardTitle>
                <CardDescription>Les derniers conseils exclusifs Best Events</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4 p-2 rounded-md hover:bg-gray-50 transition-colors">
                    <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center text-vip-gold">
                      <Headphones size={24} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Comment choisir votre lieu de réception</h4>
                      <p className="text-sm text-muted-foreground">Best Events • 24 min</p>
                    </div>
                    <GoldButton variant="outline" size="sm">
                      Écouter
                    </GoldButton>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Partenaires recommandés</CardTitle>
                <CardDescription>Sélectionnés spécialement pour vous</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Domaine des Roses", category: "Domaine", discount: "15%" },
                  { name: "DJ Platine", category: "DJ", discount: "10%" },
                  { name: "Fleurs de Luxe", category: "Fleuriste", discount: "20%" },
                ].map((partner, i) => (
                  <div key={i} className="flex items-center gap-4 p-2 rounded-md hover:bg-gray-50 transition-colors">
                    <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center text-vip-gold">
                      {partner.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{partner.name}</h4>
                      <p className="text-sm text-muted-foreground">{partner.category} • Réduction: {partner.discount}</p>
                    </div>
                    <GoldButton variant="outline" size="sm">
                      Contacter
                    </GoldButton>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClientDashboard;
