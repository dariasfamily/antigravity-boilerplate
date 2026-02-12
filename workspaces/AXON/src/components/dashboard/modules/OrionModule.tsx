import React, { useState } from 'react';
import { AgentStatus, OrionManifest } from '@/types/agent_types';

interface OrionModuleProps {
    status: AgentStatus;
    data: OrionManifest | null;
    onRun: (input: any) => void;
    onReset: () => void;
}

// --- MICRO COMPONENTS ---

const ViralityGauge = ({ score }: { score: number }) => {
    // Color logic: Red (<5) -> Yellow (5-7) -> Green (>8)
    const color = score >= 8 ? 'text-emerald-400' : score >= 5 ? 'text-yellow-400' : 'text-rose-500';
    const glow = score >= 8 ? 'shadow-[0_0_20px_rgba(52,211,153,0.6)]' : '';
    const circumference = 2 * Math.PI * 40;
    const offset = circumference - (score / 10) * circumference;

    return (
        <div className="relative w-32 h-32 flex items-center justify-center">
            {/* Background Circle */}
            <svg className="w-full h-full transform -rotate-90">
                <circle cx="64" cy="64" r="40" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-slate-800" />
                <circle
                    cx="64" cy="64" r="40"
                    stroke="currentColor" strokeWidth="6" fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    className={`transition-all duration-1000 ease-out ${color} ${glow} drop-shadow-lg`}
                />
            </svg>
            <div className="absolute flex flex-col items-center">
                <span className={`text-3xl font-black ${color}`}>{score}</span>
                <span className="text-[9px] uppercase tracking-widest text-slate-500">VIRALITY</span>
            </div>
        </div>
    );
};

