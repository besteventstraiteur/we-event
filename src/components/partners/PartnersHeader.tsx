
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const PartnersHeader: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div>
      <h1 className="text-3xl font-bold">{t('partners.title')}</h1>
      <p className="text-vip-gray-600">
        {t('partners.subtitle')}
      </p>
    </div>
  );
};

export default PartnersHeader;
