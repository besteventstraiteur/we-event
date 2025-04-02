
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import GoldButton from "@/components/GoldButton";
import { Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

// Données fictives de partenaires
const partnerCategories = [
  { id: "domaine", name: "Domaines" },
  { id: "dj", name: "DJs" },
  { id: "fleuriste", name: "Fleuristes" },
  { id: "photographe", name: "Photographes" },
  { id: "traiteur", name: "Traiteurs" },
  { id: "wedding-planner", name: "Wedding Planners" },
  { id: "other", name: "Autres" },
];

// Liste des partenaires
const allPartners = [
  { id: 1, name: "Château des Merveilles", category: "domaine", discount: "15%", description: "Un domaine d'exception niché dans un parc de 5 hectares avec une vue imprenable sur la vallée. Capacité de 200 personnes assises." },
  { id: 2, name: "Manoir des Roses", category: "domaine", discount: "10%", description: "Manoir historique du 18ème siècle avec ses jardins à la française, idéal pour vos séances photos et cérémonies en extérieur." },
  { id: 3, name: "DJ Platine", category: "dj", discount: "20%", description: "Plus de 15 ans d'expérience, spécialiste des mariages et événements haut de gamme." },
  { id: 4, name: "Mix & Match", category: "dj", discount: "15%", description: "Duo de DJs offrant une expérience musicale complète et personnalisée pour votre événement." },
  { id: 5, name: "Fleurs de Luxe", category: "fleuriste", discount: "20%", description: "Fleuriste spécialisé dans les compositions raffinées et élégantes pour des événements prestigieux." },
  { id: 6, name: "Belle Fleur", category: "fleuriste", discount: "15%", description: "Compositions florales personnalisées avec des fleurs fraîches et de saison." },
  { id: 7, name: "Objectif Emotion", category: "photographe", discount: "15%", description: "Photographe au style moderne capturant les émotions naturelles et les moments spontanés." },
  { id: 8, name: "Studio Lumière", category: "photographe", discount: "10%", description: "Équipe de photographes et vidéastes pour immortaliser chaque moment de votre événement sous tous les angles." },
  { id: 9, name: "Best Events Traiteur", category: "traiteur", discount: "25%", description: "Le meilleur de la gastronomie française revisitée pour vos événements exclusifs." },
  { id: 10, name: "Saveurs du Monde", category: "traiteur", discount: "20%", description: "Traiteur proposant une cuisine fusion inspirée des quatre coins du monde." },
  { id: 11, name: "Perfect Day", category: "wedding-planner", discount: "15%", description: "Organisation complète ou partielle de votre événement avec un suivi personnalisé." },
  { id: 12, name: "Event Designer", category: "wedding-planner", discount: "10%", description: "Spécialiste de la décoration et scénographie événementielle haut de gamme." },
];

const ClientPartners = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPartner, setSelectedPartner] = useState<any>(null);
  const [contactMessage, setContactMessage] = useState("");
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Filtrer les partenaires en fonction de la catégorie active et de la recherche
  const filteredPartners = allPartners.filter((partner) => {
    const matchesCategory = activeCategory === "all" || partner.category === activeCategory;
    const matchesSearch = partner.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         partner.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleContact = (partner: any) => {
    setSelectedPartner(partner);
    setContactDialogOpen(true);
  };

  const handleSendMessage = () => {
    if (!contactMessage.trim()) {
      toast({
        variant: "destructive",
        title: "Message vide",
        description: "Veuillez saisir un message avant d'envoyer.",
      });
      return;
    }

    toast({
      title: "Message envoyé!",
      description: `Votre demande a été envoyée à ${selectedPartner.name}. Ils vous contacteront prochainement.`,
    });
    setContactMessage("");
    setContactDialogOpen(false);
  };

  return (
    <DashboardLayout type="client">
      <div className="space-y-4">
        <div>
          <h1 className={`font-bold ${isMobile ? 'text-xl' : 'text-3xl'}`}>Nos Partenaires VIP</h1>
          <p className="text-vip-gray-400 text-sm sm:text-base">
            Découvrez nos partenaires exclusifs et bénéficiez de tarifs préférentiels
          </p>
        </div>

        <div className="bg-vip-gold/10 border border-vip-gold/30 rounded-md p-3">
          <p className="text-vip-gold font-medium text-sm">
            En tant que membre VIP, vous bénéficiez des réductions exclusives indiquées pour chaque partenaire.
          </p>
        </div>

        <div className="flex justify-between items-center">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-vip-gray-500" size={16} />
            <Input
              type="search"
              placeholder="Rechercher un partenaire..."
              className="pl-9 bg-vip-gray-900 border-vip-gray-800 h-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
          <div className="overflow-x-auto -mx-2 px-2">
            <TabsList className="bg-vip-gray-900 border border-vip-gray-800 flex w-full space-x-1 p-1">
              <TabsTrigger 
                value="all" 
                className="data-[state=active]:bg-vip-gold data-[state=active]:text-vip-black text-xs flex-shrink-0"
              >
                Tous
              </TabsTrigger>
              {partnerCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-vip-gold data-[state=active]:text-vip-black whitespace-nowrap text-xs flex-shrink-0"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value={activeCategory} className="mt-4">
            <div className="grid grid-cols-1 gap-3">
              {filteredPartners.length > 0 ? (
                filteredPartners.map((partner) => (
                  <Card key={partner.id} className="bg-vip-gray-900 border-vip-gray-800 overflow-hidden">
                    <CardContent className={`${isMobile ? 'p-3' : 'p-6'}`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-vip-white">{partner.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-vip-gray-400">
                              {partnerCategories.find(c => c.id === partner.category)?.name}
                            </span>
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-vip-gray-600"></span>
                            <span className="text-xs text-vip-gold font-medium">
                              Réduction: {partner.discount}
                            </span>
                          </div>
                        </div>
                        <div className="flex-shrink-0 w-10 h-10 bg-vip-gray-800 rounded-full flex items-center justify-center text-vip-gold font-bold border border-vip-gray-700">
                          {partner.name.charAt(0)}
                        </div>
                      </div>
                      <p className="mt-3 text-vip-gray-300 text-xs line-clamp-2">{partner.description}</p>
                      <div className="mt-3 flex justify-end">
                        <GoldButton size="sm" onClick={() => handleContact(partner)}>
                          Contacter
                        </GoldButton>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-vip-gray-400">Aucun partenaire ne correspond à votre recherche.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
        <DialogContent className="bg-vip-gray-900 border-vip-gray-800 sm:max-w-md max-w-[calc(100%-32px)]">
          <DialogHeader>
            <DialogTitle className="text-base">Contacter {selectedPartner?.name}</DialogTitle>
            <DialogDescription className="text-xs">
              Envoyez votre demande directement au partenaire. Il recevra vos coordonnées et votre message.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-2">
            <div className="bg-vip-gray-800 p-3 rounded-md">
              <div className="font-medium text-vip-white text-sm">Avantage Club VIP</div>
              <div className="text-vip-gold font-bold">Réduction de {selectedPartner?.discount}</div>
            </div>
            
            <Textarea
              placeholder="Décrivez votre projet, vos besoins et questions..."
              className="bg-vip-gray-800 border-vip-gray-700 min-h-[100px]"
              value={contactMessage}
              onChange={(e) => setContactMessage(e.target.value)}
            />
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <GoldButton variant="outline" size="sm" onClick={() => setContactDialogOpen(false)} className="w-full sm:w-auto">
              Annuler
            </GoldButton>
            <GoldButton size="sm" onClick={handleSendMessage} className="w-full sm:w-auto">
              Envoyer la demande
            </GoldButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default ClientPartners;
