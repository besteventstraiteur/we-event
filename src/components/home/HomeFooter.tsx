
import React from "react";
import { Link } from "react-router-dom";
import WeEventLogo from "@/components/WeEventLogo";
import { useLanguage } from "@/contexts/LanguageContext";

interface HomeFooterProps {}

const HomeFooter: React.FC<HomeFooterProps> = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-we-beige bg-white">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/">
            <WeEventLogo size="small" />
          </Link>
          <p className="text-we-gray-500 text-sm">
            {t('home.footer.copyright').replace('{year}', currentYear.toString())}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
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
  );
};

export default HomeFooter;
