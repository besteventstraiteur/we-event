
import React from "react";
import { BellIcon, FileClock, List, Kanban, GanttChartSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProjectHeaderProps {
  unreadNotificationsCount: number;
  activeView: "list" | "kanban" | "timeline";
  onViewChange: (view: "list" | "kanban" | "timeline") => void;
  onNotificationsClick: () => void;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  unreadNotificationsCount,
  activeView,
  onViewChange,
  onNotificationsClick
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold">Tableau de Suivi de Projet</h1>
        <p className="text-gray-500">
          Plateforme d'Événements Matrimoniaux - Développement et Suivi
        </p>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm"
          className="relative"
          onClick={onNotificationsClick}
        >
          <BellIcon className="h-4 w-4 mr-2" />
          Notifications
          {unreadNotificationsCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unreadNotificationsCount}
            </span>
          )}
        </Button>
        
        <Tabs defaultValue={activeView} onValueChange={(v) => onViewChange(v as any)}>
          <TabsList>
            <TabsTrigger value="list" className="flex items-center gap-1">
              <List className="h-4 w-4" />
              <span className="hidden md:inline">Liste</span>
            </TabsTrigger>
            <TabsTrigger value="kanban" className="flex items-center gap-1">
              <Kanban className="h-4 w-4" />
              <span className="hidden md:inline">Kanban</span>
            </TabsTrigger>
            <TabsTrigger value="timeline" className="flex items-center gap-1">
              <GanttChartSquare className="h-4 w-4" />
              <span className="hidden md:inline">Timeline</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default ProjectHeader;
