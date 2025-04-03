
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import PinterbestSearch from "@/components/pinterbest/PinterbestSearch";
import CategoryCarousel from "@/components/pinterbest/CategoryCarousel";
import PinterbestTabs from "@/components/pinterbest/PinterbestTabs";
import { mockInspirationImages, popularCategories } from "@/components/pinterbest/mockData";

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

  const handleCategoryClick = (categoryName: string) => {
    setSearchQuery(categoryName);
  };

  return (
    <DashboardLayout type="client">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Pinterbest</h1>
          <p className="text-muted-foreground">
            Trouvez l'inspiration pour votre événement parmi des milliers d'idées
          </p>
        </div>

        <PinterbestSearch 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />

        <CategoryCarousel 
          categories={popularCategories} 
          onCategoryClick={handleCategoryClick} 
        />

        <PinterbestTabs 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          filteredImages={filteredImages} 
        />
      </div>
    </DashboardLayout>
  );
};

export default ClientPinterbest;
