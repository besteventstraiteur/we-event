
import { useState, useEffect } from 'react';

export interface EventTask {
  id: string;
  title: string;
  description?: string;
  assignedTo: 'couple' | 'witness' | 'both';
  dueDate?: Date;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: 'venue' | 'catering' | 'decoration' | 'attire' | 'ceremony' | 'reception' | 'other';
}

export const useEventTasks = (initialTasks: EventTask[] = []) => {
  const [tasks, setTasks] = useState<EventTask[]>([]);

  // Load tasks from localStorage if available
  useEffect(() => {
    const savedTasks = localStorage.getItem('eventTasks');
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch (e) {
        console.error('Error loading tasks from localStorage:', e);
        setTasks(initialTasks);
      }
    } else {
      setTasks(initialTasks);
    }
  }, [initialTasks]);

  // Save tasks to localStorage when they change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('eventTasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  // Add a new task
  const addTask = (task: Omit<EventTask, 'id' | 'completed'>) => {
    const newTask: EventTask = {
      ...task,
      id: `task-${Date.now()}`,
      completed: false
    };
    
    setTasks([...tasks, newTask]);
    return newTask.id;
  };

  // Update a task
  const updateTask = (taskId: string, updates: Partial<Omit<EventTask, 'id'>>) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ));
  };

  // Delete a task
  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Toggle task completion status
  const toggleTaskCompletion = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  // Filter tasks by assignee
  const getTasksByAssignee = (assignee: 'couple' | 'witness' | 'both') => {
    return tasks.filter(task => 
      task.assignedTo === assignee || task.assignedTo === 'both'
    );
  };

  // Filter tasks by completion status
  const getTasksByStatus = (completed: boolean) => {
    return tasks.filter(task => task.completed === completed);
  };

  // Get tasks by category
  const getTasksByCategory = (category: EventTask['category']) => {
    return tasks.filter(task => task.category === category);
  };

  // Get tasks by priority
  const getTasksByPriority = (priority: EventTask['priority']) => {
    return tasks.filter(task => task.priority === priority);
  };

  return {
    tasks,
    setTasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    getTasksByAssignee,
    getTasksByStatus,
    getTasksByCategory,
    getTasksByPriority
  };
};
