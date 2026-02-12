const { spawn } = require('child_process');

const ACCESS_TOKEN = "sbp_4f9e7936d3368c9a54c9d4f4e3a97d7494382d3f";

console.error('[SupabaseTest] Spawning...');
const child = spawn('npx', ['-y', '@supabase/mcp-server-supabase@latest', '--access-token', ACCESS_TOKEN], {
    stdio: ['pipe', 'pipe', 'inherit'],
    shell: true
});

let output = '';
child.stdout.on('data', (data) => {
    output += data.toString();
    console.error(`[SupabaseTest] Received: ${data.toString()}`);
    if (output.includes('"id":1')) {
        console.error('[SupabaseTest] SUCCESS: Received response!');
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

console.error('[SupabaseTest] Sending list_tools request...');
child.stdin.write(request);

setTimeout(() => {
    console.error('[SupabaseTest] Timeout.');
    child.kill();
    process.exit(1);
}, 20000);
