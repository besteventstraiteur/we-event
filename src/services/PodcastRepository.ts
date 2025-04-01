
import { Podcast, NewPodcast } from "@/models/podcast";
import { toast } from "@/hooks/use-toast";

// Mock data for testing and development
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

/**
 * Repository class for managing podcast data
 * Implements the Singleton pattern for global access
 */
export class PodcastRepository {
  /** The singleton instance */
  private static instance: PodcastRepository;
  /** In-memory podcast storage */
  private podcasts: Podcast[] = [...mockPodcasts];

  /** Private constructor to prevent direct instantiation */
  private constructor() {}

  /**
   * Gets the singleton instance of the repository
   * 
   * @returns The PodcastRepository singleton instance
   */
  public static getInstance(): PodcastRepository {
    if (!PodcastRepository.instance) {
      PodcastRepository.instance = new PodcastRepository();
    }
    return PodcastRepository.instance;
  }

  /**
   * Retrieves all podcasts
   * 
   * @returns A copy of all podcasts in the repository
   */
  public getAllPodcasts(): Podcast[] {
    return [...this.podcasts];
  }

  /**
   * Filters podcasts by their approval status
   * 
   * @param status - The status to filter by (approved, pending, rejected)
   * @returns Array of podcasts matching the specified status
   */
  public getPodcastsByStatus(status: Podcast["status"]): Podcast[] {
    return this.podcasts.filter(p => p.status === status);
  }

  /**
   * Adds a new podcast to the repository
   * 
   * @param newPodcast - The podcast data to add
   * @returns Promise resolving to the newly created podcast
   */
  public addPodcast(newPodcast: NewPodcast): Promise<Podcast> {
    return new Promise((resolve) => {
      // Simulate network delay
      setTimeout(() => {
        const newId = this.podcasts.length > 0 ? Math.max(...this.podcasts.map(p => p.id)) + 1 : 1;
        const podcast: Podcast = {
          id: newId,
          title: newPodcast.title,
          description: newPodcast.description,
          category: newPodcast.category,
          duration: "12:34", // Arbitrary duration for simulation
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

  /**
   * Deletes a podcast by its ID
   * 
   * @param id - The ID of the podcast to delete
   */
  public deletePodcast(id: number): void {
    this.podcasts = this.podcasts.filter(podcast => podcast.id !== id);
  }

  /**
   * Searches podcasts by a query string
   * 
   * @param query - The search query to match against podcast fields
   * @returns Array of podcasts matching the search query
   */
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
