-- 🛠️ NUCLEUS V5.3 DIAMOND HARDENING & VERIFICATION
-- Run this in Supabase SQL Editor.

-- STEP 1: HARDEN PARTITIONS (Explicit RLS)
-- Prevents any "inheritance gap" risks in pg_class inspection.
ALTER TABLE ag_agent_memory_default ENABLE ROW LEVEL SECURITY;
ALTER TABLE ag_agent_memory_y2026m01 ENABLE ROW LEVEL SECURITY;
ALTER TABLE ag_agent_memory_y2026m02 ENABLE ROW LEVEL SECURITY;
ALTER TABLE ag_agent_memory_y2026m03 ENABLE ROW LEVEL SECURITY;

-- STEP 2: VERIFY "CLEAN" TABLES (No Indexes/Sequences)
-- Should show 't' (true) for all tables.
SELECT c.relname as table_name, c.relrowsecurity as rls_enabled
FROM pg_class c
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname = 'public'
  AND c.relkind = 'r'
  AND c.relname LIKE 'ag_%'
ORDER BY c.relname;

-- STEP 3: VERIFY ACTIVE POLICIES
-- Check coverage: ag_sessions (ALL), others (SELECT+INSERT or ALL)
SELECT tablename, policyname, cmd, roles
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN (
    'ag_agent_registry',
    'ag_sessions',
    'ag_control_events',
    'ag_agent_memory',
    'ag_logic_trace',
    'ag_assets',
    'ag_social_metrics'
  )
ORDER BY tablename, cmd, policyname;
