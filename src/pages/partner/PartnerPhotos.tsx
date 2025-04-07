
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import PartnerTypeRoute from "@/components/security/PartnerTypeRoute";
import { PartnerType } from "@/utils/accessControl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Image, Plus, Share } from "lucide-react";

const PartnerPhotos = () => {
  const { toast } = useToast();
  const [clientEmail, setClientEmail] = useState("");
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  
  const mockFolders = [
    {
      id: "folder-1",
      name: "Mariage Sophie & Thomas - 12/06/2025",
      photoCount: 120,
      shared: true
    },
    {
      id: "folder-2",
      name: "Mariage Marie & Jean - 26/07/2025",
      photoCount: 85,
      shared: false
    }
  ];
  
  const handleShareFolder = (folderId: string) => {
    if (clientEmail) {
      toast({
        title: "Dossier partagé",
        description: `Le dossier photo a été partagé avec ${clientEmail} avec succès.`
      });
      setClientEmail("");
      setSelectedFolder(null);
    } else {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez saisir l'adresse email du client."
      });
    }
  };

  return (
    <DashboardLayout type="partner">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold mb-6">Gestion des Photos</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nouveau dossier
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Vos dossiers photos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">
              Gérez vos dossiers photos et partagez-les avec vos clients en utilisant leur adresse email.
            </p>
            
            <div className="space-y-4">
              {mockFolders.map((folder) => (
                <div key={folder.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Image className="h-5 w-5 mr-2 text-blue-500" />
                      <div>
                        <h3 className="font-medium">{folder.name}</h3>
                        <p className="text-sm text-gray-500">{folder.photoCount} photos</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline"
                      onClick={() => setSelectedFolder(folder.id)}
                    >
                      {folder.shared ? "Repartager" : "Partager"}
                    </Button>
                  </div>
                  
                  {selectedFolder === folder.id && (
                    <div className="mt-4 flex items-center space-x-2">
                      <Input
                        placeholder="Email du client"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className="max-w-xs"
                      />
                      <Button onClick={() => handleShareFolder(folder.id)}>
                        <Share className="mr-2 h-4 w-4" />
                        Partager
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

// Wrap the component to restrict access to photographers only
const ProtectedPartnerPhotos = () => (
  <PartnerTypeRoute allowedTypes={[PartnerType.PHOTOGRAPHER, PartnerType.GENERAL]}>
    <PartnerPhotos />
  </PartnerTypeRoute>
);

export default ProtectedPartnerPhotos;
