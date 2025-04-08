
export enum SubscriptionTier {
  FREE = "free",
  STANDARD = "standard",
  PREMIUM = "premium"
}

export interface Subscription {
  id: string;
  tier: SubscriptionTier;
  name: string;
  startDate: Date;
  expiryDate: Date;
  price: number;
  autoRenew: boolean;
  active: boolean;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  tier: SubscriptionTier;
  price: number;
  priceWithTax: number;
  features: string[];
  limitations: string;
}

export interface SubscriptionDetails {
  subscription: Subscription;
  daysRemaining: number;
  percentageRemaining: number;
}

// Données fictives pour l'interface admin
export const mockSubscriptions: Subscription[] = [
  {
    id: "sub-1",
    tier: SubscriptionTier.PREMIUM,
    name: "Premium",
    startDate: new Date(2024, 2, 15),
    expiryDate: new Date(2025, 2, 15),
    price: 99.99,
    autoRenew: true,
    active: true
  },
  {
    id: "sub-2",
    tier: SubscriptionTier.STANDARD,
    name: "Standard",
    startDate: new Date(2024, 4, 1),
    expiryDate: new Date(2025, 4, 1),
    price: 49.99,
    autoRenew: true,
    active: true
  },
  {
    id: "sub-3",
    tier: SubscriptionTier.FREE,
    name: "Gratuit",
    startDate: new Date(2024, 1, 10),
    expiryDate: new Date(2025, 1, 10),
    price: 0,
    autoRenew: false,
    active: true
  },
  {
    id: "sub-4",
    tier: SubscriptionTier.PREMIUM,
    name: "Premium",
    startDate: new Date(2024, 3, 20),
    expiryDate: new Date(2025, 3, 20),
    price: 99.99,
    autoRenew: false,
    active: false
  }
];

// Plans d'abonnement disponibles
export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "plan-free",
    name: "Gratuit",
    tier: SubscriptionTier.FREE,
    price: 0,
    priceWithTax: 0,
    features: [
      "Profil de base",
      "Visibilité limitée",
      "Max 5 requêtes par mois"
    ],
    limitations: "Fonctionnalités limitées, pas de support prioritaire"
  },
  {
    id: "plan-standard",
    name: "Standard",
    tier: SubscriptionTier.STANDARD,
    price: 49.99,
    priceWithTax: 59.99,
    features: [
      "Profil avancé",
      "Visibilité améliorée",
      "Requêtes illimitées",
      "Support par email"
    ],
    limitations: "Pas de fonctionnalités premium"
  },
  {
    id: "plan-premium",
    name: "Premium",
    tier: SubscriptionTier.PREMIUM,
    price: 99.99,
    priceWithTax: 119.99,
    features: [
      "Profil premium avec mise en avant",
      "Visibilité maximale",
      "Requêtes illimitées",
      "Support prioritaire 24/7",
      "Accès aux statistiques avancées",
      "Recommandations prioritaires"
    ],
    limitations: "Aucune"
  }
];

