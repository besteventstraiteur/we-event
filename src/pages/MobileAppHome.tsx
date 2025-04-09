
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MobileOptimizedLayout from "@/components/layouts/MobileOptimizedLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import WeEventLogo from "@/components/WeEventLogo";

const MobileAppHome: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  // Vérifier si l'utilisateur est déjà connecté au démarrage
  useEffect(() => {
    const checkLoginStatus = async () => {
      const isLoggedIn = localStorage.getItem('userLoggedIn');
      if (isLoggedIn === 'true') {
        const userType = localStorage.getItem('userType') || 'client';
        navigateToUserDashboard(userType);
      }
    };
    
    checkLoginStatus();
  }, []);
  
  const navigateToUserDashboard = (userType: string) => {
    switch (userType) {
      case 'client':
        navigate('/client/dashboard');
        break;
      case 'partner':
        navigate('/partner/dashboard');
        break;
      case 'admin':
        navigate('/admin/dashboard');
        break;
      case 'guest':
        navigate('/guest');
        break;
      default:
        navigate('/login');
    }
  };
  
  return (
    <MobileOptimizedLayout fullHeight={true}>
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
        <div className="w-full max-w-md space-y-8 text-center">
          <div className="flex justify-center mb-8">
            <WeEventLogo size="large" />
          </div>
          
          <h1 className="text-3xl font-bold text-we-gray-900">
            {t('mobile.welcome')}
          </h1>
          
          <p className="mt-2 text-we-gray-600">
            {t('mobile.tagline')}
          </p>
          
          <div className="mt-10 space-y-4">
            <Button 
              className="w-full h-12 bg-we-gold hover:bg-we-gold/90 text-white"
              onClick={() => navigate('/login')}
            >
              {t('common.login')}
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full h-12 border-we-gold text-we-gold hover:bg-we-gold/10"
              onClick={() => navigate('/register-client')}
            >
              {t('common.register')}
            </Button>
            
            <Button
              variant="ghost"
              className="w-full text-we-gray-500"
              onClick={() => navigate('/guest')}
            >
              {t('common.continueAsGuest')}
            </Button>
          </div>
          
          <div className="mt-8 text-sm text-we-gray-500">
            <p>{t('mobile.versionInfo')} 1.0.0</p>
          </div>
        </div>
      </div>
    </MobileOptimizedLayout>
  );
};

export default MobileAppHome;
