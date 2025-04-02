
import { useState, useEffect } from "react";

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

export const useTaskList = (initialTasks: Task[] = []) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("weddingTasks");
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });
  
  const [filter, setFilter] = useState<{
    status: "all" | "completed" | "pending";
    category: "all" | Task["category"];
    priority: "all" | Task["priority"];
    search: string;
  }>({
    status: "all",
    category: "all",
    priority: "all",
    search: ""
  });

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
  };

  const updateTask = (id: string, updates: Partial<Omit<Task, "id">>) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const toggleFavorite = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, isFavorite: !task.isFavorite } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    // Filter by status
    if (filter.status === "completed" && !task.completed) return false;
    if (filter.status === "pending" && task.completed) return false;
    
    // Filter by category
    if (filter.category !== "all" && task.category !== filter.category) return false;
    
    // Filter by priority
    if (filter.priority !== "all" && task.priority !== filter.priority) return false;
    
    // Filter by search term
    if (filter.search && !task.title.toLowerCase().includes(filter.search.toLowerCase())) return false;
    
    return true;
  });

  const favoriteTasks = tasks.filter(task => task.isFavorite && !task.completed);

  return {
    tasks: filteredTasks,
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
