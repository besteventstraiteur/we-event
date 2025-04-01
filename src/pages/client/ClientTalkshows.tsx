
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Pause, Bookmark, BookmarkCheck, Search, Users } from "lucide-react";
import { TalkshowRepository } from "@/services/TalkshowRepository";
import { Talkshow } from "@/models/talkshow";

const ClientTalkshows = () => {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [currentTalkshow, setCurrentTalkshow] = useState<Talkshow | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [savedTalkshows, setSavedTalkshows] = useState<number[]>([1, 3]); // IDs des talkshows sauvegardés

  // Récupérer les talkshows depuis le repository
  const talkshows = TalkshowRepository.getInstance().getAllTalkshows().filter(t => t.status === "approved");

  // Filtrer les talkshows en fonction de la recherche
  const filteredTalkshows = talkshows.filter(talkshow => 
    talkshow.title.toLowerCase().includes(search.toLowerCase()) ||
    talkshow.description.toLowerCase().includes(search.toLowerCase()) ||
    talkshow.host.toLowerCase().includes(search.toLowerCase()) ||
    talkshow.category.toLowerCase().includes(search.toLowerCase()) ||
    talkshow.guests.some(guest => guest.toLowerCase().includes(search.toLowerCase()))
  );

  // Talkshows sauvegardés
  const bookmarkedTalkshows = talkshows.filter(talkshow => savedTalkshows.includes(talkshow.id));

  // Simuler la lecture d'un talkshow
  const togglePlay = (talkshow: Talkshow) => {
    if (currentTalkshow && currentTalkshow.id === talkshow.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTalkshow(talkshow);
      setIsPlaying(true);
      toast({
        title: "Talkshow en cours de lecture",
        description: talkshow.title
      });
    }
  };

  // Sauvegarder/Retirer un talkshow
  const toggleSave = (talkshowId: number) => {
    if (savedTalkshows.includes(talkshowId)) {
      setSavedTalkshows(savedTalkshows.filter(id => id !== talkshowId));
      toast({
        title: "Talkshow retiré",
        description: "Le talkshow a été retiré de vos favoris"
      });
    } else {
      setSavedTalkshows([...savedTalkshows, talkshowId]);
      toast({
        title: "Talkshow sauvegardé",
        description: "Le talkshow a été ajouté à vos favoris"
      });
    }
  };

  // Rendu d'une carte de talkshow
  const renderTalkshowCard = (talkshow: Talkshow) => (
    <Card key={talkshow.id} className="bg-vip-gray-900 border-vip-gray-800 overflow-hidden flex flex-col">
      <div className="h-48 overflow-hidden">
        <img 
          src={talkshow.imageUrl} 
          alt={talkshow.title} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge className="bg-vip-gold text-vip-black">{talkshow.category}</Badge>
          <span className="text-sm text-vip-gray-400">{talkshow.duration}</span>
        </div>
        <CardTitle className="text-vip-white text-lg mt-2">{talkshow.title}</CardTitle>
        <CardDescription className="text-vip-gray-400">
          Par {talkshow.host} • {talkshow.date}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-vip-gray-300 text-sm line-clamp-3">{talkshow.description}</p>
        {talkshow.guests.length > 0 && (
          <div className="mt-2 flex items-center gap-1 text-xs text-vip-gray-400">
            <Users size={12} className="text-vip-gold" />
            <span>Avec: {talkshow.guests.join(', ')}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between pt-2 border-t border-vip-gray-800">
        <button 
          className={`p-2 rounded-full ${
            currentTalkshow && currentTalkshow.id === talkshow.id && isPlaying 
              ? 'bg-vip-gold text-vip-black' 
              : 'bg-vip-gray-800 text-vip-gold hover:bg-vip-gold/20'
          }`}
          onClick={() => togglePlay(talkshow)}
        >
          {currentTalkshow && currentTalkshow.id === talkshow.id && isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>
        <button 
          className={`p-2 rounded-full ${
            savedTalkshows.includes(talkshow.id)
              ? 'bg-vip-gold text-vip-black' 
              : 'bg-vip-gray-800 text-vip-gold hover:bg-vip-gold/20'
          }`}
          onClick={() => toggleSave(talkshow.id)}
        >
          {savedTalkshows.includes(talkshow.id) ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
        </button>
      </CardFooter>
    </Card>
  );

  return (
    <DashboardLayout type="client">
      <h1 className="text-2xl font-bold mb-6">Talkshows VIP</h1>
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-vip-gray-500" size={18} />
        <Input
          placeholder="Rechercher un talkshow..."
          className="pl-10 bg-vip-gray-800 border-vip-gray-700"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">Tous les talkshows</TabsTrigger>
          <TabsTrigger value="bookmarked">Mes favoris</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          {filteredTalkshows.length === 0 ? (
            <p className="text-center text-vip-gray-400 py-8">Aucun talkshow ne correspond à votre recherche</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTalkshows.map(renderTalkshowCard)}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="bookmarked">
          {bookmarkedTalkshows.length === 0 ? (
            <p className="text-center text-vip-gray-400 py-8">Vous n'avez pas encore de talkshows favoris</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarkedTalkshows.map(renderTalkshowCard)}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Lecteur de talkshow fixe en bas de page */}
      {currentTalkshow && (
        <div className="fixed bottom-0 left-0 right-0 bg-vip-gray-900 border-t border-vip-gray-800 p-4 flex items-center">
          <button 
            className={`p-2 mr-4 rounded-full ${isPlaying ? 'bg-vip-gold text-vip-black' : 'bg-vip-gray-800 text-vip-gold'}`}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <div className="flex-grow">
            <p className="font-medium text-vip-white">{currentTalkshow.title}</p>
            <p className="text-sm text-vip-gray-400">{currentTalkshow.host}</p>
          </div>
          <span className="text-vip-gray-400 ml-4">{currentTalkshow.duration}</span>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ClientTalkshows;
