'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function VaultPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    // HARDCODED PIN FOR INITIAL SETUP (Should be in .env)
    const MASTER_PIN = '0000';

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (pin === MASTER_PIN) {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('ACCESS DENIED: Invalid Security Clearance');
            setPin('');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-[#0F111A] border border-red-900/30 rounded-2xl p-8 shadow-2xl shadow-red-900/10">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-900/20 text-red-500 mb-4 animate-pulse">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-slate-100 tracking-wider">RESTRICTED AREA</h1>
                        <p className="text-slate-500 text-sm mt-2">Level 3 Security Clearance Required</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <input
                                type="password"
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-center text-2xl tracking-[0.5em] text-white focus:ring-2 focus:ring-red-500/50 outline-none transition-all placeholder:tracking-normal placeholder:text-sm"
                                placeholder="ENTER PIN"
                                autoFocus
                            />
                        </div>

                        {error && (
                            <div className="text-red-500 text-xs text-center font-mono bg-red-950/30 py-2 rounded border border-red-900/50">
                                ⚠ {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-slate-100 text-black font-bold py-3 rounded-lg hover:bg-slate-300 transition-colors"
                        >
                            AUTHENTICATE
                        </button>
                    </form>

                    <button
                        onClick={() => router.back()}
                        className="w-full mt-4 text-slate-600 text-xs hover:text-slate-400"
                    >
                        ← Return to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050505] p-6 text-slate-200">
            <header className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                    <span className="text-red-500 text-xl">🔒</span>
                    <h1 className="text-xl font-bold tracking-widest text-slate-100">THE VAULT</h1>
                </div>
                <button
                    onClick={() => setIsAuthenticated(false)}
                    className="px-4 py-2 text-xs font-mono bg-red-900/20 text-red-400 border border-red-900/50 rounded hover:bg-red-900/40"
                >
                    SECURE LOCK
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* DANGER ZONE */}
                <Section title="Danger Zone" color="red">
                    <Control
                        label="System Hard Reset"
                        desc="Wipes all active sessions and RAM."
                        action={() => alert("Simulation: System Reset Triggered")}
                        btnText="PURGE"
                        danger
                    />
                    <Control
                        label="Emergency Kill Switch"
                        desc="Stops all active agents immediately."
                        action={() => alert("Simulation: Agents Killed")}
                        btnText="KILL ALL"
                        danger
                    />
                </Section>

                {/* FINANCE OVERRIDE */}
                <Section title="Budget Control" color="emerald">
                    <Control
                        label="Override API Limits"
                        desc="Force approve over-budget requests."
                        action={() => alert("Approved")}
                        btnText="APPROVE"
                    />
                    <Control
                        label="Connect Stripe Live"
                        desc="Switch from Test to Live Mode."
                        action={() => alert("Switching to Live...")}
                        btnText="GO LIVE"
                    />
                </Section>

                {/* DATA GOVERNANCE */}
                <Section title="Data Governance" color="blue">
                    <Control
                        label="Export Brain State"
                        desc="Download .zip of /brain directory."
                        action={() => alert("Export started...")}
                        btnText="EXPORT"
                    />
                    <Control
                        label="Edit Brand DNA"
                        desc="Direct access to brand_dna.md"
                        action={() => alert("Opening Editor...")}
                        btnText="EDIT"
                    />
                </Section>
            </div>
        </div>
    );
}

function Section({ title, color, children }: { title: string, color: string, children: React.ReactNode }) {
    const borderColor = {
        red: 'border-red-900/30',
        emerald: 'border-emerald-900/30',
        blue: 'border-blue-900/30'
    }[color] || 'border-slate-800';

    return (
        <div className={`bg-[#0A0A0A] border ${borderColor} rounded-xl p-6`}>
            <h2 className={`text-sm font-bold uppercase tracking-widest mb-6 text-${color}-500`}>
                {title}
            </h2>
            <div className="space-y-6">
                {children}
            </div>
        </div>
    );
}

function Control({ label, desc, action, btnText, danger = false }: any) {
    return (
        <div className="flex items-center justify-between group">
            <div>
                <div className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">{label}</div>
                <div className="text-xs text-slate-500">{desc}</div>
            </div>
            <button
                onClick={action}
                className={`px-3 py-1.5 rounded text-[10px] font-bold tracking-wider border transition-all ${danger
                        ? 'border-red-900/50 text-red-500 hover:bg-red-950 hover:border-red-500'
                        : 'border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
            >
                {btnText}
            </button>
        </div>
    );
}
