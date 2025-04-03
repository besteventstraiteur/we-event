
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Image, Users, Lock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import PartnerTypeRoute from "@/components/security/PartnerTypeRoute";
import { PartnerType } from "@/utils/accessControl";

const PartnerPhotos = () => {
  const [selectedClient, setSelectedClient] = useState("");
  const [uploadedPhotos, setUploadedPhotos] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  // Liste factice des clients
  const clients = [
    { id: "client1", name: "Thomas & Sophie - Mariage 24/08/2023" },
    { id: "client2", name: "Jean & Marie - Anniversaire 12/09/2023" },
    { id: "client3", name: "Famille Dupont - Baptême 05/10/2023" },
  ];

  // Liste factice des événements passés avec des photos
  const pastEvents = [
    { 
      id: "event1", 
      client: "Thomas & Sophie - Mariage", 
      date: "24/08/2023", 
      photoCount: 135,
      thumbnail: "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHdlZGRpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
    },
    { 
      id: "event2", 
      client: "Jean & Marie - Anniversaire", 
      date: "12/09/2023", 
      photoCount: 78,
      thumbnail: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGFydHl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
    },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setUploadedPhotos(prev => [...prev, ...files]);
      
      // Créer des URLs de prévisualisation
      const newPreviewUrls = files.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
    }
  };

  const handleUpload = async () => {
    if (!selectedClient) {
      toast({
        variant: "destructive",
        title: "Sélection requise",
        description: "Veuillez sélectionner un client pour cet album photo",
      });
      return;
    }

    if (uploadedPhotos.length === 0) {
      toast({
        variant: "destructive",
        title: "Photos requises",
        description: "Veuillez sélectionner au moins une photo à télécharger",
      });
      return;
    }

    setIsUploading(true);

    // Simulation d'un téléchargement
    setTimeout(() => {
      setIsUploading(false);
      setUploadedPhotos([]);
      setPreviewUrls([]);
      setSelectedClient("");
      
      toast({
        title: "Téléchargement réussi",
        description: `${uploadedPhotos.length} photos ont été téléchargées avec succès.`,
      });
    }, 2000);
  };

  const clearSelection = () => {
    // Libérer les URLs de prévisualisation pour éviter les fuites de mémoire
    previewUrls.forEach(url => URL.revokeObjectURL(url));
    setPreviewUrls([]);
    setUploadedPhotos([]);
  };

  return (
    <DashboardLayout type="partner">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Gestion des Photos</h1>
        <p className="text-muted-foreground">Téléchargez et gérez les photos de vos clients</p>

        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="upload">Télécharger des photos</TabsTrigger>
            <TabsTrigger value="manage">Gérer les albums</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sélection du client</CardTitle>
                  <CardDescription>Choisissez à quel client associer ces photos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="client">Client</Label>
                    <Select value={selectedClient} onValueChange={setSelectedClient}>
                      <SelectTrigger id="client">
                        <SelectValue placeholder="Sélectionnez un client" />
                      </SelectTrigger>
                      <SelectContent>
                        {clients.map(client => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="mt-4 space-y-2">
                    <Label htmlFor="photos">Photos</Label>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="border-2 border-dashed rounded-md border-gray-300 p-8 text-center cursor-pointer hover:bg-gray-50" onClick={() => document.getElementById('photo-upload')?.click()}>
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="mt-2">
                          <p className="text-sm font-medium">Cliquez pour télécharger</p>
                          <p className="text-xs text-gray-500 mt-1">PNG, JPG, HEIC jusqu'à 10MB</p>
                        </div>
                        <Input
                          id="photo-upload"
                          type="file"
                          multiple
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-6">
                    <Button 
                      onClick={handleUpload} 
                      disabled={isUploading || uploadedPhotos.length === 0 || !selectedClient}
                      className="flex items-center gap-2"
                    >
                      {isUploading ? "Téléchargement en cours..." : "Télécharger les photos"}
                    </Button>
                    
                    {uploadedPhotos.length > 0 && (
                      <Button variant="outline" onClick={clearSelection}>
                        Effacer la sélection
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Aperçu des photos</CardTitle>
                    <CardDescription>
                      {uploadedPhotos.length === 0 
                        ? "Aucune photo sélectionnée" 
                        : `${uploadedPhotos.length} photo(s) sélectionnée(s)`
                      }
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {previewUrls.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {previewUrls.map((url, index) => (
                          <div key={index} className="relative aspect-square rounded-md overflow-hidden">
                            <img
                              src={url}
                              alt={`Preview ${index}`}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                        <Image className="h-16 w-16 mb-2 opacity-30" />
                        <p>Les photos sélectionnées apparaîtront ici</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="mt-4">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Options de confidentialité</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Lock className="h-5 w-5 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Accès restreint aux participants</p>
                          <p className="text-xs text-muted-foreground">Seuls le client et les prestataires de l'événement pourront voir ces photos</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Users className="h-5 w-5 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Partage simplifié</p>
                          <p className="text-xs text-muted-foreground">Le client pourra facilement partager les photos avec ses invités via un lien sécurisé</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="manage">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pastEvents.map(event => (
                <Card key={event.id} className="overflow-hidden">
                  <div className="aspect-video relative">
                    <img 
                      src={event.thumbnail} 
                      alt={event.client} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{event.client}</CardTitle>
                    <CardDescription>{event.date} • {event.photoCount} photos</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Modifier
                      </Button>
                      <Button size="sm" className="flex-1">
                        Voir
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card className="border-dashed border-2 flex flex-col items-center justify-center p-6 h-full cursor-pointer hover:bg-gray-50/50" onClick={() => document.querySelector('[value="upload"]')?.dispatchEvent(new MouseEvent('click'))}>
                <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="font-medium">Ajouter un nouvel album</p>
                <p className="text-sm text-muted-foreground">Télécharger des photos pour un client</p>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

// Wrap the component with the PartnerTypeRoute to restrict access
const ProtectedPartnerPhotos = () => (
  <PartnerTypeRoute allowedTypes={[PartnerType.PHOTOGRAPHER, PartnerType.GENERAL]}>
    <PartnerPhotos />
  </PartnerTypeRoute>
);

export default ProtectedPartnerPhotos;
