
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PiggyBank, CalendarCheck, MessageSquare, BarChart as BarChartIcon, Users, MessageCircle } from "lucide-react";
import { Bar, BarChart as ReBarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Line, LineChart } from "recharts";

// Mock data for guest KPIs
const responseRateData = [
  { month: "Jan", taux: 62 },
  { month: "Fév", taux: 68 },
  { month: "Mar", taux: 73 },
  { month: "Avr", taux: 79 },
  { month: "Mai", taux: 85 },
  { month: "Juin", taux: 91 },
];

const usageData = [
  { month: "Jan", rsvp: 85, menu: 68, livre: 45, cagnotte: 37 },
  { month: "Fév", rsvp: 87, menu: 72, livre: 49, cagnotte: 42 },
  { month: "Mar", rsvp: 90, menu: 76, livre: 54, cagnotte: 48 },
  { month: "Avr", rsvp: 91, menu: 79, livre: 58, cagnotte: 53 },
  { month: "Mai", rsvp: 93, menu: 83, livre: 62, cagnotte: 57 },
  { month: "Juin", rsvp: 95, menu: 88, livre: 67, cagnotte: 63 },
];

const GuestKPIs = () => {
  return (
    <div className="space-y-6">
      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-vip-gray-900 border-vip-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Participation cagnotte</CardTitle>
            <PiggyBank className="h-4 w-4 text-vip-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47%</div>
            <p className="text-xs text-vip-gray-400">Des invités ont participé</p>
          </CardContent>
        </Card>
        
        <Card className="bg-vip-gray-900 border-vip-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Réponses RSVP</CardTitle>
            <CalendarCheck className="h-4 w-4 text-vip-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84%</div>
            <p className="text-xs text-vip-gray-400">Taux de réponse moyen</p>
          </CardContent>
        </Card>
        
        <Card className="bg-vip-gray-900 border-vip-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Livre d'or</CardTitle>
            <MessageSquare className="h-4 w-4 text-vip-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">58%</div>
            <p className="text-xs text-vip-gray-400">Taux de participation</p>
          </CardContent>
        </Card>
        
        <Card className="bg-vip-gray-900 border-vip-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Sélection menu</CardTitle>
            <BarChartIcon className="h-4 w-4 text-vip-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">76%</div>
            <p className="text-xs text-vip-gray-400">Des invités ont choisi leur menu</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Detailed KPI Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-vip-gray-900 border-vip-gray-800">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Taux de réponse RSVP</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ReBarChart data={responseRateData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <XAxis dataKey="month" />
                  <YAxis unit="%" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e1e1e', 
                      borderColor: '#333', 
                      borderRadius: '4px' 
                    }} 
                  />
                  <Bar dataKey="taux" fill="#8b5cf6" name="Taux de réponse" unit="%" />
                </ReBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-vip-gray-900 border-vip-gray-800">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Utilisation des fonctionnalités</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={usageData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <XAxis dataKey="month" />
                  <YAxis unit="%" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1e1e1e', 
                      borderColor: '#333', 
                      borderRadius: '4px' 
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="rsvp" stroke="#f59e0b" name="RSVP" unit="%" />
                  <Line type="monotone" dataKey="menu" stroke="#10b981" name="Menu" unit="%" />
                  <Line type="monotone" dataKey="livre" stroke="#3b82f6" name="Livre d'or" unit="%" />
                  <Line type="monotone" dataKey="cagnotte" stroke="#8b5cf6" name="Cagnotte" unit="%" />
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
            <CardTitle className="text-lg font-medium">Statistiques des invités</CardTitle>
            <Users className="h-5 w-5 text-vip-gray-400" />
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex justify-between items-center border-b border-vip-gray-800 pb-2">
                <span className="text-vip-gray-400">Total invités enregistrés</span>
                <span className="font-medium">12,450</span>
              </li>
              <li className="flex justify-between items-center border-b border-vip-gray-800 pb-2">
                <span className="text-vip-gray-400">Comptes créés</span>
                <span className="font-medium">8,320 (67%)</span>
              </li>
              <li className="flex justify-between items-center border-b border-vip-gray-800 pb-2">
                <span className="text-vip-gray-400">Temps moyen sur la plateforme</span>
                <span className="font-medium">12 min/visite</span>
              </li>
              <li className="flex justify-between items-center border-b border-vip-gray-800 pb-2">
                <span className="text-vip-gray-400">Contribution moyenne cagnotte</span>
                <span className="font-medium">85€</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-vip-gray-400">Taux de téléchargement photos</span>
                <span className="font-medium">38%</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="bg-vip-gray-900 border-vip-gray-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium">Messages du livre d'or</CardTitle>
            <MessageCircle className="h-5 w-5 text-vip-gray-400" />
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {[
                { guest: "Marie D.", event: "Mariage Sophie & Thomas", message: "Une journée magnifique, merci pour ce moment inoubliable !" },
                { guest: "Jean L.", event: "Mariage Marie & Jean", message: "Organisation parfaite, un grand bravo aux mariés !" },
                { guest: "Sophie M.", event: "Mariage Julie & Marc", message: "Quelle belle célébration, nous avons adoré chaque instant !" },
                { guest: "Pierre K.", event: "Mariage Léa & Pierre", message: "Superbe ambiance et repas délicieux, merci pour l'invitation !" },
                { guest: "Emma B.", event: "Mariage Camille & Nicolas", message: "Un cadre magnifique et une soirée mémorable !" },
              ].map((message, i) => (
                <li key={i} className="flex flex-col border-b border-vip-gray-800 pb-2 last:border-0">
                  <div className="flex justify-between">
                    <span className="font-medium">{message.guest}</span>
                    <span className="text-vip-gold text-xs">{message.event}</span>
                  </div>
                  <div className="text-sm text-vip-gray-400 mt-1">
                    "{message.message}"
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

export default GuestKPIs;
