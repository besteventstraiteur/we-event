
export interface PartnerProfile {
  id: string;
  name: string;
  category: string;
  description: string;
  shortDescription?: string;
  pricing?: {
    basePrice?: string;
    packages?: PricingPackage[];
  };
  contact?: {
    email?: string;
    phone?: string;
    website?: string;
    address?: string;
  };
  images: PartnerImage[];
  featured?: boolean;
  discount?: string;
  availability?: string[];
  services?: string[];
}

export interface PricingPackage {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
}

export interface PartnerImage {
  id: string;
  url: string;
  alt?: string;
  featured?: boolean;
  type: 'profile' | 'gallery' | 'logo' | 'background';
  order?: number;
}
