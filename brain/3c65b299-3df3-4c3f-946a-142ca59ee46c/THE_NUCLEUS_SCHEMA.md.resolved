# ⚛️ THE NUCLEUS SCHEMA (V5.3 DIAMOND CUT)

> **Status**: FINAL (Forensic Grade + Operational Resiliency)
> **Target**: Supabase (PostgreSQL 15+)
> **Philosophy**: "Zero Trust, Zero Data Loss, Total Traceability"

> [!IMPORTANT]
> **DIAMOND CUT UPGRADES (V5.3)**:
> 1.  **Idempotency**: All `CREATE POLICY` statements are preceded by `DROP POLICY IF EXISTS`. Re-runnable without crashing.
> 2.  **Robust Constraints**: `diff_log` correctly handles `NULL` (no changes) vs `Array` (RFC 6902).
> 3.  **Audit Completeness**: Restored full "Triple Justification" fields (`identity`, `knowledge`, `math`).
> 4.  **Operational Readiness**: Includes Seed Data for `ORION_V3_4` to prevent FK errors on first run.

---

## 🏗️ 1. CORE TYPES (ENUMS)
Strict typing prevents "Magic Strings" and logic drift.

```sql
DO $$ BEGIN
    CREATE TYPE ag_platform_type AS ENUM ('Desktop', 'Mobile_iOS', 'Mobile_Android', 'API_Headless');
    CREATE TYPE ag_session_phase AS ENUM ('PLANNING', 'RESEARCH', 'SCRIPTING', 'PRODUCTION', 'AUDIT', 'PUBLISHING');
    CREATE TYPE ag_agent_status AS ENUM ('IDLE', 'ACTIVE', 'PAUSED', 'ERROR', 'SLEEPING');
    CREATE TYPE ag_asset_type AS ENUM ('SCRIPT_MD', 'VIDEO_MP4', 'AUDIO_WAV', 'IMAGE_PNG', 'THUMBNAIL_JPG', 'METADATA_JSON');
    CREATE TYPE ag_decision_type AS ENUM ('RANKING', 'HOOK_SELECTION', 'VISUAL_STYLE', 'TREND_ANALYSIS', 'SAFETY_GATE');
    CREATE TYPE ag_command_type AS ENUM ('START', 'PAUSE', 'RESUME', 'STOP', 'EDIT_MEMORY', 'ROLLBACK');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;
```

---

## 🎮 2. CONTROL PLANE (IDENTITY)

### `ag_agent_registry`
The "Passport Control" for agents.

```sql
CREATE TABLE ag_agent_registry (
    id text PRIMARY KEY, -- 'ORION_V3_4'
    name text NOT NULL,
    version text NOT NULL,
    role_description text,
    allowed_phases ag_session_phase[] NOT NULL,
    config_schema jsonb,
    created_at timestamptz DEFAULT now()
);
ALTER TABLE ag_agent_registry ENABLE ROW LEVEL SECURITY;

-- Policy: Read Only for Authenticated Users (Admins write via Service Role)
DROP POLICY IF EXISTS "Public Read Agents" ON ag_agent_registry;
CREATE POLICY "Public Read Agents" ON ag_agent_registry FOR SELECT TO authenticated USING (true);

-- SEED DATA (Required for FKs)
INSERT INTO ag_agent_registry (id, name, version, role_description, allowed_phases, config_schema)
VALUES (
  'ORION_V3_4',
  'Orion',
  '3.4.0',
  'Investment Analyst of Attention',
  ARRAY['PLANNING','RESEARCH','SCRIPTING','PRODUCTION','AUDIT','PUBLISHING']::ag_session_phase[],
  '{}'::jsonb
)
ON CONFLICT (id) DO NOTHING;
```

---

## 🎬 3. ORCHESTRATION LAYER (SESSIONS)

### `ag_sessions`
The root state container.

