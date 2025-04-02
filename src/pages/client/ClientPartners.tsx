
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import GoldButton from "@/components/GoldButton";
import { Search, Check, X, Heart, Calendar } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

// Données fictives de prestataires
const partnerCategories = [
  { id: "domaine", name: "Domaines" },
  { id: "dj", name: "DJs" },
  { id: "fleuriste", name: "Fleuristes" },
  { id: "photographe", name: "Photographes" },
  { id: "traiteur", name: "Traiteurs" },
  { id: "wedding-planner", name: "Wedding Planners" },
  { id: "other", name: "Autres" },
];

// Liste des prestataires
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

// Données fictives de mes prestataires sélectionnés
const myPartners = [
  { id: 3, name: "DJ Platine", category: "dj", discount: "20%", description: "Plus de 15 ans d'expérience, spécialiste des mariages et événements haut de gamme.", status: "confirmed", appointmentDate: "2023-11-15" },
  { id: 7, name: "Objectif Emotion", category: "photographe", discount: "15%", description: "Photographe au style moderne capturant les émotions naturelles et les moments spontanés.", status: "pending", appointmentDate: null },
  { id: 9, name: "Best Events Traiteur", category: "traiteur", discount: "25%", description: "Le meilleur de la gastronomie française revisitée pour vos événements exclusifs.", status: "confirmed", appointmentDate: "2023-12-10" },
];

