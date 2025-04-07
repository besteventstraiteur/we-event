
import React from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import WeEventButton from "@/components/WeEventButton";
import VideoPresentation from "@/components/video-presentation/VideoPresentation";
import { useIsMobile } from "@/hooks/use-mobile";

const HeroSection: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className="relative py-12 sm:py-20 bg-gradient-to-b from-we-beige/40 to-we-white text-center">
      <div className="container max-w-4xl mx-auto px-4">
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl mb-4 text-we-green">
          Créez des <span className="text-we-gold">événements</span> d'exception
        </h1>
        <p className="font-body text-we-gray-700 mb-8 max-w-2xl mx-auto">
          La plateforme qui connecte les clients avec les meilleurs prestataires pour des événements inoubliables
        </p>
        
        <div className="relative max-w-2xl mx-auto mb-10">
          <div className="flex items-center bg-white rounded-lg shadow-sm border border-we-gray-200 overflow-hidden">
            <Search className="ml-4 text-we-gray-500" size={20} />
            <input 
              type="text"
              placeholder="Rechercher un prestataire, un lieu..."
              className="w-full py-3 px-4 outline-none text-we-gray-700 bg-transparent"
            />
            <button className="px-6 py-3 bg-we-gold text-white font-medium hover:bg-we-gold/90">
              Rechercher
            </button>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link to="/register-client" className="w-full sm:w-auto">
            <WeEventButton size={isMobile ? "sm" : "lg"} className="w-full sm:w-auto">
              Je crée mon événement
            </WeEventButton>
          </Link>
          <Link to="/register-partner" className="w-full sm:w-auto">
            <WeEventButton variant="outline" size={isMobile ? "sm" : "lg"} className="w-full sm:w-auto">
              Devenir prestataire
            </WeEventButton>
          </Link>
        </div>
        
        <div className="mt-8 mb-8 flex justify-center">
          <VideoPresentation buttonText="Découvrir toutes les fonctionnalités" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
