
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import PresentationSlideManager from "@/components/admin/presentation/PresentationSlideManager";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import PlatformPresentation from "@/components/video-presentation/PlatformPresentation";

const AdminPresentationManagement: React.FC = () => {
  const [previewOpen, setPreviewOpen] = React.useState(false);

  return (
    <DashboardLayout type="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Gestion de la présentation</h1>
          
          <Button 
            onClick={() => setPreviewOpen(true)}
            className="flex items-center gap-2 bg-vip-gold hover:bg-amber-600 text-white"
          >
            <Play size={18} />
            Aperçu de la présentation
          </Button>
        </div>
        
        <p className="text-gray-600">
          Modifiez le contenu et l'ordre des slides de présentation des fonctionnalités 
          qui sont montrés aux utilisateurs lors de leur premier accès à la plateforme.
        </p>
        
        <div className="bg-white rounded-lg shadow-md border p-6">
          <PresentationSlideManager />
        </div>
      </div>
      
      {previewOpen && <PlatformPresentation />}
    </DashboardLayout>
  );
};

export default AdminPresentationManagement;
