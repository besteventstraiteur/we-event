
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDeviceType } from "@/hooks/use-mobile";

const PartnersHeader: React.FC = () => {
  const { t } = useLanguage();
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';
  
  return (
    <div>
      <h1 className={`${isMobile ? 'text-2xl' : 'text-3xl'} font-bold`}>{t('partners.title')}</h1>
      <p className={`text-vip-gray-600 ${isMobile ? 'text-sm mt-1' : 'mt-2'}`}>
        {t('partners.subtitle')}
      </p>
    </div>
  );
};

export default PartnersHeader;
