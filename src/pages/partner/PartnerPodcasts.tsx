
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import GoldButton from "@/components/GoldButton";
import { Upload, Edit, Trash2, Play, Pause, AlertCircle } from "lucide-react";

const PartnerPodcasts = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPodcast, setCurrentPodcast] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [newPodcast, setNewPodcast] = useState({
    title: "",
    description: "",
    category: "",
    audioFile: null,
    imageFile: null
  });
  const [audioFileName, setAudioFileName] = useState("");
  const [imageFileName, setImageFileName] = useState("");

  // Données simulées de podcasts
  const [podcasts, setPodcasts] = useState([
    {
      id: 1,
      title: "Comment choisir le lieu parfait pour votre mariage",
      description: "Dans cet épisode, nous explorons les critères essentiels pour sélectionner le lieu idéal pour votre mariage, en fonction de votre budget et du nombre d'invités.",
      category: "Mariage",
      duration: "18:45",
      date: "2023-02-15",
      status: "approved",
      views: 324,
      imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      audioUrl: "https://example.com/podcast1.mp3"
    },
    {
      id: 2,
      title: "Les tendances déco pour vos événements d'entreprise",
      description: "Découvrez les dernières tendances en matière de décoration pour vos événements professionnels et comment impressionner vos clients et collaborateurs.",
      category: "Entreprise",
      duration: "24:10",
      date: "2023-01-28",
      status: "pending",
      views: 0,
      imageUrl: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
      audioUrl: "https://example.com/podcast2.mp3"
    }
  ]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setNewPodcast(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value) => {
    setNewPodcast(prev => ({ ...prev, category: value }));
  };

  const handleAudioFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewPodcast(prev => ({ ...prev, audioFile: file }));
      setAudioFileName(file.name);
    }
  };

  const handleImageFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewPodcast(prev => ({ ...prev, imageFile: file }));
      setImageFileName(file.name);
      
      // Prévisualisation de l'image (optionnelle)
      const reader = new FileReader();
      reader.onload = function(event) {
        const imgPreview = document.getElementById('image-preview') as HTMLImageElement;
        if (imgPreview && event.target) {
          imgPreview.src = event.target.result as string;
        }
        
        const previewContainer = document.getElementById('image-preview-container');
        if (previewContainer) {
          previewContainer.classList.remove('hidden');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Vérification que tous les champs sont remplis
    if (!newPodcast.title || !newPodcast.description || !newPodcast.category || !newPodcast.audioFile) {
      toast({
        variant: "destructive",
        title: "Champs manquants",
        description: "Veuillez remplir tous les champs obligatoires."
      });
      setIsLoading(false);
      return;
    }

    // Simulation d'upload et création de podcast
    setTimeout(() => {
      const newId = podcasts.length > 0 ? Math.max(...podcasts.map(p => p.id)) + 1 : 1;
      const podcast = {
        id: newId,
        title: newPodcast.title,
        description: newPodcast.description,
        category: newPodcast.category,
        duration: "12:34", // Durée arbitraire pour la simulation
        date: new Date().toISOString().split('T')[0],
        status: "pending",
        views: 0,
        imageUrl: newPodcast.imageFile ? URL.createObjectURL(newPodcast.imageFile) : "https://via.placeholder.com/300x200",
        audioUrl: "https://example.com/podcast-simulation.mp3"
      };
      
      setPodcasts(prev => [podcast, ...prev]);
      
      // Réinitialiser le formulaire
      setNewPodcast({
        title: "",
        description: "",
        category: "",
        audioFile: null,
        imageFile: null
      });
      setAudioFileName("");
      setImageFileName("");
      
      const previewContainer = document.getElementById('image-preview-container');
      if (previewContainer) {
        previewContainer.classList.add('hidden');
      }
      
      toast({
        title: "Podcast ajouté",
        description: "Votre podcast a été soumis et est en attente de validation."
      });
      
      setIsLoading(false);
    }, 2000);
  };

  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce podcast?")) {
      setPodcasts(podcasts.filter(podcast => podcast.id !== id));
      toast({
        title: "Podcast supprimé",
        description: "Le podcast a été supprimé avec succès."
      });
    }
  };

  const togglePlay = (podcast) => {
    if (currentPodcast && currentPodcast.id === podcast.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentPodcast(podcast);
      setIsPlaying(true);
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case "approved":
        return <Badge className="bg-green-500">Approuvé</Badge>;
      case "pending":
        return <Badge className="bg-amber-500">En attente</Badge>;
      case "rejected":
        return <Badge className="bg-red-500">Refusé</Badge>;
      default:
        return <Badge>Inconnu</Badge>;
    }
  };

  // Fonction pour naviguer vers l'onglet "new"
  const navigateToNewTab = () => {
    const newTabTrigger = document.querySelector('[data-value="new"]') as HTMLElement;
    if (newTabTrigger) {
      newTabTrigger.click();
    }
  };

  // Podcasts filtrés par statut
  const approvedPodcasts = podcasts.filter(p => p.status === "approved");
  const pendingPodcasts = podcasts.filter(p => p.status === "pending");

  return (
    <DashboardLayout type="partner">
      <h1 className="text-2xl font-bold mb-6">Mes Podcasts</h1>
      
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
              <Card key={podcast.id} className="bg-vip-gray-900 border-vip-gray-800">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/4">
                    <img 
                      src={podcast.imageUrl} 
                      alt={podcast.title}
                      className="w-full h-56 md:h-full object-cover"
                    />
                  </div>
                  <div className="w-full md:w-3/4 flex flex-col">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-vip-white">{podcast.title}</CardTitle>
                          <CardDescription className="text-vip-gray-400">
                            {podcast.category} • {podcast.duration} • Publié le {podcast.date}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(podcast.status)}
                          {podcast.status === "approved" && (
                            <span className="text-xs text-vip-gray-400">{podcast.views} vues</span>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-vip-gray-300 line-clamp-3">{podcast.description}</p>
                      
                      {podcast.status === "pending" && (
                        <div className="mt-4 flex items-center p-3 bg-amber-500/10 rounded-md">
                          <AlertCircle size={18} className="text-amber-500 mr-2" />
                          <p className="text-sm text-amber-300">
                            Ce podcast est en cours de validation par l'équipe Best Events VIP. 
                            Vous serez notifié par email dès qu'il sera approuvé.
                          </p>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="border-t border-vip-gray-800 pt-4 flex justify-between">
                      <button 
                        className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                          currentPodcast && currentPodcast.id === podcast.id && isPlaying
                            ? 'bg-vip-gold text-vip-black'
                            : 'bg-vip-gray-800 text-vip-gold hover:bg-vip-gold/20'
                        }`}
                        onClick={() => togglePlay(podcast)}
                      >
                        {currentPodcast && currentPodcast.id === podcast.id && isPlaying 
                          ? <><Pause size={18} /> Pause</>
                          : <><Play size={18} /> Écouter</>
                        }
                      </button>
                      
                      <div className="flex gap-2">
                        <button 
                          className="p-2 rounded-md bg-vip-gray-800 text-vip-gray-300 hover:bg-vip-gray-700"
                          onClick={() => console.log("Edit podcast", podcast.id)}
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          className="p-2 rounded-md bg-vip-gray-800 text-red-500 hover:bg-vip-gray-700"
                          onClick={() => handleDelete(podcast.id)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </CardFooter>
                  </div>
                </div>
              </Card>
            ))
          )}
        </TabsContent>
        
        <TabsContent value="approved" className="space-y-6">
          {approvedPodcasts.length === 0 ? (
            <p className="text-center text-vip-gray-400 py-8">Aucun podcast approuvé</p>
          ) : (
            approvedPodcasts.map(podcast => (
              <Card key={podcast.id} className="bg-vip-gray-900 border-vip-gray-800">
                {/* Contenu identique à l'onglet "list" */}
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/4">
                    <img 
                      src={podcast.imageUrl} 
                      alt={podcast.title}
                      className="w-full h-56 md:h-full object-cover"
                    />
                  </div>
                  <div className="w-full md:w-3/4 flex flex-col">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-vip-white">{podcast.title}</CardTitle>
                          <CardDescription className="text-vip-gray-400">
                            {podcast.category} • {podcast.duration} • Publié le {podcast.date}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(podcast.status)}
                          <span className="text-xs text-vip-gray-400">{podcast.views} vues</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-vip-gray-300 line-clamp-3">{podcast.description}</p>
                    </CardContent>
                    <CardFooter className="border-t border-vip-gray-800 pt-4 flex justify-between">
                      <button 
                        className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                          currentPodcast && currentPodcast.id === podcast.id && isPlaying
                            ? 'bg-vip-gold text-vip-black'
                            : 'bg-vip-gray-800 text-vip-gold hover:bg-vip-gold/20'
                        }`}
                        onClick={() => togglePlay(podcast)}
                      >
                        {currentPodcast && currentPodcast.id === podcast.id && isPlaying 
                          ? <><Pause size={18} /> Pause</>
                          : <><Play size={18} /> Écouter</>
                        }
                      </button>
                      
                      <div className="flex gap-2">
                        <button 
                          className="p-2 rounded-md bg-vip-gray-800 text-vip-gray-300 hover:bg-vip-gray-700"
                          onClick={() => console.log("Edit podcast", podcast.id)}
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          className="p-2 rounded-md bg-vip-gray-800 text-red-500 hover:bg-vip-gray-700"
                          onClick={() => handleDelete(podcast.id)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </CardFooter>
                  </div>
                </div>
              </Card>
            ))
          )}
        </TabsContent>
        
        <TabsContent value="pending" className="space-y-6">
          {pendingPodcasts.length === 0 ? (
            <p className="text-center text-vip-gray-400 py-8">Aucun podcast en attente</p>
          ) : (
            pendingPodcasts.map(podcast => (
              <Card key={podcast.id} className="bg-vip-gray-900 border-vip-gray-800">
                {/* Contenu identique à l'onglet "list" */}
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/4">
                    <img 
                      src={podcast.imageUrl} 
                      alt={podcast.title}
                      className="w-full h-56 md:h-full object-cover"
                    />
                  </div>
                  <div className="w-full md:w-3/4 flex flex-col">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-vip-white">{podcast.title}</CardTitle>
                          <CardDescription className="text-vip-gray-400">
                            {podcast.category} • {podcast.duration} • Soumis le {podcast.date}
                          </CardDescription>
                        </div>
                        <div>
                          {getStatusBadge(podcast.status)}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-vip-gray-300 line-clamp-3">{podcast.description}</p>
                      
                      <div className="mt-4 flex items-center p-3 bg-amber-500/10 rounded-md">
                        <AlertCircle size={18} className="text-amber-500 mr-2" />
                        <p className="text-sm text-amber-300">
                          Ce podcast est en cours de validation par l'équipe Best Events VIP. 
                          Vous serez notifié par email dès qu'il sera approuvé.
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t border-vip-gray-800 pt-4 flex justify-between">
                      <button 
                        className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                          currentPodcast && currentPodcast.id === podcast.id && isPlaying
                            ? 'bg-vip-gold text-vip-black'
                            : 'bg-vip-gray-800 text-vip-gold hover:bg-vip-gold/20'
                        }`}
                        onClick={() => togglePlay(podcast)}
                      >
                        {currentPodcast && currentPodcast.id === podcast.id && isPlaying 
                          ? <><Pause size={18} /> Pause</>
                          : <><Play size={18} /> Écouter</>
                        }
                      </button>
                      
                      <div className="flex gap-2">
                        <button 
                          className="p-2 rounded-md bg-vip-gray-800 text-vip-gray-300 hover:bg-vip-gray-700"
                          onClick={() => console.log("Edit podcast", podcast.id)}
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          className="p-2 rounded-md bg-vip-gray-800 text-red-500 hover:bg-vip-gray-700"
                          onClick={() => handleDelete(podcast.id)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </CardFooter>
                  </div>
                </div>
              </Card>
            ))
          )}
        </TabsContent>
        
        <TabsContent value="new">
          <Card className="bg-vip-gray-900 border-vip-gray-800">
            <CardHeader>
              <CardTitle className="text-vip-white">Ajouter un nouveau podcast</CardTitle>
              <CardDescription className="text-vip-gray-400">
                Partagez votre expertise avec la communauté Best Events VIP
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-vip-gray-300 mb-1">
                    Titre du podcast *
                  </label>
                  <Input 
                    id="title"
                    placeholder="Ex: Comment organiser un mariage parfait"
                    className="bg-vip-gray-800 border-vip-gray-700"
                    value={newPodcast.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-vip-gray-300 mb-1">
                    Catégorie *
                  </label>
                  <Select 
                    value={newPodcast.category} 
                    onValueChange={handleSelectChange}
                    required
                  >
                    <SelectTrigger className="bg-vip-gray-800 border-vip-gray-700">
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent className="bg-vip-gray-800 border-vip-gray-700">
                      <SelectItem value="Mariage">Mariage</SelectItem>
                      <SelectItem value="Entreprise">Entreprise</SelectItem>
                      <SelectItem value="Animation">Animation</SelectItem>
                      <SelectItem value="Photographie">Photographie</SelectItem>
                      <SelectItem value="Décoration">Décoration</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Conseils">Conseils</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-vip-gray-300 mb-1">
                    Description *
                  </label>
                  <Textarea 
                    id="description"
                    placeholder="Décrivez le contenu de votre podcast..."
                    className="bg-vip-gray-800 border-vip-gray-700 min-h-[150px]"
                    value={newPodcast.description}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="audioFile" className="block text-sm font-medium text-vip-gray-300 mb-1">
                    Fichier audio (MP3) *
                  </label>
                  <div className="flex items-center gap-2">
                    <label className="flex-1 flex items-center gap-2 px-4 py-3 rounded-md bg-vip-gray-800 border border-vip-gray-700 cursor-pointer hover:bg-vip-gray-700">
                      <Upload size={18} className="text-vip-gold" />
                      <span className="text-vip-gray-300">
                        {audioFileName || "Choisir un fichier audio"}
                      </span>
                      <input
                        id="audioFile"
                        type="file"
                        accept="audio/mp3,audio/mpeg"
                        className="hidden"
                        onChange={handleAudioFileChange}
                        required
                      />
                    </label>
                  </div>
                  <p className="text-xs text-vip-gray-400 mt-1">
                    Format MP3 uniquement. Taille maximale: 20MB.
                  </p>
                </div>
                
                <div>
                  <label htmlFor="imageFile" className="block text-sm font-medium text-vip-gray-300 mb-1">
                    Image de couverture
                  </label>
                  <div className="flex items-center gap-2">
                    <label className="flex-1 flex items-center gap-2 px-4 py-3 rounded-md bg-vip-gray-800 border border-vip-gray-700 cursor-pointer hover:bg-vip-gray-700">
                      <Upload size={18} className="text-vip-gold" />
                      <span className="text-vip-gray-300">
                        {imageFileName || "Choisir une image"}
                      </span>
                      <input
                        id="imageFile"
                        type="file"
                        accept="image/jpeg,image/png,image/jpg"
                        className="hidden"
                        onChange={handleImageFileChange}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-vip-gray-400 mt-1">
                    Formats JPG, JPEG ou PNG. Taille recommandée: 1200x800px
                  </p>
                  
                  <div id="image-preview-container" className="hidden mt-4">
                    <img 
                      id="image-preview" 
                      src="" 
                      alt="Prévisualisation" 
                      className="max-h-60 rounded-md border border-vip-gray-700"
                    />
                  </div>
                </div>
                
                <div className="pt-4 text-sm text-vip-gray-400">
                  <p className="mb-2">
                    <strong className="text-vip-gold">Notes importantes:</strong>
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Tous les podcasts sont soumis à validation par l'équipe Best Events VIP</li>
                    <li>Les podcasts approuvés seront disponibles pour tous les clients VIP</li>
                    <li>Assurez-vous que votre contenu est original et de qualité professionnelle</li>
                    <li>Évitez tout contenu promotionnel direct - privilégiez le partage d'expertise</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <GoldButton type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>Envoi en cours...</>
                  ) : (
                    <>Soumettre le podcast</>
                  )}
                </GoldButton>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Lecteur de podcast fixe en bas de page (si un podcast est sélectionné) */}
      {currentPodcast && (
        <div className="fixed bottom-0 left-0 right-0 bg-vip-gray-900 border-t border-vip-gray-800 p-4 flex items-center">
          <button 
            className={`p-2 mr-4 rounded-full ${isPlaying ? 'bg-vip-gold text-vip-black' : 'bg-vip-gray-800 text-vip-gold'}`}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <div className="flex-grow">
            <p className="font-medium text-vip-white">{currentPodcast.title}</p>
            <p className="text-sm text-vip-gray-400">{currentPodcast.category}</p>
          </div>
          <span className="text-vip-gray-400 ml-4">{currentPodcast.duration}</span>
        </div>
      )}
    </DashboardLayout>
  );
};

export default PartnerPodcasts;
