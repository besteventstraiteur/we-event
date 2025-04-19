
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
    talkshows: false,
    podcasts: false,
    requests: true,
    miniSite: false,
    stats: false,
    recommendations: false,
    gamification: false,
    training: false,
    partnerTypes: false,
    subscriptions: false,
    mlm: false,
    venues: false,
    weddingPackages: false,
    ratings: false,
    presentations: false,
  },
  setFeature: (feature, value) => set((state) => ({
    features: { ...state.features, [feature]: value }
  })),
}));
