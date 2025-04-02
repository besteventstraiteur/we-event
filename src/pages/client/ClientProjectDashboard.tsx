
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectStats from "@/components/project-dashboard/ProjectStats";
import TaskList from "@/components/project-dashboard/TaskList";
import TaskKanban from "@/components/project-dashboard/TaskKanban";
import TaskTimeline from "@/components/project-dashboard/TaskTimeline";
import { useProjectTasks } from "@/hooks/useProjectTasks";

const ClientProjectDashboard = () => {
  const {
    tasks,
    categories,
    addTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
    tasksByStatus,
    tasksByCategory,
    statistics,
  } = useProjectTasks();

  const [activeTab, setActiveTab] = useState("list");

  return (
    <DashboardLayout type="client">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Tableau de Bord du Projet</h1>
          <p className="text-gray-500">
            Suivez l'avancement de votre projet mariage et gérez vos tâches
          </p>
        </div>
        
        <ProjectStats statistics={statistics} />
        
        <Tabs defaultValue="list" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="list">Liste des Tâches</TabsTrigger>
            <TabsTrigger value="kanban">Kanban</TabsTrigger>
            <TabsTrigger value="timeline">Chronologie</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list">
            <TaskList 
              tasks={tasks}
              categories={categories}
              onAddTask={addTask}
              onUpdateTask={updateTask}
              onDeleteTask={deleteTask}
            />
          </TabsContent>
          
          <TabsContent value="kanban">
            <TaskKanban 
              tasksByStatus={tasksByStatus}
              onUpdateTaskStatus={updateTaskStatus}
              onUpdateTask={updateTask}
              onDeleteTask={deleteTask}
              categories={categories}
            />
          </TabsContent>
          
          <TabsContent value="timeline">
            <TaskTimeline 
              tasks={tasks} 
              categories={categories} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default ClientProjectDashboard;
