
import React from "react";
import PartnersHeader from "@/components/partners/PartnersHeader";
import PartnersFooter from "@/components/partners/PartnersFooter";
import PartnersList from "@/components/partners/PartnersList";
import VIPPromotion from "@/components/partners/VIPPromotion";
import { partnerCategories, allPartners } from "@/components/partners/partnersData";
import MobileOptimizedLayout from "@/components/layouts/MobileOptimizedLayout";
import MobileNavigation from "@/components/mobile/MobileNavigation";
import { useDeviceType } from "@/hooks/use-mobile";
import { getDeviceType } from "@/utils/mobileDetection";

const PartnersPage: React.FC = () => {
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';
  const isRealMobileDevice = getDeviceType() === 'mobile';
  
  return (
    <MobileOptimizedLayout fullHeight={true}>
      <div className="min-h-screen bg-white flex flex-col">
        <PartnersHeader />

        <main className={`flex-1 container ${isMobile ? 'py-3 px-3' : 'py-4 md:py-8'}`}>
          <PartnersList partnerCategories={partnerCategories} allPartners={allPartners} />
          <VIPPromotion />
        </main>

        <PartnersFooter />
        
        {isRealMobileDevice && <MobileNavigation type="client" />}
      </div>
    </MobileOptimizedLayout>
  );
};

export default PartnersPage;
