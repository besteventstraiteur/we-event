
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ProjectTask, TaskStatus } from "@/types/projectTypes";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts";

interface ProjectReportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: ProjectTask[];
}

const ProjectReportDialog: React.FC<ProjectReportDialogProps> = ({
  isOpen,
  onClose,
  tasks
}) => {
  const translateStatus = (status: TaskStatus) => {
    const statusMap: Record<TaskStatus, string> = {
      "planning": "Planification",
      "in-progress": "En cours",
      "testing": "En test",
      "completed": "Terminé"
    };
    return statusMap[status];
  };

  const generateStatusReport = () => {
    const statusCounts: Record<TaskStatus, number> = {
      "planning": 0,
      "in-progress": 0,
      "testing": 0,
      "completed": 0
    };
    
    tasks.forEach(task => {
      statusCounts[task.status]++;
    });
    
    return [
      { name: "Planification", value: statusCounts["planning"], color: "#3b82f6" },
      { name: "En cours", value: statusCounts["in-progress"], color: "#eab308" },
      { name: "En test", value: statusCounts["testing"], color: "#a855f7" },
      { name: "Terminé", value: statusCounts["completed"], color: "#22c55e" }
    ];
  };

  const generateCategoryReport = () => {
    const categories = [
      { id: "security", name: "Sécurité" },
      { id: "integrations", name: "Intégrations" },
      { id: "features", name: "Fonctionnalités" },
      { id: "kpis", name: "KPIs" },
      { id: "mobile", name: "Mobile" }
    ];
    
    return categories.map(category => {
      const categoryTasks = tasks.filter(
        task => task.id.startsWith(category.id)
      );
      
      const total = categoryTasks.length;
      const completed = categoryTasks.filter(t => t.status === "completed").length;
      const progress = categoryTasks.filter(t => t.status === "in-progress" || t.status === "testing").length;
      const planning = categoryTasks.filter(t => t.status === "planning").length;
      
      return {
        name: category.name,
        planning,
        progress,
        completed
      };
    });
  };

  const statusData = generateStatusReport();
  const categoryData = generateCategoryReport();
  
  const completedCount = tasks.filter(t => t.status === "completed").length;
  const totalCount = tasks.length;
  const completionPercentage = Math.round((completedCount / totalCount) * 100);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Rapport d'avancement du projet</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 my-4">
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium">Taux de complétion global</h3>
              <p className="text-sm text-gray-600">
                {completedCount} tâches terminées sur {totalCount} au total
              </p>
            </div>
            <div className="text-2xl font-bold text-green-600">
              {completionPercentage}%
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Répartition des tâches par statut</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={statusData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={150} />
                  <Tooltip />
                  <Bar dataKey="value" name="Nombre de tâches">
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Avancement par catégorie</h3>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={categoryData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="planning" name="Planification" stackId="a" fill="#3b82f6" />
                  <Bar dataKey="progress" name="En cours / Test" stackId="a" fill="#eab308" />
                  <Bar dataKey="completed" name="Terminé" stackId="a" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Résumé textuel</h3>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">
                Le projet est actuellement complété à <strong>{completionPercentage}%</strong>.
                Au total, <strong>{completedCount}</strong> tâches sont terminées sur les <strong>{totalCount}</strong> définies.
                La répartition montre que <strong>{statusData[0].value}</strong> tâches sont en phase de planification,
                <strong> {statusData[1].value}</strong> sont en cours d'exécution,
                <strong> {statusData[2].value}</strong> sont en phase de test, et
                <strong> {statusData[3].value}</strong> sont complètement terminées.
              </p>
              <p className="text-sm text-gray-700 mt-2">
                Les catégories "Fonctionnalités" et "Mobile" montrent les plus grandes proportions de tâches encore
                en planification, tandis que "Sécurité" et "KPIs" ont progressé davantage vers les phases
                d'exécution et de test.
              </p>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Fermer
          </Button>
          <Button>
            Exporter le rapport (PDF)
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectReportDialog;
