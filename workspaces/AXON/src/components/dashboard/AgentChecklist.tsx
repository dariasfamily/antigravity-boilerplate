import { useState, useEffect } from 'react';
import { SystemState } from '@/types/agent_types';

type TaskStatus = 'idle' | 'queued' | 'active' | 'completed' | 'error';

interface PipelineNodeProps {
    agentId: string;
    label: string;
    subLabel: string;
    status: TaskStatus;
    progress: number;
    logs: string[];
    isLast?: boolean;
    isAdmin: boolean;
}

interface AgentChecklistProps {
    agents: { [key: string]: SystemState & { data?: any } };
}

export default function AgentChecklist({ agents }: AgentChecklistProps) {
    const [isAdmin, setIsAdmin] = useState(false);
    // Force re-render for progress simulation
    const [, setTick] = useState(0);

    // Simulate progress for active agents
    useEffect(() => {
        const timer = setInterval(() => {
            setTick(t => t + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const getAgentStatus = (id: string): TaskStatus => {
        const status = agents[id]?.status;
        if (status === 'active') return 'completed';
        if (status === 'processing') return 'active';
        if (status === 'error') return 'error';
        if (status === 'paused_for_input') return 'active'; // User input is part of active
        if (status === 'paused_for_approval') return 'active';
        return 'idle';
    };

    // Helper to calc progress based on logs length as a proxy for now
    const getProgress = (id: string, status: TaskStatus) => {
        if (status === 'completed') return 100;
        if (status === 'idle') return 0;
        if (status === 'active') {
            const logs = agents[id]?.logs?.length || 0;
            // Fake progress: logs * 10, capped at 90% until done
            return Math.min(logs * 15, 90);
        }
        return 0;
    };

    const pipeline = [
        { id: 'ORION', label: 'STRATEGY', subLabel: 'Trend Synthesis' },
        { id: 'CALLIOPE', label: 'SCRIPTING', subLabel: 'Content Drafting' },
        { id: 'ARGUS', label: 'AUDIT', subLabel: 'Quality Assurance' },
        { id: 'ECHO', label: 'DISTRIBUTION', subLabel: 'Publishing' },
    ];

    return (
        <div className="bg-[#0F111A] border border-slate-800 rounded-xl p-6 font-sans relative overflow-hidden shadow-2xl">
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-blue-500/5 blur-[120px] pointer-events-none"></div>

            {/* Header */}
            <div className="flex justify-between items-center mb-8 relative z-10">
                <div>
                    <h3 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                        <span className="text-3xl">💠</span> SYSTEM PIPELINE
                    </h3>
                    <p className="text-slate-500 text-xs uppercase tracking-[0.2em] mt-1 ml-1">Real-time Execution Flow</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex gap-2 text-[10px] font-mono uppercase text-slate-500">
                        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div>Active</div>
                        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>Done</div>
                        <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div>Idle</div>
                    </div>
                    <div className="h-6 w-[1px] bg-slate-800 mx-2"></div>
                    <button
                        onClick={() => setIsAdmin(!isAdmin)}
                        className={`text-xs px-3 py-1 rounded-full border transition-all ${isAdmin
                                ? 'bg-emerald-900/30 border-emerald-500/50 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                                : 'bg-slate-900 border-slate-700 text-slate-400'
                            }`}
                    >
                        {isAdmin ? 'ADMIN VIEW: ON' : 'ADMIN VIEW: OFF'}
                    </button>
                </div>
            </div>

            {/* 3D Pipeline Flow */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 relative z-10">
                {/* Connector Line (Desktop) */}
                <div className="hidden lg:block absolute top-[4.5rem] left-[12%] right-[12%] h-1 bg-slate-800/50 -z-10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-900/0 via-blue-500/20 to-blue-900/0 w-1/2 animate-[shimmer_3s_infinite_linear]"></div>
                </div>

                {pipeline.map((node, idx) => (
                    <PipelineNode
                        key={node.id}
                        agentId={node.id}
                        label={node.label}
                        subLabel={node.subLabel}
                        status={getAgentStatus(node.id)}
                        progress={getProgress(node.id, getAgentStatus(node.id))}
                        logs={agents[node.id]?.logs || []}
                        isLast={idx === pipeline.length - 1}
                        isAdmin={isAdmin}
                    />
                ))}
            </div>
        </div>
    );
}

function PipelineNode({ agentId, label, subLabel, status, progress, logs, isLast, isAdmin }: PipelineNodeProps) {
    // Style Config based on Status
    const styles = {
        idle: {
            border: 'border-slate-800',
            bg: 'bg-[#14161F]',
            icon: 'bg-slate-800 text-slate-500',
            text: 'text-slate-500',
            indicator: 'bg-blue-900/20 text-blue-500',
            shadow: ''
        },
        active: {
            border: 'border-red-500/50',
            bg: 'bg-gradient-to-b from-[#1a1111] to-[#14161F]',
            icon: 'bg-red-500 text-white animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.5)]',
            text: 'text-red-100',
            indicator: 'bg-red-500 text-white',
            shadow: 'shadow-[0_10px_30px_-10px_rgba(239,68,68,0.2)]'
        },
        completed: {
            border: 'border-green-500/50',
            bg: 'bg-gradient-to-b from-[#0f1c15] to-[#14161F]',
            icon: 'bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.5)]',
            text: 'text-green-100',
            indicator: 'bg-green-500 text-white',
            shadow: 'shadow-[0_10px_30px_-10px_rgba(34,197,94,0.2)]'
        },
        error: {
            border: 'border-red-600',
            bg: 'bg-red-950/30',
            icon: 'bg-red-600 text-white',
            text: 'text-red-400',
            indicator: 'bg-red-600 text-white',
            shadow: ''
        },
        queued: {
            border: 'border-yellow-500/50',
            bg: 'bg-yellow-900/10',
            icon: 'bg-yellow-500 text-black',
            text: 'text-yellow-200',
            indicator: 'bg-yellow-500',
            shadow: ''
        }
    }[status] || {
        border: 'border-slate-800', bg: 'bg-slate-900', icon: 'bg-slate-800', text: 'text-slate-500', indicator: '', shadow: ''
    };

    return (
        <div className={`relative group transition-all duration-500 transform ${status === 'active' ? 'scale-105 -translate-y-2' : ''}`}>
            {/* Card Body */}
            <div className={`
                ${styles.bg} ${styles.border} ${styles.shadow}
                border rounded-2xl p-5 h-full flex flex-col items-center text-center
                backdrop-blur-sm transition-all duration-300
            `}>

                {/* Status Ring / Icon */}
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold mb-4 relative z-10 transition-all duration-500 ${styles.icon}`}>
                    {status === 'completed' ? '✓' :
                        status === 'active' ? '⚡' :
                            status === 'error' ? '!' :
                                (agentId[0])}

                    {/* Ripple Effect for Active */}
                    {status === 'active' && (
                        <div className="absolute inset-0 rounded-full border-2 border-red-500 animate-ping opacity-50"></div>
                    )}
                </div>

                <h4 className={`text-lg font-bold tracking-tight mb-1 ${styles.text}`}>{label}</h4>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-4">{subLabel}</p>

                {/* Progress Bar */}
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-4 border border-slate-700/50">
                    <div
                        className={`h-full transition-all duration-700 ease-out ${status === 'active' ? 'bg-red-500 animate-[pulse_2s_infinite]' : status === 'completed' ? 'bg-green-500' : 'bg-slate-600'}`}
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                {/* Metrics / Status Text */}
                <div className="flex justify-between w-full text-[10px] font-mono border-t border-white/5 pt-3 mt-auto">
                    <span className="text-slate-500">TASK.ID: {agentId}_001</span>
                    <span className={status === 'active' ? 'text-red-400 font-bold' : status === 'completed' ? 'text-green-400' : 'text-slate-600'}>
                        {progress}%
                    </span>
                </div>

                {/* Admin Expansion */}
                {isAdmin && (
                    <div className="w-full mt-4 bg-black/40 rounded p-2 text-left space-y-1 h-32 overflow-hidden overflow-y-auto custom-scrollbar border border-white/5">
                        <div className="text-[9px] text-slate-500 sticky top-0 bg-black/80 w-full mb-1 pb-1 border-b border-white/5">LATEST LOGS</div>
                        {logs.length > 0 ? logs.slice(-5).reverse().map((log, i) => (
                            <div key={i} className="text-[9px] font-mono text-slate-400 truncate hover:text-white cursor-help" title={log}>
                                <span className="text-slate-600 mr-1">&gt;</span>{log}
                            </div>
                        )) : <div className="text-[9px] text-slate-700 italic">No activity logs</div>}
                    </div>
                )}
            </div>

            {/* Mobile Vertical Connector */}
            {!isLast && (
                <div className="lg:hidden absolute bottom-[-1.5rem] left-1/2 -translate-x-1/2 w-0.5 h-6 bg-slate-800 z-0"></div>
            )}
        </div>
    );
}
