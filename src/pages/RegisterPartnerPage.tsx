
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "@/components/AuthLayout";
import GoldButton from "@/components/GoldButton";
import InputField from "@/components/InputField";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const RegisterPartnerPage = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    siret: "",
    address: "",
    email: "",
    phone: "",
    description: "",
    category: "",
    password: "",
    confirmPassword: "",
  });
  const [logo, setLogo] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogo(e.target.files[0]);
    }
  };

  const handleNextStep = () => {
    if (step === 1) {
      // Valider le formulaire de la première étape
      if (!formData.companyName || !formData.siret || !formData.address || !formData.email || !formData.phone) {
        toast({
          variant: "destructive",
          title: "Champs manquants",
          description: "Veuillez remplir tous les champs obligatoires.",
        });
        return;
      }
      setStep(2);
    }
  };

  const handlePrevStep = () => {
    if (step === 2) {
      setStep(1);
    }
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
      // Simuler le processus de paiement et création de compte
      setTimeout(() => {
        toast({
          title: "Inscription réussie!",
          description: "Votre compte prestataire VIP a été créé avec succès.",
        });
        navigate("/partner/dashboard");
      }, 2000);
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

  // Catégories de prestataires
  const categories = [
    { value: "domaine", label: "Domaine" },
    { value: "dj", label: "DJ" },
    { value: "fleuriste", label: "Fleuriste" },
    { value: "photographe", label: "Photographe" },
    { value: "traiteur", label: "Traiteur" },
    { value: "wedding-planner", label: "Wedding Planner" },
    { value: "other", label: "Autre" },
  ];

  return (
    <AuthLayout
      title="Inscription Prestataire VIP"
      subtitle="Rejoignez notre réseau de prestataires premium"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 ? (
          <>
            <InputField
              label="Nom de l'entreprise"
              id="companyName"
              type="text"
              placeholder="Best Events"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
            <InputField
              label="SIRET"
              id="siret"
              type="text"
              placeholder="12345678901234"
              value={formData.siret}
              onChange={handleChange}
              required
            />
            <InputField
              label="Adresse"
              id="address"
              type="text"
              placeholder="123 rue de Paris, 75001 Paris"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <InputField
              label="Email"
              id="email"
              type="email"
              placeholder="contact@votreentreprise.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <InputField
              label="Téléphone"
              id="phone"
              type="tel"
              placeholder="01 23 45 67 89"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <div className="space-y-2">
              <Label htmlFor="category">Catégorie</Label>
              <Select value={formData.category} onValueChange={handleSelectChange} required>
                <SelectTrigger className="bg-vip-gray-800 border-vip-gray-700 text-vip-white">
                  <SelectValue placeholder="Sélectionnez une catégorie" />
                </SelectTrigger>
                <SelectContent className="bg-vip-gray-800 border-vip-gray-700">
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description de votre activité</Label>
              <Textarea
                id="description"
                placeholder="Décrivez votre activité, vos services et votre expérience..."
                className="bg-vip-gray-800 border-vip-gray-700 text-vip-white h-32"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="logo">Logo (format JPG ou PNG)</Label>
              <input
                id="logo"
                type="file"
                accept="image/jpeg, image/png"
                onChange={handleFileChange}
                className="w-full text-vip-white py-2 px-3 rounded-md bg-vip-gray-800 border border-vip-gray-700 focus:outline-none focus:ring-2 focus:ring-vip-gold/20 focus:border-vip-gold file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-vip-gold file:text-vip-black hover:file:bg-vip-gold/90"
              />
            </div>
            <GoldButton
              type="button"
              className="w-full"
              onClick={handleNextStep}
            >
              Continuer
            </GoldButton>
          </>
        ) : (
          <>
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

            <div className="p-4 bg-vip-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold text-vip-gold mb-2">Abonnement Partenaire VIP</h3>
              <p className="text-vip-gray-300 mb-4">
                L'abonnement annuel au Club Privé Best Events VIP vous donne accès à :
              </p>
              <ul className="text-vip-gray-300 space-y-2 mb-4">
                <li className="flex items-start">
                  <span className="text-vip-gold mr-2">✓</span> 
                  Visibilité auprès d'une clientèle VIP qualifiée
                </li>
                <li className="flex items-start">
                  <span className="text-vip-gold mr-2">✓</span> 
                  Publication de vos podcasts et contenus conseils
                </li>
                <li className="flex items-start">
                  <span className="text-vip-gold mr-2">✓</span> 
                  Mise en relation directe avec les clients Best Events
                </li>
                <li className="flex items-start">
                  <span className="text-vip-gold mr-2">✓</span> 
                  Statistiques et suivi de performance
                </li>
              </ul>
              <div className="flex justify-between items-center mb-2">
                <span className="text-vip-white">Abonnement annuel</span>
                <span className="text-vip-gold font-bold">299€ HT</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-vip-white">TVA (20%)</span>
                <span className="text-vip-gold">59,80€</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-vip-gray-700 my-2">
                <span className="text-vip-white font-bold">Total TTC</span>
                <span className="text-vip-gold font-bold">358,80€</span>
              </div>
              <p className="text-vip-gray-400 text-sm mt-4">
                En validant votre inscription, vous acceptez les conditions générales 
                d'utilisation et autorisez le prélèvement annuel de votre abonnement.
              </p>
            </div>

            <div className="flex gap-4">
              <GoldButton
                type="button"
                variant="outline"
                className="w-1/2"
                onClick={handlePrevStep}
              >
                Retour
              </GoldButton>
              <GoldButton
                type="submit"
                className="w-1/2"
                disabled={isLoading}
              >
                {isLoading ? "Traitement..." : "Finaliser l'inscription"}
              </GoldButton>
            </div>
          </>
        )}

        <div className="text-center text-sm text-vip-gray-400">
          Déjà inscrit?{" "}
          <Link to="/login" className="text-vip-gold hover:underline">
            Se connecter
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default RegisterPartnerPage;
