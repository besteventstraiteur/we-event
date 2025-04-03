
import { BadgeType } from "@/models/partnerGamification";

// Mock data for partner categories
export const partnerCategories = [
  { id: "venue", name: "Domaines & Lieux" },
  { id: "photo", name: "Photographes" },
  { id: "catering", name: "Traiteurs" },
  { id: "music", name: "DJ & Musiciens" },
  { id: "flowers", name: "Fleuristes" },
  { id: "decor", name: "Décorateurs" },
  { id: "cake", name: "Pâtissiers" },
  { id: "beauty", name: "Coiffure & Maquillage" },
  { id: "transport", name: "Transport" },
  { id: "dress", name: "Robes & Costumes" },
  { id: "animation", name: "Animations" },
  { id: "planner", name: "Wedding Planners" },
];

// Mock data for all partners in the directory
export const allPartners = [
  {
    id: "partner-1",
    name: "Château des Merveilles",
    category: "venue",
    description: "Un domaine d'exception niché dans un parc de 5 hectares avec une vue imprenable sur la vallée.",
    location: "Bordeaux, France",
    rating: 4.8,
    reviewCount: 125,
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1498&q=80",
    availableDate: "2023-09-25",
    price: "€€€€",
    tags: ["château", "extérieur", "vue panoramique"],
    discount: "15%",
    badges: ["quality", "verified"],
    bestAwards: true
  },
  {
    id: "partner-2",
    name: "Fleurs Élégance",
    category: "flowers",
    description: "Créations florales uniques pour sublimer votre jour J. Spécialiste des compositions élégantes et raffinées.",
    location: "Lyon, France",
    rating: 4.7,
    reviewCount: 87,
    image: "https://images.unsplash.com/photo-1596438459194-f275f413d6ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
    availableDate: "2023-09-15",
    price: "€€",
    tags: ["bouquets", "décorations", "arches"],
    discount: "10%",
    badges: ["speed"]
  },
  {
    id: "partner-3",
    name: "Studio Photo Elite",
    category: "photo",
    description: "Capturez l'émotion de votre mariage à travers notre regard artistique et notre approche naturelle.",
    location: "Paris, France",
    rating: 4.9,
    reviewCount: 142,
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    availableDate: "2023-10-05",
    price: "€€€",
    tags: ["reportage", "artistique", "album"],
    discount: "20%",
    badges: ["quality", "featured"],
    bestAwards: true
  },
  {
    id: "partner-4",
    name: "Pâtisserie Royale",
    category: "cake",
    description: "Pièces montées et wedding cakes d'exception. Nous créons des desserts aussi beaux que délicieux.",
    location: "Marseille, France",
    rating: 4.6,
    reviewCount: 68,
    image: "https://images.unsplash.com/photo-1535254973040-607b474d7f5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    availableDate: "2023-09-22",
    price: "€€",
    tags: ["wedding cake", "pièce montée", "desserts"],
    discount: "15%",
    badges: ["topRated"]
  },
  {
    id: "partner-5",
    name: "DJ Mix Master",
    category: "music",
    description: "Créez l'ambiance parfaite pour votre mariage avec notre équipe de DJs professionnels et passionnés.",
    location: "Nice, France",
    rating: 4.7,
    reviewCount: 95,
    image: "https://images.unsplash.com/photo-1605723517503-3cadb5818fb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    availableDate: "2023-10-15",
    price: "€€",
    tags: ["DJ", "animation", "sonorisation"],
    discount: "10%",
    badges: ["verified", "popular"],
    bestAwards: true
  },
  {
    id: "partner-6",
    name: "Harmony Musique",
    category: "music",
    description: "Musiciens classiques pour votre cérémonie ou cocktail. Une ambiance élégante et raffinée.",
    location: "Toulouse, France",
    rating: 4.8,
    reviewCount: 62,
    image: "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
    availableDate: "2023-09-28",
    price: "€€€",
    tags: ["quatuor", "piano", "violon"],
    discount: "15%",
    badges: ["exclusive"]
  },
  {
    id: "partner-7",
    name: "Décor de Rêve",
    category: "decor",
    description: "Transformez votre lieu de réception en un espace féérique. Décorations personnalisées et location de mobilier.",
    location: "Lille, France",
    rating: 4.5,
    reviewCount: 73,
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    availableDate: "2023-10-10",
    price: "€€",
    tags: ["décoration", "mobilier", "luminaires"],
    discount: "20%",
    badges: ["speed", "verified"]
  }
];

// Mock data for partners selected by the client
export const myPartners = [
  allPartners[0], // Château des Merveilles
  allPartners[2], // Studio Photo Elite
  allPartners[4], // DJ Mix Master
];

// Helper to get the badge icon name
export const getBadgeIcon = (badgeType: BadgeType): string => {
  const badgeConfig = {
    speed: "Zap",
    quality: "Star",
    popular: "TrendingUp",
    reliable: "Shield",
    exclusive: "Award",
    recommended: "Users",
    topRated: "ThumbsUp",
    seasonal: "Gift",
    verified: "CheckCircle",
    featured: "Crown",
    bestAwards: "Trophy"
  };
  
  return badgeConfig[badgeType] || "Award";
};
