
import { useState } from "react";
import { NewPodcast } from "@/models/podcast";
import { useToast } from "@/hooks/use-toast";
import { PodcastRepository } from "@/services/PodcastRepository";

/**
 * Custom hook for managing podcast form state and submission
 * 
 * @returns Object containing form state, handlers, and submission function
 */
export const usePodcastForm = () => {
  const { toast } = useToast();
  /** Loading state during form submission */
  const [isLoading, setIsLoading] = useState(false);
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
   * Handles changes to text input fields
   * 
   * @param e - The change event from the input element
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setNewPodcast(prev => ({ ...prev, [id]: value }));
  };

  /**
   * Handles changes to the category select dropdown
   * 
   * @param value - The selected category value
   */
  const handleSelectChange = (value: string) => {
    setNewPodcast(prev => ({ ...prev, category: value }));
  };

  /**
   * Handles audio file selection
   * 
   * @param e - The change event from the file input
   */
  const handleAudioFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewPodcast(prev => ({ ...prev, audioFile: file }));
      setAudioFileName(file.name);
    }
  };

  /**
   * Handles image file selection and generates a preview
   * 
   * @param e - The change event from the file input
   */
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
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

    // Validate required fields
    if (!newPodcast.title || !newPodcast.description || !newPodcast.category || !newPodcast.audioFile) {
      toast({
        variant: "destructive",
        title: "Champs manquants",
        description: "Veuillez remplir tous les champs obligatoires."
      });
      setIsLoading(false);
      return;
    }

    try {
      await PodcastRepository.getInstance().addPodcast(newPodcast);
      
      // Reset form after successful submission
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
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de l'ajout du podcast."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    newPodcast,
    audioFileName,
    imageFileName,
    isLoading,
    handleChange,
    handleSelectChange,
    handleAudioFileChange,
    handleImageFileChange,
    handleSubmit
  };
};
