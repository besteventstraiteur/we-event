
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { RecommendationFormValues } from "./types";

export const useRecommendationSubmit = (form: UseFormReturn<RecommendationFormValues>) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (values: RecommendationFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simuler l'envoi des données à l'API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Recommandation envoyée:", values);
      
      toast({
        title: "Recommandation envoyée",
        description: `La recommandation a été envoyée à ${values.partners.length} prestataire(s)`,
      });
      
      // Réinitialiser le formulaire
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Un problème est survenu lors de l'envoi de la recommandation",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    handleSubmit,
  };
};
