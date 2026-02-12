"use strict";
/**
 * 📚 AGENT REGISTRY (SOURCE OF TRUTH)
 *
 * Defines the static configuration for all certified agents in the system.
 * This file is used to:
 * 1. Seed the Database (`ag_agent_registry`).
 * 2. Type-check Agent IDs in the application.
 * 3. Configure the Orchestrator.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AGENT_IDS = exports.AGENTS = void 0;
exports.AGENTS = {
    EGERIA: {
        id: 'PROJ-SYSTEM-EGERIA',
        name: 'Egeria',
        version: '1.1.0',
        role: 'Chief Knowledge Officer',
        description: 'Mimetismo, Memoria y Mantenimiento. Backbone del Sistema.',
        allowed_phases: ['PLANNING', 'RESEARCH', 'SCRIPTING', 'PRODUCTION', 'AUDIT', 'PUBLISHING'], // Orchestrator access
        input_schema: {
            fields: [
                { name: 'goal', type: 'text', label: 'Main Goal', placeholder: 'e.g., Create a viral campaign for...' },
                { name: 'mode', type: 'select', label: 'Mode', options: ['Fast', 'Deep', 'Comprehensive'] }
            ]
        }
    },
    PLANNER: {
        id: 'PROJ-SYSTEM-PLANNER-v0', // "The Architect"
        name: 'Planner',
        version: '1.1.0', // Verified via Notebook
        role: 'Chief Systems Architect',
        description: 'Metacognition of the System. Zero Entropy. Designs the future and audits the present.',
        allowed_phases: ['PLANNING', 'AUDIT'],
        input_schema: {
            fields: [
                { name: 'audit_scope', type: 'select', label: 'Audit Scope', options: ['Full System', 'Agent Specific', 'Database'] },
                { name: 'task_description', type: 'text', label: 'Task', placeholder: 'Describe the architectural change...' }
            ]
        }
    },
    PULSAR: {
        id: 'PROJ-2026-PULSAR-v0',
        name: 'Pulsar',
        version: '1.1.0',
        role: 'Universal Gateway',
        description: 'Transmutes human intent into machine instructions. Prompt Engineer.',
        allowed_phases: ['PLANNING', 'RESEARCH'],
        input_schema: {
            fields: [
                { name: 'raw_prompt', type: 'text', label: 'Raw Intent', placeholder: 'Paste your rough idea here...' },
                { name: 'target_model', type: 'select', label: 'Target Model', options: ['Gemini 2.0', 'GPT-4o', 'Claude 3.5'] }
            ]
        }
    },
    ORION: {
        id: 'ORION_V3_4',
        name: 'Orion',
        version: '3.4.0',
        role: 'Investment Analyst',
        description: 'Investment Analyst of Attention. ROI prediction and Strategy.',
        allowed_phases: ['RESEARCH', 'SCRIPTING'],
        input_schema: {
            fields: [
                { name: 'topic', type: 'text', label: 'Research Topic', placeholder: 'e.g., AI Agent Trends 2026' },
                { name: 'data_source', type: 'select', label: 'Data Source', options: ['Web Search', 'NotebookLM', 'Twitter/X'] }
            ]
        }
    },
    CALLIOPE: {
        id: 'CALLIOPE_V1_0',
        name: 'Calliope',
        version: '1.0.0',
        role: 'Creative Director',
        description: 'Scriptwriting and Creative Direction. Writes for retention.',
        allowed_phases: ['SCRIPTING', 'PRODUCTION'],
        input_schema: {
            fields: [
                { name: 'content_format', type: 'select', label: 'Format', options: ['YouTube Short', 'LinkedIn Post', 'Twitter Thread'] },
                { name: 'tone', type: 'select', label: 'Tone', options: ['Professional', 'Controversial', 'Educational', 'Funny'] },
                { name: 'core_message', type: 'text', label: 'Core Message', placeholder: 'Key takeaway...' }
            ]
        }
    },
    ARGUS: {
        id: 'PROJ-2026-ARGUS-v0', // Verified ID
        name: 'Argus',
        version: '1.1.0',
        role: 'The Guardian',
        description: 'Chief Editor and Compliance Officer. "Trust, but Verify". Enforces Brand Safety and SEO.',
        allowed_phases: ['AUDIT', 'PUBLISHING'],
        input_schema: {
            fields: [
                { name: 'content_to_audit', type: 'text', label: 'Content/URL', placeholder: 'Paste text or URL...' },
                { name: 'strictness', type: 'select', label: 'Strictness', options: ['Standard', 'High (Brand Safe)', 'Maximum (Legal)'] }
            ]
        }
    },
    NEXUS: {
        id: 'PROJ-SYSTEM-NEXUS-MASTER', // Master Automation Agent
        name: 'Nexus',
        version: '2026.1.0',
        role: 'Architect-Prime',
        description: 'Meta-System Orchestrator. Architect of Automation. Routes to n8n/Make/Zapier.',
        allowed_phases: ['PLANNING', 'PRODUCTION', 'PUBLISHING'],
        input_schema: {
            fields: [
                { name: 'workflow_trigger', type: 'text', label: 'Trigger Event', placeholder: 'When X happens...' },
                { name: 'destination', type: 'select', label: 'Destination', options: ['n8n', 'Make', 'Zapier', 'Code'] }
            ]
        }
    },
    APOLLO: {
        id: 'PROJ-SYSTEM-APOLLO-v1',
        name: 'Apollo',
        version: '1.1.0',
        role: 'Audio Architect',
        description: 'The Audio Engine. Voice Synthesis, Sound Design, and Auditory Retention.',
        allowed_phases: ['PRODUCTION'],
        input_schema: {
            fields: [
                { name: 'script_text', type: 'text', label: 'Script', placeholder: 'Text to speak...' },
                { name: 'voice_vibe', type: 'select', label: 'Voice Vibe', options: ['Authority (Deep)', 'Empathy (Soft)', 'Energetic (Fast)'] },
                { name: 'duration_limit', type: 'number', label: 'Max Duration (s)', placeholder: '60' }
            ]
        }
    },
    THALIA: {
        id: 'PROJ-SYSTEM-THALIA-v1',
        name: 'Thalia',
        version: '2026.1.0',
        role: 'Visual Muse',
        description: 'Visual Engine. High-Impact Artistry, Thumbnails, and Aesthetic Enforcement.',
        allowed_phases: ['PRODUCTION', 'PUBLISHING'],
        input_schema: {
            fields: [
                { name: 'title_text', type: 'text', label: 'Thumbnail Title', placeholder: 'Big bold text...' },
                { name: 'visual_concept', type: 'text', label: 'Concept', placeholder: 'Cyberpunk city, neon...' },
                { name: 'platform', type: 'select', label: 'Platform', options: ['YouTube', 'Instagram', 'TikTok'] }
            ]
        }
    },
    LYRA: {
        id: 'PROJ-SYSTEM-LYRA-v0', // Pending
        name: 'Lyra',
        version: '0.1.0',
        role: 'Brand Architect',
        description: 'Keeper of the Voice. Defines style, rules, and "Brand Bible". (WIP)',
        allowed_phases: ['PLANNING', 'RESEARCH', 'AUDIT'],
        input_schema: {
            fields: [
                { name: 'question', type: 'text', label: 'Brand Question', placeholder: 'Is this on brand?' }
            ]
        }
    }
};
exports.AGENT_IDS = Object.values(exports.AGENTS).map(a => a.id);
