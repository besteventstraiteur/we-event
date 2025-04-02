
// Common type definitions for floor plan and guest management
export interface Guest {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
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
