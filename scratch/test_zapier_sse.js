const EventSource = require('eventsource').EventSource || require('eventsource');
const { fetch } = global;

// Zapier SSE URL (from config)
const SSE_URL = "https://mcp.zapier.com/api/v1/connect?token=OTgxYTA3OWMtZTRiOC00OGEzLWI2YTItOTk2ODU4ODE4NWRlOnhMTXgrQldXZUxuai9vbkp6ek5zZkFoNkpLK1k1L0pmSm1WczJEc3BDSGc9";

console.log(`[Test] Connecting to Zapier SSE...`);

const es = new EventSource(SSE_URL);

es.onopen = () => {
    console.log('[Test] Connected to SSE stream.');
};

es.onerror = (err) => {
    // Zapier might close connection or error if token invalid
    console.error('[Test] SSE Error:', err);
    // Don't exit immediately on error, might be transient or initial handshake
};

es.addEventListener('endpoint', (event) => {
    console.log(`[Test] Received Endpoint Event: ${event.data}`);
    console.log('[Test] VERIFICATION SUCCESSFUL');
    es.close();
    process.exit(0);
});

// Timeout after 10 seconds
setTimeout(() => {
    console.error('[Test] Timeout waiting for endpoint event.');
    es.close();
    process.exit(1);
}, 10000);
