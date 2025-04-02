
import { useState, useEffect } from "react";
import { ProjectTask, TaskStatus, TaskComment, TaskNotification } from "@/types/projectTypes";
import { useToast } from "@/hooks/use-toast";

const INITIAL_TASKS: ProjectTask[] = [
  {
    id: "security",
    name: "Sécurité et Confidentialité",
    description: "Implémenter des mesures renforcées pour protéger les données (devis, budget, adresses, etc.). Gérer un contrôle d'accès strict selon le type d'utilisateur (mariés, invités, prestataires, administrateurs).",
    status: "planning",
    completionRate: 0
  },
  {
    id: "security-encryption",
    name: "Chiffrement des données",
    description: "Mettre en place un chiffrement SSL/TLS pour toutes les communications et chiffrer les données sensibles en base (chiffrement au repos).",
    status: "planning",
    parentId: "security",
    completionRate: 0
  },
  {
    id: "security-access",
    name: "Gestion des droits d'accès",
    description: "Définir et implémenter des rôles et permissions clairs pour chaque type d'utilisateur. Vérifier que personne n'accède aux données qui ne lui sont pas destinées.",
    status: "planning",
    parentId: "security",
    completionRate: 0
  },
  {
    id: "security-auth",
    name: "Authentification renforcée",
    description: "Mettre en place l'authentification à deux facteurs (2FA) ou un mécanisme d'authentification biométrique sur mobile.",
    status: "planning",
    parentId: "security",
    completionRate: 0
  },
  
  {
    id: "integrations",
    name: "Prévoir les Intégrations Futures",
    description: "Anticiper et développer les connexions avec des services externes pour les paiements, les identités (Google, Facebook, Apple), ainsi que la visioconférence (talk-shows).",
    status: "planning",
    completionRate: 0
  },
  {
    id: "integrations-payment",
    name: "Intégration des solutions de paiement",
    description: "Ajouter une API de paiement (ex: Stripe, PayPal) pour faciliter le paiement des prestataires et la cagnotte en ligne pour les mariés.",
    status: "planning",
    parentId: "integrations",
    completionRate: 0
  },
  {
    id: "integrations-identity",
    name: "Systèmes d'identité numériques",
    description: "Mettre en place l'authentification via Google, Facebook, Apple ID (Social Login) pour simplifier la création de compte.",
    status: "planning",
    parentId: "integrations",
    completionRate: 0
  },
  {
    id: "integrations-video",
    name: "Services de visioconférence",
    description: "Ajouter la possibilité d'héberger des talk-shows ou réunions via Zoom, Google Meet ou similaire. Implémenter l'API correspondante.",
    status: "planning",
    parentId: "integrations",
    completionRate: 0
  },
  
  {
    id: "features",
    name: "Fonctionnalités Supplémentaires",
    description: "Développer les nouveautés suggérées pour enrichir l'expérience utilisateur et faciliter l'organisation du mariage.",
    status: "planning",
    completionRate: 0
  },
  {
    id: "features-todo",
    name: "Outil de suivi de tâches avancé",
    description: "Mettre en place un système de to-do list dynamique (rappels automatiques, affectation de tâches, priorisation, partage avec des proches).",
    status: "planning",
    parentId: "features",
    completionRate: 0
  },
  {
    id: "features-ai",
    name: "Assistant IA",
    description: "Proposer des recommandations de prestataires, d'idées déco, et un seating plan automatique basé sur les préférences et contraintes (algorithme IA).",
    status: "planning",
    parentId: "features",
    completionRate: 0
  },
  {
    id: "features-minisite",
    name: "Espace Mini-Site",
    description: "Générer automatiquement une page web dédiée au mariage : infos clés, RSVP, livre d'or, plans, hébergements proches, etc.",
    status: "planning",
    parentId: "features",
    completionRate: 0
  },
  {
    id: "features-feedback",
    name: "Système de feedback / avis clients",
    description: "Permettre aux mariés de laisser une note sur les prestataires. Gestion d'un classement ou de badges pour les prestataires (Top, Rapide, Fiable...).",
    status: "planning",
    parentId: "features",
    completionRate: 0
  },
  {
    id: "features-communication",
    name: "Gestion de la communication jour J",
    description: "Notifications push, partage de stories en direct, vidéos en live streaming. Envoi de rappels et d'éventuels plans B en cas de souci.",
    status: "planning",
    parentId: "features",
    completionRate: 0
  },
  {
    id: "features-marketplace",
    name: "Marketplace / Pack Mariage",
    description: "Regrouper plusieurs prestataires en formules « packagées » (ex: photographe + DJ + traiteur) et comparer facilement prix & délais.",
    status: "planning",
    parentId: "features",
    completionRate: 0
  },
  {
    id: "features-gamification",
    name: "Gamification / Programme de Fidélité",
    description: "Mettre en place un système de points, badges, ranking pour encourager les interactions et valoriser les meilleurs prestataires.",
    status: "planning",
    parentId: "features",
    completionRate: 0
  },
  
  {
    id: "kpis",
    name: "Mise en Place des KPIs",
    description: "Définir et implémenter les indicateurs clés pour suivre la performance et l'usage de la plateforme selon chaque type d'utilisateur (mariés, prestataires, invités, administrateurs).",
    status: "planning",
    completionRate: 0
  },
  {
    id: "kpis-clients",
    name: "KPIs pour les Mariés",
    description: "Taux de complétion des tâches, taux de réponse des prestataires, respect du budget, engagement des invités, satisfaction générale.",
    status: "planning",
    parentId: "kpis",
    completionRate: 0
  },
  {
    id: "kpis-partners",
    name: "KPIs pour les Prestataires",
    description: "Taux de conversion, temps de réponse, nombre de recommandations, taux de satisfaction, visibilité du profil.",
    status: "planning",
    parentId: "kpis",
    completionRate: 0
  },
  {
    id: "kpis-guests",
    name: "KPIs pour les Invités",
    description: "Taux d'utilisation de l'espace invité, nombre d'interactions (photos, messages, etc.), taux de satisfaction globale.",
    status: "planning",
    parentId: "kpis",
    completionRate: 0
  },
  {
    id: "kpis-admin",
    name: "KPIs pour l'Administrateur",
    description: "Nombre d'événements actifs, taux d'activation des comptes prestataires, taux de rétention, taux de satisfaction global, statistiques financières (revenus / coûts).",
    status: "planning",
    parentId: "kpis",
    completionRate: 0
  },
  {
    id: "kpis-dashboard",
    name: "Tableau de bord central",
    description: "Mettre en place un dashboard d'analyse permettant de visualiser en un coup d'œil tous les KPIs, segmentés par type d'utilisateur et par période.",
    status: "planning",
    parentId: "kpis",
    completionRate: 0
  },
  
  {
    id: "mobile",
    name: "Optimisations de l'Implémentation Mobile",
    description: "Finaliser l'application mobile (iOS/Android) avec une excellente UX, notifications push maîtrisées, mode hors-ligne partiel, et sécurisation par biométrie.",
    status: "planning",
    completionRate: 0
  },
  {
    id: "mobile-ux",
    name: "UI/UX mobile",
    description: "Prioriser la navigation par icônes et raccourcis d'actions. S'assurer d'une lisibilité optimale sur écrans de petite taille.",
    status: "planning",
    parentId: "mobile",
    completionRate: 0
  },
  {
    id: "mobile-notifications",
    name: "Notifications push granulaires",
    description: "Paramétrer la réception de notifications (mariés, invités, prestataires) avec un choix de catégories. Gérer le timing des alertes.",
    status: "planning",
    parentId: "mobile",
    completionRate: 0
  },
  {
    id: "mobile-offline",
    name: "Mode hors-ligne partiel",
    description: "Permettre la consultation de certaines infos (liste d'invités, plan de salle, tâches) sans connexion, puis synchronisation lors du retour en ligne.",
    status: "planning",
    parentId: "mobile",
    completionRate: 0
  },
  {
    id: "mobile-contacts",
    name: "Intégration des contacts téléphoniques",
    description: "Autoriser l'import automatique de contacts pour accélérer la création de la liste d'invités. Vérifier la sécurité et la confidentialité de ces données.",
    status: "planning",
    parentId: "mobile",
    completionRate: 0
  },
  {
    id: "mobile-security",
    name: "Sécurité mobile renforcée",
    description: "Gérer la connexion par Face ID / Touch ID sur iOS ou empreinte digitale sur Android. Protéger les tokens d'authentification.",
    status: "planning",
    parentId: "mobile",
    completionRate: 0
  }
];

