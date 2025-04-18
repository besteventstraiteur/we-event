
// Common type definitions for floor plan and guest management
export interface Guest {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string; // Changé à optionnel pour être compatible avec guestTypes
  ceremonie: boolean;
  vin: boolean;
  repas: boolean;
  brunch: boolean;
  conjoint: boolean;
  enfants: number;
  table: string;
  seat?: string;
  notes: string;
  menuChoice?: string;
  menuOption?: string;
  // Add all required properties to fix type errors
  firstName?: string;
  lastName?: string;
  dietaryRestrictions?: string;
  needsWheelchairAccess?: boolean;
  
  // Add compatibility with guestTypes.Guest
  statut?: 'confirmed' | 'pending' | 'declined';
  menu_option?: 'standard' | 'vegetarian' | 'vegan' | 'other';
  enfant?: boolean;
  commentaires?: string;
  allergies?: string[];
}

export interface Seat {
  id: string;
  number: string;
  guestId?: string;
}

export interface Table {
  id: string;
  name: string;
  seats: Seat[];
}
