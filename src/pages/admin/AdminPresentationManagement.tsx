
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import PresentationSlideManager from "@/components/admin/presentation/PresentationSlideManager";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import PlatformPresentation from "@/components/video-presentation/PlatformPresentation";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminPresentationManagement: React.FC = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        <Card className="border-none shadow-md bg-gradient-to-br from-white to-gray-50">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2">
            <CardTitle className="text-2xl sm:text-3xl font-bold text-vip-gray-900">
              Gestion de la présentation
            </CardTitle>
            
            <Button 
              onClick={() => setPreviewOpen(true)}
              className="flex items-center gap-2 bg-vip-gold hover:bg-amber-600 text-white self-start sm:self-auto shadow-md transition-all"
            >
              <Play size={18} />
              Aperçu de la présentation
            </Button>
          </CardHeader>
          
          <CardContent>
            <p className="text-gray-600 mb-6">
              Modifiez le contenu et l'ordre des slides de présentation des fonctionnalités 
              qui sont montrés aux utilisateurs lors de leur premier accès à la plateforme.
            </p>
            
            <div className="bg-white rounded-lg shadow-md border p-4 sm:p-6">
              <PresentationSlideManager />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {previewOpen && <PlatformPresentation onClose={() => setPreviewOpen(false)} />}
    </DashboardLayout>
  );
};

export default AdminPresentationManagement;
