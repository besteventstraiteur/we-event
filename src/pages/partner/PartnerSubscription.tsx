
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, CreditCard, Lock, Medal, Star, TrendingUp, AlertCircle } from "lucide-react";
import GoldButton from "@/components/GoldButton";
import { useToast } from "@/hooks/use-toast";

const PartnerSubscription = () => {
  const { toast } = useToast();
  const [isChanging, setIsChanging] = useState(false);
  
  // Example subscription data (in a real app, this would come from an API)
  const currentSubscription = {
    tier: "standard",
    name: "Abonnement Standard",
    price: 400,
    expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * 6), // 6 months from now
    autoRenew: true
  };
  
  // Calculate remaining time in percentage
  const totalSubscriptionDays = 365; // Annual subscription
  const daysRemaining = Math.floor((currentSubscription.expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const percentageRemaining = Math.floor((daysRemaining / totalSubscriptionDays) * 100);
  
  const subscriptionTiers = [
    {
      id: "premium",
      name: "Abonnement Premium",
      price: 800,
      priceWithTax: 960,
      features: [
        "Top 5 des résultats de recherche",
        "Mise en avant régulière sur la plateforme",
        "Réception prioritaire des recommandations",
        "Badges exclusifs et Best Awards",
        "Accès aux statistiques avancées",
        "Support prioritaire"
      ],
      limitations: "Limité à 5 prestataires par catégorie et par département",
      current: currentSubscription.tier === "premium"
    },
    {
      id: "standard",
      name: "Abonnement Standard",
      price: 400,
      priceWithTax: 480,
      features: [
        "Résultats entre 6ème et 10ème position",
        "Réception des recommandations",
        "Badges et Best Awards",
        "Statistiques basiques",
        "Support standard"
      ],
      limitations: "Limité à 5 prestataires par catégorie et par département",
      current: currentSubscription.tier === "standard"
    },
    {
      id: "free",
      name: "Abonnement Gratuit",
      price: 0,
      priceWithTax: 0,
      features: [
        "Accès à la plateforme",
        "Apparition après la 11ème position",
        "Création de profil simple"
      ],
      limitations: "Ne peut pas recevoir de recommandations ni avoir de badges",
      current: currentSubscription.tier === "free"
    }
  ];
  
  const handleSubscriptionChange = (tierId: string) => {
    if (tierId === currentSubscription.tier) {
      toast({
        title: "Information",
        description: "Vous possédez déjà cet abonnement.",
      });
      return;
    }
    
    setIsChanging(true);
    
    // Simulate payment process with a setTimeout
    setTimeout(() => {
      toast({
        title: "Abonnement modifié",
        description: `Votre abonnement a été changé avec succès.`,
      });
      setIsChanging(false);
    }, 1500);
  };
  
  return (
    <DashboardLayout type="partner">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Mon Abonnement</h1>
          <p className="text-vip-gray-400">Gérez votre abonnement et découvrez les différentes offres disponibles</p>
        </div>
        
        <Card className="bg-vip-gray-900 border-vip-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Abonnement actuel</span>
              <Badge 
                variant="outline" 
                className={`${
                  currentSubscription.tier === 'premium' 
                    ? 'bg-amber-500/20 text-amber-500 border-amber-500/50' 
                    : currentSubscription.tier === 'standard' 
                    ? 'bg-blue-500/20 text-blue-500 border-blue-500/50' 
                    : 'bg-vip-gray-700/20 text-vip-gray-400 border-vip-gray-700/50'
                }`}
              >
                {currentSubscription.tier === 'premium' 
                  ? 'Premium' 
                  : currentSubscription.tier === 'standard' 
                  ? 'Standard' 
                  : 'Gratuit'}
              </Badge>
            </CardTitle>
            <CardDescription>
              Détails et statut de votre abonnement
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between bg-vip-gray-800 p-4 rounded-md">
              <div className="space-y-2">
                <div className="text-vip-white text-lg font-medium">{currentSubscription.name}</div>
                <div className="text-vip-gray-400">
                  Expire le {currentSubscription.expiryDate.toLocaleDateString()}
                </div>
              </div>
              
              <div className="mt-4 lg:mt-0 w-full lg:w-1/3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-vip-gray-400">Temps restant</span>
                  <span className="text-vip-white">{daysRemaining} jours</span>
                </div>
                <Progress value={percentageRemaining} className="h-2 bg-vip-gray-700" />
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-vip-gray-800 rounded-md">
              <div className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2 text-vip-gray-400" />
                <span className="text-vip-white">Renouvellement automatique</span>
              </div>
              <Badge variant={currentSubscription.autoRenew ? "default" : "outline"} className={`${currentSubscription.autoRenew ? 'bg-green-500' : 'border-vip-gray-700 text-vip-gray-400'}`}>
                {currentSubscription.autoRenew ? 'Activé' : 'Désactivé'}
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        <h2 className="text-xl font-semibold mt-8">Nos Offres d'Abonnement</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subscriptionTiers.map((tier) => (
            <Card 
              key={tier.id}
              className={`bg-vip-gray-900 border-vip-gray-800 ${tier.current ? 'ring-2 ring-vip-gold' : ''}`}
            >
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{tier.name}</CardTitle>
                  {tier.current && (
                    <Badge className="bg-vip-gold text-vip-black">Actuel</Badge>
                  )}
                </div>
                <CardDescription>
                  {tier.price > 0 ? (
                    <>
                      <span className="text-xl font-bold text-vip-white">{tier.price}€</span>
                      <span className="text-vip-gray-400"> HT/an</span>
                      <div className="text-xs text-vip-gray-400">({tier.priceWithTax}€ TTC avec TVA de 20%)</div>
                    </>
                  ) : (
                    <span className="text-xl font-bold text-vip-white">Gratuit</span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {tier.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                      <span className="text-sm text-vip-gray-200">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="pt-2 space-y-1">
                  <div className="flex items-center text-amber-500">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    <span className="text-xs">{tier.limitations}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                {tier.current ? (
                  <GoldButton disabled className="w-full opacity-50">
                    Abonnement actuel
                  </GoldButton>
                ) : (
                  <GoldButton
                    className="w-full"
                    onClick={() => handleSubscriptionChange(tier.id)}
                    disabled={isChanging}
                  >
                    {isChanging ? 'Traitement en cours...' : (tier.price > 0 ? 'Souscrire' : 'Activer')}
                  </GoldButton>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <Card className="bg-vip-gray-900 border-vip-gray-800 mt-6">
          <CardHeader>
            <CardTitle>Avantages des abonnements premium</CardTitle>
            <CardDescription>
              Comparez les avantages entre les différents niveaux d'abonnement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-vip-gray-800">
                    <th className="text-left py-3 px-4 text-vip-gray-400 font-medium">Fonctionnalité</th>
                    <th className="text-center py-3 px-4 text-amber-500 font-medium">Premium</th>
                    <th className="text-center py-3 px-4 text-blue-500 font-medium">Standard</th>
                    <th className="text-center py-3 px-4 text-vip-gray-400 font-medium">Gratuit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-vip-gray-800">
                    <td className="py-3 px-4 text-vip-white">Position dans les résultats de recherche</td>
                    <td className="text-center py-3 px-4 text-vip-white">Top 5</td>
                    <td className="text-center py-3 px-4 text-vip-white">6-10</td>
                    <td className="text-center py-3 px-4 text-vip-gray-400">11+</td>
                  </tr>
                  <tr className="border-b border-vip-gray-800">
                    <td className="py-3 px-4 text-vip-white">Recommandations des partenaires</td>
                    <td className="text-center py-3 px-4"><CheckCircle className="inline h-5 w-5 text-green-500" /></td>
                    <td className="text-center py-3 px-4"><CheckCircle className="inline h-5 w-5 text-green-500" /></td>
                    <td className="text-center py-3 px-4"><XCircle className="inline h-5 w-5 text-red-500" /></td>
                  </tr>
                  <tr className="border-b border-vip-gray-800">
                    <td className="py-3 px-4 text-vip-white">Badges et Best Awards</td>
                    <td className="text-center py-3 px-4"><CheckCircle className="inline h-5 w-5 text-green-500" /></td>
                    <td className="text-center py-3 px-4"><CheckCircle className="inline h-5 w-5 text-green-500" /></td>
                    <td className="text-center py-3 px-4"><XCircle className="inline h-5 w-5 text-red-500" /></td>
                  </tr>
                  <tr className="border-b border-vip-gray-800">
                    <td className="py-3 px-4 text-vip-white">Mise en avant régulière</td>
                    <td className="text-center py-3 px-4"><CheckCircle className="inline h-5 w-5 text-green-500" /></td>
                    <td className="text-center py-3 px-4"><XCircle className="inline h-5 w-5 text-red-500" /></td>
                    <td className="text-center py-3 px-4"><XCircle className="inline h-5 w-5 text-red-500" /></td>
                  </tr>
                  <tr className="border-b border-vip-gray-800">
                    <td className="py-3 px-4 text-vip-white">Statistiques avancées</td>
                    <td className="text-center py-3 px-4"><CheckCircle className="inline h-5 w-5 text-green-500" /></td>
                    <td className="text-center py-3 px-4"><XCircle className="inline h-5 w-5 text-red-500" /></td>
                    <td className="text-center py-3 px-4"><XCircle className="inline h-5 w-5 text-red-500" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PartnerSubscription;
