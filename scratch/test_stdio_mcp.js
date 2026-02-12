const { spawn } = require('child_process');

const args = process.argv.slice(2);
const COMMAND = args[0];
const COMMAND_ARGS = args.slice(1, -1);
const ENV_JSON = args[args.length - 1];

if (!COMMAND) {
    console.error('Usage: node test_stdio_mcp.js <cmd> [args...] <env_json>');
    process.exit(1);
}

let env = {};
try {
    env = JSON.parse(ENV_JSON);
} catch (e) {
    console.error('Failed to parse ENV_JSON');
}

console.error(`[TestStdio] Spawning: ${COMMAND} ${COMMAND_ARGS.join(' ')}`);
const child = spawn(COMMAND, COMMAND_ARGS, {
    env: { ...process.env, ...env },
    stdio: ['pipe', 'pipe', 'inherit'],
    shell: true
});

let output = '';
child.stdout.on('data', (data) => {
    output += data.toString();
    console.error(`[TestStdio] Received: ${data.toString()}`);
    // Check for success markers (jsonrpc response to id:1)
    if (output.includes('"id":1')) {
        console.error('[TestStdio] SUCCESS: Received response!');
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

console.error('[TestStdio] Sending list_tools request...');
child.stdin.write(request);

setTimeout(() => {
    console.error('[TestStdio] Timeout waiting for response.');
    child.kill();
    process.exit(1);
}, 15000);
