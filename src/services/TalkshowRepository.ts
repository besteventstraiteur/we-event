
import { Talkshow, NewTalkshow } from "@/models/talkshow";
import { PodcastError } from "@/utils/errorHandling";

/**
 * Repository pour la gestion des talkshows
 */
export class TalkshowRepository {
  private static instance: TalkshowRepository;
  private talkshows: Talkshow[] = [];

  private constructor() {
    // Initialisation avec des données de démonstration
    this.talkshows = [
      {
        id: 1,
        title: "Les dernières tendances en décoration de mariage",
        description: "Dans ce talkshow, nous discutons avec les meilleurs décorateurs de mariages des tendances actuelles et comment créer une ambiance unique pour votre jour spécial.",
        category: "Mariage",
        duration: "45:30",
        date: "2023-05-15",
        status: "approved",
        views: 842,
        imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800",
        videoUrl: "https://example.com/videos/talkshow1.mp4",
        host: "Marie Durand",
        guests: ["Jean Dupont", "Sophie Martin", "Paul Bernard"]
      },
      {
        id: 2,
        title: "Comment optimiser votre budget événementiel",
        description: "Un panel d'experts financiers et d'organisateurs d'événements discutent des stratégies pour maximiser votre budget tout en créant un événement mémorable.",
        category: "Finance",
        duration: "38:15",
        date: "2023-06-22",
        status: "approved",
        views: 567,
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
        videoUrl: "https://example.com/videos/talkshow2.mp4",
        host: "Philippe Legrand",
        guests: ["Émilie Rousseau", "Thomas Petit"]
      },
      {
        id: 3,
        title: "Les secrets d'un événement d'entreprise réussi",
        description: "Des professionnels du secteur partagent leurs secrets pour organiser des événements d'entreprise qui impressionnent les clients et motivent les employés.",
        category: "Entreprise",
        duration: "52:10",
        date: "2023-07-05",
        status: "pending",
        views: 0,
        imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800",
        videoUrl: "https://example.com/videos/talkshow3.mp4",
        host: "Caroline Dubois",
        guests: ["Marc Antoine", "Julie Lefevre", "Nicolas Martin"]
      },
      {
        id: 4,
        title: "Organisation de mariage : Questions/Réponses en direct",
        description: "Session en direct où nos experts répondent à toutes vos questions concernant l'organisation de votre mariage.",
        category: "Mariage",
        duration: "60:00",
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: "approved",
        views: 56,
        imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
        videoUrl: "",
        host: "Sophie Marceau",
        guests: ["Pierre Dupont", "Marie Lambert"],
        isLive: true,
        conferenceId: "conf-001",
        liveDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        liveStatus: "scheduled"
      }
    ];
  }

  /**
   * Obtient l'instance unique du repository (Singleton)
   */
  public static getInstance(): TalkshowRepository {
    if (!TalkshowRepository.instance) {
      TalkshowRepository.instance = new TalkshowRepository();
    }
    return TalkshowRepository.instance;
  }

  /**
   * Récupère tous les talkshows
   */
  public getAllTalkshows(): Talkshow[] {
    return [...this.talkshows];
  }

  /**
   * Récupère tous les talkshows en direct (programmés, en cours ou terminés)
   */
  public getLiveTalkshows(): Talkshow[] {
    return this.talkshows
      .filter(talkshow => talkshow.isLive)
      .map(talkshow => ({ ...talkshow }));
  }

  /**
   * Recherche des talkshows par titre, description ou catégorie
   * 
   * @param query - Le terme de recherche
   */
  public searchTalkshows(query: string): Talkshow[] {
    if (!query.trim()) {
      return [...this.talkshows];
    }
    
    const lowercaseQuery = query.toLowerCase();
    
    return this.talkshows.filter(talkshow =>
      talkshow.title.toLowerCase().includes(lowercaseQuery) ||
      talkshow.description.toLowerCase().includes(lowercaseQuery) ||
      talkshow.category.toLowerCase().includes(lowercaseQuery) ||
      talkshow.host.toLowerCase().includes(lowercaseQuery) ||
      talkshow.guests.some(guest => guest.toLowerCase().includes(lowercaseQuery))
    );
  }

  /**
   * Récupère un talkshow par son ID
   * 
   * @param id - L'ID du talkshow à récupérer
   */
  public getTalkshowById(id: number): Talkshow {
    const talkshow = this.talkshows.find(t => t.id === id);
    
    if (!talkshow) {
      throw new PodcastError(`Talkshow avec l'ID ${id} non trouvé`, 'FETCH_ERROR');
    }
    
    return { ...talkshow };
  }

