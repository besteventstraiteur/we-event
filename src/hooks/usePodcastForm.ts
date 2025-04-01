
import { useState } from "react";
import { NewPodcast } from "@/models/podcast";
import { useToast } from "@/hooks/use-toast";
import { PodcastRepository } from "@/services/PodcastRepository";

export const usePodcastForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [newPodcast, setNewPodcast] = useState<NewPodcast>({
    title: "",
    description: "",
    category: "",
    audioFile: null,
    imageFile: null
  });
  const [audioFileName, setAudioFileName] = useState("");
  const [imageFileName, setImageFileName] = useState("");

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

    try {
      await PodcastRepository.getInstance().addPodcast(newPodcast);
      
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
