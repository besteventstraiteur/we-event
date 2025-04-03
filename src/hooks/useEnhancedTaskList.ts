
import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from 'uuid';
import { TaskReminder, NewReminderParams, ReminderType, ReminderFrequency } from '@/models/taskReminder';
import { TaskSharing, NewSharingParams, PermissionLevel, UserType } from '@/models/sharedTask';

// Type de base pour les tâches
export interface BaseTask {
  id: string;
  title: string;
  description: string;
  dueDate: string; // Date ISO
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  category: string;
  tags?: string[];
  createdAt: string; // Date ISO
  updatedAt: string; // Date ISO
}

// Extension pour les tâches avec fonctionnalités avancées
export interface EnhancedTask extends BaseTask {
  assignedTo?: string; // ID de l'utilisateur assigné
  assignedToName?: string; // Nom de l'utilisateur assigné
  creator: {
    id: string;
    name: string;
    type: UserType;
  };
  reminders: TaskReminder[];
  sharing: TaskSharing[];
  isShared: boolean;
  isFavorite: boolean;
  hasReminders: boolean;
  progress?: number; // Pourcentage de progression (0-100)
  subtasks?: {
    id: string;
    title: string;
    completed: boolean;
  }[];
}

export interface TaskFilter {
  status: 'all' | 'completed' | 'active';
  priority: 'all' | 'high' | 'medium' | 'low';
  category: 'all' | string;
  assignee: 'all' | 'me' | 'others' | 'unassigned';
  dueDate: 'all' | 'overdue' | 'today' | 'tomorrow' | 'thisWeek' | 'nextWeek' | 'thisMonth';
  shared: 'all' | 'shared' | 'notShared';
  hasReminders: 'all' | 'withReminders' | 'withoutReminders';
  searchTerm: string;
}

export interface UseEnhancedTaskListOptions {
  userId: string;
  userName: string;
  userType: UserType;
  initialTasks?: EnhancedTask[];
  initialCategories?: {value: string, label: string}[];
  storageKey?: string;
}

