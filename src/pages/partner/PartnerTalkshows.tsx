
import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import GoldButton from "@/components/GoldButton";
import TalkshowCard from "@/components/talkshows/TalkshowCard";
import NewTalkshowForm from "@/components/talkshows/NewTalkshowForm";
import TalkshowPlayer from "@/components/talkshows/TalkshowPlayer";
import { Input } from "@/components/ui/input";
import { Search, AlertCircle, RefreshCw } from "lucide-react";
import { usePartnerTalkshows } from "@/hooks/usePartnerTalkshows";

const PartnerTalkshows = () => {
  const {
    talkshows,
    approvedTalkshows,
    pendingTalkshows,
    isLoading,
    isLoadingTalkshows,
    currentTalkshow,
    isPlaying,
    newTalkshow,
    videoFileName,
    imageFileName,
    searchQuery,
    error,
    formError,
    setSearchQuery,
    handleChange,
    handleSelectChange,
    handleVideoFileChange,
    handleImageFileChange,
    handleSubmit,
    handleDelete,
    togglePlay,
    navigateToNewTab,
    setIsPlaying,
    refresh
  } = usePartnerTalkshows();

  return (
    <DashboardLayout type="partner">
      <h1 className="text-2xl font-bold mb-6">Mes Talkshows</h1>
      
      {error && (
        <Alert variant="destructive" className="bg-red-900/20 border-red-900 mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-red-400 flex justify-between items-center">
            <span>{error}</span>
            <button 
              onClick={refresh}
              className="flex items-center gap-1 text-vip-gold hover:text-vip-gold/80"
            >
              <RefreshCw size={14} /> Réessayer
            </button>
          </AlertDescription>
        </Alert>
      )}
      
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-vip-gray-500" size={18} />
          <Input
            type="search"
            placeholder="Rechercher un talkshow par titre ou catégorie..."
            className="pl-10 bg-vip-gray-900 border-vip-gray-800"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="list" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="list">Tous les talkshows</TabsTrigger>
          <TabsTrigger value="approved">Approuvés ({approvedTalkshows.length})</TabsTrigger>
          <TabsTrigger value="pending">En attente ({pendingTalkshows.length})</TabsTrigger>
          <TabsTrigger value="new">Ajouter un talkshow</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="space-y-6">
          {isLoadingTalkshows ? (
            <div className="text-center py-8">
              <p className="text-vip-gray-400">Chargement des talkshows...</p>
            </div>
          ) : talkshows.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-vip-gray-400 mb-4">Vous n'avez pas encore de talkshows</p>
              <GoldButton onClick={navigateToNewTab}>
                Créer mon premier talkshow
              </GoldButton>
            </div>
          ) : (
            talkshows.map(talkshow => (
              <TalkshowCard
                key={talkshow.id}
                talkshow={talkshow}
                currentTalkshow={currentTalkshow}
                isPlaying={isPlaying}
                onTogglePlay={togglePlay}
                onDelete={handleDelete}
              />
            ))
          )}
        </TabsContent>
        
        <TabsContent value="approved" className="space-y-6">
          {isLoadingTalkshows ? (
            <div className="text-center py-8">
              <p className="text-vip-gray-400">Chargement des talkshows...</p>
            </div>
          ) : approvedTalkshows.length === 0 ? (
            <p className="text-center text-vip-gray-400 py-8">Aucun talkshow approuvé</p>
          ) : (
            approvedTalkshows.map(talkshow => (
              <TalkshowCard
                key={talkshow.id}
                talkshow={talkshow}
                currentTalkshow={currentTalkshow}
                isPlaying={isPlaying}
                onTogglePlay={togglePlay}
                onDelete={handleDelete}
              />
            ))
          )}
        </TabsContent>
        
        <TabsContent value="pending" className="space-y-6">
          {isLoadingTalkshows ? (
            <div className="text-center py-8">
              <p className="text-vip-gray-400">Chargement des talkshows...</p>
            </div>
          ) : pendingTalkshows.length === 0 ? (
            <p className="text-center text-vip-gray-400 py-8">Aucun talkshow en attente</p>
          ) : (
            pendingTalkshows.map(talkshow => (
              <TalkshowCard
                key={talkshow.id}
                talkshow={talkshow}
                currentTalkshow={currentTalkshow}
                isPlaying={isPlaying}
                onTogglePlay={togglePlay}
                onDelete={handleDelete}
              />
            ))
          )}
        </TabsContent>
        
        <TabsContent value="new">
          <NewTalkshowForm
            newTalkshow={newTalkshow}
            videoFileName={videoFileName}
            imageFileName={imageFileName}
            isLoading={isLoading}
            error={formError}
            onSubmit={handleSubmit}
            onChange={handleChange}
            onSelectChange={handleSelectChange}
            onVideoFileChange={handleVideoFileChange}
            onImageFileChange={handleImageFileChange}
          />
        </TabsContent>
      </Tabs>
      
      {/* Lecteur de talkshow fixe en bas de page (si un talkshow est sélectionné) */}
      {currentTalkshow && (
        <TalkshowPlayer
          talkshow={currentTalkshow}
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying(!isPlaying)}
        />
      )}
    </DashboardLayout>
  );
};

export default PartnerTalkshows;
