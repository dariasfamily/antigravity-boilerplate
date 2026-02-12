'use client';

import { useState, useEffect } from 'react';

// AXON v1.7 Status Types (PROT-009 / PROT-008)
type NodeStatus = 'active' | 'idle' | 'error' | 'paused' | 'adapting' | 'failover';

interface Tool {
    name: string;
    alt: string;
}

interface SystemNode {
    id: string;
    label: string;
    role: string;
    type: 'Core' | 'Module' | 'Agent' | 'Skill' | 'Database';
    status: NodeStatus;
    x: number;
    y: number;
    tools?: Tool[];
    metrics?: {
        fidelity?: number;
        resources?: string;
        depth?: 'L1' | 'L2' | 'L3';
    };
}

// AXON v1.7 TOPOLOGY (Integrated with SS_v1.md)
const NODES: SystemNode[] = [
    // --- AXON CORE (The Brain Stem) ---
    { id: 'ucc', label: 'UCC', role: 'Central Control Unit', type: 'Core', status: 'active', x: 200, y: 250, metrics: { fidelity: 1.0, resources: '0.1ms' } },
    { id: 'ema', label: 'EMA', role: 'Execution Minimums', type: 'Module', status: 'active', x: 100, y: 150, metrics: { fidelity: 1.0, resources: '5 templates' } },
    { id: 'orch', label: 'ORCH', role: 'Adaptive Orchestrator', type: 'Core', status: 'active', x: 300, y: 150, metrics: { resources: 'D3 active', depth: 'L2' } },
    { id: 'failover', label: 'FAILOVER', role: 'Resilience Manager', type: 'Module', status: 'idle', x: 400, y: 250, metrics: { resources: 'Ready' } },

    // --- DATA LAYER ---
    { id: 'db', label: 'SUPABASE DB', role: 'System State', type: 'Database', status: 'active', x: 50, y: 350 },
    { id: 'dashboard', label: 'COCKPIT UI', role: 'Control Logic', type: 'Module', status: 'active', x: 50, y: 50 },

    // --- AGENT SWARM (The Execution Layer) ---
    { id: 'orion', label: 'ORION', role: 'Strategy Lead', type: 'Agent', status: 'active', x: 300, y: 50, metrics: { depth: 'L2' } },
    { id: 'calliope', label: 'CALLIOPE', role: 'Scriptwriter', type: 'Agent', status: 'idle', x: 500, y: 50 },
    { id: 'argus', label: 'ARGUS', role: 'Quality Audit', type: 'Agent', status: 'idle', x: 700, y: 50 },
    { id: 'thalia', label: 'THALIA', role: 'Visual Engine', type: 'Agent', status: 'idle', x: 500, y: 220 },
    { id: 'apollo', label: 'APOLLO', role: 'Audio', type: 'Agent', status: 'idle', x: 700, y: 220 },
    { id: 'lumiere', label: 'LUMIERE', role: 'Video Director', type: 'Agent', status: 'idle', x: 600, y: 380 },
];

const CONNECTIONS = [
    // Control Signal Flow (UCC/EMA)
    { from: 'ema', to: 'ucc', color: '#FCD34D', animated: true }, // Gold (Compliance)
    { from: 'ucc', to: 'orch', color: '#F87171', animated: true }, // Red (Command)
    { from: 'orch', to: 'orion', color: '#3B82F6', animated: true }, // Blue (Task)
    { from: 'orch', to: 'failover', color: '#818CF8' },

    // Data Flow (Package Journey)
    { from: 'orion', to: 'calliope', label: 'Brief', animated: true },
    { from: 'calliope', to: 'argus', label: 'Draft', animated: true },
    { from: 'argus', to: 'thalia', label: 'Approved', animated: true },
    { from: 'argus', to: 'apollo', label: 'Approved', animated: true },
    { from: 'thalia', to: 'lumiere', label: 'Assets', animated: true },
    { from: 'apollo', to: 'lumiere', label: 'Voice', animated: true },

    // Persistence
    { from: 'ucc', to: 'db', color: '#475569' },
];

interface SystemMapProps {
    onNodeSelect?: (nodeId: string) => void;
}

