
import { Recommendation, CategoryStat, MonthlyStat, StatusStat, TopPartner } from "./types";

// Données pour les recommandations
export const recommendations: Recommendation[] = [
  { id: 1, fromPartner: "Domaine du Château", toPartner: "DJ Mix Master", status: "accepted", date: "10/05/2024", category: "DJ", clientName: "Sophie Martin" },
  { id: 2, fromPartner: "DJ Mix Master", toPartner: "Fleurs Élégance", status: "pending", date: "05/05/2024", category: "Fleuriste", clientName: "Marc Dupont" },
  { id: 3, fromPartner: "Pâtisserie Royale", toPartner: "Studio Photo Elite", status: "accepted", date: "01/05/2024", category: "Photographe", clientName: "Julie Petit" },
  { id: 4, fromPartner: "Studio Photo Elite", toPartner: "Domaine du Château", status: "declined", date: "28/04/2024", category: "Domaine", clientName: "Thomas Bernard" },
  { id: 5, fromPartner: "Fleurs Élégance", toPartner: "Domaine du Château", status: "accepted", date: "25/04/2024", category: "Domaine", clientName: "Claire Rousseau" },
  { id: 6, fromPartner: "Gastronomie Délice", toPartner: "Domaine du Château", status: "declined", date: "20/04/2024", category: "Domaine", clientName: "Antoine Lefevre" },
  { id: 7, fromPartner: "Domaine du Château", toPartner: "Gastronomie Délice", status: "accepted", date: "15/04/2024", category: "Traiteur", clientName: "Emilie Girard" },
  { id: 8, fromPartner: "Harmony Musique", toPartner: "Fleurs Élégance", status: "pending", date: "10/04/2024", category: "Fleuriste", clientName: "Pierre Lambert" },
];

// Statistiques par catégorie
export const categoryStats: CategoryStat[] = [
  { name: "DJ", count: 15, acceptedRate: 80 },
  { name: "Fleuriste", count: 22, acceptedRate: 65 },
  { name: "Photographe", count: 18, acceptedRate: 75 },
  { name: "Traiteur", count: 12, acceptedRate: 90 },
  { name: "Domaine", count: 30, acceptedRate: 60 },
  { name: "Décorateur", count: 8, acceptedRate: 70 },
];

// Statistiques par mois
export const monthlyStats: MonthlyStat[] = [
  { name: "Jan", recommendations: 12, acceptedRate: 58 },
  { name: "Fév", recommendations: 15, acceptedRate: 65 },
  { name: "Mar", recommendations: 18, acceptedRate: 70 },
  { name: "Avr", recommendations: 25, acceptedRate: 75 },
  { name: "Mai", recommendations: 22, acceptedRate: 68 },
  { name: "Juin", recommendations: 0, acceptedRate: 0 },
  { name: "Juil", recommendations: 0, acceptedRate: 0 },
  { name: "Août", recommendations: 0, acceptedRate: 0 },
  { name: "Sep", recommendations: 0, acceptedRate: 0 },
  { name: "Oct", recommendations: 0, acceptedRate: 0 },
  { name: "Nov", recommendations: 0, acceptedRate: 0 },
  { name: "Déc", recommendations: 0, acceptedRate: 0 },
];

// Statistiques par statut
export const statusStats: StatusStat[] = [
  { name: "Acceptées", value: 65, color: "#4ade80" },
  { name: "En attente", value: 20, color: "#facc15" },
  { name: "Refusées", value: 15, color: "#f87171" },
];

// Statistiques des partenaires les plus actifs
export const topPartners: TopPartner[] = [
  { name: "Domaine du Château", sent: 25, received: 18 },
  { name: "DJ Mix Master", sent: 20, received: 12 },
  { name: "Fleurs Élégance", sent: 18, received: 15 },
  { name: "Studio Photo Elite", sent: 15, received: 8 },
  { name: "Pâtisserie Royale", sent: 12, received: 10 },
];
