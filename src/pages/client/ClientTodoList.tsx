
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import TaskCard from "@/components/client-todo/TaskCard";
import TaskForm from "@/components/client-todo/TaskForm";
import TaskFilter from "@/components/client-todo/TaskFilter";
import TaskStats from "@/components/client-todo/TaskStats";
import { useTaskList, Task } from "@/hooks/useTaskList";
import { useToast } from "@/components/ui/use-toast";

// Données initiales pour la démo
const initialTasks: Task[] = [
  {
    id: "1",
    title: "Réserver le lieu de réception",
    description: "Contacter les 3 lieux présélectionnés et confirmer les disponibilités pour la date choisie",
    dueDate: "2024-06-15",
    priority: "high",
    completed: false,
    category: "venue",
    assignedTo: "Sophie"
  },
  {
    id: "2",
    title: "Sélectionner le menu avec le traiteur",
    description: "Organiser une dégustation et finaliser les choix de menu pour la réception",
    dueDate: "2024-07-20",
    priority: "medium",
    completed: false,
    category: "catering",
    assignedTo: "Thomas"
  },
  {
    id: "3",
    title: "Envoyer les invitations",
    description: "Finaliser la liste des invités et envoyer les invitations",
    dueDate: "2024-05-10",
    priority: "high",
    completed: true,
    category: "other",
    assignedTo: "Sophie et Thomas"
  },
];

const ClientTodoList = () => {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined);
  const { toast } = useToast();
  
  const {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    filter,
    setFilter
  } = useTaskList(initialTasks);

  const handleAddNewTask = () => {
    setCurrentTask(undefined);
    setIsAddTaskOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setCurrentTask(task);
    setIsAddTaskOpen(true);
  };

  const handleSaveTask = (taskData: Omit<Task, "id" | "completed">) => {
    if (currentTask) {
      updateTask(currentTask.id, taskData);
      toast({
        title: "Tâche mise à jour",
        description: `La tâche "${taskData.title}" a été mise à jour avec succès.`
      });
    } else {
      addTask(taskData);
      toast({
        title: "Tâche ajoutée",
        description: `La tâche "${taskData.title}" a été ajoutée avec succès.`
      });
    }
    setIsAddTaskOpen(false);
  };

  const handleDeleteTask = (id: string) => {
    const taskToDelete = tasks.find(task => task.id === id);
    if (taskToDelete) {
      deleteTask(id);
      toast({
        title: "Tâche supprimée",
        description: `La tâche "${taskToDelete.title}" a été supprimée.`,
        variant: "destructive"
      });
    }
  };

  const handleToggleTaskCompletion = (id: string) => {
    toggleTaskCompletion(id);
    const task = tasks.find(t => t.id === id);
    if (task) {
      toast({
        title: task.completed ? "Tâche marquée comme en cours" : "Tâche terminée",
        description: `La tâche "${task.title}" a été ${task.completed ? "marquée comme en cours" : "marquée comme terminée"}.`
      });
    }
  };

  return (
    <DashboardLayout type="client">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-1">Liste de tâches</h1>
            <p className="text-gray-500">
              Gérez les tâches de votre événement et suivez leur avancement
            </p>
          </div>
          <Button 
            onClick={handleAddNewTask}
            className="bg-amber-500 hover:bg-amber-600"
          >
            <Plus size={16} className="mr-2" /> Ajouter une tâche
          </Button>
        </div>
        
        <TaskStats tasks={tasks} />
        
        <TaskFilter filter={filter} onFilterChange={setFilter} />
        
        <div className="space-y-4">
          {tasks.length > 0 ? (
            tasks.map(task => (
              <TaskCard 
                key={task.id}
                task={task}
                onToggleCompletion={handleToggleTaskCompletion}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            ))
          ) : (
            <div className="text-center py-10 bg-white rounded-lg border border-gray-200">
              <p className="text-gray-500 mb-4">Aucune tâche à afficher.</p>
              <Button 
                onClick={handleAddNewTask}
                variant="outline"
                className="border-amber-200 text-amber-600 hover:bg-amber-50"
              >
                <Plus size={16} className="mr-2" /> Créer votre première tâche
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
        <DialogContent className="bg-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {currentTask ? "Modifier la tâche" : "Ajouter une nouvelle tâche"}
            </DialogTitle>
          </DialogHeader>
          <TaskForm 
            initialTask={currentTask} 
            onSave={handleSaveTask} 
            onCancel={() => setIsAddTaskOpen(false)} 
          />
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default ClientTodoList;
