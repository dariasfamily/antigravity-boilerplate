'use client';
import { useAgentContext } from '@/context/AgentContext';

export default function AgentMonitor() {
    const { systemLogs } = useAgentContext();

    return (
        <div className="w-full bg-[#0F111A] border border-slate-800 rounded-xl overflow-hidden flex flex-col h-[300px]">
            <div className="px-4 py-3 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
                <h3 className="text-xs font-bold text-slate-400 flex items-center gap-2 uppercase tracking-wider">
                    <span>📟</span> Live System Logs
                </h3>
                <div className="flex gap-2">
                    <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                </div>
            </div>

            <div className="flex-1 overflow-auto custom-scrollbar p-2 font-mono text-[11px] space-y-1">
                {systemLogs.map(log => (
                    <div key={log.id} className="grid grid-cols-[140px_80px_1fr_80px] hover:bg-white/5 rounded p-1 transition-colors items-center gap-2">
                        <span className="text-slate-500">{new Date(log.timestamp).toLocaleTimeString()}</span>

                        <span className={`font-bold ${log.agent === 'ORION' ? 'text-blue-400' :
                            log.agent === 'CALLIOPE' ? 'text-pink-400' :
                                log.agent === 'HERMES' ? 'text-amber-400' : 'text-slate-300'
                            }`}>
                            {log.agent}
                        </span>

                        <span className="text-slate-300 truncate" title={log.details}>
                            <span className="opacity-50 mr-2">[{log.action}]</span>
                            {log.details}
                        </span>

                        <span className={`text-center px-1 py-0.5 rounded text-[9px] font-bold ${log.status === 'SUCCESS' ? 'bg-emerald-500/10 text-emerald-400' :
                            log.status === 'FAILURE' ? 'bg-red-500/10 text-red-400' :
                                log.status === 'WARNING' ? 'bg-amber-500/10 text-amber-400' :
                                    'bg-blue-500/10 text-blue-400'
                            }`}>
                            {log.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
