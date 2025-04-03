
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Clock, Award, PieChart as PieChartIcon, Users, ArrowUpRight } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell, Pie, PieChart } from "recharts";

// Mock data for partner KPIs
const conversionRateData = [
  { month: "Jan", taux: 12 },
  { month: "Fév", taux: 14 },
  { month: "Mar", taux: 15 },
  { month: "Avr", taux: 18 },
  { month: "Mai", taux: 21 },
  { month: "Juin", taux: 24 },
];

const categoryDistributionData = [
  { name: "Photographie", value: 35, color: "#f59e0b" },
  { name: "Traiteur", value: 25, color: "#10b981" },
  { name: "Lieu", value: 20, color: "#3b82f6" },
  { name: "DJ", value: 15, color: "#8b5cf6" },
  { name: "Décoration", value: 5, color: "#ec4899" },
];

const PartnerKPIs = () => {
  return (
    <div className="space-y-6">
      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-vip-gray-900 border-vip-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Taux de conversion</CardTitle>
            <ShoppingCart className="h-4 w-4 text-vip-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18.5%</div>
            <p className="text-xs text-vip-gray-400">+3.2% par rapport au mois précédent</p>
          </CardContent>
        </Card>
        
        <Card className="bg-vip-gray-900 border-vip-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Temps de réponse</CardTitle>
            <Clock className="h-4 w-4 text-vip-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2h</div>
            <p className="text-xs text-vip-gray-400">Délai moyen de réponse aux demandes</p>
          </CardContent>
        </Card>
        
        <Card className="bg-vip-gray-900 border-vip-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Recommandations</CardTitle>
            <Award className="h-4 w-4 text-vip-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">253</div>
            <p className="text-xs text-vip-gray-400">Envoyées ce trimestre</p>
          </CardContent>
        </Card>
        
        <Card className="bg-vip-gray-900 border-vip-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction</CardTitle>
            <PieChartIcon className="h-4 w-4 text-vip-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8/5</div>
            <p className="text-xs text-vip-gray-400">Note moyenne des prestataires</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Detailed KPI Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-vip-gray-900 border-vip-gray-800">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Taux de conversion mensuel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={conversionRateData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <XAxis dataKey="month" />
                  <YAxis unit="%" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e1e1e', 
                      borderColor: '#333', 
                      borderRadius: '4px' 
                    }} 
                  />
                  <Bar dataKey="taux" fill="#10b981" name="Taux de conversion" unit="%" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-vip-gray-900 border-vip-gray-800">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Distribution par catégorie</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <Pie
                    data={categoryDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e1e1e', 
                      borderColor: '#333', 
                      borderRadius: '4px' 
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Additional KPI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-vip-gray-900 border-vip-gray-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium">Activité partenaires</CardTitle>
            <Users className="h-5 w-5 text-vip-gray-400" />
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex justify-between items-center border-b border-vip-gray-800 pb-2">
                <span className="text-vip-gray-400">Prestataires actifs</span>
                <span className="font-medium">87</span>
              </li>
              <li className="flex justify-between items-center border-b border-vip-gray-800 pb-2">
                <span className="text-vip-gray-400">Demandes reçues</span>
                <span className="font-medium">345 ce mois</span>
              </li>
              <li className="flex justify-between items-center border-b border-vip-gray-800 pb-2">
                <span className="text-vip-gray-400">Taux de réponse</span>
                <span className="font-medium">96.8%</span>
              </li>
              <li className="flex justify-between items-center border-b border-vip-gray-800 pb-2">
                <span className="text-vip-gray-400">Réponses rapides (&lt; 2h)</span>
                <span className="font-medium">73%</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-vip-gray-400">Taux de participation au programme de fidélité</span>
                <span className="font-medium">82%</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="bg-vip-gray-900 border-vip-gray-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium">Top prestataires</CardTitle>
            <ArrowUpRight className="h-5 w-5 text-vip-gray-400" />
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {[
                { name: "Studio Photo Elite", category: "Photographe", conversion: "32%", response: "1.5h" },
                { name: "Traiteur Gourmet", category: "Traiteur", conversion: "28%", response: "2.1h" },
                { name: "Château des Lys", category: "Lieu", conversion: "25%", response: "3.4h" },
                { name: "DJ Master Mix", category: "DJ", conversion: "24%", response: "1.8h" },
                { name: "Décor & Merveilles", category: "Décoration", conversion: "22%", response: "2.5h" },
              ].map((partner, i) => (
                <li key={i} className="flex flex-col border-b border-vip-gray-800 pb-2 last:border-0">
                  <div className="flex justify-between">
                    <span className="font-medium">{partner.name}</span>
                    <span className="text-vip-gold">{partner.category}</span>
                  </div>
                  <div className="text-sm text-vip-gray-400 flex justify-between">
                    <span>Conv: {partner.conversion}</span>
                    <span>Temps rép: {partner.response}</span>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PartnerKPIs;
