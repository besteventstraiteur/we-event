
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useProjectTasks } from "@/hooks/useProjectTasks";
import ProjectHeader from "@/components/project-dashboard/ProjectHeader";
import ProjectStats from "@/components/project-dashboard/ProjectStats";
import ProjectTaskList from "@/components/project-dashboard/ProjectTaskList";
import ProjectNotifications from "@/components/project-dashboard/ProjectNotifications";
import KanbanBoard from "@/components/project-dashboard/KanbanBoard";
import ProjectTimeline from "@/components/project-dashboard/ProjectTimeline";
import TaskDetailModal from "@/components/project-dashboard/TaskDetailModal";
import ProjectReportDialog from "@/components/project-dashboard/ProjectReportDialog";
import { TaskStatus, ProjectTask } from "@/types/projectTypes";
import { Button } from "@/components/ui/button";
import { Download, FileBarChart } from "lucide-react";

const ProjectDashboard = () => {
  const {
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
  } = useProjectTasks();

  const [activeView, setActiveView] = useState<"list" | "kanban" | "timeline">("list");
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [showReportDialog, setShowReportDialog] = useState(false);

  const handleStatusChange = (taskId: string, status: TaskStatus) => {
    updateTaskStatus(taskId, status);
  };

  const handleViewTaskDetails = (taskId: string) => {
    setSelectedTaskId(taskId);
  };

  const handleCloseTaskDetails = () => {
    setSelectedTaskId(null);
  };

  const handleAssignTask = (taskId: string) => {
    // Dans une vraie implémentation, on ouvrirait un dialogue pour choisir l'assigné
    assignTask(taskId, "user-1", "John Doe");
  };

  const handleViewChange = (view: "list" | "kanban" | "timeline") => {
    setActiveView(view);
  };

  const handleToggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const getCommentsCount = (taskId: string) => {
    return comments.filter(comment => comment.taskId === taskId).length;
  };

  const selectedTask = selectedTaskId ? getTaskById(selectedTaskId) : null;
  const taskComments = selectedTaskId ? getCommentsByTaskId(selectedTaskId) : [];
  const parentTasks = getParentTasks();
  const stats = getTasksStats();

  // Organiser les sous-tâches par parent pour la vue en liste
  const subtasksByParent: Record<string, ProjectTask[]> = {};
  parentTasks.forEach(parent => {
    subtasksByParent[parent.id] = getTasksByParentId(parent.id);
  });

  return (
    <DashboardLayout type="client">
      <div className="space-y-6">
        <ProjectHeader 
          unreadNotificationsCount={getUnreadNotificationsCount()}
          activeView={activeView}
          onViewChange={handleViewChange}
          onNotificationsClick={handleToggleNotifications}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ProjectStats stats={stats} />
          </div>
          
          <div className="lg:col-span-1 flex flex-col gap-4">
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowReportDialog(true)}
              >
                <FileBarChart className="h-4 w-4 mr-2" />
                Rapport d'avancement
              </Button>
              <Button variant="outline" className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Exporter les tâches
              </Button>
            </div>
            
            {showNotifications && (
              <ProjectNotifications 
                notifications={notifications}
                onMarkAsRead={markNotificationAsRead}
                onViewTaskDetails={handleViewTaskDetails}
              />
            )}
          </div>
        </div>
        
        <div className="mt-6">
          {activeView === "list" && (
            <ProjectTaskList 
              parentTasks={parentTasks}
              subtasks={subtasksByParent}
              onStatusChange={handleStatusChange}
              onViewDetails={handleViewTaskDetails}
              onAssign={handleAssignTask}
              getCommentsCount={getCommentsCount}
            />
          )}
          
          {activeView === "kanban" && (
            <KanbanBoard 
              tasks={tasks}
              onViewDetails={handleViewTaskDetails}
              onAssign={handleAssignTask}
              onStatusChange={handleStatusChange}
              getCommentsCount={getCommentsCount}
            />
          )}
          
          {activeView === "timeline" && (
            <ProjectTimeline 
              tasks={tasks}
              onViewDetails={handleViewTaskDetails}
            />
          )}
        </div>
      </div>
      
      {selectedTask && (
        <TaskDetailModal 
          isOpen={!!selectedTaskId}
          onClose={handleCloseTaskDetails}
          task={selectedTask}
          comments={taskComments}
          onUpdateStatus={updateTaskStatus}
          onAddComment={addComment}
          onUpdateCompletion={updateTaskCompletion}
          onAssignTask={assignTask}
        />
      )}
      
      <ProjectReportDialog 
        isOpen={showReportDialog}
        onClose={() => setShowReportDialog(false)}
        tasks={tasks}
      />
    </DashboardLayout>
  );
};

export default ProjectDashboard;
