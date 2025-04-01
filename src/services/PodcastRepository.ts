
import { Podcast, NewPodcast } from "@/models/podcast";
import { toast } from "@/hooks/use-toast";

// Mock data for now
const mockPodcasts: Podcast[] = [
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
];

export class PodcastRepository {
  private static instance: PodcastRepository;
  private podcasts: Podcast[] = [...mockPodcasts];

  private constructor() {}

  public static getInstance(): PodcastRepository {
    if (!PodcastRepository.instance) {
      PodcastRepository.instance = new PodcastRepository();
    }
    return PodcastRepository.instance;
  }

  public getAllPodcasts(): Podcast[] {
    return [...this.podcasts];
  }

  public getPodcastsByStatus(status: Podcast["status"]): Podcast[] {
    return this.podcasts.filter(p => p.status === status);
  }

  public addPodcast(newPodcast: NewPodcast): Promise<Podcast> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newId = this.podcasts.length > 0 ? Math.max(...this.podcasts.map(p => p.id)) + 1 : 1;
        const podcast: Podcast = {
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
        
        this.podcasts = [podcast, ...this.podcasts];
        resolve(podcast);
      }, 2000);
    });
  }

  public deletePodcast(id: number): void {
    this.podcasts = this.podcasts.filter(podcast => podcast.id !== id);
  }

  public searchPodcasts(query: string): Podcast[] {
    if (!query.trim()) return this.getAllPodcasts();
    
    const normalizedQuery = query.toLowerCase();
    return this.podcasts.filter(podcast => 
      podcast.title.toLowerCase().includes(normalizedQuery) ||
      podcast.category.toLowerCase().includes(normalizedQuery) ||
      podcast.description.toLowerCase().includes(normalizedQuery)
    );
  }
}
