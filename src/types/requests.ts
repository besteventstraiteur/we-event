
export interface ServiceRequest {
  id: string;
  client_id: string;
  category: string;
  title: string;
  description?: string;
  budget?: number;
  deadline?: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  created_at: string;
  updated_at: string;
}

export interface RequestMessage {
  id: string;
  request_id: string;
  sender_id: string;
  content: string;
  created_at: string;
}

export interface RequestPartner {
  id: string;
  request_id: string;
  partner_id: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
}
