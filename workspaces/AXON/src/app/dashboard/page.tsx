'use client';
import React, { useEffect, useState } from 'react';
import { AgentProvider, useAgentContext } from '@/context/AgentContext';
// import { AgentControlPanel } from '@/components/dashboard/AgentControlPanel'; // REMOVED: Legacy
import { OrionModule } from '@/components/dashboard/modules/OrionModule';
import { CalliopeModule } from '@/components/dashboard/modules/CalliopeModule';
import Cockpit from '@/components/dashboard/Cockpit';
import SystemMap from '@/components/dashboard/SystemMap';
// import ContextInspector from '@/components/dashboard/ContextInspector'; // REMOVED: Replaced by NucleusPanel
import { NucleusPanel } from '@/components/dashboard/modules/NucleusPanel';
import KnowledgeNode from '@/components/dashboard/KnowledgeNode';
// import { AdminVault } from '@/components/dashboard/AdminVault'; // Optional
import DashboardWidget from '@/components/dashboard/DashboardWidget';
import DashboardSection from '@/components/dashboard/DashboardSection';

// --- 4. HELPER COMPONENTS (Global Shell) ---

const SessionBadge = ({ id }: { id: string }) => (
    <div className="flex items-center gap-2 group cursor-pointer" title="Copy Full Trace ID">
        <div className="w-2 h-2 bg-slate-700 rounded-full group-hover:bg-blue-500 transition-colors"></div>
        <span className="font-mono text-xs text-slate-500 group-hover:text-blue-400 transition-colors">
            SESSION: <span className="text-slate-300 font-bold">{id.toUpperCase()}</span>
        </span>
    </div>
);

const AgentStatusDock = ({ activeId }: { activeId: string | null }) => (
    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-black/40 rounded-full border border-white/5">
        {['ORION', 'CALLIOPE', 'CRONOS', 'NEXUS'].map((agent) => (
            <div
                key={agent}
                className={`
                    w-1.5 h-1.5 rounded-full transition-all duration-500
                    ${activeId === agent ? 'bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)] scale-125' : 'bg-slate-800'}
                `}
                title={agent}
            />
        ))}
    </div>
);

const CostTicker = ({ amount }: { amount: number }) => (
    <div className={`font-mono text-xs font-bold ${amount > 1.0 ? 'text-red-400' : 'text-emerald-500'} flex items-center gap-1`}>
        <span>${amount.toFixed(4)}</span>
    </div>
);

// --- MAIN COMPONENT ---

