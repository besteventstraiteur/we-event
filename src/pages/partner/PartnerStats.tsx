
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const PartnerStats = () => {
  // Données simulées pour les statistiques
  const monthlyViews = [
    { name: "Jan", value: 120 },
    { name: "Fév", value: 180 },
    { name: "Mar", value: 210 },
    { name: "Avr", value: 280 },
    { name: "Mai", value: 320 },
    { name: "Juin", value: 450 },
    { name: "Juil", value: 380 },
    { name: "Aoû", value: 410 },
    { name: "Sep", value: 520 },
    { name: "Oct", value: 610 },
    { name: "Nov", value: 570 },
    { name: "Déc", value: 490 }
  ];

  const requestsData = [
    { name: "Jan", received: 5, converted: 2 },
    { name: "Fév", received: 8, converted: 3 },
    { name: "Mar", received: 12, converted: 5 },
    { name: "Avr", received: 15, converted: 7 },
    { name: "Mai", received: 18, converted: 10 },
    { name: "Juin", received: 22, converted: 12 }
  ];

  const categoryData = [
    { name: "Mariages", value: 45 },
    { name: "Anniversaires", value: 25 },
    { name: "Entreprise", value: 20 },
    { name: "Autres", value: 10 }
  ];

  const COLORS = ["#D4AF37", "#e3c154", "#f2d472", "#fff2b2"];

  const conversionRate = Math.round((requestsData.reduce((acc, curr) => acc + curr.converted, 0) / 
                        requestsData.reduce((acc, curr) => acc + curr.received, 0)) * 100);

  const totalViews = monthlyViews.reduce((acc, curr) => acc + curr.value, 0);
  const totalRequests = requestsData.reduce((acc, curr) => acc + curr.received, 0);
  const totalConversions = requestsData.reduce((acc, curr) => acc + curr.converted, 0);

  return (
    <DashboardLayout type="partner">
      <h1 className="text-2xl font-bold mb-6">Statistiques</h1>

      {/* Cartes de statistiques générales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="bg-vip-gray-900 border-vip-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-vip-white text-lg">Vues du profil</CardTitle>
            <CardDescription className="text-vip-gray-400">Total sur 12 mois</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-vip-gold">{totalViews.toLocaleString()}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-vip-gray-900 border-vip-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-vip-white text-lg">Demandes reçues</CardTitle>
            <CardDescription className="text-vip-gray-400">Total sur 6 mois</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-vip-gold">{totalRequests}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-vip-gray-900 border-vip-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-vip-white text-lg">Conversions</CardTitle>
            <CardDescription className="text-vip-gray-400">Demandes concrétisées</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-vip-gold">{totalConversions}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-vip-gray-900 border-vip-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-vip-white text-lg">Taux de conversion</CardTitle>
            <CardDescription className="text-vip-gray-400">Moyenne sur 6 mois</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-vip-gold">{conversionRate}%</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="views" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="views">Vues du profil</TabsTrigger>
          <TabsTrigger value="requests">Demandes</TabsTrigger>
          <TabsTrigger value="categories">Catégories</TabsTrigger>
        </TabsList>
        
        <TabsContent value="views">
          <Card className="bg-vip-gray-900 border-vip-gray-800">
            <CardHeader>
              <CardTitle className="text-vip-white">Vues mensuelles du profil</CardTitle>
              <CardDescription className="text-vip-gray-400">
                Nombre de clients VIP qui ont consulté votre profil
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={monthlyViews}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="name" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#222', 
                        border: '1px solid #444',
                        color: '#fff'
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#D4AF37" 
                      strokeWidth={2}
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="requests">
          <Card className="bg-vip-gray-900 border-vip-gray-800">
            <CardHeader>
              <CardTitle className="text-vip-white">Demandes et conversions</CardTitle>
              <CardDescription className="text-vip-gray-400">
                Nombre de demandes reçues vs. converties en contrats
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={requestsData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="name" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#222', 
                        border: '1px solid #444',
                        color: '#fff'
                      }} 
                    />
                    <Bar dataKey="received" fill="#666" name="Demandes reçues" />
                    <Bar dataKey="converted" fill="#D4AF37" name="Demandes converties" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="categories">
          <Card className="bg-vip-gray-900 border-vip-gray-800">
            <CardHeader>
              <CardTitle className="text-vip-white">Répartition par catégorie</CardTitle>
              <CardDescription className="text-vip-gray-400">
                Types d'événements pour lesquels vous êtes sollicité
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#222', 
                        border: '1px solid #444',
                        color: '#fff'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default PartnerStats;
