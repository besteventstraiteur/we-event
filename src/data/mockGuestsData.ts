
import { Guest } from '@/types/floorPlanTypes';

// Liste d'invités initiale avec les types complets
export const initialGuests: Guest[] = [
  {
    id: "1",
    nom: "Dupont",
    prenom: "Jean",
    email: "jean.dupont@example.com",
    telephone: "0612345678",
    ceremonie: true,
    vin: true,
    repas: true,
    brunch: false,
    conjoint: true,
    enfants: 0,
    table: "",
    notes: "",
    menuChoice: "standard"
  },
  {
    id: "2",
    nom: "Martin",
    prenom: "Sophie",
    email: "sophie.martin@example.com",
    telephone: "0687654321",
    ceremonie: true,
    vin: true,
    repas: true,
    brunch: true,
    conjoint: false,
    enfants: 1,
    table: "",
    notes: "Allergie aux fruits de mer",
    menuChoice: "allergies"
  },
  {
    id: "3",
    nom: "Petit",
    prenom: "Nicolas",
    email: "nicolas.petit@example.com",
    telephone: "0678901234",
    ceremonie: true,
    vin: true,
    repas: true,
    brunch: false,
    conjoint: true,
    enfants: 2,
    table: "",
    notes: "",
    menuChoice: "standard"
  },
  {
    id: "4",
    nom: "Durand",
    prenom: "Marie",
    email: "marie.durand@example.com",
    telephone: "0643218765",
    ceremonie: false,
    vin: true,
    repas: true,
    brunch: true,
    conjoint: false,
    enfants: 0,
    table: "",
    notes: "Végétarienne",
    menuChoice: "vegetarien"
  }
];
