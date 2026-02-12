export const AGENT_KNOWLEDGE_BASE = {
    // 1. STRATEGIC FRAMEWORKS (Shared Brain)
    frameworks: {
        viral: {
            id: 'STEPPS',
            name: 'STEPPS (Berger)',
            components: ['Social Currency', 'Triggers', 'Emotion', 'Public', 'Practical Value', 'Stories']
        },
        sales: {
            id: 'CIALDINI',
            name: 'Cialdini Principles',
            components: ['Scarcity', 'Authority', 'Social Proof', 'Liking', 'Reciprocity', 'Consistency']
        },
        educational: {
            id: 'SUCCESS',
            name: 'SUCCESs (Heath)',
            components: ['Simple', 'Unexpected', 'Concrete', 'Credible', 'Emotional', 'Stories']
        }
    },

    // 2. TACTICAL LISTS (Dynamic Dropdowns)
    hooks: [
        { id: 'negative', label: 'Negative Hook ("Stop doing X")', risk_level: 'High' },
        { id: 'curiosity_gap', label: 'Curiosity Gap ("The secret to...")', risk_level: 'Medium' },
        { id: 'transformation', label: 'Transformation ("How I went from...")', risk_level: 'Low' },
        { id: 'contrarian', label: 'Contrarian ("Unpopular Opinion")', risk_level: 'High' },
        { id: 'visual_disconnect', label: 'Visual Disconnect (Oddly Satisfying)', risk_level: 'Medium' }
    ],

    tones: [
        { id: 'gary_vee', label: 'Aggressive / Motivational (Gary Vee)', speed: 'Fast' },
        { id: 'hormozi', label: 'Analytical / Direct (Alex Hormozi)', speed: 'Medium' },
        { id: 'documentary', label: 'Cinematic / Narration (Vox Style)', speed: 'Slow' },
        { id: 'bestie', label: 'Conversational / Authentic (UGC)', speed: 'Variable' }
    ],

    // 3. SENSORY LEXICON (The "Power Words")
    // Use this to Programmatically inject into Prompt Context
    sensory_lexicon: {
        visual: ['Centelleante', 'Nebuloso', 'Gigante', 'Vibrante', 'Opaco', 'Nítido'],
        audio: ['Crujido', 'Susurro', 'Estruendo', 'Siseo', 'Zumbido'],
        kinetic: ['Deslizar', 'Tambalearse', 'Dispararse', 'Colapsar', 'Azotar']
    }
};

export type KnowledgeBaseType = typeof AGENT_KNOWLEDGE_BASE;
