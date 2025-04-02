
export interface Song {
  id: string;
  title: string;
  artist: string;
  duration: number; // en secondes
  audioUrl: string;
  imageUrl?: string;
  addedBy: "client" | "dj";
  addedAt: Date;
}

export interface Playlist {
  id: string;
  name: string;
  eventType: "wedding" | "birthday" | "corporate" | "other";
  moment: "entrance" | "first_dance" | "cake_cutting" | "party" | "closing" | "other";
  description?: string;
  clientId: string;
  djId: string;
  songs: Song[];
  createdAt: Date;
  updatedAt: Date;
}

export interface NewSong {
  title: string;
  artist: string;
  duration?: number;
  audioUrl?: string;
  imageUrl?: string;
}
