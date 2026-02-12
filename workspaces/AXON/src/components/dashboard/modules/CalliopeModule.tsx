import React, { useState, useRef, useEffect } from 'react';
import { AgentStatus, CalliopeOutput } from '@/types/agent_types';

interface CalliopeModuleProps {
    status: AgentStatus;
    data: CalliopeOutput | null;
    onRun: () => void;
}

// --- MICRO COMPONENTS ---

const StoryboardFrame = ({ scene, index }: { scene: any, index: number }) => (
    <div className="group relative p-3 bg-slate-900/50 border border-slate-800 rounded-lg hover:bg-slate-800/80 transition-all cursor-pointer">
        <div className="absolute top-2 right-2 text-[9px] font-mono text-slate-500 group-hover:text-purple-400">
            {scene.duration}s
        </div>
        <div className="mb-2 flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-purple-900/40 text-purple-400 flex items-center justify-center text-[9px] font-bold">
                {index + 1}
            </div>
            <span className="text-[10px] text-slate-400 uppercase font-bold truncate w-24">
                {scene.visual_cue.slice(0, 15)}...
            </span>
        </div>
        <div className="text-[10px] text-slate-500 leading-snug line-clamp-3 font-mono">
            {scene.description}
        </div>
    </div>
);

const TimelineBar = ({ duration }: { duration: number }) => {
    // Mock duration max 120s for bar calc
    const pc = Math.min((duration / 120) * 100, 100);
    return (
        <div className="h-full flex items-center px-4 gap-4 bg-[#0A0B10] border-t border-slate-800">
            <div className="text-[10px] font-mono text-slate-500 w-16 text-right">00:00</div>
            <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div style={{ width: `${pc}%` }} className="h-full bg-gradient-to-r from-purple-600 to-blue-500 shadow-[0_0_10px_rgba(168,85,247,0.4)]"></div>
            </div>
            <div className="text-[10px] font-mono text-purple-400 w-16 font-bold">{duration}s</div>
        </div>
    );
};

// --- MAIN MODULE ---

export const CalliopeModule: React.FC<CalliopeModuleProps> = ({ status, data, onRun }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom of script on load
    useEffect(() => {
        if (data && scrollRef.current) {
            scrollRef.current.scrollTop = 0;
        }
    }, [data]);

    return (
        <div className="relative w-full h-full min-h-[500px] bg-[#050505] border border-slate-800/50 rounded-2xl overflow-hidden flex flex-col shadow-2xl shadow-black/50 ring-1 ring-white/5">

            {/* HEADER */}
            <div className="h-12 bg-gradient-to-r from-slate-900 via-[#0A0B10] to-slate-900 border-b border-white/5 flex items-center justify-between px-4 backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full shadow-[0_0_10px_currentColor] ${status === 'active' ? 'bg-purple-500 text-purple-500 animate-pulse' : 'bg-slate-700 text-slate-700'}`}></div>
                    <span className="text-xs font-bold tracking-[0.2em] text-slate-300">CALLIOPE <span className="text-purple-500">//</span> CREATOR</span>
                </div>
                {status === 'active' && <div className="text-[9px] font-mono text-purple-400 animate-pulse">GENERATING_ASSETS...</div>}

                {data && (
                    <div className="text-[9px] font-mono text-slate-500 flex gap-2">
                        <span>WORDS: {data.final_script.split(' ').length}</span>
                        <span className="text-slate-700">|</span>
                        <span>SCENES: {data.scenes.length}</span>
                    </div>
                )}
            </div>

            <div className="flex-1 relative overflow-hidden flex flex-col">

                {/* IDLE STATE: HANDOFF SLOT */}
                {status === 'idle' && !data && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
                        <div
                            onClick={onRun}
                            className="w-full h-32 border-2 border-dashed border-slate-800 hover:border-purple-500/50 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all group bg-slate-900/20 hover:bg-slate-900/40"
                        >
                            <div className="w-12 h-12 rounded-full bg-slate-800 group-hover:bg-purple-900/30 flex items-center justify-center mb-3 transition-colors">
                                <span className="text-2xl opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-transform">📥</span>
                            </div>
                            <span className="text-xs font-bold text-slate-500 group-hover:text-purple-300 tracking-wider">
                                DROP MANIFEST TO GENERATE
                            </span>
                        </div>
                        <div className="mt-4 text-[10px] text-slate-600 font-mono">
                            Or "Approve" from Strategist to auto-fill.
                        </div>
                    </div>
                )}

                {/* PROCESSING STATE */}
                {(status === 'active' || status === 'processing') && (
                    <div className="absolute inset-0 bg-black/90 z-20 flex flex-col items-center justify-center backdrop-blur-sm">
                        <div className="font-mono text-xs text-purple-400 mb-4 animate-pulse">WRITING SCRIPT SEQUENCES...</div>
                        <div className="w-64 h-1 bg-slate-900 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-600 animate-[shimmer_2s_infinite] w-2/3"></div>
                        </div>
                    </div>
                )}

                {/* COMPLETED STATE: WORKSPACE SPLIT */}
                {status === 'completed' && data && (
                    <div className="flex-1 flex overflow-hidden animate-in slide-in-from-bottom-4 duration-500">

                        {/* LEFT: STORYBOARD RAIL */}
                        <div className="w-48 border-r border-white/5 bg-[#08090E] overflow-y-auto p-3 space-y-3 custom-scrollbar">
                            <div className="text-[9px] uppercase tracking-widest text-slate-600 font-bold mb-2 pl-1">Storyboard</div>
                            {data.scenes.map((scene, idx) => (
                                <StoryboardFrame key={idx} scene={scene} index={idx} />
                            ))}
                        </div>

                        {/* RIGHT: SCRIPT EDITOR */}
                        <div className="flex-1 bg-[#050505] flex flex-col min-w-0">
                            <div className="flex-1 overflow-y-auto p-6 font-mono text-sm leading-relaxed custom-scrollbar" ref={scrollRef}>
                                <div className="max-w-2xl mx-auto">
                                    {/* Render simpler version or raw markdown? Raw logic used for now. */}
                                    <pre className="whitespace-pre-wrap text-slate-300 font-mono">
                                        {data.final_script}
                                    </pre>
                                </div>
                            </div>

                            {/* BOTTOM TIMELINE */}
                            <div className="h-8 shrink-0">
                                <TimelineBar duration={data.estimated_duration} />
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
};
