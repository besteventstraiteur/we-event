
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface FeatureFlags {
  photos: boolean;
  playlists: boolean;
  menus: boolean;
  guests: boolean;
  floorPlan: boolean;
  pinterbest: boolean;
  requests: boolean;
  miniSite: boolean;
  talkshows: boolean;
  podcasts: boolean;
}

interface FeatureFlagsStore {
  features: FeatureFlags;
  toggleFeature: (feature: keyof FeatureFlags) => void;
  setFeatures: (features: Partial<FeatureFlags>) => void;
}

export const useFeatureFlags = create<FeatureFlagsStore>()(
  persist(
    (set) => ({
      features: {
        photos: true,
        playlists: true,
        menus: true,
        guests: true,
        floorPlan: true,
        pinterbest: true,
        requests: true,
        miniSite: true,
        talkshows: true,
        podcasts: true,
      },
      toggleFeature: (feature) =>
        set((state) => ({
          features: {
            ...state.features,
            [feature]: !state.features[feature],
          },
        })),
      setFeatures: (newFeatures) =>
        set((state) => ({
          features: {
            ...state.features,
            ...newFeatures,
          },
        })),
    }),
    {
      name: 'feature-flags-storage',
    }
  )
);
