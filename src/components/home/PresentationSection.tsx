
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import VideoPresentation from '@/components/video-presentation/VideoPresentation';

const PresentationSection: React.FC = () => {
  return (
    <Card className="border border-gray-200">
      <CardContent className="p-6 space-y-4">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-vip-gold">Découvrez Best Events VIP</h2>
          <p className="text-gray-600">
            Explorez les fonctionnalités de notre plateforme en suivant notre présentation interactive
          </p>
        </div>
        
        <div className="flex justify-center pt-2">
          <VideoPresentation />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-vip-gold mb-2">Pour les clients</h3>
            <p className="text-sm text-gray-600">
              Organisez votre événement de A à Z avec nos outils exclusifs et intuitifs.
            </p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-vip-gold mb-2">Pour les prestataires</h3>
            <p className="text-sm text-gray-600">
              Développez votre activité et connectez-vous avec une clientèle VIP exigeante.
            </p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-vip-gold mb-2">Pour les invités</h3>
            <p className="text-sm text-gray-600">
              Profitez d'un espace dédié pour consulter les informations et interagir avec l'événement.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PresentationSection;
