
import { useState } from "react";
import { Talkshow } from "@/models/talkshow";

/**
 * Hook personnalisé pour gérer la lecture des talkshows
 * 
 * @returns Objet contenant l'état et les fonctions du lecteur de talkshow
 */
export const useTalkshowPlayer = () => {
  /** Talkshow actuellement sélectionné pour la lecture */
  const [currentTalkshow, setCurrentTalkshow] = useState<Talkshow | null>(null);
  /** Si le talkshow est en cours de lecture */
  const [isPlaying, setIsPlaying] = useState(false);

  /**
   * Active/désactive la lecture d'un talkshow
   * 
   * @param talkshow - Le talkshow à lire ou mettre en pause
   */
  const togglePlay = (talkshow: Talkshow) => {
    if (currentTalkshow && currentTalkshow.id === talkshow.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTalkshow(talkshow);
      setIsPlaying(true);
    }
  };

  return {
    currentTalkshow,
    isPlaying,
    togglePlay,
    setIsPlaying
  };
};
