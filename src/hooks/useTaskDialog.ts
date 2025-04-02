
import { useState } from "react";
import { Task } from "./useTaskList";

export const useTaskDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined);

  const openAddDialog = () => {
    setCurrentTask(undefined);
    setIsOpen(true);
  };

  const openEditDialog = (task: Task) => {
    setCurrentTask(task);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    currentTask,
    openAddDialog,
    openEditDialog,
    closeDialog,
    setIsOpen
  };
};
