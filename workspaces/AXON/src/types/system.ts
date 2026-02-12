
export type AgentStatus = 'active' | 'idle' | 'paused' | 'error';

export interface SystemState {
    agent_id: string;
    role: string;
    status: AgentStatus;
    last_heartbeat: string;
    metrics: Record<string, any>;
    control_signal: 'run' | 'stop' | 'restart';
    owner: string;
}

export interface MetricCardProps {
    title: string;
    value: string | number;
    trend?: string;
    trendType?: 'positive' | 'negative' | 'neutral';
}
