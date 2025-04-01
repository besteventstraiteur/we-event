import { useState, useEffect } from "react";
import { Podcast } from "@/models/podcast";
import { useToast } from "@/hooks/use-toast";
import { PodcastRepository } from "@/services/PodcastRepository";
import { usePodcastPlayer } from "./usePodcastPlayer";
import { usePodcastForm } from "./usePodcastForm";

export type { Podcast } from "@/models/podcast";
export type { NewPodcast } from "@/models/podcast";

export const usePartnerPodcasts = () => {
  const { toast } = useToast();
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPodcasts, setFilteredPodcasts] = useState<Podcast[]>([]);
  
  const podcastRepo = PodcastRepository.getInstance();
  const { 
    currentPodcast, isPlaying, togglePlay, setIsPlaying 
  } = usePodcastPlayer();
  
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

  // Fonction pour naviguer vers l'onglet "new"
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

  // Handle podcast deletion
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

  // Podcasts filtrés par statut
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
