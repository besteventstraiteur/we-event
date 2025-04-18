
import React from "react";
import ContactContent from "@/components/contact/ContactContent";
import ContactFooter from "@/components/contact/ContactFooter";
import HomeHeader from "@/components/home/HomeHeader";
import MobileOptimizedLayout from "@/components/layouts/MobileOptimizedLayout";
import { useDeviceType } from "@/hooks/use-mobile";
import MetaTags from "@/components/seo/MetaTags";

const ContactPage = () => {
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';
  
  return (
    <MobileOptimizedLayout fullHeight={true}>
      <div className="min-h-screen bg-white flex flex-col">
        <MetaTags
          title="Contactez-nous"
          description="Prenez contact avec l'équipe WeEvent pour toute question concernant l'organisation de votre mariage ou la planification d'événements."
        />
        <HomeHeader />
        <main className={`flex-1 container ${isMobile ? 'py-3 px-3' : 'py-12 bg-white'}`}>
          <ContactContent />
        </main>
        <ContactFooter />
      </div>
    </MobileOptimizedLayout>
  );
};

export default ContactPage;
