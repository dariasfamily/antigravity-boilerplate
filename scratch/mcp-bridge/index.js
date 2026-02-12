const { EventSource } = require('eventsource');
const { fetch } = global; // Node 18+ has native fetch

const SUPABASE_URL = process.argv[2];
const AUTH_HEADER = process.argv[3];

if (!SUPABASE_URL || !AUTH_HEADER) {
    console.error('Usage: node index.js <SUPABASE_URL> <AUTH_HEADER>');
    process.exit(1);
}

const headers = {
    'Authorization': AUTH_HEADER
};

console.error(`Connecting to ${SUPABASE_URL}...`);

const es = new EventSource(SUPABASE_URL, { headers });
let postEndpoint = null;

es.onopen = () => {
    console.error('Connected to Supabase SSE.');
};

es.onerror = (err) => {
    console.error('SSE Error:', err);
};

es.addEventListener('endpoint', (event) => {
    const uri = event.data;
    // Resolve relative URI if needed
    postEndpoint = new URL(uri, SUPABASE_URL).toString();
    console.error(`Endpoint Received: ${postEndpoint}`);
});

es.onmessage = (event) => {
    // Forward SSE messages (JSON-RPC responses) to stdout
    console.log(event.data);
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
        console.error('Error: Received request before endpoint established.');
        return;
    }

    try {
        await fetch(postEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
            body: line
        });
    } catch (err) {
        console.error('Failed to POST message:', err);
    }
}
