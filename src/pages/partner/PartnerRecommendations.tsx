
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Search, Filter, Clock, Check, X } from "lucide-react";
import RecommendationForm from "@/components/partner/RecommendationForm";

const PartnerRecommendations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Exemple de données pour les recommandations
  const sentRecommendations = [
    { 
      id: 1, 
      clientName: "Sophie Martin", 
      eventDate: "15/08/2024", 
      category: "DJ", 
      partners: ["DJ Mix Master", "Harmony Musique"],
      status: "sent", 
      sentDate: "10/05/2024"
    },
    { 
      id: 2, 
      clientName: "Marc Dupont", 
      eventDate: "22/09/2024", 
      category: "Fleuriste", 
      partners: ["Fleurs Élégance"],
      status: "sent", 
      sentDate: "05/05/2024"
    },
    { 
      id: 3, 
      clientName: "Julie Petit", 
      eventDate: "10/07/2024", 
      category: "Photographe", 
      partners: ["Studio Photo Elite", "Moments Immortels", "Captures Élégantes"],
      status: "sent", 
      sentDate: "01/05/2024"
    },
  ];
  
  const receivedRecommendations = [
    { 
      id: 4, 
      clientName: "Thomas Bernard", 
      eventDate: "05/10/2024", 
      category: "Domaine", 
      fromPartner: "DJ Mix Master",
      status: "pending", 
      receivedDate: "08/05/2024"
    },
    { 
      id: 5, 
      clientName: "Claire Rousseau", 
      eventDate: "18/11/2024", 
      category: "Domaine", 
      fromPartner: "Fleurs Élégance",
      status: "accepted", 
      receivedDate: "02/05/2024"
    },
    { 
      id: 6, 
      clientName: "Antoine Lefevre", 
      eventDate: "29/06/2024", 
      category: "Domaine", 
      fromPartner: "Gastronomie Délice",
      status: "declined", 
      receivedDate: "25/04/2024"
    },
  ];

  const filterRecommendations = (recommendations, term) => {
    if (!term) return recommendations;
    return recommendations.filter(rec => 
      rec.clientName.toLowerCase().includes(term.toLowerCase()) || 
      (rec.fromPartner && rec.fromPartner.toLowerCase().includes(term.toLowerCase())) ||
      (rec.partners && rec.partners.some(p => p.toLowerCase().includes(term.toLowerCase())))
    );
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'sent':
        return <Badge variant="secondary">Envoyée</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">En attente</Badge>;
      case 'accepted':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Acceptée</Badge>;
      case 'declined':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Refusée</Badge>;
      default:
        return <Badge variant="outline">Inconnue</Badge>;
    }
  };

  return (
    <DashboardLayout type="partner">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Recommandations</h1>
          <p className="text-gray-500">Gérez vos recommandations et coordonnez-vous avec d'autres partenaires</p>
        </div>

        <Tabs defaultValue="new" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="new">Nouvelle recommandation</TabsTrigger>
            <TabsTrigger value="sent">Envoyées ({sentRecommendations.length})</TabsTrigger>
            <TabsTrigger value="received">Reçues ({receivedRecommendations.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="new" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Nouvelle recommandation</CardTitle>
                <CardDescription>Créez une recommandation pour d'autres partenaires VIP</CardDescription>
              </CardHeader>
              <CardContent>
                <RecommendationForm />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="sent" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Recommandations envoyées</CardTitle>
                <CardDescription>Liste des recommandations que vous avez envoyées à d'autres partenaires</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
                  <div className="relative flex-1 w-full">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      type="search"
                      placeholder="Rechercher..."
                      className="pl-9"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" className="gap-2 w-full sm:w-auto">
                    <Filter size={16} /> Filtrer
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {filterRecommendations(sentRecommendations, searchTerm).map((recommendation) => (
                    <div key={recommendation.id} className="border rounded-lg p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div className="font-medium">{recommendation.clientName}</div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {recommendation.category}
                          </Badge>
                          {getStatusBadge(recommendation.status)}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock size={14} className="text-gray-500" />
                          <span className="text-gray-600">Événement le {recommendation.eventDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Send size={14} className="text-gray-500" />
                          <span className="text-gray-600">Envoyée le {recommendation.sentDate}</span>
                        </div>
                        <div className="sm:col-span-2 mt-1">
                          <span className="text-gray-600">Partenaires : </span>
                          <span className="text-gray-900">{recommendation.partners.join(", ")}</span>
                        </div>
                      </div>
                      <div className="flex justify-end mt-3">
                        <Button variant="ghost" size="sm">Voir détails</Button>
                      </div>
                    </div>
                  ))}
                  {filterRecommendations(sentRecommendations, searchTerm).length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      Aucune recommandation envoyée trouvée
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="received" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Recommandations reçues</CardTitle>
                <CardDescription>Liste des recommandations reçues d'autres partenaires</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
                  <div className="relative flex-1 w-full">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      type="search"
                      placeholder="Rechercher..."
                      className="pl-9"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" className="gap-2 w-full sm:w-auto">
                    <Filter size={16} /> Filtrer
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {filterRecommendations(receivedRecommendations, searchTerm).map((recommendation) => (
                    <div key={recommendation.id} className="border rounded-lg p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div className="font-medium">{recommendation.clientName}</div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {recommendation.category}
                          </Badge>
                          {getStatusBadge(recommendation.status)}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock size={14} className="text-gray-500" />
                          <span className="text-gray-600">Événement le {recommendation.eventDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Send size={14} className="text-gray-500" />
                          <span className="text-gray-600">Reçue le {recommendation.receivedDate}</span>
                        </div>
                        <div className="sm:col-span-2 mt-1">
                          <span className="text-gray-600">De la part de : </span>
                          <span className="text-gray-900">{recommendation.fromPartner}</span>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 mt-3">
                        {recommendation.status === 'pending' && (
                          <>
                            <Button variant="outline" size="sm" className="gap-1">
                              <X size={14} /> Refuser
                            </Button>
                            <Button size="sm" className="gap-1">
                              <Check size={14} /> Accepter
                            </Button>
                          </>
                        )}
                        <Button variant="ghost" size="sm">Voir détails</Button>
                      </div>
                    </div>
                  ))}
                  {filterRecommendations(receivedRecommendations, searchTerm).length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      Aucune recommandation reçue trouvée
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default PartnerRecommendations;
