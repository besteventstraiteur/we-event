
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useDjPlaylists } from "@/hooks/useDjPlaylists";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlaylistItem from "@/components/music/PlaylistItem";
import MusicPlayer from "@/components/music/MusicPlayer";
import SongList from "@/components/music/SongList";
import AddSongForm from "@/components/music/AddSongForm";
import { 
  Search, AlertCircle, RefreshCw, PlusCircle, PlayIcon, 
  Plus, Music, FolderPlus, User, Users
} from "lucide-react";
import { NewSong, Playlist } from "@/models/playlist";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// Schéma pour la création d'une playlist
const playlistFormSchema = z.object({
  name: z.string().min(3, { message: "Le nom doit comporter au moins 3 caractères" }),
  eventType: z.enum(["wedding", "birthday", "corporate", "other"], {
    required_error: "Veuillez sélectionner un type d'événement",
  }),
  moment: z.enum(["entrance", "first_dance", "cake_cutting", "party", "closing", "other"], {
    required_error: "Veuillez sélectionner un moment",
  }),
  description: z.string().optional(),
  clientId: z.string({
    required_error: "Veuillez sélectionner un client",
  }),
});

type PlaylistFormValues = z.infer<typeof playlistFormSchema>;

const PartnerMusicPlaylists = () => {
  const {
    playlists,
    currentPlaylist,
    currentSong,
    isPlaying,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    clientFilter,
    setClientFilter,
    createPlaylist,
    openPlaylist,
    addSong,
    removeSong,
    deletePlaylist,
    playSong,
    togglePlay,
    nextSong,
    previousSong,
    refresh
  } = useDjPlaylists();

  const [activeTab, setActiveTab] = useState("all");
  const [isAddSongModalOpen, setIsAddSongModalOpen] = useState(false);
  const [isNewPlaylistModalOpen, setIsNewPlaylistModalOpen] = useState(false);

  // Formulaire de création de playlist
  const form = useForm<PlaylistFormValues>({
    resolver: zodResolver(playlistFormSchema),
    defaultValues: {
      name: "",
      eventType: "wedding",
      moment: "entrance",
      description: "",
      clientId: "",
    },
  });

  // Liste fictive de clients
  const mockClients = [
    { id: "client-1", name: "Sophie & Thomas" },
    { id: "client-2", name: "Émilie & Julien" },
    { id: "client-3", name: "Marine & Alexandre" },
  ];

  // Gérer la création d'une nouvelle playlist
  const onCreatePlaylist = (values: PlaylistFormValues) => {
    const newPlaylist = createPlaylist({
      name: values.name,
      eventType: values.eventType,
      moment: values.moment,
      description: values.description,
      clientId: values.clientId,
    });

    if (newPlaylist) {
      setIsNewPlaylistModalOpen(false);
      form.reset();
      // Ouvrir la playlist nouvellement créée
      openPlaylist(newPlaylist.id);
    }
  };

  // Gérer l'ajout d'une chanson
  const handleAddSong = (song: NewSong) => {
    if (currentPlaylist) {
      addSong(currentPlaylist.id, song);
      setIsAddSongModalOpen(false);
    }
  };

  return (
    <DashboardLayout type="partner">
      <h1 className="text-2xl font-bold mb-6">Gestion des Playlists Musicales</h1>
      
      {error && (
        <Alert variant="destructive" className="bg-red-900/20 border-red-900 mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-red-400 flex justify-between items-center">
            <span>{error}</span>
            <button 
              onClick={refresh}
              className="flex items-center gap-1 text-vip-gold hover:text-vip-gold/80"
            >
              <RefreshCw size={14} /> Réessayer
            </button>
          </AlertDescription>
        </Alert>
      )}
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-vip-gray-500" size={18} />
          <Input
            type="search"
            placeholder="Rechercher une playlist ou un morceau..."
            className="pl-10 bg-vip-gray-900 border-vip-gray-800"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <Select 
            value={clientFilter || "all"} 
            onValueChange={(value) => setClientFilter(value === "all" ? null : value)}
          >
            <SelectTrigger className="bg-vip-gray-900 border-vip-gray-800 w-full md:w-52">
              <SelectValue placeholder="Tous les clients" />
            </SelectTrigger>
            <SelectContent className="bg-vip-gray-800 border-vip-gray-700">
              <SelectItem value="all">Tous les clients</SelectItem>
              {mockClients.map(client => (
                <SelectItem key={client.id} value={client.id}>
                  {client.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button 
            onClick={() => setIsNewPlaylistModalOpen(true)}
            className="bg-vip-gold hover:bg-vip-gold/90 text-vip-black whitespace-nowrap"
          >
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle playlist
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 bg-vip-gray-900 border-vip-gray-800">
          <TabsTrigger 
            value="all" 
            className="data-[state=active]:bg-vip-gold data-[state=active]:text-vip-black"
          >
            <Music className="mr-2 h-4 w-4" />
            Toutes les playlists
          </TabsTrigger>
          <TabsTrigger 
            value="entrance" 
            className="data-[state=active]:bg-vip-gold data-[state=active]:text-vip-black"
          >
            Entrée
          </TabsTrigger>
          <TabsTrigger 
            value="first_dance" 
            className="data-[state=active]:bg-vip-gold data-[state=active]:text-vip-black"
          >
            Première danse
          </TabsTrigger>
          <TabsTrigger 
            value="party" 
            className="data-[state=active]:bg-vip-gold data-[state=active]:text-vip-black"
          >
            Soirée
          </TabsTrigger>
        </TabsList>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Liste des playlists */}
          <div className="w-full lg:w-1/3 space-y-4">
            {isLoading ? (
              <div className="py-8 text-center">
                <p className="text-vip-gray-400">Chargement des playlists...</p>
              </div>
            ) : (
              <>
                <TabsContent value="all" className="mt-0 space-y-3">
                  {playlists.length === 0 ? (
                    <Card className="bg-vip-gray-800 border-vip-gray-700">
                      <CardContent className="py-8 text-center">
                        <FolderPlus className="mx-auto h-10 w-10 text-vip-gray-600 mb-3" />
                        <p className="text-vip-gray-400 mb-4">
                          Aucune playlist créée
                        </p>
                        <Button 
                          onClick={() => setIsNewPlaylistModalOpen(true)}
                          className="bg-vip-gold hover:bg-vip-gold/90 text-vip-black"
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Créer une playlist
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    playlists.map((playlist) => (
                      <PlaylistItem
                        key={playlist.id}
                        playlist={playlist}
                        isActive={currentPlaylist?.id === playlist.id}
                        onClick={() => openPlaylist(playlist.id)}
                      />
                    ))
                  )}
                </TabsContent>
                
                <TabsContent value="entrance" className="mt-0 space-y-3">
                  {playlists.filter(p => p.moment === "entrance").length === 0 ? (
                    <p className="py-4 text-center text-vip-gray-400">Aucune playlist d'entrée</p>
                  ) : (
                    playlists
                      .filter(p => p.moment === "entrance")
                      .map((playlist) => (
                        <PlaylistItem
                          key={playlist.id}
                          playlist={playlist}
                          isActive={currentPlaylist?.id === playlist.id}
                          onClick={() => openPlaylist(playlist.id)}
                        />
                      ))
                  )}
                </TabsContent>
                
                <TabsContent value="first_dance" className="mt-0 space-y-3">
                  {playlists.filter(p => p.moment === "first_dance").length === 0 ? (
                    <p className="py-4 text-center text-vip-gray-400">Aucune playlist de première danse</p>
                  ) : (
                    playlists
                      .filter(p => p.moment === "first_dance")
                      .map((playlist) => (
                        <PlaylistItem
                          key={playlist.id}
                          playlist={playlist}
                          isActive={currentPlaylist?.id === playlist.id}
                          onClick={() => openPlaylist(playlist.id)}
                        />
                      ))
                  )}
                </TabsContent>
                
                <TabsContent value="party" className="mt-0 space-y-3">
                  {playlists.filter(p => p.moment === "party").length === 0 ? (
                    <p className="py-4 text-center text-vip-gray-400">Aucune playlist de soirée</p>
                  ) : (
                    playlists
                      .filter(p => p.moment === "party")
                      .map((playlist) => (
                        <PlaylistItem
                          key={playlist.id}
                          playlist={playlist}
                          isActive={currentPlaylist?.id === playlist.id}
                          onClick={() => openPlaylist(playlist.id)}
                        />
                      ))
                  )}
                </TabsContent>
              </>
            )}
          </div>
          
          {/* Détails de la playlist */}
          <div className="w-full lg:w-2/3 space-y-4">
            {currentPlaylist ? (
              <>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-medium text-white">{currentPlaylist.name}</h2>
                    <div className="flex items-center text-sm text-vip-gray-400">
                      <User className="mr-1.5 h-4 w-4" />
                      <span>
                        Client: {mockClients.find(c => c.id === currentPlaylist.clientId)?.name || currentPlaylist.clientId}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button 
                      onClick={() => setIsAddSongModalOpen(true)}
                      className="bg-vip-gray-800 hover:bg-vip-gray-700 text-white border border-vip-gray-700"
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Ajouter un morceau
                    </Button>
                    
                    <Button 
                      onClick={() => deletePlaylist(currentPlaylist.id)}
                      variant="destructive"
                    >
                      Supprimer la playlist
                    </Button>
                  </div>
                </div>
                
                {currentPlaylist.description && (
                  <p className="text-vip-gray-400">{currentPlaylist.description}</p>
                )}
                
                <Separator className="bg-vip-gray-700" />
                
                <MusicPlayer
                  song={currentSong}
                  isPlaying={isPlaying}
                  onTogglePlay={togglePlay}
                  onPrevious={previousSong}
                  onNext={nextSong}
                />
                
                <div className="flex items-center justify-between mt-4">
                  <h3 className="text-md font-medium text-white flex items-center gap-2">
                    <PlayIcon className="h-4 w-4" /> Morceaux de la playlist
                  </h3>
                  
                  <div className="flex items-center text-sm text-vip-gray-400">
                    <Users className="mr-1.5 h-4 w-4" />
                    <span>
                      {currentPlaylist.songs.filter(s => s.addedBy === "dj").length} par vous / 
                      {currentPlaylist.songs.filter(s => s.addedBy === "client").length} par client
                    </span>
                  </div>
                </div>
                
                <SongList
                  songs={currentPlaylist.songs}
                  currentSong={currentSong}
                  isPlaying={isPlaying}
                  onPlay={playSong}
                  onRemove={(songId) => removeSong(currentPlaylist.id, songId)}
                  onTogglePlay={togglePlay}
                />
              </>
            ) : (
              <Card className="bg-vip-gray-800 border-vip-gray-700">
                <CardContent className="py-12 text-center">
                  <Music className="mx-auto h-12 w-12 text-vip-gray-600 mb-4" />
                  <p className="text-vip-gray-400 mb-2">
                    Sélectionnez une playlist pour voir son contenu
                  </p>
                  <p className="text-vip-gray-500 text-sm mb-4">
                    Créez des playlists pour différents moments clés <br />
                    et partagez-les avec vos clients pour obtenir leurs préférences !
                  </p>
                  <Button 
                    onClick={() => setIsNewPlaylistModalOpen(true)}
                    className="bg-vip-gold hover:bg-vip-gold/90 text-vip-black"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Créer une playlist
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </Tabs>
      
      {/* Modal pour ajouter un morceau */}
      <Dialog open={isAddSongModalOpen} onOpenChange={setIsAddSongModalOpen}>
        <DialogContent className="bg-vip-gray-900 border-vip-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white">Ajouter un morceau</DialogTitle>
          </DialogHeader>
          <AddSongForm 
            onAddSong={handleAddSong}
            onCancel={() => setIsAddSongModalOpen(false)}
          />
        </DialogContent>
      </Dialog>
      
      {/* Modal pour créer une nouvelle playlist */}
      <Dialog open={isNewPlaylistModalOpen} onOpenChange={setIsNewPlaylistModalOpen}>
        <DialogContent className="bg-vip-gray-900 border-vip-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white">Créer une nouvelle playlist</DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onCreatePlaylist)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom de la playlist</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Ex: Playlist Mariage - Première danse" 
                        className="bg-vip-gray-800 border-vip-gray-700"
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="eventType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type d'événement</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-vip-gray-800 border-vip-gray-700">
                            <SelectValue placeholder="Sélectionner le type d'événement" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-vip-gray-800 border-vip-gray-700">
                          <SelectItem value="wedding">Mariage</SelectItem>
                          <SelectItem value="birthday">Anniversaire</SelectItem>
                          <SelectItem value="corporate">Entreprise</SelectItem>
                          <SelectItem value="other">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="moment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Moment</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-vip-gray-800 border-vip-gray-700">
                            <SelectValue placeholder="Sélectionner le moment" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-vip-gray-800 border-vip-gray-700">
                          <SelectItem value="entrance">Entrée</SelectItem>
                          <SelectItem value="first_dance">Première danse</SelectItem>
                          <SelectItem value="cake_cutting">Gâteau</SelectItem>
                          <SelectItem value="party">Soirée dansante</SelectItem>
                          <SelectItem value="closing">Clôture</SelectItem>
                          <SelectItem value="other">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="clientId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-vip-gray-800 border-vip-gray-700">
                          <SelectValue placeholder="Sélectionner un client" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-vip-gray-800 border-vip-gray-700">
                        {mockClients.map(client => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription className="text-vip-gray-500">
                      Le client pourra voir et ajouter des morceaux à cette playlist.
                    </FormDescription>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (optionnelle)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Une description pour aider votre client à comprendre l'objectif de cette playlist..." 
                        className="bg-vip-gray-800 border-vip-gray-700 min-h-[80px]"
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end space-x-3 pt-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsNewPlaylistModalOpen(false)}
                  className="border-vip-gray-700"
                >
                  Annuler
                </Button>
                <Button 
                  type="submit" 
                  className="bg-vip-gold hover:bg-vip-gold/90 text-vip-black"
                >
                  Créer la playlist
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Lecteur de musique fixe en bas de page (si une chanson est sélectionnée) */}
      {currentSong && (
        <div className="fixed bottom-0 left-0 right-0 p-2 z-50">
          <div className="container mx-auto">
            <MusicPlayer
              song={currentSong}
              isPlaying={isPlaying}
              onTogglePlay={togglePlay}
              onPrevious={previousSong}
              onNext={nextSong}
              compact={true}
            />
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default PartnerMusicPlaylists;
