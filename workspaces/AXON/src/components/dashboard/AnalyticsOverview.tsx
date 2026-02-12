import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type TimeRange = '24h' | '7d' | '30d' | '1y';

export default function AnalyticsOverview() {
    const [range, setRange] = useState<TimeRange>('30d');
    const [isExpanded, setIsExpanded] = useState(false);

    // Mock Data based on Time Range
    const getMetrics = (r: TimeRange) => {
        const multipliers = { '24h': 1, '7d': 7, '30d': 30, '1y': 365 };
        const m = multipliers[r];
        return {
            revenue: (m * 1240.50).toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
            views: (m * 15400).toLocaleString(),
            comments: (m * 320).toLocaleString(),
            bestPlatform: 'LinkedIn',
            topAgent: 'ORION',
            executions: m * 45
        };
    };

    const metrics = getMetrics(range);

    return (
        <div className={`bg-[#0F111A] border border-slate-800 rounded-xl flex flex-col transition-all duration-500 ${isExpanded ? 'fixed inset-4 z-50 overflow-auto border-blue-500/50 shadow-2xl' : 'h-full min-h-[300px]'}`}>

            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-slate-800 bg-slate-900/50">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-blue-900/20 flex items-center justify-center text-blue-400">
                        📊
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-slate-100 tracking-wide">SYSTEM ANALYTICS</h3>
                        <p className="text-[10px] text-slate-500 uppercase">Performance & Financials</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {/* Time Filters */}
                    <div className="flex bg-slate-900 rounded p-1 border border-slate-800">
                        {(['24h', '7d', '30d', '1y'] as TimeRange[]).map((t) => (
                            <button
                                key={t}
                                onClick={() => setRange(t)}
                                className={`px-3 py-1 text-[10px] font-bold rounded transition-colors ${range === t ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
                                    }`}
                            >
                                {t.toUpperCase()}
                            </button>
                        ))}
                    </div>

                    {/* Expand/Collapse */}
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="p-1.5 hover:bg-slate-800 rounded text-slate-400 transition-colors"
                        title={isExpanded ? "Collapse" : "Expand"}
                    >
                        {isExpanded ? '↙' : '↗'}
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">

                {/* Left: Financials & Growth */}
                <div className="space-y-6">
                    <div>
                        <div className="text-slate-500 text-xs uppercase mb-1">Total Revenue Generated</div>
                        <div className="text-4xl font-bold text-white tracking-tight flex items-baseline gap-3">
                            {metrics.revenue}
                            <span className="text-sm font-normal text-emerald-400 bg-emerald-900/20 px-2 py-0.5 rounded border border-emerald-900/50">
                                ▲ 12.5%
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <MetricCard label="Total Views" value={metrics.views} trend="+5%" color="blue" />
                        <MetricCard label="Engagement" value={metrics.comments} trend="+8%" color="purple" />
                    </div>

                    {/* Simulated Graph */}
                    <div className="h-24 flex items-end gap-1 border-b border-slate-800 pb-1 pt-4 relative">
                        <div className="absolute top-0 right-0 text-[10px] text-slate-600">Views Trend ({range})</div>
                        {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95].map((h, i) => (
                            <div
                                key={i}
                                className="flex-1 bg-blue-500/20 hover:bg-blue-500/50 transition-colors rounded-t-sm relative group"
                                style={{ height: `${h}%` }}
                            >
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 text-xs px-2 py-1 rounded border border-slate-700 opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-10">
                                    {h * 100} views
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: System Health & Top Performers */}
                <div className="space-y-6 border-l border-slate-800/50 md:pl-8">
                    {/* Session Stats */}
                    <div className="p-4 bg-slate-900/30 rounded border border-slate-800 space-y-3">
                        <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                            <span className="text-xs text-slate-400">SESSION HEALTH</span>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                <span className="text-[10px] text-emerald-400 font-mono">OPTIMAL</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-y-2 text-sm">
                            <div className="text-slate-500">Executions:</div>
                            <div className="text-right text-white font-mono">{metrics.executions}</div>
                            <div className="text-slate-500">Top Agent:</div>
                            <div className="text-right text-blue-400 font-bold">{metrics.topAgent}</div>
                            <div className="text-slate-500">Best Channel:</div>
                            <div className="text-right text-white">{metrics.bestPlatform}</div>
                        </div>
                    </div>

                    {/* Content Leaderboard (Mock) */}
                    <div>
                        <div className="text-xs uppercase text-slate-500 mb-3 tracking-wider">Top Performing Content</div>
                        <div className="space-y-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex items-center gap-3 p-2 hover:bg-white/5 rounded transition-colors group cursor-pointer">
                                    <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        #{i}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-xs text-slate-300 truncate">Why AI Agents Will Replace Middle Managers</div>
                                        <div className="text-[10px] text-slate-500">LinkedIn • 12k views</div>
                                    </div>
                                    <div className="text-xs font-mono text-emerald-400">+24%</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Expanded View Content would go here */}
            {isExpanded && (
                <div className="p-6 border-t border-slate-800 bg-[#0A0A0A]">
                    <h4 className="text-xl font-bold text-white mb-4">Detailed Analytics Report</h4>
                    <div className="text-slate-500">Advanced metrics breakdown would appear here in the expanded view... [Placeholder for Deep Dive]</div>
                </div>
            )}
        </div>
    );
}

function MetricCard({ label, value, trend, color }: { label: string, value: string, trend: string, color: string }) {
    const colors = {
        blue: 'text-blue-400 bg-blue-900/20 border-blue-900/50',
        purple: 'text-purple-400 bg-purple-900/20 border-purple-900/50',
        emerald: 'text-emerald-400 bg-emerald-900/20 border-emerald-900/50',
    }[color] || 'text-slate-400';

    return (
        <div className="bg-slate-900/40 p-3 rounded border border-slate-800">
            <div className="text-[10px] text-slate-500 uppercase mb-1">{label}</div>
            <div className="text-xl font-bold text-white">{value}</div>
            <div className={`text-[10px] mt-1 inline-block px-1.5 py-0.5 rounded border ${colors}`}>
                {trend}
            </div>
        </div>
    );
}
