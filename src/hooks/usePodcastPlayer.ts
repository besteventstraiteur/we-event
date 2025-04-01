
import { useState } from "react";
import { Podcast } from "@/models/podcast";

/**
 * Custom hook for managing podcast playback state
 * 
 * @returns Object containing podcast player state and functions
 */
export const usePodcastPlayer = () => {
  /** Currently selected podcast for playback */
  const [currentPodcast, setCurrentPodcast] = useState<Podcast | null>(null);
  /** Whether the podcast is currently playing */
  const [isPlaying, setIsPlaying] = useState(false);

  /**
   * Toggles play/pause state for a podcast
   * 
   * @param podcast - The podcast to play or pause
   */
  const togglePlay = (podcast: Podcast) => {
    if (currentPodcast && currentPodcast.id === podcast.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentPodcast(podcast);
      setIsPlaying(true);
    }
  };

  return {
    currentPodcast,
    isPlaying,
    togglePlay,
    setIsPlaying
  };
};
