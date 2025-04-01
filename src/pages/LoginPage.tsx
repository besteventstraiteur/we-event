
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "@/components/AuthLayout";
import GoldButton from "@/components/GoldButton";
import InputField from "@/components/InputField";
import { useToast } from "@/components/ui/use-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulation de connexion réussie
      setTimeout(() => {
        // Déterminer où rediriger l'utilisateur (client ou partenaire)
        const isClient = email.includes("client");
        const isPartner = email.includes("partner");
        const isAdmin = email.includes("admin");

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
      }, 1000);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: "Identifiants incorrects. Veuillez réessayer.",
      });
    } finally {
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

  return (
    <AuthLayout 
      title={forgotPassword ? "Récupération de mot de passe" : "Connexion"} 
      subtitle={forgotPassword ? "Nous vous enverrons un lien de récupération" : "Accédez à votre espace VIP"}
    >
      {!forgotPassword ? (
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
          
          <div className="flex justify-end">
            <button 
              type="button" 
              onClick={() => setForgotPassword(true)}
              className="text-sm text-vip-gold hover:underline"
            >
              Mot de passe oublié?
            </button>
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
