
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ListTodo } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ClientTasks = () => {
  const navigate = useNavigate();
  
  return (
    <DashboardLayout type="client">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Gestion des tâches</h1>
        
        <Alert>
          <ListTodo className="h-4 w-4" />
          <AlertTitle>Notification</AlertTitle>
          <AlertDescription>
            Notre nouvelle liste de tâches améliorée est maintenant disponible.
          </AlertDescription>
        </Alert>
        
        <div className="flex justify-center my-8">
          <Button 
            onClick={() => navigate("/client/todo")} 
            size="lg"
          >
            Accéder à la liste de tâches
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClientTasks;
