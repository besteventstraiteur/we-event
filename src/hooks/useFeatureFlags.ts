
import { create } from 'zustand';

interface FeatureFlagsState {
  features: {
    guests: boolean;
    floorPlan: boolean;
    menus: boolean;
    pinterbest: boolean;
    photos: boolean;
    playlists: boolean;
    talkshows: boolean;
    podcasts: boolean;
    requests: boolean;
    miniSite: boolean;
    stats: boolean;
    recommendations: boolean;
    gamification: boolean;
    training: boolean;
    partnerTypes: boolean;
    subscriptions: boolean;
    mlm: boolean;
    venues: boolean;
    weddingPackages: boolean;
    ratings: boolean;
    presentations: boolean;
  };
  setFeature: (feature: keyof FeatureFlagsState['features'], value: boolean) => void;
}

export const useFeatureFlags = create<FeatureFlagsState>((set) => ({
  features: {
    guests: true,
    floorPlan: true, // Activé pour les plans de salle
    menus: true, // Activé pour les menus
    pinterbest: false,
    photos: true, // Activé pour les photos
    playlists: true, // Activé pour les playlists
    talkshows: true,
    podcasts: true,
    requests: true,
    miniSite: true, // Activé pour les mini-sites
    stats: true,
    recommendations: true,
    gamification: true,
    training: true,
    partnerTypes: true,
    subscriptions: true,
    mlm: true, // Activé pour le MLM
    venues: true, // Activé pour les lieux
    weddingPackages: true, // Activé pour les packages mariage
    ratings: true, // Activé pour les avis
    presentations: true, // Activé pour les présentations
  },
  setFeature: (feature, value) => set((state) => ({
    features: { ...state.features, [feature]: value }
  })),
}));
