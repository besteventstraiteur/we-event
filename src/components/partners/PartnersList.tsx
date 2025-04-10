
import React, { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import VIPAdvantageNotice from "./VIPAdvantageNotice";
import PartnersSearch from "./PartnersSearch";
import PartnerCategoryTabs from "./PartnerCategoryTabs";
import PartnerGrid from "./PartnerGrid";
import PartnersHeader from "./PartnersHeader";

// Types for our props
interface PartnerCategory {
  id: string;
  name: string;
}

interface Partner {
  id: number;
  name: string;
  category: string;
  description: string;
}

interface PartnersListProps {
  partnerCategories: PartnerCategory[];
  allPartners: Partner[];
}

const PartnersList: React.FC<PartnersListProps> = ({ partnerCategories, allPartners }) => {
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
    <div className="space-y-6">
      <PartnersHeader />

      <div className="flex justify-between items-center">
        <PartnersSearch 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />
      </div>

      <VIPAdvantageNotice />

      <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
        <PartnerCategoryTabs 
          categories={partnerCategories} 
          activeCategory={activeCategory} 
        />

        <TabsContent value={activeCategory} className="mt-6">
          <PartnerGrid 
            partners={filteredPartners} 
            categories={partnerCategories} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PartnersList;
