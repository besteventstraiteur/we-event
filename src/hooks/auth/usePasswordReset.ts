
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const usePasswordReset = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const { toast } = useToast();

  const handleResetPassword = async (email: string) => {
    setIsLoading(true);
    try {
      console.log("Password reset requested for:", email);
      
      setTimeout(() => {
        setResetSent(true);
        toast({
          title: "Email envoyé",
          description: "Instructions de récupération envoyées à votre adresse email",
        });
      }, 1000);
    } catch (error) {
      console.error("Password reset error:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'envoyer l'email de récupération. Veuillez réessayer.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    resetSent,
    handleResetPassword
  };
};
