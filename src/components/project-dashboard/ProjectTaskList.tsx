
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { ProjectTask, TaskStatus } from "@/types/projectTypes";
import { ChevronDown, ChevronRight, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProjectTaskListProps {
  parentTasks: ProjectTask[];
  subtasks: Record<string, ProjectTask[]>;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
  onViewDetails: (taskId: string) => void;
  onAssign: (taskId: string) => void;
  getCommentsCount: (taskId: string) => number;
}

const ProjectTaskList: React.FC<ProjectTaskListProps> = ({
  parentTasks,
  subtasks,
  onStatusChange,
  onViewDetails,
  onAssign,
  getCommentsCount
}) => {
  const [expandedTasks, setExpandedTasks] = React.useState<Record<string, boolean>>({});

  const toggleExpand = (taskId: string) => {
    setExpandedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

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
    <Card>
      <CardHeader>
        <CardTitle>Liste des tâches</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {parentTasks.map(task => {
            const hasSubtasks = (subtasks[task.id] || []).length > 0;
            const isExpanded = expandedTasks[task.id];
            
            return (
              <div key={task.id}>
                <div className="bg-gray-50 p-3 rounded-md mb-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {hasSubtasks && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 p-0 mr-2"
                          onClick={() => toggleExpand(task.id)}
                        >
                          {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </Button>
                      )}
                      <span className="font-medium">{task.name}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
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
                  </div>
                  
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Progression</span>
                      <span>{task.completionRate || 0}%</span>
                    </div>
                    <Progress value={task.completionRate || 0} className="h-1" />
                  </div>
                </div>
                
                {isExpanded && hasSubtasks && (
                  <div className="pl-6 space-y-1 mt-1 mb-2">
                    {subtasks[task.id].map(subtask => (
                      <div key={subtask.id} className="bg-white border border-gray-100 p-3 rounded-md">
                        <div className="flex items-center justify-between">
                          <span>{subtask.name}</span>
                          
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(subtask.status)}>
                              {getStatusTranslation(subtask.status)}
                            </Badge>
                            
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => onViewDetails(subtask.id)}>
                                  Voir les détails
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => onAssign(subtask.id)}>
                                  Assigner
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  onClick={() => onStatusChange(subtask.id, "planning")}
                                  disabled={subtask.status === "planning"}
                                >
                                  Marquer comme Planification
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => onStatusChange(subtask.id, "in-progress")}
                                  disabled={subtask.status === "in-progress"}
                                >
                                  Marquer comme En cours
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => onStatusChange(subtask.id, "testing")}
                                  disabled={subtask.status === "testing"}
                                >
                                  Marquer comme En test
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => onStatusChange(subtask.id, "completed")}
                                  disabled={subtask.status === "completed"}
                                >
                                  Marquer comme Terminé
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                        
                        <div className="mt-2">
                          <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <span>Progression</span>
                            <span>{subtask.completionRate || 0}%</span>
                          </div>
                          <Progress value={subtask.completionRate || 0} className="h-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectTaskList;
