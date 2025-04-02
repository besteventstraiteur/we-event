
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Share2, Image } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ClientPhotos = () => {
  // Données fictives d'albums photos
  const photoAlbums = [
    {
      id: "album1",
      title: "Photos de mariage - Cérémonie",
      date: "24/08/2023",
      photographer: "Studio Lumière",
      photoCount: 86,
      thumbnail: "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHdlZGRpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: "album2",
      title: "Photos de mariage - Réception",
      date: "24/08/2023",
      photographer: "Studio Lumière",
      photoCount: 124,
      thumbnail: "https://images.unsplash.com/photo-1519741347686-c1e331fcb4d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2VkZGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
    },
  ];

  // Photos d'un album (exemple)
  const albumPhotos = Array(12).fill(0).map((_, i) => ({
    id: `photo${i}`,
    url: `https://picsum.photos/seed/${i + 100}/800/600`,
    width: 800,
    height: 600
  }));

  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);

  return (
    <DashboardLayout type="client">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Mes Photos</h1>
        <p className="text-muted-foreground">
          Photos prises par vos prestataires lors de vos événements
        </p>

        {selectedAlbum ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Button 
                variant="outline" 
                onClick={() => setSelectedAlbum(null)}
                className="mb-4"
              >
                Retour aux albums
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Partager
                </Button>
                <Button size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Télécharger toutes
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {albumPhotos.map(photo => (
                <div 
                  key={photo.id} 
                  className="aspect-square relative rounded-md overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <img 
                    src={photo.url} 
                    alt={`Photo ${photo.id}`} 
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-4">Mes albums photo</h2>
            {photoAlbums.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {photoAlbums.map(album => (
                  <Card key={album.id} className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedAlbum(album.id)}>
                    <div className="aspect-video relative">
                      <img 
                        src={album.thumbnail} 
                        alt={album.title} 
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute bottom-2 right-2 bg-black/70 hover:bg-black/70">
                        {album.photoCount} photos
                      </Badge>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{album.title}</CardTitle>
                      <CardDescription>{album.date} • {album.photographer}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button onClick={(e) => { e.stopPropagation(); setSelectedAlbum(album.id); }} className="w-full">
                        Voir les photos
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <div className="flex flex-col items-center">
                  <Image className="h-16 w-16 text-muted-foreground/30 mb-4" />
                  <h3 className="text-lg font-medium">Aucun album photo disponible</h3>
                  <p className="text-muted-foreground mt-2">
                    Vos prestataires n'ont pas encore partagé de photos avec vous.
                  </p>
                </div>
              </Card>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ClientPhotos;
