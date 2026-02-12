import React from 'react';
import { useAgentContext } from '@/context/AgentContext';
import { AgentActivityRecord, SystemContext } from '@/types/agent_types';

const TraceRow = ({ log }: { log: AgentActivityRecord }) => {
    // Mocking some "Trace" fields if they aren't in ActivityRecord yet
    // In V3 Schema, we'd pull from `ag_logic_trace`, but `activity_log` is the RAM mirror.
    const traceId = log.timestamp.toString(16).slice(-6).toUpperCase();
    const isError = log.level === 'FAILURE' || log.level === 'CRITICAL';
    const isSuccess = log.level === 'SUCCESS';

    return (
        <div className="grid grid-cols-12 gap-4 py-3 border-b border-white/5 bg-[#0A0B10]/50 hover:bg-white/5 transition-colors items-center px-4 text-xs font-mono">
            {/* TRACE ID */}
            <div className="col-span-2 flex items-center gap-2">
                <span className="text-slate-500 opacity-50">#</span>
                <span className="text-slate-300 font-bold">{traceId}</span>
            </div>

            {/* SYMBOL / AGENT */}
            <div className="col-span-2 flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${isError ? 'bg-red-500' : isSuccess ? 'bg-emerald-500' : 'bg-blue-500'}`}></div>
                <span className={isError ? 'text-red-400' : 'text-blue-300'}>{log.agent_id}</span>
            </div>

            {/* ACTION / DECISION */}
            <div className="col-span-3 text-slate-400 truncate" title={log.action_type}>
                {log.action_type}
            </div>

            {/* CONFIDENCE (Mocked for generic logs, Real for LogicTrace) */}
            <div className="col-span-2">
                <div className="flex items-center gap-1">
                    <div className="h-1 flex-1 bg-slate-800 rounded overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[92%]"></div>
                    </div>
                    <span className="text-[10px] text-emerald-500">0.92</span>
                </div>
            </div>

            {/* MESSAGE / JUSTIFICATION */}
            <div className="col-span-3 text-slate-500 truncate italic cursor-help" title={log.message}>
                {log.message}
            </div>
        </div>
    );
};

export const NucleusPanel = () => {
    const { systemContext } = useAgentContext();
    const logs = systemContext?.activity_log || [];

    // Reverse logs to show newest first
    const displayLogs = [...logs].reverse();

    return (
        <div className="h-full flex flex-col bg-[#050505] border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
            {/* HERADER */}
            <div className="h-10 bg-slate-900/80 border-b border-white/5 flex items-center px-4 justify-between backdrop-blur">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-widest">
                    <span className="text-emerald-500">🛡️</span> Nucleus Logic Trace
                </div>
                <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-blue-900/30 text-blue-400 rounded text-[9px] border border-blue-500/20">
                        LIVE FEED
                    </span>
                </div>
            </div>

            {/* TABLE HEADER */}
            <div className="grid grid-cols-12 gap-4 py-2 px-4 bg-slate-900/50 text-[10px] uppercase font-bold text-slate-500 border-b border-slate-800 tracking-wider">
                <div className="col-span-2">Trace ID</div>
                <div className="col-span-2">Agent</div>
                <div className="col-span-3">Action Vector</div>
                <div className="col-span-2">Confidence</div>
                <div className="col-span-3">Output Signal</div>
            </div>

            {/* SCROLL AREA */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                {displayLogs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-slate-600 gap-2">
                        <div className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center animate-pulse">
                            <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
                        </div>
                        <span className="text-xs font-mono">Awaiting Logic Signals...</span>
                    </div>
                ) : (
                    displayLogs.map((log, i) => (
                        <TraceRow key={i} log={log} />
                    ))
                )}
            </div>

            {/* FOOTER */}
            <div className="h-8 bg-[#080808] border-t border-white/5 flex items-center justify-between px-4 text-[9px] text-slate-600 font-mono">
                <span>BUFFER: {displayLogs.length} / 1000</span>
                <span>SYNC: ACTIVE</span>
            </div>
        </div>
    );
};
