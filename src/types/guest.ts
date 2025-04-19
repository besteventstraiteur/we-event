
export interface Guest {
  id: string;
  event_id: string;
  token: string;
  email: string | null;
  first_name: string;
  last_name: string;
  rsvp_status: 'pending' | 'confirmed' | 'declined';
  menu_choice: string | null;
  plus_one: boolean;
  dietary_restrictions: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}