  /**
   * Ajoute un nouveau talkshow
   * 
   * @param newTalkshow - Les données du nouveau talkshow
   */
  public addTalkshow(newTalkshow: NewTalkshow): Talkshow {
    try {
      // Valider les données
      if (!newTalkshow.title.trim()) {
        throw new PodcastError("Le titre du talkshow est requis", 'VALIDATION_ERROR');
      }
      
      if (!newTalkshow.category) {
        throw new PodcastError("La catégorie est requise", 'VALIDATION_ERROR');
      }
      
      // Pour les talkshows en direct, le fichier vidéo n'est pas nécessaire
      if (!newTalkshow.isLive && !newTalkshow.videoFile) {
        throw new PodcastError("Le fichier vidéo est requis pour les talkshows non-live", 'FILE_ERROR');
      }
      
      // Simuler l'upload de fichiers
      // Dans une application réelle, cela impliquerait l'envoi des fichiers à un serveur
      const videoUrl = newTalkshow.videoFile 
        ? `https://example.com/videos/talkshow-${Date.now()}.mp4`
        : "";
      
      const imageUrl = newTalkshow.imageFile 
        ? `https://example.com/images/talkshow-${Date.now()}.jpg`
        : "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800"; // Image par défaut
      
      // Créer un tableau d'invités à partir de la chaîne d'invités
      const guestsList = newTalkshow.guests
        .split(',')
        .map(guest => guest.trim())
        .filter(guest => guest.length > 0);
      
      // Générer un nouvel ID (dans une application réelle, cela serait fait par la base de données)
      const newId = Math.max(...this.talkshows.map(t => t.id), 0) + 1;
      
      // Créer le nouveau talkshow
      const talkshow: Talkshow = {
        id: newId,
        title: newTalkshow.title,
        description: newTalkshow.description,
        category: newTalkshow.category,
        duration: newTalkshow.isLive ? "60:00" : "00:00", // Durée par défaut pour les live
        date: newTalkshow.isLive && newTalkshow.liveDate 
          ? new Date(newTalkshow.liveDate).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0], // Format YYYY-MM-DD
        status: "pending", // Les nouveaux talkshows sont en attente d'approbation
        views: 0,
        videoUrl,
        imageUrl,
        host: newTalkshow.host,
        guests: guestsList,
        isLive: newTalkshow.isLive || false,
        liveDate: newTalkshow.liveDate,
        liveStatus: newTalkshow.isLive ? 'scheduled' : undefined
      };
      
      // Ajouter le talkshow à la liste
      this.talkshows.push(talkshow);
      
      return { ...talkshow };
    } catch (error) {
      if (error instanceof PodcastError) {
        throw error;
      }
      throw new PodcastError("Erreur lors de l'ajout du talkshow", 'SAVE_ERROR');
    }
  }

  /**
   * Met à jour un talkshow existant
   * 
   * @param id - L'ID du talkshow à mettre à jour
   * @param updates - Les modifications à apporter
   */
  public updateTalkshow(id: number, updates: Partial<Talkshow>): Talkshow {
    const index = this.talkshows.findIndex(t => t.id === id);
    
    if (index === -1) {
      throw new PodcastError(`Talkshow avec l'ID ${id} non trouvé`, 'UPDATE_ERROR');
    }
    
    // Mettre à jour le talkshow
    this.talkshows[index] = {
      ...this.talkshows[index],
      ...updates
    };
    
    return { ...this.talkshows[index] };
  }

  /**
   * Met à jour le statut d'un talkshow en direct
   * 
   * @param id - L'ID du talkshow
   * @param status - Le nouveau statut
   */
  public updateLiveStatus(
    id: number, 
    status: 'scheduled' | 'live' | 'ended' | 'cancelled'
  ): Talkshow {
    const talkshow = this.getTalkshowById(id);
    
    if (!talkshow.isLive) {
      throw new PodcastError("Ce talkshow n'est pas configuré comme un événement en direct", 'VALIDATION_ERROR');
    }
    
    return this.updateTalkshow(id, { liveStatus: status });
  }

  /**
   * Associe une visioconférence à un talkshow
   * 
   * @param talkshowId - L'ID du talkshow
   * @param conferenceId - L'ID de la visioconférence
   */
  public associateConference(talkshowId: number, conferenceId: string): Talkshow {
    const talkshow = this.getTalkshowById(talkshowId);
    
    if (!talkshow.isLive) {
      throw new PodcastError("Ce talkshow n'est pas configuré comme un événement en direct", 'VALIDATION_ERROR');
    }
    
    return this.updateTalkshow(talkshowId, { conferenceId });
  }

  /**
   * Supprime un talkshow
   * 
   * @param id - L'ID du talkshow à supprimer
   */
  public deleteTalkshow(id: number): void {
    const index = this.talkshows.findIndex(t => t.id === id);
    
    if (index === -1) {
      throw new PodcastError(`Talkshow avec l'ID ${id} non trouvé`, 'DELETE_ERROR');
    }
    
    this.talkshows.splice(index, 1);
  }
}
