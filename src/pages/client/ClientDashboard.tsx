import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Headphones, Clock, Users, Bell } from "lucide-react";
import GoldButton from "@/components/GoldButton";
import EventCountdown from "@/components/client/EventCountdown";
import VendorChecklist from "@/components/client/VendorChecklist";
import EventDateEditor from "@/components/client/EventDateEditor";
import FeatureManager from "@/components/client/FeatureManager";

const ClientDashboard = () => {
  // Date fictive pour l'événement (à 3 mois dans le futur)
  const [eventDate, setEventDate] = useState(() => {
    const date = new Date();
    date.setMonth(date.getMonth() + 3);
    return date;
  });
  
  const handleDateChange = (newDate: Date) => {
    setEventDate(newDate);
  };
  
  return (
    <DashboardLayout type="client">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold truncate">Bienvenue, Client VIP</h1>
          <p className="text-muted-foreground">Voici vos informations et vos avantages exclusifs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-vip-gold flex items-center gap-2 truncate">
                <Users size={18} /> Partenaires
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold truncate">23</p>
              <p className="text-sm text-muted-foreground truncate">Partenaires VIP disponibles</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-vip-gold flex items-center gap-2 truncate">
                <Bell size={18} /> Demandes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold truncate">3</p>
              <p className="text-sm text-muted-foreground truncate">Demandes en cours</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-vip-gold flex items-center gap-2 truncate">
                <Headphones size={18} /> Podcasts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold truncate">12</p>
              <p className="text-sm text-muted-foreground truncate">Nouveaux contenus exclusifs</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-vip-gold flex items-center gap-2 truncate">
                <Clock size={18} /> Compte
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold truncate">Illimité</p>
              <p className="text-sm text-muted-foreground truncate">Durée d'accès</p>
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
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-vip-gold flex items-center gap-2 truncate">
                    <ClipboardCheck size={18} /> Checklist de préparation
                  </CardTitle>
                  <CardDescription className="truncate">Suivez vos tâches et celles de vos témoins</CardDescription>
                </div>
                <Link to="/client/todolist">
                  <GoldButton size="sm">
                    Voir tout
                  </GoldButton>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {['Choisir la date et le lieu', 'Sélectionner les témoins', 'Établir la liste d\'invités'].map((task, i) => (
                    <div key={i} className="flex items-center gap-2 py-2 border-b last:border-0">
                      <div className="w-5 h-5 rounded-full border border-vip-gold flex items-center justify-center">
                        {i === 2 && <div className="w-3 h-3 rounded-full bg-vip-gold" />}
                      </div>
                      <span className={`truncate ${i === 2 ? 'line-through text-gray-400' : ''}`}>{task}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <VendorChecklist />
          </div>

          <div className="space-y-6">
            <FeatureManager />
            <EventDateEditor 
              currentDate={eventDate}
              onDateChange={handleDateChange}
              eventName="Mon Mariage" 
            />

            <Card>
              <CardHeader>
                <CardTitle className="truncate">Derniers podcasts</CardTitle>
                <CardDescription className="truncate">Les derniers conseils exclusifs We Event</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4 p-2 rounded-md hover:bg-gray-50 transition-colors">
                    <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center text-vip-gold">
                      <Headphones size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">Comment choisir votre lieu de réception</h4>
                      <p className="text-sm text-muted-foreground truncate">We Event • 24 min</p>
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
                <CardTitle className="truncate">Partenaires recommandés</CardTitle>
                <CardDescription className="truncate">Sélectionnés spécialement pour vous</CardDescription>
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
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{partner.name}</h4>
                      <p className="text-sm text-muted-foreground truncate">{partner.category} • Réduction: {partner.discount}</p>
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
