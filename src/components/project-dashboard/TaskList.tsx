
import React, { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Check, X, ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProjectTask, TaskCategory, TaskPriority, TaskStatus } from "@/hooks/useProjectTasks";
import TaskDialog from "./TaskDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TaskListProps {
  tasks: ProjectTask[];
  categories: TaskCategory[];
  onAddTask: (task: Omit<ProjectTask, "id">) => void;
  onUpdateTask: (id: string, task: Partial<ProjectTask>) => void;
  onDeleteTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  categories,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<ProjectTask | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<keyof ProjectTask>("dueDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleAddClick = () => {
    setCurrentTask(null);
    setIsDialogOpen(true);
  };

  const handleEditClick = (task: ProjectTask) => {
    setCurrentTask(task);
    setIsDialogOpen(true);
  };

  const handleSaveTask = (taskData: Omit<ProjectTask, "id">) => {
    if (currentTask) {
      onUpdateTask(currentTask.id, taskData);
    } else {
      onAddTask(taskData);
    }
    setIsDialogOpen(false);
  };

  const handleDeleteClick = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?")) {
      onDeleteTask(id);
    }
  };

  const handleToggleStatus = (task: ProjectTask) => {
    const newStatus = task.status === "completed" ? "pending" : "completed";
    onUpdateTask(task.id, { status: newStatus });
  };

  const handleSort = (field: keyof ProjectTask) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredTasks = tasks.filter(task => {
    // Safe access to properties that might be undefined
    const taskTitle = task.title || "";
    const taskDescription = task.description || "";
    const searchTermLower = searchTerm.toLowerCase();
    
    const matchesSearch = searchTerm === "" || 
                         taskTitle.toLowerCase().includes(searchTermLower) ||
                         taskDescription.toLowerCase().includes(searchTermLower);
    const matchesCategory = categoryFilter === "all" || task.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || task.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortField === "dueDate") {
      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
    } else if (sortField === "priority") {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      const orderA = priorityOrder[a.priority];
      const orderB = priorityOrder[b.priority];
      return sortDirection === "asc" ? orderA - orderB : orderB - orderA;
    } else {
      const valueA = String(a[sortField] || "").toLowerCase();
      const valueB = String(b[sortField] || "").toLowerCase();
      return sortDirection === "asc" 
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }
  });

  const getPriorityBadge = (priority: TaskPriority) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">Haute</Badge>;
      case "medium":
        return <Badge variant="default">Moyenne</Badge>;
      case "low":
        return <Badge variant="secondary">Basse</Badge>;
    }
  };

  const getStatusBadge = (status: TaskStatus) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-gray-100">En attente</Badge>;
      case "in-progress":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">En cours</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-green-100 text-green-800">Terminée</Badge>;
      case "blocked":
        return <Badge variant="outline" className="bg-red-100 text-red-800">Bloquée</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Input
            placeholder="Rechercher une tâche..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-80"
          />
          
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les catégories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="in-progress">En cours</SelectItem>
              <SelectItem value="completed">Terminée</SelectItem>
              <SelectItem value="blocked">Bloquée</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          onClick={handleAddClick} 
          className="w-full sm:w-auto"
        >
          <Plus size={16} className="mr-2" /> Ajouter une tâche
        </Button>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Statut</TableHead>
              <TableHead>
                <div 
                  className="flex items-center cursor-pointer"
                  onClick={() => handleSort("title")}
                >
                  Titre
                  {sortField === "title" && (
                    <ArrowUpDown size={16} className="ml-2" />
                  )}
                </div>
              </TableHead>
              <TableHead>
                <div 
                  className="flex items-center cursor-pointer"
                  onClick={() => handleSort("category")}
                >
                  Catégorie
                  {sortField === "category" && (
                    <ArrowUpDown size={16} className="ml-2" />
                  )}
                </div>
              </TableHead>
              <TableHead>
                <div 
                  className="flex items-center cursor-pointer"
                  onClick={() => handleSort("priority")}
                >
                  Priorité
                  {sortField === "priority" && (
                    <ArrowUpDown size={16} className="ml-2" />
                  )}
                </div>
              </TableHead>
              <TableHead>
                <div 
                  className="flex items-center cursor-pointer"
                  onClick={() => handleSort("dueDate")}
                >
                  Échéance
                  {sortField === "dueDate" && (
                    <ArrowUpDown size={16} className="ml-2" />
                  )}
                </div>
              </TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  Aucune tâche trouvée
                </TableCell>
              </TableRow>
            ) : (
              sortedTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleToggleStatus(task)}
                      className={task.status === "completed" ? "text-green-600" : "text-gray-400"}
                    >
                      {task.status === "completed" ? <Check size={18} /> : <X size={18} />}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{task.title}</div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">
                      {task.description}
                    </div>
                  </TableCell>
                  <TableCell>
                    {categories.find(c => c.value === task.category)?.label || task.category}
                  </TableCell>
                  <TableCell>
                    {getPriorityBadge(task.priority)}
                  </TableCell>
                  <TableCell>
                    {new Date(task.dueDate).toLocaleDateString('fr-FR')}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditClick(task)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteClick(task.id)}
                        className="text-red-600"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      <TaskDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveTask}
        task={currentTask}
        categories={categories}
      />
    </div>
  );
};

export default TaskList;
