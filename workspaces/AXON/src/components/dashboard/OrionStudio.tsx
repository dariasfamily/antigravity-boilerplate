'use client';
import { useState } from 'react';
import { useAgentContext } from '@/context/AgentContext';

export default function OrionStudio() {
    const { addLog, setActiveBrief } = useAgentContext();

    // STATE: INPUTS
    const [directive, setDirective] = useState('');
    const [contextOverride, setContextOverride] = useState('');
    const [showAdvancedInput, setShowAdvancedInput] = useState(false);

    // STATE: PROCESS
    const [loading, setLoading] = useState(false);

    // STATE: ANALYST REPORT
    const [analyzedIdeas, setAnalyzedIdeas] = useState<any[]>([]);
    const [selectedIdeaId, setSelectedIdeaId] = useState<string | null>(null);

    const runOrionBatch = async () => {
        setLoading(true);
        setAnalyzedIdeas([]);

        // FRACTAL PROTOCOL SIMULATION
        addLog('ORION', 'PROTOCOL_INIT', 'INFO', `Initializing Orion v3.0 (Fractal Architecture)...`);
        await new Promise(r => setTimeout(r, 800));

        addLog('ORION.RESEARCH_UNIT', 'DATA_INGESTION', 'INFO', `Scanning Perplexity/Trends for signal...`);
        await new Promise(r => setTimeout(r, 1000));

        addLog('ORION.VALIDATION_MATRIX', 'POSE_ANALYSIS', 'INFO', `Running P.O.S.E. v3 on 12 candidates...`);
        await new Promise(r => setTimeout(r, 800));

        let mockBatchResult = [];
        const input = directive.toLowerCase();

        if (input.includes('dinero') || input.includes('money') || input.includes('income')) {
            // WEALTH / FINANCE SCENARIO
            mockBatchResult = [
                {
                    id: "idea_1",
                    topic: "Arbitraje de Criptomonedas con IA",
                    status: "QUALIFIED",
                    rank: 1,
                    score: 97,
                    reason: "Alta demanda, nicho rentable, solución automatizada.",
                    brief: {
                        core_idea: { topic: "Arbitraje de Criptomonedas con IA", pose_validation: { persona_match: "High", evidence: "Trending", score: 97 } },
                        execution_guide: {
                            hook_strategy: { visual: "Gráfico de velas verdes subiendo rápido", verbal: "Tu dinero está durmiendo. Despiértalo.", thin_slice_check: "OK" },
                            retention_structure: { loop_1: "Explicar el gap de precios", loop_2: "Mostrar el bot en acción" },
                            seo_keywords: ["crypto", "arbitrage", "passive income"],
                            rpm_estimate: "$45.00"
                        },
                        constraints: { format: "Deep Dive", duration: "60s" }
                    }
                },
                {
                    id: "idea_2",
                    topic: "Dropshipping Automatizado 2.0",
                    status: "QUALIFIED",
                    rank: 2,
                    score: 91,
                    reason: "Modelo clásico renovado con agentes IA.",
                    brief: {
                        core_idea: { topic: "Dropshipping Automatizado 2.0", pose_validation: { persona_match: "Medium", evidence: "Consistent", score: 91 } },
                        execution_guide: {
                            hook_strategy: { visual: "Notificación de venta en móvil", verbal: "No toqué inventario en 30 días.", thin_slice_check: "OK" },
                            retention_structure: { loop_1: "El secreto del proveedor", loop_2: "La automatización de pedidos" },
                            seo_keywords: ["dropshipping", "ecommerce", "side hustle"],
                            rpm_estimate: "$25.00"
                        },
                        constraints: { format: "Reel", duration: "45s" }
                    }
                },
                { id: "idea_3", topic: "Freelancing vs Agency", status: "DISCARDED", score: 45, reason: "Saturado. Bajo RPM.", rank: 99 }
            ];
        } else if (input.includes('code') || input.includes('program') || input.includes('dev')) {
            // DEV SCENARIO (Default previous suggestions)
            mockBatchResult = [
                {
                    id: "idea_1",
                    topic: "AI Agents for Passive Income (Dev Edition)",
                    status: "QUALIFIED",
                    rank: 1,
                    score: 98,
                    reason: "Massive Pain Point for burned out devs.",
                    brief: {
                        core_idea: { topic: "AI Agents for Passive Income", pose_validation: { persona_match: "High", evidence: "Strong", score: 98 } },
                        execution_guide: {
                            hook_strategy: { visual: "Coder sleeping on keyboard", verbal: "Stop coding features. Build systems.", thin_slice_check: "OK" },
                            retention_structure: { loop_1: "The unexpected stack", loop_2: "Revenue dashboard reveal" },
                            seo_keywords: ["saas", "indie hacker", "automation"],
                            rpm_estimate: "$35.00"
                        },
                        constraints: { format: "Reel", duration: "60s" }
                    }
                },
                {
                    id: "idea_2",
                    topic: "Python GIL Removal",
                    status: "QUALIFIED",
                    rank: 2,
                    score: 88,
                    reason: "Technical trending topic.",
                    brief: {
                        core_idea: { topic: "Python GIL Removal", pose_validation: { persona_match: "High", evidence: "News", score: 88 } },
                        execution_guide: {
                            hook_strategy: { visual: "Multi-core CPU graph spiking", verbal: "Python is finally fast.", thin_slice_check: "OK" },
                            retention_structure: { loop_1: "How threads work now", loop_2: "Performance benchmark" },
                            seo_keywords: ["python", "performance", "coding"],
                            rpm_estimate: "$18.00"
                        },
                        constraints: { format: "Deep Dive", duration: "90s" }
                    }
                }
            ];
        } else {
            // GENERIC FALLBACK
            mockBatchResult = [
                {
                    id: "idea_1",
                    topic: `Analysis of: ${directive}`,
                    status: "QUALIFIED",
                    rank: 1,
                    score: 85,
                    reason: "Direct response to user query.",
                    brief: {
                        core_idea: { topic: directive, pose_validation: { persona_match: "Neutral", evidence: "N/A", score: 85 } },
                        execution_guide: {
                            hook_strategy: { visual: "Montage of relevant imagery", verbal: `Here is the truth about ${directive}.`, thin_slice_check: "OK" },
                            retention_structure: { loop_1: "The Core Problem", loop_2: "The Solution" },
                            seo_keywords: ["trend", "analysis", "insight"],
                            rpm_estimate: "$20.00"
                        },
                        constraints: { format: "Reel", duration: "60s" }
                    }
                },
                { id: "idea_noise", topic: "Generic Trend", status: "DISCARDED", score: 40, reason: "Too broad.", rank: 99 }
            ];
        }

        setAnalyzedIdeas(mockBatchResult);
        const topCandidate = mockBatchResult.find(i => i.status === 'QUALIFIED');
        if (topCandidate) setSelectedIdeaId(topCandidate.id);

        setLoading(false);
        addLog('ORION', 'BATCH_ANALYSIS_COMPLETE', 'SUCCESS', `Analysis complete. Generated ${mockBatchResult.length} strategies for "${directive}".`);
    };

    const handleApprove = () => {
        const selected = analyzedIdeas.find(i => i.id === selectedIdeaId);
        if (selected) {
            // 1. Set Context for Calliope
            setActiveBrief(selected.brief);

            // 2. Log Action
            addLog('ORION', 'STRATEGY_APPROVED', 'SUCCESS', `Approved: "${selected.topic}". Handoff to Calliope initiated.`);

            // 3. Fallback: Copy to clipboard
            navigator.clipboard.writeText(JSON.stringify(selected.brief, null, 2));
            alert(`APPROVED: "${selected.topic}"\n\nStrategy loaded into System Context & Clipboard.`);
        }
    };

    const selectedIdea = analyzedIdeas.find(i => i.id === selectedIdeaId);

    return (
        <div className="w-full h-full p-6 bg-slate-900/50 rounded-xl border border-slate-700/50 backdrop-blur-sm flex flex-col gap-6">

            {/* HEADER */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-blue-400 flex items-center gap-2">
                        <span>🌌</span> ORION STUDIO
                    </h2>
                    <p className="text-xs text-slate-400">Strategy & Research • Batch Analysis Mode</p>
                </div>
                <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300">
                    Status: ACTIVE
                </div>
            </div>

            {/* --- SECTION 1: INPUT CONTROL --- */}
            <div className="space-y-3 border-b border-slate-800 pb-6">
                <input
                    type="text"
                    value={directive}
                    onChange={(e) => setDirective(e.target.value)}
                    placeholder="Enter Strategic Topic (e.g. 'Analyze AI Trends')..."
                    className="w-full bg-black/40 border border-slate-700/80 rounded-lg px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-blue-500 font-mono"
                    onKeyDown={(e) => e.key === 'Enter' && runOrionBatch()}
                />

                <button
                    onClick={runOrionBatch}
                    disabled={loading || !directive}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm uppercase tracking-wide"
                >
                    {loading ? 'RUNNING BATCH ANALYSIS (P.O.S.E VALIDATION)...' : 'RUN STRATEGY PROTOCOL'}
                </button>
            </div>

            {/* --- SECTION 2: ANALYST REPORT --- */}
            <div className="flex-1 min-h-[300px] rounded-lg relative overflow-hidden flex gap-4">

                {!analyzedIdeas.length && !loading && (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-600 flex-col gap-2 border border-dashed border-slate-800 rounded-lg">
                        <span className="text-2xl opacity-20">📡</span>
                        <p className="text-sm">Waiting for Strategy Directive...</p>
                    </div>
                )}

                {loading && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur">
                        <div className="text-blue-500 animate-spin text-2xl mb-2">✦</div>
                        <p className="text-xs font-mono text-blue-300">FILTERING NOISE FROM SIGNAL...</p>
                        <p className="text-xs text-slate-500 mt-1">Checking Perplexity • Validating P.O.S.E • Estimating RPM</p>
                    </div>
                )}

                {/* LEFT: CANDIDATE LIST */}
                {analyzedIdeas.length > 0 && (
                    <div className="w-1/3 flex flex-col gap-2 overflow-y-auto pr-2 custom-scrollbar">
                        <h3 className="text-[10px] font-bold text-slate-500 uppercase sticky top-0 bg-slate-900 py-1">Top Qualified ({analyzedIdeas.filter(i => i.status === 'QUALIFIED').length})</h3>
                        {analyzedIdeas.filter(i => i.status === 'QUALIFIED').map(idea => (
                            <div
                                key={idea.id}
                                onClick={() => setSelectedIdeaId(idea.id)}
                                className={`p-3 rounded-lg border cursor-pointer transition-all ${selectedIdeaId === idea.id ? 'bg-blue-500/20 border-blue-500' : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'}`}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <span className={`text-xs font-bold ${selectedIdeaId === idea.id ? 'text-white' : 'text-slate-300'}`}>#{idea.rank} {idea.topic}</span>
                                    <span className="text-xs font-bold text-emerald-400">{idea.score}</span>
                                </div>
                                <p className="text-[10px] text-slate-400 line-clamp-2">{idea.reason}</p>
                            </div>
                        ))}

                        <h3 className="text-[10px] font-bold text-slate-500 uppercase mt-4 sticky top-0 bg-slate-900 py-1">Discarded / Noise</h3>
                        {analyzedIdeas.filter(i => i.status === 'DISCARDED').map(idea => (
                            <div key={idea.id} className="p-2 rounded border border-slate-800 bg-slate-900/50 opacity-60">
                                <div className="flex justify-between items-start">
                                    <span className="text-[10px] text-slate-500 line-through">{idea.topic}</span>
                                    <span className="text-[10px] text-red-900 font-bold">{idea.score}</span>
                                </div>
                                <p className="text-[10px] text-slate-600">{idea.reason}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* RIGHT: SELECTED BRIEF DETAILS */}
                {selectedIdea && (
                    <div className="flex-1 bg-slate-800/30 border border-slate-700 rounded-xl p-4 flex flex-col">
                        <div className="flex justify-between items-start border-b border-slate-700 pb-4 mb-4">
                            <div>
                                <div className="text-[10px] text-blue-400 uppercase tracking-widest font-bold mb-1">SELECTED STRATEGY</div>
                                <h2 className="text-xl font-bold text-white leading-tight">{selectedIdea.topic}</h2>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-emerald-500">{selectedIdea.score}</div>
                                <div className="text-[10px] text-slate-500 uppercase">P.O.S.E Score</div>
                            </div>
                        </div>

                        <div className="space-y-4 flex-1 overflow-y-auto">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 bg-black/20 rounded border border-slate-800">
                                    <label className="text-[10px] text-slate-500 uppercase">Rationale</label>
                                    <p className="text-xs text-slate-300 mt-1">{selectedIdea.reason}</p>
                                </div>
                                <div className="p-3 bg-black/20 rounded border border-slate-800">
                                    <label className="text-[10px] text-slate-500 uppercase">RPM Estimate</label>
                                    <p className="text-xs text-emerald-400 font-mono mt-1">{selectedIdea.brief?.execution_guide.rpm_estimate}</p>
                                </div>
                            </div>

                            <div className="p-3 bg-blue-900/10 border border-blue-500/20 rounded">
                                <label className="text-[10px] text-blue-300 uppercase block mb-2">Visual Hook Strategy</label>
                                <p className="text-sm text-white font-medium italic">"{selectedIdea.brief?.execution_guide.hook_strategy.visual}"</p>
                                <p className="text-xs text-blue-200 mt-2">Trigger: "{selectedIdea.brief?.execution_guide.hook_strategy.verbal}"</p>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-slate-700">
                            <button
                                onClick={handleApprove}
                                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-bold shadow-lg shadow-emerald-900/40 transition-all flex items-center justify-center gap-2"
                            >
                                <span>🚀</span> EXECUTE THIS STRATEGY (SEND TO CALLIOPE)
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
