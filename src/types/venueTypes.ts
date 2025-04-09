
export interface Venue {
  id: string;
  name: string;
  partner: string;
  location: string;
  capacity: number;
  description: string;
  floorPlan?: string;
  imageUrl?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  price?: string;
  availability?: string[];
}
