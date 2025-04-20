
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface PartnerCategoryProps {
  id: string;
  name: string;
}

interface PartnerProps {
  id: number;
  name: string;
  category: string;
  description: string;
}

interface PartnersListProps {
  partnerCategories?: PartnerCategoryProps[];
  allPartners?: PartnerProps[];
}

const PartnersList: React.FC<PartnersListProps> = ({ partnerCategories, allPartners }) => {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif text-we-green mb-4">Nos Prestataires Événementiels</h2>
          <p className="text-gray-600">
            Découvrez notre sélection de professionnels pour tous types d'événements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-3">Lieux de Réception</h3>
            <p className="text-gray-600 mb-4">
              Salles de mariage, espaces de séminaires, lieux atypiques pour tous vos événements
            </p>
            <Link to="/partners/venues">
              <Button className="w-full bg-we-gold hover:bg-we-gold/90 text-black">
                Découvrir
              </Button>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-3">Traiteurs & Restauration</h3>
            <p className="text-gray-600 mb-4">
              Cuisine gastronomique, buffets, cocktails pour tous types de réceptions
            </p>
            <Link to="/partners/catering">
              <Button className="w-full bg-we-gold hover:bg-we-gold/90 text-black">
                Découvrir
              </Button>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-3">Animation & Musique</h3>
            <p className="text-gray-600 mb-4">
              DJs, groupes live, animations pour tous vos événements festifs
            </p>
            <Link to="/partners/entertainment">
              <Button className="w-full bg-we-gold hover:bg-we-gold/90 text-black">
                Découvrir
              </Button>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-3">Décoration & Design</h3>
            <p className="text-gray-600 mb-4">
              Décorateurs, fleuristes, scénographes pour sublimer vos espaces
            </p>
            <Link to="/partners/decoration">
              <Button className="w-full bg-we-gold hover:bg-we-gold/90 text-black">
                Découvrir
              </Button>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-3">Photo & Vidéo</h3>
            <p className="text-gray-600 mb-4">
              Photographes et vidéastes professionnels pour immortaliser vos moments
            </p>
            <Link to="/partners/photo-video">
              <Button className="w-full bg-we-gold hover:bg-we-gold/90 text-black">
                Découvrir
              </Button>
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-3">Services Événementiels</h3>
            <p className="text-gray-600 mb-4">
              Wedding planners, coordinateurs, agences événementielles
            </p>
            <Link to="/partners/planners">
              <Button className="w-full bg-we-gold hover:bg-we-gold/90 text-black">
                Découvrir
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnersList;
