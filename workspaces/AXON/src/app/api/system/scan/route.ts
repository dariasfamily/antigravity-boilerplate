
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// POINT TO THE BRAIN REGISTRY
const REGISTRY_PATH = 'C:\\Users\\daria\\.gemini\\AXON\\brain\\e6fc57ba-9b26-455d-bcf0-142947e7b879\\SYSTEM_REGISTRY.md';

export async function GET() {
    const supabase = createClient();
    const logs: string[] = [];

    try {
        // 1. READ REGISTRY (Golden Record)
        if (!fs.existsSync(REGISTRY_PATH)) {
            return NextResponse.json({ error: 'Registry not found' }, { status: 500 });
        }
        const registryContent = fs.readFileSync(REGISTRY_PATH, 'utf-8');

        // Simple usage of regex to find agent IDs in the markdown table
        // Looks for lines like: | `agent_id` | ...
        const regex = /\|\s*`([^`]+)`\s*\|\s*([^|]+)\s*\|\s*`([^`]+)`/g;
        const registryAgents: Record<string, { role: string; statusKey: string }> = {};

        let match;
        while ((match = regex.exec(registryContent)) !== null) {
            registryAgents[match[1]] = { role: match[2].trim(), statusKey: match[3] };
        }

        logs.push(`[REGISTRY] Found ${Object.keys(registryAgents).length} expected agents.`);

        // 2. READ REALITY (Supabase)
        const { data: dbAgents, error } = await supabase.from('system_state').select('*');
        if (error) throw error;

        const dbAgentMap = new Map(dbAgents.map(a => [a.agent_id, a]));

        // 3. COMPARE & FIX
        for (const [agentId, info] of Object.entries(registryAgents)) {
            const dbAgent = dbAgentMap.get(agentId);

            if (!dbAgent) {
                // CASE: MISSING AGENT -> AUTO-REVIVE
                logs.push(`[FIX] Agent '${agentId}' missing in DB. Reviving...`);
                await supabase.from('system_state').insert({
                    agent_id: agentId,
                    role: info.role,
                    status: 'idle', // Default to idle on revive
                    owner: 'Oculus',
                    metrics: { revived_at: new Date().toISOString() }
                });
            } else {
                // CASE: EXIST -> HEALTH CHECK
                // If heartbeat > 24h, mark as ERROR
                const lastBeat = new Date(dbAgent.last_heartbeat).getTime();
                const now = new Date().getTime();
                const hoursSince = (now - lastBeat) / (1000 * 60 * 60);

                if (hoursSince > 24 && dbAgent.status !== 'error') {
                    logs.push(`[WARN] Agent '${agentId}' silent for ${hoursSince.toFixed(1)}h. Flagging ERROR.`);
                    await supabase.from('system_state').update({ status: 'error' }).eq('agent_id', agentId);
                } else if (dbAgent.status === 'error' && hoursSince < 1) {
                    // Auto-clear error if heartbeat returned
                    logs.push(`[FIX] Agent '${agentId}' recovered. Clearing ERROR.`);
                    await supabase.from('system_state').update({ status: 'active' }).eq('agent_id', agentId);
                }
            }
        }

        return NextResponse.json({
            success: true,
            message: 'Oculus Scan Complete',
            logs
        });

    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}
