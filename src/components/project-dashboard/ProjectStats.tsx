
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ChevronsUp, PlaySquare, CheckCircle2, Loader2 } from "lucide-react";

interface ProjectStatsProps {
  stats: {
    total: number;
    byStatus: {
      planning: number;
      inProgress: number;
      testing: number;
      completed: number;
    };
    overallCompletion: number;
  };
}

const ProjectStats: React.FC<ProjectStatsProps> = ({ stats }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>État d'avancement du projet</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Progression globale</span>
              <span className="text-sm font-medium">{stats.overallCompletion}%</span>
            </div>
            <Progress value={stats.overallCompletion} className="h-2" />
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2 text-center">
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                <ChevronsUp className="h-4 w-4 text-blue-700" />
              </div>
              <h4 className="text-lg font-semibold">{stats.byStatus.planning}</h4>
              <p className="text-xs text-gray-500">En planification</p>
            </div>
            
            <div className="space-y-2 text-center">
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100">
                <PlaySquare className="h-4 w-4 text-yellow-700" />
              </div>
              <h4 className="text-lg font-semibold">{stats.byStatus.inProgress}</h4>
              <p className="text-xs text-gray-500">En cours</p>
            </div>
            
            <div className="space-y-2 text-center">
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                <Loader2 className="h-4 w-4 text-purple-700" />
              </div>
              <h4 className="text-lg font-semibold">{stats.byStatus.testing}</h4>
              <p className="text-xs text-gray-500">En test</p>
            </div>
            
            <div className="space-y-2 text-center">
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-4 w-4 text-green-700" />
              </div>
              <h4 className="text-lg font-semibold">{stats.byStatus.completed}</h4>
              <p className="text-xs text-gray-500">Terminées</p>
            </div>
          </div>
          
          <Separator />
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              <span className="font-medium">{stats.total}</span> tâches au total
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectStats;
