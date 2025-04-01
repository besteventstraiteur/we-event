
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { TalkshowRepository } from "@/services/TalkshowRepository";
import { useTalkshowPlayer } from "./useTalkshowPlayer";
import { useTalkshowForm } from "./useTalkshowForm";
import { formatErrorMessage } from "@/utils/errorHandling";
import { Talkshow, NewTalkshow } from "@/models/talkshow";

// Réexporter les types pour qu'ils soient accessibles aux composants
export type { Talkshow, NewTalkshow };

/**
 * Hook personnalisé pour gérer les talkshows des partenaires
 * 
 * Centralise les fonctionnalités liées aux talkshows:
 * - Liste et recherche de talkshows
 * - Filtrage par statut
 * - Gestion de la lecture
 * - Gestion du formulaire et soumission
 * 
 * @returns Objet contenant les données et fonctions des talkshows
 */
export const usePartnerTalkshows = () => {
  const { toast } = useToast();
  /** Tous les talkshows */
  const [talkshows, setTalkshows] = useState<Talkshow[]>([]);
  /** Requête de recherche actuelle */
  const [searchQuery, setSearchQuery] = useState("");
  /** Talkshows filtrés par requête de recherche */
  const [filteredTalkshows, setFilteredTalkshows] = useState<Talkshow[]>([]);
  /** État d'erreur pour les opérations de talkshow */
  const [error, setError] = useState<string | null>(null);
  /** État de chargement pour les opérations de talkshow */
  const [isLoadingTalkshows, setIsLoadingTalkshows] = useState(false);
  
  /** Instance du repository pour les opérations de données */
  const talkshowRepo = TalkshowRepository.getInstance();
  
  /** État et fonctions du lecteur de talkshow */
  const { 
    currentTalkshow, isPlaying, togglePlay, setIsPlaying 
  } = useTalkshowPlayer();
  
  /** État et gestionnaires du formulaire de talkshow */
  const {
    newTalkshow,
    videoFileName,
    imageFileName,
    isLoading: isFormLoading,
    error: formError,
    handleChange,
    handleSelectChange,
    handleVideoFileChange,
    handleImageFileChange,
    handleSubmit,
    resetForm
  } = useTalkshowForm();

  /**
   * Navigue vers l'onglet "nouveau" pour la création de talkshow
   */
  const navigateToNewTab = () => {
    const newTabTrigger = document.querySelector('[data-value="new"]') as HTMLElement;
    if (newTabTrigger) {
      newTabTrigger.click();
    }
  };

  /**
   * Charge tous les talkshows depuis le repository
   */
  const loadTalkshows = () => {
    setIsLoadingTalkshows(true);
    setError(null);
    
    try {
      setTalkshows(talkshowRepo.getAllTalkshows());
    } catch (err) {
      const errorMessage = formatErrorMessage(err);
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Erreur de chargement",
        description: errorMessage
      });
    } finally {
      setIsLoadingTalkshows(false);
    }
  };

  // Charge les talkshows initialement
  useEffect(() => {
    loadTalkshows();
  }, []);

  // Filtre les talkshows lorsque la requête de recherche change
  useEffect(() => {
    try {
      const filtered = talkshowRepo.searchTalkshows(searchQuery);
      setFilteredTalkshows(filtered);
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
  }, [searchQuery, talkshows]);

  /**
   * Gère la suppression d'un talkshow avec confirmation
   * 
   * @param id - L'ID du talkshow à supprimer
   */
  const handleDelete = (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce talkshow?")) {
      try {
        talkshowRepo.deleteTalkshow(id);
        loadTalkshows(); // Recharger les talkshows après la suppression
        
        toast({
          title: "Talkshow supprimé",
          description: "Le talkshow a été supprimé avec succès."
        });
        
        // Si le talkshow supprimé était en cours de lecture, arrêter la lecture
        if (currentTalkshow && currentTalkshow.id === id) {
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

  // Talkshows filtrés par statut
  const approvedTalkshows = filteredTalkshows.filter(t => t.status === "approved");
  const pendingTalkshows = filteredTalkshows.filter(t => t.status === "pending");

  return {
    talkshows: filteredTalkshows,
    approvedTalkshows,
    pendingTalkshows,
    isLoading: isFormLoading,
    isLoadingTalkshows,
    currentTalkshow,
    isPlaying,
    newTalkshow,
    videoFileName,
    imageFileName,
    searchQuery,
    error,
    formError,
    setSearchQuery,
    handleChange,
    handleSelectChange,
    handleVideoFileChange,
    handleImageFileChange,
    handleSubmit,
    handleDelete,
    togglePlay,
    navigateToNewTab,
    setIsPlaying,
    resetForm,
    refresh: loadTalkshows
  };
};
