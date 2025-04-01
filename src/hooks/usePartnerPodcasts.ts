
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export interface Podcast {
  id: number;
  title: string;
  description: string;
  category: string;
  duration: string;
  date: string;
  status: "approved" | "pending" | "rejected";
  views: number;
  imageUrl: string;
  audioUrl: string;
}

export interface NewPodcast {
  title: string;
  description: string;
  category: string;
  audioFile: File | null;
  imageFile: File | null;
}

export const usePartnerPodcasts = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPodcast, setCurrentPodcast] = useState<Podcast | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newPodcast, setNewPodcast] = useState<NewPodcast>({
    title: "",
    description: "",
    category: "",
    audioFile: null,
    imageFile: null
  });

  // Données simulées de podcasts
  const [podcasts, setPodcasts] = useState<Podcast[]>([
    {
      id: 1,
      title: "Comment choisir le lieu parfait pour votre mariage",
      description: "Dans cet épisode, nous explorons les critères essentiels pour sélectionner le lieu idéal pour votre mariage, en fonction de votre budget et du nombre d'invités.",
      category: "Mariage",
      duration: "18:45",
      date: "2023-02-15",
      status: "approved",
      views: 324,
      imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      audioUrl: "https://example.com/podcast1.mp3"
    },
    {
      id: 2,
      title: "Les tendances déco pour vos événements d'entreprise",
      description: "Découvrez les dernières tendances en matière de décoration pour vos événements professionnels et comment impressionner vos clients et collaborateurs.",
      category: "Entreprise",
      duration: "24:10",
      date: "2023-01-28",
      status: "pending",
      views: 0,
      imageUrl: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
      audioUrl: "https://example.com/podcast2.mp3"
    }
  ]);

  const [audioFileName, setAudioFileName] = useState("");
  const [imageFileName, setImageFileName] = useState("");

  // Filter podcasts based on search query
  const filteredPodcasts = podcasts.filter(podcast => {
    if (!searchQuery.trim()) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      podcast.title.toLowerCase().includes(query) ||
      podcast.category.toLowerCase().includes(query) ||
      podcast.description.toLowerCase().includes(query)
    );
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setNewPodcast(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string) => {
    setNewPodcast(prev => ({ ...prev, category: value }));
  };

  const handleAudioFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewPodcast(prev => ({ ...prev, audioFile: file }));
      setAudioFileName(file.name);
    }
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewPodcast(prev => ({ ...prev, imageFile: file }));
      setImageFileName(file.name);
      
      // Prévisualisation de l'image (optionnelle)
      const reader = new FileReader();
      reader.onload = function(event) {
        const imgPreview = document.getElementById('image-preview') as HTMLImageElement;
        if (imgPreview && event.target) {
          imgPreview.src = event.target.result as string;
        }
        
        const previewContainer = document.getElementById('image-preview-container');
        if (previewContainer) {
          previewContainer.classList.remove('hidden');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Vérification que tous les champs sont remplis
    if (!newPodcast.title || !newPodcast.description || !newPodcast.category || !newPodcast.audioFile) {
      toast({
        variant: "destructive",
        title: "Champs manquants",
        description: "Veuillez remplir tous les champs obligatoires."
      });
      setIsLoading(false);
      return;
    }

    // Simulation d'upload et création de podcast
    setTimeout(() => {
      const newId = podcasts.length > 0 ? Math.max(...podcasts.map(p => p.id)) + 1 : 1;
      const podcast = {
        id: newId,
        title: newPodcast.title,
        description: newPodcast.description,
        category: newPodcast.category,
        duration: "12:34", // Durée arbitraire pour la simulation
        date: new Date().toISOString().split('T')[0],
        status: "pending" as const,
        views: 0,
        imageUrl: newPodcast.imageFile ? URL.createObjectURL(newPodcast.imageFile) : "https://via.placeholder.com/300x200",
        audioUrl: "https://example.com/podcast-simulation.mp3"
      };
      
      setPodcasts(prev => [podcast, ...prev]);
      
      // Réinitialiser le formulaire
      setNewPodcast({
        title: "",
        description: "",
        category: "",
        audioFile: null,
        imageFile: null
      });
      setAudioFileName("");
      setImageFileName("");
      
      const previewContainer = document.getElementById('image-preview-container');
      if (previewContainer) {
        previewContainer.classList.add('hidden');
      }
      
      toast({
        title: "Podcast ajouté",
        description: "Votre podcast a été soumis et est en attente de validation."
      });
      
      setIsLoading(false);
    }, 2000);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce podcast?")) {
      setPodcasts(podcasts.filter(podcast => podcast.id !== id));
      toast({
        title: "Podcast supprimé",
        description: "Le podcast a été supprimé avec succès."
      });
    }
  };

  const togglePlay = (podcast: Podcast) => {
    if (currentPodcast && currentPodcast.id === podcast.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentPodcast(podcast);
      setIsPlaying(true);
    }
  };

  // Podcasts filtrés par statut
  const approvedPodcasts = filteredPodcasts.filter(p => p.status === "approved");
  const pendingPodcasts = filteredPodcasts.filter(p => p.status === "pending");

  // Fonction pour naviguer vers l'onglet "new"
  const navigateToNewTab = () => {
    const newTabTrigger = document.querySelector('[data-value="new"]') as HTMLElement;
    if (newTabTrigger) {
      newTabTrigger.click();
    }
  };

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
