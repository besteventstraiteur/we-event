
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, RefreshCw, Eye, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { TalkshowRepository } from "@/services/TalkshowRepository";
import { Talkshow } from "@/models/talkshow";
import TalkshowStatusBadge from "@/components/talkshows/TalkshowStatusBadge";

const AdminTalkshows = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [talkshows, setTalkshows] = useState<Talkshow[]>(
    TalkshowRepository.getInstance().getAllTalkshows()
  );

  // Filtrer par statut et recherche
  const filteredTalkshows = talkshows
    .filter(talkshow => 
      statusFilter === "all" || talkshow.status === statusFilter
    )
    .filter(talkshow => 
      talkshow.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      talkshow.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      talkshow.host.toLowerCase().includes(searchQuery.toLowerCase()) ||
      talkshow.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Simuler l'approbation d'un talkshow
  const approveTalkshow = (id: number) => {
    const updatedTalkshows = talkshows.map(talkshow => 
      talkshow.id === id 
        ? { ...talkshow, status: "approved" as const } 
        : talkshow
    );
    setTalkshows(updatedTalkshows);
    toast({
      title: "Talkshow approuvé",
      description: "Le talkshow a été approuvé et est maintenant disponible pour les clients"
    });
  };

  // Simuler le rejet d'un talkshow
  const rejectTalkshow = (id: number) => {
    const updatedTalkshows = talkshows.map(talkshow => 
      talkshow.id === id 
        ? { ...talkshow, status: "rejected" as const } 
        : talkshow
    );
    setTalkshows(updatedTalkshows);
    toast({
      title: "Talkshow rejeté",
      description: "Le talkshow a été rejeté"
    });
  };

  // Nombre de talkshows par statut
  const pendingCount = talkshows.filter(t => t.status === "pending").length;
  const approvedCount = talkshows.filter(t => t.status === "approved").length;
  const rejectedCount = talkshows.filter(t => t.status === "rejected").length;

  return (
    <DashboardLayout type="admin">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des Talkshows</h1>
        <Button 
          variant="outline" 
          className="flex items-center gap-2 text-vip-gray-400"
          onClick={() => setTalkshows(TalkshowRepository.getInstance().getAllTalkshows())}
        >
          <RefreshCw size={16} />
          Actualiser
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-vip-gray-900 border-vip-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex justify-between items-center">
              <span>Talkshows en attente</span>
              <Badge className="bg-amber-500 hover:bg-amber-600">{pendingCount}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-vip-gray-400">Talkshows nécessitant une validation</p>
          </CardContent>
        </Card>

        <Card className="bg-vip-gray-900 border-vip-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex justify-between items-center">
              <span>Talkshows approuvés</span>
              <Badge className="bg-green-600 hover:bg-green-700">{approvedCount}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-vip-gray-400">Talkshows disponibles pour les clients</p>
          </CardContent>
        </Card>

        <Card className="bg-vip-gray-900 border-vip-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex justify-between items-center">
              <span>Talkshows rejetés</span>
              <Badge className="bg-red-600 hover:bg-red-700">{rejectedCount}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-vip-gray-400">Talkshows non conformes</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-vip-gray-500" size={18} />
          <Input
            type="search"
            placeholder="Rechercher un talkshow..."
            className="pl-10 bg-vip-gray-900 border-vip-gray-800"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="w-full md:w-64">
          <Select 
            value={statusFilter} 
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="bg-vip-gray-900 border-vip-gray-800">
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent className="bg-vip-gray-800 border-vip-gray-700">
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="approved">Approuvés</SelectItem>
              <SelectItem value="rejected">Rejetés</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredTalkshows.length === 0 ? (
          <p className="text-center text-vip-gray-400 py-8">Aucun talkshow ne correspond à vos critères</p>
        ) : (
          filteredTalkshows.map(talkshow => (
            <Card key={talkshow.id} className="bg-vip-gray-900 border-vip-gray-800">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/6">
                  <img 
                    src={talkshow.imageUrl} 
                    alt={talkshow.title}
                    className="w-full h-32 md:h-full object-cover"
                  />
                </div>
                <div className="w-full md:w-5/6 p-4">
                  <div className="flex flex-col md:flex-row md:items-start justify-between mb-2">
                    <div>
                      <h3 className="text-vip-white font-medium">{talkshow.title}</h3>
                      <p className="text-sm text-vip-gray-400">
                        Catégorie: {talkshow.category} • Durée: {talkshow.duration} • Présentateur: {talkshow.host}
                      </p>
                      <p className="text-sm text-vip-gray-400">
                        Soumis le: {talkshow.date} • Vues: {talkshow.views}
                      </p>
                    </div>
                    <TalkshowStatusBadge status={talkshow.status} />
                  </div>
                  
                  <p className="text-sm text-vip-gray-300 mb-4 line-clamp-2">{talkshow.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-vip-gray-400 border-vip-gray-700 hover:bg-vip-gray-800"
                      onClick={() => console.log("View talkshow", talkshow.id)}
                    >
                      <Eye size={16} className="mr-1" /> Voir
                    </Button>
                    
                    {talkshow.status === "pending" && (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-green-500 border-green-800 hover:bg-green-900/20"
                          onClick={() => approveTalkshow(talkshow.id)}
                        >
                          <CheckCircle size={16} className="mr-1" /> Approuver
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-red-500 border-red-800 hover:bg-red-900/20"
                          onClick={() => rejectTalkshow(talkshow.id)}
                        >
                          <XCircle size={16} className="mr-1" /> Rejeter
                        </Button>
                      </>
                    )}
                    
                    {talkshow.status === "rejected" && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-green-500 border-green-800 hover:bg-green-900/20"
                        onClick={() => approveTalkshow(talkshow.id)}
                      >
                        <CheckCircle size={16} className="mr-1" /> Approuver
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminTalkshows;
