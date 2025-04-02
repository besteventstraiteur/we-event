
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import MenuOptionCard from './MenuOptionCard';
import { useGuestMenu, MenuOption } from '@/hooks/useGuestMenu';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle } from 'lucide-react';

const GuestMenuSelection: React.FC = () => {
  const { eventId, guestId } = useParams<{ eventId: string; guestId: string }>();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>('starters');
  
  const {
    menuOptions,
    selectedOptions,
    dietaryRestrictions,
    isSubmitting,
    hasSubmitted,
    isComplete,
    selectOption,
    updateDietaryRestrictions,
    submitMenuChoices
  } = useGuestMenu(guestId);

  const handleSelectOption = (id: string, type: 'starter' | 'main' | 'dessert') => {
    selectOption(id, type);
    
    // Avancer automatiquement à l'onglet suivant
    if (type === 'starter' && activeTab === 'starters') {
      setActiveTab('mains');
    } else if (type === 'main' && activeTab === 'mains') {
      setActiveTab('desserts');
    } else if (type === 'dessert' && activeTab === 'desserts') {
      setActiveTab('allergies');
    }
  };

  const handleSubmit = async () => {
    if (!isComplete) {
      toast({
        variant: "destructive",
        title: "Sélection incomplète",
        description: "Veuillez sélectionner une option pour chaque service."
      });
      return;
    }

    const success = await submitMenuChoices();
    
    if (success) {
      toast({
        title: "Menu enregistré",
        description: "Vos choix de menu ont été enregistrés avec succès.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement de vos choix."
      });
    }
  };

  const starterOptions = menuOptions.filter(option => option.type === 'starter');
  const mainOptions = menuOptions.filter(option => option.type === 'main');
  const dessertOptions = menuOptions.filter(option => option.type === 'dessert');

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Sélection de Menu</h1>
        <p className="text-gray-600">
          Veuillez sélectionner vos préférences pour le repas de mariage
        </p>
      </div>

      {hasSubmitted && (
        <Card className="mb-8 bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-500" size={24} />
              <div>
                <h3 className="font-medium text-green-800">Choix de menu confirmé</h3>
                <p className="text-green-700 text-sm">
                  Vos choix ont été enregistrés. Vous pouvez les modifier jusqu'à la date limite.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="pb-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Votre sélection</h2>
          <div className="flex gap-2">
            {selectedOptions.starter && (
              <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                Entrée: {menuOptions.find(o => o.id === selectedOptions.starter)?.name}
              </Badge>
            )}
            {selectedOptions.main && (
              <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                Plat: {menuOptions.find(o => o.id === selectedOptions.main)?.name}
              </Badge>
            )}
            {selectedOptions.dessert && (
              <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                Dessert: {menuOptions.find(o => o.id === selectedOptions.dessert)?.name}
              </Badge>
            )}
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-white border border-gray-200 mb-6">
            <TabsTrigger 
              value="starters" 
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-white"
            >
              Entrées
            </TabsTrigger>
            <TabsTrigger 
              value="mains" 
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-white"
            >
              Plats principaux
            </TabsTrigger>
            <TabsTrigger 
              value="desserts" 
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-white"
            >
              Desserts
            </TabsTrigger>
            <TabsTrigger 
              value="allergies" 
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-white"
            >
              Allergies
            </TabsTrigger>
          </TabsList>

          <TabsContent value="starters" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {starterOptions.map((option: MenuOption) => (
                <MenuOptionCard
                  key={option.id}
                  option={option}
                  isSelected={selectedOptions.starter === option.id}
                  onSelect={(id) => handleSelectOption(id, 'starter')}
                  type="starter"
                />
              ))}
            </div>
            <div className="flex justify-end">
              <Button 
                onClick={() => setActiveTab('mains')}
                className="bg-amber-500 hover:bg-amber-600"
              >
                Suivant: Plats principaux
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="mains" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mainOptions.map((option: MenuOption) => (
                <MenuOptionCard
                  key={option.id}
                  option={option}
                  isSelected={selectedOptions.main === option.id}
                  onSelect={(id) => handleSelectOption(id, 'main')}
                  type="main"
                />
              ))}
            </div>
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setActiveTab('starters')}
                className="border-amber-200 text-amber-700 hover:bg-amber-50"
              >
                Retour: Entrées
              </Button>
              <Button 
                onClick={() => setActiveTab('desserts')}
                className="bg-amber-500 hover:bg-amber-600"
              >
                Suivant: Desserts
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="desserts" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {dessertOptions.map((option: MenuOption) => (
                <MenuOptionCard
                  key={option.id}
                  option={option}
                  isSelected={selectedOptions.dessert === option.id}
                  onSelect={(id) => handleSelectOption(id, 'dessert')}
                  type="dessert"
                />
              ))}
            </div>
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setActiveTab('mains')}
                className="border-amber-200 text-amber-700 hover:bg-amber-50"
              >
                Retour: Plats principaux
              </Button>
              <Button 
                onClick={() => setActiveTab('allergies')}
                className="bg-amber-500 hover:bg-amber-600"
              >
                Suivant: Allergies
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="allergies" className="space-y-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Restrictions alimentaires et allergies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Veuillez nous informer de toute restriction alimentaire ou allergie
                    </label>
                    <Textarea
                      placeholder="Exemples: allergie aux fruits de mer, intolérance au lactose, etc."
                      value={dietaryRestrictions || ''}
                      onChange={(e) => updateDietaryRestrictions(e.target.value)}
                      className="resize-none h-32 bg-white"
                    />
                  </div>

                  {!isComplete && (
                    <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-md">
                      <AlertTriangle className="text-amber-500 flex-shrink-0 mt-0.5" size={16} />
                      <p className="text-sm text-amber-800">
                        Veuillez sélectionner une option pour chaque service avant de confirmer votre choix.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setActiveTab('desserts')}
                className="border-amber-200 text-amber-700 hover:bg-amber-50"
              >
                Retour: Desserts
              </Button>
              <Button 
                onClick={handleSubmit}
                className="bg-amber-500 hover:bg-amber-600"
                disabled={isSubmitting || !isComplete}
              >
                {isSubmitting ? "Enregistrement..." : "Confirmer mes choix"}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GuestMenuSelection;
