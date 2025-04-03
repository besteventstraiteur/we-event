
import { CartItem } from "@/contexts/CartContext";

export const formatPrice = (price: number) => {
  return (price / 100).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
};

export const getServiceTypeLabel = (type?: string) => {
  if (!type) return null;
  
  const typeLabels: Record<string, string> = {
    'photography': 'Photographie',
    'videography': 'Vidéographie',
    'dj': 'DJ',
    'catering': 'Traiteur',
    'decoration': 'Décoration',
    'venue': 'Lieu',
    'car': 'Transport',
  };
  
  return typeLabels[type] || type;
};

export const calculateCartTotals = (items: CartItem[]) => {
  const total = items.reduce((sum, item) => sum + item.price, 0);
  const itemCount = items.length;
  
  return {
    total,
    itemCount
  };
};

export const getItemTypeLabel = (type: "package" | "service") => {
  return type === "package" ? "Pack" : "Service";
};
