
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, ArrowUpDown, Plus, Play, Pause, Headphones, CheckCircle, XCircle } from "lucide-react";
import GoldButton from "@/components/GoldButton";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

const AdminPodcasts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [playing, setPlaying] = useState<number | null>(null);
  
  // Exemple de données podcasts
  const activePodcasts = [
    { id: 1, title: "Organiser un mariage parfait", author: "Best Events", category: "Conseils", duration: "24:15", date: "15/04/2023", views: 128, status: "active" },
    { id: 2, title: "Choisir son lieu de réception", author: "Domaine du Château", category: "Domaine", duration: "18:32", date: "03/05/2023", views: 87, status: "active" },
    { id: 3, title: "L'art de la photographie de mariage", author: "Studio Photo Elite", category: "Photographe", duration: "31:47", date: "21/05/2023", views: 203, status: "active" },
    { id: 4, title: "Créer une ambiance musicale", author: "DJ Mix Master", category: "DJ", duration: "22:08", date: "10/06/2023", views: 156, status: "active" },
    { id: 5, title: "Tendances décoration 2023", author: "Best Events", category: "Conseils", duration: "19:20", date: "08/06/2023", views: 112, status: "active" },
  ];
  
  const pendingPodcasts = [
    { id: 6, title: "Animation de soirée réussie", author: "Harmony Musique", category: "DJ", duration: "26:18", date: "18/06/2023", status: "pending" },
    { id: 7, title: "La cuisine gastronomique d'événement", author: "Pâtisserie Royale", category: "Traiteur", duration: "28:45", date: "20/06/2023", status: "pending" },
    { id: 8, title: "Décoration florale tendance", author: "Fleurs Élégance", category: "Fleuriste", duration: "17:22", date: "22/06/2023", status: "pending" },
  ];

  const filterPodcasts = (podcasts) => {
    if (!searchTerm) return podcasts;
    return podcasts.filter(podcast => 
      podcast.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      podcast.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      podcast.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const togglePlay = (id: number) => {
    if (playing === id) {
      setPlaying(null);
    } else {
      setPlaying(id);
    }
  };

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Gestion des Podcasts</h1>
          <p className="text-vip-gray-400">Gérez les podcasts disponibles sur la plateforme</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-vip-gray-400" />
            <Input
              type="search"
              placeholder="Rechercher un podcast..."
              className="pl-9 bg-vip-gray-900 border-vip-gray-800 text-vip-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2 border-vip-gray-800 text-vip-gray-400 hover:text-vip-white">
            <Filter size={16} /> Filtrer
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <GoldButton className="gap-2">
                <Plus size={16} /> Ajouter un podcast
              </GoldButton>
            </DialogTrigger>
            <DialogContent className="bg-vip-gray-900 border-vip-gray-800 text-vip-white">
              <DialogHeader>
                <DialogTitle>Ajouter un nouveau podcast</DialogTitle>
                <DialogDescription className="text-vip-gray-400">
                  Créez un nouveau podcast sur la plateforme
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <h4 className="mb-2 text-sm font-medium">Titre</h4>
                  <Input className="bg-vip-gray-800 border-vip-gray-700" placeholder="Titre du podcast" />
                </div>
                <div>
                  <h4 className="mb-2 text-sm font-medium">Catégorie</h4>
                  <Select>
                    <SelectTrigger className="bg-vip-gray-800 border-vip-gray-700">
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent className="bg-vip-gray-900 border-vip-gray-800 text-vip-white">
                      <SelectItem value="conseils">Conseils</SelectItem>
                      <SelectItem value="domaine">Domaine</SelectItem>
                      <SelectItem value="dj">DJ</SelectItem>
                      <SelectItem value="photographe">Photographe</SelectItem>
                      <SelectItem value="fleuriste">Fleuriste</SelectItem>
                      <SelectItem value="traiteur">Traiteur</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <h4 className="mb-2 text-sm font-medium">Description</h4>
                  <Textarea className="bg-vip-gray-800 border-vip-gray-700 min-h-[100px]" placeholder="Description du podcast" />
                </div>
                <div>
                  <h4 className="mb-2 text-sm font-medium">Fichier audio</h4>
                  <div className="border-2 border-dashed border-vip-gray-700 rounded-md p-6 flex flex-col items-center justify-center">
                    <Headphones size={40} className="text-vip-gray-400 mb-2" />
                    <p className="text-vip-gray-400 mb-2">Glissez-déposez votre fichier audio ici</p>
                    <p className="text-vip-gray-500 text-sm mb-4">Format MP3, maximum 50Mo</p>
                    <Button variant="outline" className="border-vip-gray-700 text-vip-gray-400 hover:text-vip-white">
                      Parcourir
                    </Button>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  variant="outline" 
                  className="border-vip-gray-700 text-vip-gray-400 hover:text-vip-white"
                >
                  Annuler
                </Button>
                <GoldButton>Publier</GoldButton>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="bg-vip-gray-900 border border-vip-gray-800 mb-4">
            <TabsTrigger value="active" className="data-[state=active]:bg-vip-gold data-[state=active]:text-vip-black">
              Podcasts publiés ({activePodcasts.length})
            </TabsTrigger>
            <TabsTrigger value="pending" className="data-[state=active]:bg-vip-gold data-[state=active]:text-vip-black">
              En attente ({pendingPodcasts.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="mt-0">
            <Card className="bg-vip-gray-900 border-vip-gray-800">
              <CardHeader>
                <CardTitle>Podcasts publiés</CardTitle>
                <CardDescription>Liste des podcasts actuellement disponibles sur la plateforme</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-vip-gray-800">
                        <th className="text-left px-4 py-3 text-vip-gray-400 font-medium">
                          <div className="flex items-center gap-1 cursor-pointer hover:text-vip-white">
                            Titre <ArrowUpDown size={14} />
                          </div>
                        </th>
                        <th className="text-left px-4 py-3 text-vip-gray-400 font-medium">Catégorie</th>
                        <th className="text-left px-4 py-3 text-vip-gray-400 font-medium">Auteur</th>
                        <th className="text-left px-4 py-3 text-vip-gray-400 font-medium">Durée</th>
                        <th className="text-left px-4 py-3 text-vip-gray-400 font-medium">Publication</th>
                        <th className="text-left px-4 py-3 text-vip-gray-400 font-medium">Écoutes</th>
                        <th className="text-center px-4 py-3 text-vip-gray-400 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filterPodcasts(activePodcasts).map((podcast) => (
                        <tr key={podcast.id} className="border-b border-vip-gray-800 hover:bg-vip-gray-800/50">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-full bg-vip-gray-800 border-vip-gray-700 text-vip-white hover:text-vip-gold"
                                onClick={() => togglePlay(podcast.id)}
                              >
                                {playing === podcast.id ? <Pause size={14} /> : <Play size={14} />}
                              </Button>
                              <span className="font-medium text-vip-white">{podcast.title}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <Badge variant="outline" className="bg-vip-gray-800 text-vip-white border-vip-gray-700">
                              {podcast.category}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-vip-gray-400">{podcast.author}</td>
                          <td className="px-4 py-3 text-vip-gray-400">{podcast.duration}</td>
                          <td className="px-4 py-3 text-vip-gray-400">{podcast.date}</td>
                          <td className="px-4 py-3 text-vip-white">{podcast.views}</td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2 justify-center">
                              <Button variant="ghost" size="sm" className="h-8 text-vip-gray-400 hover:text-vip-white">
                                Modifier
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 text-vip-gray-400 hover:text-red-500">
                                Retirer
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filterPodcasts(activePodcasts).length === 0 && (
                    <p className="text-center py-8 text-vip-gray-400">Aucun résultat trouvé</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="pending" className="mt-0">
            <Card className="bg-vip-gray-900 border-vip-gray-800">
              <CardHeader>
                <CardTitle>Podcasts en attente</CardTitle>
                <CardDescription>Liste des podcasts en attente de validation</CardDescription>
              </CardHeader>
              <CardContent>
                {filterPodcasts(pendingPodcasts).map((podcast) => (
                  <div key={podcast.id} className="flex items-center justify-between p-4 rounded-md hover:bg-vip-gray-800 transition-colors border-b border-vip-gray-800 last:border-b-0">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-vip-gray-800 border-vip-gray-700 text-vip-white hover:text-vip-gold"
                        onClick={() => togglePlay(podcast.id)}
                      >
                        {playing === podcast.id ? <Pause size={14} /> : <Play size={14} />}
                      </Button>
                      <div>
                        <h4 className="font-medium text-vip-white">{podcast.title}</h4>
                        <p className="text-sm text-vip-gray-400">
                          {podcast.author} • {podcast.category} • {podcast.duration}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <GoldButton size="sm" className="gap-2">
                        <CheckCircle size={16} /> Approuver
                      </GoldButton>
                      <GoldButton variant="outline" size="sm" className="gap-2">
                        <XCircle size={16} /> Rejeter
                      </GoldButton>
                    </div>
                  </div>
                ))}
                {filterPodcasts(pendingPodcasts).length === 0 && (
                  <p className="text-center py-8 text-vip-gray-400">Aucun podcast en attente</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminPodcasts;
