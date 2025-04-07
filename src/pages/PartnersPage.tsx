
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import GoldButton from "@/components/GoldButton";
import Logo from "@/components/Logo";
import { Search } from "lucide-react";

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
  { id: 1, name: "Château des Merveilles", category: "domaine", description: "Un domaine d'exception niché dans un parc de 5 hectares avec une vue imprenable sur la vallée. Capacité de 200 personnes assises." },
  { id: 2, name: "Manoir des Roses", category: "domaine", description: "Manoir historique du 18ème siècle avec ses jardins à la française, idéal pour vos séances photos et cérémonies en extérieur." },
  { id: 3, name: "DJ Platine", category: "dj", description: "Plus de 15 ans d'expérience, spécialiste des mariages et événements haut de gamme." },
  { id: 4, name: "Mix & Match", category: "dj", description: "Duo de DJs offrant une expérience musicale complète et personnalisée pour votre événement." },
  { id: 5, name: "Fleurs de Luxe", category: "fleuriste", description: "Fleuriste spécialisé dans les compositions raffinées et élégantes pour des événements prestigieux." },
  { id: 6, name: "Belle Fleur", category: "fleuriste", description: "Compositions florales personnalisées avec des fleurs fraîches et de saison." },
  { id: 7, name: "Objectif Emotion", category: "photographe", description: "Photographe au style moderne capturant les émotions naturelles et les moments spontanés." },
  { id: 8, name: "Studio Lumière", category: "photographe", description: "Équipe de photographes et vidéastes pour immortaliser chaque moment de votre événement sous tous les angles." },
  { id: 9, name: "Best Events Traiteur", category: "traiteur", description: "Le meilleur de la gastronomie française revisitée pour vos événements exclusifs." },
  { id: 10, name: "Saveurs du Monde", category: "traiteur", description: "Traiteur proposant une cuisine fusion inspirée des quatre coins du monde." },
  { id: 11, name: "Perfect Day", category: "wedding-planner", description: "Organisation complète ou partielle de votre événement avec un suivi personnalisé." },
  { id: 12, name: "Event Designer", category: "wedding-planner", description: "Spécialiste de la décoration et scénographie événementielle haut de gamme." },
];

const PartnersPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filtrer les prestataires en fonction de la catégorie active et de la recherche
  const filteredPartners = allPartners.filter((partner) => {
    const matchesCategory = activeCategory === "all" || partner.category === activeCategory;
    const matchesSearch = partner.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         partner.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="border-b border-vip-gray-200 py-4">
        <div className="container flex items-center justify-between">
          <Link to="/">
            <Logo />
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-vip-gray-600 hover:text-vip-gold">Accueil</Link>
            <Link to="/partners" className="text-vip-gold font-semibold">Prestataires</Link>
            <Link to="/contact" className="text-vip-gray-600 hover:text-vip-gold">Contact</Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <GoldButton variant="outline" size="sm">
                Connexion
              </GoldButton>
            </Link>
            <Link to="/register-client">
              <GoldButton size="sm">
                Inscription
              </GoldButton>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Nos Prestataires</h1>
            <p className="text-vip-gray-600">
              Découvrez notre réseau de prestataires de qualité pour vos événements exceptionnels
            </p>
          </div>

          <div className="flex justify-between items-center">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-vip-gray-500" size={18} />
              <Input
                type="search"
                placeholder="Rechercher un prestataire..."
                className="pl-10 border-vip-gray-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="bg-vip-gray-100 p-4 rounded-lg">
            <p className="text-vip-gray-800 italic text-sm">
              <span className="font-semibold text-vip-gold">Avantage Club VIP :</span> Devenez membre pour accéder à des réductions exclusives auprès de tous nos prestataires.
              <Link to="/register-client" className="ml-2 text-vip-gold hover:underline">
                S'inscrire
              </Link>
            </p>
          </div>

          <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="bg-white border border-vip-gray-300 overflow-x-auto flex w-full space-x-2 p-1">
              <TabsTrigger value="all" className="data-[state=active]:bg-vip-gold data-[state=active]:text-white">
                Tous
              </TabsTrigger>
              {partnerCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-vip-gold data-[state=active]:text-white whitespace-nowrap"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={activeCategory} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPartners.length > 0 ? (
                  filteredPartners.map((partner) => (
                    <Card key={partner.id} className="overflow-hidden border-vip-gray-300">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-semibold text-vip-black">{partner.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-sm text-vip-gray-600">
                                {partnerCategories.find(c => c.id === partner.category)?.name}
                              </span>
                            </div>
                          </div>
                          <div className="flex-shrink-0 w-12 h-12 bg-vip-gray-200 rounded-full flex items-center justify-center text-vip-gold font-bold border border-vip-gray-300">
                            {partner.name.charAt(0)}
                          </div>
                        </div>
                        <p className="mt-4 text-vip-gray-600 text-sm line-clamp-3">{partner.description}</p>
                        <div className="mt-4 flex justify-end">
                          <Link to="/login">
                            <GoldButton>
                              Voir les détails
                            </GoldButton>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-3 text-center py-12">
                    <p className="text-vip-gray-500">Aucun prestataire ne correspond à votre recherche.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-16 bg-vip-gray-100 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-center mb-4">Devenez membre du Club VIP</h2>
          <p className="text-center text-vip-gray-700 mb-6">
            Accédez à des avantages exclusifs et des réductions chez tous nos prestataires.
          </p>
          <div className="flex justify-center">
            <Link to="/register-client">
              <GoldButton size="lg">
                Rejoindre le Club VIP
              </GoldButton>
            </Link>
          </div>
        </div>
      </main>

      <footer className="py-8 border-t border-vip-gray-200">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Link to="/">
              <Logo />
            </Link>
            <p className="text-vip-gray-500 text-sm">
              © {new Date().getFullYear()} We Event. Tous droits réservés.
            </p>
            <div className="flex gap-4">
              <Link to="/privacy" className="text-vip-gray-600 hover:text-vip-gold text-sm">
                Politique de confidentialité
              </Link>
              <Link to="/terms" className="text-vip-gray-600 hover:text-vip-gold text-sm">
                Conditions d'utilisation
              </Link>
              <Link to="/contact" className="text-vip-gray-600 hover:text-vip-gold text-sm">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PartnersPage;
