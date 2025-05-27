
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Award, Target } from "lucide-react";
import LoyaltyTierCard from "@/components/partner/gamification/LoyaltyTierCard";
import BadgesCollection from "@/components/partner/gamification/BadgesCollection";
import GamificationStats from "@/components/partner/gamification/GamificationStats";
import PointsHistory from "@/components/partner/gamification/PointsHistory";
import { PartnerGamification as PartnerGamificationType, BADGES, ACTION_POINTS } from "@/models/partnerGamification";

// Mock data pour la démonstration
const mockGamificationData: PartnerGamificationType = {
  partnerId: "partner-001",
  totalPoints: 6500,
  tier: "gold",
  nextTierPoints: 15000,
  levelProgress: 43,
  badges: [
    {
      id: "1",
      type: "speed",
      name: "Réponse Éclair",
      description: "Répond aux clients en moins de 2 heures",
      iconName: "Zap",
      dateAwarded: "2024-01-15",
      points: 100
    },
    {
      id: "2",
      type: "quality",
      name: "Service 5 Étoiles",
      description: "A reçu plus de 10 avis 5 étoiles",
      iconName: "Star",
      dateAwarded: "2024-02-20",
      points: 200
    },
    {
      id: "3",
      type: "verified",
      name: "Vérifié",
      description: "Identité et qualifications vérifiées",
      iconName: "CheckCircle",
      dateAwarded: "2024-01-01",
      points: 50
    },
    {
      id: "4",
      type: "topRated",
      name: "Excellence",
      description: "Note moyenne supérieure à 4.8/5",
      iconName: "ThumbsUp",
      dateAwarded: "2024-03-10",
      points: 400
    }
  ],
  stats: {
    responseRate: 95,
    averageResponseTime: 1.5,
    clientSatisfaction: 4.7,
    completedEvents: 24,
    recommendationsGiven: 15,
    recommendationsReceived: 8,
    averageRating: 4.8,
    totalRatings: 32
  },
  pointsHistory: [
    {
      id: "1",
      date: "2024-03-15",
      points: 200,
      reason: "Événement complété avec succès",
      type: "earned"
    },
    {
      id: "2",
      date: "2024-03-12",
      points: 50,
      reason: "Avis 5 étoiles reçu",
      type: "earned"
    },
    {
      id: "3",
      date: "2024-03-10",
      points: 400,
      reason: "Badge Excellence obtenu",
      type: "earned"
    },
    {
      id: "4",
      date: "2024-03-08",
      points: 15,
      reason: "Réponse rapide à un client",
      type: "earned"
    },
    {
      id: "5",
      date: "2024-03-05",
      points: 20,
      reason: "Recommandation d'un partenaire",
      type: "earned"
    }
  ]
};

const PartnerGamification = () => {
  return (
    <DashboardLayout type="partner">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Programme de Fidélité</h1>
            <p className="text-gray-600 mt-2">
              Gagnez des points, débloquez des badges et accédez à des avantages exclusifs
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Trophy className="h-8 w-8 text-yellow-600" />
            <div>
              <p className="text-sm text-gray-600">Total des points</p>
              <p className="text-2xl font-bold">{mockGamificationData.totalPoints}</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <Trophy className="h-4 w-4" />
              <span>Vue d'ensemble</span>
            </TabsTrigger>
            <TabsTrigger value="badges" className="flex items-center space-x-2">
              <Award className="h-4 w-4" />
              <span>Badges</span>
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center space-x-2">
              <Star className="h-4 w-4" />
              <span>Statistiques</span>
            </TabsTrigger>
            <TabsTrigger value="rewards" className="flex items-center space-x-2">
              <Target className="h-4 w-4" />
              <span>Récompenses</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LoyaltyTierCard
                tier={mockGamificationData.tier}
                points={mockGamificationData.totalPoints}
                nextTierPoints={mockGamificationData.nextTierPoints}
                levelProgress={mockGamificationData.levelProgress}
              />
              
              <PointsHistory transactions={mockGamificationData.pointsHistory.slice(0, 5)} />
            </div>
            
            <BadgesCollection badges={mockGamificationData.badges} />
          </TabsContent>

          <TabsContent value="badges" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BadgesCollection badges={mockGamificationData.badges} />
              
              <Card>
                <CardHeader>
                  <CardTitle>Tous les badges disponibles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(BADGES).map(([key, badge]) => (
                      <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{badge.name}</h4>
                          <p className="text-sm text-gray-600">{badge.description}</p>
                        </div>
                        <Badge variant="outline">+{badge.points} pts</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <GamificationStats stats={mockGamificationData.stats} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PointsHistory transactions={mockGamificationData.pointsHistory} />
              
              <Card>
                <CardHeader>
                  <CardTitle>Progression mensuelle</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Points ce mois</span>
                      <span className="font-bold">685 pts</span>
                    </div>
                    <Progress value={68} className="h-2" />
                    <p className="text-xs text-gray-500">Objectif mensuel: 1000 points</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="rewards" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Points par action</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(ACTION_POINTS).map(([key, points]) => (
                    <div key={key} className="flex justify-between items-center p-3 border rounded-lg">
                      <span className="text-sm">
                        {key === 'newResponse' && 'Répondre à une demande'}
                        {key === 'quickResponse' && 'Réponse rapide (< 2h)'}
                        {key === 'clientBooked' && 'Client réserve le service'}
                        {key === 'eventCompleted' && 'Événement réalisé'}
                        {key === 'goodReview' && 'Avis positif (4-5 étoiles)'}
                        {key === 'perfectReview' && 'Avis 5 étoiles'}
                        {key === 'reviewResponse' && 'Réponse à un avis'}
                        {key === 'recommendation' && 'Recommandation donnée'}
                        {key === 'recommendationAccepted' && 'Recommandation acceptée'}
                        {key === 'profileCompletion' && 'Profil complété à 100%'}
                        {key === 'anniversaryMonth' && 'Mois anniversaire'}
                        {key === 'renewSubscription' && 'Renouvellement abonnement'}
                      </span>
                      <Badge>+{points} pts</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default PartnerGamification;
