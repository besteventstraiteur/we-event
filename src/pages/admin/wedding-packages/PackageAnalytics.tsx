
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Battery, Package, CreditCard, ShoppingCart } from "lucide-react";
import { Bar, BarChart as RechartsBarChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const PackageAnalytics = () => {
  // Données de démonstration pour les statistiques
  const salesData = [
    { name: "Janvier", ventes: 5 },
    { name: "Février", ventes: 7 },
    { name: "Mars", ventes: 12 },
    { name: "Avril", ventes: 9 },
    { name: "Mai", ventes: 15 },
    { name: "Juin", ventes: 18 },
  ];

  const packagePopularity = [
    { name: "Pack Essentiel", ventes: 28, color: "#9333ea" },
    { name: "Pack Élégance", ventes: 42, color: "#f59e0b" },
    { name: "Pack Prestige", ventes: 15, color: "#10b981" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="bg-vip-gray-900 border-vip-gray-800">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Ventes totales</CardTitle>
          <ShoppingCart className="h-4 w-4 text-vip-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">85</div>
          <p className="text-xs text-vip-gray-400">+23% par rapport au mois précédent</p>
        </CardContent>
      </Card>
      
      <Card className="bg-vip-gray-900 border-vip-gray-800">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Chiffre d'affaires</CardTitle>
          <CreditCard className="h-4 w-4 text-vip-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">162 450 €</div>
          <p className="text-xs text-vip-gray-400">+18% par rapport au mois précédent</p>
        </CardContent>
      </Card>
      
      <Card className="bg-vip-gray-900 border-vip-gray-800">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Taux de conversion</CardTitle>
          <Battery className="h-4 w-4 text-vip-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">8.3%</div>
          <p className="text-xs text-vip-gray-400">+1.2% par rapport au mois précédent</p>
        </CardContent>
      </Card>
      
      <Card className="bg-vip-gray-900 border-vip-gray-800">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Pack le plus vendu</CardTitle>
          <Package className="h-4 w-4 text-vip-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Pack Élégance</div>
          <p className="text-xs text-vip-gray-400">42 ventes ce trimestre</p>
        </CardContent>
      </Card>
      
      <Card className="col-span-1 md:col-span-2 bg-vip-gray-900 border-vip-gray-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Ventes par mois</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e1e1e', 
                    borderColor: '#333', 
                    borderRadius: '4px' 
                  }} 
                />
                <Bar dataKey="ventes" fill="#f59e0b" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card className="col-span-1 md:col-span-2 bg-vip-gray-900 border-vip-gray-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Popularité des packs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart
                data={packagePopularity}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 60, bottom: 20 }}
              >
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e1e1e', 
                    borderColor: '#333', 
                    borderRadius: '4px' 
                  }} 
                />
                <Bar dataKey="ventes">
                  {packagePopularity.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PackageAnalytics;
