
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
  category: "venue" | "catering" | "decoration" | "music" | "photography" | "clothing" | "other";
  assignedTo: string;
  isFavorite?: boolean;
}

export interface TaskFilter {
  status: "all" | "completed" | "pending";
  category: "all" | Task["category"];
  priority: "all" | Task["priority"];
  search: string;
  dueDate: "all" | "today" | "week" | "month" | "overdue";
}

export const useTaskList = (initialTasks: Task[] = []) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("weddingTasks");
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });
  
  const [filter, setFilter] = useState<TaskFilter>({
    status: "all",
    category: "all",
    priority: "all",
    search: "",
    dueDate: "all"
  });

  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem("weddingTasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Omit<Task, "id" | "completed">) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      completed: false
    };
    setTasks([...tasks, newTask]);
    toast({
      title: "Tâche ajoutée",
      description: `La tâche "${task.title}" a été ajoutée avec succès.`
    });
  };

  const updateTask = (id: string, updates: Partial<Omit<Task, "id">>) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
    toast({
      title: "Tâche mise à jour",
      description: `La tâche a été mise à jour avec succès.`
    });
  };

  const deleteTask = (id: string) => {
    const taskToDelete = tasks.find(task => task.id === id);
    if (taskToDelete) {
      setTasks(tasks.filter(task => task.id !== id));
      toast({
        title: "Tâche supprimée",
        description: `La tâche "${taskToDelete.title}" a été supprimée.`,
        variant: "destructive"
      });
    }
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const completed = !task.completed;
        toast({
          title: completed ? "Tâche terminée" : "Tâche marquée comme en cours",
          description: `La tâche "${task.title}" a été ${completed ? "marquée comme terminée" : "marquée comme en cours"}.`
        });
        return { ...task, completed };
      }
      return task;
    }));
  };

  const toggleFavorite = (id: string) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const isFavorite = !task.isFavorite;
        toast({
          title: isFavorite ? "Ajoutée aux importantes" : "Retirée des importantes",
          description: `La tâche "${task.title}" a été ${isFavorite ? "ajoutée aux" : "retirée des"} tâches importantes.`
        });
        return { ...task, isFavorite };
      }
      return task;
    }));
  };

  // Apply filters
  const filterTasks = (tasksToFilter: Task[]) => {
    return tasksToFilter.filter(task => {
      // Filter by status
      if (filter.status === "completed" && !task.completed) return false;
      if (filter.status === "pending" && task.completed) return false;
      
      // Filter by category
      if (filter.category !== "all" && task.category !== filter.category) return false;
      
      // Filter by priority
      if (filter.priority !== "all" && task.priority !== filter.priority) return false;
      
      // Filter by search term
      if (filter.search && !task.title.toLowerCase().includes(filter.search.toLowerCase())) return false;
      
      // Filter by due date
      if (filter.dueDate !== "all") {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const taskDate = new Date(task.dueDate);
        taskDate.setHours(0, 0, 0, 0);
        
        // Calculate date ranges
        const weekFromNow = new Date(today);
        weekFromNow.setDate(today.getDate() + 7);
        
        const monthFromNow = new Date(today);
        monthFromNow.setMonth(today.getMonth() + 1);
        
        if (filter.dueDate === "today" && taskDate.getTime() !== today.getTime()) return false;
        if (filter.dueDate === "week" && (taskDate < today || taskDate > weekFromNow)) return false;
        if (filter.dueDate === "month" && (taskDate < today || taskDate > monthFromNow)) return false;
        if (filter.dueDate === "overdue" && taskDate >= today) return false;
      }
      
      return true;
    });
  };

  const filteredTasks = filterTasks(tasks);
  const favoriteTasks = tasks.filter(task => task.isFavorite && !task.completed);

  return {
    tasks: filteredTasks,
    allTasks: tasks,
    favoriteTasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    toggleFavorite,
    filter,
    setFilter
  };
};
