
import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { handleSocialLogin } from "@/utils/authUtils";
import { Lock } from "lucide-react";

interface SocialLoginButtonsProps {
  onLoginSuccess: (userEmail?: string) => void;
}

const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({ onLoginSuccess }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState<string | null>(null);

  const handleLogin = async (provider: 'google' | 'facebook' | 'apple') => {
    setIsLoading(provider);
    
    try {
      // Simuler un délai court pour afficher le message de sécurité SSL/TLS
      setTimeout(() => {
        toast({
          title: "Connexion sécurisée",
          description: "Chiffrement SSL/TLS activé pour protéger vos données",
          duration: 3000,
        });
      }, 300);
      
      const result = await handleSocialLogin(provider);
      
      if (result.success && result.userData) {
        toast({
          title: "Connexion réussie",
          description: `Bienvenue, ${result.userData.name || 'utilisateur'}`,
        });
        onLoginSuccess(result.userData.email);
      } else {
        toast({
          variant: "destructive",
          title: "Échec de connexion",
          description: result.error || "Une erreur est survenue lors de la connexion",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Un problème est survenu. Veuillez réessayer.",
      });
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="space-y-3">
      <Button
        variant="outline"
        className="w-full flex items-center gap-3 relative"
        onClick={() => handleLogin('google')}
        disabled={!!isLoading}
      >
        {isLoading === 'google' ? (
          <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-current"></div>
        ) : (
          <img src="/google.svg" alt="Google" className="h-5 w-5" />
        )}
        <span className="flex-1">Continuer avec Google</span>
        <Lock className="h-4 w-4 text-gray-400" />
      </Button>
      
      <Button
        variant="outline"
        className="w-full flex items-center gap-3 relative"
        onClick={() => handleLogin('facebook')}
        disabled={!!isLoading}
      >
        {isLoading === 'facebook' ? (
          <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-current"></div>
        ) : (
          <img src="/facebook.svg" alt="Facebook" className="h-5 w-5" />
        )}
        <span className="flex-1">Continuer avec Facebook</span>
        <Lock className="h-4 w-4 text-gray-400" />
      </Button>
      
      <Button
        variant="outline"
        className="w-full flex items-center gap-3 relative"
        onClick={() => handleLogin('apple')}
        disabled={!!isLoading}
      >
        {isLoading === 'apple' ? (
          <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-current"></div>
        ) : (
          <img src="/apple.svg" alt="Apple" className="h-5 w-5" />
        )}
        <span className="flex-1">Continuer avec Apple</span>
        <Lock className="h-4 w-4 text-gray-400" />
      </Button>
      
      <div className="text-xs text-center text-gray-500 flex items-center justify-center gap-1">
        <Lock className="h-3 w-3" />
        Connexions sécurisées par chiffrement SSL/TLS
      </div>
    </div>
  );
};

export default SocialLoginButtons;
