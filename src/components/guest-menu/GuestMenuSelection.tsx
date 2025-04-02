
import React, { useState } from 'react';
import { CheckCircle, Info, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import MenuOptionCard from './MenuOptionCard';
import { MenuOption } from '@/hooks/useGuestMenu';

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

  const commonAllergies = [
    { id: 'gluten', label: 'Gluten' },
    { id: 'arachides', label: 'Arachides' },
    { id: 'lactose', label: 'Lactose' },
    { id: 'fruits_mer', label: 'Fruits de mer' },
    { id: 'oeufs', label: 'Œufs' },
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
      {isConfirmed && (
        <Card className="bg-green-50 border-green-200">
          <div className="p-4 flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <h3 className="font-medium text-green-800">Choix confirmé</h3>
              <p className="text-green-700 text-sm mt-1">
                Vous avez sélectionné le {menuChoices.find(m => m.id === selectedMenu)?.name}
                {selectedOption && (
                  <> avec l'option {selectedOption === 'starter' ? 'entrée' : 'dessert'}</>
                )}
                {allergies.length > 0 && (
                  <> en tenant compte de vos allergies</>
                )}
              </p>
            </div>
          </div>
        </Card>
      )}

      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">Sélectionnez votre menu</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {menuChoices.map((menu) => (
            <MenuOptionCard
              key={menu.id}
              option={menu}
              isSelected={selectedMenu === menu.id}
              onSelect={handleMenuSelect}
              type={menu.type}
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
                type: "starter"
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
                type: "dessert"
              }}
              isSelected={selectedOption === 'dessert'}
              onSelect={handleOptionSelect}
              type="dessert"
            />
          </div>
        </div>
      )}

      {selectedMenu && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Allergies et restrictions alimentaires</h2>
          
          <Card className="border-amber-200 bg-amber-50">
            <div className="p-4 flex items-start gap-3">
              <Info className="h-5 w-5 text-amber-500 mt-0.5" />
              <div>
                <h3 className="font-medium text-amber-800">Information importante</h3>
                <p className="text-amber-700 text-sm mt-1">
                  Indiquez toutes vos allergies ou restrictions alimentaires pour que notre chef puisse adapter votre menu.
                </p>
              </div>
            </div>
          </Card>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {commonAllergies.map((allergy) => (
              <div key={allergy.id} className="flex items-center space-x-2">
                <Checkbox 
                  id={`allergy-${allergy.id}`} 
                  checked={allergies.includes(allergy.id)}
                  onCheckedChange={() => handleAllergyToggle(allergy.id)}
                />
                <label
                  htmlFor={`allergy-${allergy.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {allergy.label}
                </label>
              </div>
            ))}
          </div>
          
          <div className="space-y-2">
            <label htmlFor="otherAllergy" className="text-sm font-medium">
              Autres allergies ou restrictions (optionnel)
            </label>
            <Textarea
              id="otherAllergy"
              placeholder="Précisez vos autres allergies ou restrictions alimentaires..."
              value={otherAllergy}
              onChange={(e) => setOtherAllergy(e.target.value)}
              className="min-h-[80px]"
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
