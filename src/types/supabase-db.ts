
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      partners: {
        Row: {
          id: string
          user_id: string
          name: string
          category: string
          description: string | null
          short_description: string | null
          pricing: Json | null
          contact: Json | null
          discount: string | null
          services: string[] | null
          availability: string[] | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          category: string
          description?: string | null
          short_description?: string | null
          pricing?: Json | null
          contact?: Json | null
          discount?: string | null
          services?: string[] | null
          availability?: string[] | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          category?: string
          description?: string | null
          short_description?: string | null
          pricing?: Json | null
          contact?: Json | null
          discount?: string | null
          services?: string[] | null
          availability?: string[] | null
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      partner_images: {
        Row: {
          id: string
          partner_id: string
          url: string
          alt: string | null
          type: string
          order_index: number | null
          featured: boolean
          created_at: string
        }
        Insert: {
          id?: string
          partner_id: string
          url: string
          alt?: string | null
          type: string
          order_index?: number | null
          featured?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          partner_id?: string
          url?: string
          alt?: string | null
          type?: string
          order_index?: number | null
          featured?: boolean
          created_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          email: string
          name: string | null
          avatar_url: string | null
          role: string
          partner_type: string | null
          phone: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name?: string | null
          avatar_url?: string | null
          role?: string
          partner_type?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          avatar_url?: string | null
          role?: string
          partner_type?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      talkshows: {
        Row: {
          id: string
          partner_id: string | null
          title: string
          description: string | null
          category: string
          duration: string | null
          date: string
          status: string | null
          views: number | null
          image_url: string | null
          video_url: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          partner_id?: string | null
          title: string
          description?: string | null
          category: string
          duration?: string | null
          date: string
          status?: string | null
          views?: number | null
          image_url?: string | null
          video_url: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          partner_id?: string | null
          title?: string
          description?: string | null
          category?: string
          duration?: string | null
          date?: string
          status?: string | null
          views?: number | null
          image_url?: string | null
          video_url?: string
          created_at?: string
          updated_at?: string
        }
      }
      podcasts: {
        Row: {
          id: string
          partner_id: string | null
          title: string
          description: string | null
          category: string
          duration: string | null
          date: string
          status: string | null
          views: number | null
          image_url: string | null
          audio_url: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          partner_id?: string | null
          title: string
          description?: string | null
          category: string
          duration?: string | null
          date: string
          status?: string | null
          views?: number | null
          image_url?: string | null
          audio_url: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          partner_id?: string | null
          title?: string
          description?: string | null
          category?: string
          duration?: string | null
          date?: string
          status?: string | null
          views?: number | null
          image_url?: string | null
          audio_url?: string
          created_at?: string
          updated_at?: string
        }
      }
      ratings: {
        Row: {
          id: string
          partner_id: string
          client_id: string | null
          score: number
          comment: string | null
          response: string | null
          date: string
          status: string | null
          categories: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          partner_id: string
          client_id?: string | null
          score: number
          comment?: string | null
          response?: string | null
          date?: string
          status?: string | null
          categories?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          partner_id?: string
          client_id?: string | null
          score?: number
          comment?: string | null
          response?: string | null
          date?: string
          status?: string | null
          categories?: Json | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
