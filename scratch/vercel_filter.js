#!/usr/bin/env node

/**
 * Vercel MCP Tool Filter Proxy
 * Wraps @robinson_ai_systems/vercel-mcp and limits exposed tools to < 80.
 * 
 * Version 2: Added shell: true for Windows npx compatibility.
 */

const { spawn } = require('child_process');
const path = require('path');

// Configuration
const VERCEL_TOKEN = process.argv[2];
if (!VERCEL_TOKEN) {
    console.error("Usage: node vercel_filter.js <VERCEL_TOKEN>");
    process.exit(1);
}

// Start the actual MCP server
// We use npx to run it to ensure we get the binary context.
// 'shell: true' is CRITICAL for Windows to find npx.cmd
const serverProcess = spawn('npx', ['-y', '@robinson_ai_systems/vercel-mcp', VERCEL_TOKEN], {
    stdio: ['pipe', 'pipe', process.stderr], // Pipe stdin/stdout, inherit stderr for logs
    shell: true
});

// Buffer for incoming data
serverProcess.stdout.on('data', (data) => {
    const lines = data.toString().split('\n');
    for (const line of lines) {
        if (!line.trim()) continue;

        try {
            const msg = JSON.parse(line);
            processMessage(msg);
        } catch (e) {
            // Forward non-JSON lines (logs/preamble) directly
            process.stdout.write(line + '\n');
        }
    }
});

function processMessage(msg) {
    // Check if this is a response to tools/list
    if (msg.result && msg.result.tools) {
        const originalTools = msg.result.tools;
        const filteredTools = filterTools(originalTools);

        // Log for debugging
        console.error(`[Proxy] Filtered tools from ${originalTools.length} to ${filteredTools.length}`);

        msg.result.tools = filteredTools;
    }

    // Forward the (potentially modified) message to parent
    process.stdout.write(JSON.stringify(msg) + '\n');
}

function filterTools(tools) {
    // Keep essential tools: deployments, projects, domains, env vars.
    // We strictly limit to 50 to stay well under the 100 limit.
    const PRIORITY_KEYWORDS = ['deployment', 'project', 'domain', 'environment', 'variable', 'secret', 'log'];

    const kept = [];
    const others = [];

    for (const t of tools) {
        if (PRIORITY_KEYWORDS.some(k => t.name.toLowerCase().includes(k))) {
            kept.push(t);
        } else {
            others.push(t);
        }
    }

    //Fill up to 50 with others
    return [...kept, ...others].slice(0, 50);
}

// Forward stdin (AXON -> Proxy -> Server)
process.stdin.pipe(serverProcess.stdin);

serverProcess.on('exit', (code) => {
    process.exit(code);
});
