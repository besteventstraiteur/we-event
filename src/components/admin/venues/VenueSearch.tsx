
import React from 'react';
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

interface VenueSearchProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const VenueSearch: React.FC<VenueSearchProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative w-full sm:w-auto">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-vip-gray-400" />
      <Input
        type="search"
        placeholder="Rechercher une salle..."
        className="pl-9 bg-vip-gray-900 border-vip-gray-800 text-vip-white w-full sm:w-80"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default VenueSearch;
