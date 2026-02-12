
'use client';

import { useState } from 'react';

type NodeStatus = 'active' | 'idle' | 'error' | 'paused';

interface Tool {
    name: string;
    alt: string;
}

interface SystemNode {
    id: string;
    label: string;
    role: string;
    type: 'Module' | 'Agent' | 'Skill' | 'Database';
    status: NodeStatus;
    x: number;
    y: number;
    tools?: Tool[];
}

// DEFINING THE LAYOUT
const NODES: SystemNode[] = [
    // --- MODULE: CORE ---
    { id: 'db', label: 'SUPABASE DB', role: 'System State', type: 'Database', status: 'active', x: 50, y: 350 },
    { id: 'dashboard', label: 'COCKPIT UI', role: 'Control Logic', type: 'Module', status: 'active', x: 50, y: 200 },

    // --- MODULE: BRAND DIVISION (THE STUDIO) ---
    // LEADERSHIP
    { id: 'orion', label: 'ORION', role: 'Strategy Lead', type: 'Agent', status: 'active', x: 300, y: 50, tools: [{ name: 'Perplexity', alt: 'Gemini' }] },

    // CREATION FLOW
    { id: 'calliope', label: 'CALLIOPE', role: 'Scriptwriter', type: 'Agent', status: 'idle', x: 500, y: 50, tools: [{ name: 'LLM (Claude)', alt: 'GPT-4' }] },
    { id: 'argus', label: 'ARGUS', role: 'Quality Audit', type: 'Agent', status: 'idle', x: 700, y: 50, tools: [{ name: 'TubeBuddy', alt: 'VidIQ' }, { name: 'Safety', alt: 'OpenAI Mod' }] },

    // ASSET GENERATION (PARALLEL)
    { id: 'thalia', label: 'THALIA', role: 'Visual Engine', type: 'Agent', status: 'idle', x: 500, y: 200, tools: [{ name: 'Midjourney', alt: 'NanoBanana' }, { name: 'Runway', alt: 'Veo 3' }] },
    { id: 'apollo', label: 'APOLLO', role: 'Audio', type: 'Agent', status: 'idle', x: 700, y: 200, tools: [{ name: 'ElevenLabs', alt: 'OpenAI TTS' }] },

    // PRODUCTION
    { id: 'lumiere', label: 'LUMIERE', role: 'Video Director', type: 'Agent', status: 'idle', x: 500, y: 350, tools: [{ name: 'Veo3', alt: 'Runway' }, { name: 'HeyGen', alt: 'D-ID' }] },

    // DISTRIBUTION
    { id: 'echo', label: 'ECHO', role: 'Social Manager', type: 'Agent', status: 'idle', x: 900, y: 350, tools: [{ name: 'Typefully', alt: 'Direct API' }] },
];

const CONNECTIONS = [
    // Data Flow
    { from: 'dashboard', to: 'db', color: '#334155' }, // Slate-700
    { from: 'dashboard', to: 'orion', color: '#3B82F6' }, // Blue (Command)

    // Supply Chain
    { from: 'orion', to: 'calliope', label: 'Brief' },
    { from: 'calliope', to: 'argus', label: 'Draft' },
    { from: 'argus', to: 'thalia', label: 'Approved' },
    { from: 'argus', to: 'apollo', label: 'Approved' },
    { from: 'argus', to: 'lumiere', label: 'Approved' },

    // Asset Merging
    { from: 'thalia', to: 'lumiere', label: 'Assets' },
    { from: 'apollo', to: 'lumiere', label: 'Voice' },

    // Release
    { from: 'lumiere', to: 'echo', label: 'Final Cut' },
];

interface SystemMapProps {
    onNodeSelect?: (nodeId: string) => void;
}

