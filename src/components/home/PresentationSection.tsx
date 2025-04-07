
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import VideoPresentation from "@/components/video-presentation/VideoPresentation";
import { useIsMobile } from "@/hooks/use-mobile";

interface PresentationSectionProps {}

const PresentationSection: React.FC<PresentationSectionProps> = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  return (
    <section className="py-12 bg-we-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="max-w-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-we-green mb-4">
              Découvrez la plateforme We Event
            </h2>
            <p className="text-we-gray-700 mb-6">
              Notre plateforme offre des outils puissants pour planifier, organiser et 
              gérer vos événements en toute simplicité.
            </p>
            <VideoPresentation buttonText="Voir la présentation" />
          </div>
          <div className="w-full md:w-1/2">
            <img
              src="/images/platform-preview.jpg"
              alt="Aperçu de la plateforme"
              className="rounded-lg shadow-md"
              onError={(e) => {
                e.currentTarget.src = 'https://placehold.co/600x400?text=We+Event+Platform';
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PresentationSection;
