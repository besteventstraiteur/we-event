
import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserRound, BarChart, MessageSquare, Calendar, CreditCard } from "lucide-react";
import GoldButton from "@/components/GoldButton";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { SubscriptionTier } from "@/models/subscription";

const PartnerDashboard = () => {
  const navigate = useNavigate();
  // Date d'expiration fictive (dans 8 mois)
  const expiryDate = new Date();
  expiryDate.setMonth(expiryDate.getMonth() + 8);
  
  // Calcul du pourcentage restant avant expiration
  const totalDays = 365; // Abonnement annuel
  const daysRemaining = Math.floor((expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const percentageRemaining = Math.floor((daysRemaining / totalDays) * 100);

  // Example subscription tier using the enum
  const subscriptionTier = SubscriptionTier.STANDARD;
  
  const handleSubscriptionClick = () => {
    navigate("/partner/subscription");
  };

  return (
    <DashboardLayout type="partner">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Tableau de bord Partenaire</h1>
          <p className="text-vip-gray-400">Gérez votre profil, suivez vos demandes et vos statistiques</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-vip-gray-900 border-vip-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-vip-gold flex items-center gap-2">
                <BarChart size={18} /> Vues
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-vip-white">143</p>
              <p className="text-sm text-vip-gray-400">Vues de votre profil ce mois</p>
            </CardContent>
          </Card>
          
          <Card className="bg-vip-gray-900 border-vip-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-vip-gold flex items-center gap-2">
                <MessageSquare size={18} /> Demandes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-vip-white">12</p>
              <p className="text-sm text-vip-gray-400">Demandes clients reçues</p>
            </CardContent>
          </Card>
          
          <Card className="bg-vip-gray-900 border-vip-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-vip-gold flex items-center gap-2">
                <UserRound size={18} /> Conversion
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-vip-white">32%</p>
              <p className="text-sm text-vip-gray-400">Taux de conversion</p>
            </CardContent>
          </Card>
          
          <Card className="bg-vip-gray-900 border-vip-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-vip-gold flex items-center gap-2">
                <CreditCard size={18} /> Abonnement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-1">
                <p className="text-vip-white">
                  <Badge 
                    variant="outline" 
                    className={`${
                      subscriptionTier === SubscriptionTier.PREMIUM 
                        ? 'bg-amber-500/20 text-amber-500 border-amber-500/50' 
                        : subscriptionTier === SubscriptionTier.STANDARD 
                        ? 'bg-blue-500/20 text-blue-500 border-blue-500/50' 
                        : 'bg-vip-gray-700/20 text-vip-gray-400 border-vip-gray-700/50'
                    }`}
                  >
                    {subscriptionTier === SubscriptionTier.PREMIUM 
                      ? 'Premium' 
                      : subscriptionTier === SubscriptionTier.STANDARD 
                      ? 'Standard' 
                      : 'Gratuit'}
                  </Badge>
                </p>
                <p className="text-xs text-vip-gray-400 cursor-pointer hover:text-vip-gold" onClick={handleSubscriptionClick}>
                  Gérer
                </p>
              </div>
              <div className="space-y-1">
                <Progress value={percentageRemaining} className="h-2 bg-vip-gray-700" />
                <p className="text-xs text-vip-gray-400">
                  Expire dans {daysRemaining} jours
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-vip-gray-900 border-vip-gray-800 lg:col-span-2">
            <CardHeader>
              <CardTitle>Dernières demandes</CardTitle>
              <CardDescription>Demandes clients récentes nécessitant votre attention</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Sophie Dupont", date: "18/06/2023", status: "new" },
                { name: "Thomas Martin", date: "15/06/2023", status: "viewed" },
                { name: "Emma Bernard", date: "10/06/2023", status: "replied" },
              ].map((request, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-md hover:bg-vip-gray-800 transition-colors">
                  <div className="w-10 h-10 bg-vip-gray-800 rounded-full flex items-center justify-center text-vip-white border border-vip-gray-700">
                    {request.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-vip-white">{request.name}</h4>
                      {request.status === "new" && (
                        <span className="px-2 py-0.5 rounded-full bg-vip-gold/20 text-vip-gold text-xs">
                          Nouveau
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-vip-gray-400">Reçue le {request.date}</p>
                  </div>
                  <GoldButton variant={request.status === "replied" ? "outline" : "default"} size="sm">
                    {request.status === "replied" ? "Déjà répondu" : "Répondre"}
                  </GoldButton>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-vip-gray-900 border-vip-gray-800">
            <CardHeader>
              <CardTitle>Informations profil</CardTitle>
              <CardDescription>Gérez votre profil et vos informations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center mb-4">
                <div className="w-24 h-24 bg-vip-gray-800 rounded-full flex items-center justify-center text-vip-gold text-3xl font-bold border-2 border-vip-gold">
                  B
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-vip-white text-center">Best Events Traiteur</h3>
                <p className="text-sm text-vip-gray-400 text-center">Traiteur • Réduction: 25%</p>
              </div>
              
              <div className="pt-4 border-t border-vip-gray-800 space-y-3">
                <div>
                  <p className="text-xs text-vip-gray-500">Adresse</p>
                  <p className="text-sm text-vip-white">123 Avenue des Champs-Élysées, 75008 Paris</p>
                </div>
                <div>
                  <p className="text-xs text-vip-gray-500">Contact</p>
                  <p className="text-sm text-vip-white">contact@best-events.com</p>
                </div>
                <div>
                  <p className="text-xs text-vip-gray-500">Téléphone</p>
                  <p className="text-sm text-vip-white">01 23 45 67 89</p>
                </div>
              </div>
              
              <GoldButton className="w-full mt-4">
                Modifier mon profil
              </GoldButton>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PartnerDashboard;
