export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      game_plans: {
        Row: {
          ai_generated_plan: string | null
          created_at: string
          id: number
          match_details: Json | null
          opponent_plan: Json | null
          tactics: Json | null
          team_analysis: Json | null
          user_id: string
        }
        Insert: {
          ai_generated_plan?: string | null
          created_at?: string
          id?: number
          match_details?: Json | null
          opponent_plan?: Json | null
          tactics?: Json | null
          team_analysis?: Json | null
          user_id: string
        }
        Update: {
          ai_generated_plan?: string | null
          created_at?: string
          id?: number
          match_details?: Json | null
          opponent_plan?: Json | null
          tactics?: Json | null
          team_analysis?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      lesson_plans: {
        Row: {
          assessment: string
          created_at: string
          grade: string
          id: string
          materials: string[]
          objectives: string[]
          procedure: string[]
          subject: string
          title: string
          user_id: string
        }
        Insert: {
          assessment: string
          created_at?: string
          grade: string
          id?: string
          materials: string[]
          objectives: string[]
          procedure: string[]
          subject: string
          title: string
          user_id: string
        }
        Update: {
          assessment?: string
          created_at?: string
          grade?: string
          id?: string
          materials?: string[]
          objectives?: string[]
          procedure?: string[]
          subject?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      matches: {
        Row: {
          away_team: string
          competition: string
          data: Json
          date: string
          home_team: string
          id: string
          match_id: number
          season: string
        }
        Insert: {
          away_team: string
          competition: string
          data: Json
          date: string
          home_team: string
          id?: string
          match_id: number
          season: string
        }
        Update: {
          away_team?: string
          competition?: string
          data?: Json
          date?: string
          home_team?: string
          id?: string
          match_id?: number
          season?: string
        }
        Relationships: []
      }
      moses: {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      opponent_analyses: {
        Row: {
          created_at: string
          id: number
          key_players: string | null
          recent_form: string | null
          strengths: string | null
          style: string | null
          user_id: string
          weaknesses: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          key_players?: string | null
          recent_form?: string | null
          strengths?: string | null
          style?: string | null
          user_id: string
          weaknesses?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          key_players?: string | null
          recent_form?: string | null
          strengths?: string | null
          style?: string | null
          user_id?: string
          weaknesses?: string | null
        }
        Relationships: []
      }
      opposition_analysis: {
        Row: {
          created_at: string
          id: number
          key_players: Json | null
          match_details: Json | null
          opponent_analysis: Json | null
        }
        Insert: {
          created_at?: string
          id?: number
          key_players?: Json | null
          match_details?: Json | null
          opponent_analysis?: Json | null
        }
        Update: {
          created_at?: string
          id?: number
          key_players?: Json | null
          match_details?: Json | null
          opponent_analysis?: Json | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
        }
        Insert: {
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
        }
        Update: {
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
        }
        Relationships: []
      }
      tactical_advice: {
        Row: {
          advice: string
          coach: string
          created_at: string
          formation: string
          id: number
          play_style: string
          question: string
          team_mentality: string
        }
        Insert: {
          advice: string
          coach: string
          created_at?: string
          formation: string
          id?: number
          play_style: string
          question: string
          team_mentality: string
        }
        Update: {
          advice?: string
          coach?: string
          created_at?: string
          formation?: string
          id?: number
          play_style?: string
          question?: string
          team_mentality?: string
        }
        Relationships: []
      }
      tactical_guidelines: {
        Row: {
          category: string
          content: string
          created_at: string | null
          formation: string | null
          id: number
          play_style: string | null
          title: string
        }
        Insert: {
          category: string
          content: string
          created_at?: string | null
          formation?: string | null
          id?: number
          play_style?: string | null
          title: string
        }
        Update: {
          category?: string
          content?: string
          created_at?: string | null
          formation?: string | null
          id?: number
          play_style?: string | null
          title?: string
        }
        Relationships: []
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
