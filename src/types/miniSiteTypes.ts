
export interface WeddingDetails {
  title: string;
  coupleNames: {
    partner1: string;
    partner2: string;
  };
  date: Date;
  locations: {
    ceremony?: {
      name: string;
      address: string;
      time: string;
      googleMapsUrl?: string;
    };
    reception?: {
      name: string;
      address: string;
      time: string;
      googleMapsUrl?: string;
    };
  };
  accommodations: Accommodation[];
  dressCode?: string;
  rsvpDeadline?: Date;
  story?: string;
  contactEmail?: string;
  schedule?: ScheduleItem[];
}

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  description?: string;
  icon?: string;
}

export interface Accommodation {
  name: string;
  address: string;
  description: string;
  priceRange?: string;
  websiteUrl?: string;
  phoneNumber?: string;
  distanceToVenue?: string;
}

export interface MiniSiteTheme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  images: {
    hero?: string;
    gallery?: string[];
    backgroundPattern?: string;
  };
  layout?: {
    headerStyle: 'centered' | 'side-by-side' | 'overlay';
    sectionStyle: 'boxed' | 'full-width';
    roundedCorners: boolean;
  };
  animations?: {
    enabled: boolean;
    intensity: 'subtle' | 'moderate' | 'playful';
  };
}

export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  date: Date;
  type: 'text' | 'image' | 'video' | 'audio';
  mediaUrl?: string;
}
