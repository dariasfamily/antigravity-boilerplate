
import { AgentLogic, SystemContext } from './types';
import { AGENTS } from '../config/agent_registry';
import { EgeriaLogic } from '../agents/egeria/EgeriaLogic';
import { OneiricLogic } from '../agents/oneiric/OneiricLogic'; // If exists? No, assuming standard set.
import { PlannerLogic } from '../agents/planner/PlannerLogic';
import { PulsarLogic } from '../agents/pulsar/PulsarLogic';
import { OrionLogic } from '../agents/orion/OrionLogic';
import { CalliopeLogic } from '../agents/calliope/CalliopeLogic';
import { ThaliaLogic } from '../agents/thalia/ThaliaLogic';
import { ApolloLogic } from '../agents/apollo/ApolloLogic';
import { ArgusLogic } from '../agents/argus/ArgusLogic';
import { NexusLogic } from '../agents/nexus/NexusLogic';
import { LyraLogic } from '../agents/lyra/LyraLogic';

export class AgentFactory {

    public static createLogic(agentId: string): AgentLogic<any, any> {
        // Map Agent ID to Logic Class
        // In a real system, this might use a DI container or dynamic import

        // Normalize ID to Base Role for matching (or just switch on ID)
        // Egeria
        if (agentId === AGENTS.EGERIA.id) return new EgeriaLogic();

        // Planner
        if (agentId === AGENTS.PLANNER.id) return new PlannerLogic();

        // Pulsar
        if (agentId === AGENTS.PULSAR.id) return new PulsarLogic();

        // Orion
        if (agentId === AGENTS.ORION.id) return new OrionLogic();

        // Calliope
        if (agentId === AGENTS.CALLIOPE.id) return new CalliopeLogic();

        // Thalia
        if (agentId === AGENTS.THALIA.id) return new ThaliaLogic();

        // Apollo
        if (agentId === AGENTS.APOLLO.id) return new ApolloLogic();

        // Argus
        if (agentId === AGENTS.ARGUS.id) return new ArgusLogic();

        // Nexus
        if (agentId === AGENTS.NEXUS.id) return new NexusLogic();

        // Lyra
        if (agentId === AGENTS.LYRA.id) return new LyraLogic();

        throw new Error(`Unknown Agent ID: ${agentId}`);
    }
}
