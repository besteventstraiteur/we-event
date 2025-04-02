
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ProjectTask, TaskStatus } from "@/types/projectTypes";
import { 
  Calendar, 
  Clock, 
  MessageSquare, 
  MoreHorizontal, 
  User 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProjectTaskCardProps {
  task: ProjectTask;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
  onViewDetails: (taskId: string) => void;
  onAssign: (taskId: string) => void;
  commentsCount: number;
}

const ProjectTaskCard: React.FC<ProjectTaskCardProps> = ({
  task,
  onStatusChange,
  onViewDetails,
  onAssign,
  commentsCount
}) => {
  const getStatusColor = (status: TaskStatus) => {
    const statusColors: Record<TaskStatus, string> = {
      "planning": "bg-blue-100 text-blue-800",
      "in-progress": "bg-yellow-100 text-yellow-800",
      "testing": "bg-purple-100 text-purple-800",
      "completed": "bg-green-100 text-green-800"
    };
    return statusColors[status] || "bg-gray-100 text-gray-800";
  };

  const getStatusTranslation = (status: TaskStatus) => {
    const statusMap: Record<TaskStatus, string> = {
      "planning": "Planification",
      "in-progress": "En cours",
      "testing": "En test",
      "completed": "Terminé"
    };
    return statusMap[status];
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge className={getStatusColor(task.status)}>
            {getStatusTranslation(task.status)}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onViewDetails(task.id)}>
                Voir les détails
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onAssign(task.id)}>
                Assigner
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => onStatusChange(task.id, "planning")}
                disabled={task.status === "planning"}
              >
                Marquer comme Planification
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onStatusChange(task.id, "in-progress")}
                disabled={task.status === "in-progress"}
              >
                Marquer comme En cours
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onStatusChange(task.id, "testing")}
                disabled={task.status === "testing"}
              >
                Marquer comme En test
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onStatusChange(task.id, "completed")}
                disabled={task.status === "completed"}
              >
                Marquer comme Terminé
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardTitle className="text-lg mt-2">{task.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-gray-600 line-clamp-3 mb-4">
          {task.description}
        </p>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Progression</span>
              <span>{task.completionRate || 0}%</span>
            </div>
            <Progress value={task.completionRate || 0} className="h-2" />
          </div>
          
          {task.assignedTo && (
            <div className="flex items-center text-sm text-gray-600">
              <User className="h-4 w-4 mr-1" />
              <span>Assigné à: {task.assignedTo}</span>
            </div>
          )}
          
          {task.dueDate && (
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="h-4 w-4 mr-1" />
              <span>
                Échéance: {new Date(task.dueDate).toLocaleDateString('fr-FR')}
              </span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between">
        {commentsCount > 0 && (
          <div className="flex items-center text-sm text-gray-600">
            <MessageSquare className="h-4 w-4 mr-1" />
            <span>{commentsCount} commentaires</span>
          </div>
        )}
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onViewDetails(task.id)}
        >
          Détails
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectTaskCard;
