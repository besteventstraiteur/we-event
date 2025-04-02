
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "@/components/AuthLayout";
import GoldButton from "@/components/GoldButton";
import InputField from "@/components/InputField";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import TwoFactorVerification from "@/components/auth/TwoFactorVerification";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Apple, Facebook, Mail } from "lucide-react";
import { handleSocialLogin } from "@/utils/authUtils";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Load saved credentials if available
  useEffect(() => {
    const savedEmail = localStorage.getItem("weddingPlannerEmail");
    const savedRememberMe = localStorage.getItem("weddingPlannerRememberMe") === "true";
    
    if (savedEmail && savedRememberMe) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Save or remove credentials based on remember me
      if (rememberMe) {
        localStorage.setItem("weddingPlannerEmail", email);
        localStorage.setItem("weddingPlannerRememberMe", "true");
      } else {
        localStorage.removeItem("weddingPlannerEmail");
        localStorage.removeItem("weddingPlannerRememberMe");
      }

      // Simuler la vérification des identifiants
      setTimeout(() => {
        // Pour les besoins de la démo, supposons que les comptes avec "secure" 
        // dans l'email ont le 2FA activé
        const requires2FA = email.includes("secure");
        
        if (requires2FA) {
          setShowTwoFactor(true);
          setIsLoading(false);
          toast({
            title: "Vérification supplémentaire requise",
            description: "Veuillez entrer le code de sécurité envoyé à votre appareil.",
          });
        } else {
          // Redirection normale
          redirectAfterLogin();
        }
      }, 1000);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: "Identifiants incorrects. Veuillez réessayer.",
      });
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulation d'envoi d'email de réinitialisation
      setTimeout(() => {
        setResetSent(true);
        toast({
          title: "Email envoyé",
          description: "Instructions de récupération envoyées à votre adresse email",
        });
      }, 1000);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'envoyer l'email de récupération. Veuillez réessayer.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLoginClick = async (provider: 'google' | 'facebook' | 'apple') => {
    setSocialLoading(provider);
    try {
      const result = await handleSocialLogin(provider);
      if (result.success) {
        toast({
          title: "Connexion réussie",
          description: `Connecté avec ${provider}`,
        });
        redirectAfterLogin(result.userData?.email || '');
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

  const handleVerifyOTP = async (code: string): Promise<boolean> => {
    // Pour la démonstration, considérons que 123456 est le code valide
    const isValid = code === "123456";
    
    if (isValid) {
      setTimeout(() => {
        redirectAfterLogin();
      }, 500);
    }
    
    return isValid;
  };

  const redirectAfterLogin = (userEmail: string = email) => {
    // Déterminer où rediriger l'utilisateur (client, partenaire ou admin)
    const isClient = userEmail.includes("client");
    const isPartner = userEmail.includes("partner");
    const isAdmin = userEmail.includes("admin");

    if (isClient) {
      navigate("/client/dashboard");
    } else if (isPartner) {
      navigate("/partner/dashboard");
    } else if (isAdmin) {
      navigate("/admin/dashboard");
    } else {
      // Par défaut, rediriger vers le dashboard client
      navigate("/client/dashboard");
    }

    toast({
      title: "Connexion réussie",
      description: "Bienvenue sur votre espace VIP",
    });
  };

  // Si l'écran de 2FA est affiché
  if (showTwoFactor) {
    return (
      <AuthLayout 
        title="Vérification en deux étapes" 
        subtitle="Un code de vérification a été envoyé à votre appareil"
      >
        <TwoFactorVerification 
          onVerify={handleVerifyOTP}
          onCancel={() => setShowTwoFactor(false)}
          onResend={async () => {
            toast({
              title: "Code renvoyé",
              description: "Un nouveau code a été envoyé à votre appareil.",
            });
          }}
        />
        <div className="text-center text-sm text-gray-500 mt-4">
          <p>Pour les besoins de la démo, le code valide est: 123456</p>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout 
      title={forgotPassword ? "Récupération de mot de passe" : "Connexion"} 
      subtitle={forgotPassword ? "Nous vous enverrons un lien de récupération" : "Accédez à votre espace VIP"}
    >
      {!forgotPassword ? (
        <>
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

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-2 text-sm text-gray-500">ou</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label="Email"
              id="email"
              type="email"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <InputField
              label="Mot de passe"
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="remember-me" 
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked === true)}
              />
              <label 
                htmlFor="remember-me" 
                className="text-sm text-gray-600 cursor-pointer"
              >
                Se souvenir de moi
              </label>
              <div className="flex-1 text-right">
                <button 
                  type="button" 
                  onClick={() => setForgotPassword(true)}
                  className="text-sm text-vip-gold hover:underline"
                >
                  Mot de passe oublié?
                </button>
              </div>
            </div>
            
            <GoldButton type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Connexion en cours..." : "Se connecter"}
            </GoldButton>
            
            <div className="text-center text-sm text-vip-gray-400">
              Pas encore de compte?{" "}
              <Link to="/register-client" className="text-vip-gold hover:underline">
                Inscription Client
              </Link>{" "}
              ou{" "}
              <Link to="/register-partner" className="text-vip-gold hover:underline">
                Inscription Partenaire
              </Link>
            </div>
          </form>
        </>
      ) : (
        <div className="space-y-4">
          {!resetSent ? (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <InputField
                label="Email"
                id="reset-email"
                type="email"
                placeholder="votre@email.com"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
              />
              <GoldButton type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Envoi en cours..." : "Envoyer le lien de récupération"}
              </GoldButton>
              <button 
                type="button" 
                onClick={() => setForgotPassword(false)}
                className="block w-full text-center text-sm text-vip-gold hover:underline mt-2"
              >
                Retour à la connexion
              </button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <p className="text-vip-gray-400">
                Si un compte existe avec cette adresse email, vous recevrez un lien de récupération de mot de passe.
              </p>
              <GoldButton 
                onClick={() => setForgotPassword(false)} 
                className="mx-auto"
              >
                Retour à la connexion
              </GoldButton>
            </div>
          )}
        </div>
      )}
    </AuthLayout>
  );
};

export default LoginPage;
