
import { useState, useEffect } from "react";
import { PartnerProfile, PartnerImage } from "@/models/partnerProfile";
import { useToast } from "@/hooks/use-toast";

// Exemple de données pour la démo
const mockProfile: PartnerProfile = {
  id: "1",
  name: "Best Events Traiteur",
  category: "Traiteur",
  description: "Notre service de traiteur offre une cuisine raffinée avec des ingrédients locaux et de saison. Nous proposons des menus personnalisés pour tous types d'événements.",
  shortDescription: "Service traiteur haut de gamme pour mariages et réceptions",
  pricing: {
    basePrice: "À partir de 45€ par personne",
    packages: [
      {
        id: "1",
        name: "Menu Classique",
        price: "45€ / personne",
        description: "Un repas complet avec entrée, plat et dessert",
        features: ["Entrée au choix", "Plat principal", "Dessert", "Eaux et softs inclus"]
      },
      {
        id: "2",
        name: "Menu Prestige",
        price: "65€ / personne",
        description: "Une expérience gastronomique complète",
        features: ["Amuse-bouches", "Entrée au choix", "Plat principal", "Fromages", "Dessert", "Boissons incluses"]
      }
    ]
  },
  contact: {
    email: "contact@best-events.com",
    phone: "01 23 45 67 89",
    website: "www.best-events.com",
    address: "123 Avenue des Champs-Élysées, 75008 Paris"
  },
  images: [
    {
      id: "1",
      url: "/placeholder.svg",
      alt: "Logo Best Events",
      type: "logo",
      featured: true,
    },
    {
      id: "2",
      url: "/placeholder.svg",
      alt: "Plat signature",
      type: "gallery",
      order: 1
    },
    {
      id: "3",
      url: "/placeholder.svg",
      alt: "Décoration de table",
      type: "gallery",
      order: 2
    }
  ],
  discount: "25%",
  services: [
    "Menu personnalisé",
    "Service à table",
    "Menu dégustation offert",
    "Gestion des allergies alimentaires",
    "Options végétariennes/veganes"
  ],
  availability: ["2023-06-01", "2023-06-15", "2023-06-30"]
};

export function usePartnerProfile() {
  const [profile, setProfile] = useState<PartnerProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProfile = () => {
      // Simulation d'un appel API
      setTimeout(() => {
        // Récupérer depuis le localStorage ou utiliser les données mockées
        const savedProfile = localStorage.getItem('partnerProfile');
        if (savedProfile) {
          setProfile(JSON.parse(savedProfile));
        } else {
          setProfile(mockProfile);
        }
        setIsLoading(false);
      }, 500);
    };

    fetchProfile();
  }, []);

  const updateProfile = (updatedProfile: Partial<PartnerProfile>) => {
    setProfile(prev => {
      if (!prev) return mockProfile;
      const updated = { ...prev, ...updatedProfile };
      // Enregistrer dans le localStorage pour la persistance
      localStorage.setItem('partnerProfile', JSON.stringify(updated));
      return updated;
    });
    
    console.log("Profil mis à jour:", updatedProfile);
    
    // Dans une vraie application, vous feriez un appel API ici
  };

  const updateProfileImage = async (file: File, type: 'profile' | 'gallery' | 'logo' | 'background'): Promise<PartnerImage> => {
    // Simuler le traitement et l'optimisation d'une image
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        // Dans une vraie application, vous enverriez le fichier à un serveur
        // qui l'optimiserait et renverrait l'URL
        const newImage: PartnerImage = {
          id: `img_${Date.now()}`,
          url: e.target?.result as string,
          type: type,
          alt: file.name,
          order: type === 'gallery' ? (profile?.images.filter(img => img.type === 'gallery').length || 0) + 1 : undefined,
          featured: type === 'profile'
        };

        setProfile(prev => {
          if (!prev) return null;
          
          // Filter out any existing featured image of the same type if this is a featured image
          let updatedImages = prev.images.filter(img => 
            !(img.type === type && newImage.featured && img.featured)
          );
          
          updatedImages = [...updatedImages, newImage];
          const updated = { ...prev, images: updatedImages };
          localStorage.setItem('partnerProfile', JSON.stringify(updated));
          return updated;
        });

        toast({
          title: "Image téléchargée",
          description: "Votre image a été optimisée et ajoutée à votre profil."
        });

        resolve(newImage);
      };
      
      // Simuler un délai pour l'optimisation
      setTimeout(() => {
        reader.readAsDataURL(file);
      }, 1000);
    });
  };

  const removeProfileImage = (imageId: string) => {
    setProfile(prev => {
      if (!prev) return null;
      const updated = { 
        ...prev, 
        images: prev.images.filter(img => img.id !== imageId) 
      };
      localStorage.setItem('partnerProfile', JSON.stringify(updated));
      return updated;
    });
  };

  return {
    profile,
    isLoading,
    updateProfile,
    updateProfileImage,
    removeProfileImage
  };
}
