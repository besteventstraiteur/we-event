
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { UtensilsCrossed, Check, ArrowLeft, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Logo from "@/components/Logo";

const GuestMenuSelection = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("starters");
  const [vegetarian, setVegetarian] = useState(false);
  const [allergies, setAllergies] = useState("");
  
  // Données fictives pour le menu
  const menuOptions = {
    starters: [
      { id: "s1", name: "Foie gras maison", description: "Accompagné de pain brioché toasté et compotée de figues", vegetarian: false, selected: false },
      { id: "s2", name: "Gravlax de saumon", description: "Aux agrumes, crème à l'aneth et blinis maison", vegetarian: false, selected: false },
      { id: "s3", name: "Tarte fine aux légumes", description: "Légumes confits, pesto de basilic et pignons de pin", vegetarian: true, selected: false }
    ],
    mains: [
      { id: "m1", name: "Filet de bœuf Wellington", description: "Sauce au porto, pommes duchesse et légumes de saison", vegetarian: false, selected: false },
      { id: "m2", name: "Pavé de bar rôti", description: "Écrasé de pommes de terre à l'huile d'olive, émulsion au champagne", vegetarian: false, selected: false },
      { id: "m3", name: "Risotto aux champignons", description: "Champignons des bois, copeaux de parmesan et truffe d'été", vegetarian: true, selected: false }
    ],
    desserts: [
      { id: "d1", name: "Pièce montée traditionnelle", description: "Choux à la crème vanille-caramel", vegetarian: true, selected: true }
    ]
  };
  
  const [starters, setStarters] = useState(menuOptions.starters);
  const [mains, setMains] = useState(menuOptions.mains);
  const [desserts, setDesserts] = useState(menuOptions.desserts);
  
  const selectDish = (type: "starters" | "mains" | "desserts", id: string) => {
    if (type === "starters") {
      setStarters(starters.map(dish => ({
        ...dish,
        selected: dish.id === id
      })));
    } else if (type === "mains") {
      setMains(mains.map(dish => ({
        ...dish,
        selected: dish.id === id
      })));
    } else {
      setDesserts(desserts.map(dish => ({
        ...dish,
        selected: dish.id === id
      })));
    }
  };
  
  const handleSubmit = () => {
    const selectedStarter = starters.find(dish => dish.selected);
    const selectedMain = mains.find(dish => dish.selected);
    const selectedDessert = desserts.find(dish => dish.selected);
    
    if (!selectedStarter || !selectedMain) {
      toast({
        variant: "destructive",
        title: "Sélection incomplète",
        description: "Veuillez choisir une entrée et un plat principal."
      });
      return;
    }
    
    toast({
      title: "Menu enregistré !",
      description: "Vos choix de menu ont été enregistrés avec succès.",
    });
  };
  
  return (
    <div className="min-h-screen bg-white">
      {/* En-tête */}
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Logo />
            <div className="text-xl font-semibold text-gray-900">Espace Invité</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Invité au mariage de</div>
            <div className="font-semibold text-amber-600">Sophie & Thomas</div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6 flex items-center gap-2">
            <Button variant="ghost" asChild className="text-gray-600 hover:text-gray-900 p-2">
              <Link to="/guest">
                <ArrowLeft size={20} />
                <span className="ml-2">Retour à l'espace invité</span>
              </Link>
            </Button>
          </div>

          <Card className="bg-white border-gray-200 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UtensilsCrossed className="w-5 h-5 text-amber-500" />
                Choisissez vos préférences pour le menu
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
                <p className="text-amber-800">
                  Merci de faire votre sélection pour le repas du mariage de Sophie & Thomas.
                  Veuillez choisir une option pour chaque service et indiquer toute allergie alimentaire.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center">
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={vegetarian} 
                      onChange={(e) => setVegetarian(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-5 h-5 border border-gray-300 rounded-sm peer-checked:bg-amber-500 peer-checked:border-amber-500 flex items-center justify-center">
                      {vegetarian && <Check size={14} className="text-white" />}
                    </div>
                    <span className="ml-2 text-gray-700">Je souhaite un menu végétarien</span>
                  </label>
                </div>
                
                {vegetarian && (
                  <div className="text-sm text-gray-600 pl-7">
                    En cochant cette case, nous vous proposerons automatiquement les options végétariennes disponibles.
                  </div>
                )}
              </div>
              
              <Tabs defaultValue="starters" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="bg-white border border-gray-200">
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
                </TabsList>
                
                <TabsContent value="starters" className="space-y-4 mt-4">
                  {starters
                    .filter(dish => !vegetarian || dish.vegetarian)
                    .map((dish) => (
                    <Card 
                      key={dish.id} 
                      className={`border ${dish.selected ? 'border-amber-500 bg-amber-50' : 'border-gray-200 bg-white'} cursor-pointer transition-colors`}
                      onClick={() => selectDish("starters", dish.id)}
                    >
                      <CardContent className="p-4 flex justify-between items-center">
                        <div>
                          <h3 className="font-medium text-gray-900">{dish.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{dish.description}</p>
                          {dish.vegetarian && (
                            <Badge variant="secondary" className="mt-2 bg-green-100 text-green-800 border-green-200">
                              Végétarien
                            </Badge>
                          )}
                        </div>
                        <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${dish.selected ? 'bg-amber-500 border-amber-500' : 'border-gray-300'}`}>
                          {dish.selected && <Check size={14} className="text-white" />}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
                
                <TabsContent value="mains" className="space-y-4 mt-4">
                  {mains
                    .filter(dish => !vegetarian || dish.vegetarian)
                    .map((dish) => (
                    <Card 
                      key={dish.id} 
                      className={`border ${dish.selected ? 'border-amber-500 bg-amber-50' : 'border-gray-200 bg-white'} cursor-pointer transition-colors`}
                      onClick={() => selectDish("mains", dish.id)}
                    >
                      <CardContent className="p-4 flex justify-between items-center">
                        <div>
                          <h3 className="font-medium text-gray-900">{dish.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{dish.description}</p>
                          {dish.vegetarian && (
                            <Badge variant="secondary" className="mt-2 bg-green-100 text-green-800 border-green-200">
                              Végétarien
                            </Badge>
                          )}
                        </div>
                        <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${dish.selected ? 'bg-amber-500 border-amber-500' : 'border-gray-300'}`}>
                          {dish.selected && <Check size={14} className="text-white" />}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
                
                <TabsContent value="desserts" className="space-y-4 mt-4">
                  {desserts.map((dish) => (
                    <Card 
                      key={dish.id} 
                      className={`border ${dish.selected ? 'border-amber-500 bg-amber-50' : 'border-gray-200 bg-white'} cursor-pointer transition-colors`}
                      onClick={() => selectDish("desserts", dish.id)}
                    >
                      <CardContent className="p-4 flex justify-between items-center">
                        <div>
                          <h3 className="font-medium text-gray-900">{dish.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{dish.description}</p>
                        </div>
                        <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${dish.selected ? 'bg-amber-500 border-amber-500' : 'border-gray-300'}`}>
                          {dish.selected && <Check size={14} className="text-white" />}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
              
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900">Allergies ou restrictions alimentaires</h3>
                <Textarea
                  placeholder="Veuillez indiquer toute allergie ou restriction alimentaire dont les cuisiniers doivent être informés..."
                  className="bg-white border-gray-200"
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                />
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button className="bg-amber-600 hover:bg-amber-700 text-white" onClick={handleSubmit}>
                  Confirmer mes choix
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="flex items-start gap-2 text-gray-600">
              <AlertCircle size={20} className="text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm">
                Vous pouvez modifier vos choix jusqu'au 15 mai 2024. Pour toute demande spéciale, veuillez contacter directement les mariés.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            Espace invité pour le mariage de Sophie & Thomas • 15 Juin 2024
          </p>
          <p className="text-gray-400 text-xs mt-2">
            Powered by VIP Wedding Assistant
          </p>
        </div>
      </footer>
    </div>
  );
};

export default GuestMenuSelection;
