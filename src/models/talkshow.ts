
/**
 * Représente un talkshow vidéo dans le système
 * @interface Talkshow
 */
export interface Talkshow {
  /** Identifiant unique du talkshow */
  id: number;
  /** Titre du talkshow */
  title: string;
  /** Description détaillée du contenu du talkshow */
  description: string;
  /** Catégorie à laquelle appartient le talkshow */
  category: string;
  /** Durée du talkshow au format MM:SS */
  duration: string;
  /** Date de publication au format YYYY-MM-DD */
  date: string;
  /** Statut d'approbation actuel du talkshow */
  status: "approved" | "pending" | "rejected";
  /** Nombre de vues du talkshow */
  views: number;
  /** URL vers l'image de couverture du talkshow */
  imageUrl: string;
  /** URL vers le fichier vidéo du talkshow */
  videoUrl: string;
  /** Hôte ou présentateur du talkshow */
  host: string;
  /** Invités participant au talkshow */
  guests: string[];
}

/**
 * Représente les données pour créer un nouveau talkshow
 * @interface NewTalkshow
 */
export interface NewTalkshow {
  /** Titre du nouveau talkshow */
  title: string;
  /** Description détaillée du contenu du nouveau talkshow */
  description: string;
  /** Catégorie à laquelle appartient le nouveau talkshow */
  category: string;
  /** Fichier vidéo pour le talkshow */
  videoFile: File | null;
  /** Fichier image de couverture pour le talkshow */
  imageFile: File | null;
  /** Hôte ou présentateur du talkshow */
  host: string;
  /** Invités participant au talkshow (séparés par des virgules) */
  guests: string;
}
