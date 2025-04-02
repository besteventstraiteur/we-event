
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  CheckCircle2, 
  Clock, 
  CalendarClock, 
  AlertCircle,
  Star,
  AlertTriangle
} from "lucide-react";
import { Task } from "@/hooks/useTaskList";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TaskStatsProps {
  tasks: Task[];
  favoriteTasks?: Task[];
  onTaskClick?: (taskId: string) => void;
}

const TaskStats: React.FC<TaskStatsProps> = ({ tasks, favoriteTasks = [], onTaskClick }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  
  // Get today's date at midnight for comparison
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Get one week from today
  const oneWeekFromNow = new Date(today);
  oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
  
  // Find urgent tasks (high priority and pending)
  const urgentTasks = tasks.filter(task => 
    task.priority === "high" && !task.completed
  ).length;
  
  // Find tasks due soon (due in the next 7 days and pending)
  const tasksDueSoon = tasks.filter(task => {
    if (task.completed) return false;
    
    const dueDate = new Date(task.dueDate);
    return dueDate >= today && dueDate <= oneWeekFromNow;
  }).length;
  
  // Find overdue tasks
  const overdueTasks = tasks.filter(task => {
    if (task.completed) return false;
    
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    
    return dueDate < today;
  }).length;
  
  // Calculate completion percentage
  const completionPercentage = totalTasks === 0 
    ? 0 
    : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="bg-white border-gray-200">
          <CardContent className="p-6 flex items-center">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <Clock className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Tâches en cours</p>
              <p className="text-2xl font-semibold">{pendingTasks}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border-gray-200">
          <CardContent className="p-6 flex items-center">
            <div className="rounded-full bg-green-100 p-3 mr-4">
              <CheckCircle2 className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Tâches terminées</p>
              <p className="text-2xl font-semibold">{completedTasks}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border-gray-200">
          <CardContent className="p-6 flex items-center">
            <div className="rounded-full bg-amber-100 p-3 mr-4">
              <CalendarClock className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Échéance proche</p>
              <p className="text-2xl font-semibold">{tasksDueSoon}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border-gray-200">
          <CardContent className="p-6 flex items-center">
            <div className="rounded-full bg-red-100 p-3 mr-4">
              <AlertCircle className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Tâches urgentes</p>
              <p className="text-2xl font-semibold">{urgentTasks}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border-gray-200">
          <CardContent className="p-6 flex items-center">
            <div className="rounded-full bg-orange-100 p-3 mr-4">
              <AlertTriangle className="h-6 w-6 text-orange-500" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Tâches en retard</p>
              <p className="text-2xl font-semibold">{overdueTasks}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {favoriteTasks.length > 0 && (
        <Card className="bg-white border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Star className="h-5 w-5 text-amber-500 mr-2" />
              <h3 className="font-semibold text-lg">Tâches importantes</h3>
            </div>
            <div className="space-y-2">
              {favoriteTasks.slice(0, 3).map(task => (
                <div 
                  key={task.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => onTaskClick?.(task.id)}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{task.title}</p>
                      <Badge 
                        variant={task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {task.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">{new Date(task.dueDate).toLocaleDateString('fr-FR')}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <CalendarClock className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {favoriteTasks.length > 3 && (
                <p className="text-sm text-amber-600 text-center mt-2">
                  +{favoriteTasks.length - 3} autres tâches importantes
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TaskStats;
