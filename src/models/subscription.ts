
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
