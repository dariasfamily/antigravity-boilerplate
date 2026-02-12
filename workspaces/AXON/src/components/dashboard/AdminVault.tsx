import React from 'react';

export function AdminVault() {
    return (
        <div className="p-6 bg-slate-900 text-slate-200 rounded-lg border border-slate-700 font-mono text-sm">
            <header className="flex justify-between items-center mb-6 pb-4 border-b border-slate-800">
                <h2 className="text-xl font-bold text-emerald-400">System Admin Vault</h2>
                <div className="flex gap-4 text-xs">
                    <div>
                        <span className="text-slate-500 block">API USAGE</span>
                        <span className="text-white">$14.32 / $50.00</span>
                    </div>
                    <div>
                        <span className="text-slate-500 block">STATUS</span>
                        <span className="text-emerald-500 animate-pulse">● OPERATIONAL</span>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-2">
                    <h3 className="text-slate-500 text-xs font-bold uppercase mb-2">System Logs</h3>
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 h-64 overflow-y-auto space-y-1">
                        <LogEntry time="10:42:01" source="ORION" level="INFO" msg="Trend analysis complete. 14 topics identified." />
                        <LogEntry time="10:42:05" source="SENTINEL" level="WARN" msg="Topic #4 rejected: Low virality score (45/100)." />
                        <LogEntry time="10:42:15" source="CALLIOPE" level="INFO" msg="Generating script for req_009..." />
                        <LogEntry time="10:42:18" source="SENTINEL" level="INFO" msg="Validation passed. Script length: 145 words." />
                    </div>
                </div>

                <div>
                    <h3 className="text-slate-500 text-xs font-bold uppercase mb-2">Active Config</h3>
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 h-64 text-xs space-y-2">
                        <ConfigRow keyName="Model" value="Gemini 1.5 Pro" />
                        <ConfigRow keyName="Max_Tokens" value="2048" />
                        <ConfigRow keyName="Temp_Calliope" value="0.7" />
                        <ConfigRow keyName="Temp_Orion" value="0.2" />
                        <ConfigRow keyName="Sentinel_Mode" value="STRICT" />
                        <div className="mt-4 pt-4 border-t border-slate-800">
                            <button className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 rounded transition-colors text-xs">
                                Edit System Prompts
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function LogEntry({ time, source, level, msg }: { time: string, source: string, level: string, msg: string }) {
    const color = level === 'WARN' ? 'text-amber-400' : level === 'ERROR' ? 'text-red-400' : 'text-slate-400';
    return (
        <div className="flex gap-3">
            <span className="text-slate-600 w-16 shrink-0">{time}</span>
            <span className={`w-20 shrink-0 font-bold ${source === 'ORION' ? 'text-blue-400' : source === 'CALLIOPE' ? 'text-purple-400' : 'text-emerald-400'}`}>{source}</span>
            <span className={`${color} flex-1`}>{msg}</span>
        </div>
    );
}

function ConfigRow({ keyName, value }: { keyName: string, value: string }) {
    return (
        <div className="flex justify-between">
            <span className="text-slate-500">{keyName}</span>
            <span className="text-slate-300">{value}</span>
        </div>
    );
}
