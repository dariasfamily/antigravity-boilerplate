import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AgentControlPanel } from './AgentControlPanel';
import { AgentConfiguration, AgentStatus, OrionOutput } from '@/types/agent_types';
import { AGENT_KNOWLEDGE_BASE } from '@/data/knowledge_base';
import { useAgentContext } from '@/context/AgentContext';

export const StrategyRoom = () => {
    const { recordActivity } = useAgentContext();
    // 1. STATE MANAGEMENT
    const [status, setStatus] = useState<AgentStatus>('idle');
    const [config, setConfig] = useState<AgentConfiguration>({
        id: 'orion-config-v1',
        inputs: {
            data_source: 'Global Trends (Mock)',
            analysis_depth: 'Deep (Slow)',
            priority_framework: AGENT_KNOWLEDGE_BASE.frameworks.viral.name, // STEPPS
            min_confidence: '80'
        },
        timeout_seconds: 15,
        auto_proceed: true,
        output_format_options: ['Strategic Brief', 'JSON'],
        selected_output_format: 'Strategic Brief'
    });

    const [analysisResult, setAnalysisResult] = useState<OrionOutput | null>(null);

    // 2. HANDLERS
    const handleConfigChange = (newConfig: AgentConfiguration) => {
        setConfig(newConfig);
    };

    const handleAction = (action: 'START' | 'PAUSE' | 'RESUME' | 'STOP' | 'APPROVE') => {
        console.log(`[ORION] Action: ${action}`);

        if (action === 'START') {
            setStatus('processing');
            // Mock Analysis Process
            setTimeout(() => {
                setAnalysisResult({
                    transmission_id: 'trans-001-alpha',
                    strategic_brief: {
                        topic: "AI Agent Fatigue",
                        selected_angle: "Contrarian: Complexity is the new Moat",
                        target_emotion: "Intellectual Vanity",
                        primary_framework: config.inputs.priority_framework
                    },
                    confidence_score: 92,
                    market_gap_score: 8.5,
                    competitor_density: "Low",
                    // @ts-ignore - Adding extra fields for UI demo not strictly in OrionOutput yet
                    detected_keywords: ["Agentic AI", "Complexity", "No-Code Failure"]
                });
                setStatus('paused_for_approval');
            }, 1500);
        }

        if (action === 'APPROVE') {
            setStatus('completed');
            if (analysisResult) {
                recordActivity({
                    agent_id: 'ORION',
                    input_configuration: config.inputs,
                    output_result: analysisResult,
                    performance_metrics: {
                        execution_time_ms: 1500,
                        confidence_score: analysisResult.confidence_score
                    }
                });
            }
        }

        if (action === 'STOP') {
            setStatus('idle');
            setAnalysisResult(null);
        }
    };

    const handleInputChange = (field: string, value: any) => {
        setConfig(prev => ({
            ...prev,
            inputs: { ...prev.inputs, [field]: value }
        }));
    };

    // 3. UI RENDERING
    return (
        <div className="space-y-6">

            {/* STANDARD CONTROL PANEL */}
            <AgentControlPanel
                agentName="ORION (Strategy Room)"
                config={config}
                status={status}
                onConfigChange={handleConfigChange}
                onAction={handleAction}
                customInputFields={
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs text-blue-300 block mb-1">Data Source</label>
                            <select
                                className="w-full bg-gray-900 border border-gray-600 rounded px-2 py-1 text-xs text-white"
                                value={config.inputs.data_source}
                                onChange={(e) => handleInputChange('data_source', e.target.value)}
                            >
                                <option>Global Trends (Mock)</option>
                                <option>TechCrunch RSS</option>
                                <option>Competitor Youtube Channels</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs text-blue-300 block mb-1">Analysis Framework</label>
                            <select
                                className="w-full bg-gray-900 border border-gray-600 rounded px-2 py-1 text-xs text-white"
                                value={config.inputs.priority_framework}
                                onChange={(e) => handleInputChange('priority_framework', e.target.value)}
                            >
                                <option value={AGENT_KNOWLEDGE_BASE.frameworks.viral.name}>Viral (STEPPS)</option>
                                <option value={AGENT_KNOWLEDGE_BASE.frameworks.sales.name}>Sales (Cialdini)</option>
                                <option value={AGENT_KNOWLEDGE_BASE.frameworks.educational.name}>Educational (SUCCESs)</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-xs text-blue-300 block mb-1">Min. Confidence</label>
                            <input
                                type="number"
                                className="w-full bg-gray-900 border border-gray-600 rounded px-2 py-1 text-xs text-white"
                                value={config.inputs.min_confidence}
                                onChange={(e) => handleInputChange('min_confidence', e.target.value)}
                            />
                        </div>
                    </div>
                }
            />

            {/* LIVE DATA VISUALIZATION */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* 1. Radar / Market Gap View */}
                <Card className="bg-gray-900 border-gray-800 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                    <CardHeader>
                        <CardTitle className="text-sm font-mono text-gray-400">MARKET GAP ANALYSIS</CardTitle>
                    </CardHeader>
                    <CardContent className="h-64 flex items-center justify-center">
                        {analysisResult ? (
                            <div className="text-center space-y-4">
                                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500">
                                    {analysisResult.market_gap_score}/10
                                </div>
                                <div className="text-xs text-gray-500">OPPORTUNITY DENSITY</div>
                                <div className="flex gap-2 justify-center">
                                    {/* @ts-ignore */}
                                    {analysisResult.detected_keywords?.map((k, i) => (
                                        <span key={i} className="px-2 py-1 bg-blue-900/20 text-blue-400 text-[10px] rounded border border-blue-900/50">
                                            {k}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="text-gray-700 text-xs animate-pulse">Waiting for signals...</div>
                        )}
                    </CardContent>
                </Card>

                {/* 2. Strategic Directive Output */}
                <Card className="bg-gray-900 border-gray-800">
                    <CardHeader>
                        <CardTitle className="text-sm font-mono text-gray-400">STRATEGIC DIRECTIVE (To: Context)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {analysisResult ? (
                            <div className="space-y-3 font-mono text-sm">
                                <div className="p-3 bg-gray-950 rounded border border-gray-800">
                                    <div className="text-gray-500 text-xs mb-1">TOPIC</div>
                                    <div className="text-white">{analysisResult.strategic_brief?.topic}</div>
                                </div>
                                <div className="p-3 bg-indigo-950/30 rounded border border-indigo-500/30">
                                    <div className="text-indigo-400 text-xs mb-1">SELECTED ANGLE</div>
                                    <div className="text-white font-bold">{analysisResult.strategic_brief?.selected_angle}</div>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-gray-500">Confidence: {analysisResult.confidence_score}%</span>
                                    <span className="text-green-500">READY FOR CALLIOPE</span>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex items-center justify-center text-gray-600 text-xs">
                                [OUPUT BUFFER EMPTY]
                            </div>
                        )}
                    </CardContent>
                </Card>

            </div>
        </div>
    );
};
