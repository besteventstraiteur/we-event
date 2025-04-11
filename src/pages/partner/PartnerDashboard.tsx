
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarCheck, Users, AlertTriangle, TrendingUp, MessageSquare, Clock } from "lucide-react";

const PartnerDashboard = () => {
  return (
    <DashboardLayout type="partner">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Tableau de Bord</h1>
          <p className="text-gray-500">
            Bienvenue dans votre espace partenaire. Consultez vos dernières statistiques et activités.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Demandes en attente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
                <p className="text-2xl font-bold">4</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Événements à venir</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <CalendarCheck className="h-4 w-4 text-green-500 mr-2" />
                <p className="text-2xl font-bold">8</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Visites du profil</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-4 w-4 text-blue-500 mr-2" />
                <p className="text-2xl font-bold">347</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Taux de conversion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 text-purple-500 mr-2" />
                <p className="text-2xl font-bold">18.5%</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList>
            <TabsTrigger value="upcoming">À venir</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="tasks">Tâches</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Événements à venir</CardTitle>
                <CardDescription>
                  Les événements pour lesquels vous êtes réservé dans les prochaines semaines
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start border-b pb-4">
                    <div className="bg-blue-100 p-2 rounded-md mr-4">
                      <CalendarCheck className="h-5 w-5 text-blue-700" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">Mariage de Sophie & Thomas</h3>
                      <p className="text-sm text-gray-500">12 Juin 2025</p>
                    </div>
                    <div className="bg-amber-100 px-2 py-1 rounded text-amber-800 text-xs font-medium">
                      Dans 2 mois
                    </div>
                  </div>
                  
                  <div className="flex items-start border-b pb-4">
                    <div className="bg-blue-100 p-2 rounded-md mr-4">
                      <CalendarCheck className="h-5 w-5 text-blue-700" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">Mariage de Marie & Jean</h3>
                      <p className="text-sm text-gray-500">26 Juillet 2025</p>
                    </div>
                    <div className="bg-amber-100 px-2 py-1 rounded text-amber-800 text-xs font-medium">
                      Dans 3 mois
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="messages" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Messages récents</CardTitle>
                <CardDescription>
                  Derniers messages reçus de vos clients
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start border-b pb-4">
                    <div className="bg-green-100 p-2 rounded-md mr-4">
                      <MessageSquare className="h-5 w-5 text-green-700" />
                    </div>
                    <div>
                      <p className="font-medium">Sophie & Thomas</p>
                      <p className="text-sm text-gray-700">Nous aimerions discuter des derniers détails pour notre événement...</p>
                      <p className="text-xs text-gray-500 mt-1">Il y a 2 heures</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-green-100 p-2 rounded-md mr-4">
                      <MessageSquare className="h-5 w-5 text-green-700" />
                    </div>
                    <div>
                      <p className="font-medium">Claire & Antoine</p>
                      <p className="text-sm text-gray-700">Pouvez-vous nous envoyer un devis détaillé pour les services demandés ?</p>
                      <p className="text-xs text-gray-500 mt-1">Il y a 1 jour</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tasks" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Tâches en cours</CardTitle>
                <CardDescription>
                  Tâches prioritaires à effectuer
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start border-b pb-4">
                    <div className="bg-red-100 p-2 rounded-md mr-4">
                      <Clock className="h-5 w-5 text-red-700" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">Confirmer le menu avec Sophie & Thomas</h3>
                      <p className="text-sm text-gray-500">Échéance: 15 avril 2025</p>
                    </div>
                    <div className="bg-red-100 px-2 py-1 rounded text-red-800 text-xs font-medium">
                      Urgent
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-amber-100 p-2 rounded-md mr-4">
                      <Clock className="h-5 w-5 text-amber-700" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">Mettre à jour le portfolio</h3>
                      <p className="text-sm text-gray-500">Échéance: 30 avril 2025</p>
                    </div>
                    <div className="bg-amber-100 px-2 py-1 rounded text-amber-800 text-xs font-medium">
                      Important
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default PartnerDashboard;
