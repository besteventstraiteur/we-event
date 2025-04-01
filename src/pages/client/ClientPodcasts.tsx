
import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Pause, Bookmark, BookmarkCheck, Search } from "lucide-react";

const ClientPodcasts = () => {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [currentPodcast, setCurrentPodcast] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [savedPodcasts, setSavedPodcasts] = useState([1, 3]); // IDs des podcasts sauvegardés

  // Données simulées de podcasts
  const [podcasts, setPodcasts] = useState([
    {
      id: 1,
      title: "Comment choisir le lieu parfait pour votre mariage",
      description: "Dans cet épisode, nous explorons les critères essentiels pour sélectionner le lieu idéal pour votre mariage, en fonction de votre budget et du nombre d'invités.",
      author: "Marie Dupont, Wedding Planner",
      category: "Mariage",
      duration: "18:45",
      date: "2023-02-15",
      imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      audioUrl: "https://example.com/podcast1.mp3"
    },
    {
      id: 2,
      title: "Les tendances déco pour vos événements d'entreprise",
      description: "Découvrez les dernières tendances en matière de décoration pour vos événements professionnels et comment impressionner vos clients et collaborateurs.",
      author: "Jean Martin, Décorateur événementiel",
      category: "Entreprise",
      duration: "24:10",
      date: "2023-01-28",
      imageUrl: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
      audioUrl: "https://example.com/podcast2.mp3"
    },
    {
      id: 3,
      title: "Comment gérer un budget serré pour votre événement",
      description: "Astuces et conseils pratiques pour optimiser votre budget événementiel sans compromettre la qualité de votre prestation.",
      author: "Sophie Lefebvre, Consultante événementielle",
      category: "Finance",
      duration: "32:15",
      date: "2023-03-05",
      imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1026&q=80",
      audioUrl: "https://example.com/podcast3.mp3"
    },
    {
      id: 4,
      title: "Les erreurs à éviter lors de l'organisation d'un mariage",
      description: "Retour d'expérience sur les erreurs les plus courantes lors de l'organisation d'un mariage et comment les éviter.",
      author: "Paul Dubois, Wedding Planner",
      category: "Mariage",
      duration: "26:30",
      date: "2023-02-20",
      imageUrl: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      audioUrl: "https://example.com/podcast4.mp3"
    }
  ]);

  // Filtrer les podcasts en fonction de la recherche
  const filteredPodcasts = podcasts.filter(podcast => 
    podcast.title.toLowerCase().includes(search.toLowerCase()) ||
    podcast.description.toLowerCase().includes(search.toLowerCase()) ||
    podcast.author.toLowerCase().includes(search.toLowerCase()) ||
    podcast.category.toLowerCase().includes(search.toLowerCase())
  );

  // Podcasts sauvegardés
  const bookmarkedPodcasts = podcasts.filter(podcast => savedPodcasts.includes(podcast.id));

  // Simuler la lecture d'un podcast
  const togglePlay = (podcast) => {
    if (currentPodcast && currentPodcast.id === podcast.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentPodcast(podcast);
      setIsPlaying(true);
      toast({
        title: "Podcast en cours de lecture",
        description: podcast.title
      });
    }
  };

  // Sauvegarder/Retirer un podcast
  const toggleSave = (podcastId) => {
    if (savedPodcasts.includes(podcastId)) {
      setSavedPodcasts(savedPodcasts.filter(id => id !== podcastId));
      toast({
        title: "Podcast retiré",
        description: "Le podcast a été retiré de vos favoris"
      });
    } else {
      setSavedPodcasts([...savedPodcasts, podcastId]);
      toast({
        title: "Podcast sauvegardé",
        description: "Le podcast a été ajouté à vos favoris"
      });
    }
  };

  // Rendu d'une carte de podcast
  const renderPodcastCard = (podcast) => (
    <Card key={podcast.id} className="bg-vip-gray-900 border-vip-gray-800 overflow-hidden flex flex-col">
      <div className="h-48 overflow-hidden">
        <img 
          src={podcast.imageUrl} 
          alt={podcast.title} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge className="bg-vip-gold text-vip-black">{podcast.category}</Badge>
          <span className="text-sm text-vip-gray-400">{podcast.duration}</span>
        </div>
        <CardTitle className="text-vip-white text-lg mt-2">{podcast.title}</CardTitle>
        <CardDescription className="text-vip-gray-400">
          Par {podcast.author} • {podcast.date}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-vip-gray-300 text-sm line-clamp-3">{podcast.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between pt-2 border-t border-vip-gray-800">
        <button 
          className={`p-2 rounded-full ${
            currentPodcast && currentPodcast.id === podcast.id && isPlaying 
              ? 'bg-vip-gold text-vip-black' 
              : 'bg-vip-gray-800 text-vip-gold hover:bg-vip-gold/20'
          }`}
          onClick={() => togglePlay(podcast)}
        >
          {currentPodcast && currentPodcast.id === podcast.id && isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>
        <button 
          className={`p-2 rounded-full ${
            savedPodcasts.includes(podcast.id)
              ? 'bg-vip-gold text-vip-black' 
              : 'bg-vip-gray-800 text-vip-gold hover:bg-vip-gold/20'
          }`}
          onClick={() => toggleSave(podcast.id)}
        >
          {savedPodcasts.includes(podcast.id) ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
        </button>
      </CardFooter>
    </Card>
  );

  return (
    <DashboardLayout type="client">
      <h1 className="text-2xl font-bold mb-6">Podcasts VIP</h1>
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-vip-gray-500" size={18} />
        <Input
          placeholder="Rechercher un podcast..."
          className="pl-10 bg-vip-gray-800 border-vip-gray-700"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">Tous les podcasts</TabsTrigger>
          <TabsTrigger value="bookmarked">Mes favoris</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          {filteredPodcasts.length === 0 ? (
            <p className="text-center text-vip-gray-400 py-8">Aucun podcast ne correspond à votre recherche</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPodcasts.map(renderPodcastCard)}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="bookmarked">
          {bookmarkedPodcasts.length === 0 ? (
            <p className="text-center text-vip-gray-400 py-8">Vous n'avez pas encore de podcasts favoris</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarkedPodcasts.map(renderPodcastCard)}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Lecteur de podcast fixe en bas de page */}
      {currentPodcast && (
        <div className="fixed bottom-0 left-0 right-0 bg-vip-gray-900 border-t border-vip-gray-800 p-4 flex items-center">
          <button 
            className={`p-2 mr-4 rounded-full ${isPlaying ? 'bg-vip-gold text-vip-black' : 'bg-vip-gray-800 text-vip-gold'}`}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <div className="flex-grow">
            <p className="font-medium text-vip-white">{currentPodcast.title}</p>
            <p className="text-sm text-vip-gray-400">{currentPodcast.author}</p>
          </div>
          <span className="text-vip-gray-400 ml-4">{currentPodcast.duration}</span>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ClientPodcasts;
