/**
 * Types de badges que peuvent obtenir les prestataires
 */
export type BadgeType = 
  | 'speed' // Rapidité de réponse
  | 'quality' // Qualité de service
  | 'popular' // Nombre élevé de contacts
  | 'reliable' // Fiabilité
  | 'exclusive' // Prestataire exclusif
  | 'recommended' // Recommande activement d'autres prestataires
  | 'topRated' // Très bien noté
  | 'seasonal' // Badge saisonnier (événement spécial)
  | 'verified' // Identité vérifiée
  | 'featured'; // Mis en avant par VIP

/**
 * Niveaux de fidélité
 */
export type LoyaltyTier = 'bronze' | 'silver' | 'gold' | 'platinum';

/**
 * Représente un badge obtenu par un prestataire
 */
export interface PartnerBadge {
  id: string;
  type: BadgeType;
  name: string;
  description: string;
  iconName: string;
  dateAwarded: string;
  points: number; // Points attribués pour ce badge
}

/**
 * Représente le profil complet de gamification d'un prestataire
 */
export interface PartnerGamification {
  partnerId: string;
  totalPoints: number;
  badges: PartnerBadge[];
  tier: LoyaltyTier;
  nextTierPoints: number; // Points nécessaires pour atteindre le niveau suivant
  levelProgress: number; // Pourcentage de progression vers le niveau suivant (0-100)
  pointsHistory: PointsTransaction[];
  stats: {
    responseRate: number; // Taux de réponse aux demandes (pourcentage)
    averageResponseTime: number; // Temps de réponse moyen (en heures)
    clientSatisfaction: number; // Score de satisfaction client (0-5)
    completedEvents: number; // Nombre d'événements réalisés
    recommendationsGiven: number; // Nombre de recommandations données
    recommendationsReceived: number; // Nombre de recommandations reçues
    averageRating: number; // Note moyenne des avis (0-5)
    totalRatings: number; // Nombre total d'avis reçus
  };
}

/**
 * Représente une transaction de points
 */
export interface PointsTransaction {
  id: string;
  date: string;
  points: number;
  reason: string;
  type: 'earned' | 'spent';
}

/**
 * Configuration des niveaux de fidélité
 */
export const LOYALTY_TIERS = {
  bronze: {
    minPoints: 0,
    name: 'Bronze',
    color: '#CD7F32',
    benefits: ['Profil de base', 'Accès au forum'],
  },
  silver: {
    minPoints: 1000,
    name: 'Argent',
    color: '#C0C0C0',
    benefits: ['Logo mis en avant dans les résultats', 'Badge "Partenaire Silver"', '-5% sur l\'abonnement annuel'],
  },
  gold: {
    minPoints: 5000,
    name: 'Or',
    color: '#FFD700',
    color2: '#B8860B',
    benefits: ['Profil premium', 'Badge "Partenaire Gold"', '-15% sur l\'abonnement annuel', 'Accès prioritaire au support'],
  },
  platinum: {
    minPoints: 15000,
    name: 'Platine',
    color: '#E5E4E2',
    color2: '#7B9095',
    benefits: ['Profil en tête de liste', 'Badge "Partenaire Platine"', '-25% sur l\'abonnement annuel', 'Accès exclusif aux événements VIP', 'Accompagnement personnalisé'],
  },
};

/**
 * Configuration des badges
 */
export const BADGES = {
  speed: {
    name: 'Réponse Éclair',
    description: 'Répond aux clients en moins de 2 heures',
    iconName: 'Zap',
    points: 100,
  },
  quality: {
    name: 'Service 5 Étoiles',
    description: 'A reçu plus de 10 avis 5 étoiles',
    iconName: 'Star',
    points: 200,
  },
  popular: {
    name: 'Très Demandé',
    description: 'Parmi les 10% des prestataires les plus contactés',
    iconName: 'TrendingUp',
    points: 300,
  },
  reliable: {
    name: 'Fiabilité Exemplaire',
    description: 'Aucune annulation sur les 12 derniers mois',
    iconName: 'Shield',
    points: 250,
  },
  exclusive: {
    name: 'Partenaire Exclusif',
    description: 'Prestataire exclusif avec des offres uniques',
    iconName: 'Award',
    points: 500,
  },
  recommended: {
    name: 'Super Networker',
    description: 'A fait plus de 20 recommandations acceptées',
    iconName: 'Users',
    points: 150,
  },
  topRated: {
    name: 'Excellence',
    description: 'Note moyenne supérieure à 4.8/5',
    iconName: 'ThumbsUp',
    points: 400,
  },
  seasonal: {
    name: 'En Vogue',
    description: 'Badge saisonnier pour événement spécial',
    iconName: 'Gift',
    points: 100,
  },
  verified: {
    name: 'Vérifié',
    description: 'Identité et qualifications vérifiées',
    iconName: 'CheckCircle',
    points: 50,
  },
  featured: {
    name: 'À l\'Honneur',
    description: 'Mis en avant par l\'équipe VIP',
    iconName: 'Crown',
    points: 500,
  },
  bestAwards: {
    name: 'Best Awards 2025',
    description: 'A obtenu 10+ avis 5 étoiles validés par notre équipe',
    iconName: 'Trophy',
    points: 750,
  }
};

/**
 * Points attribués pour différentes actions
 */
export const ACTION_POINTS = {
  newResponse: 10, // Répondre à une demande client
  quickResponse: 15, // Réponse en moins de 2h
  clientBooked: 100, // Un client réserve le service
  eventCompleted: 200, // Événement réalisé avec succès
  goodReview: 50, // Avis positif (4-5 étoiles)
  perfectReview: 100, // Avis 5 étoiles
  reviewResponse: 10, // Réponse à un avis client
  recommendation: 20, // Recommandation d'un autre prestataire
  recommendationAccepted: 30, // Recommandation acceptée
  profileCompletion: 25, // Profil complété à 100%
  anniversaryMonth: 50, // Chaque mois anniversaire sur la plateforme
  renewSubscription: 300, // Renouvellement d'abonnement
};

/**
 * Calcul des badges en fonction des statistiques du prestataire
 */
export const calculateBadges = (partnerStats: PartnerGamification['stats']): BadgeType[] => {
  const earnedBadges: BadgeType[] = [];
  
  // Vérifier les critères pour chaque badge
  if (partnerStats.averageResponseTime < 2) {
    earnedBadges.push('speed');
  }
  
  if (partnerStats.clientSatisfaction >= 4.8) {
    earnedBadges.push('quality');
  }
  
  if (partnerStats.responseRate > 95) {
    earnedBadges.push('reliable');
  }
  
  if (partnerStats.averageRating >= 4.8 && partnerStats.totalRatings >= 10) {
    earnedBadges.push('topRated');
  }
  
  if (partnerStats.recommendationsGiven >= 20) {
    earnedBadges.push('recommended');
  }
  
  // Les badges 'popular', 'exclusive', 'seasonal', 'verified', 'featured'
  // sont généralement attribués manuellement ou selon des critères spécifiques
  // qui ne peuvent pas être déterminés uniquement par les statistiques
  
  return earnedBadges;
};
