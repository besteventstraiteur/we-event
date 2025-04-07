
export interface MonthlyStat {
  month: string;
  total: number;
  accepted: number;
  rejected: number;
}

export interface CategoryStat {
  name: string;
  value: number;
}

export interface StatusStat {
  name: string;
  value: number;
}

export interface TopPartner {
  id: string;
  name: string;
  category: string;
  recommendations: number;
  acceptanceRate: number;
}

// Données mensuelles des recommandations
export const monthlyStats: MonthlyStat[] = [
  { month: "Jan", total: 18, accepted: 12, rejected: 6 },
  { month: "Fév", total: 22, accepted: 15, rejected: 7 },
  { month: "Mar", total: 25, accepted: 18, rejected: 7 },
  { month: "Avr", total: 30, accepted: 24, rejected: 6 },
  { month: "Mai", total: 35, accepted: 28, rejected: 7 },
  { month: "Juin", total: 42, accepted: 35, rejected: 7 },
  { month: "Juil", total: 38, accepted: 30, rejected: 8 },
  { month: "Août", total: 32, accepted: 26, rejected: 6 },
  { month: "Sep", total: 40, accepted: 34, rejected: 6 },
  { month: "Oct", total: 45, accepted: 38, rejected: 7 },
  { month: "Nov", total: 52, accepted: 45, rejected: 7 },
  { month: "Déc", total: 46, accepted: 37, rejected: 9 },
];

// Données par catégorie
export const categoryStats: CategoryStat[] = [
  { name: "Photographe", value: 68 },
  { name: "DJ", value: 53 },
  { name: "Traiteur", value: 43 },
  { name: "Lieu", value: 38 },
  { name: "Fleuriste", value: 32 },
  { name: "Wedding Planner", value: 28 },
  { name: "Décorateur", value: 24 },
  { name: "Animateur", value: 20 },
  { name: "Autre", value: 36 },
];

// Données par statut
export const statusStats: StatusStat[] = [
  { name: "Acceptée", value: 265 },
  { name: "En attente", value: 42 },
  { name: "Refusée", value: 35 },
];

// Top partenaires
export const topPartners: TopPartner[] = [
  { id: "p1", name: "Studio Elite", category: "Photographe", recommendations: 18, acceptanceRate: 94 },
  { id: "p2", name: "DJ Max", category: "DJ", recommendations: 15, acceptanceRate: 92 },
  { id: "p3", name: "Château des Roses", category: "Lieu", recommendations: 14, acceptanceRate: 100 },
  { id: "p4", name: "Délices Traiteur", category: "Traiteur", recommendations: 12, acceptanceRate: 89 },
  { id: "p5", name: "Event Planner VIP", category: "Wedding Planner", recommendations: 11, acceptanceRate: 95 },
];
