
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
    floorPlan: false,
    menus: false,
    pinterbest: false,
    photos: false,
    playlists: false,
    talkshows: true,
    podcasts: true,
    requests: true,
    miniSite: false,
    stats: true,
    recommendations: true,
    gamification: true,
    training: false,
    partnerTypes: true,
    subscriptions: true,
    mlm: true,
    venues: true,
    weddingPackages: true,
    ratings: true,
    presentations: true,
  },
  setFeature: (feature, value) => set((state) => ({
    features: { ...state.features, [feature]: value }
  })),
}));
