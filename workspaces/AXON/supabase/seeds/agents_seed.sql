-- 🌱 AGENTS SEED (V5.3 Harmonized)
-- Populates the Registry with the 6 confirmed agents.

INSERT INTO ag_agent_registry (id, name, version, role_description, allowed_phases, config_schema)
VALUES
  -- 1. EGERIA (Backbone)
  (
    'PROJ-SYSTEM-EGERIA',
    'Egeria',
    '1.1.0',
    'Chief Knowledge Officer. Mimetismo, Memoria y Mantenimiento.',
    ARRAY['PLANNING','RESEARCH','SCRIPTING','PRODUCTION','AUDIT','PUBLISHING']::ag_session_phase[],
    '{"headquarters": "hive/integrations/notebooklm"}'::jsonb
  ),
  -- 2. PLANNER (Architect)
  (
    'PROJ-SYSTEM-PLANNER-v0',
    'Planner',
    '1.1.0',
    'Chief Systems Architect. Metacognition of the System. Zero Entropy.',
    ARRAY['PLANNING','AUDIT']::ag_session_phase[],
    '{
        "protocols": ["ACP v1.0", "Measure Twice, Cut Once", "Zero Tech Debt"],
        "skills": ["system-audit", "architecture-design", "implementation-planning"],
        "outputs": ["IMPLEMENTATION_PLAN.md", "AUDIT_REPORT.md", "ARCHITECTURE_SPEC.md"]
    }'::jsonb
  ),
  -- 3. PULSAR (Gateway)
  (
    'PROJ-2026-PULSAR-v0',
    'Pulsar',
    '1.1.0',
    'Universal Gateway. Transmutes intent into instructions.',
    ARRAY['PLANNING','RESEARCH']::ag_session_phase[],
    '{"skills": ["transmute-prompt", "semantic-anchor"]}'::jsonb
  ),
  -- 4. ORION (Strategist)
  (
    'ORION_V3_4',
    'Orion',
    '3.4.0',
    'Investment Analyst of Attention. ROI prediction.',
    ARRAY['RESEARCH','SCRIPTING']::ag_session_phase[],
    '{}'::jsonb
  ),
  -- 5. CALLIOPE (Creator)
  (
    'CALLIOPE_V1_0',
    'Calliope',
    '1.0.0',
    'Creative Director. Scriptwriting for retention.',
    ARRAY['SCRIPTING','PRODUCTION']::ag_session_phase[],
    '{}'::jsonb
  ),
  -- 6. ARGUS (Guardian)
  (
    'PROJ-2026-ARGUS-v0',
    'Argus',
    '1.1.0',
    'Chief Editor and Compliance Officer. "Trust, but Verify".',
    ARRAY['AUDIT','PUBLISHING']::ag_session_phase[],
    '{
        "rigor": "Hybrid 3.2",
        "skills": ["compliance-check", "quality-assurance", "report-to-hq"],
        "protocols": ["Safety Gate", "SEO Mandate", "15-Second Rule"]
    }'::jsonb
  ),
  -- 7. NEXUS (Automation)
  (
    'PROJ-SYSTEM-NEXUS-MASTER',
    'Nexus',
    '2026.1.0',
    'Architect-Prime. Meta-System Orchestrator.',
    ARRAY['PLANNING','PRODUCTION','PUBLISHING']::ag_session_phase[],
    '{
        "role": "Orchestrator of Automation",
        "skills": ["intent-classification", "schema-generation", "resilience-engineering"],
        "integrations": ["n8n", "Make", "Zapier", "OpenAI", "Google"]
    }'::jsonb
  ),
  -- 8. APOLLO (Audio)
  (
    'PROJ-SYSTEM-APOLLO-v1',
    'Apollo',
    '1.1.0',
    'The Audio Engine. Voice Synthesis and Sound Design.',
    ARRAY['PRODUCTION']::ag_session_phase[],
    '{
        "role": "Audio Architect",
        "skills": ["voice-synthesis", "sound-design", "mixing-mastering"],
        "protocols": ["Emotional Logic", "Sonic Triggers", "-14 LUFS"]
    }'::jsonb
  ),
  -- 9. THALIA (Visuals)
  (
    'PROJ-SYSTEM-THALIA-v1',
    'Thalia',
    '2026.1.0',
    'Visual Muse. High-Impact Artistry.',
    ARRAY['PRODUCTION','PUBLISHING']::ag_session_phase[],
    '{
        "role": "Visual Engine",
        "skills": ["thumbnail-creation", "aesthetic-enforcement", "format-optimization"],
        "protocols": ["Safe Zones", "Psychological Targeting", "Brand Aesthetic"]
    }'::jsonb
  ),
  -- 10. LYRA (Brand)
  (
    'PROJ-SYSTEM-LYRA-v0',
    'Lyra',
    '0.1.0',
    'Brand Architect. Keeper of the Voice.',
    ARRAY['PLANNING','RESEARCH','AUDIT']::ag_session_phase[],
    '{
        "status": "WIP",
        "role": "Brand Custodian"
    }'::jsonb
  )
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  version = EXCLUDED.version,
  role_description = EXCLUDED.role_description,
  allowed_phases = EXCLUDED.allowed_phases,
  config_schema = EXCLUDED.config_schema;
