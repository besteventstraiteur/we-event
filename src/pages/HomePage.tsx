
import React from "react";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import GoldButton from "@/components/GoldButton";
import PresentationSection from "@/components/home/PresentationSection";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileOptimizedLayout from "@/components/layouts/MobileOptimizedLayout";

const HomePage = () => {
  const isMobile = useIsMobile();

  return (
    <MobileOptimizedLayout fullHeight={true}>
      <div className="min-h-screen bg-white flex flex-col">
        <header className="border-b border-vip-gray-200 py-4">
          <div className="container flex items-center justify-between">
            <Link to="/">
              <Logo size={isMobile ? "small" : "medium"} />
            </Link>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link to="/partners" className="text-vip-gray-700 hover:text-vip-gold text-sm sm:text-base">
                Nos Prestataires
              </Link>
              <Link to="/login">
                <GoldButton variant="outline" size={isMobile ? "xs" : "sm"}>
                  Connexion
                </GoldButton>
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 container py-8 sm:py-12">
          <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-8 text-vip-gold">Bienvenue sur Best Events VIP</h1>
            <p className="text-vip-gray-700 mb-6 sm:mb-8 text-sm sm:text-base">
              La plateforme exclusive qui connecte clients VIP et prestataires événementiels de prestige.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8">
              <Link to="/register-client" className="w-full sm:w-auto">
                <GoldButton size={isMobile ? "sm" : "lg"} className="w-full sm:w-auto">
                  Devenir client VIP
                </GoldButton>
              </Link>
              <Link to="/register-partner" className="w-full sm:w-auto">
                <GoldButton variant="outline" size={isMobile ? "sm" : "lg"} className="w-full sm:w-auto">
                  Devenir prestataire
                </GoldButton>
              </Link>
            </div>
          </div>
          
          <PresentationSection />
            
          <div className="mt-8 sm:mt-12 text-center">
            <Link to="/partners">
              <GoldButton variant="outline" size={isMobile ? "sm" : "default"}>
                Découvrir nos prestataires
              </GoldButton>
            </Link>
          </div>
        </main>

        <footer className="py-6 sm:py-8 border-t border-vip-gray-200">
          <div className="container">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <Link to="/">
                <Logo size="small" />
              </Link>
              <p className="text-vip-gray-500 text-xs sm:text-sm">
                © {new Date().getFullYear()} Best Events VIP. Tous droits réservés.
              </p>
              {isMobile ? (
                <div className="grid grid-cols-2 gap-3 text-center">
                  <Link to="/partners" className="text-vip-gray-600 hover:text-vip-gold text-xs">
                    Nos Prestataires
                  </Link>
                  <Link to="/privacy" className="text-vip-gray-600 hover:text-vip-gold text-xs">
                    Confidentialité
                  </Link>
                  <Link to="/terms" className="text-vip-gray-600 hover:text-vip-gold text-xs">
                    Conditions
                  </Link>
                  <Link to="/contact" className="text-vip-gray-600 hover:text-vip-gold text-xs">
                    Contact
                  </Link>
                </div>
              ) : (
                <div className="flex gap-4">
                  <Link to="/partners" className="text-vip-gray-600 hover:text-vip-gold text-sm">
                    Nos Prestataires
                  </Link>
                  <Link to="/privacy" className="text-vip-gray-600 hover:text-vip-gold text-sm">
                    Politique de confidentialité
                  </Link>
                  <Link to="/terms" className="text-vip-gray-600 hover:text-vip-gold text-sm">
                    Conditions d'utilisation
                  </Link>
                  <Link to="/contact" className="text-vip-gray-600 hover:text-vip-gold text-sm">
                    Contact
                  </Link>
                </div>
              )}
            </div>
          </div>
        </footer>
      </div>
    </MobileOptimizedLayout>
  );
};

export default HomePage;
