import React from 'react';

interface DashboardWidgetProps {
    title: string;
    value: string;
    trend: string;
    icon: string;
    color: 'blue' | 'emerald' | 'purple' | 'amber';
}

export default function DashboardWidget({ title, value, trend, icon, color }: DashboardWidgetProps) {
    const colorClasses = {
        blue: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
        emerald: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
        purple: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
        amber: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    };

    return (
        <div className="bg-[#0F111A] border border-slate-800 rounded-lg p-4 flex items-center justify-between hover:border-slate-700 transition-colors">
            <div>
                <div className="text-slate-500 text-xs font-mono mb-1 uppercase tracking-wider">{title}</div>
                <div className="text-2xl font-bold text-slate-200">{value}</div>
                <div className={`text-xs font-mono mt-1 ${trend.startsWith('+') ? 'text-emerald-400' : 'text-slate-400'}`}>
                    {trend} from last month
                </div>
            </div>
            <div className={`w-10 h-10 rounded flex items-center justify-center text-xl border ${colorClasses[color]}`}>
                {icon}
            </div>
        </div>
    );
}
