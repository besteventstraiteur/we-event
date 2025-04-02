
import React, { useState, useEffect } from 'react';
import DashboardLayout from "@/components/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, Edit2, Trash2, Copy, Link } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import GoldButton from '@/components/GoldButton';
import { useIsMobile } from '@/hooks/use-mobile';

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

const ClientMenus: React.FC = () => {
  const [menus, setMenus] = useState<Menu[]>([
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
  ]);
  
  const [activeMenu, setActiveMenu] = useState<Menu | null>(null);
  const [activeOption, setActiveOption] = useState<MenuOption | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isOptionDialogOpen, setIsOptionDialogOpen] = useState(false);
  const [guestMenuLink, setGuestMenuLink] = useState("");
  const [showLinkCopied, setShowLinkCopied] = useState(false);
  
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const menuForm = useForm<Omit<Menu, 'id' | 'options'>>({
    defaultValues: {
      name: "",
      description: ""
    }
  });
  
  const optionForm = useForm<Omit<MenuOption, 'id'>>({
    defaultValues: {
      name: "",
      description: ""
    }
  });
  
  // Generate guest menu selection link
  useEffect(() => {
    // In a real app, this would be a proper URL with a unique token
    setGuestMenuLink(`${window.location.origin}/guest-menu-selection?event=123456`);
  }, []);
  
  // Reset form when activeMenu changes
  useEffect(() => {
    if (activeMenu) {
      menuForm.reset({
        name: activeMenu.name,
        description: activeMenu.description
      });
    } else {
      menuForm.reset({
        name: "",
        description: ""
      });
    }
  }, [activeMenu, menuForm]);
  
  // Reset option form when activeOption changes
  useEffect(() => {
    if (activeOption) {
      optionForm.reset({
        name: activeOption.name,
        description: activeOption.description
      });
    } else {
      optionForm.reset({
        name: "",
        description: ""
      });
    }
  }, [activeOption, optionForm]);
  
  const handleSaveMenu = (data: Omit<Menu, 'id' | 'options'>) => {
    if (activeMenu) {
      // Update existing menu
      setMenus(menus.map(menu => 
        menu.id === activeMenu.id 
          ? { ...menu, name: data.name, description: data.description }
          : menu
      ));
      toast({
        title: "Menu mis à jour",
        description: `Le menu ${data.name} a été mis à jour`
      });
    } else {
      // Create new menu
      const newMenu: Menu = {
        id: Date.now().toString(),
        name: data.name,
        description: data.description,
        options: []
      };
      setMenus([...menus, newMenu]);
      toast({
        title: "Menu créé",
        description: `Le menu ${data.name} a été créé`
      });
    }
    
    setIsDialogOpen(false);
    setActiveMenu(null);
  };
  
  const handleDeleteMenu = (id: string) => {
    setMenus(menus.filter(menu => menu.id !== id));
    toast({
      title: "Menu supprimé",
      description: "Le menu a été supprimé avec succès"
    });
  };
  
  const handleSaveOption = (data: Omit<MenuOption, 'id'>) => {
    if (!activeMenu) return;
    
    if (activeOption) {
      // Update existing option
      const updatedMenus = menus.map(menu => {
        if (menu.id === activeMenu.id) {
          return {
            ...menu,
            options: menu.options.map(option => 
              option.id === activeOption.id 
                ? { ...option, name: data.name, description: data.description }
                : option
            )
          };
        }
        return menu;
      });
      
      setMenus(updatedMenus);
      toast({
        title: "Option mise à jour",
        description: `L'option ${data.name} a été mise à jour`
      });
    } else {
      // Create new option
      const newOption: MenuOption = {
        id: `${activeMenu.id}-${Date.now()}`,
        name: data.name,
        description: data.description
      };
      
      const updatedMenus = menus.map(menu => {
        if (menu.id === activeMenu.id) {
          return {
            ...menu,
            options: [...menu.options, newOption]
          };
        }
        return menu;
      });
      
      setMenus(updatedMenus);
      toast({
        title: "Option ajoutée",
        description: `L'option ${data.name} a été ajoutée au menu ${activeMenu.name}`
      });
    }
    
    setIsOptionDialogOpen(false);
    setActiveOption(null);
  };
  
  const handleDeleteOption = (menuId: string, optionId: string) => {
    const updatedMenus = menus.map(menu => {
      if (menu.id === menuId) {
        return {
          ...menu,
          options: menu.options.filter(option => option.id !== optionId)
        };
      }
      return menu;
    });
    
    setMenus(updatedMenus);
    toast({
      title: "Option supprimée",
      description: "L'option a été supprimée avec succès"
    });
  };
  
  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(guestMenuLink);
    setShowLinkCopied(true);
    toast({
      title: "Lien copié",
      description: "Le lien a été copié dans le presse-papier"
    });
    
    setTimeout(() => {
      setShowLinkCopied(false);
    }, 2000);
  };
  
  return (
    <DashboardLayout type="client">
      <div className="space-y-4">
        <div>
          <h1 className={`font-bold text-gray-900 ${isMobile ? 'text-xl' : 'text-3xl'}`}>Gestion des menus</h1>
          <p className="text-gray-500 text-sm sm:text-base">Créez et partagez des options de menu pour vos invités</p>
        </div>
        
        <Card className="bg-white border-gray-200">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <CardTitle>Vos menus</CardTitle>
                <CardDescription>Créez différents menus et leurs options</CardDescription>
              </div>
              
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <GoldButton 
                    onClick={() => {
                      setActiveMenu(null);
                      menuForm.reset({ name: "", description: "" });
                    }}
                    className="mt-2 sm:mt-0"
                  >
                    <PlusCircle size={16} className="mr-2" />
                    Nouveau menu
                  </GoldButton>
                </DialogTrigger>
                <DialogContent className="bg-white">
                  <DialogHeader>
                    <DialogTitle>{activeMenu ? 'Modifier le menu' : 'Créer un nouveau menu'}</DialogTitle>
                    <DialogDescription>
                      {activeMenu 
                        ? 'Modifiez les détails de votre menu existant' 
                        : 'Créez un nouveau menu pour vos invités'}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <Form {...menuForm}>
                    <form onSubmit={menuForm.handleSubmit(handleSaveMenu)} className="space-y-4">
                      <FormField
                        control={menuForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nom du menu</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: Menu Classique" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={menuForm.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Une brève description du menu..." 
                                className="min-h-[100px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <DialogFooter>
                        <Button 
                          variant="outline"
                          onClick={() => {
                            setIsDialogOpen(false);
                            setActiveMenu(null);
                          }}
                          type="button"
                        >
                          Annuler
                        </Button>
                        <GoldButton type="submit">
                          {activeMenu ? 'Mettre à jour' : 'Créer le menu'}
                        </GoldButton>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          
          <CardContent>
            {menus.length > 0 ? (
              <Tabs defaultValue={menus[0].id} className="w-full">
                <TabsList className="mb-4">
                  {menus.map(menu => (
                    <TabsTrigger key={menu.id} value={menu.id} className="data-[state=active]:bg-vip-gold data-[state=active]:text-vip-black">
                      {menu.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {menus.map(menu => (
                  <TabsContent key={menu.id} value={menu.id} className="border rounded-md p-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                      <div>
                        <h3 className="text-lg font-medium">{menu.name}</h3>
                        <p className="text-gray-500 text-sm">{menu.description}</p>
                      </div>
                      
                      <div className="flex gap-2 mt-2 sm:mt-0">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setActiveMenu(menu);
                            setIsDialogOpen(true);
                          }}
                        >
                          <Edit2 size={16} className="mr-2" />
                          Modifier
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDeleteMenu(menu.id)}
                        >
                          <Trash2 size={16} className="mr-2" />
                          Supprimer
                        </Button>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Options du menu</h4>
                        
                        <Dialog open={isOptionDialogOpen} onOpenChange={setIsOptionDialogOpen}>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline"
                              onClick={() => {
                                setActiveMenu(menu);
                                setActiveOption(null);
                                optionForm.reset({ name: "", description: "" });
                              }}
                            >
                              <PlusCircle size={16} className="mr-2" />
                              Ajouter une option
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-white">
                            <DialogHeader>
                              <DialogTitle>{activeOption ? 'Modifier l\'option' : 'Ajouter une option'}</DialogTitle>
                              <DialogDescription>
                                {activeOption 
                                  ? 'Modifiez les détails de cette option de menu' 
                                  : 'Ajoutez une nouvelle option à ce menu'}
                              </DialogDescription>
                            </DialogHeader>
                            
                            <Form {...optionForm}>
                              <form onSubmit={optionForm.handleSubmit(handleSaveOption)} className="space-y-4">
                                <FormField
                                  control={optionForm.control}
                                  name="name"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Nom de l'option</FormLabel>
                                      <FormControl>
                                        <Input placeholder="Ex: Filet mignon" {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                
                                <FormField
                                  control={optionForm.control}
                                  name="description"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Description</FormLabel>
                                      <FormControl>
                                        <Textarea 
                                          placeholder="Ingrédients, préparation..." 
                                          className="min-h-[100px]"
                                          {...field} 
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                
                                <DialogFooter>
                                  <Button 
                                    variant="outline"
                                    onClick={() => {
                                      setIsOptionDialogOpen(false);
                                      setActiveOption(null);
                                    }}
                                    type="button"
                                  >
                                    Annuler
                                  </Button>
                                  <GoldButton type="submit">
                                    {activeOption ? 'Mettre à jour' : 'Ajouter'}
                                  </GoldButton>
                                </DialogFooter>
                              </form>
                            </Form>
                          </DialogContent>
                        </Dialog>
                      </div>
                      
                      {menu.options.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {menu.options.map(option => (
                            <Card key={option.id} className="bg-gray-50">
                              <CardHeader className="pb-2">
                                <div className="flex justify-between">
                                  <CardTitle className="text-base">{option.name}</CardTitle>
                                  <div className="flex gap-1">
                                    <Button 
                                      variant="ghost" 
                                      size="icon" 
                                      className="h-8 w-8"
                                      onClick={() => {
                                        setActiveMenu(menu);
                                        setActiveOption(option);
                                        setIsOptionDialogOpen(true);
                                      }}
                                    >
                                      <Edit2 size={14} />
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="icon" 
                                      className="h-8 w-8 text-red-500 hover:text-red-700"
                                      onClick={() => handleDeleteOption(menu.id, option.id)}
                                    >
                                      <Trash2 size={14} />
                                    </Button>
                                  </div>
                                </div>
                              </CardHeader>
                              <CardContent>
                                <p className="text-sm text-gray-600">{option.description}</p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 bg-gray-50 rounded-md">
                          <p className="text-gray-500">Aucune option de menu ajoutée</p>
                          <p className="text-sm text-gray-400">Cliquez sur "Ajouter une option" pour commencer</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-md">
                <p className="text-gray-500">Vous n'avez pas encore créé de menu</p>
                <p className="text-sm text-gray-400 mb-4">Commencez par créer un menu en cliquant sur le bouton ci-dessus</p>
                <GoldButton 
                  onClick={() => {
                    setActiveMenu(null);
                    setIsDialogOpen(true);
                  }}
                  className="mx-auto"
                >
                  <PlusCircle size={16} className="mr-2" />
                  Créer mon premier menu
                </GoldButton>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="bg-white border-gray-200">
          <CardHeader>
            <CardTitle>Partager avec vos invités</CardTitle>
            <CardDescription>Permettez à vos invités de choisir leur menu</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm">
                Partagez ce lien avec vos invités pour qu'ils puissent sélectionner leurs préférences de menu :
              </p>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-grow">
                  <Input 
                    value={guestMenuLink} 
                    readOnly 
                    className="pr-10"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                    onClick={copyLinkToClipboard}
                  >
                    {showLinkCopied ? (
                      <span className="text-green-600 text-xs">Copié!</span>
                    ) : (
                      <Copy size={16} />
                    )}
                  </Button>
                </div>
                <Button onClick={copyLinkToClipboard} className="flex gap-2" variant="outline">
                  <Link size={16} />
                  {showLinkCopied ? 'Lien copié!' : 'Copier le lien'}
                </Button>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="font-medium mb-2">Comment ça marche :</h4>
                <ol className="list-decimal pl-5 space-y-1 text-sm">
                  <li>Créez vos différents menus et leurs options</li>
                  <li>Partagez le lien avec vos invités (email, carte d'invitation, etc.)</li>
                  <li>Les invités choisissent leur préférence de menu</li>
                  <li>Vous recevez leurs choix dans votre liste d'invités</li>
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ClientMenus;
