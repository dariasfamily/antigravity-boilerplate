import React, { useState } from 'react';
import { useAgentContext } from '@/context/AgentContext';
import { SystemContext, SystemLog } from '@/types/agent_types';

export default function ContextInspector() {
    const { systemContext, systemLogs } = useAgentContext();
    const [activeTab, setActiveTab] = useState<'CONTEXT' | 'LOGS'>('CONTEXT');
    const [expandedKeys, setExpandedKeys] = useState<Record<string, boolean>>({
        'global_variables': true,
        'agents': true
    });

    const toggleExpand = (key: string) => {
        setExpandedKeys(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="h-full flex flex-col bg-[#0F111A] text-xs font-mono">
            {/* Header / Tabs */}
            <div className="flex border-b border-slate-800 bg-slate-900/50">
                <button
                    onClick={() => setActiveTab('CONTEXT')}
                    className={`px-4 py-2 flex items-center gap-2 transition-colors ${activeTab === 'CONTEXT'
                            ? 'text-blue-400 bg-blue-900/10 border-b-2 border-blue-500'
                            : 'text-slate-500 hover:text-slate-300'
                        }`}
                >
                    <span className="text-lg">📦</span> SYSTEM_CONTEXT
                </button>
                <button
                    onClick={() => setActiveTab('LOGS')}
                    className={`px-4 py-2 flex items-center gap-2 transition-colors ${activeTab === 'LOGS'
                            ? 'text-emerald-400 bg-emerald-900/10 border-b-2 border-emerald-500'
                            : 'text-slate-500 hover:text-slate-300'
                        }`}
                >
                    <span className="text-lg">📜</span> SYSTEM_LOGS
                </button>
                <div className="ml-auto px-4 py-2 text-slate-600 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    LIVE
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-auto p-4 custom-scrollbar">

                {/* VIEW: CONTEXT TREE */}
                {activeTab === 'CONTEXT' && (
                    <div className="space-y-1">
                        <JSONTree
                            data={systemContext}
                            label="root"
                            toggled={true}
                            onToggle={() => { }}
                            depth={0}
                        />
                    </div>
                )}

                {/* VIEW: LOGS TABLE */}
                {activeTab === 'LOGS' && (
                    <div className="space-y-2">
                        {systemLogs.length === 0 && (
                            <div className="text-slate-600 italic p-4 text-center">No logs recorded yet.</div>
                        )}
                        {[...systemLogs].reverse().map((log) => (
                            <div key={log.id} className="grid grid-cols-[120px_100px_1fr] gap-2 p-2 hover:bg-white/5 rounded border-b border-white/5 font-mono text-[11px] items-start">
                                <div className="text-slate-500">{new Date(log.timestamp).toLocaleTimeString()}</div>
                                <div>
                                    <span className={`px-1.5 py-0.5 rounded text-[10px] items-center gap-1 inline-flex ${log.status === 'SUCCESS' ? 'bg-emerald-950 text-emerald-400 border border-emerald-900' :
                                            log.status === 'FAILURE' ? 'bg-red-950 text-red-400 border border-red-900' :
                                                log.status === 'WARNING' ? 'bg-orange-950 text-orange-400 border border-orange-900' :
                                                    'bg-blue-950 text-blue-400 border border-blue-900'
                                        }`}>
                                        {getPillIcon(log.status)} {log.agent}
                                    </span>
                                </div>
                                <div className="break-all whitespace-pre-wrap">
                                    <span className="text-slate-300 font-bold mr-2">[{log.action}]</span>
                                    <span className="text-slate-400">{log.details}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

// --- HELPER COMPONENTS ---

const getPillIcon = (status: string) => {
    switch (status) {
        case 'SUCCESS': return '✓';
        case 'FAILURE': return '✕';
        case 'WARNING': return '⚠';
        default: return 'ℹ';
    }
}

// Simple Recursive JSON Tree Component
const JSONTree = ({ data, label, toggled, depth }: { data: any, label: string, toggled: boolean, depth: number }) => {
    const [isOpen, setIsOpen] = useState(toggled);
    const isObject = data && typeof data === 'object' && !Array.isArray(data);
    const isArray = Array.isArray(data);
    const isEmpty = (isObject && Object.keys(data).length === 0) || (isArray && data.length === 0);
    const typeColor = isArray ? 'text-pink-400' : isObject ? 'text-blue-400' : typeof data === 'string' ? 'text-emerald-300' : 'text-orange-300';

    if (!isObject && !isArray) {
        return (
            <div className="flex gap-2 hover:bg-white/5 px-1 rounded" style={{ marginLeft: depth * 12 }}>
                <span className="text-slate-500 w-max">{label}:</span>
                <span className={`${typeColor} break-all`}>{String(data)}</span>
            </div>
        );
    }

    return (
        <div style={{ marginLeft: depth * 12 }}>
            <div
                className="flex items-center gap-2 cursor-pointer hover:bg-white/5 px-1 rounded select-none"
                onClick={() => !isEmpty && setIsOpen(!isOpen)}
            >
                <span className="text-slate-600 w-4 font-bold">{isEmpty ? '' : (isOpen ? '▼' : '▶')}</span>
                <span className="text-purple-400 font-bold">{label}</span>
                <span className="text-slate-600 text-[10px]">{isArray ? `[${data.length}]` : '{...}'}</span>
            </div>
            {isOpen && !isEmpty && (
                <div className="border-l border-slate-800 ml-2 pl-1">
                    {Object.entries(data).map(([key, value]) => (
                        <JSONTree
                            key={key}
                            data={value}
                            label={key}
                            toggled={false}
                            depth={0}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
