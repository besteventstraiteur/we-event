
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useDeviceType } from '@/hooks/use-mobile';
import Logo from '@/components/Logo';

const HomeHeader: React.FC = () => {
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';

  return (
    <header 
      role="banner"
      className="bg-white shadow-sm"
      aria-label="En-tête principal"
    >
      <nav 
        role="navigation" 
        aria-label="Navigation principale"
        className="container mx-auto px-4 py-4 flex justify-between items-center"
      >
        <Link to="/" aria-label="Accueil">
          <Logo size={isMobile ? "small" : "medium"} />
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/partners">
            <Button 
              variant="ghost" 
              className="text-gray-600"
              aria-label="Voir nos partenaires"
            >
              Partenaires
            </Button>
          </Link>
          <Link to="/contact">
            <Button 
              variant="ghost" 
              className="text-gray-600"
              aria-label="Contactez-nous"
            >
              Contact
            </Button>
          </Link>
          <Link to="/login">
            <Button 
              className="bg-vip-gold hover:bg-vip-gold/90 text-white"
              aria-label="Connexion"
            >
              Connexion
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default HomeHeader;
