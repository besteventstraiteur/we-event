
/**
 * Types de services inclus dans les packs mariage
 */
export type ServiceType = 'photography' | 'catering' | 'dj' | 'venue' | 'decoration' | 'videography' | 'car';

/**
 * Représente un service individuel dans un pack
 */
export interface PackageService {
  id: string;
  type: ServiceType;
  vendorId: string;
  vendorName: string;
  description: string;
  price: number; // en centimes
  duration?: number; // en heures
  imageUrl?: string;
  included: boolean; // si le service est inclus par défaut dans le pack
  canBeRemoved: boolean; // si le client peut retirer ce service du pack
}

/**
 * Représente un pack mariage complet
 */
export interface WeddingPackage {
  id: string;
  name: string;
  description: string;
  services: PackageService[];
  discount: number; // pourcentage de réduction sur le total
  totalPrice: number; // en centimes (prix après réduction)
  originalPrice: number; // en centimes (prix sans réduction)
  featured: boolean;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  availability: string[]; // dates disponibles au format ISO
}

/**
 * Paramètres pour comparer les packs
 */
export interface ComparisonParams {
  price: 'asc' | 'desc';
  date?: string; // date souhaitée au format ISO
  services: ServiceType[];
}
