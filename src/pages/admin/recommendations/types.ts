
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
  count: number;
  acceptedRate: number;
}

export interface MonthlyStat {
  name: string;
  recommendations: number;
  acceptedRate: number;
}

export interface StatusStat {
  name: string;
  value: number;
  color: string;
}

export interface TopPartner {
  name: string;
  sent: number;
  received: number;
}
