const { spawn } = require('child_process');

const ENV = {
    PERPLEXITY_API_KEY: "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"
};

console.error('[PerplexityTest] Spawning...');
const child = spawn('npx', ['-y', '@perplexity-ai/mcp-server'], {
    env: { ...process.env, ...ENV },
    stdio: ['pipe', 'pipe', 'inherit'],
    shell: true
});

let output = '';
child.stdout.on('data', (data) => {
    output += data.toString();
    console.error(`[PerplexityTest] Received: ${data.toString()}`);
    if (output.includes('"id":1')) {
        console.error('[PerplexityTest] SUCCESS: Received response!');
        console.log(output);
        process.exit(0);
    }
});

const request = JSON.stringify({
    jsonrpc: "2.0",
    id: 1,
    method: "tools/list",
    params: {}
}) + "\n";

console.error('[PerplexityTest] Sending list_tools request...');
child.stdin.write(request);

setTimeout(() => {
    console.error('[PerplexityTest] Timeout.');
    child.kill();
    process.exit(1);
}, 20000);
