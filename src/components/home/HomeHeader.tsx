
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import WeEventLogo from '@/components/WeEventLogo';

const HomeHeader: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <header className="bg-white/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center">
            <WeEventLogo size="small" asButton={false} withText={true} />
          </Link>
          
          <nav className="flex items-center gap-8">
            <Link to="/partners" className="text-gray-600 hover:text-we-gold transition-colors">
              Partenaires
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-we-gold transition-colors">
              Contact
            </Link>
            {isAuthenticated ? (
              <Link to="/client/dashboard">
                <Button className="bg-we-gold hover:bg-we-gold/90 text-black">
                  Connexion
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button className="bg-we-gold hover:bg-we-gold/90 text-black">
                  Connexion
                </Button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