export default function SystemMap({ onNodeSelect }: SystemMapProps) {
    const [selectedNode, setSelectedNode] = useState<SystemNode | null>(null);
    const [pulse, setPulse] = useState(0);

    // Dynamic animation loop for the "Package Journey"
    useEffect(() => {
        const interval = setInterval(() => setPulse(p => (p + 1) % 100), 50);
        return () => clearInterval(interval);
    }, []);

    const handleNodeClick = (node: SystemNode) => {
        setSelectedNode(node);
        if ((node.type === 'Agent' || node.type === 'Core') && onNodeSelect) {
            onNodeSelect(node.id);
        }
    };

    const getStatusColor = (status: NodeStatus) => {
        switch (status) {
            case 'active': return 'border-blue-400 bg-blue-900/40 text-blue-200';
            case 'adapting': return 'border-amber-400 bg-amber-900/40 text-amber-200 animate-pulse';
            case 'failover': return 'border-purple-400 bg-purple-900/40 text-purple-200 animate-bounce';
            case 'error': return 'border-red-500 bg-red-900/40 text-red-200';
            case 'idle': return 'border-gray-600 bg-gray-800/80 text-gray-400';
            default: return 'border-gray-800 bg-gray-950 text-gray-500';
        }
    };

    return (
        <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6 relative min-h-[550px] overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-100 font-mono flex items-center gap-2">
                    <span className="text-red-500 animate-pulse">⦿</span> AXON: ORGANISMO VIVO <span className="text-[10px] bg-red-900/30 text-red-400 px-2 py-0.5 rounded border border-red-500/20">v1.7 ACTIVE</span>
                </h3>
                <div className="flex gap-2 text-[10px] font-mono">
                    <span className="flex items-center gap-1 text-blue-400"><span className="w-2 h-2 rounded-full bg-blue-400"></span> ACTIVE</span>
                    <span className="flex items-center gap-1 text-amber-400"><span className="w-2 h-2 rounded-full bg-amber-400"></span> ADAPTING</span>
                    <span className="flex items-center gap-1 text-purple-400"><span className="w-2 h-2 rounded-full bg-purple-400"></span> FAILOVER</span>
                </div>
            </div>

            <div className="relative w-full h-[450px]">
                {/* SVG CONNECTIONS & PACKAGE JOURNEY */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    <defs>
                        <radialGradient id="grad-package" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
                            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                        </radialGradient>
                    </defs>

                    {CONNECTIONS.map((conn, i) => {
                        const start = NODES.find(n => n.id === conn.from);
                        const end = NODES.find(n => n.id === conn.to);
                        if (!start || !end) return null;

                        const x1 = `${start.x / 10}%`;
                        const y1 = `${start.y / 5}%`;
                        const x2 = `${end.x / 10}%`;
                        const y2 = `${end.y / 5}%`;

                        return (
                            <g key={i}>
                                <line
                                    x1={x1} y1={y1} x2={x2} y2={y2}
                                    stroke={conn.color || '#334155'}
                                    strokeWidth="1"
                                    strokeDasharray={conn.animated ? "4 2" : "none"}
                                    opacity="0.4"
                                />
                                {conn.animated && (
                                    <circle r="3" fill="url(#grad-package)">
                                        <animateMotion
                                            dur="3s"
                                            repeatCount="indefinite"
                                            path={`M ${start.x * 10},${start.y * 10} L ${end.x * 10},${end.y * 10}`}
                                        />
                                    </circle>
                                )}
                            </g>
                        );
                    })}
                </svg>

                {/* INTERACTIVE NODES */}
                {NODES.map((node) => (
                    <div
                        key={node.id}
                        onClick={() => handleNodeClick(node)}
                        className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:scale-110 z-10 
                            flex flex-col items-center group
                        `}
                        style={{ left: `${node.x / 10}%`, top: `${node.y / 5}%` }}
                    >
                        {/* NODE CORE */}
                        <div className={`
                            relative w-14 h-14 flex items-center justify-center border shadow-xl backdrop-blur-md transition-shadow
                            ${node.type === 'Agent' ? 'rounded-full' : node.type === 'Core' ? 'rounded-lg rotate-45' : 'rounded-md'}
                            ${getStatusColor(node.status)}
                            ${node.id === selectedNode?.id ? 'ring-2 ring-white ring-offset-2 ring-offset-black' : ''}
                        `}>
                            <div className={`${node.type === 'Core' ? '-rotate-45' : ''}`}>
                                <span className={`text-[10px] font-bold font-mono ${node.status === 'active' ? 'text-white' : ''}`}>
                                    {node.id.toUpperCase()}
                                </span>
                            </div>

                            {/* ACTIVITY RING */}
                            {node.status === 'active' && (
                                <div className="absolute inset-0 rounded-inherit border border-blue-400 animate-ping opacity-20"></div>
                            )}
                        </div>

                        {/* DESCRIPTOR */}
                        <div className="mt-3 text-center pointer-events-none">
                            <span className="text-[9px] font-mono font-bold text-gray-400 bg-gray-900/80 px-2 py-0.5 rounded border border-gray-800">
                                {node.label}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* FIDELITY SHEET / INSPECTOR */}
            {selectedNode && (
                <div className="absolute bottom-6 right-6 bg-gray-900/95 border border-gray-700 p-5 rounded-2xl w-80 shadow-2xl z-30 backdrop-blur-2xl animate-in slide-in-from-bottom-5">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h4 className="font-bold text-lg text-white font-mono tracking-tight">{selectedNode.label}</h4>
                            <div className="flex gap-2 items-center mt-1">
                                <span className="text-[9px] px-2 py-0.5 rounded-full bg-red-900/50 text-red-300 border border-red-500/30 font-bold uppercase">
                                    {selectedNode.type}
                                </span>
                                <span className="text-[9px] text-gray-500 italic">{selectedNode.role}</span>
                            </div>
                        </div>
                        <button onClick={() => setSelectedNode(null)} className="text-gray-500 hover:text-white transition-colors">✕</button>
                    </div>

                    <div className="space-y-4">
                        {/* AXON METRICS (PROT-004 / 007) */}
                        <div className="grid grid-cols-2 gap-2">
                            <div className="bg-black/50 p-2 rounded-lg border border-gray-800">
                                <p className="text-[8px] text-gray-500 mb-1 uppercase font-bold">Resiliencia (F)</p>
                                <div className="text-xs font-mono text-emerald-400">99.9% FAULT TOL</div>
                            </div>
                            <div className="bg-black/50 p-2 rounded-lg border border-gray-800">
                                <p className="text-[8px] text-gray-500 mb-1 uppercase font-bold">Fidelidad (PROT-001)</p>
                                <div className="text-xs font-mono text-blue-400">{selectedNode.metrics?.fidelity ? (selectedNode.metrics.fidelity * 100).toFixed(0) + '%' : '100.0%'}</div>
                            </div>
                        </div>

                        <div className="bg-blue-900/10 p-3 rounded-xl border border-blue-500/20">
                            <h5 className="text-[9px] font-bold text-blue-300 mb-2 uppercase tracking-widest flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span> Live Telemetry
                            </h5>
                            <div className="space-y-1">
                                <div className="flex justify-between text-[10px]">
                                    <span className="text-gray-500">Resource Load:</span>
                                    <span className="text-gray-300 font-mono">{selectedNode.metrics?.resources || '2.4ms lat'}</span>
                                </div>
                                <div className="flex justify-between text-[10px]">
                                    <span className="text-gray-500">Knowledge Depth:</span>
                                    <span className="text-amber-400 font-bold font-mono">{selectedNode.metrics?.depth || 'L1'}</span>
                                </div>
                            </div>
                        </div>

                        {selectedNode.tools && (
                            <div>
                                <p className="text-[9px] text-gray-400 mb-2 font-bold uppercase tracking-wider">🛠️ Tool Integration</p>
                                <div className="flex flex-wrap gap-1">
                                    {selectedNode.tools.map((t, i) => (
                                        <span key={i} className="text-[8px] bg-gray-800 text-gray-300 px-2 py-1 rounded border border-gray-700">
                                            {t.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <button className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold rounded-lg transition-all shadow-lg shadow-blue-900/20 uppercase tracking-widest">
                            Open Protocol Datasheet (SS_v1)
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
