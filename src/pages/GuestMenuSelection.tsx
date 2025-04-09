
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Logo from '@/components/Logo';
import GuestMenuSelectionComponent from '@/components/guest-menu/GuestMenuSelection';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

const GuestMenuSelection: React.FC = () => {
  const { eventId, guestId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [menuSubmitted, setMenuSubmitted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleMenuSubmitted = () => {
      setMenuSubmitted(true);
    };

    const container = document.querySelector('.menu-selection-container');
    if (container) {
      container.addEventListener('menuSubmitted', handleMenuSubmitted);
    }

    return () => {
      if (container) {
        container.removeEventListener('menuSubmitted', handleMenuSubmitted);
      }
    };
  }, []);

  const handleBackToDashboard = () => {
    navigate(`/guest/${eventId}/${guestId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white p-4 shadow">
        <div className="container mx-auto flex justify-between items-center">
          <Logo size="medium" />
          <Button 
            variant="ghost" 
            onClick={handleBackToDashboard}
            className="text-gray-600"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('common.back')}
          </Button>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4 md:p-6 max-w-4xl">
        {menuSubmitted ? (
          <Card className="border-green-200 shadow-md">
            <CardHeader className="bg-green-50 pb-4">
              <div className="flex justify-center mb-2">
                <div className="bg-green-100 rounded-full p-2">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-center text-green-700">
                {t('guest.menuConfirmation')}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 text-center">
              <p className="text-gray-600 mb-4">
                {t('guest.menuThankYou')}
              </p>
              <Button 
                onClick={handleBackToDashboard}
                className="bg-vip-gold hover:bg-vip-gold/90 text-white"
              >
                {t('common.back')}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-center mb-6 text-vip-gold">{t('guest.menuSelection')}</h1>
            <p className="text-center text-gray-600 mb-8">
              {t('guest.menuDescription')}<br />
              <span className="text-sm">{t('guest.menuDeadlineInfo')}</span>
            </p>
            <GuestMenuSelectionComponent />
          </>
        )}
      </main>
    </div>
  );
};

export default GuestMenuSelection;