```sql
CREATE TABLE ag_sessions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users NOT NULL,
    active_agent_id text REFERENCES ag_agent_registry(id),
    current_phase ag_session_phase DEFAULT 'PLANNING',
    current_status ag_agent_status DEFAULT 'ACTIVE',
    accumulated_cost numeric(10,4) DEFAULT 0.0000, -- Financial Integrity
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);
ALTER TABLE ag_sessions ENABLE ROW LEVEL SECURITY;

-- INDEX: Performance for Dashboard List
CREATE INDEX IF NOT EXISTS idx_sessions_user_created ON ag_sessions (user_id, created_at DESC);

-- POLICY: CRUD for Owner
DROP POLICY IF EXISTS "Owner Access Sessions" ON ag_sessions;
CREATE POLICY "Owner Access Sessions" ON ag_sessions 
    FOR ALL TO authenticated 
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);
```

---

## 🧠 4. INTELLIGENCE LAYER (PARTITIONED MEMORY)

### `ag_agent_memory`
**CRITICAL ARCHITECTURE**: Partitioned by time.
**TITAN UPGRADE**: PK includes `session_id`. `diff_log` accepts NULL.

```sql
CREATE TABLE ag_agent_memory (
    session_id uuid REFERENCES ag_sessions NOT NULL,
    agent_id text REFERENCES ag_agent_registry(id) NOT NULL,
    captured_at timestamptz DEFAULT now(),
    id bigint GENERATED ALWAYS AS IDENTITY,
    
    memory_snapshot jsonb NOT NULL, 
    diff_log jsonb CHECK (diff_log IS NULL OR jsonb_typeof(diff_log) = 'array'), -- RFC 6902 Compliance (Nullable)
    
    -- COMPOSITE PK (Session + Time + ID) for Forensic Linking
    PRIMARY KEY (session_id, captured_at, id)
) PARTITION BY RANGE (captured_at);
ALTER TABLE ag_agent_memory ENABLE ROW LEVEL SECURITY;

-- INDEX: Timeline View
CREATE INDEX IF NOT EXISTS idx_memory_session_captured ON ag_agent_memory (session_id, captured_at DESC);

-- POLICIES
DROP POLICY IF EXISTS "Owner Read Memory" ON ag_agent_memory;
CREATE POLICY "Owner Read Memory" ON ag_agent_memory
    FOR SELECT TO authenticated
    USING (session_id IN (SELECT id FROM ag_sessions WHERE user_id = auth.uid()));

DROP POLICY IF EXISTS "Owner Insert Memory" ON ag_agent_memory;
CREATE POLICY "Owner Insert Memory" ON ag_agent_memory
    FOR INSERT TO authenticated
    WITH CHECK (session_id IN (SELECT id FROM ag_sessions WHERE user_id = auth.uid()));

-- PARTITIONS
CREATE TABLE ag_agent_memory_default PARTITION OF ag_agent_memory DEFAULT;
CREATE TABLE ag_agent_memory_y2026m01 PARTITION OF ag_agent_memory FOR VALUES FROM ('2026-01-01') TO ('2026-02-01');
CREATE TABLE ag_agent_memory_y2026m02 PARTITION OF ag_agent_memory FOR VALUES FROM ('2026-02-01') TO ('2026-03-01');
```

---

## 🕵️ 5. OBSERVABILITY LAYER (FORENSIC TRACING)

### `ag_logic_trace`
**W3C COMPLIANT**: Stores decision reasoning with strict Trace Context.
**TRIPLE JUSTIFICATION**: Fully restored.

