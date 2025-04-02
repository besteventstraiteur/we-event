
import React from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Task } from "@/hooks/useTaskList";

interface TaskFilterProps {
  filter: {
    status: "all" | "completed" | "pending";
    category: "all" | Task["category"];
    priority: "all" | Task["priority"];
    search: string;
  };
  onFilterChange: (filter: any) => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ filter, onFilterChange }) => {
  const handleStatusChange = (value: string) => {
    onFilterChange({ ...filter, status: value });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filter, search: e.target.value });
  };

  const handleCategoryChange = (value: string) => {
    onFilterChange({ ...filter, category: value });
  };

  const handlePriorityChange = (value: string) => {
    onFilterChange({ ...filter, priority: value });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Rechercher des tâches..."
            className="pl-10 border-gray-300"
            value={filter.search}
            onChange={handleSearchChange}
          />
        </div>
        
        <div className="flex-shrink-0 flex space-x-2">
          <Select value={filter.category} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-[140px] border-gray-300">
              <Filter size={16} className="mr-2" />
              <SelectValue placeholder="Catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes</SelectItem>
              <SelectItem value="venue">Lieu</SelectItem>
              <SelectItem value="catering">Traiteur</SelectItem>
              <SelectItem value="decoration">Décoration</SelectItem>
              <SelectItem value="music">Musique</SelectItem>
              <SelectItem value="photography">Photographie</SelectItem>
              <SelectItem value="clothing">Tenues</SelectItem>
              <SelectItem value="other">Autre</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filter.priority} onValueChange={handlePriorityChange}>
            <SelectTrigger className="w-[140px] border-gray-300">
              <SelectValue placeholder="Priorité" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes</SelectItem>
              <SelectItem value="high">Haute</SelectItem>
              <SelectItem value="medium">Moyenne</SelectItem>
              <SelectItem value="low">Basse</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs value={filter.status} onValueChange={handleStatusChange} className="w-full">
        <TabsList className="bg-white border border-gray-200 w-full">
          <TabsTrigger 
            value="all" 
            className="flex-1 data-[state=active]:bg-amber-500 data-[state=active]:text-white"
          >
            Toutes
          </TabsTrigger>
          <TabsTrigger 
            value="pending" 
            className="flex-1 data-[state=active]:bg-amber-500 data-[state=active]:text-white"
          >
            En cours
          </TabsTrigger>
          <TabsTrigger 
            value="completed" 
            className="flex-1 data-[state=active]:bg-amber-500 data-[state=active]:text-white"
          >
            Terminées
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default TaskFilter;