export default function SystemMap({ onNodeSelect }: SystemMapProps) {
    const [selectedNode, setSelectedNode] = useState<SystemNode | null>(null);

    const handleNodeClick = (node: SystemNode) => {
        setSelectedNode(node);
        // If it's an Agent, trigger the external handler to scroll/focus the panel
        if (node.type === 'Agent' && onNodeSelect) {
            onNodeSelect(node.id); // e.g., 'apollo'
        }
    };

    return (
        <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6 relative min-h-[500px] overflow-hidden">
            <h3 className="text-xl font-bold mb-4 text-gray-100 font-mono flex items-center gap-2">
                <span className="text-blue-500">⚛</span> SYSTEM TOPOLOGY
            </h3>

            <div className="relative w-full h-[450px]">
                {/* CONNECTIONS LAYER */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    {CONNECTIONS.map((conn, i) => {
                        const start = NODES.find(n => n.id === conn.from);
                        const end = NODES.find(n => n.id === conn.to);
                        if (!start || !end) return null;

                        // Calculate positions (simple scaling)
                        const x1 = start.x / 10;
                        const y1 = start.y / 5;
                        const x2 = end.x / 10;
                        const y2 = end.y / 5;

                        return (
                            <g key={i}>
                                <line
                                    x1={`${x1}%`} y1={`${y1}%`}
                                    x2={`${x2}%`} y2={`${y2}%`}
                                    stroke={conn.color || '#4B5563'}
                                    strokeWidth="1.5"
                                    opacity="0.6"
                                />
                                {/* Optional Label support could go here */}
                            </g>
                        );
                    })}
                </svg>

                {/* NODES LAYER */}
                {NODES.map((node) => (
                    <div
                        key={node.id}
                        onClick={() => handleNodeClick(node)}
                        className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:scale-105 z-10 
                            flex flex-col items-center group
                        `}
                        style={{ left: `${node.x / 10}%`, top: `${node.y / 5}%` }}
                    >
                        {/* NODE SHAPE */}
                        <div className={`
                            w-12 h-12 flex items-center justify-center rounded-xl border-2 shadow-lg backdrop-blur-md
                            ${node.type === 'Agent' ? 'rounded-full' : 'rounded-lg'}
                            ${node.status === 'active' ? 'bg-blue-900/40 border-blue-400 shadow-blue-500/20' :
                                node.status === 'error' ? 'bg-red-900/40 border-red-500' :
                                    'bg-gray-800/80 border-gray-600'
                            }
                        `}>
                            {/* ICON */}
                            <span className="text-lg font-bold">
                                {node.id.substring(0, 2).toUpperCase()}
                            </span>
                        </div>

                        {/* LABEL */}
                        <div className="mt-2 text-center">
                            <span className="text-[10px] font-mono font-bold text-gray-300 bg-black/50 px-2 py-0.5 rounded border border-gray-800 block">
                                {node.label}
                            </span>
                            <span className="text-[9px] text-gray-500">{node.role}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* INSPECTOR PANEL */}
            {selectedNode && (
                <div className="absolute top-4 right-4 bg-gray-900/95 border border-gray-700 p-4 rounded-xl w-72 shadow-2xl z-20 backdrop-blur-xl">
                    <div className="flex justify-between items-start mb-3">
                        <div>
                            <h4 className="font-bold text-lg text-white">{selectedNode.label}</h4>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                {selectedNode.type}
                            </span>
                        </div>
                        <button onClick={() => setSelectedNode(null)} className="text-gray-500 hover:text-white">✕</button>
                    </div>

                    <div className="space-y-3">
                        <div className="bg-black/40 p-2 rounded border border-gray-800">
                            <p className="text-xs text-gray-400 mb-1">STATUS</p>
                            <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${selectedNode.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-gray-500'
                                    }`}></span>
                                <span className="text-sm font-mono uppercase">{selectedNode.status}</span>
                            </div>
                        </div>

                        {selectedNode.tools && (
                            <div>
                                <p className="text-xs text-gray-400 mb-2 font-bold pointer-events-none">🛠️ TOOL STACK</p>
                                <div className="space-y-1">
                                    {selectedNode.tools.map((t, i) => (
                                        <div key={i} className="text-xs grid grid-cols-2 gap-2 border-b border-gray-800 pb-1 last:border-0">
                                            <span className="text-green-400 font-mono">{t.name}</span>
                                            <span className="text-gray-500 text-right italic">{t.alt}</span>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-[9px] text-gray-600 mt-1 text-right">Primary vs Backup</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