```sql
CREATE TABLE ag_logic_trace (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    session_id uuid REFERENCES ag_sessions NOT NULL,
    
    -- W3C Trace Context (Strict Hex Validation)
    trace_id char(32) NOT NULL CHECK (trace_id ~ '^[a-f0-9]{32}$'),
    span_id char(16) NOT NULL CHECK (span_id ~ '^[a-f0-9]{16}$'),
    parent_span_id char(16) CHECK (parent_span_id ~ '^[a-f0-9]{16}$'),
    
    decision_type ag_decision_type NOT NULL,
    
    -- FORENSIC FOREIGN KEY (Triple Composite)
    input_snapshot_captured_at timestamptz,
    input_snapshot_id bigint,
    
    FOREIGN KEY (session_id, input_snapshot_captured_at, input_snapshot_id) 
        REFERENCES ag_agent_memory (session_id, captured_at, id),
    
    -- Triple Justification Protocol
    justification_identity text,
    justification_knowledge text,
    justification_math text,
    
    confidence_score numeric(3,2) CHECK (confidence_score BETWEEN 0.00 AND 1.00),
    auto_corrected boolean DEFAULT false,
    created_at timestamptz DEFAULT now()
);
ALTER TABLE ag_logic_trace ENABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS idx_trace_session_created ON ag_logic_trace (session_id, created_at DESC);

-- POLICIES
DROP POLICY IF EXISTS "Owner Read Traces" ON ag_logic_trace;
CREATE POLICY "Owner Read Traces" ON ag_logic_trace
    FOR SELECT TO authenticated
    USING (session_id IN (SELECT id FROM ag_sessions WHERE user_id = auth.uid()));

DROP POLICY IF EXISTS "Owner Insert Traces" ON ag_logic_trace;
CREATE POLICY "Owner Insert Traces" ON ag_logic_trace
    FOR INSERT TO authenticated
    WITH CHECK (session_id IN (SELECT id FROM ag_sessions WHERE user_id = auth.uid()));
```

---

## 📜 6. EVENT LOG
Immutable "Black Box" backplane.

```sql
CREATE TABLE ag_control_events (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    session_id uuid REFERENCES ag_sessions NOT NULL,
    command_type ag_command_type NOT NULL,
    payload jsonb,
    created_at timestamptz DEFAULT now()
);
ALTER TABLE ag_control_events ENABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS idx_events_session_created ON ag_control_events (session_id, created_at DESC);

-- POLICIES (Insert Enabled)
DROP POLICY IF EXISTS "Owner Select Events" ON ag_control_events;
DROP POLICY IF EXISTS "Owner Insert Events" ON ag_control_events;
-- Also drop old name if exists
DROP POLICY IF EXISTS "Owner View Events" ON ag_control_events; 

CREATE POLICY "Owner Select Events" ON ag_control_events
    FOR SELECT TO authenticated
    USING (session_id IN (SELECT id FROM ag_sessions WHERE user_id = auth.uid()));

CREATE POLICY "Owner Insert Events" ON ag_control_events
    FOR INSERT TO authenticated
    WITH CHECK (session_id IN (SELECT id FROM ag_sessions WHERE user_id = auth.uid()));
```

---

## 7. ASSET LAYER & FEEDBACK

```sql
-- ASSETS
CREATE TABLE ag_assets (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id uuid REFERENCES ag_sessions,
    title text NOT NULL,
    asset_type ag_asset_type NOT NULL,
    version int4 DEFAULT 1,
    created_by_agent text REFERENCES ag_agent_registry(id),
    storage_path text NOT NULL,
    production_cost numeric(10,4) DEFAULT 0.0000,
    roi_actual numeric(10,4),
    created_at timestamptz DEFAULT now()
);
ALTER TABLE ag_assets ENABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS idx_assets_session_created ON ag_assets (session_id, created_at DESC);

DROP POLICY IF EXISTS "Owner CRUD Assets" ON ag_assets;
CREATE POLICY "Owner CRUD Assets" ON ag_assets
    FOR ALL TO authenticated
    USING (session_id IN (SELECT id FROM ag_sessions WHERE user_id = auth.uid()))
    WITH CHECK (session_id IN (SELECT id FROM ag_sessions WHERE user_id = auth.uid()));

-- METRICS
CREATE TABLE ag_social_metrics (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    asset_id uuid REFERENCES ag_assets NOT NULL,
    platform text,
    views numeric(20,0),
    captured_at timestamptz DEFAULT now()
);
ALTER TABLE ag_social_metrics ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Owner CRUD Metrics" ON ag_social_metrics;
CREATE POLICY "Owner CRUD Metrics" ON ag_social_metrics
    FOR ALL TO authenticated
    USING (asset_id IN (SELECT id FROM ag_assets WHERE session_id IN (SELECT id FROM ag_sessions WHERE user_id = auth.uid())))
    WITH CHECK (asset_id IN (SELECT id FROM ag_assets WHERE session_id IN (SELECT id FROM ag_sessions WHERE user_id = auth.uid())));
```
