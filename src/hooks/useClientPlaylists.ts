
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { PlaylistRepository } from "@/services/PlaylistRepository";
import { formatErrorMessage } from "@/utils/errorHandling";
import { Playlist, Song, NewSong } from "@/models/playlist";

export const useClientPlaylists = (clientId: string = "client-1") => {
  const { toast } = useToast();
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const playlistRepo = PlaylistRepository.getInstance();

  // Charger les playlists du client
  const loadPlaylists = () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const clientPlaylists = playlistRepo.getPlaylistsByClient(clientId);
      setPlaylists(clientPlaylists);
    } catch (err) {
      const errorMessage = formatErrorMessage(err);
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Erreur de chargement",
        description: errorMessage
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Filtrer les playlists en fonction de la recherche
  useEffect(() => {
    if (searchQuery.trim() === "") {
      loadPlaylists();
    } else {
      try {
        const results = playlistRepo.searchPlaylists(searchQuery);
        // Filtrer seulement les playlists du client
        const filteredResults = results.filter(playlist => playlist.clientId === clientId);
        setPlaylists(filteredResults);
      } catch (err) {
        const errorMessage = formatErrorMessage(err);
        setError(errorMessage);
      }
    }
  }, [searchQuery, clientId]);

  // Charger les playlists au montage du composant
  useEffect(() => {
    loadPlaylists();
  }, [clientId]);

  // Ouvrir une playlist
  const openPlaylist = (playlistId: string) => {
    try {
      const playlist = playlistRepo.getPlaylistById(playlistId);
      if (playlist) {
        setCurrentPlaylist(playlist);
        // Si la playlist a des chansons, définir la première comme actuelle
        if (playlist.songs.length > 0) {
          setCurrentSong(playlist.songs[0]);
        } else {
          setCurrentSong(null);
        }
        setIsPlaying(false);
      }
    } catch (err) {
      const errorMessage = formatErrorMessage(err);
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: errorMessage
      });
    }
  };

  // Ajouter une chanson à la playlist
  const addSong = (playlistId: string, song: NewSong) => {
    try {
      const addedSong = playlistRepo.addSongToPlaylist(playlistId, song, "client");
      if (addedSong && currentPlaylist && currentPlaylist.id === playlistId) {
        setCurrentPlaylist({
          ...currentPlaylist,
          songs: [...currentPlaylist.songs, addedSong],
          updatedAt: new Date()
        });
      }
      
      toast({
        title: "Chanson ajoutée",
        description: `"${song.title}" a été ajoutée à la playlist`
      });
      
      // Recharger les playlists pour mettre à jour la liste
      loadPlaylists();
      
      return addedSong;
    } catch (err) {
      const errorMessage = formatErrorMessage(err);
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: errorMessage
      });
      return null;
    }
  };

  // Supprimer une chanson de la playlist
  const removeSong = (playlistId: string, songId: string) => {
    try {
      const success = playlistRepo.removeSongFromPlaylist(playlistId, songId);
      if (success) {
        if (currentPlaylist && currentPlaylist.id === playlistId) {
          // Mettre à jour la playlist courante
          const updatedPlaylist = {
            ...currentPlaylist,
            songs: currentPlaylist.songs.filter(song => song.id !== songId),
            updatedAt: new Date()
          };
          setCurrentPlaylist(updatedPlaylist);
          
          // Si la chanson supprimée était la chanson courante
          if (currentSong && currentSong.id === songId) {
            const nextSong = updatedPlaylist.songs[0] || null;
            setCurrentSong(nextSong);
            setIsPlaying(false);
          }
        }
        
        // Recharger les playlists
        loadPlaylists();
        
        toast({
          title: "Chanson supprimée",
          description: "La chanson a été supprimée de la playlist"
        });
      }
      return success;
    } catch (err) {
      const errorMessage = formatErrorMessage(err);
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: errorMessage
      });
      return false;
    }
  };

  // Jouer une chanson
  const playSong = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  // Mettre en pause/reprendre
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Chanson suivante
  const nextSong = () => {
    if (!currentPlaylist || !currentSong) return;
    
    const currentIndex = currentPlaylist.songs.findIndex(song => song.id === currentSong.id);
    if (currentIndex < currentPlaylist.songs.length - 1) {
      setCurrentSong(currentPlaylist.songs[currentIndex + 1]);
      setIsPlaying(true);
    }
  };

  // Chanson précédente
  const previousSong = () => {
    if (!currentPlaylist || !currentSong) return;
    
    const currentIndex = currentPlaylist.songs.findIndex(song => song.id === currentSong.id);
    if (currentIndex > 0) {
      setCurrentSong(currentPlaylist.songs[currentIndex - 1]);
      setIsPlaying(true);
    }
  };

  return {
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
    refresh: loadPlaylists
  };
};
