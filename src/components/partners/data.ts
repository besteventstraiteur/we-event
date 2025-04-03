
// Liste des catégories de prestataires
export const partnerCategories = [
  { id: "domaine", name: "Domaines" },
  { id: "dj", name: "DJs" },
  { id: "fleuriste", name: "Fleuristes" },
  { id: "photographe", name: "Photographes" },
  { id: "traiteur", name: "Traiteurs" },
  { id: "wedding-planner", name: "Wedding Planners" },
  { id: "other", name: "Autres" },
];

// Liste des prestataires
export const allPartners = [
  { id: 1, name: "Château des Merveilles", category: "domaine", discount: "15%", description: "Un domaine d'exception niché dans un parc de 5 hectares avec une vue imprenable sur la vallée. Capacité de 200 personnes assises.", rating: 4.9 },
  { id: 2, name: "Manoir des Roses", category: "domaine", discount: "10%", description: "Manoir historique du 18ème siècle avec ses jardins à la française, idéal pour vos séances photos et cérémonies en extérieur.", rating: 4.7 },
  { id: 3, name: "DJ Platine", category: "dj", discount: "20%", description: "Plus de 15 ans d'expérience, spécialiste des mariages et événements haut de gamme.", rating: 4.8 },
  { id: 4, name: "Mix & Match", category: "dj", discount: "15%", description: "Duo de DJs offrant une expérience musicale complète et personnalisée pour votre événement.", rating: 4.5 },
  { id: 5, name: "Fleurs de Luxe", category: "fleuriste", discount: "20%", description: "Fleuriste spécialisé dans les compositions raffinées et élégantes pour des événements prestigieux.", rating: 4.6 },
  { id: 6, name: "Belle Fleur", category: "fleuriste", discount: "15%", description: "Compositions florales personnalisées avec des fleurs fraîches et de saison.", rating: 4.3 },
  { id: 7, name: "Objectif Emotion", category: "photographe", discount: "15%", description: "Photographe au style moderne capturant les émotions naturelles et les moments spontanés.", rating: 4.9 },
  { id: 8, name: "Studio Lumière", category: "photographe", discount: "10%", description: "Équipe de photographes et vidéastes pour immortaliser chaque moment de votre événement sous tous les angles.", rating: 4.8 },
  { id: 9, name: "Best Events Traiteur", category: "traiteur", discount: "25%", description: "Le meilleur de la gastronomie française revisitée pour vos événements exclusifs.", rating: 4.7 },
  { id: 10, name: "Saveurs du Monde", category: "traiteur", discount: "20%", description: "Traiteur proposant une cuisine fusion inspirée des quatre coins du monde.", rating: 4.4 },
  { id: 11, name: "Perfect Day", category: "wedding-planner", discount: "15%", description: "Organisation complète ou partielle de votre événement avec un suivi personnalisé.", rating: 4.9 },
  { id: 12, name: "Event Designer", category: "wedding-planner", discount: "10%", description: "Spécialiste de la décoration et scénographie événementielle haut de gamme.", rating: 4.6 },
];

// Données fictives de mes prestataires sélectionnés
export const myPartners = [
  { id: 3, name: "DJ Platine", category: "dj", discount: "20%", description: "Plus de 15 ans d'expérience, spécialiste des mariages et événements haut de gamme.", status: "confirmed", appointmentDate: "2023-11-15", rating: 4.8 },
  { id: 7, name: "Objectif Emotion", category: "photographe", discount: "15%", description: "Photographe au style moderne capturant les émotions naturelles et les moments spontanés.", status: "pending", appointmentDate: null, rating: 4.9 },
  { id: 9, name: "Best Events Traiteur", category: "traiteur", discount: "25%", description: "Le meilleur de la gastronomie française revisitée pour vos événements exclusifs.", status: "confirmed", appointmentDate: "2023-12-10", rating: 4.7 },
];
