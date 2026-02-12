import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AgentControlPanel } from './AgentControlPanel';
import { AgentConfiguration, AgentStatus, CalliopeOutput } from '@/types/agent_types';
import { AGENT_KNOWLEDGE_BASE } from '@/data/knowledge_base';
import { useAgentContext } from '@/context/AgentContext';

// Standardized Interface for Agent View
export const WriterRoom = () => {
    const { recordActivity } = useAgentContext();
    // 1. STATE MANAGEMENT
    const [status, setStatus] = useState<AgentStatus>('idle');
    const [config, setConfig] = useState<AgentConfiguration>({
        id: 'calliope-config-v1',
        inputs: {
            tone: AGENT_KNOWLEDGE_BASE.tones[0].label, // "Gary Vee"
            hook_type: AGENT_KNOWLEDGE_BASE.hooks[0].label, // "Negative Hook"
            target_platform: 'TikTok',
            duration_target: '60s'
        },
        timeout_seconds: 30, // Default 30s as requested
        auto_proceed: false,
        output_format_options: ['Markdown Table', 'JSON', 'Plain Text Script'],
        selected_output_format: 'Markdown Table'
    });

    const [mockOutput, setMockOutput] = useState<CalliopeOutput | null>(null);

    // 2. HANDLERS
    const handleConfigChange = (newConfig: AgentConfiguration) => {
        setConfig(newConfig);
    };

    const handleAction = (action: 'START' | 'PAUSE' | 'RESUME' | 'STOP' | 'APPROVE') => {
        console.log(`[CALLIOPE] Action Received: ${action}`);

        if (action === 'START') {
            setStatus('processing');
            // Simulate processing delay then pause for HITL review
            setTimeout(() => {
                setMockOutput({
                    metadata: {
                        status: 'DRAFT',
                        confidence_score: 88,
                        hook_type: config.inputs.hook_type,
                        word_count: 145,
                        estimated_duration: 58,
                        readability_grade: 5
                    },
                    script_content: {
                        title: "Why Most Agents Fail",
                        blocks: [
                            {
                                time_start: "00:00", time_end: "00:03",
                                visual_cue: "Face close up, serious expression",
                                audio_text: "Stop scrolling if you want to build wealth.",
                                overlay_text: "STOP SCROLLING"
                            },
                            {
                                time_start: "00:03", time_end: "00:15",
                                visual_cue: "Fast montage of AI tools",
                                audio_text: "Most people use AI like a toy. But the top 1% use it like a weapon.",
                                overlay_text: "TOY vs WEAPON"
                            }
                        ]
                    },
                    production_notes: {
                        music_mood: "Phonk / High Energy",
                        b_roll_suggestions: ["Matrix rain", "Server rooms"],
                        pattern_interrupt_count: 5
                    }
                });
                setStatus('paused_for_approval'); // Trigger timer
            }, 2000);
        }

        if (action === 'APPROVE') {
            setStatus('completed');
            if (mockOutput) {
                // DISPATCH TO CONTEXT LOG
                recordActivity({
                    agent_id: 'CALLIOPE',
                    input_configuration: config.inputs,
                    output_result: mockOutput,
                    performance_metrics: {
                        execution_time_ms: 2000,
                        confidence_score: mockOutput.metadata.confidence_score
                    }
                });
                console.log("Dispatching to Context.ActivityLog:", mockOutput);
            }
        }

        if (action === 'STOP') {
            setStatus('idle');
            setMockOutput(null);
        }
    };

    const handleInputChange = (field: string, value: any) => {
        setConfig(prev => ({
            ...prev,
            inputs: {
                ...prev.inputs,
                [field]: value
            }
        }));
    };

    // 3. UI RENDERING
    return (
        <div className="space-y-6">

            {/* MASTER CONTROL PANEL - Standardized for all Agents */}
            <AgentControlPanel
                agentName="CALLIOPE (Writer's Room)"
                config={config}
                status={status}
                onConfigChange={handleConfigChange}
                onAction={handleAction}
                customInputFields={
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs text-blue-300 block mb-1">Tone & Voice</label>
                            <select
                                className="w-full bg-gray-900 border border-gray-600 rounded px-2 py-1 text-xs text-white"
                                value={config.inputs.tone}
                                onChange={(e) => handleInputChange('tone', e.target.value)}
                            >
                                {AGENT_KNOWLEDGE_BASE.tones.map(t => (
                                    <option key={t.id} value={t.label}>{t.label}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="text-xs text-blue-300 block mb-1">Hook Strategy</label>
                            <select
                                className="w-full bg-gray-900 border border-gray-600 rounded px-2 py-1 text-xs text-white"
                                value={config.inputs.hook_type}
                                onChange={(e) => handleInputChange('hook_type', e.target.value)}
                            >
                                {AGENT_KNOWLEDGE_BASE.hooks.map(h => (
                                    <option key={h.id} value={h.label}>{h.label} ({h.risk_level} Risk)</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="text-xs text-blue-300 block mb-1">Platform</label>
                            <select
                                className="w-full bg-gray-900 border border-gray-600 rounded px-2 py-1 text-xs text-white"
                                value={config.inputs.target_platform}
                                onChange={(e) => handleInputChange('target_platform', e.target.value)}
                            >
                                <option>TikTok</option>
                                <option>YouTube Shorts</option>
                                <option>Instagram Reels</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs text-blue-300 block mb-1">Duration Target</label>
                            <input
                                type="text"
                                className="w-full bg-gray-900 border border-gray-600 rounded px-2 py-1 text-xs text-white"
                                value={config.inputs.duration_target}
                                onChange={(e) => handleInputChange('duration_target', e.target.value)}
                            />
                        </div>
                    </div>
                }
            />

            {/* LIVE PREVIEW AREA */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Editor / Script View */}
                <div className="lg:col-span-2 space-y-4">
                    <Card className="bg-gray-900 border-gray-800">
                        <CardHeader className="pb-2 border-b border-gray-800">
                            <CardTitle className="text-sm font-mono text-gray-400">LIVE SCRIPT PREVIEW</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                            {mockOutput ? (
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
                                        <span>TITLE: {mockOutput.script_content?.title}</span>
                                        <span className={mockOutput.metadata.readability_grade < 6 ? "text-green-500" : "text-yellow-500"}>
                                            READABILITY: G{mockOutput.metadata.readability_grade}
                                        </span>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="text-xs text-gray-500 border-b border-gray-800">
                                                    <th className="p-2 w-16">TIME</th>
                                                    <th className="p-2 w-1/3">VISUAL</th>
                                                    <th className="p-2">AUDIO</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-sm text-gray-300 font-mono">
                                                {mockOutput.script_content?.blocks.map((block, i) => (
                                                    <tr key={i} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                                                        <td className="p-2 text-gray-500 text-xs">{block.time_start}</td>
                                                        <td className="p-2 text-purple-300">[{block.visual_cue}] <br /> <span className="text-xs text-purple-500/70">{block.overlay_text}</span></td>
                                                        <td className="p-2 text-white/90">"{block.audio_text}"</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ) : (
                                <div className="h-64 flex flex-col items-center justify-center text-gray-600 space-y-3">
                                    <div className="w-12 h-12 rounded-full border-2 border-gray-700 flex items-center justify-center">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                    </div>
                                    <p className="text-sm">Awaiting Generation...</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Metadata / Validation Sidebar */}
                <div className="space-y-4">
                    <Card className="bg-gray-900 border-gray-800">
                        <CardHeader className="pb-2 border-b border-gray-800">
                            <CardTitle className="text-sm font-mono text-gray-400">SENTINEL VALIDATION</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4 space-y-4">
                            {/* Confidence Score */}
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-gray-400">CONFIDENCE SCORE</span>
                                    <span className="text-green-400 font-bold">{mockOutput?.metadata.confidence_score || 0}%</span>
                                </div>
                                <div className="w-full bg-gray-800 rounded-full h-1.5">
                                    <div
                                        className="bg-green-500 h-1.5 rounded-full transition-all duration-1000"
                                        style={{ width: `${mockOutput?.metadata.confidence_score || 0}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Checklist */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                    <span className={mockOutput ? "text-green-500" : "text-gray-600"}>●</span>
                                    <span>Negative Hook Detected</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                    <span className={mockOutput ? "text-green-500" : "text-gray-600"}>●</span>
                                    <span>2+ Open Loops</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                    <span className={mockOutput ? "text-green-500" : "text-gray-600"}>●</span>
                                    <span>Readability {"<"} G6</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="p-4 rounded border border-blue-900/30 bg-blue-900/10 text-xs text-blue-300">
                        <strong>SYSTEM NOTE:</strong> <br />
                        Output will be stored in <code>Context.Calliope.LastBuild</code> upon approval.
                    </div>
                </div>
            </div>
        </div>
    );
};
