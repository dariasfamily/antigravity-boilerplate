"use client";

import { useState, useRef, useEffect } from 'react';
import { Send, Terminal, Loader2 } from 'lucide-react';

export default function SystemChat() {
    const [input, setInput] = useState('');
    const [missionContext, setMissionContext] = useState<any>(null); // The Context Rail
    const [logs, setLogs] = useState<string[]>([
        "> AXON SYSTEM v6.0 INITIALIZED...",
        "> GAIA ORCHESTRATOR STANDBY.",
        "> WAITING FOR COMMAND..."
    ]);
    const [isProcessing, setIsProcessing] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    const handleCommand = async () => {
        if (!input.trim()) return;

        const cmd = input;
        setInput('');
        setLogs(prev => [...prev, `> USER: ${cmd}`]);
        setIsProcessing(true);

        // INTELLIGENT ROUTING SIMULATION
        setTimeout(() => {
            let response = "> CMD NOT RECOGNIZED.";

            // 1. ANALYSIS: DETECT INTENT
            if (cmd.toLowerCase().includes("video") || cmd.toLowerCase().includes("editor")) {
                // ACTIVATE CONTEXT RAIL: EXECUTION MODE
                const context = {
                    MISSION: "BUILD_VIDEO_EDITOR_RESOURCES",
                    MODE: "EXECUTION", // NOT Ideation
                    CONSTRAINTS: ["Production Grade", "No Theory"],
                    TEAM: ["PLANNER", "HEPHAESTUS", "THALIA"]
                };
                setMissionContext(context);

                setLogs(prev => [
                    ...prev,
                    `> GAIA: 🛡️ CONTEXT RAIL ACTIVATED [MODE: EXECUTION]`,
                    `> TARGET: ${context.MISSION}`,
                    `> TEAM ASSEMBLING: ${context.TEAM.join(', ')}...`,
                    `> [PLANNER]: Analyzing requirements for Video Editor...`,
                    `> [HEPHAESTUS]: Scaffolding FFMpeg Service... (Simulated)`,
                    `> [THALIA]: Generating UI Assets for Timeline... (Simulated)`,
                    `> SYSTEM: 🟢 TEAM DEPLOYED. WAITING FOR ARTIFACTS.`
                ]);
            }
            else if (cmd.includes("idea") || cmd.includes("business")) {
                // ACTIVATE CONTEXT RAIL: IDEATION MODE
                setLogs(prev => [
                    ...prev,
                    `> GAIA: 💡 CONTEXT RAIL ACTIVATED [MODE: IDEATION]`,
                    `> [ORION]: Generating Business Models...`
                ]);
            }
            else if (cmd.includes("/test")) {
                response = "> INITIATING DIAGNOSTIC SEQUENCE [L-6]...";
                setLogs(prev => [...prev, response]);
            }
            else {
                response = "> GAIA: SYSTEM ONLINE. PLEASE SPECIFY 'EXECUTION' OR 'IDEATION' TASK.";
                setLogs(prev => [...prev, response]);
            }

            setIsProcessing(false);
        }, 1000);
    };

    return (
        <div className="fixed bottom-6 right-6 w-96 h-96 glass-panel rounded-2xl flex flex-col overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] z-50 border-axon-border/50">
            {/* Header */}
            <div className="bg-black/40 p-3 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Terminal size={14} className="text-axon-neon" />
                    <span className="text-xs font-mono font-bold tracking-wider text-axon-neon">GAIA_TERMINAL</span>
                </div>
                {/* Mode Indicator */}
                {missionContext && (
                    <div className="px-2 py-0.5 rounded bg-axon-purple/20 border border-axon-purple/50 text-[10px] text-axon-purple font-bold">
                        {missionContext.MODE}
                    </div>
                )}
            </div>

            {/* Logs */}
            <div ref={scrollRef} className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-1 text-gray-300">
                {logs.map((log, i) => (
                    <div key={i} className={`break-words ${log.startsWith("> USER") ? "text-white" : log.includes("GAIA") ? "text-axon-neon" : "text-gray-400"}`}>
                        {log}
                    </div>
                ))}
                {isProcessing && (
                    <div className="flex items-center gap-2 text-axon-purple">
                        <Loader2 size={12} className="animate-spin" />
                        <span>PROCESSING...</span>
                    </div>
                )}
            </div>

            {/* Input */}
            <div className="p-3 bg-black/20 border-t border-white/10 flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCommand()}
                    placeholder="Command or Objective..."
                    className="flex-1 bg-transparent border-none outline-none text-sm font-mono text-white placeholder-gray-600"
                    autoFocus
                />
                <button
                    onClick={handleCommand}
                    className="p-1 hover:bg-white/10 rounded transition-colors text-axon-neon"
                >
                    <Send size={16} />
                </button>
            </div>
        </div>
    );
}
