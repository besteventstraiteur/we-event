
import React from "react";
import { Button } from "@/components/ui/button";
import { Facebook, Apple } from "lucide-react";
import { handleSocialLogin } from "@/utils/authUtils";
import { useToast } from "@/components/ui/use-toast";

interface SocialLoginButtonsProps {
  onLoginSuccess: (email: string) => void;
}

const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({ onLoginSuccess }) => {
  const [socialLoading, setSocialLoading] = React.useState<string | null>(null);
  const { toast } = useToast();

  const handleSocialLoginClick = async (provider: 'google' | 'facebook' | 'apple') => {
    setSocialLoading(provider);
    try {
      const result = await handleSocialLogin(provider);
      if (result.success) {
        toast({
          title: "Connexion réussie",
          description: `Connecté avec ${provider}`,
        });
        onLoginSuccess(result.userData?.email || '');
      } else {
        throw new Error(result.error || "Erreur de connexion");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: error instanceof Error ? error.message : "Une erreur est survenue",
      });
    } finally {
      setSocialLoading(null);
    }
  };

  return (
    <div className="flex flex-col space-y-4 mb-6">
      <Button 
        className="w-full flex items-center justify-center gap-2 bg-white text-black border border-gray-300 hover:bg-gray-50"
        onClick={() => handleSocialLoginClick('google')}
        disabled={!!socialLoading}
      >
        {socialLoading === 'google' ? (
          <div className="h-5 w-5 border-t-2 border-b-2 border-black rounded-full animate-spin"></div>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="#EA4335" d="M12 5.9c1.8 0 3.4.7 4.6 1.9L21.1 4C18.9 1.6 15.7 0 12 0 7.3 0 3.2 2.7 1.2 6.6l5.1 4C7.3 7.6 9.5 5.9 12 5.9z"></path>
            <path fill="#4285F4" d="M23.5 12.3c0-1-.1-1.9-.3-2.8h-11v5.3h6.3c-.3 1.6-1.2 3-2.5 3.9l4.9 3.8c2.9-2.7 4.6-6.7 4.6-11.2z"></path>
            <path fill="#FBBC05" d="M6.3 14.5l-5.1 4C3.4 21.4 7.5 24 12 24c3.2 0 5.9-1.1 7.9-2.9l-4.9-3.8c-1.3.9-3.1 1.4-5 1.4-3.8 0-7-2.6-8.1-6.1z"></path>
            <path fill="#34A853" d="M12 24c4.5 0 8.2-1.5 11-4.3l-5.5-4.3c-1.5 1-3.4 1.6-5.5 1.6-4.2 0-7.8-2.8-9.1-6.6L-1.6 15C1.5 20.7 6.4 24 12 24z"></path>
            <path fill="none" d="M-1.6 15L6.3 10.6"></path>
          </svg>
        )} 
        Continuer avec Google
      </Button>

      <Button 
        className="w-full flex items-center justify-center gap-2 bg-[#1877F2] text-white hover:bg-[#166FE5]"
        onClick={() => handleSocialLoginClick('facebook')}
        disabled={!!socialLoading}
      >
        {socialLoading === 'facebook' ? (
          <div className="h-5 w-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
        ) : (
          <Facebook className="h-5 w-5" />
        )}
        Continuer avec Facebook
      </Button>

      <Button 
        className="w-full flex items-center justify-center gap-2 bg-black text-white hover:bg-gray-800"
        onClick={() => handleSocialLoginClick('apple')}
        disabled={!!socialLoading}
      >
        {socialLoading === 'apple' ? (
          <div className="h-5 w-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
        ) : (
          <Apple className="h-5 w-5" />
        )}
        Continuer avec Apple
      </Button>
    </div>
  );
};

export default SocialLoginButtons;
