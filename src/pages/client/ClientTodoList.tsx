
import React from 'react';
import DashboardLayout from "@/components/DashboardLayout";
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { useEventTasks } from '@/hooks/useEventTasks';
import TaskList from '@/components/event-tasks/TaskList';
import TaskStats from '@/components/event-tasks/TaskStats';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Initial to-do list to get users started
const initialTasks = [
  {
    id: "1",
    title: "Choisir la date et le lieu",
    description: "Définir la date et réserver le lieu de la cérémonie et de la réception",
    assignedTo: "couple" as const,
    dueDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
    completed: false,
    priority: "high" as const,
    category: "venue" as const
  },
  {
    id: "2",
    title: "Sélectionner les témoins",
    description: "Choisir les témoins et leur demander officiellement",
    assignedTo: "couple" as const,
    dueDate: new Date(new Date().setDate(new Date().getDate() + 14)),
    completed: false,
    priority: "medium" as const,
    category: "ceremony" as const
  },
  {
    id: "3",
    title: "Établir la liste d'invités préliminaire",
    description: "Créer une première liste d'invités et collecter leurs adresses",
    assignedTo: "both" as const,
    dueDate: new Date(new Date().setDate(new Date().getDate() + 30)),
    completed: false,
    priority: "medium" as const,
    category: "other" as const
  },
  {
    id: "4",
    title: "Organiser la dégustation de menu",
    description: "Prendre rendez-vous avec le traiteur pour une dégustation",
    assignedTo: "witness" as const,
    dueDate: new Date(new Date().setDate(new Date().getDate() + 20)),
    completed: false,
    priority: "low" as const,
    category: "catering" as const
  },
  {
    id: "5",
    title: "Choisir le thème et les couleurs du mariage",
    description: "Définir le thème, les couleurs et le style général de la décoration",
    assignedTo: "couple" as const,
    dueDate: undefined,
    completed: true,
    priority: "medium" as const,
    category: "decoration" as const
  }
];

const ClientTodoList: React.FC = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  const {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion
  } = useEventTasks(initialTasks);

  const handleAddTask = (task: Omit<typeof tasks[0], 'id' | 'completed'>) => {
    const id = addTask(task);
    toast({
      title: "Tâche ajoutée",
      description: "La nouvelle tâche a été ajoutée avec succès."
    });
    return id;
  };

  const handleUpdateTask = (taskId: string, updates: Partial<Omit<typeof tasks[0], 'id'>>) => {
    updateTask(taskId, updates);
    toast({
      title: "Tâche mise à jour",
      description: "La tâche a été mise à jour avec succès."
    });
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
    toast({
      title: "Tâche supprimée",
      description: "La tâche a été supprimée avec succès."
    });
  };

  const handleToggleCompletion = (taskId: string) => {
    toggleTaskCompletion(taskId);
    
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      toast({
        title: task.completed ? "Tâche marquée comme à faire" : "Tâche terminée",
        description: task.completed 
          ? "La tâche a été marquée comme à faire." 
          : "La tâche a été marquée comme terminée."
      });
    }
  };

  return (
    <DashboardLayout type="client">
      <div className="space-y-4">
        <div>
          <h1 className={`font-bold text-gray-900 ${isMobile ? 'text-xl' : 'text-3xl'}`}>
            Checklist de préparation
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Gérez toutes les tâches pour votre événement
          </p>
        </div>

        <TaskStats tasks={tasks} />

        <Card className="bg-white border-gray-200">
          <CardHeader>
            <CardTitle>Liste des tâches</CardTitle>
            <CardDescription>
              Suivez et organisez les tâches pour vous et vos témoins
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TaskList 
              tasks={tasks}
              onAddTask={handleAddTask}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
              onToggleCompletion={handleToggleCompletion}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ClientTodoList;
