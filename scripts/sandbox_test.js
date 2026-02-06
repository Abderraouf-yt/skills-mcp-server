import { spawn } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Configuration
const SERVER_PATH = join(__dirname, '../dist/index.js');
const TEST_SCENARIOS = [
    "I need to build a secure React frontend with authentication",
    "How do I optimize my Python backend API performance?",
    "Setup a CI/CD pipeline for a Next.js app on AWS"
];

console.log('🧪 Starting Antigravity Skills Sandbox Simulation...');
console.log('Target Server:', SERVER_PATH);
console.log('---------------------------------------------------\n');

const server = spawn('node', [SERVER_PATH], {
    stdio: ['pipe', 'pipe', 'inherit']
});

let buffer = '';
let responseCount = 0;

server.stdout.on('data', (data) => {
    buffer += data.toString();
    const lines = buffer.split('\n');
    buffer = lines.pop(); // Keep incomplete line

    for (const line of lines) {
        if (!line.trim()) continue;

        try {
            const response = JSON.parse(line);

            // Handle Prompt List Response (Init)
            if (response.id === 'init') {
                runScenarios();
            }
            // Handle Scenario Responses
            else if (response.id && typeof response.id === 'number') {
                const scenarioIdx = response.id;
                const scenario = TEST_SCENARIOS[scenarioIdx];

                console.log(`\n🗣️  USER TASK: "${scenario}"`);
                console.log('🤖 AGENT DETECTED SKILLS:');

                if (response.result?.messages?.[0]?.content?.text) {
                    const text = response.result.messages[0].content.text;
                    // Parse out the skill names for a clean summary
                    const skillHeaders = text.match(/## 🎯 (.*)/g) || [];

                    if (skillHeaders.length > 0) {
                        skillHeaders.forEach(h => console.log(`   ✅ ${h.replace('## 🎯 ', '')}`));
                        console.log(`\n   (Plus full content injection for each skill...)`);
                    } else {
                        console.log('   ⚠️  No specific skills found (General fallback)');
                    }
                } else {
                    console.log('   ❌ Error: Invalid response format');
                }

                responseCount++;
                if (responseCount === TEST_SCENARIOS.length) {
                    console.log('\n---------------------------------------------------');
                    console.log('🎉 Sandbox Test Complete!');
                    process.exit(0);
                }
            }
        } catch (e) {
            // Ignore non-JSON lines (logs)
        }
    }
});

function runScenarios() {
    TEST_SCENARIOS.forEach((task, index) => {
        const req = {
            jsonrpc: '2.0',
            id: index,
            method: 'prompts/get',
            params: {
                name: 'auto_skill',
                arguments: { task }
            }
        };
        server.stdin.write(JSON.stringify(req) + '\n');
    });
}

// 1. Send Init (List Prompts) to wake server
setTimeout(() => {
    server.stdin.write(JSON.stringify({
        jsonrpc: '2.0',
        id: 'init',
        method: 'prompts/list'
    }) + '\n');
}, 1000);
