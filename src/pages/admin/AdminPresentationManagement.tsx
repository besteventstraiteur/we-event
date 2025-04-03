
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import PresentationSlideManager from "@/components/admin/presentation/PresentationSlideManager";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import PlatformPresentation from "@/components/video-presentation/PlatformPresentation";
import { useIsMobile } from "@/hooks/use-mobile";

const AdminPresentationManagement: React.FC = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Gestion de la présentation</h1>
          
          <Button 
            onClick={() => setPreviewOpen(true)}
            className="flex items-center gap-2 bg-vip-gold hover:bg-amber-600 text-white self-start sm:self-auto"
          >
            <Play size={18} />
            Aperçu de la présentation
          </Button>
        </div>
        
        <p className="text-gray-600">
          Modifiez le contenu et l'ordre des slides de présentation des fonctionnalités 
          qui sont montrés aux utilisateurs lors de leur premier accès à la plateforme.
        </p>
        
        <div className="bg-white rounded-lg shadow-md border p-4 sm:p-6">
          <PresentationSlideManager />
        </div>
      </div>
      
      {previewOpen && <PlatformPresentation onClose={() => setPreviewOpen(false)} />}
    </DashboardLayout>
  );
};

export default AdminPresentationManagement;
