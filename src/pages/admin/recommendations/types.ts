
export interface Recommendation {
  id: number;
  fromPartner: string;
  toPartner: string;
  status: "accepted" | "pending" | "declined";
  date: string;
  category: string;
  clientName: string;
}

export interface CategoryStat {
  name: string;
  value: number;
}

export interface MonthlyStat {
  month: string;
  total: number;
  accepted: number;
  rejected: number;
}

export interface StatusStat {
  name: string;
  value: number;
  color: string;
}

export interface TopPartner {
  id: string;
  name: string;
  category: string;
  recommendations: number;
  acceptanceRate: number;
}
