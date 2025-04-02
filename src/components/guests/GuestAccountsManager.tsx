
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, Users, Mail, Link as LinkIcon, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

// This would normally come from your database or API
interface GuestAccountOptions {
  canViewFloorPlan: boolean;
  canSelectMenu: boolean;
  canUploadPhotos: boolean;
  canAddSongs: boolean;
}

interface GuestAccountsManagerProps {
  eventTitle?: string;
}

const GuestAccountsManager: React.FC<GuestAccountsManagerProps> = ({ 
  eventTitle = "Notre Mariage" 
}) => {
  const { toast } = useToast();
  const [isCreateSettingsOpen, setIsCreateSettingsOpen] = useState(false);
  const [guestPortalLink, setGuestPortalLink] = useState(`https://votre-mariage.com/guest/portal`);
  const [accountOptions, setAccountOptions] = useState<GuestAccountOptions>({
    canViewFloorPlan: true,
    canSelectMenu: true,
    canUploadPhotos: false,
    canAddSongs: false
  });

  const handleCopyLink = () => {
    navigator.clipboard.writeText(guestPortalLink);
    toast({
      title: "Lien copié",
      description: "Le lien d'accès au portail invité a été copié dans le presse-papier",
    });
  };

  const handleSaveSettings = () => {
    setIsCreateSettingsOpen(false);
    toast({
      title: "Paramètres enregistrés",
      description: "Les paramètres de l'espace invité ont été mis à jour",
    });
  };

  const handleActivateGuestPortal = () => {
    toast({
      title: "Portail invité activé",
      description: "L'espace invité est maintenant actif et accessible par vos invités",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-amber-500" />
            Espace Invités
          </CardTitle>
          <CardDescription>
            Créez un espace dédié pour vos invités où ils pourront consulter les informations de votre événement
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Titre de l'événement</h3>
              <Input 
                value={eventTitle} 
                onChange={(e) => {/* In a real app, this would update the event title */}} 
                className="max-w-md"
              />
              
              <div className="pt-4">
                <h3 className="text-lg font-medium mb-2">Fonctionnalités activées</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">
                      Activé
                    </Badge>
                    Choix du menu
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">
                      Activé
                    </Badge>
                    Consultation du plan de salle
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-gray-100 text-gray-600 border-gray-200">
                      Désactivé
                    </Badge>
                    Proposition de chansons
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-gray-100 text-gray-600 border-gray-200">
                      Désactivé
                    </Badge>
                    Upload de photos
                  </li>
                </ul>
              </div>
              
              <div className="pt-4 flex flex-col sm:flex-row gap-2">
                <Button onClick={() => setIsCreateSettingsOpen(true)} className="gap-2">
                  <UserPlus size={16} />
                  Paramètres de l'espace invité
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Lien d'accès à l'espace invité</h3>
              <div className="flex">
                <Input 
                  value={guestPortalLink} 
                  readOnly 
                  className="flex-1 rounded-r-none"
                />
                <Button 
                  variant="outline" 
                  onClick={handleCopyLink}
                  className="rounded-l-none border-l-0"
                >
                  <Copy size={16} />
                </Button>
              </div>
              <p className="text-sm text-gray-500">
                Partagez ce lien avec vos invités ou utilisez les options d'envoi par email
              </p>
              
              <div className="pt-4">
                <h3 className="text-lg font-medium mb-2">Statut de l'espace invité</h3>
                <div className="flex items-center space-x-2">
                  <Switch id="guest-portal-active" />
                  <Label htmlFor="guest-portal-active">Activer l'espace invité</Label>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Lorsque l'espace invité est activé, vos invités pourront y accéder avec les identifiants que vous leur avez envoyés
                </p>
              </div>
              
              <div className="pt-4">
                <Button 
                  onClick={handleActivateGuestPortal}
                  className="gap-2 bg-amber-500 hover:bg-amber-600"
                >
                  <LinkIcon size={16} />
                  Activer l'espace invité
                </Button>
              </div>
            </div>
          </div>
          
          <div className="pt-4">
            <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
              <h3 className="font-medium text-amber-800 flex items-center gap-2 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Information
              </h3>
              <p className="text-sm text-amber-700">
                Pour que vos invités puissent accéder à leur espace, vous devez d'abord créer leurs comptes et leur envoyer leurs identifiants.
                Utilisez l'onglet "Comptes invités" de la page "Gestion des invités" pour gérer les comptes.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={isCreateSettingsOpen} onOpenChange={setIsCreateSettingsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Paramètres de l'espace invité</DialogTitle>
            <DialogDescription>
              Configurez les fonctionnalités que vous souhaitez mettre à disposition de vos invités.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="event-title">Titre de l'événement</Label>
              <Input id="event-title" value={eventTitle} onChange={(e) => {/* Update event title */}} />
              <p className="text-sm text-gray-500">Ce titre sera affiché en haut de l'espace invité</p>
            </div>
            
            <Tabs defaultValue="features">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="features">Fonctionnalités</TabsTrigger>
                <TabsTrigger value="appearance">Apparence</TabsTrigger>
              </TabsList>
              
              <TabsContent value="features" className="space-y-4 pt-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="opt-menu">Choix du menu</Label>
                      <p className="text-sm text-gray-500">Permettre aux invités de choisir leur menu</p>
                    </div>
                    <Switch 
                      id="opt-menu" 
                      checked={accountOptions.canSelectMenu}
                      onCheckedChange={(checked) => 
                        setAccountOptions({...accountOptions, canSelectMenu: checked})
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="opt-floorplan">Plan de salle</Label>
                      <p className="text-sm text-gray-500">Permettre aux invités de consulter le plan de salle</p>
                    </div>
                    <Switch 
                      id="opt-floorplan" 
                      checked={accountOptions.canViewFloorPlan}
                      onCheckedChange={(checked) => 
                        setAccountOptions({...accountOptions, canViewFloorPlan: checked})
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="opt-songs">Proposer des chansons</Label>
                      <p className="text-sm text-gray-500">Permettre aux invités de suggérer des chansons</p>
                    </div>
                    <Switch 
                      id="opt-songs" 
                      checked={accountOptions.canAddSongs}
                      onCheckedChange={(checked) => 
                        setAccountOptions({...accountOptions, canAddSongs: checked})
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="opt-photos">Upload de photos</Label>
                      <p className="text-sm text-gray-500">Permettre aux invités d'envoyer des photos</p>
                    </div>
                    <Switch 
                      id="opt-photos" 
                      checked={accountOptions.canUploadPhotos}
                      onCheckedChange={(checked) => 
                        setAccountOptions({...accountOptions, canUploadPhotos: checked})
                      }
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="appearance" className="space-y-4 pt-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="portal-color">Couleur principale</Label>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-amber-500 cursor-pointer ring-2 ring-amber-500 ring-offset-2" />
                      <div className="w-8 h-8 rounded-full bg-pink-500 cursor-pointer" />
                      <div className="w-8 h-8 rounded-full bg-blue-500 cursor-pointer" />
                      <div className="w-8 h-8 rounded-full bg-green-500 cursor-pointer" />
                      <div className="w-8 h-8 rounded-full bg-purple-500 cursor-pointer" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="portal-header">Image d'en-tête</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                      <Button variant="outline" size="sm">Ajouter une image</Button>
                      <p className="text-xs text-gray-500 mt-2">Formats acceptés: JPG, PNG. Max 2MB</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateSettingsOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSaveSettings} className="bg-amber-500 hover:bg-amber-600">
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GuestAccountsManager;
