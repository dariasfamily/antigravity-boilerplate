'use client';

import { useState } from 'react';

export default function KnowledgeNode() {
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [accessCode, setAccessCode] = useState('');
    const [error, setError] = useState(false);

    const handleUnlock = () => {
        if (accessCode === 'AXON') {
            setIsUnlocked(true);
            setError(false);
        } else {
            setError(true);
            setTimeout(() => setError(false), 2000);
        }
    };

    const brains = [
        { name: 'Orion Strategy Manual', status: 'ONLINE', url: 'https://notebooklm.google.com/notebook/3ec36f41-61d5-4c31-873a-452f547b3e9b', type: 'Strategy' },
        { name: 'Calliope Scripting Brain', status: 'ONLINE', url: 'https://notebooklm.google.com/notebook/ca1a5f14-ef50-491a-9e09-a9b008cf66a2', type: 'Psychology' },
        { name: 'Brand DNA Vault', status: 'LOCKED', url: '#', type: 'Core Context' },
    ];

    return (
        <div className="bg-[#0F111A] border border-slate-800 rounded-xl overflow-hidden flex flex-col h-full relative">

            <div className="px-4 py-3 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
                <h3 className="text-xs font-bold text-slate-400 flex items-center gap-2 uppercase tracking-wider">
                    <span>ðŸ§ </span> {isUnlocked ? 'Active Knowledge Nodes' : 'Secure Knowledge Access'}
                </h3>
                {!isUnlocked && <div className="text-[10px] text-red-500 font-mono flex items-center gap-1"><span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>LOCKED</div>}
            </div>

            {!isUnlocked ? (
                <div className="p-6 flex flex-col items-center justify-center flex-1 space-y-4">
                    <div className="bg-slate-900/50 p-4 rounded-full border border-slate-800 mb-2">
                        <span className="text-4xl">ðŸ”’</span>
                    </div>
                    <div className="text-center">
                        <h4 className="text-white font-bold text-sm">RESTRICTED AREA</h4>
                        <p className="text-[10px] text-slate-500 mt-1 max-w-[200px] mx-auto">
                            Enter security clearance code to access Master Notebooks.
                        </p>
                    </div>

                    <div className="flex gap-2 w-full max-w-[240px]">
                        <input
                            type="password"
                            value={accessCode}
                            onChange={(e) => setAccessCode(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
                            placeholder="ACCESS CODE"
                            className={`flex-1 bg-black border ${error ? 'border-red-500 text-red-500 placeholder-red-800' : 'border-slate-700 text-white placeholder-slate-600'} text-xs p-2 rounded focus:outline-none focus:border-blue-500 transition-colors text-center font-mono`}
                        />
                        <button
                            onClick={handleUnlock}
                            className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs px-3 rounded transition-colors"
                        >
                            âž¤
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <div className="p-3 space-y-2 flex-1 overflow-y-auto">
                        {brains.map((brain, idx) => (
                            <div key={idx} className="flex items-center justify-between p-2 hover:bg-white/5 rounded transition-colors border border-transparent hover:border-slate-700 group">
                                <div className="flex items-center gap-3">
                                    <div className={`w-2 h-2 rounded-full ${brain.status === 'ONLINE' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-600'}`}></div>
                                    <div>
                                        <h4 className="text-xs font-bold text-slate-200 group-hover:text-blue-400 transition-colors">{brain.name}</h4>
                                        <p className="text-[10px] text-slate-500">{brain.type}</p>
                                    </div>
                                </div>
                                <a
                                    href={brain.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`text-[10px] px-2 py-1 rounded border transition-all ${brain.status === 'ONLINE'
                                            ? 'bg-blue-900/20 border-blue-900/50 text-blue-400 hover:bg-blue-600 hover:text-white hover:border-blue-500'
                                            : 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed'
                                        }`}
                                >
                                    {brain.status === 'ONLINE' ? 'ACCESS NODE' : 'OFFLINE'}
                                </a>
                            </div>
                        ))}
                    </div>
                </>
            )}

            <div className="mt-auto p-3 border-t border-slate-800 bg-black/20">
                <p className="text-[10px] text-slate-500 text-center">
                    Security Level: <span className={isUnlocked ? "text-emerald-500" : "text-amber-500"}>{isUnlocked ? "CLEARED" : "RESTRICTED"}</span> â€¢ Encryption: AES-256
                </p>
            </div>
        </div>
    );
}
