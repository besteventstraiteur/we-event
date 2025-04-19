
import { lazy } from 'react';

// Lazy load the Google Maps component
export const GoogleMap = lazy(() => 
  import("@/components/venues/map/GoogleMapComponent" /* webpackChunkName: "google-maps" */)
);