function DashboardContent() {
    const { systemContext, setOrionState, setCalliopeState, logEvent } = useAgentContext();
    const [sessionId, setSessionId] = useState('INIT-SEQUENCE');
    // Derived from systemContext or local state? Using local for now until mapped.
    const activeAgentId = systemContext?.active_agent || null;

    useEffect(() => {
        setSessionId(systemContext?.session_id?.slice(-6) || Date.now().toString().slice(-6));
    }, [systemContext?.session_id]);

    const scrollToAgent = (agentId: string) => {
        const element = document.getElementById(`agent-panel-${agentId}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    // --- V3 MODULE HANDLERS ---

    const handleOrionRun = async (input: any) => {
        setOrionState({ status: 'active' });
        logEvent('ORION', 'STRATEGY_INIT', 'WARNING', 'Neural Scan Initiated');

        try {
            const res = await fetch('/api/agents/orion/run', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    keywords: input.topic_keywords, // Mapping key
                    content_spec: input.content_spec,
                    brand_profile: input.brand_profile
                })
            });
            const data = await res.json();

            if (data.status === 'SUCCESS') {
                setOrionState({ status: 'completed', data: data.envelope.data });
                logEvent('ORION', 'EXECUTION_SUCCESS', 'SUCCESS', `Manifest Generated: ${data.envelope.meta.trace_id}`);
                (window as any).__lastResult = data.envelope;
            } else {
                setOrionState({ status: 'failed' });
                logEvent('ORION', 'EXECUTION_ERROR', 'FAILURE', data.message);
            }
        } catch (e: any) {
            setOrionState({ status: 'failed' });
            logEvent('ORION', 'NETWORK_ERROR', 'FAILURE', e.message);
        }
    };

    const handleCalliopeRun = async () => {
        setCalliopeState({ status: 'active' });
        const orionData = (window as any).__lastResult?.data;

        if (!orionData) {
            logEvent('CALLIOPE', 'MISSING_INPUT', 'FAILURE', 'No Strategy Manifest found.');
            setCalliopeState({ status: 'failed' });
            return;
        }

        try {
            const res = await fetch('/api/agents/calliope/run', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ manifest: orionData })
            });
            const data = await res.json();

            if (data.status === 'SUCCESS') {
                setCalliopeState({ status: 'completed', data: data.envelope.data });
                logEvent('CALLIOPE', 'SCRIPT_GENERATED', 'SUCCESS', `Script ID: ${data.envelope.data.script_id}`);
                (window as any).__lastResult = data.envelope;
            } else {
                setCalliopeState({ status: 'failed' });
                logEvent('CALLIOPE', 'EXECUTION_ERROR', 'FAILURE', data.message);
            }
        } catch (e: any) {
            setCalliopeState({ status: 'failed' });
            logEvent('CALLIOPE', 'NETWORK_ERROR', 'FAILURE', e.message);
        }
    };

    return (
        <main className="min-h-screen bg-[#020202] text-slate-200 font-sans selection:bg-blue-500/30 pb-20 overflow-x-hidden">

            {/* GLOBAL HEADER (V3 GLASS SHELL) */}
            <header className="h-16 border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl sticky top-0 z-50 flex items-center justify-between px-6 shadow-2xl shadow-black/50">

                {/* LEFT: IDENTITY & SESSION */}
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-3">
                        <div className="relative w-8 h-8 flex items-center justify-center">
                            <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full"></div>
                            <div className="relative w-4 h-4 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-sm rotate-45 shadow-[0_0_10px_rgba(59,130,246,0.6)]"></div>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-xs font-black tracking-[0.25em] text-slate-100 leading-none mb-1">AXON <span className="text-blue-500">OS</span></h1>
                            <span className="text-[9px] text-slate-600 font-mono tracking-widest pl-0.5">V3.0.0 // GLASS_COCKPIT</span>
                        </div>
                    </div>

                    <div className="h-6 w-px bg-white/5"></div>

                    <SessionBadge id={sessionId} />
                </div>

                {/* CENTER: ACTIVE BRAIN DOCK */}
                <div className="absolute left-1/2 transform -translate-x-1/2">
                    <AgentStatusDock activeId={activeAgentId} />
                </div>

                {/* RIGHT: TELEMETRY & TOOLS */}
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => window.location.reload()}
                        className="group flex items-center gap-2 px-3 py-1.5 bg-red-900/20 border border-red-900/50 rounded-lg hover:bg-red-900/40 transition-all"
                        title="EMERGENCY RESET (KILL SWITCH)"
                    >
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                        <span className="text-[10px] font-bold text-red-400 tracking-widest hidden group-hover:block">RESET</span>
                    </button>

                    <div className="flex items-center gap-3 px-3 py-1.5 bg-slate-900/50 rounded-lg border border-white/5">
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Wallet</span>
                        <CostTicker amount={0.0341} />
                    </div>

                    <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                        SYSTEM_OPTIMAL
                    </div>

                    <div className="w-8 h-8 rounded-full bg-gradient-to-b from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center hover:border-blue-500/50 transition-colors cursor-pointer">
                        <span className="text-xs">D</span>
                    </div>
                </div>
            </header>

            <div className="space-y-6 max-w-[1800px] mx-auto px-6 py-8">

                {/* SECTION 1: SYSTEM OVERVIEW (Collapsible, Default: Open) */}
                <DashboardSection title="System Overview & Control" icon="ðŸ“Š" defaultOpen={true}>
                    <div className="p-4 space-y-6">
                        {/* KPI ROW */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <DashboardWidget title="MRR (Live)" value="$0.00" trend="+0%" icon="ðŸ’°" color="blue" />
                            <DashboardWidget title="Agents Online" value="4/4" trend="Active" icon="ðŸ¤–" color="emerald" />
                            <KnowledgeNode />
                        </div>

                        {/* COCKPIT & MAP */}
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                            <Cockpit />
                            <SystemMap onNodeSelect={scrollToAgent} />
                        </div>
                    </div>
                </DashboardSection>

                {/* SECTION 2: THE COCKPIT (Orion & Calliope) */}
                <div className="grid grid-cols-12 gap-6 h-[650px]">

                    {/* LEFT: STRATEGIST (ORION) */}
                    <div className="col-span-12 xl:col-span-7 h-full">
                        <OrionModule
                            status={systemContext?.agents?.['ORION']?.status || 'idle' as any}
                            data={systemContext?.agents?.['ORION']?.data || null}
                            onRun={(input) => handleOrionRun(input)}
                            onReset={() => setOrionState({ status: 'idle', data: null })}
                        />
                    </div>

                    {/* RIGHT: CREATOR (CALLIOPE) */}
                    <div className="col-span-12 xl:col-span-5 h-full">
                        <CalliopeModule
                            status={systemContext?.agents?.['CALLIOPE']?.status || 'idle' as any}
                            data={systemContext?.agents?.['CALLIOPE']?.data || null}
                            onRun={handleCalliopeRun}
                        />
                    </div>
                </div>

                {/* SECTION 3: SYSTEM ADMIN (Nucleus Legacy) */}
                <DashboardSection title="Nucleus & Telemetry" icon="ðŸ›¡ï¸" defaultOpen={false}>
                    <div className="grid grid-cols-1 p-4">
                        <div className="h-[400px]">
                            {/* Corrected: Replaced by NucleusPanel */}
                            <NucleusPanel />
                        </div>
                    </div>
                </DashboardSection>

            </div>
        </main>
    );
}

export default function DashboardPage() {
    return (
        <AgentProvider>
            <DashboardContent />
        </AgentProvider>
    );
}
