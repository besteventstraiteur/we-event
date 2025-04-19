
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase-db';

const supabase = createClient<Database>(
  "https://awraiakbiahrzncoeyya.supabase.co", 
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3cmFpYWtiaWFocnpuY29leXlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1MjYwOTUsImV4cCI6MjA2MDEwMjA5NX0.8da1AC1m6DDwrLbRPlYZ9KHx89pE4xtw2AkTQFbciys",
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
      storage: {
        getItem: key => {
          if (key === 'weddingPlannerEmail' || key === 'weddingPlannerRememberMe') {
            return localStorage.getItem(key);
          }
          return null;
        },
        setItem: (key, value) => {
          if (key === 'weddingPlannerEmail' || key === 'weddingPlannerRememberMe') {
            localStorage.setItem(key, value);
          }
        },
        removeItem: key => {
          if (key === 'weddingPlannerEmail' || key === 'weddingPlannerRememberMe') {
            localStorage.removeItem(key);
          }
        }
      }
    }
  }
);

export { supabase };
