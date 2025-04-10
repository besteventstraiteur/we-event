
import React, { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import PartnersSearch from "./PartnersSearch";
import PartnerCategoryTabs from "./PartnerCategoryTabs";
import PartnerGrid from "./PartnerGrid";
import MobileFormOptimizer from "@/components/mobile/MobileFormOptimizer";
import { useDeviceType } from "@/hooks/use-mobile";

interface Partner {
  id: number;
  name: string;
  category: string;
  description: string;
}

interface PartnerCategory {
  id: string;
  name: string;
}

interface PartnersListProps {
  partnerCategories: PartnerCategory[];
  allPartners: Partner[];
}

const PartnersList: React.FC<PartnersListProps> = ({ partnerCategories, allPartners }) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';

  // Filter partners based on category and search query
  const filteredPartners = allPartners.filter(partner => {
    const matchesCategory = activeCategory === "all" || partner.category === activeCategory;
    const matchesSearch = partner.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        partner.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <MobileFormOptimizer className="space-y-4">
      <div className={`${isMobile ? 'sticky top-0 z-10 bg-white pb-3 pt-1' : ''}`}>
        <PartnersSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      <Tabs value={activeCategory} onValueChange={handleCategoryChange} className="w-full">
        <PartnerCategoryTabs 
          categories={partnerCategories} 
          activeCategory={activeCategory} 
        />

        <TabsContent value={activeCategory} className={`${isMobile ? 'mt-3' : 'mt-6'}`}>
          <PartnerGrid 
            partners={filteredPartners} 
            categories={partnerCategories} 
          />
        </TabsContent>
      </Tabs>
    </MobileFormOptimizer>
  );
};

export default PartnersList;
