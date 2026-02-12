"use client";

import { motion } from "framer-motion";

export default function AtomicAnatomy() {
    const strings = [
        "[ID-01] Mimetismo", "[ID-02] Police-Rules", "[ID-03] Pre-Audit",
        "[ID-04] Skillset", "[ID-05] Wealth-Filter", "[ID-06] Sync-Strategy",
        "[ID-07] Gap-Trigger", "[ID-08] Research-Focus", "[ID-09] Handshake",
        "[ID-10] Voto", "[ID-11] Registry", "[ID-12] Audit-Mode",
        "[ID-13] Paths", "[ID-14] Garbage", "[ID-15] Cronos"
    ];

    return (
        <div className="mt-8 p-6 border border-white/10 rounded-xl bg-black/80">
            <h2 className="text-lg font-bold mb-4 font-mono text-gray-400">/// ATOMIC_ANATOMY_VIEWER</h2>
            <div className="grid grid-cols-3 gap-2">
                {strings.map((str, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="text-xs font-mono p-2 bg-white/5 hover:bg-white/10 border-l-2 border-transparent hover:border-axon-neon transition-colors"
                    >
                        {str}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
