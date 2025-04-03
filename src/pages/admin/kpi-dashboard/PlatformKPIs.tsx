
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, DollarSign, Users, BarChart, TrendingUp, Clock } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Line, LineChart, Area, AreaChart, CartesianGrid } from "recharts";

// Mock data for platform KPIs
const eventGrowthData = [
  { month: "Jan", nombre: 24 },
  { month: "Fév", nombre: 28 },
  { month: "Mar", nombre: 32 },
  { month: "Avr", nombre: 38 },
  { month: "Mai", nombre: 45 },
  { month: "Juin", nombre: 52 },
];

const revenueData = [
  { month: "Jan", revenus: 12500, coûts: 8200 },
  { month: "Fév", revenus: 14800, coûts: 8900 },
  { month: "Mar", revenus: 16400, coûts: 9200 },
  { month: "Avr", revenus: 18900, coûts: 9800 },
  { month: "Mai", revenus: 22500, coûts: 10400 },
  { month: "Juin", revenus: 26800, coûts: 11200 },
];

const retentionData = [
  { month: "Jan", clients: 92, partenaires: 88 },
  { month: "Fév", clients: 93, partenaires: 89 },
  { month: "Mar", clients: 94, partenaires: 91 },
  { month: "Avr", clients: 95, partenaires: 92 },
  { month: "Mai", clients: 96, partenaires: 94 },
  { month: "Juin", clients: 97, partenaires: 95 },
];

const PlatformKPIs = () => {
  return (
    <div className="space-y-6">
      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-vip-gray-900 border-vip-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Événements</CardTitle>
            <Calendar className="h-4 w-4 text-vip-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">219</div>
            <p className="text-xs text-vip-gray-400">Mariages planifiés ce trimestre</p>
          </CardContent>
        </Card>
        
        <Card className="bg-vip-gray-900 border-vip-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Revenus</CardTitle>
            <DollarSign className="h-4 w-4 text-vip-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">112 400 €</div>
            <p className="text-xs text-vip-gray-400">CA mensuel, +16% ce mois</p>
          </CardContent>
        </Card>
        
        <Card className="bg-vip-gray-900 border-vip-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Rétention</CardTitle>
            <Users className="h-4 w-4 text-vip-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95.4%</div>
            <p className="text-xs text-vip-gray-400">Taux de rétention moyen</p>
          </CardContent>
        </Card>
        
        <Card className="bg-vip-gray-900 border-vip-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">ROI</CardTitle>
            <BarChart className="h-4 w-4 text-vip-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">235%</div>
            <p className="text-xs text-vip-gray-400">Retour sur investissement</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Detailed KPI Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-vip-gray-900 border-vip-gray-800">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Croissance des événements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={eventGrowthData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e1e1e', 
                      borderColor: '#333', 
                      borderRadius: '4px' 
                    }} 
                  />
                  <Area type="monotone" dataKey="nombre" fill="#8b5cf6" stroke="#8b5cf6" name="Nombre d'événements" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-vip-gray-900 border-vip-gray-800">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Revenus et coûts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e1e1e', 
                      borderColor: '#333', 
                      borderRadius: '4px' 
                    }}
                    formatter={(value) => [`${value} €`, undefined]}
                  />
                  <Legend />
                  <Bar dataKey="revenus" fill="#10b981" name="Revenus" />
                  <Bar dataKey="coûts" fill="#ef4444" name="Coûts" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Additional KPI Charts */}
      <div className="grid grid-cols-1 gap-6">
        <Card className="bg-vip-gray-900 border-vip-gray-800">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Taux de rétention</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={retentionData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[80, 100]} unit="%" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e1e1e', 
                      borderColor: '#333', 
                      borderRadius: '4px' 
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="clients" stroke="#f59e0b" name="Rétention clients" unit="%" />
                  <Line type="monotone" dataKey="partenaires" stroke="#3b82f6" name="Rétention partenaires" unit="%" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Additional KPI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-vip-gray-900 border-vip-gray-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium">Statistiques globales</CardTitle>
            <TrendingUp className="h-5 w-5 text-vip-gray-400" />
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex justify-between items-center border-b border-vip-gray-800 pb-2">
                <span className="text-vip-gray-400">Utilisateurs actifs</span>
                <span className="font-medium">4,560</span>
              </li>
              <li className="flex justify-between items-center border-b border-vip-gray-800 pb-2">
                <span className="text-vip-gray-400">Transactions réalisées</span>
                <span className="font-medium">12,345</span>
              </li>
              <li className="flex justify-between items-center border-b border-vip-gray-800 pb-2">
                <span className="text-vip-gray-400">Valeur moyenne par transaction</span>
                <span className="font-medium">156 €</span>
              </li>
              <li className="flex justify-between items-center border-b border-vip-gray-800 pb-2">
                <span className="text-vip-gray-400">Coût d'acquisition client</span>
                <span className="font-medium">42 €</span>
              </li>
              <li className="flex justify-between items-center border-b border-vip-gray-800 pb-2">
                <span className="text-vip-gray-400">Taux de croissance</span>
                <span className="font-medium">+24% annuel</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-vip-gray-400">Taux de conversion global</span>
                <span className="font-medium">8.7%</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="bg-vip-gray-900 border-vip-gray-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium">Performance technique</CardTitle>
            <Clock className="h-5 w-5 text-vip-gray-400" />
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex justify-between items-center border-b border-vip-gray-800 pb-2">
                <span className="text-vip-gray-400">Temps de chargement moyen</span>
                <span className="font-medium">1.8s</span>
              </li>
              <li className="flex justify-between items-center border-b border-vip-gray-800 pb-2">
                <span className="text-vip-gray-400">Disponibilité du service</span>
                <span className="font-medium">99.98%</span>
              </li>
              <li className="flex justify-between items-center border-b border-vip-gray-800 pb-2">
                <span className="text-vip-gray-400">Erreurs signalées</span>
                <span className="font-medium">12 ce mois</span>
              </li>
              <li className="flex justify-between items-center border-b border-vip-gray-800 pb-2">
                <span className="text-vip-gray-400">Temps de session moyen</span>
                <span className="font-medium">18 minutes</span>
              </li>
              <li className="flex justify-between items-center border-b border-vip-gray-800 pb-2">
                <span className="text-vip-gray-400">Pages vues par visite</span>
                <span className="font-medium">7.4</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-vip-gray-400">Taux de rebond</span>
                <span className="font-medium">18%</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PlatformKPIs;
