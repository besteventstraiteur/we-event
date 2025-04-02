
export type TaskStatus = "planning" | "in-progress" | "testing" | "completed";

export interface ProjectTask {
  id: string;
  name: string;
  description: string;
  status: TaskStatus;
  assignedTo?: string;
  dueDate?: Date;
  completionRate?: number;
  tags?: string[];
  parentId?: string; // Pour identifier une sous-tâche
}

export interface TaskComment {
  id: string;
  taskId: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: Date;
}

export interface TaskNotification {
  id: string;
  taskId: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  type: "reminder" | "status-change" | "assignment" | "comment";
}

export interface ProjectMember {
  id: string;
  name: string;
  email: string;
  role: "admin" | "developer" | "tester" | "manager";
  avatar?: string;
}

export interface ProjectReport {
  date: Date;
  completionRate: number;
  tasksByStatus: Record<TaskStatus, number>;
  recentMilestones: string[];
  blockers: string[];
}
