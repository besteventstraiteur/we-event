
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { ProjectTask, TaskComment, TaskStatus } from "@/types/projectTypes";
import { Calendar, Clock, MessageSquare, User } from "lucide-react";

interface TaskDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: ProjectTask | null;
  comments: TaskComment[];
  onUpdateStatus: (taskId: string, status: TaskStatus) => void;
  onAddComment: (comment: Omit<TaskComment, "id">) => void;
  onUpdateCompletion: (taskId: string, completionRate: number) => void;
  onAssignTask: (taskId: string, assigneeId: string, assigneeName: string) => void;
}

const TaskDetailModal: React.FC<TaskDetailModalProps> = ({
  isOpen,
  onClose,
  task,
  comments,
  onUpdateStatus,
  onAddComment,
  onUpdateCompletion,
  onAssignTask
}) => {
  const [newComment, setNewComment] = useState("");
  const [completionValue, setCompletionValue] = useState<number>(task?.completionRate || 0);
  const [assignee, setAssignee] = useState<string>(task?.assignedTo || "");
  
  if (!task) return null;

  const getStatusColor = (status: TaskStatus) => {
    const statusColors: Record<TaskStatus, string> = {
      "planning": "bg-blue-100 text-blue-800",
      "in-progress": "bg-yellow-100 text-yellow-800",
      "testing": "bg-purple-100 text-purple-800",
      "completed": "bg-green-100 text-green-800"
    };
    return statusColors[status] || "bg-gray-100 text-gray-800";
  };

  const getStatusTranslation = (status: TaskStatus) => {
    const statusMap: Record<TaskStatus, string> = {
      "planning": "Planification",
      "in-progress": "En cours",
      "testing": "En test",
      "completed": "Terminé"
    };
    return statusMap[status];
  };

  const handleStatusChange = (status: TaskStatus) => {
    onUpdateStatus(task.id, status);
  };

  const handleAddComment = () => {
    if (newComment.trim() === "") return;
    
    onAddComment({
      taskId: task.id,
      userId: "current-user",
      userName: "Utilisateur actuel",
      content: newComment,
      timestamp: new Date()
    });
    
    setNewComment("");
  };

  const handleCompletionChange = (value: number[]) => {
    setCompletionValue(value[0]);
  };

  const handleCompletionSave = () => {
    onUpdateCompletion(task.id, completionValue);
  };

  const handleAssignTask = () => {
    if (assignee.trim() === "") return;
    onAssignTask(task.id, "user-id", assignee);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">{task.name}</DialogTitle>
            <Badge className={getStatusColor(task.status)}>
              {getStatusTranslation(task.status)}
            </Badge>
          </div>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          <div>
            <h3 className="font-medium mb-2">Description</h3>
            <p className="text-gray-700">{task.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">Statut</h3>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={task.status === "planning" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleStatusChange("planning")}
                >
                  Planification
                </Button>
                <Button 
                  variant={task.status === "in-progress" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleStatusChange("in-progress")}
                >
                  En cours
                </Button>
                <Button 
                  variant={task.status === "testing" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleStatusChange("testing")}
                >
                  En test
                </Button>
                <Button 
                  variant={task.status === "completed" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleStatusChange("completed")}
                >
                  Terminé
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Progression</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Avancement</span>
                  <span>{completionValue}%</span>
                </div>
                <Slider
                  defaultValue={[task.completionRate || 0]}
                  max={100}
                  step={5}
                  value={[completionValue]}
                  onValueChange={handleCompletionChange}
                />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleCompletionSave}
                >
                  Sauvegarder la progression
                </Button>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Assigner à</h3>
            <div className="flex gap-2">
              <Input 
                value={assignee} 
                onChange={(e) => setAssignee(e.target.value)}
                placeholder="Nom de la personne assignée"
              />
              <Button 
                variant="outline"
                onClick={handleAssignTask}
              >
                Assigner
              </Button>
            </div>
            {task.assignedTo && (
              <div className="flex items-center mt-2 text-sm text-gray-600">
                <User className="h-4 w-4 mr-1" />
                <span>Actuellement assigné à: {task.assignedTo}</span>
              </div>
            )}
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-medium mb-4">Commentaires</h3>
            
            <div className="space-y-4 max-h-64 overflow-y-auto mb-4">
              {comments.length === 0 ? (
                <p className="text-sm text-gray-500 italic">Aucun commentaire pour le moment</p>
              ) : (
                comments.map(comment => (
                  <div key={comment.id} className="bg-gray-50 p-3 rounded-md">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{comment.userName}</span>
                      <span className="text-gray-500">
                        {new Date(comment.timestamp).toLocaleString('fr-FR')}
                      </span>
                    </div>
                    <p className="mt-2 text-sm">{comment.content}</p>
                  </div>
                ))
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="new-comment">Ajouter un commentaire</Label>
              <Textarea 
                id="new-comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Saisissez votre commentaire ici..."
                className="min-h-[80px]"
              />
              <Button 
                onClick={handleAddComment}
                disabled={newComment.trim() === ""}
              >
                Publier le commentaire
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDetailModal;
