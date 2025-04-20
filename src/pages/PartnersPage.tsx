
import React from "react";
import PartnersHeader from "@/components/partners/PartnersHeader";
import PartnersFooter from "@/components/partners/PartnersFooter";
import PartnersList from "@/components/partners/PartnersList";
import VIPPromotion from "@/components/partners/VIPPromotion";
import MobileOptimizedLayout from "@/components/layouts/MobileOptimizedLayout";
import HomeHeader from "@/components/home/HomeHeader";
import { useDeviceType } from "@/hooks/use-mobile";
import MetaTags from "@/components/seo/MetaTags";

const PartnersPage: React.FC = () => {
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';
  
  return (
    <MobileOptimizedLayout fullHeight={true}>
      <div className="min-h-screen bg-white flex flex-col">
        <MetaTags
          title="Nos Partenaires Événementiels"
          description="Découvrez notre sélection exclusive de prestataires pour vos événements. Trouvez les meilleurs professionnels pour faire de votre événement un moment inoubliable."
        />
        <HomeHeader />
        <main className={`flex-1 container ${isMobile ? 'py-3 px-3' : 'py-4 md:py-8'}`}>
          <PartnersList />
          <VIPPromotion />
        </main>
        <PartnersFooter />
      </div>
    </MobileOptimizedLayout>
  );
};

export default PartnersPage;
