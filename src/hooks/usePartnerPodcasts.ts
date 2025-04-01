
import { useState, useEffect } from "react";
import { Podcast } from "@/models/podcast";
import { useToast } from "@/hooks/use-toast";
import { PodcastRepository } from "@/services/PodcastRepository";
import { usePodcastPlayer } from "./usePodcastPlayer";
import { usePodcastForm } from "./usePodcastForm";

export type { Podcast } from "@/models/podcast";
export type { NewPodcast } from "@/models/podcast";

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
    isLoading,
    handleChange,
    handleSelectChange,
    handleAudioFileChange,
    handleImageFileChange,
    handleSubmit
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

  // Load podcasts initially
  useEffect(() => {
    setPodcasts(podcastRepo.getAllPodcasts());
  }, []);

  // Filter podcasts when search query changes
  useEffect(() => {
    const filtered = podcastRepo.searchPodcasts(searchQuery);
    setFilteredPodcasts(filtered);
  }, [searchQuery, podcasts]);

  /**
   * Handles podcast deletion with confirmation
   * 
   * @param id - The ID of the podcast to delete
   */
  const handleDelete = (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce podcast?")) {
      podcastRepo.deletePodcast(id);
      setPodcasts(podcastRepo.getAllPodcasts());
      
      toast({
        title: "Podcast supprimé",
        description: "Le podcast a été supprimé avec succès."
      });
    }
  };

  // Podcasts filtered by status
  const approvedPodcasts = filteredPodcasts.filter(p => p.status === "approved");
  const pendingPodcasts = filteredPodcasts.filter(p => p.status === "pending");

  return {
    podcasts: filteredPodcasts,
    approvedPodcasts,
    pendingPodcasts,
    isLoading,
    currentPodcast,
    isPlaying,
    newPodcast,
    audioFileName,
    imageFileName,
    searchQuery,
    setSearchQuery,
    handleChange,
    handleSelectChange,
    handleAudioFileChange,
    handleImageFileChange,
    handleSubmit,
    handleDelete,
    togglePlay,
    navigateToNewTab,
    setIsPlaying
  };
};
