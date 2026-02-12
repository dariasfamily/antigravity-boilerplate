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
            ag_agent_registry: {
                Row: {
                    allowed_phases: Database["public"]["Enums"]["ag_session_phase"][]
                    config_schema: Json | null
                    created_at: string | null
                    id: string
                    l6_compliant: boolean | null
                    layer: Database["public"]["Enums"]["ag_layer_type"] | null
                    name: string
                    parent_id: string | null
                    role_description: string | null
                    version: string
                }
                Insert: {
                    allowed_phases: Database["public"]["Enums"]["ag_session_phase"][]
                    config_schema?: Json | null
                    created_at?: string | null
                    id: string
                    l6_compliant?: boolean | null
                    layer?: Database["public"]["Enums"]["ag_layer_type"] | null
                    name: string
                    parent_id?: string | null
                    role_description?: string | null
                    version: string
                }
                Update: {
                    allowed_phases?: Database["public"]["Enums"]["ag_session_phase"][]
                    config_schema?: Json | null
                    created_at?: string | null
                    id?: string
                    l6_compliant?: boolean | null
                    layer?: Database["public"]["Enums"]["ag_layer_type"] | null
                    name?: string
                    parent_id?: string | null
                    role_description?: string | null
                    version?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "ag_agent_registry_parent_id_fkey"
                        columns: ["parent_id"]
                        isOneToOne: false
                        referencedRelation: "ag_agent_registry"
                        referencedColumns: ["id"]
                    }
                ]
            }
            ag_atomic_strings: {
                Row: {
                    agent_id: string
                    id: number
                    is_active: boolean | null
                    last_audit: string | null
                    rule_content: string | null
                    string_code: string
                    string_name: string | null
                }
                Insert: {
                    agent_id: string
                    id?: never
                    is_active?: boolean | null
                    last_audit?: string | null
                    rule_content?: string | null
                    string_code: string
                    string_name?: string | null
                }
                Update: {
                    agent_id?: string
                    id?: never
                    is_active?: boolean | null
                    last_audit?: string | null
                    rule_content?: string | null
                    string_code?: string
                    string_name?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "ag_atomic_strings_agent_id_fkey"
                        columns: ["agent_id"]
                        isOneToOne: false
                        referencedRelation: "ag_agent_registry"
                        referencedColumns: ["id"]
                    }
                ]
            }
            // ... (Other tables omitted for brevity as they were not modified in the migration)
        }
        Enums: {
            ag_layer_type: "CORE" | "MULTIMEDIA" | "INFRASTRUCTURE" | "SOUL"
            ag_session_phase:
            | "PLANNING"
            | "RESEARCH"
            | "SCRIPTING"
            | "PRODUCTION"
            | "AUDIT"
            | "PUBLISHING"
            ag_agent_status: "IDLE" | "ACTIVE" | "PAUSED" | "ERROR" | "SLEEPING"
        }
    }
}
