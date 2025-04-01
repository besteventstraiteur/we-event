import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { PodcastRepository } from "@/services/PodcastRepository";
import { usePodcastPlayer } from "./usePodcastPlayer";
import { usePodcastForm } from "./usePodcastForm";
import { formatErrorMessage } from "@/utils/errorHandling";
import { Podcast, NewPodcast } from "@/models/podcast";

/**
 * Custom hook for managing partner podcasts
 * 
 * Centralizes podcast-related functionality including:
 * - Listing and searching podcasts
 * - Filtering podcasts by status
 * - Handling podcast playback
 * - Managing podcast form and submission
 * 
 * @returns Object containing podcast data and functions
 */
export const usePartnerPodcasts = () => {
  const { toast } = useToast();
  /** All podcasts */
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  /** Current search query */
  const [searchQuery, setSearchQuery] = useState("");
  /** Podcasts filtered by search query */
  const [filteredPodcasts, setFilteredPodcasts] = useState<Podcast[]>([]);
  /** Error state for podcast operations */
  const [error, setError] = useState<string | null>(null);
  /** Loading state for podcast operations */
  const [isLoadingPodcasts, setIsLoadingPodcasts] = useState(false);
  
  /** Repository instance for podcast data operations */
  const podcastRepo = PodcastRepository.getInstance();
  
  /** Podcast player state and functions */
  const { 
    currentPodcast, isPlaying, togglePlay, setIsPlaying 
  } = usePodcastPlayer();
  
  /** Podcast form state and handlers */
  const {
    newPodcast,
    audioFileName,
    imageFileName,
    isLoading: isFormLoading,
    error: formError,
    handleChange,
    handleSelectChange,
    handleAudioFileChange,
    handleImageFileChange,
    handleSubmit,
    resetForm
  } = usePodcastForm();

  /**
   * Navigates to the "new" tab for podcast creation
   */
  const navigateToNewTab = () => {
    const newTabTrigger = document.querySelector('[data-value="new"]') as HTMLElement;
    if (newTabTrigger) {
      newTabTrigger.click();
    }
  };

  /**
   * Loads all podcasts from the repository
   */
  const loadPodcasts = () => {
    setIsLoadingPodcasts(true);
    setError(null);
    
    try {
      setPodcasts(podcastRepo.getAllPodcasts());
    } catch (err) {
      const errorMessage = formatErrorMessage(err);
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Erreur de chargement",
        description: errorMessage
      });
    } finally {
      setIsLoadingPodcasts(false);
    }
  };

  // Load podcasts initially
  useEffect(() => {
    loadPodcasts();
  }, []);

  // Filter podcasts when search query changes
  useEffect(() => {
    try {
      const filtered = podcastRepo.searchPodcasts(searchQuery);
      setFilteredPodcasts(filtered);
      setError(null);
    } catch (err) {
      const errorMessage = formatErrorMessage(err);
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Erreur de recherche",
        description: errorMessage
      });
    }
  }, [searchQuery, podcasts]);

  /**
   * Handles podcast deletion with confirmation
   * 
   * @param id - The ID of the podcast to delete
   */
  const handleDelete = (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce podcast?")) {
      try {
        podcastRepo.deletePodcast(id);
        loadPodcasts(); // Reload podcasts after deletion
        
        toast({
          title: "Podcast supprimé",
          description: "Le podcast a été supprimé avec succès."
        });
        
        // If the deleted podcast was playing, stop playback
        if (currentPodcast && currentPodcast.id === id) {
          setIsPlaying(false);
        }
      } catch (err) {
        const errorMessage = formatErrorMessage(err);
        setError(errorMessage);
        toast({
          variant: "destructive",
          title: "Erreur de suppression",
          description: errorMessage
        });
      }
    }
  };

  // Podcasts filtered by status
  const approvedPodcasts = filteredPodcasts.filter(p => p.status === "approved");
  const pendingPodcasts = filteredPodcasts.filter(p => p.status === "pending");

  return {
    podcasts: filteredPodcasts,
    approvedPodcasts,
    pendingPodcasts,
    isLoading: isFormLoading,
    isLoadingPodcasts,
    currentPodcast,
    isPlaying,
    newPodcast,
    audioFileName,
    imageFileName,
    searchQuery,
    error,
    formError,
    setSearchQuery,
    handleChange,
    handleSelectChange,
    handleAudioFileChange,
    handleImageFileChange,
    handleSubmit,
    handleDelete,
    togglePlay,
    navigateToNewTab,
    setIsPlaying,
    resetForm,
    refresh: loadPodcasts
  };
};
