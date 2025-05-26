
export interface ServiceRequest {
  id: string;
  title: string;
  description: string;
  category: string;
  budget: number;
  deadline: string;
  status: 'pending' | 'completed' | 'accepted' | 'rejected';
  client_id: string;
  created_at: string;
  updated_at: string;
  request_messages?: Array<{
    id: string;
    content: string;
    sender_id: string;
    created_at: string;
  }>;
}

export interface Guest {
  id: string;
  event_id: string;
  first_name: string;
  last_name: string;
  email: string;
  rsvp_status: 'pending' | 'confirmed' | 'declined';
  menu_choice: string;
  dietary_restrictions: string;
  notes: string;
  plus_one: boolean;
  token: string;
  created_at: string;
  updated_at: string;
}
