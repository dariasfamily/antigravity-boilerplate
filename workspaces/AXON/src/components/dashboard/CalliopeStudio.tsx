'use client';
import { useState } from 'react';
import { useAgentContext } from '@/context/AgentContext';
import { OrionBrief } from '@/types/agent_types';

export default function CalliopeStudio() {
    const { activeBrief, addLog } = useAgentContext();
    const [briefJson, setBriefJson] = useState('');
    const [script, setScript] = useState('');
    const [loading, setLoading] = useState(false);
    const [veraScore, setVeraScore] = useState<any>(null);

    // MOCK: Import from Orion (Simulated)
    const importFromOrion = async () => {
        // 1. Try Context First (System Bridge)
        if (activeBrief) {
            setBriefJson(JSON.stringify(activeBrief, null, 2));
            addLog('CALLIOPE', 'BRIEF_IMPORTED', 'SUCCESS', `Imported Brief via System Channel: "${activeBrief.core_idea.topic}"`);
            return;
        }

        // 2. Fallback to Clipboard (Manual Override)
        try {
            const text = await navigator.clipboard.readText();
            if (text && text.includes("core_idea")) {
                setBriefJson(text);
                addLog('CALLIOPE', 'BRIEF_IMPORTED', 'SUCCESS', `Imported Brief from Clipboard.`);
            } else {
                alert("Clipboard is empty or invalid JSON!\nManual Override: Using Default Mock.");
                const mockBrief: OrionBrief = {
                    meta: { id: 'mock', timestamp: new Date().toISOString(), status: 'approved' },
                    core_idea: { topic: "AI Agents for Passive Income", pose_validation: { persona_match: "High", evidence: "Strong", score: 98 } },
                    execution_guide: {
                        hook_strategy: { verbal: "Stop coding features.", visual: "Coder sleeping", thin_slice_check: "OK" },
                        retention_structure: { loop_1: "The unexpected stack", loop_2: "Revenue dashboard reveal" },
                        seo_keywords: ["saas", "indie hacker", "automation"],
                        rpm_estimate: "$25.00"
                    },
                    constraints: { format: "Reel", duration: "60s" }
                };
                setBriefJson(JSON.stringify(mockBrief, null, 2));
                addLog('CALLIOPE', 'BRIEF_IMPORTED', 'WARNING', `Using default mock data.`);
            }
        } catch (e) {
            console.error("Clipboard access failed:", e);
        }
    };

    const generateScript = async () => {
        if (!briefJson) return;
        setLoading(true);
        addLog('CALLIOPE', 'SCRIPT_GENERATION_STARTED', 'INFO', `Processing V.E.R.A Framework...`);

        // SIMULATION: In Signal Mode, we would call the Python Handler via API
        await new Promise(r => setTimeout(r, 2000));

        let brief: OrionBrief;
        try {
            brief = JSON.parse(briefJson);
        } catch (e) {
            setLoading(false);
            alert("Invalid JSON Brief");
            return;
        }

        const topic = brief.core_idea.topic;
        const visualHook = brief.execution_guide.hook_strategy.visual;
        const verbalHook = brief.execution_guide.hook_strategy.verbal;
        const rpm = brief.execution_guide.rpm_estimate;
        const constraints = brief.constraints || { format: 'Reel', duration: '60s' };

        const generatedScript = `# 🎬 SCRIPT: ${topic.toUpperCase()}
**Format**: ${constraints.format} (${constraints.duration})
**Tone**: Reluctant Guru
**Estimated RPM**: ${rpm}

## 0:00 - 0:03 | THE HOOK
**[VISUAL]**: ${visualHook}
**[AUDIO]**: "${verbalHook}"
**[TEXT]**: STOP TRADING TIME (Red)

## 0:03 - 0:15 | THE REFRAME
Most people think ${topic} is hard. That's a trap.
You need to build a "Self-Funding Organism".
Here is the stack I used:

1. **Orion** (Strategy)
2. **Calliope** (Traffic)
3. **Stripe** (Collection)

## 0:15 - 0:45 | THE VALUE
(Explain the loop for ${topic}...)
${brief.execution_guide.retention_structure?.loop_1 ? `\n> Loop 1: ${brief.execution_guide.retention_structure.loop_1}` : ''}
${brief.execution_guide.retention_structure?.loop_2 ? `\n> Loop 2: ${brief.execution_guide.retention_structure.loop_2}` : ''}

## 0:45 | THE CLOSE
I documented the full protocol.
Comment "${brief.execution_guide.seo_keywords?.[0]?.toUpperCase() || 'BLUEPRINT'}" and I'll DM it to you.
`;
        setScript(generatedScript);
        setVeraScore({ value: 95, emotion: "Greed/Curiosity", retention: "High (3 Loops)" });
        setLoading(false);
        addLog('CALLIOPE', 'SCRIPT_GENERATION_COMPLETE', 'SUCCESS', `Script generated for "${topic}". V.E.R.A Score: 95/100.`);
    };

    return (
        <div className="w-full h-full p-6 bg-slate-900/50 rounded-xl border border-slate-700/50 backdrop-blur-sm flex flex-col gap-6">

            {/* HEADER */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-pink-400 flex items-center gap-2">
                        <span>🎭</span> CALLIOPE STUDIO
                    </h2>
                    <p className="text-xs text-slate-400">Attention Engineer • Scripting Mode</p>
                </div>
                <div className="px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-xs text-pink-300">
                    Status: ACTIVE
                </div>
            </div>

            {/* INPUT SECTION */}
            <div className="flex gap-4 h-32">
                <div className="flex-1 relative">
                    <textarea
                        value={briefJson}
                        onChange={(e) => setBriefJson(e.target.value)}
                        placeholder="Paste Orion Brief JSON here..."
                        className="w-full h-full bg-black/40 border border-slate-700 rounded-lg p-3 text-[10px] font-mono text-slate-400 focus:outline-none focus:border-pink-500 resize-none"
                    />
                    {!briefJson && (
                        <button
                            onClick={importFromOrion}
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded text-xs text-slate-300 transition-colors"
                        >
                            {activeBrief ? '📥 Import from System Context' : '📥 Import Last Orion Brief'}
                        </button>
                    )}
                </div>
                <button
                    onClick={generateScript}
                    disabled={loading || !briefJson}
                    className="w-32 bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex flex-col items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <div className="w-6 h-6 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
                            <span className="text-[10px]">Processing...</span>
                        </>
                    ) : (
                        <>
                            <span className="text-2xl">✨</span>
                            <span className="text-xs">GENERATE SCRIPT</span>
                        </>
                    )}
                </button>
            </div>

            {/* OUTPUT EDITOR */}
            <div className="flex-1 bg-black/20 rounded-lg p-4 font-mono text-sm overflow-hidden flex flex-col border border-slate-800 relative">
                {!script && !loading && (
                    <div className="h-full flex items-center justify-center text-slate-600 flex-col gap-2">
                        <span className="text-2xl opacity-20">📝</span>
                        <p className="text-sm">Waiting for Strategic Input...</p>
                    </div>
                )}

                {script && (
                    <div className="flex-1 flex flex-col h-full">
                        {/* VERA SCOREBOARD */}
                        <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-700/50">
                            <div className="text-xs text-slate-400">
                                <span className="text-white font-bold mr-2">V.E.R.A CHECK:</span>
                                {veraScore.emotion} • {veraScore.retention}
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] uppercase text-slate-500">Retention Score:</span>
                                <span className="text-xl font-bold text-emerald-400">{veraScore.value}/100</span>
                            </div>
                        </div>

                        {/* SCRIPT EDITOR */}
                        <textarea
                            value={script}
                            onChange={(e) => setScript(e.target.value)}
                            className="flex-1 bg-transparent text-slate-300 text-sm focus:outline-none resize-none custom-scrollbar leading-relaxed"
                        />

                        {/* EXPORT ACTIONS */}
                        <div className="mt-4 pt-4 border-t border-slate-800 flex justify-end gap-3">
                            <button className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors">
                                SAVE TO DISK
                            </button>
                            <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded shadow-lg shadow-emerald-900/20 transition-all">
                                🎬 SEND TO PRODUCTION
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
