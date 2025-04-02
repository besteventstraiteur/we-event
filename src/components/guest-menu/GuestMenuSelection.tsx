
import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import MenuOptionCard from './MenuOptionCard';

const GuestMenuSelection: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string>('');
  const { toast } = useToast();

  const menuChoices = [
    { id: 'standard', name: 'Menu Standard', description: 'Notre menu traditionnel avec des options variées.' },
    { id: 'vegetarien', name: 'Menu Végétarien', description: 'Options sans viande, à base de légumes frais et protéines végétales.' },
    { id: 'allergies', name: 'Menu Allergies', description: 'Adapté pour les personnes ayant des allergies alimentaires courantes.' },
    { id: 'enfant', name: 'Menu Enfant', description: 'Spécialement conçu pour les plus jeunes invités.' },
  ];

  const handleMenuSelect = (menuId: string) => {
    setSelectedMenu(menuId);
  };

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
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

    // In a real app, we would call an API to save the menu choice
    console.log(`Selected menu: ${selectedMenu}, option: ${selectedOption}`);
    
    // Show success message
    toast({
      title: "Menu sélectionné",
      description: "Votre choix de menu a été enregistré avec succès",
    });

    // Notify the parent component
    if (window.location.pathname.includes('/guest/menu/')) {
      const parentComponent = document.querySelector('.menu-selection-container');
      if (parentComponent) {
        const event = new CustomEvent('menuSubmitted', { 
          detail: { menuChoice: selectedMenu, menuOption: selectedOption }
        });
        parentComponent.dispatchEvent(event);
      }
    }
  };

  return (
    <div className="space-y-8 menu-selection-container">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">Sélectionnez votre menu</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {menuChoices.map((menu) => (
            <MenuOptionCard
              key={menu.id}
              option={{
                id: menu.id,
                name: menu.name,
                description: menu.description,
                type: 'main'
              }}
              isSelected={selectedMenu === menu.id}
              onSelect={handleMenuSelect}
              type="main"
            />
          ))}
        </div>
      </div>

      {selectedMenu && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Options supplémentaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MenuOptionCard
              option={{
                id: "starter",
                name: "Option entrée",
                description: "Ajouter une entrée à votre menu",
                type: 'starter'
              }}
              isSelected={selectedOption === 'starter'}
              onSelect={handleOptionSelect}
              type="starter"
            />
            <MenuOptionCard
              option={{
                id: "dessert",
                name: "Option dessert",
                description: "Ajouter un dessert spécial à votre menu",
                type: 'dessert'
              }}
              isSelected={selectedOption === 'dessert'}
              onSelect={handleOptionSelect}
              type="dessert"
            />
          </div>
        </div>
      )}

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
