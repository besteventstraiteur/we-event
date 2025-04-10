
import React from "react";
import PartnerCardSimple from "./PartnerCardSimple";

interface PartnerCategory {
  id: string;
  name: string;
}

interface Partner {
  id: number;
  name: string;
  category: string;
  description: string;
}

interface PartnerGridProps {
  partners: Partner[];
  categories: PartnerCategory[];
}

const PartnerGrid: React.FC<PartnerGridProps> = ({ partners, categories }) => {
  if (partners.length === 0) {
    return (
      <div className="col-span-3 text-center py-12">
        <p className="text-vip-gray-500">Aucun prestataire ne correspond à votre recherche.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {partners.map((partner) => (
        <PartnerCardSimple 
          key={partner.id} 
          partner={partner} 
          categoryName={categories.find(c => c.id === partner.category)?.name || ''} 
        />
      ))}
    </div>
  );
};

export default PartnerGrid;
