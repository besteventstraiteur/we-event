
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  CheckCircle2, 
  Clock, 
  CalendarClock, 
  AlertCircle 
} from "lucide-react";
import { Task } from "@/hooks/useTaskList";

interface TaskStatsProps {
  tasks: Task[];
}

const TaskStats: React.FC<TaskStatsProps> = ({ tasks }) => {
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
  
  // Calculate completion percentage
  const completionPercentage = totalTasks === 0 
    ? 0 
    : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
    </div>
  );
};

export default TaskStats;
