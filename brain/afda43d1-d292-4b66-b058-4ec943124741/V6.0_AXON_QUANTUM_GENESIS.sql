-- 🧠 AXON SYSTEM: V6.0 QUANTUM GENESIS
-- Migration Type: UPGRADE (Safe)
-- Target: Supabase (PostgreSQL 15+)
-- Based on: SUPABASE_SCHEMA_MAESTRO.md

BEGIN;

-- =================================================================
-- 1. EVOLVE REGISTRY (Support Sub-Agents & Layers)
-- =================================================================

-- Add Layer Enum if not exists
DO $$ BEGIN
    CREATE TYPE ag_layer_type AS ENUM ('CORE', 'MULTIMEDIA', 'INFRASTRUCTURE', 'SOUL');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Add Columns to Registry
ALTER TABLE ag_agent_registry 
ADD COLUMN IF NOT EXISTS layer ag_layer_type DEFAULT 'CORE',
ADD COLUMN IF NOT EXISTS parent_id text REFERENCES ag_agent_registry(id),
ADD COLUMN IF NOT EXISTS l6_compliant boolean DEFAULT false;

-- =================================================================
-- 2. CREATE ATOMIC STRINGS (The DNA Table)
-- =================================================================

CREATE TABLE IF NOT EXISTS ag_atomic_strings (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    agent_id text REFERENCES ag_agent_registry(id) NOT NULL,
    string_code text NOT NULL, -- "ID-01", "ID-15"
    string_name text, -- "Mimetismo", "Cronos"
    rule_content text, -- The actual rule text
    
    is_active boolean DEFAULT true,
    last_audit timestamptz DEFAULT now(),
    
    UNIQUE(agent_id, string_code) -- One string type per agent
);

ALTER TABLE ag_atomic_strings ENABLE ROW LEVEL SECURITY;

-- Policy (Inherit from Registry)
DROP POLICY IF EXISTS "Public Read Strings" ON ag_atomic_strings;
CREATE POLICY "Public Read Strings" ON ag_atomic_strings FOR SELECT TO authenticated USING (true);


-- =================================================================
-- 3. SEED L-6 AGENTS (The 11 Champions)
-- =================================================================

-- Core Squad
INSERT INTO ag_agent_registry (id, name, version, layer, allowed_phases, l6_compliant) VALUES
('EGERIA_V1', 'Egeria', '1.2.0', 'CORE', ARRAY['PLANNING', 'AUDIT']::ag_session_phase[], true),
('PULSAR_V1', 'Pulsar', '1.2.0', 'CORE', ARRAY['RESEARCH', 'SCRIPTING']::ag_session_phase[], true),
('ORION_V1',  'Orion',  '1.2.0', 'CORE', ARRAY['PLANNING', 'RESEARCH']::ag_session_phase[], true),
('CALLIOPE_V1','Calliope','1.2.0','CORE', ARRAY['SCRIPTING', 'PRODUCTION']::ag_session_phase[], true),
('ARGUS_V1',  'Argus',  '1.2.0', 'CORE', ARRAY['AUDIT']::ag_session_phase[], true)
ON CONFLICT (id) DO UPDATE SET l6_compliant = true, layer = 'CORE';

-- Multimedia Studio
INSERT INTO ag_agent_registry (id, name, version, layer, allowed_phases, l6_compliant) VALUES
('APOLLO_V1', 'Apollo', '1.2.0', 'MULTIMEDIA', ARRAY['PRODUCTION']::ag_session_phase[], true),
('THALIA_V1', 'Thalia', '1.2.0', 'MULTIMEDIA', ARRAY['PRODUCTION']::ag_session_phase[], true)
ON CONFLICT (id) DO UPDATE SET l6_compliant = true, layer = 'MULTIMEDIA';

-- Sub-Agents (Linked to Thalia)
INSERT INTO ag_agent_registry (id, name, version, layer, parent_id, allowed_phases, l6_compliant) VALUES
('PIXEL_V1', 'Pixel', '1.2.0', 'MULTIMEDIA', 'THALIA_V1', ARRAY['PRODUCTION']::ag_session_phase[], true),
('FRAME_V1', 'Frame', '1.2.0', 'MULTIMEDIA', 'THALIA_V1', ARRAY['PRODUCTION']::ag_session_phase[], true)
ON CONFLICT (id) DO UPDATE SET parent_id = 'THALIA_V1', l6_compliant = true;

-- Infrastructure
INSERT INTO ag_agent_registry (id, name, version, layer, allowed_phases, l6_compliant) VALUES
('HEPHAESTUS_V1','Hephaestus','1.2.0','INFRASTRUCTURE', ARRAY['PRODUCTION']::ag_session_phase[], true),
('TIRESIAS_V1',  'Tiresias',  '1.2.0', 'INFRASTRUCTURE', ARRAY['RESEARCH', 'PUBLISHING']::ag_session_phase[], true),
('NEXUS_V1',     'Nexus',     '1.2.0', 'INFRASTRUCTURE', ARRAY['PUBLISHING']::ag_session_phase[], true)
ON CONFLICT (id) DO UPDATE SET l6_compliant = true, layer = 'INFRASTRUCTURE';

-- Soul
INSERT INTO ag_agent_registry (id, name, version, layer, allowed_phases, l6_compliant) VALUES
('LYRA_V1', 'Lyra', '1.2.0', 'SOUL', ARRAY['PLANNING', 'AUDIT', 'PUBLISHING']::ag_session_phase[], true)
ON CONFLICT (id) DO UPDATE SET l6_compliant = true, layer = 'SOUL';

COMMIT;
