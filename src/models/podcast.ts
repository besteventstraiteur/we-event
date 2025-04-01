
/**
 * Represents a podcast in the system
 * @interface Podcast
 */
export interface Podcast {
  /** Unique identifier for the podcast */
  id: number;
  /** Title of the podcast */
  title: string;
  /** Detailed description of the podcast content */
  description: string;
  /** Category the podcast belongs to (e.g., Mariage, Entreprise) */
  category: string;
  /** Duration of the podcast in MM:SS format */
  duration: string;
  /** Publication date in YYYY-MM-DD format */
  date: string;
  /** Current approval status of the podcast */
  status: "approved" | "pending" | "rejected";
  /** Number of times the podcast has been viewed/played */
  views: number;
  /** URL to the podcast cover image */
  imageUrl: string;
  /** URL to the podcast audio file */
  audioUrl: string;
}

/**
 * Represents data for creating a new podcast
 * @interface NewPodcast
 */
export interface NewPodcast {
  /** Title of the new podcast */
  title: string;
  /** Detailed description of the new podcast content */
  description: string;
  /** Category the new podcast belongs to */
  category: string;
  /** Audio file for the podcast */
  audioFile: File | null;
  /** Cover image file for the podcast */
  imageFile: File | null;
}
