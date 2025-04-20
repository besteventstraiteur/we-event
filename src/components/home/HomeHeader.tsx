
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { getRedirectPathForRole } from '@/hooks/auth/utils/redirectUtils';

const HomeHeader: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  
  const getDashboardLink = () => {
    if (!user) return "/client/dashboard";
    
    const role = user.role || 
                user.user_metadata?.role || 
                'client';
                
    return getRedirectPathForRole(role);
  };

  return (
    <header className="bg-white/75 backdrop-blur-md shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-gray-900">
              <span className="text-yellow-500">We</span>
              <span>Event</span>
            </span>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/partners" className="text-gray-700 hover:text-yellow-500 transition-colors">
              Prestataires
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-yellow-500 transition-colors">
              À propos
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-yellow-500 transition-colors">
              Contact
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <Link to={getDashboardLink()}>
                <Button variant="default" className="bg-yellow-500 hover:bg-yellow-600">
                  Mon espace
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-yellow-500 transition-colors">
                  Se connecter
                </Link>
                <Link to="/register-client">
                  <Button variant="default" className="bg-yellow-500 hover:bg-yellow-600">
                    S'inscrire
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
