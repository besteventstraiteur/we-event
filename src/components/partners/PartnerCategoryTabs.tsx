
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";

interface PartnerCategory {
  id: string;
  name: string;
}

interface PartnerCategoryTabsProps {
  categories: PartnerCategory[];
  activeCategory: string;
}

const PartnerCategoryTabs: React.FC<PartnerCategoryTabsProps> = ({ categories, activeCategory }) => {
  const { t } = useLanguage();
  
  return (
    <TabsList className="bg-white border border-vip-gray-300 overflow-x-auto flex w-full space-x-2 p-1">
      <TabsTrigger 
        value="all" 
        className="data-[state=active]:bg-vip-gold data-[state=active]:text-white"
      >
        {t('partners.allCategory')}
      </TabsTrigger>
      {categories.map((category) => (
        <TabsTrigger
          key={category.id}
          value={category.id}
          className="data-[state=active]:bg-vip-gold data-[state=active]:text-white whitespace-nowrap"
        >
          {category.name}
        </TabsTrigger>
      ))}
    </TabsList>
  );
};

export default PartnerCategoryTabs;
