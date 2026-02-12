'use client';
import { createContext, useContext, useState, ReactNode } from 'react';
import {
    SystemLog,
    SystemContext,
    OrionManifest,
    CalliopeOutput,
    UniversalAgentState,
    AgentStatus,
    AgentActivityRecord
} from '@/types/agent_types';

/**
 * THE BLACKBOARD (Shared Context)
 * This is the "Brain" that all agents read from and write to.
 * Agents NEVER speak directly. They write here.
 */

interface AgentContextAPI {
    // The "God View" of the system
    systemContext: SystemContext;
    systemLogs: SystemLog[]; // Added global logs

    // Write Methods
    updateGlobalVar: (key: string, value: any) => void;

    // Agent State Management
    setOrionState: (updates: Partial<UniversalAgentState<any, OrionManifest>>) => void;
    setCalliopeState: (updates: Partial<UniversalAgentState<any, CalliopeOutput>>) => void;

    // Logging (The Audit Trail)
    logEvent: (agentId: string, action: string, status: 'SUCCESS' | 'FAILURE' | 'WARNING', detail: string) => void;

    // NEW: Activity History (Context Log)
    recordActivity: (record: Omit<AgentActivityRecord, 'id' | 'timestamp'>) => void;
}

const AgentContext = createContext<AgentContextAPI | undefined>(undefined);

export function AgentProvider({ children }: { children: ReactNode }) {
    // 1. Initialize the Blank Slate
    const [systemContext, setSystemContext] = useState<SystemContext>({
        session_id: `sess_${Date.now()}`,
        global_variables: {
            brand_tone: "Reluctant Guru",
            target_platform: "Omni",
            wealth_goal_rpm: 15.00
        },
        agents: {
            ORION: {
                agent_id: 'ORION',
                status: 'idle',
                data: null,
                config: { id: 'def_orion', inputs: {}, timeout_seconds: 60, auto_proceed: false, output_format_options: ['JSON'], selected_output_format: 'JSON' },
                logs: []
            },
            CALLIOPE: {
                agent_id: 'CALLIOPE',
                status: 'idle',
                data: null,
                config: { id: 'def_calliope', inputs: {}, timeout_seconds: 120, auto_proceed: false, output_format_options: ['Markdown'], selected_output_format: 'Markdown' },
                logs: []
            },
            ARGUS: {
                agent_id: 'ARGUS',
                status: 'idle',
                data: null,
                config: { id: 'def_argus', inputs: {}, timeout_seconds: 60, auto_proceed: true, output_format_options: ['JSON'], selected_output_format: 'JSON' },
                logs: []
            },
            ECHO: {
                agent_id: 'ECHO',
                status: 'idle',
                data: null,
                config: { id: 'def_echo', inputs: {}, timeout_seconds: 180, auto_proceed: true, output_format_options: ['JSON'], selected_output_format: 'JSON' },
                logs: []
            }
        },
        artifact_registry: [],
        activity_log: [] // Initial Log
    });

    const [systemLogs, setSystemLogs] = useState<SystemLog[]>([]);
    const [lastExecutionResult, setLastExecutionResult] = useState<any | null>(null);

    // 2. State Mutators (The "Write" Permissions)

    const updateGlobalVar = (key: string, value: any) => {
        setSystemContext(prev => ({
            ...prev,
            global_variables: { ...prev.global_variables, [key]: value }
        }));
    };

    const setOrionState = (updates: Partial<UniversalAgentState<any, OrionManifest>>) => {
        setSystemContext(prev => {
            const current = prev.agents.ORION || {} as any;
            return {
                ...prev,
                agents: {
                    ...prev.agents,
                    ORION: { ...current, ...updates }
                }
            };
        });
    };

    const setCalliopeState = (updates: Partial<UniversalAgentState<any, CalliopeOutput>>) => {
        setSystemContext(prev => {
            const current = prev.agents.CALLIOPE || {} as any;
            return {
                ...prev,
                agents: {
                    ...prev.agents,
                    CALLIOPE: { ...current, ...updates }
                }
            };
        });
    };

    const logEvent = (agentId: string, action: string, status: 'SUCCESS' | 'FAILURE' | 'WARNING' | 'INFO' | 'CRITICAL', detail: string) => {
        const timestamp = new Date().toISOString();
        const logEntry = `[${timestamp}] [${status}] ${action}: ${detail}`;

        // 1. Update Global Log (Legacy / for SystemLogs array)
        const newLog: SystemLog = {
            id: crypto.randomUUID(),
            timestamp,
            agent: agentId,
            action,
            status: status as any, // Cast if types slightly differ
            details: detail
        };
        setSystemLogs(prev => [newLog, ...prev].slice(0, 100));

        // 2. Update specific agent logs
        if (agentId === 'ORION') {
            setOrionState({ logs: [logEntry, ...(systemContext.agents.ORION?.logs || [])].slice(0, 50) });
        } else if (agentId === 'CALLIOPE') {
            setCalliopeState({ logs: [logEntry, ...(systemContext.agents.CALLIOPE?.logs || [])].slice(0, 50) });
        }

        // 3. SYNC TO NUCLEUS / ACTIVITY LOG (The V3 Stream)
        const activityRecord: AgentActivityRecord = {
            id: crypto.randomUUID(),
            timestamp,
            agent_id: agentId,
            action_type: action,
            level: status,
            message: detail,
            data: { source: 'logEvent' } // Minimal metadata for auto-logs
        };

        setSystemContext(prev => ({
            ...prev,
            activity_log: [activityRecord, ...prev.activity_log].slice(0, 500) // Keep buffer healthy
        }));
    };

    const recordActivity = (record: Omit<AgentActivityRecord, 'id' | 'timestamp'>) => {
        const newRecord: AgentActivityRecord = {
            id: crypto.randomUUID(),
            timestamp: new Date().toISOString(),
            ...record
        };

        setSystemContext(prev => ({
            ...prev,
            activity_log: [newRecord, ...prev.activity_log]
        }));

        // Also log event for visibility
        logEvent(record.agent_id, 'COMPLETED_TASK', 'SUCCESS', `Recorded Activity ${newRecord.id}`);
    };

    return (
        <AgentContext.Provider value={{
            systemContext,
            systemLogs,
            updateGlobalVar,
            setOrionState,
            setCalliopeState,
            logEvent,
            recordActivity
        }}>
            {children}
        </AgentContext.Provider>
    );
}

export function useAgentContext() {
    const context = useContext(AgentContext);
    if (context === undefined) {
        throw new Error('useAgentContext must be used within an AgentProvider');
    }
    return context;
}
