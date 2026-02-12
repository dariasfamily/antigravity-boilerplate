"use client";

import { useState } from "react";
import AgentCard from "@/components/AgentCard";
import AtomicAnatomy from "@/components/AtomicAnatomy";

const agents = [
    // CORE
    { name: "EGERIA", role: "Orchestrator", layer: "core", status: "active" },
    { name: "PULSAR", role: "Universal Gateway", layer: "core", status: "active" },
    { name: "ORION", role: "Strategist", layer: "core", status: "active" },
    { name: "CALLIOPE", role: "Creator", layer: "core", status: "active" },
    { name: "ARGUS", role: "Guardian", layer: "core", status: "active" },
    // MULTIMEDIA
    { name: "APOLLO", role: "Audio Architect", layer: "multimedia", status: "active" },
    { name: "THALIA", role: "Visual Director", layer: "multimedia", status: "active" },
    { name: "PIXEL", role: "Hyper-Realist Lens", layer: "multimedia", status: "active" },
    { name: "FRAME", role: "Motion Physicist", layer: "multimedia", status: "active" },
    // INFRASTRUCTURE
    { name: "HEPHAESTUS", role: "Automator", layer: "infrastructure", status: "active" },
    { name: "TIRESIAS", role: "SEO Oracle", layer: "infrastructure", status: "active" },
    { name: "NEXUS", role: "Connector", layer: "infrastructure", status: "active" },
    // SOUL
    { name: "LYRA", role: "Brand Guardian", layer: "soul", status: "active" },
] as const;

export default function Dashboard() {
    const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

    return (
        <main className="min-h-screen p-8 bg-[url('/grid.svg')]">
            <header className="mb-12 flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter mb-2">AXON <span className="text-axon-neon">SYSTEM</span></h1>
                    <p className="text-sm font-mono opacity-50">L-6 QUANTUM ARCHITECTURE // ACTIVE NODES: 13</p>
                </div>
                <div className="flex gap-4 text-xs font-mono">
                    <div className="flex items-center gap-2"><div className="w-2 h-2 bg-axon-neon rounded-full"></div> CORE</div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 bg-axon-purple rounded-full"></div> MEDIA</div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 bg-axon-gold rounded-full"></div> INFRA</div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {agents.map((agent) => (
                    <AgentCard
                        key={agent.name}
                        {...agent}
                        onSelect={() => setSelectedAgent(agent.name)}
                    />
                ))}
            </div>

            {selectedAgent && (
                <div className="mt-12 animate-in fade-in slide-in-from-bottom-10 duration-500">
                    <div className="p-4 bg-axon-neon/10 border-l-4 border-axon-neon mb-4">
                        <h2 className="text-2xl font-bold">{selectedAgent} // ACTIVATED</h2>
                        <p className="font-mono text-sm opacity-70">Drilling down into atomic structure...</p>
                    </div>
                    <AtomicAnatomy />
                </div>
            )}
        </main>
    );
}