const ChipInput = ({ values, onChange }: { values: string[], onChange: (v: string[]) => void }) => {
    const [curr, setCurr] = useState('');
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && curr.trim()) {
            onChange([...values, curr.trim()]);
            setCurr('');
        }
    };
    return (
        <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-blue-400 font-bold">Target Vectors (Topics)</label>
            <div className="flex flex-wrap gap-2 bg-[#0A0B10] border border-slate-800 p-2 rounded-lg focus-within:border-blue-500/50 transition-colors">
                {values.map((v, i) => (
                    <span key={i} className="px-2 py-1 text-xs bg-blue-900/20 text-blue-300 border border-blue-500/20 rounded flex items-center gap-1">
                        {v}
                        <button onClick={() => onChange(values.filter((_, idx) => idx !== i))} className="hover:text-white">×</button>
                    </span>
                ))}
                <input
                    type="text"
                    value={curr}
                    onChange={(e) => setCurr(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={values.length === 0 ? "Type & Enter..." : ""}
                    className="bg-transparent outline-none text-xs text-slate-200 min-w-[100px] flex-1"
                />
            </div>
        </div>
    );
};

// --- MAIN MODULE ---

export const OrionModule: React.FC<OrionModuleProps> = ({ status, data, onRun, onReset }) => {
    // 1. INPUT STATE
    const [topics, setTopics] = useState<string[]>(['AI Automation', 'Future of Work']);
    const [platform, setPlatform] = useState('YouTube Shorts');
    const [tone, setTone] = useState(50); // 0 (Authoritative) -> 100 (Gonzo)
    const [budget, setBudget] = useState('Bootstrap');

    // 2. HANDLER
    const handleRun = () => {
        onRun({
            topic_keywords: topics,
            content_spec: { target_platform: platform },
            brand_profile: { tone: tone > 75 ? 'Gonzo' : tone > 25 ? 'Balanced' : 'Authoritative' }
        });
    };

    return (
        <div className="relative w-full h-full min-h-[500px] bg-[#050505] border border-slate-800/50 rounded-2xl overflow-hidden flex flex-col shadow-2xl shadow-black/50 ring-1 ring-white/5">

            {/* HEADER */}
            <div className="h-12 bg-gradient-to-r from-slate-900 via-[#0A0B10] to-slate-900 border-b border-white/5 flex items-center justify-between px-4 backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full shadow-[0_0_10px_currentColor] ${status === 'active' ? 'bg-blue-500 text-blue-500 animate-pulse' : 'bg-slate-700 text-slate-700'}`}></div>
                    <span className="text-xs font-bold tracking-[0.2em] text-slate-300">ORION <span className="text-blue-500">//</span> STRATEGIST</span>
                </div>
                {status === 'active' && <div className="text-[9px] font-mono text-blue-400 animate-pulse">NEURAL_SCAN::ACTIVE</div>}
            </div>

            <div className="flex-1 relative p-6">

                {/* IDLE STATE: COMMAND CENTER */}
                {status === 'idle' && !data && (
                    <div className="h-full flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-300">
                        {/* INPUTS */}
                        <ChipInput values={topics} onChange={setTopics} />

                        {/* CONTROLS GRID */}
                        <div className="grid grid-cols-2 gap-6">
                            {/* TONE SLIDER */}
                            <div className="space-y-3">
                                <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold text-slate-500">
                                    <span>Authoritative</span>
                                    <span className="text-blue-400">Gonzo</span>
                                </div>
                                <input
                                    type="range" min="0" max="100" value={tone}
                                    onChange={(e) => setTone(parseInt(e.target.value))}
                                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                />
                                <div className="flex justify-between text-[9px] font-mono text-slate-600">
                                    <span>PROFESSIONAL</span>
                                    <span>UNHINGED</span>
                                </div>
                            </div>

                            {/* PLATFORM SELECTOR */}
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Platform</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {['YouTube Shorts', 'TikTok', 'LinkedIn'].map(p => (
                                        <button
                                            key={p}
                                            onClick={() => setPlatform(p)}
                                            className={`p-2 text-[9px] font-bold rounded border transition-all ${platform === p ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/20' : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'}`}
                                        >
                                            {p.split(' ')[0]}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex-1"></div>

                        {/* ACTION */}
                        <button
                            onClick={handleRun}
                            className="w-full py-4 bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white font-bold tracking-widest text-xs rounded-xl shadow-[0_0_30px_rgba(37,99,235,0.3)] transition-all transform hover:scale-[1.02] border-t border-white/20"
                        >
                            INITIATE STRATEGY SEQUENCE
                        </button>
                    </div>
                )}

                {/* ACTIVE STATE: SCANNING */}
                {(status === 'active' || status === 'processing') && (
                    <div className="absolute inset-0 z-20 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center">
                        <div className="relative">
                            <div className="w-24 h-24 border-t-2 border-l-2 border-blue-500 rounded-full animate-spin"></div>
                            <div className="absolute inset-0 border-r-2 border-b-2 border-slate-800 rounded-full animate-spin-slow"></div>
                            <div className="absolute inset-4 bg-blue-500/10 rounded-full animate-pulse shadow-[0_0_40px_rgba(59,130,246,0.5)]"></div>
                        </div>
                        <div className="mt-8 font-mono text-blue-400 text-xs tracking-widest flex flex-col items-center gap-1">
                            <span>ANALYZING {topics.length} VECTORS</span>
                            <span className="text-slate-600">CALCULATING VIRALITY PROBABILITY...</span>
                        </div>
                    </div>
                )}

                {/* COMPLETED STATE: MANIFEST DECK */}
                {status === 'completed' && data && (
                    <div className="h-full flex flex-col gap-4 animate-in slide-in-from-bottom-4 duration-500">
                        {/* TOP: METRICS ROW */}
                        <div className="flex items-center justify-between bg-[#0A0B10] p-4 rounded-xl border border-slate-800/50">
                            <ViralityGauge score={data.meta.predicted_virality} />

                            <div className="flex-1 flex justify-around pl-6 border-l border-slate-800">
                                <div className="flex flex-col items-center gap-1">
                                    <span className="text-[10px] text-slate-500 uppercase tracking-wider">Trend</span>
                                    <span className={`text-lg font-bold ${data.meta.trend_direction.includes('RISING') ? 'text-emerald-400' : 'text-slate-200'}`}>
                                        {data.meta.trend_direction}
                                    </span>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <span className="text-[10px] text-slate-500 uppercase tracking-wider">Est. RPM</span>
                                    <span className="text-lg font-bold text-emerald-400 shadow-emerald-500/20 drop-shadow">
                                        ${data.financial_projection.estimated_rpm}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* MIDDLE: CONTENT CORE */}
                        <div className="flex-1 bg-gradient-to-b from-[#0F111A] to-[#0A0B10] rounded-xl border border-slate-700/50 p-5 relative group overflow-hidden">
                            <div className="absolute top-0 right-0 p-2 opacity-50 text-[100px] leading-none text-white/5 font-black pointer-events-none -mr-4 -mt-4">
                                V3
                            </div>

                            <div className="space-y-4 relative z-10">
                                <div>
                                    <div className="text-[9px] text-blue-400 uppercase tracking-widest mb-1">Winning Concept</div>
                                    <h3 className="text-lg font-bold text-white leading-tight">
                                        "{data.content_architecture.core_concept.title_variations[0]}"
                                    </h3>
                                </div>

                                <div className="space-y-3">
                                    <div className="bg-slate-900/50 p-3 rounded border-l-2 border-blue-500">
                                        <div className="text-[9px] text-slate-500 mb-1 font-bold">PRIMARY HOOK</div>
                                        <div className="text-sm text-slate-300 italic">
                                            "{data.content_architecture.core_concept.hooks.primary.script_variants[0]}"
                                        </div>
                                    </div>
                                    <div className="bg-slate-900/50 p-3 rounded border-l-2 border-purple-500">
                                        <div className="text-[9px] text-slate-500 mb-1 font-bold">EMOTIONAL TARGET</div>
                                        <div className="text-sm text-purple-300">
                                            {data.content_architecture.core_concept.emotional_target}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* BOTTOM ACTIONS */}
                        <div className="flex gap-3">
                            <button onClick={onReset} className="px-4 py-3 rounded-lg border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-xs font-bold w-1/3">
                                REJECT
                            </button>
                            <button className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg shadow-lg shadow-emerald-500/20 text-xs font-bold tracking-widest transition-all hover:scale-[1.02]">
                                APPROVE MANIFEST
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