export const useProjectTasks = () => {
  const [tasks, setTasks] = useState<ProjectTask[]>(() => {
    const savedTasks = localStorage.getItem("projectTasks");
    return savedTasks ? JSON.parse(savedTasks) : INITIAL_TASKS;
  });
  
  const [comments, setComments] = useState<TaskComment[]>(() => {
    const savedComments = localStorage.getItem("taskComments");
    return savedComments ? JSON.parse(savedComments) : [];
  });
  
  const [notifications, setNotifications] = useState<TaskNotification[]>(() => {
    const savedNotifications = localStorage.getItem("taskNotifications");
    return savedNotifications ? JSON.parse(savedNotifications) : [];
  });

  const { toast } = useToast();

  // Sauvegarder les données dans le localStorage
  useEffect(() => {
    localStorage.setItem("projectTasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("taskComments", JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    localStorage.setItem("taskNotifications", JSON.stringify(notifications));
  }, [notifications]);

  // Fonctions pour manipuler les tâches
  const updateTaskStatus = (taskId: string, newStatus: TaskStatus) => {
    const oldTask = tasks.find(t => t.id === taskId);
    if (!oldTask) return;
    
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId 
          ? { ...task, status: newStatus } 
          : task
      )
    );
    
    // Créer une notification pour le changement de statut
    addNotification({
      id: `notification-${Date.now()}`,
      taskId,
      message: `La tâche "${oldTask.name}" est passée au statut "${translateStatus(newStatus)}"`,
      timestamp: new Date(),
      isRead: false,
      type: "status-change"
    });
    
    toast({
      title: "Statut mis à jour",
      description: `Le statut de la tâche a été modifié en "${translateStatus(newStatus)}"`,
    });
  };

  const assignTask = (taskId: string, assigneeId: string, assigneeName: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId 
          ? { ...task, assignedTo: assigneeId } 
          : task
      )
    );
    
    // Créer une notification pour l'assignation
    addNotification({
      id: `notification-${Date.now()}`,
      taskId,
      message: `La tâche "${task.name}" a été assignée à ${assigneeName}`,
      timestamp: new Date(),
      isRead: false,
      type: "assignment"
    });
    
    toast({
      title: "Tâche assignée",
      description: `La tâche a été assignée à ${assigneeName}`,
    });
  };

  const updateTaskCompletion = (taskId: string, completionRate: number) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId 
          ? { 
              ...task, 
              completionRate,
              status: completionRate === 100 ? "completed" : task.status
            } 
          : task
      )
    );
    
    const task = tasks.find(t => t.id === taskId);
    if (task && completionRate === 100) {
      toast({
        title: "Tâche terminée",
        description: `La tâche "${task.name}" a été marquée comme terminée`,
      });
    } else if (task) {
      toast({
        title: "Progression mise à jour",
        description: `La progression de la tâche "${task.name}" est maintenant de ${completionRate}%`,
      });
    }
  };

  const addComment = (comment: Omit<TaskComment, "id">) => {
    const newComment: TaskComment = {
      ...comment,
      id: `comment-${Date.now()}`
    };
    
    setComments(prev => [...prev, newComment]);
    
    // Créer une notification pour le commentaire
    addNotification({
      id: `notification-${Date.now()}`,
      taskId: comment.taskId,
      message: `Nouveau commentaire de ${comment.userName} sur la tâche`,
      timestamp: new Date(),
      isRead: false,
      type: "comment"
    });
    
    toast({
      title: "Commentaire ajouté",
      description: "Votre commentaire a été ajouté avec succès",
    });
  };

  const addNotification = (notification: TaskNotification) => {
    setNotifications(prev => [notification, ...prev]);
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true } 
          : notification
      )
    );
  };

  const getTasksByParentId = (parentId?: string) => {
    return tasks.filter(task => task.parentId === parentId);
  };

  const getParentTasks = () => {
    return tasks.filter(task => !task.parentId);
  };

  const translateStatus = (status: TaskStatus): string => {
    const statusMap: Record<TaskStatus, string> = {
      "planning": "Planification",
      "in-progress": "En cours",
      "testing": "En test",
      "completed": "Terminé"
    };
    return statusMap[status];
  };

  const getTasksStats = () => {
    const total = tasks.length;
    const byStatus = {
      planning: tasks.filter(t => t.status === "planning").length,
      inProgress: tasks.filter(t => t.status === "in-progress").length,
      testing: tasks.filter(t => t.status === "testing").length,
      completed: tasks.filter(t => t.status === "completed").length
    };
    
    const overallCompletion = Math.round(
      (tasks.reduce((sum, task) => sum + (task.completionRate || 0), 0) / (total * 100)) * 100
    );
    
    return {
      total,
      byStatus,
      overallCompletion
    };
  };

  const getTaskById = (taskId: string) => {
    return tasks.find(task => task.id === taskId);
  };

  const getCommentsByTaskId = (taskId: string) => {
    return comments.filter(comment => comment.taskId === taskId);
  };

  const getUnreadNotificationsCount = () => {
    return notifications.filter(notification => !notification.isRead).length;
  };

  return {
    tasks,
    comments,
    notifications,
    updateTaskStatus,
    assignTask,
    updateTaskCompletion,
    addComment,
    markNotificationAsRead,
    getTasksByParentId,
    getParentTasks,
    translateStatus,
    getTasksStats,
    getTaskById,
    getCommentsByTaskId,
    getUnreadNotificationsCount,
  };
};
