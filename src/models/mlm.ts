
export enum PartnerStatus {
  AMBASSADOR = "ambassador",
  MANAGER = "manager",
  LEADER = "leader",
  ELITE = "elite"
}

export interface NetworkMember {
  id: string;
  name: string;
  email: string;
  status: PartnerStatus;
  monthlySubscription: number;
  isActive: boolean;
  level: number;
  joinDate: Date;
  referrals?: NetworkMember[];
}

export interface MLMCommission {
  id: string;
  period: string;
  level1Amount: number;
  level2Amount: number;
  level3Amount: number;
  statusBonus: number;
  recommendationBonus: number;
  totalAmount: number;
  isPaid: boolean;
  paymentDate?: Date;
}

export interface MLMStats {
  directReferrals: number;
  totalNetworkSize: number;
  networkRevenue: number;
  currentStatus: PartnerStatus;
  nextStatusProgress: number;
  nextStatusRequirement: number;
  validatedRecommendations: number;
  currentRecommendationBonus: number;
  nextRecommendationBonus: number;
  nextRecommendationThreshold: number;
}

// Sample data for demonstration purposes
export const mockMLMStats: MLMStats = {
  directReferrals: 3,
  totalNetworkSize: 7,
  networkRevenue: 300,
  currentStatus: PartnerStatus.AMBASSADOR,
  nextStatusProgress: 300,
  nextStatusRequirement: 500,
  validatedRecommendations: 3,
  currentRecommendationBonus: 0,
  nextRecommendationBonus: 1,
  nextRecommendationThreshold: 5
};

export const mockCommissions: MLMCommission[] = [
  {
    id: "comm-1",
    period: "Avril 2025",
    level1Amount: 29.94,
    level2Amount: 14.97,
    level3Amount: 4.99,
    statusBonus: 0,
    recommendationBonus: 0,
    totalAmount: 49.90,
    isPaid: false
  },
  {
    id: "comm-2",
    period: "Mars 2025",
    level1Amount: 29.94,
    level2Amount: 14.97,
    level3Amount: 4.99,
    statusBonus: 0,
    recommendationBonus: 0,
    totalAmount: 49.90,
    isPaid: true,
    paymentDate: new Date(2025, 3, 5)
  },
  {
    id: "comm-3",
    period: "Février 2025",
    level1Amount: 29.94,
    level2Amount: 14.97,
    level3Amount: 4.99,
    statusBonus: 0,
    recommendationBonus: 0,
    totalAmount: 49.90,
    isPaid: true,
    paymentDate: new Date(2025, 2, 5)
  }
];

export const mockNetwork: NetworkMember[] = [
  {
    id: "member-1",
    name: "Sophie Martin",
    email: "sophie.martin@example.com",
    status: PartnerStatus.AMBASSADOR,
    monthlySubscription: 49.99,
    isActive: true,
    level: 1,
    joinDate: new Date(2024, 11, 15),
    referrals: [
      {
        id: "member-3",
        name: "Thomas Dubois",
        email: "thomas.dubois@example.com",
        status: PartnerStatus.AMBASSADOR,
        monthlySubscription: 49.99,
        isActive: true,
        level: 2,
        joinDate: new Date(2025, 0, 10)
      }
    ]
  },
  {
    id: "member-2",
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    status: PartnerStatus.AMBASSADOR,
    monthlySubscription: 49.99,
    isActive: true,
    level: 1,
    joinDate: new Date(2024, 11, 20),
    referrals: [
      {
        id: "member-4",
        name: "Marie Laurent",
        email: "marie.laurent@example.com",
        status: PartnerStatus.AMBASSADOR,
        monthlySubscription: 49.99,
        isActive: true,
        level: 2,
        joinDate: new Date(2025, 1, 5),
        referrals: [
          {
            id: "member-5",
            name: "Lucie Moreau",
            email: "lucie.moreau@example.com",
            status: PartnerStatus.AMBASSADOR,
            monthlySubscription: 49.99,
            isActive: true,
            level: 3,
            joinDate: new Date(2025, 2, 15)
          }
        ]
      }
    ]
  }
];
