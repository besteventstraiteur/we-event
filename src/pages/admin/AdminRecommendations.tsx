
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import GoldButton from "@/components/GoldButton";
import { Search, Filter, ArrowUpDown, Download, Calendar, BarChart2, UserPlus } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

const AdminRecommendations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Données pour les recommandations
  const recommendations = [
    { id: 1, fromPartner: "Domaine du Château", toPartner: "DJ Mix Master", status: "accepted", date: "10/05/2024", category: "DJ", clientName: "Sophie Martin" },
    { id: 2, fromPartner: "DJ Mix Master", toPartner: "Fleurs Élégance", status: "pending", date: "05/05/2024", category: "Fleuriste", clientName: "Marc Dupont" },
    { id: 3, fromPartner: "Pâtisserie Royale", toPartner: "Studio Photo Elite", status: "accepted", date: "01/05/2024", category: "Photographe", clientName: "Julie Petit" },
    { id: 4, fromPartner: "Studio Photo Elite", toPartner: "Domaine du Château", status: "declined", date: "28/04/2024", category: "Domaine", clientName: "Thomas Bernard" },
    { id: 5, fromPartner: "Fleurs Élégance", toPartner: "Domaine du Château", status: "accepted", date: "25/04/2024", category: "Domaine", clientName: "Claire Rousseau" },
    { id: 6, fromPartner: "Gastronomie Délice", toPartner: "Domaine du Château", status: "declined", date: "20/04/2024", category: "Domaine", clientName: "Antoine Lefevre" },
    { id: 7, fromPartner: "Domaine du Château", toPartner: "Gastronomie Délice", status: "accepted", date: "15/04/2024", category: "Traiteur", clientName: "Emilie Girard" },
    { id: 8, fromPartner: "Harmony Musique", toPartner: "Fleurs Élégance", status: "pending", date: "10/04/2024", category: "Fleuriste", clientName: "Pierre Lambert" },
  ];

  // Statistiques par catégorie
  const categoryStats = [
    { name: "DJ", count: 15, acceptedRate: 80 },
    { name: "Fleuriste", count: 22, acceptedRate: 65 },
    { name: "Photographe", count: 18, acceptedRate: 75 },
    { name: "Traiteur", count: 12, acceptedRate: 90 },
    { name: "Domaine", count: 30, acceptedRate: 60 },
    { name: "Décorateur", count: 8, acceptedRate: 70 },
  ];

  // Statistiques par mois
  const monthlyStats = [
    { name: "Jan", recommendations: 12, acceptedRate: 58 },
    { name: "Fév", recommendations: 15, acceptedRate: 65 },
    { name: "Mar", recommendations: 18, acceptedRate: 70 },
    { name: "Avr", recommendations: 25, acceptedRate: 75 },
    { name: "Mai", recommendations: 22, acceptedRate: 68 },
    { name: "Juin", recommendations: 0, acceptedRate: 0 },
    { name: "Juil", recommendations: 0, acceptedRate: 0 },
    { name: "Août", recommendations: 0, acceptedRate: 0 },
    { name: "Sep", recommendations: 0, acceptedRate: 0 },
    { name: "Oct", recommendations: 0, acceptedRate: 0 },
    { name: "Nov", recommendations: 0, acceptedRate: 0 },
    { name: "Déc", recommendations: 0, acceptedRate: 0 },
  ];

  // Statistiques par statut
  const statusStats = [
    { name: "Acceptées", value: 65, color: "#4ade80" },
    { name: "En attente", value: 20, color: "#facc15" },
    { name: "Refusées", value: 15, color: "#f87171" },
  ];

  // Statistiques des partenaires les plus actifs
  const topPartners = [
    { name: "Domaine du Château", sent: 25, received: 18 },
    { name: "DJ Mix Master", sent: 20, received: 12 },
    { name: "Fleurs Élégance", sent: 18, received: 15 },
    { name: "Studio Photo Elite", sent: 15, received: 8 },
    { name: "Pâtisserie Royale", sent: 12, received: 10 },
  ];

  const filterRecommendations = (recommendations) => {
    if (!searchTerm) return recommendations;
    return recommendations.filter(rec => 
      rec.fromPartner.toLowerCase().includes(searchTerm.toLowerCase()) || 
      rec.toPartner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'accepted':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Acceptée</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">En attente</Badge>;
      case 'declined':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Refusée</Badge>;
      default:
        return <Badge variant="outline">Inconnue</Badge>;
    }
  };

  const COLORS = ['#4ade80', '#facc15', '#f87171'];

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Recommandations entre partenaires</h1>
          <p className="text-vip-gray-400">Suivez et analysez les recommandations entre les partenaires</p>
        </div>

        <Tabs defaultValue="list" className="w-full">
          <TabsList className="bg-vip-gray-900 border border-vip-gray-800 mb-4">
            <TabsTrigger value="list" className="data-[state=active]:bg-vip-gold data-[state=active]:text-vip-black">
              Liste
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-vip-gold data-[state=active]:text-vip-black">
              Statistiques
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="mt-0">
            <Card className="bg-vip-gray-900 border-vip-gray-800">
              <CardHeader>
                <CardTitle>Toutes les recommandations</CardTitle>
                <CardDescription>Liste de toutes les recommandations entre partenaires</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-vip-gray-400" />
                    <Input
                      type="search"
                      placeholder="Rechercher..."
                      className="pl-9 bg-vip-gray-900 border-vip-gray-800 text-vip-white"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" className="gap-2 border-vip-gray-800 text-vip-gray-400 hover:text-vip-white">
                    <Filter size={16} /> Filtrer
                  </Button>
                  <GoldButton className="gap-2">
                    <Download size={16} /> Exporter CSV
                  </GoldButton>
                </div>
                
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-vip-gray-800 hover:bg-transparent">
                        <TableHead className="text-vip-gray-400">
                          <div className="flex items-center gap-1 cursor-pointer hover:text-vip-white">
                            Date <ArrowUpDown size={14} />
                          </div>
                        </TableHead>
                        <TableHead className="text-vip-gray-400">Partenaire source</TableHead>
                        <TableHead className="text-vip-gray-400">Partenaire cible</TableHead>
                        <TableHead className="text-vip-gray-400">Catégorie</TableHead>
                        <TableHead className="text-vip-gray-400">Client</TableHead>
                        <TableHead className="text-vip-gray-400">Statut</TableHead>
                        <TableHead className="text-vip-gray-400 text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filterRecommendations(recommendations).map((rec) => (
                        <TableRow key={rec.id} className="border-vip-gray-800">
                          <TableCell className="text-vip-gray-200">{rec.date}</TableCell>
                          <TableCell className="font-medium text-vip-white">{rec.fromPartner}</TableCell>
                          <TableCell className="text-vip-white">{rec.toPartner}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-vip-gray-800 text-vip-white border-vip-gray-700">
                              {rec.category}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-vip-white">{rec.clientName}</TableCell>
                          <TableCell>{getStatusBadge(rec.status)}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="h-8 text-vip-gray-400 hover:text-vip-white">
                              Détails
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {filterRecommendations(recommendations).length === 0 && (
                    <p className="text-center py-8 text-vip-gray-400">Aucun résultat trouvé</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="stats" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-vip-gray-900 border-vip-gray-800">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Recommandations par mois</CardTitle>
                    <Calendar size={18} className="text-vip-gray-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={monthlyStats}
                        margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="name" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', color: '#F9FAFB' }}
                          cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
                        />
                        <Legend />
                        <Bar dataKey="recommendations" name="Nombre" fill="#FDC547" />
                        <Bar dataKey="acceptedRate" name="Taux d'acceptation (%)" fill="#4ADE80" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-vip-gray-900 border-vip-gray-800">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Statut des recommandations</CardTitle>
                    <BarChart2 size={18} className="text-vip-gray-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={statusStats}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {statusStats.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', color: '#F9FAFB' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-vip-gray-900 border-vip-gray-800">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Recommandations par catégorie</CardTitle>
                    <UserPlus size={18} className="text-vip-gray-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={categoryStats}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis type="number" stroke="#9CA3AF" />
                        <YAxis dataKey="name" type="category" stroke="#9CA3AF" />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', color: '#F9FAFB' }}
                          cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
                        />
                        <Legend />
                        <Bar dataKey="count" name="Nombre" fill="#93C5FD" />
                        <Bar dataKey="acceptedRate" name="Taux d'acceptation (%)" fill="#A78BFA" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-vip-gray-900 border-vip-gray-800">
                <CardHeader>
                  <CardTitle className="text-lg">Partenaires les plus actifs</CardTitle>
                  <CardDescription>Top 5 des partenaires qui font le plus de recommandations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-vip-gray-800 hover:bg-transparent">
                          <TableHead className="text-vip-gray-400">Partenaire</TableHead>
                          <TableHead className="text-vip-gray-400 text-right">Envoyées</TableHead>
                          <TableHead className="text-vip-gray-400 text-right">Reçues</TableHead>
                          <TableHead className="text-vip-gray-400 text-right">Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {topPartners.map((partner, index) => (
                          <TableRow key={index} className="border-vip-gray-800">
                            <TableCell className="font-medium text-vip-white">{partner.name}</TableCell>
                            <TableCell className="text-right text-vip-gold">{partner.sent}</TableCell>
                            <TableCell className="text-right text-blue-400">{partner.received}</TableCell>
                            <TableCell className="text-right text-vip-white font-medium">{partner.sent + partner.received}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminRecommendations;
