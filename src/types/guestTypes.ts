
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
}
