
export enum AvailabilityStatus {
  AVAILABLE = "available",
  TENTATIVE = "tentative",
  BUSY = "busy",
  UNAVAILABLE = "unavailable",
}

export interface AvailabilityDate {
  date: string; // ISO string format
  status: AvailabilityStatus;
  notes?: string;
}

export interface PartnerAvailability {
  partnerId: string;
  availability: AvailabilityDate[];
}
