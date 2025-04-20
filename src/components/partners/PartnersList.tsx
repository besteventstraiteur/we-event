
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import PartnersSearch from './PartnersSearch';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

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

const PartnersList: React.FC<PartnersListProps> = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif text-we-green mb-4">
            Nos Prestataires Événementiels
          </h2>
          <p className="text-gray-600 mb-8">
            Découvrez notre sélection de professionnels pour tous types d'événements
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-2xl mx-auto mb-12">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="search"
                placeholder="Rechercher un prestataire..."
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Toutes les catégories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                <SelectItem value="venues">Lieux de réception</SelectItem>
                <SelectItem value="catering">Traiteurs & Restauration</SelectItem>
                <SelectItem value="entertainment">Animation & Musique</SelectItem>
                <SelectItem value="decoration">Décoration & Design</SelectItem>
                <SelectItem value="photo-video">Photo & Vidéo</SelectItem>
                <SelectItem value="planners">Services Événementiels</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
