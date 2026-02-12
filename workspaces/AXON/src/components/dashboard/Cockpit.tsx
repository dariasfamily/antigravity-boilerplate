
'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { SystemState, AgentStatus, AgentConfiguration } from '@/types/agent_types'
import AgentChecklist from './AgentChecklist'
import { AgentControlPanel } from './AgentControlPanel'

// Define a type for the new agents state structure
type AgentsStateMap = {
    [key: string]: SystemState & { data?: any };
}

export default function Cockpit() {
    // Changed agents state from array to a map for direct access by agent_id
    // Added 'data' field to hold the transient output (The "Artifact")
    const [agents, setAgents] = useState<AgentsStateMap>({})
    const [loading, setLoading] = useState(true)
    const [orionTopic, setOrionTopic] = useState("")
    const supabase = createClient()

    useEffect(() => {
        fetchAgents()

        // Realtime Subscription
        const channel = supabase
            .channel('system_state_changes')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'system_state' },
                (payload) => {
                    fetchAgents() // Refresh on any change
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [])

    const fetchAgents = async () => {
        const { data, error } = await supabase
            .from('system_state')
            .select('*')
            .order('agent_id')

        if (data) {
            // Transform array data into the map structure
            const agentsMap: AgentsStateMap = {}
            data.forEach(agent => {
                // Preserve existing local data if re-fetching (to keep the flow alive)
                const existingData = agents[agent.agent_id.toUpperCase()]?.data || null;
                agentsMap[agent.agent_id.toUpperCase()] = {
                    ...agent,
                    logs: agent.logs || [],
                    data: existingData
                }
            })
            setAgents(prev => {
                // Merge to avoid losing local state like 'data' which isn't in DB yet
                const merged = { ...agentsMap };
                Object.keys(prev).forEach(key => {
                    if (merged[key]) {
                        merged[key].data = prev[key].data || merged[key].data;
                    }
                });
                return merged;
            })
        }
        setLoading(false)
    }

    // --- AGENT EXECUTION HANDLERS ---

    const runOrion = async () => {
        // 1. UI Feedback
        updateAgentLocal('ORION', 'processing');

        try {
            // 2. Call API
            const res = await fetch('/api/agents/orion', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic: orionTopic })
            });
            const data = await res.json();

            // 3. Update State & DB
            if (data.strategic_brief) {
                updateAgentLocal('ORION', 'active', data, [`Synthesized Brief: ${data.strategic_brief.topic}`]);
            }
        } catch (e) {
            updateAgentLocal('ORION', 'error', null, ['Synthesis Failed']);
        }
    }

    const runCalliope = async () => {
        const orionData = agents['ORION']?.data;
        if (!orionData) {
            alert("Calliope needs Orion's output first!");
            return;
        }

        updateAgentLocal('CALLIOPE', 'processing');
        try {
            const res = await fetch('/api/agents/calliope', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orion_brief: orionData })
            });
            const data = await res.json();

            if (data.script_content) {
                updateAgentLocal('CALLIOPE', 'active', data, [`Drafted Script: ${data.metadata.title}`]);
            }
        } catch (e) {
            updateAgentLocal('CALLIOPE', 'error', null, ['Scripting Failed']);
        }
    }

    const runArgus = async () => {
        const calliopeData = agents['CALLIOPE']?.data;
        if (!calliopeData) {
            alert("Argus needs Calliope's script first!");
            return;
        }

        updateAgentLocal('ARGUS', 'processing');
        try {
            const res = await fetch('/api/agents/argus', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(calliopeData)
            });
            const data = await res.json(); // ArgusOutput_Contract wrapper

            const verdict = data.ArgusOutput_Contract?.final_verdict?.status || "UNKNOWN";
            updateAgentLocal('ARGUS', 'active', data, [`Audit Complete. Verdict: ${verdict}`]);

        } catch (e) {
            updateAgentLocal('ARGUS', 'error', null, ['Audit Failed']);
        }
    }

    // Helper to update local state and Supabase logs
    const updateAgentLocal = async (id: string, status: AgentStatus, data: any = null, newLog: string[] = []) => {
        setAgents(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                status: status,
                data: data || prev[id]?.data,
                logs: [...(prev[id]?.logs || []), ...newLog]
            }
        }));

        if (newLog.length > 0) {
            // Push log to DB (simplified, ideally we append)
            // For now just update status to keep UI in sync
            await supabase.from('system_state').update({
                status: status,
                // In a real app we'd append logs to a logs table, here we just touch the row
            }).eq('agent_id', id.toLowerCase());
        }
    }

    const updateAgentStatus = (id: string, status: AgentStatus) => {
        updateAgentLocal(id, status);
    }

    const updateAgentConfig = (id: string, config: AgentConfiguration) => {
        setAgents(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                config: config
            }
        }));
    }


    const panicStop = async () => {
        const confirmed = window.confirm("⚠️ COMMANDER: CONFIRM PANIC STOP? All agents will be PAUSED.")
        if (!confirmed) return

        await supabase
            .from('system_state')
            .update({ control_signal: 'stop', status: 'paused' })
            .neq('agent_id', 'sys_admin') // Don't stop the admin/system itself if it existed

        fetchAgents()
    }

    if (loading) return <div className="animate-pulse text-emerald-500 font-mono">INITIALIZING COCKPIT...</div>

    return (
        <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                    SYSTEM REGISTRY (LIVE)
                </h2>
                <div className="flex gap-3">
                    <Link
                        href="/dashboard/vault"
                        className="px-4 py-2 bg-slate-800/50 border border-slate-700 text-slate-400 rounded hover:bg-slate-800 hover:text-white transition-colors font-mono text-xs flex items-center gap-2"
                    >
                        🔒 VAULT
                    </Link>
                    <button
                        onClick={panicStop}
                        className="px-4 py-2 bg-red-900/30 border border-red-500/50 text-red-400 rounded hover:bg-red-900/50 transition-colors font-mono text-xs flex items-center gap-2"
                    >
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                        PANIC STOP
                    </button>
                </div>
            </div>

            {/* AGENT WORKSPACE - CONTROL PANELS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* ORION */}
                <AgentControlPanel
                    agentName="ORION"
                    status={agents?.ORION?.status || 'idle'}
                    config={agents?.ORION?.config || { selected_output_format: 'JSON', timeout_seconds: 60, auto_proceed: false, output_format_options: ['JSON'] }}
                    logs={agents?.ORION?.logs || []}
                    onConfigChange={(c) => updateAgentConfig('ORION', c)}
                    onAction={(action) => {
                        if (action === 'START') runOrion();
                        if (action === 'STOP') updateAgentStatus('ORION', 'idle');
                    }}
                    customInputFields={
                        <div>
                            <label className="text-xs text-slate-500 mb-1 block">Topic / Strategy Focus</label>
                            <input
                                type="text"
                                placeholder="Enter Topic..."
                                className="w-full bg-black/50 border border-slate-700 rounded px-2 py-1 text-xs text-white focus:border-blue-500 outline-none"
                                value={orionTopic}
                                onChange={(e) => setOrionTopic(e.target.value)}
                            />
                        </div>
                    }
                />

                {/* CALLIOPE */}
                <AgentControlPanel
                    agentName="CALLIOPE"
                    status={agents?.CALLIOPE?.status || 'idle'}
                    config={agents?.CALLIOPE?.config || { selected_output_format: 'Markdown', timeout_seconds: 60, auto_proceed: false, output_format_options: ['Markdown', 'Topical Script'] }}
                    logs={agents?.CALLIOPE?.logs || []}
                    onConfigChange={(c) => updateAgentConfig('CALLIOPE', c)}
                    onAction={(action) => {
                        if (action === 'START') runCalliope();
                        if (action === 'STOP') updateAgentStatus('CALLIOPE', 'idle');
                    }}
                    customInputFields={
                        <div className="text-xs text-slate-500 italic">
                            {agents['ORION']?.data ? "✅ Brief Received from ORION" : "Waiting for ORION brief..."}
                        </div>
                    }
                />

                {/* ARGUS */}
                <AgentControlPanel
                    agentName="ARGUS"
                    status={agents?.ARGUS?.status || 'idle'}
                    config={agents?.ARGUS?.config || { selected_output_format: 'Report', timeout_seconds: 60, auto_proceed: true, output_format_options: ['Report', 'Json'] }}
                    logs={agents?.ARGUS?.logs || []}
                    onConfigChange={(c) => updateAgentConfig('ARGUS', c)}
                    onAction={(action) => {
                        if (action === 'START') runArgus();
                        if (action === 'STOP') updateAgentStatus('ARGUS', 'idle');
                        if (action === 'APPROVE') runArgus(); // Argus usually auto-runs or is approved
                    }}
                    customInputFields={
                        <div className="text-xs text-slate-500 italic">
                            {agents['CALLIOPE']?.data ? "✅ Script Ready for Audit" : "Waiting for Script..."}
                        </div>
                    }
                />

                {/* ECHO */}
                <AgentControlPanel
                    agentName="ECHO"
                    status={agents?.ECHO?.status || 'idle'}
                    config={agents?.ECHO?.config || { selected_output_format: 'Social Post', timeout_seconds: 60, auto_proceed: false, output_format_options: ['Social Post', 'Schedule'] }}
                    logs={agents?.ECHO?.logs || []}
                    onConfigChange={(c) => updateAgentConfig('ECHO', c)}
                    onAction={(action) => {
                        // Echo logic (placeholder)
                        console.log('ECHO Action:', action);
                    }}
                    customInputFields={
                        <div className="text-xs text-slate-500 italic">
                            Distribution Channels Connected
                        </div>
                    }
                />
            </div>

            {/* NEW: Workflow Checklist */}
            <AgentChecklist agents={agents} />
        </section>
    )
}
