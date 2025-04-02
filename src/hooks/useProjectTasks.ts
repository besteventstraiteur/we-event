
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

export type TaskStatus = "pending" | "in-progress" | "completed" | "blocked";
export type TaskPriority = "low" | "medium" | "high";

export interface ProjectTask {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string | Date;
  assignedTo?: string;
}

export interface TaskCategory {
  value: string;
  label: string;
}

// Catégories de tâches basées sur le cahier des charges
const defaultCategories: TaskCategory[] = [
  { value: "security", label: "Sécurité & Confidentialité" },
  { value: "integration", label: "Intégrations" },
  { value: "features", label: "Fonctionnalités" },
  { value: "kpi", label: "KPIs & Métriques" },
  { value: "mobile", label: "Application Mobile" },
  { value: "other", label: "Autres" },
];

// Tâches initiales pour la démo
const initialTasks: ProjectTask[] = [
  {
    id: "task-1",
    title: "Mettre en place le chiffrement SSL/TLS",
    description: "Configurer les certificats SSL/TLS pour toutes les communications et vérifier que toutes les routes HTTP sont redirigées en HTTPS.",
    category: "security",
    priority: "high",
    status: "pending",
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // dans 7 jours
  },
  {
    id: "task-2",
    title: "Développer l'authentification à deux facteurs",
    description: "Implémenter l'authentification 2FA pour renforcer la sécurité des comptes utilisateurs.",
    category: "security",
    priority: "medium",
    status: "pending",
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // dans 14 jours
  },
  {
    id: "task-3",
    title: "Intégrer la solution de paiement Stripe",
    description: "Configurer l'API Stripe pour les paiements des prestataires et la cagnotte en ligne.",
    category: "integration",
    priority: "high",
    status: "pending",
    dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // dans 10 jours
  },
  {
    id: "task-4",
    title: "Créer le système de to-do list avancé",
    description: "Développer un module de liste de tâches dynamique avec rappels, affectations et priorisations.",
    category: "features",
    priority: "medium",
    status: "in-progress",
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // dans 5 jours
    assignedTo: "Sophie",
  },
  {
    id: "task-5",
    title: "Développer la génération de mini-site de mariage",
    description: "Créer un générateur automatique de page web dédiée au mariage avec informations clés, RSVP, et livre d'or.",
    category: "features",
    priority: "low",
    status: "pending",
    dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // dans 21 jours
  },
  {
    id: "task-6",
    title: "Implémenter le tableau de bord KPIs pour les mariés",
    description: "Développer des métriques de suivi pour les mariés: taux de complétion des tâches, taux de réponse des prestataires, etc.",
    category: "kpi",
    priority: "medium",
    status: "completed",
    dueDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // il y a 3 jours
    assignedTo: "Thomas",
  },
  {
    id: "task-7",
    title: "Optimiser l'UI/UX mobile",
    description: "Améliorer la navigation par icônes et les raccourcis d'actions sur mobile. Assurer une lisibilité optimale sur petits écrans.",
    category: "mobile",
    priority: "high",
    status: "blocked",
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // dans 2 jours
    assignedTo: "Julie",
  },
];

export const useProjectTasks = (initialTasksData: ProjectTask[] = initialTasks) => {
  const [tasks, setTasks] = useState<ProjectTask[]>(() => {
    const savedTasks = localStorage.getItem("projectTasks");
    return savedTasks ? JSON.parse(savedTasks) : initialTasksData;
  });
  
  const [categories, setCategories] = useState<TaskCategory[]>(() => {
    const savedCategories = localStorage.getItem("taskCategories");
    return savedCategories ? JSON.parse(savedCategories) : defaultCategories;
  });

  const { toast } = useToast();

  // Sauvegarde dans le localStorage
  useEffect(() => {
    localStorage.setItem("projectTasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("taskCategories", JSON.stringify(categories));
  }, [categories]);

  // Ajout d'une tâche
  const addTask = (task: Omit<ProjectTask, "id">) => {
    const newTask: ProjectTask = {
      ...task,
      id: `task-${Date.now()}`,
      dueDate: task.dueDate instanceof Date ? task.dueDate.toISOString() : task.dueDate,
    };
    
    setTasks([...tasks, newTask]);
    
    toast({
      title: "Tâche ajoutée",
      description: `La tâche "${task.title}" a été ajoutée avec succès.`,
    });
    
    return newTask.id;
  };

  // Mise à jour d'une tâche
  const updateTask = (id: string, updates: Partial<ProjectTask>) => {
    if (id === "new") {
      // C'est une nouvelle tâche
      addTask(updates as Omit<ProjectTask, "id">);
      return;
    }
    
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        // Assurer que dueDate est au bon format
        const formattedUpdates = {
          ...updates,
          dueDate: updates.dueDate instanceof Date 
            ? updates.dueDate.toISOString() 
            : updates.dueDate || task.dueDate,
        };
        
        return { ...task, ...formattedUpdates };
      }
      return task;
    });
    
    setTasks(updatedTasks);
    
    toast({
      title: "Tâche mise à jour",
      description: `La tâche a été mise à jour avec succès.`,
    });
  };

  // Mise à jour du statut d'une tâche
  const updateTaskStatus = (id: string, status: TaskStatus) => {
    updateTask(id, { status });
  };

  // Suppression d'une tâche
  const deleteTask = (id: string) => {
    const taskToDelete = tasks.find((task) => task.id === id);
    if (taskToDelete) {
      setTasks(tasks.filter((task) => task.id !== id));
      
      toast({
        title: "Tâche supprimée",
        description: `La tâche "${taskToDelete.title}" a été supprimée.`,
        variant: "destructive",
      });
    }
  };

  // Ajout d'une catégorie
  const addCategory = (category: TaskCategory) => {
    if (categories.some((c) => c.value === category.value)) {
      toast({
        title: "Erreur",
        description: `La catégorie "${category.label}" existe déjà.`,
        variant: "destructive",
      });
      return;
    }
    
    setCategories([...categories, category]);
    
    toast({
      title: "Catégorie ajoutée",
      description: `La catégorie "${category.label}" a été ajoutée avec succès.`,
    });
  };

  // Obtenir les tâches par statut
  const tasksByStatus = tasks.reduce<Record<TaskStatus, ProjectTask[]>>(
    (acc, task) => {
      if (!acc[task.status]) {
        acc[task.status] = [];
      }
      acc[task.status].push(task);
      return acc;
    },
    { pending: [], "in-progress": [], completed: [], blocked: [] }
  );

  // Obtenir les tâches par catégorie
  const tasksByCategory = tasks.reduce<Record<string, ProjectTask[]>>(
    (acc, task) => {
      if (!acc[task.category]) {
        acc[task.category] = [];
      }
      acc[task.category].push(task);
      return acc;
    },
    {}
  );

  // Statistiques globales
  const statistics = {
    totalTasks: tasks.length,
    completedTasks: tasks.filter((task) => task.status === "completed").length,
    pendingTasks: tasks.filter((task) => task.status === "pending").length,
    inProgressTasks: tasks.filter((task) => task.status === "in-progress").length,
    blockedTasks: tasks.filter((task) => task.status === "blocked").length,
    highPriorityTasks: tasks.filter(
      (task) => task.priority === "high" && task.status !== "completed"
    ).length,
    completionPercentage:
      tasks.length > 0
        ? Math.round(
            (tasks.filter((task) => task.status === "completed").length /
              tasks.length) *
              100
          )
        : 0,
  };

  return {
    tasks,
    categories,
    addTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
    addCategory,
    tasksByStatus,
    tasksByCategory,
    statistics,
  };
};
