
import React, { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, ArrowUpDown, CheckCircle, AlertCircle, Star } from "lucide-react";
import GoldButton from "@/components/GoldButton";

const AdminPartners = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Exemple de données prestataires
  const activePartners = [
    { id: 1, name: "Domaine du Château", category: "Domaine", date: "15/04/2023", status: "active", views: 128, contacts: 15, revenue: "890 €", rating: 4.8 },
    { id: 2, name: "Fleurs Élégance", category: "Fleuriste", date: "03/02/2023", status: "active", views: 87, contacts: 9, revenue: "890 €", rating: 4.6 },
    { id: 3, name: "Studio Photo Elite", category: "Photographe", date: "21/05/2023", status: "active", views: 203, contacts: 24, revenue: "890 €", rating: 4.9 },
    { id: 4, name: "DJ Mix Master", category: "DJ", date: "10/01/2023", status: "active", views: 156, contacts: 18, revenue: "890 €", rating: 4.7 },
    { id: 5, name: "Pâtisserie Royale", category: "Traiteur", date: "08/03/2023", status: "active", views: 112, contacts: 14, revenue: "890 €", rating: 4.5 },
  ];
  
  const pendingPartners = [
    { id: 6, name: "Château des Lumières", category: "Domaine", date: "18/06/2023", status: "pending" },
    { id: 7, name: "Harmony Musique", category: "DJ", date: "20/06/2023", status: "pending" },
    { id: 8, name: "Décor de Rêve", category: "Décorateur", date: "22/06/2023", status: "pending" },
  ];

  const filterPartners = (partners) => {
    if (!searchTerm) return partners;
    return partners.filter(partner => 
      partner.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      partner.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Gestion des Prestataires</h1>
          <p className="text-vip-gray-400">Gérez les prestataires inscrits, validez les nouveaux et suivez leur activité</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-vip-gray-400" />
            <Input
              type="search"
              placeholder="Rechercher un prestataire..."
              className="pl-9 bg-vip-gray-900 border-vip-gray-800 text-vip-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2 border-vip-gray-800 text-vip-gray-400 hover:text-vip-white">
            <Filter size={16} /> Filtrer
          </Button>
          <GoldButton>
            Exporter CSV
          </GoldButton>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="bg-vip-gray-900 border border-vip-gray-800 mb-4">
            <TabsTrigger value="active" className="data-[state=active]:bg-vip-gold data-[state=active]:text-vip-black">
              Prestataires actifs ({activePartners.length})
            </TabsTrigger>
            <TabsTrigger value="pending" className="data-[state=active]:bg-vip-gold data-[state=active]:text-vip-black">
              En attente ({pendingPartners.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="mt-0">
            <Card className="bg-vip-gray-900 border-vip-gray-800">
              <CardHeader>
                <CardTitle>Prestataires actifs</CardTitle>
                <CardDescription>Liste des prestataires ayant un abonnement actif</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-vip-gray-800">
                        <th className="text-left px-4 py-3 text-vip-gray-400 font-medium">
                          <div className="flex items-center gap-1 cursor-pointer hover:text-vip-white">
                            Nom <ArrowUpDown size={14} />
                          </div>
                        </th>
                        <th className="text-left px-4 py-3 text-vip-gray-400 font-medium">Catégorie</th>
                        <th className="text-left px-4 py-3 text-vip-gray-400 font-medium">Date d'inscription</th>
                        <th className="text-left px-4 py-3 text-vip-gray-400 font-medium">Vues</th>
                        <th className="text-left px-4 py-3 text-vip-gray-400 font-medium">Contacts</th>
                        <th className="text-left px-4 py-3 text-vip-gray-400 font-medium">Note</th>
                        <th className="text-left px-4 py-3 text-vip-gray-400 font-medium">Revenus</th>
                        <th className="text-left px-4 py-3 text-vip-gray-400 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filterPartners(activePartners).map((partner) => (
                        <tr key={partner.id} className="border-b border-vip-gray-800 hover:bg-vip-gray-800/50">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-vip-gray-800 rounded-full flex items-center justify-center text-vip-white">
                                {partner.name.charAt(0)}
                              </div>
                              <span className="font-medium text-vip-white">{partner.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <Badge variant="outline" className="bg-vip-gray-800 text-vip-white border-vip-gray-700">
                              {partner.category}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-vip-gray-400">{partner.date}</td>
                          <td className="px-4 py-3 text-vip-white">{partner.views}</td>
                          <td className="px-4 py-3 text-vip-white">{partner.contacts}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center text-amber-500">
                              {partner.rating} <Star size={14} className="ml-1 fill-amber-500" />
                            </div>
                          </td>
                          <td className="px-4 py-3 text-vip-gold">{partner.revenue}</td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm" className="h-8 text-vip-gray-400 hover:text-vip-white">
                                Voir
                              </Button>
                              <Link to="/admin/ratings">
                                <Button variant="ghost" size="sm" className="h-8 text-vip-gray-400 hover:text-amber-500">
                                  Avis
                                </Button>
                              </Link>
                              <Button variant="ghost" size="sm" className="h-8 text-vip-gray-400 hover:text-red-500">
                                Désactiver
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filterPartners(activePartners).length === 0 && (
                    <p className="text-center py-8 text-vip-gray-400">Aucun résultat trouvé</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="pending" className="mt-0">
            <Card className="bg-vip-gray-900 border-vip-gray-800">
              <CardHeader>
                <CardTitle>Prestataires en attente</CardTitle>
                <CardDescription>Liste des prestataires en attente de validation</CardDescription>
              </CardHeader>
              <CardContent>
                {filterPartners(pendingPartners).map((partner) => (
                  <div key={partner.id} className="flex items-center justify-between p-4 rounded-md hover:bg-vip-gray-800 transition-colors border-b border-vip-gray-800 last:border-b-0">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-vip-gray-800 rounded-full flex items-center justify-center text-vip-white border border-vip-gray-700">
                        {partner.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-medium text-vip-white">{partner.name}</h4>
                        <p className="text-sm text-vip-gray-400">{partner.category} • Inscrit le {partner.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <GoldButton size="sm" className="gap-2">
                        <CheckCircle size={16} /> Valider
                      </GoldButton>
                      <GoldButton variant="outline" size="sm" className="gap-2">
                        <AlertCircle size={16} /> Refuser
                      </GoldButton>
                    </div>
                  </div>
                ))}
                {filterPartners(pendingPartners).length === 0 && (
                  <p className="text-center py-8 text-vip-gray-400">Aucun prestataire en attente</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminPartners;
