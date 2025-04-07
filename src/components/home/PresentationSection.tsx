
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import VideoPresentation from "@/components/video-presentation/VideoPresentation";
import { useIsMobile } from "@/hooks/use-mobile";

interface PresentationSectionProps {}

const PresentationSection: React.FC<PresentationSectionProps> = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="bg-vip-gray-100 rounded-2xl p-6 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-vip-gray-900">
            Découvrez votre nouveau compagnon d'organisation
          </h2>
          <p className="text-vip-gray-600 text-sm md:text-base">
            Best Events VIP simplifie chaque étape de l'organisation de votre événement avec des outils 
            innovants et une interface intuitive. Commencez par regarder notre présentation
            pour découvrir toutes les fonctionnalités.
          </p>
          <div className="pt-2">
            <button 
              className="flex items-center text-vip-gold hover:text-amber-600 transition-colors font-medium"
              onClick={() => setIsOpen(true)}
            >
              <span>Voir la présentation</span>
              <ArrowRight size={16} className="ml-2" />
            </button>
          </div>
        </div>
        
        <div className={`relative ${isMobile ? 'aspect-w-16 aspect-h-9' : ''}`}>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-vip-gray-200">
            <div className="aspect-w-16 aspect-h-9 relative">
              <img 
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80" 
                alt="Organisation d'événements" 
                className="object-cover w-full h-full rounded-t-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-center justify-center">
                <button 
                  onClick={() => setIsOpen(true)} 
                  className="bg-vip-gold hover:bg-amber-600 text-white rounded-full w-12 h-12 flex items-center justify-center transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-1">
                    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-4 bg-white">
              <h3 className="font-semibold text-vip-gray-900">Des événements inoubliables</h3>
              <p className="text-sm text-vip-gray-600">Voir la présentation complète de la plateforme</p>
            </div>
          </div>
        </div>
      </div>
      
      {isOpen && <VideoPresentation onClose={() => setIsOpen(false)} />}
    </div>
  );
};

export default PresentationSection;
