
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ProjectTask, TaskStatus } from "@/types/projectTypes";

interface ProjectTimelineProps {
  tasks: ProjectTask[];
  onViewDetails: (taskId: string) => void;
}

const ProjectTimeline: React.FC<ProjectTimelineProps> = ({
  tasks,
  onViewDetails
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

  const mainCategories = tasks.filter(task => !task.parentId);
  
  const getSubtasks = (parentId: string) => {
    return tasks.filter(task => task.parentId === parentId);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chronologie du projet</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {mainCategories.map((category, index) => (
            <div key={category.id}>
              <div 
                className="flex items-center mb-4 cursor-pointer" 
                onClick={() => onViewDetails(category.id)}
              >
                <div className="flex-1">
                  <h3 className="text-lg font-medium">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.description}</p>
                </div>
                <Badge className={getStatusColor(category.status)}>
                  {getStatusTranslation(category.status)}
                </Badge>
              </div>
              
              <div className="relative pl-8 space-y-4">
                <div className="absolute top-0 bottom-0 left-3 w-0.5 bg-gray-200"></div>
                
                {getSubtasks(category.id).map((task, taskIndex) => (
                  <div 
                    key={task.id}
                    className="relative cursor-pointer" 
                    onClick={() => onViewDetails(task.id)}
                  >
                    <div className="absolute -left-5 top-2 h-4 w-4 rounded-full border-2 border-white bg-gray-200"></div>
                    <div className="flex flex-col space-y-2 border border-gray-100 rounded-md p-3">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{task.name}</h4>
                        <Badge className={getStatusColor(task.status)}>
                          {getStatusTranslation(task.status)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{task.description}</p>
                      {task.assignedTo && (
                        <div className="text-xs text-gray-500">
                          Assigné à: {task.assignedTo}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {index < mainCategories.length - 1 && (
                <Separator className="my-6" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectTimeline;
