
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Headphones, Clock, Users, Bell } from "lucide-react";
import GoldButton from "@/components/GoldButton";

const ClientDashboard = () => {
  return (
    <DashboardLayout type="client">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Bienvenue, Client VIP</h1>
          <p className="text-vip-gray-400">Voici vos informations et vos avantages exclusifs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-vip-gray-900 border-vip-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-vip-gold flex items-center gap-2">
                <Users size={18} /> Partenaires
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-vip-white">23</p>
              <p className="text-sm text-vip-gray-400">Partenaires VIP disponibles</p>
            </CardContent>
          </Card>
          
          <Card className="bg-vip-gray-900 border-vip-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-vip-gold flex items-center gap-2">
                <Bell size={18} /> Demandes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-vip-white">3</p>
              <p className="text-sm text-vip-gray-400">Demandes en cours</p>
            </CardContent>
          </Card>
          
          <Card className="bg-vip-gray-900 border-vip-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-vip-gold flex items-center gap-2">
                <Headphones size={18} /> Podcasts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-vip-white">12</p>
              <p className="text-sm text-vip-gray-400">Nouveaux contenus exclusifs</p>
            </CardContent>
          </Card>
          
          <Card className="bg-vip-gray-900 border-vip-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-vip-gold flex items-center gap-2">
                <Clock size={18} /> Compte
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-vip-white">Illimité</p>
              <p className="text-sm text-vip-gray-400">Durée d'accès</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-vip-gray-900 border-vip-gray-800">
            <CardHeader>
              <CardTitle>Derniers podcasts</CardTitle>
              <CardDescription>Les derniers conseils exclusifs Best Events</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 p-2 rounded-md hover:bg-vip-gray-800 transition-colors">
                  <div className="w-12 h-12 bg-vip-gray-800 rounded-md flex items-center justify-center text-vip-gold">
                    <Headphones size={24} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-vip-white">Comment choisir votre lieu de réception</h4>
                    <p className="text-sm text-vip-gray-400">Best Events • 24 min</p>
                  </div>
                  <GoldButton variant="outline" size="sm">
                    Écouter
                  </GoldButton>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-vip-gray-900 border-vip-gray-800">
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
                <div key={i} className="flex items-center gap-4 p-2 rounded-md hover:bg-vip-gray-800 transition-colors">
                  <div className="w-12 h-12 bg-vip-gray-800 rounded-md flex items-center justify-center text-vip-gold">
                    {partner.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-vip-white">{partner.name}</h4>
                    <p className="text-sm text-vip-gray-400">{partner.category} • Réduction: {partner.discount}</p>
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
    </DashboardLayout>
  );
};

export default ClientDashboard;
