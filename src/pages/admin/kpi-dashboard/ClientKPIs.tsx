
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCheck, Clock, PiggyBank, LineChart, Users, Calendar } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Line, LineChart as ReLineChart } from "recharts";

// Mock data for client KPIs
const taskCompletionData = [
  { month: "Jan", taux: 68 },
  { month: "Fév", taux: 72 },
  { month: "Mar", taux: 77 },
  { month: "Avr", taux: 82 },
  { month: "Mai", taux: 87 },
  { month: "Juin", taux: 93 },
];

const budgetAdherenceData = [
  { month: "Jan", prévu: 15000, réel: 14200 },
  { month: "Fév", prévu: 18000, réel: 19500 },
  { month: "Mar", prévu: 22000, réel: 21800 },
  { month: "Avr", prévu: 25000, réel: 24900 },
  { month: "Mai", prévu: 28000, réel: 29200 },
  { month: "Juin", prévu: 30000, réel: 31500 },
];

const ClientKPIs = () => {
  return (
    <div className="space-y-6">
      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-vip-gray-900 border-vip-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Taux de complétion</CardTitle>
            <CheckCheck className="h-4 w-4 text-vip-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-vip-gray-400">Moyenne sur tous les mariages actifs</p>
          </CardContent>
        </Card>
        
        <Card className="bg-vip-gray-900 border-vip-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Temps de réponse</CardTitle>
            <Clock className="h-4 w-4 text-vip-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.4 jours</div>
            <p className="text-xs text-vip-gray-400">Aux demandes des prestataires</p>
          </CardContent>
        </Card>
        
        <Card className="bg-vip-gray-900 border-vip-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Respect du budget</CardTitle>
            <PiggyBank className="h-4 w-4 text-vip-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-vip-gray-400">Des couples restent dans leur budget</p>
          </CardContent>
        </Card>
        
        <Card className="bg-vip-gray-900 border-vip-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction</CardTitle>
            <LineChart className="h-4 w-4 text-vip-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.7/5</div>
            <p className="text-xs text-vip-gray-400">Score moyen de satisfaction</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Detailed KPI Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-vip-gray-900 border-vip-gray-800">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Taux de complétion des tâches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={taskCompletionData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <XAxis dataKey="month" />
                  <YAxis unit="%" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e1e1e', 
                      borderColor: '#333', 
                      borderRadius: '4px' 
                    }} 
                  />
                  <Bar dataKey="taux" fill="#f59e0b" name="Taux de complétion" unit="%" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-vip-gray-900 border-vip-gray-800">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Adhérence au budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ReLineChart data={budgetAdherenceData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
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
                  <Line type="monotone" dataKey="prévu" stroke="#10b981" name="Budget prévu" dot={true} />
                  <Line type="monotone" dataKey="réel" stroke="#f59e0b" name="Dépenses réelles" dot={true} />
                </ReLineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Additional KPI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-vip-gray-900 border-vip-gray-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium">Activité des mariés</CardTitle>
            <Users className="h-5 w-5 text-vip-gray-400" />
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex justify-between items-center border-b border-vip-gray-800 pb-2">
                <span className="text-vip-gray-400">Nombre de mariés actifs</span>
                <span className="font-medium">156</span>
              </li>
              <li className="flex justify-between items-center border-b border-vip-gray-800 pb-2">
                <span className="text-vip-gray-400">Temps moyen sur la plateforme</span>
                <span className="font-medium">45 min/semaine</span>
              </li>
              <li className="flex justify-between items-center border-b border-vip-gray-800 pb-2">
                <span className="text-vip-gray-400">Fonctionnalités les plus utilisées</span>
                <span className="font-medium">Plan de table, Budget</span>
              </li>
              <li className="flex justify-between items-center border-b border-vip-gray-800 pb-2">
                <span className="text-vip-gray-400">Taux d'invitation des invités</span>
                <span className="font-medium">94%</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-vip-gray-400">Utilisation des packs mariage</span>
                <span className="font-medium">68%</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="bg-vip-gray-900 border-vip-gray-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium">Événements à venir</CardTitle>
            <Calendar className="h-5 w-5 text-vip-gray-400" />
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {[
                { date: "23 juin 2023", couple: "Sophie & Thomas", guests: 120, location: "Château de Versailles" },
                { date: "15 juillet 2023", couple: "Marie & Jean", guests: 85, location: "Domaine des Lys" },
                { date: "5 août 2023", couple: "Julie & Marc", guests: 150, location: "Plage de Nice" },
                { date: "19 août 2023", couple: "Léa & Pierre", guests: 200, location: "Manoir de Paris" },
                { date: "9 septembre 2023", couple: "Camille & Nicolas", guests: 110, location: "Vignoble de Bordeaux" },
              ].map((event, i) => (
                <li key={i} className="flex flex-col border-b border-vip-gray-800 pb-2 last:border-0">
                  <div className="flex justify-between">
                    <span className="font-medium">{event.couple}</span>
                    <span className="text-vip-gold">{event.date}</span>
                  </div>
                  <div className="text-sm text-vip-gray-400">
                    {event.guests} invités • {event.location}
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

export default ClientKPIs;
