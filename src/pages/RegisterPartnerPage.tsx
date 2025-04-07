
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "@/components/AuthLayout";
import GoldButton from "@/components/GoldButton";
import InputField from "@/components/InputField";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

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
    subscriptionTier: "standard", // Default subscription tier
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

  const handleSubscriptionTierChange = (value: string) => {
    setFormData((prev) => ({ ...prev, subscriptionTier: value }));
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
    { value: "photographer", label: "Photographe" },
    { value: "dj", label: "DJ" },
    { value: "caterer", label: "Traiteur" },
    { value: "venue", label: "Domaine" },
    { value: "decorator", label: "Décorateur" },
    { value: "videographer", label: "Vidéaste" },
    { value: "artist", label: "Artiste" },
    { value: "florist", label: "Fleuriste" },
    { value: "wedding_planner", label: "Wedding Planner" },
    { value: "general", label: "Autre" },
  ];

  // Subscription plans
  const subscriptionPlans = [
    {
      id: "premium",
      name: "Abonnement Premium",
      price: 800,
      vat: 160,
      total: 960,
      features: [
        "Top 5 des résultats de recherche",
        "Mise en avant régulière",
        "Recommandations prioritaires",
        "Badges et Best Awards",
        "Statistiques avancées"
      ],
      limited: true
    },
    {
      id: "standard",
      name: "Abonnement Standard",
      price: 400,
      vat: 80,
      total: 480,
      features: [
        "Résultats entre 6ème et 10ème position",
        "Réception des recommandations",
        "Badges et Best Awards",
        "Statistiques basiques"
      ],
      limited: true
    },
    {
      id: "free",
      name: "Abonnement Gratuit",
      price: 0,
      vat: 0,
      total: 0,
      features: [
        "Accès à la plateforme",
        "Apparition après la 11ème position",
        "Profil de base"
      ],
      limited: false
    }
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
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Choisissez votre abonnement</Label>
              <div className="space-y-4">
                <RadioGroup 
                  value={formData.subscriptionTier} 
                  onValueChange={handleSubscriptionTierChange}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  {subscriptionPlans.map((plan) => (
                    <div key={plan.id} className="relative">
                      <RadioGroupItem 
                        value={plan.id} 
                        id={`plan-${plan.id}`} 
                        className="sr-only"
                      />
                      <Label 
                        htmlFor={`plan-${plan.id}`}
                        className={`block h-full cursor-pointer rounded-lg border p-4 hover:border-vip-gold/50 
                          ${formData.subscriptionTier === plan.id 
                            ? 'border-vip-gold bg-vip-gold/10' 
                            : 'border-vip-gray-700 bg-vip-gray-800'}`}
                      >
                        <div className="flex justify-between">
                          <span className="font-medium text-vip-white">{plan.name}</span>
                          {formData.subscriptionTier === plan.id && (
                            <CheckCircle className="h-5 w-5 text-vip-gold" />
                          )}
                        </div>
                        <p className="mt-1 mb-2">
                          {plan.price > 0 ? (
                            <span className="text-xl font-bold text-vip-white">{plan.price}€ HT/an</span>
                          ) : (
                            <span className="text-xl font-bold text-vip-white">Gratuit</span>
                          )}
                        </p>
                        {plan.price > 0 && (
                          <p className="text-xs text-vip-gray-400 mb-2">
                            TVA (20%): {plan.vat}€ • Total: {plan.total}€ TTC
                          </p>
                        )}
                        <div className="space-y-1">
                          {plan.features.map((feature, index) => (
                            <div key={index} className="flex items-start">
                              <CheckCircle className="h-3 w-3 text-vip-gold mr-2 mt-0.5" />
                              <span className="text-xs text-vip-gray-300">{feature}</span>
                            </div>
                          ))}
                        </div>
                        {plan.limited && (
                          <div className="mt-3 text-xs text-amber-500 italic">
                            Limité à 5 prestataires par catégorie et département
                          </div>
                        )}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>

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

            <Card className="p-4 bg-vip-gray-800 border-none">
              <CardContent className="p-0 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-vip-white">Abonnement</span>
                  <span className="text-vip-white font-bold">
                    {formData.subscriptionTier === "premium" 
                      ? "Premium" 
                      : formData.subscriptionTier === "standard" 
                        ? "Standard" 
                        : "Gratuit"}
                  </span>
                </div>
                
                {formData.subscriptionTier !== "free" && (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-vip-white">Prix HT</span>
                      <span className="text-vip-gold font-bold">
                        {formData.subscriptionTier === "premium" ? "800€" : "400€"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-vip-white">TVA (20%)</span>
                      <span className="text-vip-gold">
                        {formData.subscriptionTier === "premium" ? "160€" : "80€"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-vip-gray-700 my-2">
                      <span className="text-vip-white font-bold">Total TTC</span>
                      <span className="text-vip-gold font-bold">
                        {formData.subscriptionTier === "premium" ? "960€" : "480€"}
                      </span>
                    </div>
                  </>
                )}
                
                <p className="text-vip-gray-400 text-sm mt-4">
                  En validant votre inscription, vous acceptez les conditions générales 
                  d'utilisation et autorisez le prélèvement annuel de votre abonnement.
                </p>
              </CardContent>
            </Card>

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
