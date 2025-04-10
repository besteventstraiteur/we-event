
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import GoldButton from "@/components/GoldButton";
import { useLanguage } from "@/contexts/LanguageContext";

interface Partner {
  id: number;
  name: string;
  category: string;
  description: string;
}

interface PartnerCardSimpleProps {
  partner: Partner;
  categoryName: string;
}

const PartnerCardSimple: React.FC<PartnerCardSimpleProps> = ({ partner, categoryName }) => {
  const { t } = useLanguage();
  
  return (
    <Card className="overflow-hidden border-vip-gray-300">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-vip-black">{partner.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-vip-gray-600">
                {categoryName}
              </span>
            </div>
          </div>
          <div className="flex-shrink-0 w-12 h-12 bg-vip-gray-200 rounded-full flex items-center justify-center text-vip-gold font-bold border border-vip-gray-300">
            {partner.name.charAt(0)}
          </div>
        </div>
        <p className="mt-4 text-vip-gray-600 text-sm line-clamp-3">{partner.description}</p>
        <div className="mt-4 flex justify-end">
          <Link to="/login">
            <GoldButton>
              {t('partners.seeDetails')}
            </GoldButton>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default PartnerCardSimple;
