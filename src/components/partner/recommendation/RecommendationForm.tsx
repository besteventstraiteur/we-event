
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { formSchema, RecommendationFormValues } from "./types";
import RecommendationClientForm from "./RecommendationClientForm";
import PartnersSelector from "./PartnersSelector";

const RecommendationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<RecommendationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientName: "",
      clientEmail: "",
      clientPhone: "",
      budget: "",
      details: "",
      partners: [],
    },
  });

  const onSubmit = async (values: RecommendationFormValues) => {
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <RecommendationClientForm form={form} />
        <PartnersSelector form={form} />
        
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Envoi en cours...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Envoyer la recommandation
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default RecommendationForm;
