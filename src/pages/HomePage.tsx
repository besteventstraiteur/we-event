
import React from 'react';
import MetaTags from '@/components/seo/MetaTags';
import HeroSection from '@/components/home/HeroSection';
import PresentationSection from '@/components/home/PresentationSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import HomeHeader from '@/components/home/HomeHeader';
import HomeFooter from '@/components/home/HomeFooter';

const HomePage: React.FC = () => {
  return (
    <>
      <MetaTags
        title="Planifiez votre mariage de rêve"
        description="WeEvent est la plateforme tout-en-un pour organiser votre mariage. Trouvez les meilleurs prestataires, gérez vos invités et créez un événement inoubliable."
      />
      <HomeHeader />
      <main>
        <HeroSection />
        <PresentationSection />
        <TestimonialsSection />
      </main>
      <HomeFooter />
    </>
  );
};

export default HomePage;
