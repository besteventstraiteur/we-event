
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoyaltyTierCard from "@/components/partner/gamification/LoyaltyTierCard";
import BadgesCollection from "@/components/partner/gamification/BadgesCollection";
import PointsHistory from "@/components/partner/gamification/PointsHistory";
import GamificationStats from "@/components/partner/gamification/GamificationStats";
import { BADGES, type PartnerGamification } from "@/models/partnerGamification";
import { Award, Trophy, Clock, ChartBar } from "lucide-react";

// Mock data for a partner's gamification profile
const mockPartnerGamification: PartnerGamification = {
  partnerId: "partner-001",
  totalPoints: 2850,
  tier: "silver",
  nextTierPoints: 5000,
  levelProgress: 57, // 57% of progress from silver to gold
  badges: [
    {
      id: "badge-1",
      type: "speed",
      name: BADGES.speed.name,
      description: BADGES.speed.description,
      iconName: BADGES.speed.iconName,
      dateAwarded: "2023-05-15T10:30:00Z",
      points: BADGES.speed.points
    },
    {
      id: "badge-2",
      type: "quality",
      name: BADGES.quality.name,
      description: BADGES.quality.description,
      iconName: BADGES.quality.iconName,
      dateAwarded: "2023-06-20T14:45:00Z",
      points: BADGES.quality.points
    },
    {
      id: "badge-3",
      type: "reliable",
      name: BADGES.reliable.name,
      description: BADGES.reliable.description,
      iconName: BADGES.reliable.iconName,
      dateAwarded: "2023-08-10T09:15:00Z",
      points: BADGES.reliable.points
    },
    {
      id: "badge-4",
      type: "verified",
      name: BADGES.verified.name,
      description: BADGES.verified.description,
      iconName: BADGES.verified.iconName,
      dateAwarded: "2023-04-05T11:20:00Z",
      points: BADGES.verified.points
    }
  ],
  pointsHistory: [
    {
      id: "tx-1",
      date: "2023-09-15T14:30:00Z",
      points: 100,
      reason: "Événement complété avec succès",
      type: "earned"
    },
    {
      id: "tx-2",
      date: "2023-09-10T09:45:00Z",
      points: 50,
      reason: "Avis 5 étoiles reçu",
      type: "earned"
    },
    {
      id: "tx-3",
      date: "2023-09-05T16:20:00Z",
      points: 10,
      reason: "Réponse rapide à une demande",
      type: "earned"
    },
    {
      id: "tx-4",
      date: "2023-08-28T11:15:00Z",
      points: 30,
      reason: "Recommandation acceptée",
      type: "earned"
    },
    {
      id: "tx-5",
      date: "2023-08-20T13:40:00Z",
      points: 200,
      reason: "Badge 'Service 5 Étoiles' obtenu",
      type: "earned"
    }
  ],
  stats: {
    responseRate: 94,
    averageResponseTime: 3.2,
    clientSatisfaction: 4.8,
    completedEvents: 12,
    recommendationsGiven: 15,
    recommendationsReceived: 7,
    averageRating: 4.7,
    totalRatings: 48
  }
};

const PartnerGamification = () => {
  const { tier, totalPoints, nextTierPoints, levelProgress, badges, pointsHistory, stats } = mockPartnerGamification;

  return (
    <DashboardLayout type="partner">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Programme de Fidélité</h1>
          <p className="text-vip-gray-400">Suivez votre progression, gagnez des badges et des avantages exclusifs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <LoyaltyTierCard 
              tier={tier} 
              points={totalPoints} 
              nextTierPoints={nextTierPoints} 
              levelProgress={levelProgress} 
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="bg-vip-gray-900 p-4 rounded-lg border border-vip-gray-800">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-vip-gray-400 text-sm">Total des points</h3>
                  <p className="text-2xl font-bold text-vip-white">{totalPoints}</p>
                </div>
                <div className="p-3 bg-vip-gold/10 rounded-full">
                  <Trophy className="text-vip-gold h-6 w-6" />
                </div>
              </div>
            </div>
            <div className="bg-vip-gray-900 p-4 rounded-lg border border-vip-gray-800">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-vip-gray-400 text-sm">Badges obtenus</h3>
                  <p className="text-2xl font-bold text-vip-white">{badges.length}</p>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-full">
                  <Award className="text-blue-500 h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="badges" className="w-full">
          <TabsList className="bg-vip-gray-900 border border-vip-gray-800 mb-4">
            <TabsTrigger value="badges" className="data-[state=active]:bg-vip-gold data-[state=active]:text-vip-black gap-2">
              <Award size={16} /> Badges
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-vip-gold data-[state=active]:text-vip-black gap-2">
              <Clock size={16} /> Historique
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-vip-gold data-[state=active]:text-vip-black gap-2">
              <ChartBar size={16} /> Statistiques
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="badges" className="mt-0">
            <BadgesCollection badges={badges} />
          </TabsContent>
          
          <TabsContent value="history" className="mt-0">
            <PointsHistory transactions={pointsHistory} />
          </TabsContent>
          
          <TabsContent value="stats" className="mt-0">
            <GamificationStats stats={stats} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default PartnerGamification;
