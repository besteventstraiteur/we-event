
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TaskNotification } from "@/types/projectTypes";
import { 
  Bell, 
  CheckCircle2, 
  MessageSquare, 
  User,
  AlertTriangle
} from "lucide-react";

interface ProjectNotificationsProps {
  notifications: TaskNotification[];
  onMarkAsRead: (notificationId: string) => void;
  onViewTaskDetails: (taskId: string) => void;
}

const ProjectNotifications: React.FC<ProjectNotificationsProps> = ({
  notifications,
  onMarkAsRead,
  onViewTaskDetails
}) => {
  const getNotificationIcon = (type: TaskNotification["type"]) => {
    switch (type) {
      case "reminder":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "status-change":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "assignment":
        return <User className="h-4 w-4 text-blue-500" />;
      case "comment":
        return <MessageSquare className="h-4 w-4 text-purple-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Notifications</CardTitle>
        <Badge className="bg-red-100 text-red-800" variant="outline">
          {notifications.filter(n => !n.isRead).length} non lues
        </Badge>
      </CardHeader>
      <CardContent>
        {notifications.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-6">
            Aucune notification
          </p>
        ) : (
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
            {notifications.map(notification => (
              <div 
                key={notification.id} 
                className={`p-3 border rounded-md ${notification.isRead ? 'bg-white' : 'bg-amber-50'}`}
              >
                <div className="flex">
                  <div className="mr-3 mt-0.5">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">
                        {new Date(notification.timestamp).toLocaleString('fr-FR')}
                      </span>
                      <div className="flex gap-2">
                        {!notification.isRead && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-7 px-2 text-xs"
                            onClick={() => onMarkAsRead(notification.id)}
                          >
                            Marquer comme lu
                          </Button>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="h-7 px-2 text-xs"
                          onClick={() => onViewTaskDetails(notification.taskId)}
                        >
                          Voir la tâche
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectNotifications;
