
import { lazy } from 'react';

// Lazy load the Google Maps component
export const GoogleMap = lazy(() => 
  import("@/components/venues/map/GoogleMapComponent" /* webpackChunkName: "google-maps" */)
);

// Re-export other map-related utilities
export * from './types';
export * from './utils';
