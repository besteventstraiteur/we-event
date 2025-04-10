
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";

interface PartnersSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const PartnersSearch: React.FC<PartnersSearchProps> = ({ searchQuery, setSearchQuery }) => {
  const { t } = useLanguage();
  
  return (
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
  );
};

export default PartnersSearch;
