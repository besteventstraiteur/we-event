// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://awraiakbiahrzncoeyya.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3cmFpYWtiaWFocnpuY29leXlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1MjYwOTUsImV4cCI6MjA2MDEwMjA5NX0.8da1AC1m6DDwrLbRPlYZ9KHx89pE4xtw2AkTQFbciys";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);