const ClientPartners = () => {
  const [activeTab, setActiveTab] = useState("directory");
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPartner, setSelectedPartner] = useState<any>(null);
  const [contactMessage, setContactMessage] = useState("");
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [appointmentDialogOpen, setAppointmentDialogOpen] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState("");
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Filtrer les prestataires en fonction de la catégorie active et de la recherche
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

  const handleScheduleAppointment = (partner: any) => {
    setSelectedPartner(partner);
    setAppointmentDialogOpen(true);
  };

  const handleConfirmAppointment = () => {
    if (!appointmentDate) {
      toast({
        variant: "destructive",
        title: "Date non sélectionnée",
        description: "Veuillez sélectionner une date pour le rendez-vous.",
      });
      return;
    }

    toast({
      title: "Rendez-vous programmé!",
      description: `Votre rendez-vous avec ${selectedPartner.name} a été programmé pour le ${new Date(appointmentDate).toLocaleDateString('fr-FR')}.`,
    });
    setAppointmentDate("");
    setAppointmentDialogOpen(false);
  };

  return (
    <DashboardLayout type="client">
      <div className="space-y-4">
        <div>
          <h1 className={`font-bold ${isMobile ? 'text-xl' : 'text-3xl'}`}>Prestataires</h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Découvrez nos prestataires exclusifs et gérez vos collaborations
          </p>
        </div>

        <Tabs defaultValue="directory" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-white border border-gray-200">
            <TabsTrigger 
              value="directory" 
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-white"
            >
              Annuaire VIP
            </TabsTrigger>
            <TabsTrigger 
              value="my-partners" 
              className="data-[state=active]:bg-amber-500 data-[state=active]:text-white"
            >
              Mes Prestataires
            </TabsTrigger>
          </TabsList>

          {/* Onglet Annuaire VIP */}
          <TabsContent value="directory" className="mt-4 space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
              <p className="text-amber-700 font-medium text-sm">
                En tant que membre VIP, vous bénéficiez des réductions exclusives indiquées pour chaque prestataire.
              </p>
            </div>

            <div className="flex justify-between items-center">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
                <Input
                  type="search"
                  placeholder="Rechercher un prestataire..."
                  className="pl-9 bg-white border-gray-200 h-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
              <div className="overflow-x-auto -mx-2 px-2">
                <TabsList className="bg-white border border-gray-200 flex w-full space-x-1 p-1">
                  <TabsTrigger 
                    value="all" 
                    className="data-[state=active]:bg-amber-500 data-[state=active]:text-white text-xs flex-shrink-0"
                  >
                    Tous
                  </TabsTrigger>
                  {partnerCategories.map((category) => (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="data-[state=active]:bg-amber-500 data-[state=active]:text-white whitespace-nowrap text-xs flex-shrink-0"
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
                      <Card key={partner.id} className="bg-white border-gray-200 overflow-hidden">
                        <CardContent className={`${isMobile ? 'p-3' : 'p-6'}`}>
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">{partner.name}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-gray-500">
                                  {partnerCategories.find(c => c.id === partner.category)?.name}
                                </span>
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                                <span className="text-xs text-amber-600 font-medium">
                                  Réduction: {partner.discount}
                                </span>
                              </div>
                            </div>
                            <div className="flex-shrink-0 w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 font-bold border border-amber-200">
                              {partner.name.charAt(0)}
                            </div>
                          </div>
                          <p className="mt-3 text-gray-600 text-xs line-clamp-2">{partner.description}</p>
                          <div className="mt-3 flex justify-end gap-2">
                            <GoldButton size="sm" variant="outline" className="border-amber-200 hover:bg-amber-50" 
                              onClick={() => {
                                // Vérifier si le prestataire est déjà dans "Mes prestataires"
                                const isAlreadySelected = myPartners.some(p => p.id === partner.id);
                                if (isAlreadySelected) {
                                  toast({
                                    description: `${partner.name} fait déjà partie de vos prestataires sélectionnés.`,
                                  });
                                } else {
                                  toast({
                                    title: "Prestataire ajouté",
                                    description: `${partner.name} a été ajouté à vos prestataires favoris.`,
                                  });
                                }
                              }}>
                              <Heart size={16} className="mr-1" /> Favoris
                            </GoldButton>
                            <GoldButton size="sm" onClick={() => handleContact(partner)}>
                              Contacter
                            </GoldButton>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">Aucun prestataire ne correspond à votre recherche.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>

          {/* Onglet Mes Prestataires */}
          <TabsContent value="my-partners" className="mt-4 space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
              <p className="text-amber-700 font-medium text-sm">
                Gérez vos prestataires sélectionnés, suivez les demandes en cours et programmez vos rendez-vous.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {myPartners.length > 0 ? (
                myPartners.map((partner) => (
                  <Card key={partner.id} className="bg-white border-gray-200 overflow-hidden">
                    <CardContent className={`${isMobile ? 'p-3' : 'p-6'}`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold text-gray-900">{partner.name}</h3>
                            {partner.status === "confirmed" ? (
                              <Badge className="bg-green-100 text-green-800 border-green-200">Confirmé</Badge>
                            ) : (
                              <Badge className="bg-amber-100 text-amber-800 border-amber-200">En attente</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500">
                              {partnerCategories.find(c => c.id === partner.category)?.name}
                            </span>
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                            <span className="text-xs text-amber-600 font-medium">
                              Réduction: {partner.discount}
                            </span>
                          </div>
                        </div>
                        <div className="flex-shrink-0 w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 font-bold border border-amber-200">
                          {partner.name.charAt(0)}
                        </div>
                      </div>
                      
                      <p className="mt-3 text-gray-600 text-xs">{partner.description}</p>
                      
                      {partner.appointmentDate && (
                        <div className="mt-3 flex items-center text-xs text-gray-500">
                          <Calendar size={14} className="mr-1.5" />
                          <span>Rendez-vous prévu le: {new Date(partner.appointmentDate).toLocaleDateString('fr-FR')}</span>
                        </div>
                      )}
                      
                      <div className="mt-3 flex justify-end gap-2">
                        {partner.status === "confirmed" ? (
                          <>
                            <GoldButton size="sm" variant="outline" className="border-amber-200 hover:bg-amber-50"
                              onClick={() => handleScheduleAppointment(partner)}>
                              <Calendar size={16} className="mr-1" /> Rendez-vous
                            </GoldButton>
                            <GoldButton size="sm" onClick={() => handleContact(partner)}>
                              Contacter
                            </GoldButton>
                          </>
                        ) : (
                          <div className="flex items-center justify-end gap-2 text-xs text-gray-500 italic">
                            En attente de confirmation par le prestataire
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Vous n'avez pas encore sélectionné de prestataires.</p>
                  <p className="text-gray-400 text-sm mt-2">
                    Consultez notre annuaire VIP pour trouver des prestataires de qualité pour votre événement.
                  </p>
                  <GoldButton 
                    className="mt-4" 
                    onClick={() => setActiveTab("directory")}
                  >
                    Parcourir l'annuaire
                  </GoldButton>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Dialog pour contacter un prestataire */}
      <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
        <DialogContent className="bg-white border-gray-200 sm:max-w-md max-w-[calc(100%-32px)]">
          <DialogHeader>
            <DialogTitle className="text-base">Contacter {selectedPartner?.name}</DialogTitle>
            <DialogDescription className="text-xs">
              Envoyez votre demande directement au prestataire. Il recevra vos coordonnées et votre message.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-2">
            <div className="bg-amber-50 p-3 rounded-md">
              <div className="font-medium text-gray-900 text-sm">Avantage Club VIP</div>
              <div className="text-amber-600 font-bold">Réduction de {selectedPartner?.discount}</div>
            </div>
            
            <Textarea
              placeholder="Décrivez votre projet, vos besoins et questions..."
              className="bg-white border-gray-200 min-h-[100px]"
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

      {/* Dialog pour programmer un rendez-vous */}
      <Dialog open={appointmentDialogOpen} onOpenChange={setAppointmentDialogOpen}>
        <DialogContent className="bg-white border-gray-200 sm:max-w-md max-w-[calc(100%-32px)]">
          <DialogHeader>
            <DialogTitle className="text-base">Rendez-vous avec {selectedPartner?.name}</DialogTitle>
            <DialogDescription className="text-xs">
              Programmez un rendez-vous pour discuter de votre projet et de vos besoins.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-2">
            <div className="space-y-2">
              <label htmlFor="appointment-date" className="text-sm font-medium">
                Date et heure du rendez-vous
              </label>
              <Input
                id="appointment-date"
                type="datetime-local"
                className="bg-white border-gray-200"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
              />
            </div>
            
            <div className="text-xs text-gray-500">
              Le prestataire recevra votre demande de rendez-vous et vous confirmera sa disponibilité.
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <GoldButton variant="outline" size="sm" onClick={() => setAppointmentDialogOpen(false)} className="w-full sm:w-auto">
              Annuler
            </GoldButton>
            <GoldButton size="sm" onClick={handleConfirmAppointment} className="w-full sm:w-auto">
              Programmer
            </GoldButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default ClientPartners;
