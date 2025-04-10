
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GoldButton from "@/components/GoldButton";
import { useLanguage } from "@/contexts/LanguageContext";
import VIPAdvantageNotice from "./VIPAdvantageNotice";

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
  const { t } = useLanguage();

  // Filtrer les prestataires en fonction de la catégorie active et de la recherche
  const filteredPartners = allPartners.filter((partner) => {
    const matchesCategory = activeCategory === "all" || partner.category === activeCategory;
    const matchesSearch = partner.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         partner.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('partners.title')}</h1>
        <p className="text-vip-gray-600">
          {t('partners.subtitle')}
        </p>
      </div>

      <div className="flex justify-between items-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-vip-gray-500" size={18} />
          <Input
            type="search"
            placeholder={t('partners.searchPlaceholder')}
            className="pl-10 border-vip-gray-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <VIPAdvantageNotice />

      <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="bg-white border border-vip-gray-300 overflow-x-auto flex w-full space-x-2 p-1">
          <TabsTrigger value="all" className="data-[state=active]:bg-vip-gold data-[state=active]:text-white">
            {t('partners.allCategory')}
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
                          {t('partners.seeDetails')}
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
  );
};

export default PartnersList;
