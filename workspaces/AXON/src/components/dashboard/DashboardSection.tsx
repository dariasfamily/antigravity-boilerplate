'use client';
import { useState, ReactNode } from 'react';

interface DashboardSectionProps {
    title: string;
    icon?: string;
    children: ReactNode;
    defaultOpen?: boolean;
    className?: string; // Additional classes for the container
}

export default function DashboardSection({ title, icon, children, defaultOpen = true, className = '' }: DashboardSectionProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <section className={`border border-slate-800 rounded-xl overflow-hidden bg-[#0A0A0A] ${className}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 bg-slate-900/40 hover:bg-slate-900/60 transition-colors border-b border-white/5"
            >
                <div className="flex items-center gap-3">
                    {icon && <span className="text-xl">{icon}</span>}
                    <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest">
                        {title}
                    </h3>
                </div>
                <div className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>
            </button>

            {isOpen && (
                <div className="p-0 animate-in fade-in slide-in-from-top-1 duration-200">
                    {children}
                </div>
            )}
        </section>
    );
}
