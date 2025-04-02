
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useClientPlaylists } from "@/hooks/useClientPlaylists";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import PlaylistItem from "@/components/music/PlaylistItem";
import MusicPlayer from "@/components/music/MusicPlayer";
import SongList from "@/components/music/SongList";
import AddSongForm from "@/components/music/AddSongForm";
import { Search, AlertCircle, RefreshCw, PlusCircle, PlayIcon, Music } from "lucide-react";
import { NewSong } from "@/models/playlist";

const ClientMusicPlaylists = () => {
  const {
    playlists,
    currentPlaylist,
    currentSong,
    isPlaying,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    openPlaylist,
    addSong,
    removeSong,
    playSong,
    togglePlay,
    nextSong,
    previousSong,
    refresh
  } = useClientPlaylists();

  const [isAddSongModalOpen, setIsAddSongModalOpen] = useState(false);

  const handleAddSong = (song: NewSong) => {
    if (currentPlaylist) {
      addSong(currentPlaylist.id, song);
      setIsAddSongModalOpen(false);
    }
  };

  return (
    <DashboardLayout type="client">
      <h1 className="text-2xl font-bold mb-6">Mes Playlists Musicales</h1>
      
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
      
      <div className="flex items-center justify-between mb-6">
        <div className="relative max-w-md flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-vip-gray-500" size={18} />
          <Input
            type="search"
            placeholder="Rechercher une playlist ou un morceau..."
            className="pl-10 bg-vip-gray-900 border-vip-gray-800"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Liste des playlists */}
        <div className="w-full lg:w-1/3 space-y-4">
          <h2 className="text-lg font-medium text-white flex items-center gap-2">
            <Music className="h-5 w-5" /> Playlists partagées
          </h2>
          
          {isLoading ? (
            <div className="py-8 text-center">
              <p className="text-vip-gray-400">Chargement des playlists...</p>
            </div>
          ) : playlists.length === 0 ? (
            <Card className="bg-vip-gray-800 border-vip-gray-700">
              <CardContent className="py-8 text-center">
                <Music className="mx-auto h-10 w-10 text-vip-gray-600 mb-3" />
                <p className="text-vip-gray-400 mb-4">
                  Aucune playlist partagée par votre DJ
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {playlists.map((playlist) => (
                <PlaylistItem
                  key={playlist.id}
                  playlist={playlist}
                  isActive={currentPlaylist?.id === playlist.id}
                  onClick={() => openPlaylist(playlist.id)}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Détails de la playlist */}
        <div className="w-full lg:w-2/3 space-y-4">
          {currentPlaylist ? (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-white">{currentPlaylist.name}</h2>
                <Button 
                  onClick={() => setIsAddSongModalOpen(true)}
                  className="bg-vip-gold hover:bg-vip-gold/90 text-vip-black"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Ajouter un morceau
                </Button>
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
              
              <h3 className="text-md font-medium text-white flex items-center gap-2 mt-4">
                <PlayIcon className="h-4 w-4" /> Morceaux de la playlist
              </h3>
              
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
                <p className="text-vip-gray-500 text-sm">
                  Votre DJ a partagé des playlists avec vous ? <br />
                  Vous pouvez les explorer et ajouter vos propres morceaux !
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
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
    </DashboardLayout>
  );
};

export default ClientMusicPlaylists;
