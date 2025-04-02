
import { useState, useEffect } from 'react';

export interface MenuOption {
  id: string;
  name: string;
  description: string;
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  image?: string;
  type: 'starter' | 'main' | 'dessert';
}

export interface MenuSelection {
  starter?: string;
  main?: string;
  dessert?: string;
  dietaryRestrictions?: string;
  allergies?: string[];
}

export const useGuestMenu = (guestId?: string) => {
  const [menuOptions, setMenuOptions] = useState<MenuOption[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<MenuSelection>({});
  const [allergies, setAllergies] = useState<string[]>([]);
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  
  // Simuler le chargement des options de menu
  useEffect(() => {
    // Dans une vraie application, ces données viendraient d'une API
    const mockMenuOptions: MenuOption[] = [
      {
        id: 'starter-1',
        name: 'Foie gras maison',
        description: 'Foie gras maison et sa compotée de figues',
        type: 'starter',
        image: 'https://images.unsplash.com/photo-1547424850-c2630bf78ac3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9pZSUyMGdyYXN8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'
      },
      {
        id: 'starter-2',
        name: 'Gravlax de saumon',
        description: 'Gravlax de saumon aux agrumes, crème à l\'aneth',
        type: 'starter',
        image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2FsbW9ufGVufDB8fDB8fA%3D%3D&w=1000&q=80'
      },
      {
        id: 'starter-3',
        name: 'Tarte fine aux légumes confits',
        description: 'Pesto de basilic et pignons de pin',
        isVegetarian: true,
        type: 'starter',
        image: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dmVnZXRhYmxlJTIwdGFydHxlbnwwfHwwfHw%3D&w=1000&q=80'
      },
      {
        id: 'main-1',
        name: 'Filet de bœuf Wellington',
        description: 'Sauce au porto, pommes duchesse et légumes de saison',
        type: 'main',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGJlZWZ8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'
      },
      {
        id: 'main-2',
        name: 'Pavé de bar rôti',
        description: 'Écrasé de pommes de terre à l\'huile d\'olive, émulsion au champagne',
        type: 'main',
        image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmlzaHxlbnwwfHwwfHw%3D&w=1000&q=80'
      },
      {
        id: 'main-3',
        name: 'Risotto aux champignons des bois',
        description: 'Copeaux de parmesan et truffe d\'été',
        isVegetarian: true,
        type: 'main',
        image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cmlzb3R0b3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'
      },
      {
        id: 'dessert-1',
        name: 'Pièce montée traditionnelle',
        description: 'Choux à la crème vanille-caramel',
        type: 'dessert',
        image: 'https://images.unsplash.com/photo-1464195244916-405fa0a82545?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y3JvcXVlbWJvdWNoZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'
      },
      {
        id: 'dessert-2',
        name: 'Assiette de fromages affinés',
        description: 'Sélection de fromages régionaux et pain aux noix',
        type: 'dessert',
        image: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2hlZXNlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80'
      },
      {
        id: 'dessert-3',
        name: 'Entremet chocolat-framboise',
        description: 'Mousse au chocolat noir et coulis de framboises fraîches',
        isGlutenFree: true,
        type: 'dessert',
        image: 'https://images.unsplash.com/photo-1505253468034-514d2507d914?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2hvY29sYXRlJTIwY2FrZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'
      },
    ];
    
    setMenuOptions(mockMenuOptions);
    
    // Dans une vraie application, charger les sélections précédentes si elles existent
    if (guestId) {
      // Simuler le chargement des choix précédents
      const savedSelections = localStorage.getItem(`guestMenu-${guestId}`);
      if (savedSelections) {
        try {
          const parsedSelections = JSON.parse(savedSelections);
          setSelectedOptions(parsedSelections);
          if (parsedSelections.allergies) setAllergies(parsedSelections.allergies);
          if (parsedSelections.dietaryRestrictions) setDietaryRestrictions(parsedSelections.dietaryRestrictions);
          setHasSubmitted(true);
        } catch (e) {
          console.error('Error loading saved menu selections:', e);
        }
      }
    }
  }, [guestId]);
  
  const selectOption = (id: string, type: 'starter' | 'main' | 'dessert') => {
    setSelectedOptions(prev => ({
      ...prev,
      [type]: id
    }));
  };
  
  const updateAllergies = (newAllergies: string[]) => {
    setAllergies(newAllergies);
    setSelectedOptions(prev => ({
      ...prev,
      allergies: newAllergies
    }));
  };
  
  const updateDietaryRestrictions = (restrictions: string) => {
    setDietaryRestrictions(restrictions);
    setSelectedOptions(prev => ({
      ...prev,
      dietaryRestrictions: restrictions
    }));
  };
  
  const submitMenuChoices = async () => {
    if (!guestId) return false;
    
    setIsSubmitting(true);
    
    try {
      // Dans une vraie application, envoyer les données à une API
      // Simuler une API call avec un délai
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Sauvegarder localement pour la démo
      localStorage.setItem(`guestMenu-${guestId}`, JSON.stringify(selectedOptions));
      
      setHasSubmitted(true);
      setIsSubmitting(false);
      return true;
    } catch (error) {
      console.error('Error submitting menu choices:', error);
      setIsSubmitting(false);
      return false;
    }
  };
  
  const isComplete = !!selectedOptions.starter && !!selectedOptions.main && !!selectedOptions.dessert;
  
  return {
    menuOptions,
    selectedOptions,
    allergies,
    dietaryRestrictions,
    isSubmitting,
    hasSubmitted,
    isComplete,
    selectOption,
    updateAllergies,
    updateDietaryRestrictions,
    submitMenuChoices
  };
};
