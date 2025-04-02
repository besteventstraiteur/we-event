
import { Playlist, Song, NewSong } from "@/models/playlist";

// Données fictives pour les playlists
const mockPlaylists: Playlist[] = [
  {
    id: "pl-1",
    name: "Playlist Mariage - Entrée & Premier Danse",
    eventType: "wedding",
    moment: "entrance",
    description: "Morceaux pour l'entrée des mariés et leur première danse",
    clientId: "client-1",
    djId: "dj-1",
    songs: [
      {
        id: "song-1",
        title: "Perfect",
        artist: "Ed Sheeran",
        duration: 263,
        audioUrl: "https://example.com/perfect.mp3",
        imageUrl: "https://example.com/perfect.jpg",
        addedBy: "dj",
        addedAt: new Date("2023-10-15")
      },
      {
        id: "song-2",
        title: "All of Me",
        artist: "John Legend",
        duration: 248,
        audioUrl: "https://example.com/allofme.mp3",
        imageUrl: "https://example.com/allofme.jpg",
        addedBy: "dj",
        addedAt: new Date("2023-10-15")
      },
      {
        id: "song-3",
        title: "Can't Help Falling in Love",
        artist: "Elvis Presley",
        duration: 182,
        audioUrl: "https://example.com/canthelpfallinginlove.mp3",
        imageUrl: "https://example.com/elvis.jpg",
        addedBy: "client",
        addedAt: new Date("2023-10-18")
      }
    ],
    createdAt: new Date("2023-10-15"),
    updatedAt: new Date("2023-10-18")
  },
  {
    id: "pl-2",
    name: "Playlist Mariage - Soirée Dansante",
    eventType: "wedding",
    moment: "party",
    description: "Sélection pour la partie dansante de la soirée",
    clientId: "client-1",
    djId: "dj-1",
    songs: [
      {
        id: "song-4",
        title: "Uptown Funk",
        artist: "Mark Ronson ft. Bruno Mars",
        duration: 270,
        audioUrl: "https://example.com/uptownfunk.mp3",
        imageUrl: "https://example.com/uptownfunk.jpg",
        addedBy: "dj",
        addedAt: new Date("2023-10-15")
      },
      {
        id: "song-5",
        title: "I Gotta Feeling",
        artist: "Black Eyed Peas",
        duration: 289,
        audioUrl: "https://example.com/igottafeeling.mp3",
        imageUrl: "https://example.com/igottafeeling.jpg",
        addedBy: "dj",
        addedAt: new Date("2023-10-15")
      }
    ],
    createdAt: new Date("2023-10-15"),
    updatedAt: new Date("2023-10-15")
  }
];

export class PlaylistRepository {
  private static instance: PlaylistRepository;
  private playlists: Playlist[];

  private constructor() {
    // Initialiser avec des données fictives
    this.playlists = [...mockPlaylists];
  }

  public static getInstance(): PlaylistRepository {
    if (!PlaylistRepository.instance) {
      PlaylistRepository.instance = new PlaylistRepository();
    }
    return PlaylistRepository.instance;
  }

  public getAllPlaylists(): Playlist[] {
    return this.playlists;
  }

  public getPlaylistsByClient(clientId: string): Playlist[] {
    return this.playlists.filter(playlist => playlist.clientId === clientId);
  }

  public getPlaylistsByDj(djId: string): Playlist[] {
    return this.playlists.filter(playlist => playlist.djId === djId);
  }

  public getPlaylistById(id: string): Playlist | undefined {
    return this.playlists.find(playlist => playlist.id === id);
  }

  public createPlaylist(playlist: Omit<Playlist, 'id' | 'createdAt' | 'updatedAt'>): Playlist {
    const newPlaylist: Playlist = {
      ...playlist,
      id: `pl-${this.playlists.length + 1}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.playlists.push(newPlaylist);
    return newPlaylist;
  }

  public updatePlaylist(id: string, playlist: Partial<Playlist>): Playlist | undefined {
    const index = this.playlists.findIndex(p => p.id === id);
    if (index === -1) return undefined;

    const updatedPlaylist = {
      ...this.playlists[index],
      ...playlist,
      updatedAt: new Date()
    };
    this.playlists[index] = updatedPlaylist;
    return updatedPlaylist;
  }

  public deletePlaylist(id: string): boolean {
    const index = this.playlists.findIndex(playlist => playlist.id === id);
    if (index === -1) return false;
    this.playlists.splice(index, 1);
    return true;
  }

  public addSongToPlaylist(playlistId: string, song: NewSong, addedBy: "client" | "dj"): Song | undefined {
    const playlist = this.getPlaylistById(playlistId);
    if (!playlist) return undefined;

    const newSong: Song = {
      id: `song-${Date.now()}`,
      title: song.title,
      artist: song.artist,
      duration: song.duration || 0,
      audioUrl: song.audioUrl || "",
      imageUrl: song.imageUrl,
      addedBy,
      addedAt: new Date()
    };

    playlist.songs.push(newSong);
    playlist.updatedAt = new Date();
    return newSong;
  }

  public removeSongFromPlaylist(playlistId: string, songId: string): boolean {
    const playlist = this.getPlaylistById(playlistId);
    if (!playlist) return false;

    const songIndex = playlist.songs.findIndex(song => song.id === songId);
    if (songIndex === -1) return false;

    playlist.songs.splice(songIndex, 1);
    playlist.updatedAt = new Date();
    return true;
  }

  public searchPlaylists(query: string): Playlist[] {
    if (!query) return this.playlists;
    
    const lowercaseQuery = query.toLowerCase();
    return this.playlists.filter(playlist => 
      playlist.name.toLowerCase().includes(lowercaseQuery) || 
      playlist.description?.toLowerCase().includes(lowercaseQuery) ||
      playlist.songs.some(song => 
        song.title.toLowerCase().includes(lowercaseQuery) || 
        song.artist.toLowerCase().includes(lowercaseQuery)
      )
    );
  }
}
