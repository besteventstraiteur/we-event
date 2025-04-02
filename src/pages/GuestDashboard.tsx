
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, UtensilsCrossed, Music, Car, Gift, Camera, MessageCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import GoldButton from "@/components/GoldButton";
import Logo from "@/components/Logo";

const GuestDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("info");
  
  // Données fictives pour le mariage
  const weddingDetails = {
    couple: "Sophie & Thomas",
    date: "15 Juin 2024",
    location: {
      ceremony: "Église Saint-Joseph",
      ceremonyAddress: "23 rue des Lilas, 75001 Paris",
      ceremonyTime: "15:00",
      reception: "Château des Merveilles",
      receptionAddress: "45 avenue des Roses, 75016 Paris",
      receptionTime: "17:00"
    },
    dresscode: "Tenue de cocktail élégante",
    rsvpDeadline: "15 Mai 2024",
    contact: "+33 6 12 34 56 78",
    message: "Nous sommes ravis de vous compter parmi nos invités pour célébrer notre union. Votre présence rendra ce jour encore plus spécial."
  };

  const handleRSVP = (attending: boolean) => {
    toast({
      title: attending ? "Participation confirmée" : "Absence confirmée",
      description: attending 
        ? "Merci d'avoir confirmé votre présence. Nous avons hâte de vous voir !" 
        : "Nous regrettons votre absence mais comprenons tout à fait. Merci de nous avoir informés.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* En-tête */}
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Logo />
            <div className="text-xl font-semibold text-gray-900">Espace Invité</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Invité au mariage de</div>
            <div className="font-semibold text-amber-600">{weddingDetails.couple}</div>
          </div>
        </div>
      </header>

      {/* Bannière */}
      <div className="bg-gradient-to-r from-amber-100 to-amber-50 py-10 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Mariage de {weddingDetails.couple}
        </h1>
        <p className="text-lg text-gray-700">
          <Calendar className="inline-block mr-2 -mt-1" size={20} />
          {weddingDetails.date}
        </p>
        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            className="bg-amber-600 hover:bg-amber-700 text-white"
            onClick={() => handleRSVP(true)}
          >
            Je serai présent(e)
          </Button>
          <Button 
            variant="outline" 
            className="border-amber-200 text-amber-700 hover:bg-amber-50"
            onClick={() => handleRSVP(false)}
          >
            Je ne pourrai pas venir
          </Button>
        </div>
      </div>

      {/* Contenu principal */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="info" value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="bg-white border border-gray-200 mx-auto flex justify-center">
            <TabsTrigger 
              value="info" 
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-white"
            >
              Informations
            </TabsTrigger>
            <TabsTrigger 
              value="menu" 
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-white"
            >
              Menu
            </TabsTrigger>
            <TabsTrigger 
              value="travel" 
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-white"
            >
              Transport
            </TabsTrigger>
            <TabsTrigger 
              value="gifts" 
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-white"
            >
              Liste de cadeaux
            </TabsTrigger>
            <TabsTrigger 
              value="photos" 
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-white"
            >
              Photos
            </TabsTrigger>
          </TabsList>

          {/* Onglet Informations */}
          <TabsContent value="info" className="space-y-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-amber-500" />
                  Message des mariés
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 italic">"{weddingDetails.message}"</p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-amber-500" />
                    Cérémonie
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{weddingDetails.location.ceremony}</h3>
                    <p className="text-gray-700 flex items-start mt-1">
                      <MapPin className="w-4 h-4 text-gray-400 mr-1 mt-0.5 flex-shrink-0" />
                      <span>{weddingDetails.location.ceremonyAddress}</span>
                    </p>
                    <p className="text-gray-700 flex items-center mt-1">
                      <Clock className="w-4 h-4 text-gray-400 mr-1 flex-shrink-0" />
                      <span>{weddingDetails.location.ceremonyTime}</span>
                    </p>
                  </div>
                  <GoldButton className="w-full">
                    <MapPin className="mr-2 h-4 w-4" /> Voir sur la carte
                  </GoldButton>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UtensilsCrossed className="w-5 h-5 text-amber-500" />
                    Réception
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{weddingDetails.location.reception}</h3>
                    <p className="text-gray-700 flex items-start mt-1">
                      <MapPin className="w-4 h-4 text-gray-400 mr-1 mt-0.5 flex-shrink-0" />
                      <span>{weddingDetails.location.receptionAddress}</span>
                    </p>
                    <p className="text-gray-700 flex items-center mt-1">
                      <Clock className="w-4 h-4 text-gray-400 mr-1 flex-shrink-0" />
                      <span>{weddingDetails.location.receptionTime}</span>
                    </p>
                  </div>
                  <GoldButton className="w-full">
                    <MapPin className="mr-2 h-4 w-4" /> Voir sur la carte
                  </GoldButton>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-white">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Users className="mx-auto h-8 w-8 text-amber-500 mb-2" />
                    <h3 className="font-semibold text-gray-900 mb-1">Dress Code</h3>
                    <p className="text-gray-700">{weddingDetails.dresscode}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Calendar className="mx-auto h-8 w-8 text-amber-500 mb-2" />
                    <h3 className="font-semibold text-gray-900 mb-1">Date limite RSVP</h3>
                    <p className="text-gray-700">{weddingDetails.rsvpDeadline}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <MessageCircle className="mx-auto h-8 w-8 text-amber-500 mb-2" />
                    <h3 className="font-semibold text-gray-900 mb-1">Contact</h3>
                    <p className="text-gray-700">{weddingDetails.contact}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Onglet Menu */}
          <TabsContent value="menu" className="space-y-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UtensilsCrossed className="w-5 h-5 text-amber-500" />
                  Dîner de mariage
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-amber-600 mb-2 text-lg">Entrées</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-amber-50 rounded-md">
                      <h4 className="font-medium">Foie gras maison et sa compotée de figues</h4>
                      <p className="text-sm text-gray-600 mt-1">Accompagné de pain brioché toasté</p>
                    </div>
                    <div className="p-3 border border-gray-100 rounded-md">
                      <h4 className="font-medium">Gravlax de saumon aux agrumes</h4>
                      <p className="text-sm text-gray-600 mt-1">Crème à l'aneth et blinis maison</p>
                    </div>
                    <div className="p-3 border border-gray-100 rounded-md">
                      <h4 className="font-medium">Tarte fine aux légumes confits</h4>
                      <p className="text-sm text-gray-600 mt-1">Pesto de basilic et pignons de pin</p>
                      <Badge className="mt-2 bg-green-100 text-green-800 border-green-200">Option végétarienne</Badge>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold text-amber-600 mb-2 text-lg">Plats principaux</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-amber-50 rounded-md">
                      <h4 className="font-medium">Filet de bœuf Wellington</h4>
                      <p className="text-sm text-gray-600 mt-1">Sauce au porto, pommes duchesse et légumes de saison</p>
                    </div>
                    <div className="p-3 border border-gray-100 rounded-md">
                      <h4 className="font-medium">Pavé de bar rôti</h4>
                      <p className="text-sm text-gray-600 mt-1">Écrasé de pommes de terre à l'huile d'olive, émulsion au champagne</p>
                    </div>
                    <div className="p-3 border border-gray-100 rounded-md">
                      <h4 className="font-medium">Risotto aux champignons des bois</h4>
                      <p className="text-sm text-gray-600 mt-1">Copeaux de parmesan et truffe d'été</p>
                      <Badge className="mt-2 bg-green-100 text-green-800 border-green-200">Option végétarienne</Badge>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold text-amber-600 mb-2 text-lg">Desserts</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-amber-50 rounded-md">
                      <h4 className="font-medium">Pièce montée traditionnelle</h4>
                      <p className="text-sm text-gray-600 mt-1">Choux à la crème vanille-caramel</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <GoldButton className="w-full">
                    Indiquer mes préférences et allergies
                  </GoldButton>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Transport */}
          <TabsContent value="travel" className="space-y-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="w-5 h-5 text-amber-500" />
                  Options de transport
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Navette pour les invités</h3>
                  <div className="p-4 bg-amber-50 rounded-md">
                    <p className="font-medium text-gray-800">Un service de navette est mis à votre disposition</p>
                    <div className="mt-2 space-y-2 text-gray-700">
                      <p className="flex items-center">
                        <Clock className="w-4 h-4 text-amber-500 mr-2" />
                        <span>Départ à 14h00</span>
                      </p>
                      <p className="flex items-start">
                        <MapPin className="w-4 h-4 text-amber-500 mr-2 mt-0.5" />
                        <span>Point de rendez-vous: Hôtel Le Grand Paris, 12 rue de Rivoli, 75001 Paris</span>
                      </p>
                    </div>
                    <div className="mt-4">
                      <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                        Réserver ma place
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Parking</h3>
                  <p className="text-gray-700 mb-3">
                    Un parking gratuit est disponible sur place au Château des Merveilles.
                  </p>
                  <div className="border border-gray-200 rounded-md p-4">
                    <p className="font-medium text-gray-800 mb-2">Adresse GPS</p>
                    <p className="text-gray-700">45 avenue des Roses, 75016 Paris</p>
                    <Button className="mt-3 text-amber-700 bg-white border border-amber-200 hover:bg-amber-50">
                      Ouvrir dans Google Maps
                    </Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Hébergement recommandé</h3>
                  <div className="space-y-3">
                    <div className="border border-gray-200 rounded-md p-4">
                      <h4 className="font-medium text-gray-800">Hôtel Le Grand Paris</h4>
                      <p className="text-gray-700 mt-1">12 rue de Rivoli, 75001 Paris</p>
                      <p className="text-sm text-amber-600 mt-2">
                        Mentionnez "Mariage Sophie & Thomas" pour bénéficier d'un tarif préférentiel
                      </p>
                    </div>
                    <div className="border border-gray-200 rounded-md p-4">
                      <h4 className="font-medium text-gray-800">Résidence Les Jardins</h4>
                      <p className="text-gray-700 mt-1">8 avenue des Champs, 75008 Paris</p>
                      <p className="text-sm text-amber-600 mt-2">
                        À 10 minutes du lieu de réception
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Liste de cadeaux */}
          <TabsContent value="gifts" className="space-y-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-amber-500" />
                  Liste de cadeaux
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-700">
                  Sophie et Thomas seraient ravis de recevoir votre contribution à leur projet de voyage de noces au Japon.
                  Vous pouvez également consulter leur liste de cadeaux ci-dessous.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-white border-amber-200">
                    <CardContent className="pt-6">
                      <h3 className="font-semibold text-gray-900 mb-3 text-center">Voyage de noces au Japon</h3>
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                          <Gift className="w-8 h-8 text-amber-500" />
                        </div>
                      </div>
                      <p className="text-gray-700 text-center mb-4">
                        Participez à leur aventure au pays du soleil levant
                      </p>
                      <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                        Contribuer
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-white border-amber-200">
                    <CardContent className="pt-6">
                      <h3 className="font-semibold text-gray-900 mb-3 text-center">Liste de cadeaux</h3>
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                          <Gift className="w-8 h-8 text-amber-500" />
                        </div>
                      </div>
                      <p className="text-gray-700 text-center mb-4">
                        Consultez la liste de cadeaux sur la plateforme partenaire
                      </p>
                      <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                        Voir la liste
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Photos */}
          <TabsContent value="photos" className="space-y-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-amber-500" />
                  Album partagé
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-700">
                  Partagez vos photos de ce jour spécial et consultez celles des autres invités.
                </p>

                <div className="border-2 border-dashed border-gray-200 rounded-md p-8 text-center">
                  <Camera className="w-10 h-10 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-medium text-gray-700 mb-2">
                    Déposez vos photos ici
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    Partagez vos plus beaux souvenirs de ce mariage
                  </p>
                  <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                    Télécharger des photos
                  </Button>
                </div>

                <div className="mt-8">
                  <h3 className="font-semibold text-gray-900 mb-3">Photos partagées</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="aspect-square bg-gray-100 rounded-md flex items-center justify-center">
                      <Camera className="w-8 h-8 text-gray-400" />
                    </div>
                    <div className="aspect-square bg-gray-100 rounded-md flex items-center justify-center">
                      <Camera className="w-8 h-8 text-gray-400" />
                    </div>
                    <div className="aspect-square bg-gray-100 rounded-md flex items-center justify-center">
                      <Camera className="w-8 h-8 text-gray-400" />
                    </div>
                    <div className="aspect-square bg-gray-100 rounded-md flex items-center justify-center">
                      <Camera className="w-8 h-8 text-gray-400" />
                    </div>
                  </div>
                  <p className="text-center text-gray-500 text-sm mt-4">
                    Les photos ajoutées par les invités apparaîtront ici
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Pied de page */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            Espace invité pour le mariage de {weddingDetails.couple} • {weddingDetails.date}
          </p>
          <p className="text-gray-400 text-xs mt-2">
            Powered by VIP Wedding Assistant
          </p>
        </div>
      </footer>
    </div>
  );
};

export default GuestDashboard;
