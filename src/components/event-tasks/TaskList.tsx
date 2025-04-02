
import React, { useState } from 'react';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Edit, Trash2, Plus } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { EventTask } from '@/hooks/useEventTasks';
import TaskForm from './TaskForm';
import TaskFilter from './TaskFilter';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface TaskListProps {
  tasks: EventTask[];
  onToggleCompletion: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onUpdateTask: (taskId: string, updates: Partial<Omit<EventTask, 'id'>>) => void;
  onAddTask: (task: Omit<EventTask, 'id' | 'completed'>) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleCompletion,
  onDeleteTask,
  onUpdateTask,
  onAddTask
}) => {
  const [openForm, setOpenForm] = useState(false);
  const [currentTask, setCurrentTask] = useState<EventTask | null>(null);
  const [filter, setFilter] = useState<{
    status: 'all' | 'completed' | 'pending';
    assignee: 'all' | 'couple' | 'witness' | 'both';
    category: 'all' | EventTask['category'];
    priority: 'all' | EventTask['priority'];
  }>({
    status: 'all',
    assignee: 'all',
    category: 'all',
    priority: 'all'
  });

  const handleEditTask = (task: EventTask) => {
    setCurrentTask(task);
    setOpenForm(true);
  };

  const handleAddNewTask = () => {
    setCurrentTask(null);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setCurrentTask(null);
  };

  const handleSaveTask = (task: Omit<EventTask, 'id' | 'completed'>) => {
    if (currentTask) {
      onUpdateTask(currentTask.id, task);
    } else {
      onAddTask(task);
    }
    handleCloseForm();
  };

  // Apply filters
  const filteredTasks = tasks.filter(task => {
    // Filter by status
    if (filter.status === 'completed' && !task.completed) return false;
    if (filter.status === 'pending' && task.completed) return false;
    
    // Filter by assignee
    if (filter.assignee !== 'all' && task.assignedTo !== filter.assignee && task.assignedTo !== 'both') return false;
    
    // Filter by category
    if (filter.category !== 'all' && task.category !== filter.category) return false;
    
    // Filter by priority
    if (filter.priority !== 'all' && task.priority !== filter.priority) return false;
    
    return true;
  });

  const getPriorityBadge = (priority: EventTask['priority']) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-500 text-white">Haute</Badge>;
      case 'medium':
        return <Badge className="bg-orange-500 text-white">Moyenne</Badge>;
      case 'low':
        return <Badge className="bg-green-500 text-white">Basse</Badge>;
      default:
        return null;
    }
  };

  const getCategoryBadge = (category: EventTask['category']) => {
    const categories: Record<EventTask['category'], { label: string, color: string }> = {
      'venue': { label: 'Lieu', color: 'bg-purple-500' },
      'catering': { label: 'Traiteur', color: 'bg-yellow-500' },
      'decoration': { label: 'Décoration', color: 'bg-pink-500' },
      'attire': { label: 'Tenues', color: 'bg-blue-500' },
      'ceremony': { label: 'Cérémonie', color: 'bg-teal-500' },
      'reception': { label: 'Réception', color: 'bg-indigo-500' },
      'other': { label: 'Autre', color: 'bg-gray-500' }
    };
    
    const { label, color } = categories[category];
    return <Badge className={`${color} text-white`}>{label}</Badge>;
  };

  const getAssigneeLabel = (assignee: EventTask['assignedTo']) => {
    switch (assignee) {
      case 'couple':
        return 'Mariés';
      case 'witness':
        return 'Témoins';
      case 'both':
        return 'Tous';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Liste des tâches</h2>
        <Button onClick={handleAddNewTask} className="bg-vip-gold text-vip-black hover:bg-vip-gold/90">
          <Plus size={16} className="mr-2" /> Nouvelle tâche
        </Button>
      </div>

      <TaskFilter filter={filter} onFilterChange={setFilter} />
      
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
            {filteredTasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  Aucune tâche trouvée
                </TableCell>
              </TableRow>
            ) : (
              filteredTasks.map(task => (
                <TableRow 
                  key={task.id} 
                  className={task.completed ? "bg-gray-50" : ""}
                >
                  <TableCell>
                    <Checkbox 
                      checked={task.completed} 
                      onCheckedChange={() => onToggleCompletion(task.id)}
                    />
                  </TableCell>
                  <TableCell className={task.completed ? "line-through text-gray-500" : ""}>
                    <div className="font-medium">{task.title}</div>
                    {task.description && (
                      <div className="text-sm text-gray-500 truncate max-w-[200px]">
                        {task.description}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{getAssigneeLabel(task.assignedTo)}</TableCell>
                  <TableCell>{getCategoryBadge(task.category)}</TableCell>
                  <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                  <TableCell>
                    {task.dueDate ? (
                      <div className="flex items-center text-sm">
                        <CalendarIcon size={14} className="mr-1 text-gray-500" />
                        {format(new Date(task.dueDate), 'dd MMM yyyy', { locale: fr })}
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm">Non définie</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleEditTask(task)}
                      className="h-8 w-8 p-0 mr-1"
                    >
                      <Edit size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => onDeleteTask(task.id)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      <Dialog open={openForm} onOpenChange={setOpenForm}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {currentTask ? "Modifier la tâche" : "Créer une nouvelle tâche"}
            </DialogTitle>
          </DialogHeader>
          <TaskForm 
            initialTask={currentTask || undefined} 
            onSave={handleSaveTask} 
            onCancel={handleCloseForm} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskList;
