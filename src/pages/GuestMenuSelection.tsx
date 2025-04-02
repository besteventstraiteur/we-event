
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useToast } from '@/hooks/use-toast';

interface Menu {
  id: string;
  name: string;
  description: string;
  options: MenuOption[];
}

interface MenuOption {
  id: string;
  name: string;
  description: string;
}

interface FormValues {
  name: string;
  email: string;
  menuOptionId: string;
}

const GuestMenuSelection: React.FC = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();
  const location = useLocation();
  
  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      menuOptionId: ""
    }
  });
  
  // Simulate fetching event and menu data
  useEffect(() => {
    // In a real app, we would fetch data based on URL params
    const params = new URLSearchParams(location.search);
    const eventId = params.get('event');
    
    // Simulate loading data
    setTimeout(() => {
      // Fake data - in a real app this would come from an API
      const fetchedMenus = [
        {
          id: "1",
          name: "Menu Standard",
          description: "Notre menu trois services classique",
          options: [
            { id: "1-1", name: "Bœuf Wellington", description: "Filet de bœuf, duxelles de champignons, pâte feuilletée" },
            { id: "1-2", name: "Saumon en croûte d'herbes", description: "Saumon frais, croûte aux herbes, sauce citronnée" },
          ]
        },
        {
          id: "2",
          name: "Menu Végétarien",
          description: "Options végétariennes délicieuses",
          options: [
            { id: "2-1", name: "Risotto aux champignons", description: "Champignons sauvages, parmesan, huile de truffe" },
            { id: "2-2", name: "Wellington végétarien", description: "Mélange de légumes rôtis, pâte feuilletée" },
          ]
        }
      ];
      
      setMenus(fetchedMenus);
      setSelectedMenu(fetchedMenus[0]);
      setLoading(false);
    }, 1000);
  }, [location]);
  
  const onSubmit = (data: FormValues) => {
    // In a real app, this would be sent to the server
    console.log("Form submitted:", data);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Choix enregistré",
        description: "Merci d'avoir sélectionné votre menu. Votre choix a été enregistré."
      });
      setSuccess(true);
    }, 1000);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Chargement des options de menu...</p>
        </div>
      </div>
    );
  }
  
  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full mx-auto bg-white">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-gray-900">Merci !</CardTitle>
            <CardDescription>Votre choix de menu a été enregistré avec succès</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <p>Nous avons bien reçu votre sélection et nous nous réjouissons de vous accueillir à l'événement.</p>
              <Button 
                className="bg-vip-gold text-vip-black hover:bg-vip-gold/90"
                onClick={() => window.close()}
              >
                Fermer cette page
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto py-8">
        <Card className="bg-white">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-gray-900">Sélection de menu</CardTitle>
            <CardDescription>
              Merci de choisir votre préférence de menu pour l'événement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    rules={{ required: "Votre nom est requis" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Votre nom complet</FormLabel>
                        <FormControl>
                          <Input placeholder="Prénom et nom" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    rules={{ 
                      required: "Votre email est requis",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Adresse email invalide"
                      }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Votre email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="exemple@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-1">Menus disponibles</h3>
                    <div className="flex flex-wrap gap-2">
                      {menus.map(menu => (
                        <Button
                          key={menu.id}
                          type="button"
                          variant={selectedMenu?.id === menu.id ? "default" : "outline"}
                          onClick={() => setSelectedMenu(menu)}
                        >
                          {menu.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  {selectedMenu && (
                    <div>
                      <p className="text-sm text-gray-500 mb-4">{selectedMenu.description}</p>
                      
                      <FormField
                        control={form.control}
                        name="menuOptionId"
                        rules={{ required: "Veuillez sélectionner une option" }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sélectionnez votre option préférée</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="space-y-4"
                              >
                                {selectedMenu.options.map(option => (
                                  <div key={option.id} className="border rounded-md p-4 hover:border-gray-400 transition-colors">
                                    <FormItem className="flex items-start space-x-3 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value={option.id} />
                                      </FormControl>
                                      <div className="space-y-1">
                                        <FormLabel className="font-medium">{option.name}</FormLabel>
                                        <FormDescription className="text-gray-500">
                                          {option.description}
                                        </FormDescription>
                                      </div>
                                    </FormItem>
                                  </div>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="bg-vip-gold text-vip-black hover:bg-vip-gold/90"
                  >
                    Confirmer mon choix
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GuestMenuSelection;
