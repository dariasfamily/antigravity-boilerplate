const EventSource = require('eventsource').EventSource || require('eventsource');
const { fetch } = global; // Node 18+ has native fetch

// Arguments:
// 1. URL (Required)
// 2. Auth Header (Optional) - Format: "Bearer <token>" or "Basic <token>"
// 3. Custom Header Name (Optional) - Default: "Authorization"

const args = process.argv.slice(2);
const SSE_URL = args[0];
let AUTH_VALUE = args[1];
const AUTH_HEADER_NAME = args[2] || 'Authorization';

// Resolve Env Var if needed
if (AUTH_VALUE && AUTH_VALUE.startsWith('$')) {
    const envVarName = AUTH_VALUE.substring(1);
    AUTH_VALUE = process.env[envVarName];
    if (!AUTH_VALUE) {
        console.error(`[DebugBridge] Warning: Environment variable ${envVarName} is not set.`);
    }
}

if (!SSE_URL) {
    console.error('Usage: node debug-mcp-bridge.js <SSE_URL> [AUTH_VALUE] [AUTH_HEADER_NAME]');
    process.exit(1);
}

const headers = {
    'Accept': 'text/event-stream'
};
if (AUTH_VALUE) {
    headers[AUTH_HEADER_NAME] = AUTH_VALUE;
}

console.error(`[DebugBridge] Connecting to ${SSE_URL}...`);
if (AUTH_VALUE) {
    console.error(`[DebugBridge] Using header: ${AUTH_HEADER_NAME}: ${AUTH_VALUE.substring(0, 5)}...`);
}

const es = new EventSource(SSE_URL, { headers });
let postEndpoint = null;

es.onopen = () => {
    console.error('[DebugBridge] Connected to SSE stream.');
};

es.onerror = (err) => {
    console.error('[DebugBridge] SSE Error:', err);
    if (err.status) {
        console.error(`[DebugBridge] HTTP Status: ${err.status}`);
    }
};

es.addEventListener('endpoint', (event) => {
    const uri = event.data;
    // Resolve relative URI if needed
    try {
        postEndpoint = new URL(uri, SSE_URL).toString();
        console.error(`[DebugBridge] Endpoint Received: ${postEndpoint}`);
    } catch (e) {
        console.error(`[DebugBridge] Failed to parse endpoint URI: ${uri}`, e);
    }
});

es.onmessage = (event) => {
    // Forward SSE messages (JSON-RPC responses) to stdout
    if (!event.data) return;
    try {
        // Just validation, forward raw data
        JSON.parse(event.data);
        console.log(event.data);
    } catch (e) {
        console.error('[DebugBridge] Received invalid JSON:', event.data);
    }
};

// Handle stdin (JSON-RPC requests from client)
process.stdin.setEncoding('utf8');
let buffer = '';

process.stdin.on('data', (chunk) => {
    buffer += chunk;
    const lines = buffer.split('\n');
    buffer = lines.pop(); // Keep incomplete line

    for (const line of lines) {
        if (line.trim()) {
            handleRequest(line);
        }
    }
});

async function handleRequest(line) {
    if (!postEndpoint) {
        console.error('[DebugBridge] Error: Received request before endpoint established.');
        return;
    }

    try {
        console.error(`[DebugBridge] Posting to ${postEndpoint}...`);
        const response = await fetch(postEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
            body: line
        });

        if (!response.ok) {
            console.error(`[DebugBridge] POST failed with status ${response.status} ${response.statusText}`);
            const text = await response.text();
            console.error(`[DebugBridge] Response body: ${text}`);
        } else {
            // console.error('[DebugBridge] POST success');
        }
    } catch (err) {
        console.error('[DebugBridge] Failed to POST message:', err);
    }
}

process.on('uncaughtException', (err) => {
    console.error('[DebugBridge] Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('[DebugBridge] Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('exit', (code) => {
    console.error(`[DebugBridge] Process exiting with code: ${code}`);
});
