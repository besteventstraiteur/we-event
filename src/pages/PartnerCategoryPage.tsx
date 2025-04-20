
import React from "react";
import { useParams } from "react-router-dom";
import PartnersHeader from "@/components/partners/PartnersHeader";
import PartnersFooter from "@/components/partners/PartnersFooter";
import VIPPromotion from "@/components/partners/VIPPromotion";
import MobileOptimizedLayout from "@/components/layouts/MobileOptimizedLayout";
import HomeHeader from "@/components/home/HomeHeader";
import { useDeviceType } from "@/hooks/use-mobile";
import MetaTags from "@/components/seo/MetaTags";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import PartnerGrid from "@/components/partners/PartnerGrid";

// Mock data for categories and partners - in a real application this would come from an API
const partnerCategories = [
  { id: "venues", name: "Lieux de réception" },
  { id: "catering", name: "Traiteurs & Restauration" },
  { id: "entertainment", name: "Animation & Musique" },
  { id: "decoration", name: "Décoration & Design" },
  { id: "photo-video", name: "Photo & Vidéo" },
  { id: "planners", name: "Services Événementiels" },
];

const mockPartners = [
  {
    id: 1,
    name: "Château des Fleurs",
    category: "venues",
    description: "Un lieu d'exception pour vos événements avec parc et salles de réception.",
  },
  {
    id: 2,
    name: "Délices Gourmets",
    category: "catering",
    description: "Traiteur haut de gamme proposant une cuisine raffinée et créative pour tous vos événements.",
  },
  {
    id: 3,
    name: "DJ Animation Pro",
    category: "entertainment",
    description: "Animation musicale professionnelle et personnalisée pour créer l'ambiance parfaite.",
  },
  {
    id: 4,
    name: "Déco Élégance",
    category: "decoration",
    description: "Décoration sur mesure pour sublimer votre événement avec style et raffinement.",
  },
  {
    id: 5,
    name: "Studio Mémorables",
    category: "photo-video",
    description: "Capturer les moments uniques de votre événement avec talent et créativité.",
  },
  {
    id: 6,
    name: "Event Planner Pro",
    category: "planners",
    description: "Organisation complète de votre événement de A à Z avec professionnalisme et expertise.",
  },
  {
    id: 7,
    name: "L'Orangerie",
    category: "venues",
    description: "Espace modulable avec vue panoramique, idéal pour les réceptions élégantes.",
  },
  {
    id: 8,
    name: "Saveurs & Traditions",
    category: "catering",
    description: "Cuisine traditionnelle revisitée, mettant en valeur les produits locaux et de saison.",
  },
];

const PartnerCategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';
  
  // Find the current category
  const currentCategory = partnerCategories.find(cat => cat.id === categoryId);
  
  // Filter partners by category
  const filteredPartners = mockPartners.filter(partner => partner.category === categoryId);
  
  // Get title and description based on category
  const getMetaTitle = () => {
    return currentCategory ? `${currentCategory.name} | We Event` : "Prestataires | We Event";
  };
  
  const getMetaDescription = () => {
    switch (categoryId) {
      case "venues":
        return "Découvrez notre sélection de lieux de réception pour vos événements. Salles, châteaux, domaines et espaces atypiques pour tous types d'occasions.";
      case "catering":
        return "Explorez nos prestataires de restauration pour vos événements. Traiteurs, chefs à domicile et services de cocktail pour tous budgets.";
      case "entertainment":
        return "Trouvez les meilleurs animateurs et musiciens pour votre événement. DJs, groupes live et animations pour créer une ambiance mémorable.";
      case "decoration":
        return "Sélection de décorateurs et designers pour sublimer votre événement. Créations florales, scénographie et éléments décoratifs personnalisés.";
      case "photo-video":
        return "Découvrez nos photographes et vidéastes professionnels pour immortaliser vos moments précieux avec talent et créativité.";
      case "planners":
        return "Faites appel à nos wedding planners et organisateurs d'événements pour une coordination parfaite de votre projet du début à la fin.";
      default:
        return "Découvrez notre sélection exclusive de prestataires pour vos événements. Trouvez les meilleurs professionnels pour faire de votre événement un moment inoubliable.";
    }
  };

  return (
    <MobileOptimizedLayout fullHeight={true}>
      <div className="min-h-screen bg-white flex flex-col">
        <MetaTags
          title={getMetaTitle()}
          description={getMetaDescription()}
        />
        <HomeHeader />
        <main className={`flex-1 container ${isMobile ? 'py-3 px-3' : 'py-4 md:py-8'}`}>
          <div className="mb-6">
            <Link to="/partners" className="inline-flex items-center text-gray-600 hover:text-gray-900">
              <ChevronLeft size={18} />
              <span>Retour à toutes les catégories</span>
            </Link>
          </div>
          
          <h1 className="text-3xl font-serif text-we-green mb-6">
            {currentCategory ? currentCategory.name : "Prestataires"}
          </h1>
          
          {filteredPartners.length > 0 ? (
            <PartnerGrid partners={filteredPartners} categories={partnerCategories} />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">Aucun prestataire trouvé dans cette catégorie.</p>
              <Link to="/partners">
                <Button className="bg-we-gold hover:bg-we-gold/90 text-black">
                  Voir toutes les catégories
                </Button>
              </Link>
            </div>
          )}
          
          <VIPPromotion />
        </main>
        <PartnersFooter />
      </div>
    </MobileOptimizedLayout>
  );
};

export default PartnerCategoryPage;
