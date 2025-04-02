
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface TodoListHeaderProps {
  onAddTask: () => void;
}

const TodoListHeader: React.FC<TodoListHeaderProps> = ({ onAddTask }) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold mb-1">Liste de tâches</h1>
        <p className="text-gray-500">
          Gérez les tâches de votre événement et suivez leur avancement
        </p>
      </div>
      <Button 
        onClick={onAddTask}
        className="bg-amber-500 hover:bg-amber-600"
      >
        <Plus size={16} className="mr-2" /> Ajouter une tâche
      </Button>
    </div>
  );
};

export default TodoListHeader;
