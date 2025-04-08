import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { handleSocialLogin } from "@/utils/authUtils";
import { Lock, Facebook, Mail, Apple } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SocialLoginButtonsProps {
  onLoginSuccess: (userEmail?: string) => void;
}

const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({ onLoginSuccess }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState<string | null>(null);
  const navigate = useNavigate();

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
          <GoogleIcon className="h-5 w-5" />
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
          <Facebook className="h-5 w-5 text-blue-600" />
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
          <Apple className="h-5 w-5" />
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

const GoogleIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    className={className} 
    fill="none"
  >
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

export default SocialLoginButtons;
