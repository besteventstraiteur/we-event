
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
        <Link 
          to="/" 
          aria-label="Accueil"
          className="focus:outline-none focus:ring-2 focus:ring-we-gold focus:ring-offset-2 rounded"
        >
          <Logo size={isMobile ? "small" : "medium"} />
        </Link>

        <div 
          className="flex items-center gap-4"
          role="menubar"
          aria-label="Menu principal"
        >
          <Link 
            to="/partners"
            role="menuitem"
          >
            <Button 
              variant="ghost" 
              className="text-gray-600 focus:ring-2 focus:ring-we-gold focus:ring-offset-2"
              aria-label="Voir nos partenaires"
            >
              Partenaires
            </Button>
          </Link>
          <Link 
            to="/contact"
            role="menuitem"
          >
            <Button 
              variant="ghost" 
              className="text-gray-600 focus:ring-2 focus:ring-we-gold focus:ring-offset-2"
              aria-label="Contactez-nous"
            >
              Contact
            </Button>
          </Link>
          <Link 
            to="/login"
            role="menuitem"
          >
            <Button 
              className="bg-vip-gold hover:bg-vip-gold/90 text-white focus:ring-2 focus:ring-we-gold focus:ring-offset-2"
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
