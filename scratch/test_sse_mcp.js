const EventSource = require('eventsource').EventSource || require('eventsource');
const { fetch } = global;

const args = process.argv.slice(2);
const SSE_URL = args[0];
const SERVER_NAME = args[1] || 'Unknown';

if (!SSE_URL) {
    console.error('Usage: node test_sse_mcp.js <SSE_URL> [SERVER_NAME]');
    process.exit(1);
}

console.error(`[${SERVER_NAME}] Connecting...`);
const es = new EventSource(SSE_URL, {
    headers: { 'Accept': 'text/event-stream' }
});

let postEndpoint = null;
let toolsReceived = false;

es.onopen = () => console.error(`[${SERVER_NAME}] SSE Open.`);
es.onerror = (err) => {
    console.error(`[${SERVER_NAME}] SSE Error:`, err);
    process.exit(1);
};

es.onmessage = (event) => {
    console.error(`[${SERVER_NAME}] Message received:`, event.data);
    if (!event.data) return;
    try {
        const data = JSON.parse(event.data);
        if (data.id === 1) {
            console.error(`[${SERVER_NAME}] SUCCESS: Received response.`);
            console.log(JSON.stringify(data, null, 2));
            toolsReceived = true;
            es.close();
            process.exit(0);
        }
    } catch (e) { }
};

es.addEventListener('endpoint', (event) => {
    console.error(`[${SERVER_NAME}] Event 'endpoint':`, event.data);
    postEndpoint = new URL(event.data, SSE_URL).toString();
    console.error(`[${SERVER_NAME}] Fully resolved endpoint: ${postEndpoint}`);

    // Now send listTools
    sendListTools();
});

// Generic listener for any other potential event names
const commonEvents = ['message', 'endpoint', 'open', 'error', 'ping', 'keep-alive', 'heartbeat'];
commonEvents.forEach(evt => {
    es.addEventListener(evt, (e) => console.error(`[${SERVER_NAME}] Event '${evt}' Triggered.`));
});

async function sendListTools() {
    if (!postEndpoint) return;
    console.error(`[${SERVER_NAME}] Sending list_tools...`);
    try {
        const response = await fetch(postEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                jsonrpc: "2.0",
                id: 1,
                method: "tools/list",
                params: {}
            })
        });
        if (!response.ok) {
            console.error(`[${SERVER_NAME}] POST Failed: ${response.status}`);
            process.exit(1);
        }
    } catch (err) {
        console.error(`[${SERVER_NAME}] POST Error:`, err);
        process.exit(1);
    }
}

setTimeout(() => {
    if (!toolsReceived) {
        console.error(`[${SERVER_NAME}] Timeout.`);
        es.close();
        process.exit(1);
    }
}, 20000);