export const useEnhancedTaskList = ({
  userId,
  userName,
  userType,
  initialTasks = [],
  initialCategories = [],
  storageKey = 'enhancedTasks'
}: UseEnhancedTaskListOptions) => {
  // État principal des tâches
  const [tasks, setTasks] = useState<EnhancedTask[]>(() => {
    const savedTasks = localStorage.getItem(storageKey);
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });

  // État des catégories
  const [categories, setCategories] = useState<{value: string, label: string}[]>(() => {
    const savedCategories = localStorage.getItem(`${storageKey}_categories`);
    return savedCategories ? JSON.parse(savedCategories) : initialCategories;
  });

  // État du filtre
  const [filter, setFilter] = useState<TaskFilter>({
    status: 'all',
    priority: 'all',
    category: 'all',
    assignee: 'all',
    dueDate: 'all',
    shared: 'all',
    hasReminders: 'all',
    searchTerm: ''
  });

  // Notification toast
  const { toast } = useToast();

  // Sauvegarde dans localStorage quand les tâches changent
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(tasks));
  }, [tasks, storageKey]);

  // Sauvegarde des catégories
  useEffect(() => {
    localStorage.setItem(`${storageKey}_categories`, JSON.stringify(categories));
  }, [categories, storageKey]);

  // Ajouter une nouvelle tâche
  const addTask = (taskData: Omit<BaseTask, 'id' | 'createdAt' | 'updatedAt' | 'completed'>): string => {
    const now = new Date().toISOString();
    const newTask: EnhancedTask = {
      id: `task-${uuidv4()}`,
      ...taskData,
      completed: false,
      createdAt: now,
      updatedAt: now,
      creator: {
        id: userId,
        name: userName,
        type: userType
      },
      reminders: [],
      sharing: [],
      isShared: false,
      isFavorite: false,
      hasReminders: false
    };

    setTasks([newTask, ...tasks]);
    
    toast({
      title: "Tâche ajoutée",
      description: `"${taskData.title}" a été ajoutée avec succès.`
    });

    return newTask.id;
  };

  // Mettre à jour une tâche existante
  const updateTask = (taskId: string, updates: Partial<Omit<EnhancedTask, 'id' | 'createdAt' | 'updatedAt'>>): boolean => {
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    
    if (taskIndex === -1) {
      toast({
        title: "Erreur",
        description: "La tâche que vous essayez de modifier n'existe pas.",
        variant: "destructive"
      });
      return false;
    }
    
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = {
      ...updatedTasks[taskIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    setTasks(updatedTasks);
    
    toast({
      title: "Tâche mise à jour",
      description: `"${updatedTasks[taskIndex].title}" a été mise à jour.`
    });
    
    return true;
  };

  // Supprimer une tâche
  const deleteTask = (taskId: string): boolean => {
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    
    if (taskIndex === -1) {
      toast({
        title: "Erreur",
        description: "La tâche que vous essayez de supprimer n'existe pas.",
        variant: "destructive"
      });
      return false;
    }
    
    const taskTitle = tasks[taskIndex].title;
    const updatedTasks = tasks.filter(t => t.id !== taskId);
    
    setTasks(updatedTasks);
    
    toast({
      title: "Tâche supprimée",
      description: `"${taskTitle}" a été supprimée.`,
      variant: "destructive"
    });
    
    return true;
  };

  // Basculer l'état d'achèvement d'une tâche
  const toggleTaskCompletion = (taskId: string): boolean => {
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    
    if (taskIndex === -1) return false;
    
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = {
      ...updatedTasks[taskIndex],
      completed: !updatedTasks[taskIndex].completed,
      updatedAt: new Date().toISOString()
    };
    
    setTasks(updatedTasks);
    
    toast({
      title: updatedTasks[taskIndex].completed ? "Tâche terminée" : "Tâche réactivée",
      description: updatedTasks[taskIndex].completed 
        ? `"${updatedTasks[taskIndex].title}" a été marquée comme terminée.`
        : `"${updatedTasks[taskIndex].title}" a été réactivée.`
    });
    
    return true;
  };

  // Basculer l'état favori d'une tâche
  const toggleFavorite = (taskId: string): boolean => {
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    
    if (taskIndex === -1) return false;
    
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = {
      ...updatedTasks[taskIndex],
      isFavorite: !updatedTasks[taskIndex].isFavorite,
      updatedAt: new Date().toISOString()
    };
    
    setTasks(updatedTasks);
    return true;
  };

  // Ajouter une catégorie
  const addCategory = (category: { value: string, label: string }): boolean => {
    if (categories.some(c => c.value === category.value)) {
      toast({
        title: "Erreur",
        description: `La catégorie "${category.label}" existe déjà.`,
        variant: "destructive"
      });
      return false;
    }
    
    setCategories([...categories, category]);
    
    toast({
      title: "Catégorie ajoutée",
      description: `La catégorie "${category.label}" a été ajoutée.`
    });
    
    return true;
  };

  // Ajouter un rappel à une tâche
  const addReminder = (taskId: string, reminderData: NewReminderParams): boolean => {
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    
    if (taskIndex === -1) return false;
    
    const now = new Date().toISOString();
    const newReminder: TaskReminder = {
      id: `reminder-${uuidv4()}`,
      taskId,
      type: reminderData.type,
      message: reminderData.message,
      date: reminderData.date, // This is now guaranteed to be a string
      frequency: reminderData.frequency,
      enabled: true,
      sent: false,
      recipients: reminderData.recipients
    };
    
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = {
      ...updatedTasks[taskIndex],
      reminders: [...updatedTasks[taskIndex].reminders, newReminder],
      hasReminders: true,
      updatedAt: now
    };
    
    setTasks(updatedTasks);
    
    toast({
      title: "Rappel ajouté",
      description: `Un rappel a été ajouté à "${updatedTasks[taskIndex].title}".`
    });
    
    return true;
  };

  // Supprimer un rappel
  const deleteReminder = (taskId: string, reminderId: string): boolean => {
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    
    if (taskIndex === -1) return false;
    
    const updatedReminders = tasks[taskIndex].reminders.filter(r => r.id !== reminderId);
    
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = {
      ...updatedTasks[taskIndex],
      reminders: updatedReminders,
      hasReminders: updatedReminders.length > 0,
      updatedAt: new Date().toISOString()
    };
    
    setTasks(updatedTasks);
    
    toast({
      title: "Rappel supprimé",
      description: `Un rappel a été supprimé de "${updatedTasks[taskIndex].title}".`
    });
    
    return true;
  };

  // Partager une tâche avec un utilisateur
  const shareTask = (taskId: string, sharingData: NewSharingParams): boolean => {
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    
    if (taskIndex === -1) return false;
    
    // Vérifier si la tâche est déjà partagée avec cet utilisateur
    if (tasks[taskIndex].sharing.some(s => s.userId === sharingData.userId)) {
      toast({
        title: "Erreur",
        description: `La tâche est déjà partagée avec ${sharingData.userName}.`,
        variant: "destructive"
      });
      return false;
    }
    
    const now = new Date().toISOString();
    const newSharing: TaskSharing = {
      id: `sharing-${uuidv4()}`,
      taskId,
      userId: sharingData.userId,
      userName: sharingData.userName,
      userEmail: sharingData.userEmail,
      userType: sharingData.userType,
      permission: sharingData.permission,
      sharedAt: now,
      notified: false,
      accepted: false
    };
    
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = {
      ...updatedTasks[taskIndex],
      sharing: [...updatedTasks[taskIndex].sharing, newSharing],
      isShared: true,
      updatedAt: now
    };
    
    setTasks(updatedTasks);
    
    toast({
      title: "Tâche partagée",
      description: `"${updatedTasks[taskIndex].title}" a été partagée avec ${sharingData.userName}.`
    });
    
    return true;
  };

  // Supprimer un partage
  const removeSharing = (taskId: string, sharingId: string): boolean => {
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    
    if (taskIndex === -1) return false;
    
    const updatedSharing = tasks[taskIndex].sharing.filter(s => s.id !== sharingId);
    
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = {
      ...updatedTasks[taskIndex],
      sharing: updatedSharing,
      isShared: updatedSharing.length > 0,
      updatedAt: new Date().toISOString()
    };
    
    setTasks(updatedTasks);
    
    toast({
      title: "Partage supprimé",
      description: `Un partage a été supprimé de "${updatedTasks[taskIndex].title}".`
    });
    
    return true;
  };

  // Filtrer les tâches en fonction des critères sélectionnés
  const filteredTasks = tasks.filter(task => {
    // Filtre par statut
    if (filter.status === 'completed' && !task.completed) return false;
    if (filter.status === 'active' && task.completed) return false;
    
    // Filtre par priorité
    if (filter.priority !== 'all' && task.priority !== filter.priority) return false;
    
    // Filtre par catégorie
    if (filter.category !== 'all' && task.category !== filter.category) return false;
    
    // Filtre par assignation
    if (filter.assignee === 'me' && task.assignedTo !== userId) return false;
    if (filter.assignee === 'others' && task.assignedTo === userId) return false;
    if (filter.assignee === 'unassigned' && task.assignedTo) return false;
    
    // Filtre par date d'échéance
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    const nextMonth = new Date(today);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    
    const dueDate = new Date(task.dueDate);
    
    if (filter.dueDate === 'overdue' && dueDate >= today) return false;
    if (filter.dueDate === 'today' && (dueDate < today || dueDate >= tomorrow)) return false;
    if (filter.dueDate === 'tomorrow' && (dueDate < tomorrow || dueDate >= new Date(tomorrow.getTime() + 86400000))) return false;
    if (filter.dueDate === 'thisWeek' && (dueDate < today || dueDate >= nextWeek)) return false;
    if (filter.dueDate === 'nextWeek' && (dueDate < nextWeek || dueDate >= nextMonth)) return false;
    if (filter.dueDate === 'thisMonth' && (dueDate < today || dueDate >= nextMonth)) return false;
    
    // Filtre par partage
    if (filter.shared === 'shared' && !task.isShared) return false;
    if (filter.shared === 'notShared' && task.isShared) return false;
    
    // Filtre par rappels
    if (filter.hasReminders === 'withReminders' && !task.hasReminders) return false;
    if (filter.hasReminders === 'withoutReminders' && task.hasReminders) return false;
    
    // Filtre par terme de recherche
    if (filter.searchTerm && !task.title.toLowerCase().includes(filter.searchTerm.toLowerCase()) && 
        !task.description.toLowerCase().includes(filter.searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  // Obtenir les tâches favorites
  const favoriteTasks = tasks.filter(task => task.isFavorite);
  
  // Obtenir les tâches avec rappels
  const tasksWithReminders = tasks.filter(task => task.hasReminders);
  
  // Obtenir les tâches partagées
  const sharedTasks = tasks.filter(task => task.isShared);
  
  // Obtenir les tâches échues
  const overdueTasks = tasks.filter(task => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(task.dueDate);
    return dueDate < today && !task.completed;
  });
  
  // Statistiques
  const statistics = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    active: tasks.filter(t => !t.completed).length,
    highPriority: tasks.filter(t => t.priority === 'high' && !t.completed).length,
    withReminders: tasksWithReminders.length,
    shared: sharedTasks.length,
    overdue: overdueTasks.length,
    favorites: favoriteTasks.length,
    completionRate: tasks.length > 0 ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100) : 0
  };

  return {
    tasks: filteredTasks,
    allTasks: tasks,
    favoriteTasks,
    tasksWithReminders,
    sharedTasks,
    overdueTasks,
    categories,
    filter,
    setFilter,
    statistics,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    toggleFavorite,
    addCategory,
    addReminder,
    deleteReminder,
    shareTask,
    removeSharing
  };
};
