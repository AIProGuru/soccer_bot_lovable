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
      opponent_analyses: {
        Row: {
          competition: string | null
          created_at: string
          formation: string | null
          id: number
          key_players: string | null
          opponentName: string | null
          playStyle: string | null
          recent_form: string | null
          strengths: string | null
          style: string | null
          user_id: string | null
          venue: string | null
          weaknesses: string | null
        }
        Insert: {
          competition?: string | null
          created_at?: string
          formation?: string | null
          id?: number
          key_players?: string | null
          opponentName?: string | null
          playStyle?: string | null
          recent_form?: string | null
          strengths?: string | null
          style?: string | null
          user_id?: string | null
          venue?: string | null
          weaknesses?: string | null
        }
        Update: {
          competition?: string | null
          created_at?: string
          formation?: string | null
          id?: number
          key_players?: string | null
          opponentName?: string | null
          playStyle?: string | null
          recent_form?: string | null
          strengths?: string | null
          style?: string | null
          user_id?: string | null
          venue?: string | null
          weaknesses?: string | null
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          created_at: string
          id: string
          stripe_customer_id: string | null
          subscription_end: string | null
          subscription_tier: Database["public"]["Enums"]["subscription_tier"]
          trial_end: string | null
          trial_start: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          stripe_customer_id?: string | null
          subscription_end?: string | null
          subscription_tier?: Database["public"]["Enums"]["subscription_tier"]
          trial_end?: string | null
          trial_start?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          stripe_customer_id?: string | null
          subscription_end?: string | null
          subscription_tier?: Database["public"]["Enums"]["subscription_tier"]
          trial_end?: string | null
          trial_start?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      training_sessions: {
        Row: {
          age_group: string | null
          ai_generated_plan: string | null
          created_at: string
          drill_diagram: string | null
          drill_name: string | null
          duration: number | null
          id: number
          is_favorite: boolean | null
          notes: string | null
          physical_intensity: string | null
          player_count: number | null
          tags: string | null
          training_focus: string | null
          training_style: string | null
          user_id: string
        }
        Insert: {
          age_group?: string | null
          ai_generated_plan?: string | null
          created_at?: string
          drill_diagram?: string | null
          drill_name?: string | null
          duration?: number | null
          id?: number
          is_favorite?: boolean | null
          notes?: string | null
          physical_intensity?: string | null
          player_count?: number | null
          tags?: string | null
          training_focus?: string | null
          training_style?: string | null
          user_id: string
        }
        Update: {
          age_group?: string | null
          ai_generated_plan?: string | null
          created_at?: string
          drill_diagram?: string | null
          drill_name?: string | null
          duration?: number | null
          id?: number
          is_favorite?: boolean | null
          notes?: string | null
          physical_intensity?: string | null
          player_count?: number | null
          tags?: string | null
          training_focus?: string | null
          training_style?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_profile: {
        Row: {
          assistant_id: string | null
          created_at: string
          id: number
          subscription_tier:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          thread_id: string | null
          user_id: string | null
        }
        Insert: {
          assistant_id?: string | null
          created_at?: string
          id?: number
          subscription_tier?:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          thread_id?: string | null
          user_id?: string | null
        }
        Update: {
          assistant_id?: string | null
          created_at?: string
          id?: number
          subscription_tier?:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          thread_id?: string | null
          user_id?: string | null
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
      subscription_tier: "starter" | "pro" | "elite"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      subscription_tier: ["starter", "pro", "elite"],
    },
  },
} as const
