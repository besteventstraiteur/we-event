
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
      throw new PodcastError(`Talkshow avec l'ID ${id} non trouvé`, 404);
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
        throw new PodcastError("Le titre du talkshow est requis", 400);
      }
      
      if (!newTalkshow.category) {
        throw new PodcastError("La catégorie est requise", 400);
      }
      
      if (!newTalkshow.videoFile) {
        throw new PodcastError("Le fichier vidéo est requis", 400);
      }
      
      // Simuler l'upload de fichiers
      // Dans une application réelle, cela impliquerait l'envoi des fichiers à un serveur
      const videoUrl = `https://example.com/videos/talkshow-${Date.now()}.mp4`;
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
        duration: "00:00", // La durée réelle serait calculée à partir du fichier vidéo
        date: new Date().toISOString().split('T')[0], // Format YYYY-MM-DD
        status: "pending", // Les nouveaux talkshows sont en attente d'approbation
        views: 0,
        videoUrl,
        imageUrl,
        host: newTalkshow.host,
        guests: guestsList
      };
      
      // Ajouter le talkshow à la liste
      this.talkshows.push(talkshow);
      
      return { ...talkshow };
    } catch (error) {
      if (error instanceof PodcastError) {
        throw error;
      }
      throw new PodcastError("Erreur lors de l'ajout du talkshow", 500);
    }
  }

  /**
   * Supprime un talkshow
   * 
   * @param id - L'ID du talkshow à supprimer
   */
  public deleteTalkshow(id: number): void {
    const index = this.talkshows.findIndex(t => t.id === id);
    
    if (index === -1) {
      throw new PodcastError(`Talkshow avec l'ID ${id} non trouvé`, 404);
    }
    
    this.talkshows.splice(index, 1);
  }
}
