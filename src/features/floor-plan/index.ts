
import { lazy } from 'react';

// Lazy load the floor planner component
export const FloorPlanner = lazy(() => 
  import("@/components/floor-planner/FloorPlanner" /* webpackChunkName: "floor-planner" */)
);

// Re-export types and utilities
export * from './types';
export * from './utils';
