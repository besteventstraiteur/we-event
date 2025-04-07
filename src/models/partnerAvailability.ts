
export enum AvailabilityStatus {
  AVAILABLE = "available",
  BUSY = "busy",
  UNAVAILABLE = "unavailable",
  TENTATIVE = "tentative"
}

export interface AvailabilityDate {
  date: string; // Format YYYY-MM-DD
  status: AvailabilityStatus;
  note?: string;
  eventId?: string;
}

// Définition des types pour les plans de salle
export interface RoomDimensions {
  width: number;
  height: number;
}

export interface VenueFloorPlan {
  id: string;
  venueName: string;
  roomDimensions: RoomDimensions;
  elements: FloorPlanElement[];
  createdAt: string;
  updatedAt: string;
}

export interface FloorPlanElement {
  id: string;
  type: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  radius?: number;
  rotation?: number;
  label?: string;
}
