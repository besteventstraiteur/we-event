
export interface Podcast {
  id: number;
  title: string;
  description: string;
  category: string;
  duration: string;
  date: string;
  status: "approved" | "pending" | "rejected";
  views: number;
  imageUrl: string;
  audioUrl: string;
}

export interface NewPodcast {
  title: string;
  description: string;
  category: string;
  audioFile: File | null;
  imageFile: File | null;
}
