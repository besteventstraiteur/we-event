
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, Edit, Check, Calendar, User, Star } from "lucide-react";
import { Task } from "@/hooks/useTaskList";

interface TaskCardProps {
  task: Task;
  onToggleCompletion: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onToggleCompletion,
  onEdit,
  onDelete,
  onToggleFavorite
}) => {
  const getPriorityBadge = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">Priorité haute</Badge>;
      case "medium":
        return <Badge className="bg-amber-500">Priorité moyenne</Badge>;
      case "low":
        return <Badge variant="secondary">Priorité basse</Badge>;
      default:
        return null;
    }
  };

  const getCategoryBadge = (category: Task["category"]) => {
    const categoryLabels: Record<Task["category"], string> = {
      venue: "Lieu",
      catering: "Traiteur",
      decoration: "Décoration",
      music: "Musique",
      photography: "Photographie",
      clothing: "Tenues",
      other: "Autre"
    };
    
    return <Badge variant="outline">{categoryLabels[category]}</Badge>;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <Card className={`border-l-4 ${task.completed ? 'border-l-green-500 bg-green-50' : getPriorityBorderColor(task.priority)}`}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                {task.title}
              </h3>
              {getPriorityBadge(task.priority)}
              {getCategoryBadge(task.category)}
              {task.isFavorite && (
                <Star size={16} className="text-amber-500 fill-amber-500" />
              )}
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <Calendar size={14} className="flex-shrink-0" />
              <span>{formatDate(task.dueDate)}</span>
              {task.assignedTo && (
                <>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                  <User size={14} className="flex-shrink-0" />
                  <span>{task.assignedTo}</span>
                </>
              )}
            </div>
            
            <p className={`text-sm ${task.completed ? 'text-gray-500' : 'text-gray-700'}`}>
              {task.description}
            </p>
          </div>
          
          <div className="flex space-x-2 ml-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`p-2 h-8 ${task.completed ? 'text-green-600' : 'text-gray-600'}`}
              onClick={() => onToggleCompletion(task.id)}
            >
              <Check size={18} />
            </Button>
            
            {onToggleFavorite && (
              <Button 
                variant="ghost" 
                size="sm" 
                className={`p-2 h-8 ${task.isFavorite ? 'text-amber-500' : 'text-gray-600'}`}
                onClick={() => onToggleFavorite(task.id)}
              >
                <Star size={18} className={task.isFavorite ? "fill-amber-500" : ""} />
              </Button>
            )}
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-2 h-8 text-amber-600"
              onClick={() => onEdit(task)}
            >
              <Edit size={18} />
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-2 h-8 text-red-600"
              onClick={() => onDelete(task.id)}
            >
              <Trash2 size={18} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const getPriorityBorderColor = (priority: Task["priority"]) => {
  switch (priority) {
    case "high":
      return "border-l-red-500";
    case "medium":
      return "border-l-amber-500";
    case "low":
      return "border-l-blue-400";
    default:
      return "border-l-gray-300";
  }
};

export default TaskCard;
