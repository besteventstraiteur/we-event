
import React from 'react';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { EventTask } from '@/hooks/useEventTasks';
import TaskItem from './TaskItem';

interface TaskTableProps {
  tasks: EventTask[];
  onToggleCompletion: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onEditTask: (task: EventTask) => void;
}

const TaskTable: React.FC<TaskTableProps> = ({
  tasks,
  onToggleCompletion,
  onDeleteTask,
  onEditTask
}) => {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">État</TableHead>
            <TableHead>Tâche</TableHead>
            <TableHead>Assignée à</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead>Priorité</TableHead>
            <TableHead>Date limite</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                Aucune tâche trouvée
              </TableCell>
            </TableRow>
          ) : (
            tasks.map(task => (
              <TaskItem 
                key={task.id}
                task={task}
                onToggleCompletion={onToggleCompletion}
                onDeleteTask={onDeleteTask}
                onEditTask={onEditTask}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TaskTable;
