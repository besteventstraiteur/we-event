
export interface Rating {
  id: string;
  partnerId: string;
  clientId: string;
  score: number; // 1-5 stars
  comment: string;
  date: Date;
  status: 'pending' | 'approved' | 'rejected';
  response?: string; // Partner response to the review
  categories?: {
    communication: number;
    quality: number;
    value: number;
    professionalism: number;
    reliability: number;
  };
}

export interface RatingSummary {
  averageScore: number;
  totalRatings: number;
  distribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
  categoryAverages?: {
    communication: number;
    quality: number;
    value: number;
    professionalism: number;
    reliability: number;
  };
}
