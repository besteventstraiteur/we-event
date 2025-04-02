
import React from "react";
import { 
  DndContext, 
  DragOverlay, 
  MouseSensor, 
  TouchSensor, 
  useSensor, 
  useSensors,
  DragStartEvent,
  DragEndEvent
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { TaskStatus, ProjectTask } from "@/types/projectTypes";
import KanbanColumn from "./KanbanColumn";
import ProjectTaskCard from "./ProjectTaskCard";

interface KanbanBoardProps {
  tasks: ProjectTask[];
  onViewDetails: (taskId: string) => void;
  onAssign: (taskId: string) => void;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
  getCommentsCount: (taskId: string) => number;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  tasks,
  onViewDetails,
  onAssign,
  onStatusChange,
  getCommentsCount
}) => {
  const [activeId, setActiveId] = React.useState<string | null>(null);
  
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter(task => task.status === status);
  };

  const planningTasks = getTasksByStatus("planning");
  const inProgressTasks = getTasksByStatus("in-progress");
  const testingTasks = getTasksByStatus("testing");
  const completedTasks = getTasksByStatus("completed");

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    
    const { active, over } = event;
    
    if (!over) return;
    
    // Extract the status from the over id (column-status)
    const overId = over.id as string;
    if (overId.startsWith("column-")) {
      const newStatus = overId.replace("column-", "") as TaskStatus;
      onStatusChange(active.id as string, newStatus);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KanbanColumn 
          id="column-planning"
          title="Planification" 
          count={planningTasks.length}
          color="blue"
        >
          <SortableContext items={planningTasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {planningTasks.map(task => (
                <div key={task.id} className="touch-none">
                  <ProjectTaskCard
                    task={task}
                    onStatusChange={onStatusChange}
                    onViewDetails={onViewDetails}
                    onAssign={onAssign}
                    commentsCount={getCommentsCount(task.id)}
                  />
                </div>
              ))}
            </div>
          </SortableContext>
        </KanbanColumn>
        
        <KanbanColumn 
          id="column-in-progress"
          title="En cours" 
          count={inProgressTasks.length}
          color="yellow"
        >
          <SortableContext items={inProgressTasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {inProgressTasks.map(task => (
                <div key={task.id} className="touch-none">
                  <ProjectTaskCard
                    task={task}
                    onStatusChange={onStatusChange}
                    onViewDetails={onViewDetails}
                    onAssign={onAssign}
                    commentsCount={getCommentsCount(task.id)}
                  />
                </div>
              ))}
            </div>
          </SortableContext>
        </KanbanColumn>
        
        <KanbanColumn 
          id="column-testing"
          title="En test" 
          count={testingTasks.length}
          color="purple"
        >
          <SortableContext items={testingTasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {testingTasks.map(task => (
                <div key={task.id} className="touch-none">
                  <ProjectTaskCard
                    task={task}
                    onStatusChange={onStatusChange}
                    onViewDetails={onViewDetails}
                    onAssign={onAssign}
                    commentsCount={getCommentsCount(task.id)}
                  />
                </div>
              ))}
            </div>
          </SortableContext>
        </KanbanColumn>
        
        <KanbanColumn 
          id="column-completed"
          title="Terminé" 
          count={completedTasks.length}
          color="green"
        >
          <SortableContext items={completedTasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {completedTasks.map(task => (
                <div key={task.id} className="touch-none">
                  <ProjectTaskCard
                    task={task}
                    onStatusChange={onStatusChange}
                    onViewDetails={onViewDetails}
                    onAssign={onAssign}
                    commentsCount={getCommentsCount(task.id)}
                  />
                </div>
              ))}
            </div>
          </SortableContext>
        </KanbanColumn>
      </div>
    </DndContext>
  );
};

export default KanbanBoard;
