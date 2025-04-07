
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Music, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDjPlaylists } from "@/hooks/useDjPlaylists";
import PartnerTypeRoute from "@/components/security/PartnerTypeRoute";
import { PartnerType } from "@/utils/accessControl";

const PartnerPlaylists = () => {
  const {
    playlists,
    createPlaylist,
    openPlaylist,
    searchQuery,
    setSearchQuery,
    clientFilter,
    setClientFilter,
    isLoading
  } = useDjPlaylists("current-dj-id");
  
  return (
    <DashboardLayout type="partner">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Gestion des Playlists</h1>
          <Button className="bg-vip-gold hover:bg-amber-600 text-white">
            <PlusCircle size={16} className="mr-2" />
            Nouvelle Playlist
          </Button>
        </div>
        <p className="text-gray-600">
          Gérez les playlists musicales pour vos clients. Créez des listes personnalisées pour chaque moment clé de leur événement.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Rechercher une playlist..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-vip-gold"
            value={clientFilter || ""}
            onChange={(e) => setClientFilter(e.target.value || null)}
          >
            <option value="">Tous les clients</option>
            <option value="client-1">Sophie & Thomas</option>
            <option value="client-2">Marie & Jean</option>
            <option value="client-3">Camille & Lucas</option>
          </select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            <p>Chargement des playlists...</p>
          ) : playlists.length > 0 ? (
            playlists.map((playlist) => (
              <Card key={playlist.id} className="h-full">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <Music size={18} className="mr-2 text-vip-gold" />
                    {playlist.name}
                  </CardTitle>
                  <CardDescription>
                    {playlist.songs.length} morceaux • {playlist.moment}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm mb-4">
                    <p className="font-medium">
                      Client: {playlist.clientId ? "Client " + playlist.clientId : "Sans nom"}
                    </p>
                    <p className="text-gray-500">{new Date(playlist.updatedAt).toLocaleDateString()}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => openPlaylist(playlist.id)}
                  >
                    Gérer cette playlist
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full">
              <Card className="text-center p-6">
                <p className="mb-4 text-gray-500">Aucune playlist trouvée</p>
                <Button>Créer votre première playlist</Button>
              </Card>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

// Wrap the component with the PartnerTypeRoute to restrict access
const ProtectedPartnerPlaylists = () => (
  <PartnerTypeRoute allowedTypes={[PartnerType.DJ, PartnerType.GENERAL]}>
    <PartnerPlaylists />
  </PartnerTypeRoute>
);

export default ProtectedPartnerPlaylists;
