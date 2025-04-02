
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import TaskStats from "@/components/client-todo/TaskStats";
import TaskFilter from "@/components/client-todo/TaskFilter";
import TaskCardList from "@/components/client-todo/TaskCardList";
import TodoListHeader from "@/components/client-todo/TodoListHeader";
import TaskDialog from "@/components/client-todo/TaskDialog";
import { useTaskList, Task } from "@/hooks/useTaskList";
import { useTaskDialog } from "@/hooks/useTaskDialog";

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
    assignedTo: "Sophie",
    isFavorite: true
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
    assignedTo: "Sophie et Thomas",
    isFavorite: true
  },
];

const ClientTodoList = () => {
  const {
    tasks,
    favoriteTasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    toggleFavorite,
    filter,
    setFilter
  } = useTaskList(initialTasks);
  
  const {
    isOpen,
    currentTask,
    openAddDialog,
    openEditDialog,
    closeDialog,
    setIsOpen
  } = useTaskDialog();

  const handleSaveTask = (taskData: Omit<Task, "id" | "completed">) => {
    if (currentTask) {
      updateTask(currentTask.id, taskData);
    } else {
      addTask(taskData);
    }
    closeDialog();
  };

  const handleTaskClick = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      openEditDialog(task);
    }
  };

  return (
    <DashboardLayout type="client">
      <div className="space-y-6">
        <TodoListHeader onAddTask={openAddDialog} />
        
        <TaskStats 
          tasks={tasks} 
          favoriteTasks={favoriteTasks}
          onTaskClick={handleTaskClick}
        />
        
        <TaskFilter filter={filter} onFilterChange={setFilter} />
        
        <TaskCardList 
          tasks={tasks}
          onToggleCompletion={toggleTaskCompletion}
          onEdit={openEditDialog}
          onDelete={deleteTask}
          onToggleFavorite={toggleFavorite}
          onAddTask={openAddDialog}
        />
      </div>
      
      <TaskDialog 
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        currentTask={currentTask}
        onSave={handleSaveTask}
        onCancel={closeDialog}
      />
    </DashboardLayout>
  );
};

export default ClientTodoList;
