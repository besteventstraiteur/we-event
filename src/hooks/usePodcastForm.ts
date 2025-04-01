
import { useState } from "react";
import { NewPodcast } from "@/models/podcast";
import { useToast } from "@/hooks/use-toast";
import { PodcastRepository } from "@/services/PodcastRepository";
import { PodcastError, formatErrorMessage } from "@/utils/errorHandling";

/**
 * Custom hook for managing podcast form state and submission
 * 
 * @returns Object containing form state, handlers, and submission function
 */
export const usePodcastForm = () => {
  const { toast } = useToast();
  /** Loading state during form submission */
  const [isLoading, setIsLoading] = useState(false);
  /** Error state for the form */
  const [error, setError] = useState<string | null>(null);
  /** State for the new podcast form data */
  const [newPodcast, setNewPodcast] = useState<NewPodcast>({
    title: "",
    description: "",
    category: "",
    audioFile: null,
    imageFile: null
  });
  /** Display name for the selected audio file */
  const [audioFileName, setAudioFileName] = useState("");
  /** Display name for the selected image file */
  const [imageFileName, setImageFileName] = useState("");

  /**
   * Validates the form data before submission
   * 
   * @returns True if the form is valid, false otherwise
   */
  const validateForm = (): boolean => {
    if (!newPodcast.title.trim()) {
      setError("Le titre est obligatoire");
      return false;
    }
    if (!newPodcast.category) {
      setError("La catégorie est obligatoire");
      return false;
    }
    if (!newPodcast.audioFile) {
      setError("Le fichier audio est obligatoire");
      return false;
    }
    return true;
  };

  /**
   * Handles changes to text input fields
   * 
   * @param e - The change event from the input element
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setNewPodcast(prev => ({ ...prev, [id]: value }));
    setError(null); // Clear errors when form changes
  };

  /**
   * Handles changes to the category select dropdown
   * 
   * @param value - The selected category value
   */
  const handleSelectChange = (value: string) => {
    setNewPodcast(prev => ({ ...prev, category: value }));
    setError(null); // Clear errors when form changes
  };

  /**
   * Handles audio file selection
   * 
   * @param e - The change event from the file input
   */
  const handleAudioFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        
        // Validate file type
        if (!file.type.includes('audio/')) {
          setError("Le fichier sélectionné n'est pas un fichier audio");
          return;
        }
        
        // Validate file size (20MB limit)
        if (file.size > 20 * 1024 * 1024) {
          setError("Le fichier audio ne doit pas dépasser 20MB");
          return;
        }
        
        setNewPodcast(prev => ({ ...prev, audioFile: file }));
        setAudioFileName(file.name);
        setError(null);
      }
    } catch (error) {
      setError("Erreur lors de la sélection du fichier audio");
      console.error("Audio file error:", error);
    }
  };

  /**
   * Handles image file selection and generates a preview
   * 
   * @param e - The change event from the file input
   */
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        
        // Validate file type
        if (!file.type.includes('image/')) {
          setError("Le fichier sélectionné n'est pas une image");
          return;
        }
        
        // Validate file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
          setError("L'image ne doit pas dépasser 5MB");
          return;
        }
        
        setNewPodcast(prev => ({ ...prev, imageFile: file }));
        setImageFileName(file.name);
        
        // Generate image preview
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
        setError(null);
      }
    } catch (error) {
      setError("Erreur lors de la sélection de l'image");
      console.error("Image file error:", error);
    }
  };

  /**
   * Resets the form to its initial state
   */
  const resetForm = () => {
    setNewPodcast({
      title: "",
      description: "",
      category: "",
      audioFile: null,
      imageFile: null
    });
    setAudioFileName("");
    setImageFileName("");
    setError(null);
    
    const previewContainer = document.getElementById('image-preview-container');
    if (previewContainer) {
      previewContainer.classList.add('hidden');
    }
  };

  /**
   * Handles form submission to create a new podcast
   * 
   * @param e - The form submission event
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validate form
    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      await PodcastRepository.getInstance().addPodcast(newPodcast);
      
      // Reset form after successful submission
      resetForm();
      
      toast({
        title: "Podcast ajouté",
        description: "Votre podcast a été soumis et est en attente de validation."
      });
    } catch (error) {
      const errorMessage = formatErrorMessage(error);
      setError(errorMessage);
      
      toast({
        variant: "destructive",
        title: "Erreur",
        description: errorMessage
      });
      
      console.error("Form submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    newPodcast,
    audioFileName,
    imageFileName,
    isLoading,
    error,
    handleChange,
    handleSelectChange,
    handleAudioFileChange,
    handleImageFileChange,
    handleSubmit,
    resetForm
  };
};
