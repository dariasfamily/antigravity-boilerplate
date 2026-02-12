"use client";

import { motion } from "framer-motion";
import { Activity, Brain, Server, Shield, Zap } from "lucide-react";

interface AgentProps {
    name: string;
    role: string;
    status: "active" | "idle" | "locked" | "ghost";
    layer: "core" | "multimedia" | "infrastructure" | "soul";
    notebookId?: string;
    onSelect: () => void;
}

const layerColors = {
    core: "border-axon-neon text-axon-neon",
    multimedia: "border-axon-purple text-axon-purple",
    infrastructure: "border-axon-gold text-axon-gold",
    soul: "border-white text-white opacity-80",
};

export default function AgentCard({ name, role, status, layer, onSelect }: AgentProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-4 border rounded-xl bg-black/50 backdrop-blur-md cursor-pointer ${layerColors[layer]} shadow-[0_0_15px_rgba(0,0,0,0.5)]`}
            onClick={onSelect}
        >
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold tracking-tighter">{name}</h3>
                {status === "active" && <Activity className="w-4 h-4 animate-pulse" />}
                {status === "ghost" && <Brain className="w-4 h-4 opacity-50" />}
            </div>
            <p className="text-xs uppercase tracking-widest opacity-70 mb-4">{role}</p>

            <div className="flex gap-2 mt-2">
                <div className="text-[10px] px-2 py-1 bg-white/10 rounded">L-6 QUANTUM</div>
                {status === "active" && <div className="text-[10px] px-2 py-1 bg-green-500/20 text-green-400 rounded">ONLINE</div>}
            </div>
        </motion.div>
    );
}
