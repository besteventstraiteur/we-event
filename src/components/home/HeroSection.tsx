
import React from "react";
import { Link } from "react-router-dom";
import WeEventButton from "@/components/WeEventButton";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section className="w-full bg-gradient-to-b from-we-beige/30 to-white py-12 md:py-20">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-we-green mb-6">
            {t('common.welcome')}
          </h1>
          <p className="text-we-gray-700 text-lg md:text-xl mb-8">
            {t('home.heroSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register-client">
              <WeEventButton size="lg">{t('home.becomeClient')}</WeEventButton>
            </Link>
            <Link to="/register-partner">
              <WeEventButton variant="outline" size="lg">{t('home.becomePartner')}</WeEventButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
