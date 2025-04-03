
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "@/components/AuthLayout";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import SocialLoginButtons from "@/components/auth/SocialLoginButtons";
import LoginForm from "@/components/auth/LoginForm";
import PasswordResetForm from "@/components/auth/PasswordResetForm";
import TwoFactorVerification from "@/components/auth/TwoFactorVerification";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLoginSubmit = async (email: string, password: string, rememberMe: boolean) => {
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
          redirectAfterLogin(email);
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

  const handleResetPassword = async (email: string) => {
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

  const redirectAfterLogin = (userEmail: string = '') => {
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
          <SocialLoginButtons onLoginSuccess={redirectAfterLogin} />

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-2 text-sm text-gray-500">ou</span>
            </div>
          </div>

          <LoginForm 
            onSubmit={handleLoginSubmit} 
            onForgotPassword={() => setForgotPassword(true)} 
            isLoading={isLoading} 
          />
        </>
      ) : (
        <PasswordResetForm 
          onSubmit={handleResetPassword}
          onCancel={() => setForgotPassword(false)}
          isLoading={isLoading}
          resetSent={resetSent}
        />
      )}
    </AuthLayout>
  );
};

export default LoginPage;
