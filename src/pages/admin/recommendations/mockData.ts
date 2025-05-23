
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
  color: string;
}

export interface TopPartner {
  id: string;
  name: string;
  category: string;
  recommendations: number;
  acceptanceRate: number;
}

export interface Recommendation {
  id: number;
  fromPartner: string;
  toPartner: string;
  status: "accepted" | "pending" | "declined";
  date: string;
  category: string;
  clientName: string;
}

// Recommendations list
export const recommendations: Recommendation[] = [
  {
    id: 1,
    fromPartner: "Studio Elite",
    toPartner: "DJ Max",
    status: "accepted",
    date: "05/04/2025",
    category: "DJ",
    clientName: "Sophie & Thomas"
  },
  {
    id: 2,
    fromPartner: "DJ Max",
    toPartner: "Délices Traiteur",
    status: "accepted",
    date: "02/04/2025",
    category: "Traiteur",
    clientName: "Claire & Antoine"
  },
  {
    id: 3,
    fromPartner: "Château des Roses",
    toPartner: "Studio Elite",
    status: "pending",
    date: "01/04/2025",
    category: "Photographe",
    clientName: "Marie & Julien"
  },
  {
    id: 4,
    fromPartner: "Délices Traiteur",
    toPartner: "Fleurs Élégance",
    status: "declined",
    date: "30/03/2025",
    category: "Fleuriste",
    clientName: "Emma & Lucas"
  },
  {
    id: 5,
    fromPartner: "Event Planner VIP",
    toPartner: "Château des Roses",
    status: "accepted",
    date: "28/03/2025",
    category: "Lieu",
    clientName: "Sarah & Maxime"
  },
  {
    id: 6,
    fromPartner: "Fleurs Élégance",
    toPartner: "Event Planner VIP",
    status: "accepted",
    date: "25/03/2025",
    category: "Wedding Planner",
    clientName: "Léa & Nicolas"
  },
  {
    id: 7,
    fromPartner: "Studio Elite",
    toPartner: "Château des Roses",
    status: "pending",
    date: "20/03/2025",
    category: "Lieu",
    clientName: "Chloé & Alexandre"
  },
  {
    id: 8,
    fromPartner: "DJ Max",
    toPartner: "Studio Elite",
    status: "accepted",
    date: "18/03/2025",
    category: "Photographe",
    clientName: "Julie & Romain"
  }
];

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
  { name: "Acceptée", value: 265, color: "#22c55e" },
  { name: "En attente", value: 42, color: "#f97316" },
  { name: "Refusée", value: 35, color: "#ef4444" },
];

// Top partenaires
export const topPartners: TopPartner[] = [
  { id: "p1", name: "Studio Elite", category: "Photographe", recommendations: 18, acceptanceRate: 94 },
  { id: "p2", name: "DJ Max", category: "DJ", recommendations: 15, acceptanceRate: 92 },
  { id: "p3", name: "Château des Roses", category: "Lieu", recommendations: 14, acceptanceRate: 100 },
  { id: "p4", name: "Délices Traiteur", category: "Traiteur", recommendations: 12, acceptanceRate: 89 },
  { id: "p5", name: "Event Planner VIP", category: "Wedding Planner", recommendations: 11, acceptanceRate: 95 },
];
