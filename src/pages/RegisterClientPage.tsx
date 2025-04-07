
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "@/components/AuthLayout";
import GoldButton from "@/components/GoldButton";
import InputField from "@/components/InputField";
import { useToast } from "@/components/ui/use-toast";

const RegisterClientPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Vérifier que les mots de passe correspondent
    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
      });
      setIsLoading(false);
      return;
    }

    try {
      // Simuler la création de compte
      setTimeout(() => {
        toast({
          title: "Inscription réussie!",
          description: "Bienvenue sur We Event!",
        });
        navigate("/client/dashboard");
      }, 1500);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur d'inscription",
        description: "Une erreur est survenue lors de l'inscription. Veuillez réessayer.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Inscription Client"
      subtitle="Rejoignez notre plateforme et accédez à des services exclusifs"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Prénom"
            id="firstName"
            type="text"
            placeholder="Prénom"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <InputField
            label="Nom"
            id="lastName"
            type="text"
            placeholder="Nom"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <InputField
          label="Email"
          id="email"
          type="email"
          placeholder="votre@email.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <InputField
          label="Téléphone"
          id="phone"
          type="tel"
          placeholder="06 12 34 56 78"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <InputField
          label="Mot de passe"
          id="password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <InputField
          label="Confirmer le mot de passe"
          id="confirmPassword"
          type="password"
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <GoldButton type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Inscription en cours..." : "S'inscrire"}
        </GoldButton>

        <div className="text-center text-sm text-we-gray-400">
          Déjà inscrit?{" "}
          <Link to="/login" className="text-we-gold hover:underline">
            Se connecter
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default RegisterClientPage;
