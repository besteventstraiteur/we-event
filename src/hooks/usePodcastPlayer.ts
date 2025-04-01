
import { useState } from "react";
import { Podcast } from "@/models/podcast";

export const usePodcastPlayer = () => {
  const [currentPodcast, setCurrentPodcast] = useState<Podcast | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

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
