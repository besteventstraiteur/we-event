
import React, { useState } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { MenuOption } from '@/hooks/useGuestMenu';

import MenuConfirmation from './MenuConfirmation';
import MainMenuOptions from './MainMenuOptions';
import AdditionalOptions from './AdditionalOptions';
import AllergiesSection from './AllergiesSection';

const GuestMenuSelection: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [allergies, setAllergies] = useState<string[]>([]);
  const [otherAllergy, setOtherAllergy] = useState<string>('');
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const { toast } = useToast();

  const menuChoices: MenuOption[] = [
    { id: 'standard', name: 'Menu Standard', description: 'Notre menu traditionnel avec des options variées.', type: 'main' },
    { id: 'vegetarien', name: 'Menu Végétarien', description: 'Options sans viande, à base de légumes frais et protéines végétales.', type: 'main' },
    { id: 'allergies', name: 'Menu Allergies', description: 'Adapté pour les personnes ayant des allergies alimentaires courantes.', type: 'main' },
    { id: 'enfant', name: 'Menu Enfant', description: 'Spécialement conçu pour les plus jeunes invités.', type: 'main' },
  ];

  const handleMenuSelect = (menuId: string) => {
    setSelectedMenu(menuId);
    setIsConfirmed(false);
  };

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    setIsConfirmed(false);
  };

  const handleAllergyToggle = (allergyId: string) => {
    setAllergies(prev => 
      prev.includes(allergyId) 
        ? prev.filter(a => a !== allergyId) 
        : [...prev, allergyId]
    );
    setIsConfirmed(false);
  };

  const handleSubmit = () => {
    if (!selectedMenu) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un menu",
        variant: "destructive",
      });
      return;
    }

    // Collect all allergies including custom ones
    const allAllergies = [...allergies];
    if (otherAllergy.trim()) {
      allAllergies.push(otherAllergy.trim());
    }

    // In a real app, we would call an API to save the menu choice
    console.log(`Selected menu: ${selectedMenu}, option: ${selectedOption}, allergies: ${allAllergies.join(', ')}`);
    
    // Show success message
    toast({
      title: "Menu sélectionné",
      description: "Votre choix de menu a été enregistré avec succès",
    });

    setIsConfirmed(true);

    // Notify the parent component
    if (window.location.pathname.includes('/guest/menu/')) {
      const parentComponent = document.querySelector('.menu-selection-container');
      if (parentComponent) {
        const event = new CustomEvent('menuSubmitted', { 
          detail: { 
            menuChoice: selectedMenu, 
            menuOption: selectedOption,
            allergies: allAllergies
          }
        });
        parentComponent.dispatchEvent(event);
      }
    }
  };

  return (
    <div className="space-y-8 menu-selection-container">
      <MenuConfirmation 
        isConfirmed={isConfirmed}
        selectedMenu={selectedMenu}
        selectedOption={selectedOption}
        allergies={allergies}
        menuChoices={menuChoices}
      />

      <MainMenuOptions 
        menuChoices={menuChoices}
        selectedMenu={selectedMenu}
        onMenuSelect={handleMenuSelect}
      />

      <AdditionalOptions 
        selectedMenu={selectedMenu}
        selectedOption={selectedOption}
        onOptionSelect={handleOptionSelect}
      />

      <AllergiesSection 
        selectedMenu={selectedMenu}
        allergies={allergies}
        otherAllergy={otherAllergy}
        onAllergyToggle={handleAllergyToggle}
        onOtherAllergyChange={setOtherAllergy}
      />

      <div className="flex justify-end">
        <Button 
          onClick={handleSubmit}
          className="bg-vip-gold hover:bg-vip-gold/90 text-white"
          disabled={!selectedMenu}
        >
          <CheckCircle className="mr-2 h-4 w-4" />
          Confirmer mon choix
        </Button>
      </div>
    </div>
  );
};

export default GuestMenuSelection;
