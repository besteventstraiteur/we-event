
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import PinterbestGallery, { InspirationImage } from "@/components/pinterbest/PinterbestGallery";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from "@/components/ui/carousel";

// Données fictives pour les images d'inspiration
const mockInspirationImages: InspirationImage[] = [
  {
    id: "1",
    imageUrl: "https://images.unsplash.com/photo-1519741347686-c1e331fcb4d0",
    title: "Décoration de table élégante",
    description: "Une table dressée avec élégance pour un mariage chic et romantique",
    tags: ["décoration", "table", "élégant"],
    width: 800,
    height: 1200,
    contributor: {
      name: "Studio Élégance",
      role: "Photographe",
      avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    likes: 124
  },
  {
    id: "2",
    imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622",
    title: "Bouquet de mariée champêtre",
    description: "Magnifique bouquet aux tons pastel pour un mariage en plein air",
    tags: ["bouquet", "champêtre", "fleurs"],
    width: 800,
    height: 600,
    contributor: {
      name: "Floral Design",
      role: "Fleuriste",
      avatarUrl: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    likes: 87
  },
  {
    id: "3",
    imageUrl: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6",
    title: "Lieu de réception vue mer",
    tags: ["lieu", "reception", "mer"],
    width: 800,
    height: 1000,
    contributor: {
      name: "Voyages Events",
      role: "Admin",
      avatarUrl: "https://randomuser.me/api/portraits/women/65.jpg"
    },
    likes: 215
  },
  {
    id: "4",
    imageUrl: "https://images.unsplash.com/photo-1470319149464-1a9ee333bd47",
    title: "Arche florale cérémonie",
    description: "Superbe arche pour cérémonie en extérieur composée de fleurs sauvages",
    tags: ["cérémonie", "arche", "fleurs"],
    width: 800,
    height: 1100,
    contributor: {
      name: "Nature & Co",
      role: "Décorateur",
      avatarUrl: "https://randomuser.me/api/portraits/men/42.jpg"
    },
    likes: 156
  },
  {
    id: "5",
    imageUrl: "https://images.unsplash.com/photo-1510076857177-7470076d4098",
    title: "Gâteau de mariage rustique",
    tags: ["gâteau", "rustique", "dessert"],
    width: 800,
    height: 800,
    contributor: {
      name: "Sweet Cakes",
      role: "Pâtissier",
      avatarUrl: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    likes: 93
  },
  {
    id: "6",
    imageUrl: "https://images.unsplash.com/photo-1482575832494-7f2a9b8d0c77",
    title: "Mise en place minimaliste",
    description: "Mise en place épurée et élégante pour un mariage contemporain",
    tags: ["minimaliste", "table", "moderne"],
    width: 800,
    height: 500,
    contributor: {
      name: "Modern Events",
      role: "Designer",
      avatarUrl: "https://randomuser.me/api/portraits/men/12.jpg"
    },
    likes: 76
  },
  {
    id: "7",
    imageUrl: "https://images.unsplash.com/photo-1459501462159-97d5bded1416",
    title: "Décoration bohème",
    tags: ["bohème", "décoration", "chic"],
    width: 800,
    height: 1300,
    contributor: {
      name: "Bohème Studio",
      role: "Photographe",
      avatarUrl: "https://randomuser.me/api/portraits/women/89.jpg"
    },
    likes: 184
  },
  {
    id: "8",
    imageUrl: "https://images.unsplash.com/photo-1529636798458-92182e662485",
    title: "Alliances originales",
    description: "Alliances personnalisées pour les amoureux de nature",
    tags: ["alliances", "bijoux", "original"],
    width: 800,
    height: 600,
    contributor: {
      name: "Bijoux d'Art",
      role: "Bijoutier",
      avatarUrl: "https://randomuser.me/api/portraits/men/67.jpg"
    },
    likes: 112
  }
];

// Catégories populaires pour le carousel
const popularCategories = [
  { id: "cat1", name: "Décorations", image: "https://images.unsplash.com/photo-1510076857177-7470076d4098" },
  { id: "cat2", name: "Lieux", image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6" },
  { id: "cat3", name: "Fleurs", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622" },
  { id: "cat4", name: "Tables", image: "https://images.unsplash.com/photo-1519741347686-c1e331fcb4d0" },
  { id: "cat5", name: "Gâteaux", image: "https://images.unsplash.com/photo-1470319149464-1a9ee333bd47" },
  { id: "cat6", name: "Tenues", image: "https://images.unsplash.com/photo-1529636798458-92182e662485" },
];

const ClientPinterbest = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Fonction de filtrage des images en fonction de la recherche
  const filteredImages = mockInspirationImages.filter(image => {
    if (!searchQuery) return true;
    
    const searchLower = searchQuery.toLowerCase();
    return (
      image.title.toLowerCase().includes(searchLower) ||
      (image.description && image.description.toLowerCase().includes(searchLower)) ||
      image.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  });

  return (
    <DashboardLayout type="client">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Pinterbest</h1>
          <p className="text-muted-foreground">
            Trouvez l'inspiration pour votre événement parmi des milliers d'idées
          </p>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Rechercher une inspiration..."
            className="pl-10 pr-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0" 
              onClick={() => setSearchQuery("")}
            >
              ×
            </Button>
          )}
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4">Catégories populaires</h2>
          <Carousel className="w-full">
            <CarouselContent>
              {popularCategories.map((category) => (
                <CarouselItem key={category.id} className="md:basis-1/3 lg:basis-1/4">
                  <div className="p-1">
                    <div 
                      className="relative h-32 rounded-md overflow-hidden cursor-pointer"
                      onClick={() => {
                        setSearchQuery(category.name);
                      }}
                    >
                      <img 
                        src={category.image} 
                        alt={category.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <span className="text-white font-medium text-lg">{category.name}</span>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>

        <Tabs defaultValue="all" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="all">Tout</TabsTrigger>
              <TabsTrigger value="favorites">Favoris</TabsTrigger>
              <TabsTrigger value="wedding">Mariage</TabsTrigger>
              <TabsTrigger value="party">Réception</TabsTrigger>
            </TabsList>
            
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtres
            </Button>
          </div>
          
          <TabsContent value="all" className="mt-0">
            <PinterbestGallery images={filteredImages} />
          </TabsContent>
          
          <TabsContent value="favorites" className="mt-0">
            <PinterbestGallery images={filteredImages.filter(img => img.isSaved)} />
          </TabsContent>
          
          <TabsContent value="wedding" className="mt-0">
            <PinterbestGallery images={filteredImages.filter(img => 
              img.tags.some(tag => ["cérémonie", "mariage", "bouquet"].includes(tag))
            )} />
          </TabsContent>
          
          <TabsContent value="party" className="mt-0">
            <PinterbestGallery images={filteredImages.filter(img => 
              img.tags.some(tag => ["réception", "fête", "table"].includes(tag))
            )} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ClientPinterbest;
