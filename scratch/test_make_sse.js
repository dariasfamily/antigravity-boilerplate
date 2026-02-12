const EventSource = require('eventsource').EventSource || require('eventsource');
const { fetch } = global;

// Make.com SSE URL (from config)
const SSE_URL = "https://us2.make.com/mcp/u/291c8e1c-c2a0-431b-899b-8d340fdf3629/sse";

console.log(`[Test] Connecting to ${SSE_URL}...`);

const es = new EventSource(SSE_URL);

es.onopen = () => {
    console.log('[Test] Connected to SSE stream.');
};

es.onerror = (err) => {
    console.error('[Test] SSE Error:', err);
    process.exit(1);
};

es.addEventListener('endpoint', (event) => {
    console.log(`[Test] Received Endpoint Event: ${event.data}`);
    // If we receive an endpoint, the connection is VALID and working.
    console.log('[Test] VERIFICATION SUCCESSFUL');
    es.close();
    process.exit(0);
});

es.onmessage = (event) => {
    console.log(`[Test] Received Message: ${event.data}`);
};

// Timeout after 10 seconds
setTimeout(() => {
    console.error('[Test] Timeout waiting for endpoint event.');
    es.close();
    process.exit(1);
}, 10000);
