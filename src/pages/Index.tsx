
import React from "react";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import GoldButton from "@/components/GoldButton";
import VideoPresentation from "@/components/video-presentation/VideoPresentation";
import PresentationSection from "@/components/home/PresentationSection";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="border-b border-we-gray-200 py-4">
        <div className="container flex items-center justify-between">
          <Link to="/">
            <Logo />
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-we-gold font-semibold">{t('common.home')}</Link>
            <Link to="/partners" className="text-we-gray-700 hover:text-we-gold">{t('common.partners')}</Link>
            <Link to="/contact" className="text-we-gray-700 hover:text-we-gold">{t('common.contact')}</Link>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <Link to="/login">
              <GoldButton variant="outline" size="sm">
                {t('common.login')}
              </GoldButton>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-8 text-we-gold">{t('common.welcome')}</h1>
          <p className="text-we-gray-700 mb-8">
            {t('home.heroSubtitle')}
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
            <Link to="/register-client">
              <GoldButton size="lg">
                {t('home.becomeClient')}
              </GoldButton>
            </Link>
            <Link to="/register-partner">
              <GoldButton variant="outline" size="lg">
                {t('home.becomePartner')}
              </GoldButton>
            </Link>
          </div>
          
          <div className="mt-8 mb-8 flex justify-center">
            <VideoPresentation buttonText={t('home.discoverFeatures')} />
          </div>
        </div>
        
        {/* Ajout de la section de présentation vidéo/fonctionnement */}
        <div className="mt-16">
          <PresentationSection />
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/partners">
            <GoldButton variant="outline">
              {t('home.explorePartners')}
            </GoldButton>
          </Link>
        </div>
      </main>

      <footer className="py-8 border-t border-we-gray-200">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Link to="/">
              <Logo />
            </Link>
            <p className="text-we-gray-500 text-sm">
              {t('home.footer.copyright')}
            </p>
            <div className="flex gap-4">
              <Link to="/partners" className="text-we-gray-600 hover:text-we-gold text-sm">
                {t('common.partners')}
              </Link>
              <Link to="/privacy" className="text-we-gray-600 hover:text-we-gold text-sm">
                {t('home.footer.privacy')}
              </Link>
              <Link to="/terms" className="text-we-gray-600 hover:text-we-gold text-sm">
                {t('home.footer.terms')}
              </Link>
              <Link to="/contact" className="text-we-gray-600 hover:text-we-gold text-sm">
                {t('common.contact')}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
