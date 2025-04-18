
export interface Guest {
  id: string;
  prenom: string;
  nom: string;
  email: string;
  telephone?: string;
  statut: 'confirmed' | 'pending' | 'declined';
  menu_option: 'standard' | 'vegetarian' | 'vegan' | 'other';
  ceremonie: boolean;
  vin: boolean;
  repas: boolean;
  brunch: boolean;
  enfant: boolean;
  table: number | null;
  commentaires?: string;
  allergies?: string[];
  conjoint?: string;
  enfants?: string[];
  notes?: string;
  
  // Properties from floorPlanTypes.Guest that might be needed
  firstName?: string;
  lastName?: string;
  dietaryRestrictions?: string;
  needsWheelchairAccess?: boolean;
  seat?: string;
  menuChoice?: string;
  menuOption?: string;
}
