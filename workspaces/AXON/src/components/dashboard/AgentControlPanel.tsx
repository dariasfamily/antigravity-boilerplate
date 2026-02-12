import React, { useState, useEffect } from 'react';
import { AgentConfiguration, AgentStatus } from '@/types/agent_types';

interface AgentControlPanelProps {
    agentName: string;
    config: AgentConfiguration;
    status: AgentStatus;
    logs?: string[];
    onConfigChange: (newConfig: AgentConfiguration) => void;
    onAction: (action: 'START' | 'PAUSE' | 'RESUME' | 'STOP' | 'APPROVE') => void;
    customInputFields?: React.ReactNode; // For agent-specific inputs
}

export const AgentControlPanel: React.FC<AgentControlPanelProps> = ({
    agentName,
    config,
    status,
    logs = [],
    onConfigChange,
    onAction,
    customInputFields
}) => {
    const [activeTab, setActiveTab] = useState<'INPUT' | 'OUTPUT'>('INPUT');
    const [timeLeft, setTimeLeft] = useState<number>(config.timeout_seconds);

    // Timer Logic
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (status === 'paused_for_approval' || status === 'paused_for_input') {
            timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            setTimeLeft(config.timeout_seconds);
        }
        return () => clearInterval(timer);
    }, [status, config.timeout_seconds]);

    // Auto-proceed trigger
    useEffect(() => {
        if (timeLeft === 0 && config.auto_proceed && (status === 'paused_for_approval' || status === 'paused_for_input')) {
            onAction('APPROVE');
        }
    }, [timeLeft, config.auto_proceed, status, onAction]);

    // Auto-switch to OUTPUT when processing or completed
    useEffect(() => {
        if (status === 'processing' || status === 'completed') {
            setActiveTab('OUTPUT');
        }
    }, [status]);


    return (
        <div className={`
             border rounded-xl p-4 flex flex-col gap-4 transition-all duration-300 relative overflow-hidden group
             ${status === 'active' || status === 'processing'
                ? 'bg-gradient-to-br from-slate-900 via-[#0F111A] to-slate-900 border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.15)]'
                : 'bg-[#0F111A] border-slate-800 hover:border-slate-700'}
        `}>

            {/* Header / Status Banner */}
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <div className="flex items-center gap-3">
                    {/* Status Indicator */}
                    <div className="relative">
                        <div className={`w-3 h-3 rounded-full ${status === 'processing' ? 'bg-blue-500 animate-pulse' :
                                status === 'completed' ? 'bg-green-500' :
                                    status === 'paused_for_input' ? 'bg-yellow-500 animate-bounce' :
                                        status === 'failed' ? 'bg-red-500' : 'bg-slate-600'
                            }`}></div>
                        {status === 'processing' && <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-50"></div>}
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-white tracking-wide">{agentName}</h3>
                        <p className={`text-[10px] font-mono uppercase ${status === 'processing' ? 'text-blue-400' :
                                status === 'completed' ? 'text-green-400' : 'text-slate-500'
                            }`}>
                            {status === 'paused_for_input' ? 'WAITING FOR INPUT' : status}
                        </p>
                    </div>
                </div>

                {/* Tab Switcher */}
                <div className="flex bg-black/40 rounded p-0.5 border border-white/5">
                    <button
                        onClick={() => setActiveTab('INPUT')}
                        className={`text-[10px] font-bold px-3 py-1 rounded transition-colors ${activeTab === 'INPUT' ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-300'
                            }`}
                    >
                        INPUT
                    </button>
                    <button
                        onClick={() => setActiveTab('OUTPUT')}
                        className={`text-[10px] font-bold px-3 py-1 rounded transition-colors ${activeTab === 'OUTPUT' ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-300'
                            }`}
                    >
                        OUTPUT
                    </button>
                </div>
            </div>

            {/* TAB CONTENT: INPUT */}
            {activeTab === 'INPUT' && (
                <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
                    <div className="bg-slate-900/30 p-3 rounded border border-white/5 space-y-3">
                        {/* Config Controls */}
                        <div className="grid grid-cols-2 gap-3 mb-2">
                            <div>
                                <label className="text-[10px] text-slate-500 uppercase block mb-1">Format</label>
                                <select
                                    value={config.selected_output_format}
                                    onChange={(e) => onConfigChange({ ...config, selected_output_format: e.target.value })}
                                    className="w-full bg-black border border-slate-700 rounded px-2 py-1 text-xs text-slate-300 focus:border-blue-500 outline-none"
                                >
                                    {config.output_format_options.map(fmt => <option key={fmt} value={fmt}>{fmt}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="text-[10px] text-slate-500 uppercase block mb-1">Timeout (s)</label>
                                <input
                                    type="number"
                                    value={config.timeout_seconds}
                                    onChange={(e) => onConfigChange({ ...config, timeout_seconds: Number(e.target.value) })}
                                    className="w-full bg-black border border-slate-700 rounded px-2 py-1 text-xs text-slate-300 focus:border-blue-500 outline-none"
                                />
                            </div>
                        </div>

                        <div className="border-t border-white/5 my-2"></div>

                        {/* Custom Fields */}
                        <div>
                            <label className="text-[10px] text-blue-400 uppercase block mb-2 font-bold">Parameters & Prompts</label>
                            {customInputFields || <div className="text-xs text-slate-600 italic py-2 text-center">No input parameters required</div>}
                        </div>
                    </div>
                </div>
            )}

            {/* TAB CONTENT: OUTPUT */}
            {activeTab === 'OUTPUT' && (
                <div className="space-y-2 animate-in fade-in zoom-in-95 duration-200 flex-1 flex flex-col min-h-[140px]">
                    <div className="flex-1 bg-black/60 rounded border border-white/5 p-2 overflow-hidden relative group-hover:border-slate-600/50 transition-colors">
                        <div className="absolute top-0 right-0 px-2 py-1 bg-black/80 text-[9px] text-slate-500 rounded-bl border-l border-b border-white/5">
                            LIVE LOGS
                        </div>
                        <div className="h-32 overflow-y-auto custom-scrollbar space-y-1 p-1">
                            {logs.length > 0 ? logs.slice().reverse().map((log, i) => (
                                <div key={i} className="text-[10px] font-mono border-l-2 border-slate-700 pl-2 py-0.5">
                                    <span className="text-slate-500 mr-2">{new Date().toLocaleTimeString().split(' ')[0]}</span>
                                    <span className="text-slate-300">{log}</span>
                                </div>
                            )) : (
                                <div className="h-full flex flex-col items-center justify-center text-slate-600 text-xs italic">
                                    <span>Waiting for output stream...</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* ACTION FOOTER */}
            <div className="mt-auto pt-3 border-t border-white/5 flex justify-between items-center">
                {/* Timer Badge */}
                {(status === 'paused_for_approval' || status === 'paused_for_input') ? (
                    <div className="flex items-center gap-1.5 text-orange-400 bg-orange-950/20 px-2 py-1 rounded text-[10px] border border-orange-500/20">
                        <span className="animate-pulse">⏳</span>
                        <span className="font-mono font-bold">{timeLeft}s</span>
                    </div>
                ) : (
                    <div className="text-[10px] text-slate-600 flex items-center gap-1">
                        <div className={`w-1.5 h-1.5 rounded-full ${status === 'idle' ? 'bg-slate-700' : 'bg-emerald-500'}`}></div>
                        SYSTEM READY
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                    {status === 'idle' && (
                        <button
                            onClick={() => onAction('START')}
                            className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold px-4 py-1.5 rounded transition-all shadow-lg hover:shadow-blue-500/20"
                        >
                            <span className="mr-1">▶</span> RUN AGENT
                        </button>
                    )}

                    {(status === 'paused_for_approval' || status === 'paused_for_input') && (
                        <>
                            <button
                                onClick={() => onAction('STOP')}
                                className="bg-red-900/30 hover:bg-red-900/50 text-red-400 border border-red-500/30 text-[10px] font-bold px-3 py-1.5 rounded transition-all"
                            >
                                ABORT
                            </button>
                            <button
                                onClick={() => onAction('APPROVE')}
                                className="bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold px-4 py-1.5 rounded transition-all shadow-lg hover:shadow-emerald-500/20"
                            >
                                PROCEED
                            </button>
                        </>
                    )}
                </div>
            </div>

        </div>
    );
};
