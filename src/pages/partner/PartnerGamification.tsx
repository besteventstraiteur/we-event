
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BadgesCollection from "@/components/partner/gamification/BadgesCollection";
import GamificationStats from "@/components/partner/gamification/GamificationStats";
import LoyaltyTierCard from "@/components/partner/gamification/LoyaltyTierCard";
import PointsHistory from "@/components/partner/gamification/PointsHistory";
import { PartnerBadge, PointsTransaction } from "@/models/partnerGamification";

// Mock data
const mockBadges: PartnerBadge[] = [
  {
    id: "badge-1",
    type: "speed",
    name: "Réponse Éclair",
    description: "Répond aux clients en moins de 2 heures",
    iconName: "Zap",
    dateAwarded: "2024-03-15",
    points: 100
  },
  {
    id: "badge-2",
    type: "quality",
    name: "Service 5 Étoiles",
    description: "A reçu plus de 10 avis 5 étoiles",
    iconName: "Star",
    dateAwarded: "2024-02-10",
    points: 200
  },
  {
    id: "badge-3",
    type: "recommended",
    name: "Super Networker",
    description: "A fait plus de 20 recommandations acceptées",
    iconName: "Users",
    dateAwarded: "2024-01-05",
    points: 150
  }
];

const mockTransactions: PointsTransaction[] = [
  {
    id: "tx-1",
    date: "2024-04-05",
    points: 100,
    reason: "Réponse rapide à une demande",
    type: "earned"
  },
  {
    id: "tx-2",
    date: "2024-03-20",
    points: 200,
    reason: "Événement complété avec succès",
    type: "earned"
  },
  {
    id: "tx-3",
    date: "2024-02-15",
    points: 50,
    reason: "Avis 5 étoiles reçu",
    type: "earned"
  }
];

const mockStats = {
  responseRate: 95,
  averageResponseTime: 1.5,
  clientSatisfaction: 4.8,
  completedEvents: 12,
  recommendationsGiven: 8,
  recommendationsReceived: 3,
  averageRating: 4.9,
  totalRatings: 15
};

const PartnerGamification = () => {
  return (
    <DashboardLayout type="partner">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Programme de fidélité</h1>
          <p className="text-gray-500">
            Gagnez des points, débloquez des badges et atteignez de nouveaux paliers
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
            <div className="text-center">
              <p className="text-amber-800 font-medium">Vos points actuels</p>
              <p className="text-3xl font-bold text-amber-900">750</p>
              <p className="text-sm text-amber-700">Niveau: Partenaire Argent</p>
            </div>
          </Card>
          
          <Card className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
            <div className="text-center">
              <p className="text-amber-800 font-medium">Prochain palier</p>
              <p className="text-3xl font-bold text-amber-900">1000</p>
              <p className="text-sm text-amber-700">Niveau: Partenaire Or</p>
            </div>
          </Card>
          
          <Card className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
            <div className="text-center">
              <p className="text-amber-800 font-medium">Badges débloqués</p>
              <p className="text-3xl font-bold text-amber-900">5 / 15</p>
              <p className="text-sm text-amber-700">Continuez pour en débloquer plus</p>
            </div>
          </Card>
        </div>
        
        <Tabs defaultValue="badges" className="w-full">
          <TabsList>
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="tiers">Niveaux de fidélité</TabsTrigger>
            <TabsTrigger value="points">Historique des points</TabsTrigger>
            <TabsTrigger value="stats">Statistiques</TabsTrigger>
          </TabsList>
          
          <TabsContent value="badges" className="mt-6">
            <BadgesCollection badges={mockBadges} />
          </TabsContent>
          
          <TabsContent value="tiers" className="mt-6">
            <div className="space-y-4">
              <LoyaltyTierCard 
                tier="bronze" 
                pointsRequired={0} 
                currentPoints={750} 
                benefits={[
                  "Apparition sur la plateforme",
                  "Création d'un profil simple",
                  "Accès aux demandes clients"
                ]}
                current={false}
              />
              <LoyaltyTierCard 
                tier="silver" 
                pointsRequired={500} 
                currentPoints={750} 
                benefits={[
                  "Tous les avantages Bronze",
                  "Badges de niveau Argent",
                  "Recommandations clients prioritaires"
                ]}
                current={true}
              />
              <LoyaltyTierCard 
                tier="gold" 
                pointsRequired={1000} 
                currentPoints={750} 
                benefits={[
                  "Tous les avantages Argent",
                  "Badges exclusifs Or",
                  "Mise en avant dans les résultats de recherche"
                ]}
                current={false}
              />
              <LoyaltyTierCard 
                tier="platinum" 
                pointsRequired={2000} 
                currentPoints={750} 
                benefits={[
                  "Tous les avantages Or",
                  "Badge Platine exclusif",
                  "Apparition en tête des résultats de recherche",
                  "Invitation aux événements VIP"
                ]}
                current={false}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="points" className="mt-6">
            <PointsHistory transactions={mockTransactions} />
          </TabsContent>
          
          <TabsContent value="stats" className="mt-6">
            <GamificationStats stats={mockStats} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default PartnerGamification;
