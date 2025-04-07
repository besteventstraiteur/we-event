
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, UserIcon, Briefcase } from "lucide-react";
import WeEventButton from "@/components/WeEventButton";
import VideoPresentation from "@/components/video-presentation/VideoPresentation";
import { useIsMobile } from "@/hooks/use-mobile";
import PlatformPresentation from "@/components/video-presentation/PlatformPresentation";

interface HeroSectionProps {}

const HeroSection: React.FC<HeroSectionProps> = () => {
  const isMobile = useIsMobile();
  const [showClientPresentation, setShowClientPresentation] = useState(false);
  const [showPartnerPresentation, setShowPartnerPresentation] = useState(false);
  
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
        
        <div className="mt-8 mb-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => setShowClientPresentation(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-we-green text-white rounded-lg hover:bg-we-green/90 transition-colors shadow-md"
          >
            <UserIcon size={isMobile ? 16 : 18} />
            <span>Fonctionnalités clients</span>
          </button>
          <button 
            onClick={() => setShowPartnerPresentation(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-we-gold text-white rounded-lg hover:bg-we-gold/90 transition-colors shadow-md"
          >
            <Briefcase size={isMobile ? 16 : 18} />
            <span>Fonctionnalités prestataires</span>
          </button>
        </div>
      </div>
      
      {/* Modal pour présentation client */}
      {showClientPresentation && (
        <ClientPresentation onClose={() => setShowClientPresentation(false)} />
      )}
      
      {/* Modal pour présentation prestataire */}
      {showPartnerPresentation && (
        <PartnerPresentation onClose={() => setShowPartnerPresentation(false)} />
      )}
    </section>
  );
};

// Composant pour la présentation client
const ClientPresentation: React.FC<{onClose: () => void}> = ({ onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Utilisation uniquement des slides client importés depuis client-slides.ts
  return (
    <PresentationDialog 
      open={true}
      title="Fonctionnalités pour les Clients"
      description="Découvrez notre plateforme dédiée à l'organisation de vos événements"
      onClose={onClose}
      clientOnly={true}
    />
  );
};

// Composant pour la présentation prestataire
const PartnerPresentation: React.FC<{onClose: () => void}> = ({ onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Utilisation uniquement des slides prestataire importés depuis partner-slides.ts
  return (
    <PresentationDialog 
      open={true}
      title="Fonctionnalités pour les Prestataires"
      description="Découvrez comment développer votre activité avec We Event"
      onClose={onClose}
      partnerOnly={true}
    />
  );
};

// Composant de dialogue de présentation personnalisé
const PresentationDialog: React.FC<{
  open: boolean;
  title: string;
  description: string;
  onClose: () => void;
  clientOnly?: boolean;
  partnerOnly?: boolean;
}> = ({ open, title, description, onClose, clientOnly, partnerOnly }) => {
  return (
    <PlatformPresentation 
      onClose={onClose} 
      title={title}
      description={description}
      clientOnly={clientOnly}
      partnerOnly={partnerOnly}
    />
  );
};

export default HeroSection;
