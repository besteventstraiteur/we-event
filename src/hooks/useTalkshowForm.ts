
import { useState } from "react";
import { NewTalkshow } from "@/models/talkshow";
import { useToast } from "@/hooks/use-toast";
import { TalkshowRepository } from "@/services/TalkshowRepository";
import { PodcastError, formatErrorMessage } from "@/utils/errorHandling";

/**
 * Hook personnalisé pour gérer le formulaire de talkshow
 * 
 * @returns Objet contenant l'état du formulaire, les gestionnaires et la fonction de soumission
 */
export const useTalkshowForm = () => {
  const { toast } = useToast();
  /** État de chargement pendant la soumission du formulaire */
  const [isLoading, setIsLoading] = useState(false);
  /** État d'erreur pour le formulaire */
  const [error, setError] = useState<string | null>(null);
  /** État pour les données du nouveau talkshow */
  const [newTalkshow, setNewTalkshow] = useState<NewTalkshow>({
    title: "",
    description: "",
    category: "",
    host: "",
    guests: "",
    videoFile: null,
    imageFile: null
  });
  /** Nom d'affichage pour le fichier vidéo sélectionné */
  const [videoFileName, setVideoFileName] = useState("");
  /** Nom d'affichage pour le fichier image sélectionné */
  const [imageFileName, setImageFileName] = useState("");

  /**
   * Valide les données du formulaire avant soumission
   * 
   * @returns True si le formulaire est valide, false sinon
   */
  const validateForm = (): boolean => {
    if (!newTalkshow.title.trim()) {
      setError("Le titre est obligatoire");
      return false;
    }
    if (!newTalkshow.category) {
      setError("La catégorie est obligatoire");
      return false;
    }
    if (!newTalkshow.host.trim()) {
      setError("Le nom de l'hôte est obligatoire");
      return false;
    }
    if (!newTalkshow.videoFile) {
      setError("Le fichier vidéo est obligatoire");
      return false;
    }
    return true;
  };

  /**
   * Gère les changements dans les champs texte
   * 
   * @param e - L'événement de changement
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setNewTalkshow(prev => ({ ...prev, [id]: value }));
    setError(null); // Effacer les erreurs à chaque changement
  };

  /**
   * Gère les changements dans le menu déroulant de catégorie
   * 
   * @param value - La valeur de catégorie sélectionnée
   */
  const handleSelectChange = (value: string) => {
    setNewTalkshow(prev => ({ ...prev, category: value }));
    setError(null);
  };

  /**
   * Gère la sélection du fichier vidéo
   * 
   * @param e - L'événement de changement du champ fichier
   */
  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        
        // Valider le type de fichier
        if (!file.type.includes('video/')) {
          setError("Le fichier sélectionné n'est pas un fichier vidéo");
          return;
        }
        
        // Valider la taille du fichier (50MB maximum)
        if (file.size > 50 * 1024 * 1024) {
          setError("Le fichier vidéo ne doit pas dépasser 50MB");
          return;
        }
        
        setNewTalkshow(prev => ({ ...prev, videoFile: file }));
        setVideoFileName(file.name);
        setError(null);
      }
    } catch (error) {
      setError("Erreur lors de la sélection du fichier vidéo");
      console.error("Erreur fichier vidéo:", error);
    }
  };

  /**
   * Gère la sélection du fichier image et génère un aperçu
   * 
   * @param e - L'événement de changement du champ fichier
   */
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        
        // Valider le type de fichier
        if (!file.type.includes('image/')) {
          setError("Le fichier sélectionné n'est pas une image");
          return;
        }
        
        // Valider la taille du fichier (5MB maximum)
        if (file.size > 5 * 1024 * 1024) {
          setError("L'image ne doit pas dépasser 5MB");
          return;
        }
        
        setNewTalkshow(prev => ({ ...prev, imageFile: file }));
        setImageFileName(file.name);
        
        // Générer un aperçu de l'image
        const reader = new FileReader();
        reader.onload = function(event) {
          const imgPreview = document.getElementById('talkshow-image-preview') as HTMLImageElement;
          if (imgPreview && event.target) {
            imgPreview.src = event.target.result as string;
          }
          
          const previewContainer = document.getElementById('talkshow-image-preview-container');
          if (previewContainer) {
            previewContainer.classList.remove('hidden');
          }
        };
        reader.readAsDataURL(file);
        setError(null);
      }
    } catch (error) {
      setError("Erreur lors de la sélection de l'image");
      console.error("Erreur fichier image:", error);
    }
  };

  /**
   * Réinitialise le formulaire à son état initial
   */
  const resetForm = () => {
    setNewTalkshow({
      title: "",
      description: "",
      category: "",
      host: "",
      guests: "",
      videoFile: null,
      imageFile: null
    });
    setVideoFileName("");
    setImageFileName("");
    setError(null);
    
    const previewContainer = document.getElementById('talkshow-image-preview-container');
    if (previewContainer) {
      previewContainer.classList.add('hidden');
    }
  };

  /**
   * Gère la soumission du formulaire pour créer un nouveau talkshow
   * 
   * @param e - L'événement de soumission du formulaire
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Valider le formulaire
    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      await TalkshowRepository.getInstance().addTalkshow(newTalkshow);
      
      // Réinitialiser le formulaire après une soumission réussie
      resetForm();
      
      toast({
        title: "Talkshow ajouté",
        description: "Votre talkshow a été soumis et est en attente de validation."
      });
    } catch (error) {
      const errorMessage = formatErrorMessage(error);
      setError(errorMessage);
      
      toast({
        variant: "destructive",
        title: "Erreur",
        description: errorMessage
      });
      
      console.error("Erreur de soumission:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    newTalkshow,
    videoFileName,
    imageFileName,
    isLoading,
    error,
    handleChange,
    handleSelectChange,
    handleVideoFileChange,
    handleImageFileChange,
    handleSubmit,
    resetForm
  };
};
