
import React from "react";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import GoldButton from "@/components/GoldButton";
import VideoPresentation from "@/components/video-presentation/VideoPresentation";

const Index = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="border-b border-vip-gray-200 py-4">
        <div className="container flex items-center justify-between">
          <Link to="/">
            <Logo />
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/partners" className="text-vip-gray-700 hover:text-vip-gold">
              Nos Prestataires
            </Link>
            <Link to="/login">
              <GoldButton variant="outline" size="sm">
                Connexion
              </GoldButton>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-8 text-vip-gold">Bienvenue sur Best Events VIP</h1>
          <p className="text-vip-gray-700 mb-8">
            La plateforme exclusive qui connecte clients VIP et prestataires événementiels de prestige.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
            <Link to="/register-client">
              <GoldButton size="lg">
                Devenir client VIP
              </GoldButton>
            </Link>
            <Link to="/register-partner">
              <GoldButton variant="outline" size="lg">
                Devenir prestataire
              </GoldButton>
            </Link>
          </div>
          
          <div className="mt-8 mb-8 flex justify-center">
            <VideoPresentation buttonText="Découvrir toutes les fonctionnalités" />
          </div>
          
          <div className="mt-12">
            <Link to="/partners">
              <GoldButton variant="outline">
                Découvrir nos prestataires
              </GoldButton>
            </Link>
          </div>
        </div>
      </main>

      <footer className="py-8 border-t border-vip-gray-200">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Link to="/">
              <Logo />
            </Link>
            <p className="text-vip-gray-500 text-sm">
              © {new Date().getFullYear()} Best Events VIP. Tous droits réservés.
            </p>
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
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
