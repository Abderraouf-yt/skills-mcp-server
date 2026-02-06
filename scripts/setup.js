#!/usr/bin/env node
/**
 * One-click setup script for Antigravity Skills MCP Server
 * 
 * Usage:
 *   node scripts/setup.js --client gemini
 *   node scripts/setup.js --client claude
 *   node scripts/setup.js --client cursor
 *   node scripts/setup.js --client all
 */

import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { homedir } from 'os';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const serverPath = join(__dirname, '..', 'dist', 'index.js');

// ============================================================================
// CONFIG GENERATORS
// ============================================================================

const configs = {
    gemini: {
        path: join(homedir(), '.gemini', 'settings.json'),
        generate: (existingConfig) => {
            const config = existingConfig || { mcpServers: {} };
            config.mcpServers = config.mcpServers || {};
            config.mcpServers['antigravity-skills'] = {
                command: 'node',
                args: [serverPath],
            };
            return config;
        },
        name: 'Gemini CLI',
    },

    claude: {
        path: join(homedir(), '.config', 'claude', 'mcp_config.json'),
        altPath: join(homedir(), 'AppData', 'Roaming', 'Claude', 'claude_desktop_config.json'),
        generate: (existingConfig) => {
            const config = existingConfig || { mcpServers: {} };
            config.mcpServers = config.mcpServers || {};
            config.mcpServers['antigravity-skills'] = {
                command: 'node',
                args: [serverPath],
            };
            return config;
        },
        name: 'Claude Desktop / Claude Code',
    },

    cursor: {
        path: join(homedir(), '.cursor', 'mcp.json'),
        generate: (existingConfig) => {
            const config = existingConfig || { mcpServers: {} };
            config.mcpServers = config.mcpServers || {};
            config.mcpServers['antigravity-skills'] = {
                command: 'node',
                args: [serverPath],
            };
            return config;
        },
        name: 'Cursor',
    },

    vscode: {
        path: join(homedir(), '.vscode', 'mcp.json'),
        generate: (existingConfig) => {
            const config = existingConfig || { servers: {} };
            config.servers = config.servers || {};
            config.servers['antigravity-skills'] = {
                type: 'stdio',
                command: 'node',
                args: [serverPath],
            };
            return config;
        },
        name: 'VS Code',
    },

    copilot: {
        path: join(homedir(), '.github-copilot', 'mcp.json'),
        generate: (existingConfig) => {
            const config = existingConfig || { mcpServers: {} };
            config.mcpServers = config.mcpServers || {};
            config.mcpServers['antigravity-skills'] = {
                command: 'node',
                args: [serverPath],
            };
            return config;
        },
        name: 'GitHub Copilot',
    },

    opencode: {
        path: join(homedir(), '.opencode', 'mcp.json'),
        generate: (existingConfig) => {
            const config = existingConfig || { mcpServers: {} };
            config.mcpServers = config.mcpServers || {};
            config.mcpServers['antigravity-skills'] = {
                command: 'node',
                args: [serverPath],
            };
            return config;
        },
        name: 'OpenCode',
    },
};

// ============================================================================
// SETUP LOGIC
// ============================================================================

function setupClient(clientName) {
    const client = configs[clientName];
    if (!client) {
        console.error(`Unknown client: ${clientName}`);
        console.log('Available clients:', Object.keys(configs).join(', '));
        return false;
    }

    // Find config path
    let configPath = client.path;
    if (!existsSync(dirname(configPath))) {
        if (client.altPath && existsSync(dirname(client.altPath))) {
            configPath = client.altPath;
        } else {
            // Create directory
            mkdirSync(dirname(configPath), { recursive: true });
        }
    }

    // Load existing config
    let existingConfig = null;
    if (existsSync(configPath)) {
        try {
            existingConfig = JSON.parse(readFileSync(configPath, 'utf-8'));
        } catch {
            console.warn(`Could not parse existing config at ${configPath}, creating new one`);
        }
    }

    // Generate new config
    const newConfig = client.generate(existingConfig);

    // Write config
    writeFileSync(configPath, JSON.stringify(newConfig, null, 2));
    console.log(`✅ ${client.name} configured at: ${configPath}`);
    return true;
}

function showManualInstructions() {
    console.log(`
╔═══════════════════════════════════════════════════════════════════════════╗
║           🌌 Antigravity Skills MCP Server - Manual Setup                 ║
╠═══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  Add this to your MCP configuration:                                     ║
║                                                                          ║
║  {                                                                       ║
║    "mcpServers": {                                                       ║
║      "antigravity-skills": {                                             ║
║        "command": "node",                                                ║
║        "args": ["${serverPath.replace(/\\/g, '\\\\')}"]                             ║
║      }                                                                   ║
║    }                                                                     ║
║  }                                                                       ║
║                                                                          ║
║  Config file locations by client:                                        ║
║  • Gemini CLI:  ~/.gemini/settings.json                                  ║
║  • Claude:      ~/.config/claude/mcp_config.json (or AppData on Win)     ║
║  • Cursor:      ~/.cursor/mcp.json                                       ║
║  • VS Code:     ~/.vscode/mcp.json                                       ║
║  • Copilot:     ~/.github-copilot/mcp.json                               ║
║                                                                          ║
╚═══════════════════════════════════════════════════════════════════════════╝
`);
}

// ============================================================================
// MAIN
// ============================================================================

const args = process.argv.slice(2);
const clientArg = args.find(a => a.startsWith('--client=') || args[args.indexOf('--client') + 1]);
const client = clientArg?.replace('--client=', '') || args[args.indexOf('--client') + 1];

console.log(`
╔═══════════════════════════════════════════════════════════════════════════╗
║              🌌 Antigravity Skills MCP Server Setup                       ║
║                     634+ Skills for AI Agents                             ║
╚═══════════════════════════════════════════════════════════════════════════╝
`);

if (!client || client === 'help') {
    console.log('Usage: node scripts/setup.js --client <client-name>');
    console.log('');
    console.log('Available clients:');
    Object.entries(configs).forEach(([key, val]) => {
        console.log(`  • ${key.padEnd(10)} - ${val.name}`);
    });
    console.log(`  • all        - Setup all clients`);
    console.log('');
    showManualInstructions();
    process.exit(0);
}

if (client === 'all') {
    console.log('Setting up all clients...\n');
    Object.keys(configs).forEach(setupClient);
    console.log('\n✅ All clients configured!');
} else {
    setupClient(client);
}

console.log(`
╔═══════════════════════════════════════════════════════════════════════════╗
║                           🎉 Setup Complete!                              ║
╠═══════════════════════════════════════════════════════════════════════════╣
║                                                                          ║
║  Available Tools:                                                        ║
║  • list_skills     - List all skills with filtering                      ║
║  • search_skills   - Search by name/description                          ║
║  • get_skill       - Get detailed skill info                             ║
║  • get_categories  - View skill categories                               ║
║  • suggest_workflow - Get skill-based workflow for a goal                ║
║  • get_skill_content - Read full SKILL.md content                        ║
║                                                                          ║
║  Try: "Use antigravity-skills to search for react patterns"              ║
║                                                                          ║
╚═══════════════════════════════════════════════════════════════════════════╝
`);
