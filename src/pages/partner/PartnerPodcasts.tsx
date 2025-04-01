
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GoldButton from "@/components/GoldButton";
import PodcastCard from "@/components/podcasts/PodcastCard";
import NewPodcastForm from "@/components/podcasts/NewPodcastForm";
import PodcastPlayer from "@/components/podcasts/PodcastPlayer";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { usePartnerPodcasts } from "@/hooks/usePartnerPodcasts";

const PartnerPodcasts = () => {
  const {
    podcasts,
    approvedPodcasts,
    pendingPodcasts,
    isLoading,
    currentPodcast,
    isPlaying,
    newPodcast,
    audioFileName,
    imageFileName,
    searchQuery,
    setSearchQuery,
    handleChange,
    handleSelectChange,
    handleAudioFileChange,
    handleImageFileChange,
    handleSubmit,
    handleDelete,
    togglePlay,
    navigateToNewTab,
    setIsPlaying
  } = usePartnerPodcasts();

  return (
    <DashboardLayout type="partner">
      <h1 className="text-2xl font-bold mb-6">Mes Podcasts</h1>
      
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-vip-gray-500" size={18} />
          <Input
            type="search"
            placeholder="Rechercher un podcast par titre ou catégorie..."
            className="pl-10 bg-vip-gray-900 border-vip-gray-800"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="list" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="list">Tous les podcasts</TabsTrigger>
          <TabsTrigger value="approved">Approuvés ({approvedPodcasts.length})</TabsTrigger>
          <TabsTrigger value="pending">En attente ({pendingPodcasts.length})</TabsTrigger>
          <TabsTrigger value="new">Ajouter un podcast</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="space-y-6">
          {podcasts.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-vip-gray-400 mb-4">Vous n'avez pas encore de podcasts</p>
              <GoldButton onClick={navigateToNewTab}>
                Créer mon premier podcast
              </GoldButton>
            </div>
          ) : (
            podcasts.map(podcast => (
              <PodcastCard
                key={podcast.id}
                podcast={podcast}
                currentPodcast={currentPodcast}
                isPlaying={isPlaying}
                onTogglePlay={togglePlay}
                onDelete={handleDelete}
              />
            ))
          )}
        </TabsContent>
        
        <TabsContent value="approved" className="space-y-6">
          {approvedPodcasts.length === 0 ? (
            <p className="text-center text-vip-gray-400 py-8">Aucun podcast approuvé</p>
          ) : (
            approvedPodcasts.map(podcast => (
              <PodcastCard
                key={podcast.id}
                podcast={podcast}
                currentPodcast={currentPodcast}
                isPlaying={isPlaying}
                onTogglePlay={togglePlay}
                onDelete={handleDelete}
              />
            ))
          )}
        </TabsContent>
        
        <TabsContent value="pending" className="space-y-6">
          {pendingPodcasts.length === 0 ? (
            <p className="text-center text-vip-gray-400 py-8">Aucun podcast en attente</p>
          ) : (
            pendingPodcasts.map(podcast => (
              <PodcastCard
                key={podcast.id}
                podcast={podcast}
                currentPodcast={currentPodcast}
                isPlaying={isPlaying}
                onTogglePlay={togglePlay}
                onDelete={handleDelete}
              />
            ))
          )}
        </TabsContent>
        
        <TabsContent value="new">
          <NewPodcastForm
            newPodcast={newPodcast}
            audioFileName={audioFileName}
            imageFileName={imageFileName}
            isLoading={isLoading}
            onSubmit={handleSubmit}
            onChange={handleChange}
            onSelectChange={handleSelectChange}
            onAudioFileChange={handleAudioFileChange}
            onImageFileChange={handleImageFileChange}
          />
        </TabsContent>
      </Tabs>
      
      {/* Lecteur de podcast fixe en bas de page (si un podcast est sélectionné) */}
      {currentPodcast && (
        <PodcastPlayer
          podcast={currentPodcast}
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying(!isPlaying)}
        />
      )}
    </DashboardLayout>
  );
};

export default PartnerPodcasts;
