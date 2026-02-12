import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import path from 'path';
import { ArgusOutput } from '@/types/agent_types';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const scriptPath = path.join(process.cwd(), 'scripts', 'brand_argus_handler.py');

        return new Promise((resolve) => {
            const pythonProcess = exec(`python "${scriptPath}"`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Argus Error: ${error.message}`);
                    resolve(NextResponse.json({ error: 'Argus Execution Failed' }, { status: 500 }));
                    return;
                }

                try {
                    // Python script prints JSON to stdout
                    const result = JSON.parse(stdout);
                    // Map the python output to our TS interface if needed, or just return
                    // Python returns { "ArgusOutput_Contract": ... }
                    // We can just forward it or adapt it.
                    resolve(NextResponse.json(result));
                } catch (parseError) {
                    console.error(`Argus Output Parse Error: ${stdout}`);
                    resolve(NextResponse.json({ error: 'Invalid Output from Argus' }, { status: 500 }));
                }
            });

            // Write input data to stdin of the python process
            if (pythonProcess.stdin) {
                pythonProcess.stdin.write(JSON.stringify(body));
                pythonProcess.stdin.end();
            }
        });
    } catch (error) {
        return NextResponse.json({ error: 'Argus Request Failed' }, { status: 500 });
    }
}
