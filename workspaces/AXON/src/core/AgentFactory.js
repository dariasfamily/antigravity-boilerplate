"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentFactory = void 0;
const agent_registry_1 = require("../config/agent_registry");
const EgeriaLogic_1 = require("../agents/egeria/EgeriaLogic");
const PlannerLogic_1 = require("../agents/planner/PlannerLogic");
const PulsarLogic_1 = require("../agents/pulsar/PulsarLogic");
const OrionLogic_1 = require("../agents/orion/OrionLogic");
const CalliopeLogic_1 = require("../agents/calliope/CalliopeLogic");
const ThaliaLogic_1 = require("../agents/thalia/ThaliaLogic");
const ApolloLogic_1 = require("../agents/apollo/ApolloLogic");
const ArgusLogic_1 = require("../agents/argus/ArgusLogic");
const NexusLogic_1 = require("../agents/nexus/NexusLogic");
const LyraLogic_1 = require("../agents/lyra/LyraLogic");
class AgentFactory {
    static createLogic(agentId) {
        // Map Agent ID to Logic Class
        // In a real system, this might use a DI container or dynamic import
        // Normalize ID to Base Role for matching (or just switch on ID)
        // Egeria
        if (agentId === agent_registry_1.AGENTS.EGERIA.id)
            return new EgeriaLogic_1.EgeriaLogic();
        // Planner
        if (agentId === agent_registry_1.AGENTS.PLANNER.id)
            return new PlannerLogic_1.PlannerLogic();
        // Pulsar
        if (agentId === agent_registry_1.AGENTS.PULSAR.id)
            return new PulsarLogic_1.PulsarLogic();
        // Orion
        if (agentId === agent_registry_1.AGENTS.ORION.id)
            return new OrionLogic_1.OrionLogic();
        // Calliope
        if (agentId === agent_registry_1.AGENTS.CALLIOPE.id)
            return new CalliopeLogic_1.CalliopeLogic();
        // Thalia
        if (agentId === agent_registry_1.AGENTS.THALIA.id)
            return new ThaliaLogic_1.ThaliaLogic();
        // Apollo
        if (agentId === agent_registry_1.AGENTS.APOLLO.id)
            return new ApolloLogic_1.ApolloLogic();
        // Argus
        if (agentId === agent_registry_1.AGENTS.ARGUS.id)
            return new ArgusLogic_1.ArgusLogic();
        // Nexus
        if (agentId === agent_registry_1.AGENTS.NEXUS.id)
            return new NexusLogic_1.NexusLogic();
        // Lyra
        if (agentId === agent_registry_1.AGENTS.LYRA.id)
            return new LyraLogic_1.LyraLogic();
        throw new Error(`Unknown Agent ID: ${agentId}`);
    }
}
exports.AgentFactory = AgentFactory;
