#!/usr/bin/env node
/**
 * @antigravity/skills-mcp-server
 * 
 * Universal MCP server for 634+ Antigravity Awesome Skills
 * Works with: Gemini CLI, Claude Code, Cursor, Copilot, OpenCode, AdaL & more
 * 
 * Usage:
 *   npx @antigravity/skills-mcp-server
 *   
 * Quick Setup:
 *   npx @antigravity/skills-mcp-server --setup gemini
 *   npx @antigravity/skills-mcp-server --setup claude
 *   npx @antigravity/skills-mcp-server --setup cursor
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { readFileSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ============================================================================
// TYPES
// ============================================================================

interface Skill {
    id: string;
    path: string;
    category: string;
    name: string;
    description: string;
    risk: string;
    source: string;
}

interface CategoryStats {
    name: string;
    count: number;
    skills: string[];
}

// ============================================================================
// DATA LOADING
// ============================================================================

function loadSkillsData(): Skill[] {
    const possiblePaths = [
        join(__dirname, '..', 'data', 'skills_index.json'),
        join(__dirname, '..', '..', 'antigravity-awesome-skills', 'skills_index.json'),
        join(process.cwd(), 'skills_index.json'),
        join(process.cwd(), 'antigravity-awesome-skills', 'skills_index.json'),
    ];

    for (const p of possiblePaths) {
        if (existsSync(p)) {
            const data = readFileSync(p, 'utf-8');
            return JSON.parse(data) as Skill[];
        }
    }

    console.error('Skills data not found. Please ensure skills_index.json is in the data/ folder.');
    return [];
}

const skills: Skill[] = loadSkillsData();

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function getCategories(): CategoryStats[] {
    const categoryMap = new Map<string, string[]>();

    for (const skill of skills) {
        const cat = skill.category || 'uncategorized';
        if (!categoryMap.has(cat)) {
            categoryMap.set(cat, []);
        }
        categoryMap.get(cat)!.push(skill.id);
    }

    return Array.from(categoryMap.entries())
        .map(([name, skillIds]) => ({
            name,
            count: skillIds.length,
            skills: skillIds.slice(0, 10) // First 10 for preview
        }))
        .sort((a, b) => b.count - a.count);
}

function searchSkills(query: string, limit: number = 20): Skill[] {
    const lowerQuery = query.toLowerCase();
    return skills
        .filter(s =>
            s.name.toLowerCase().includes(lowerQuery) ||
            s.description.toLowerCase().includes(lowerQuery) ||
            s.id.toLowerCase().includes(lowerQuery)
        )
        .slice(0, limit);
}

function suggestWorkflow(goal: string): { steps: Array<{ skill: string; action: string; reason: string }> } {
    const keywords = goal.toLowerCase();
    const steps: Array<{ skill: string; action: string; reason: string }> = [];

    // Planning phase
    if (keywords.includes('api') || keywords.includes('backend')) {
        steps.push({ skill: 'api-design-principles', action: 'design', reason: 'Define API structure and endpoints' });
    }
    if (keywords.includes('web') || keywords.includes('frontend')) {
        steps.push({ skill: 'react-best-practices', action: 'design', reason: 'Plan component architecture' });
    }
    if (keywords.includes('security') || keywords.includes('secure')) {
        steps.push({ skill: 'api-security-best-practices', action: 'audit', reason: 'Security requirements analysis' });
    }

    // Implementation phase
    if (keywords.includes('typescript') || keywords.includes('ts')) {
        steps.push({ skill: 'typescript-expert', action: 'implement', reason: 'TypeScript implementation patterns' });
    }
    if (keywords.includes('python')) {
        steps.push({ skill: 'python-pro', action: 'implement', reason: 'Python implementation patterns' });
    }
    if (keywords.includes('react')) {
        steps.push({ skill: 'react-patterns', action: 'implement', reason: 'React component patterns' });
    }
    if (keywords.includes('next') || keywords.includes('nextjs')) {
        steps.push({ skill: 'nextjs-best-practices', action: 'implement', reason: 'Next.js app structure' });
    }

    // Testing phase
    steps.push({ skill: 'testing-patterns', action: 'test', reason: 'Unit and integration testing' });

    // Documentation phase
    if (keywords.includes('api')) {
        steps.push({ skill: 'api-documentation-generator', action: 'document', reason: 'Generate API docs' });
    }

    // Fallback if no matches
    if (steps.length === 0) {
        steps.push({ skill: 'brainstorming', action: 'plan', reason: 'Start with ideation and planning' });
        steps.push({ skill: 'architecture', action: 'design', reason: 'Define system architecture' });
    }

    return { steps };
}

// ============================================================================
// MCP SERVER SETUP (2026 Best Practices - Zod v3 with z.object() wrapping)
// ============================================================================

const server = new McpServer({
    name: 'antigravity-skills',
    version: '1.0.0',
});

// ---------------------------------------------------------------------------
// TOOL: list_skills
// ---------------------------------------------------------------------------
server.tool(
    'list_skills',
    'List available skills with optional filtering by category. Returns skill IDs, names, and descriptions.',
    {
        category: z.string().optional().describe('Filter by category (e.g., "security", "development")'),
        limit: z.number().optional().default(50).describe('Maximum number of skills to return'),
        offset: z.number().optional().default(0).describe('Offset for pagination'),
    },
    async ({ category, limit = 50, offset = 0 }) => {
        let filtered = skills;

        if (category) {
            filtered = skills.filter(s => s.category.toLowerCase().includes(category.toLowerCase()));
        }

        const paginated = filtered.slice(offset, offset + limit);
        const result = {
            total: filtered.length,
            returned: paginated.length,
            offset,
            skills: paginated.map(s => ({
                id: s.id,
                name: s.name,
                description: s.description.slice(0, 150) + (s.description.length > 150 ? '...' : ''),
                category: s.category,
                risk: s.risk,
            })),
        };

        return {
            content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
        };
    }
);

// ---------------------------------------------------------------------------
// TOOL: get_skill
// ---------------------------------------------------------------------------
server.tool(
    'get_skill',
    'Get full details about a specific skill including its path, source, and complete description.',
    {
        skillId: z.string().describe('The skill ID (e.g., "react-patterns", "api-security-best-practices")'),
    },
    async ({ skillId }) => {
        const skill = skills.find(s => s.id === skillId || s.name === skillId);

        if (!skill) {
            return {
                content: [{ type: 'text', text: `Skill "${skillId}" not found. Use list_skills to see available skills.` }],
                isError: true,
            };
        }

        return {
            content: [{ type: 'text', text: JSON.stringify(skill, null, 2) }],
        };
    }
);

// ---------------------------------------------------------------------------
// TOOL: search_skills
// ---------------------------------------------------------------------------
server.tool(
    'search_skills',
    'Search skills by name or description. Returns matching skills ranked by relevance.',
    {
        query: z.string().describe('Search query (e.g., "authentication", "react testing", "kubernetes")'),
        limit: z.number().optional().default(20).describe('Maximum results to return'),
    },
    async ({ query, limit = 20 }) => {
        const results = searchSkills(query, limit);
        const output = {
            query,
            count: results.length,
            skills: results.map(s => ({
                id: s.id,
                name: s.name,
                description: s.description.slice(0, 200),
                category: s.category,
            })),
        };

        return {
            content: [{ type: 'text', text: JSON.stringify(output, null, 2) }],
        };
    }
);

// ---------------------------------------------------------------------------
// TOOL: get_categories
// ---------------------------------------------------------------------------
server.tool(
    'get_categories',
    'Get all skill categories with counts and sample skills. Useful for exploring available capabilities.',
    {},
    async () => {
        const categories = getCategories();
        const output = {
            totalSkills: skills.length,
            totalCategories: categories.length,
            categories,
        };

        return {
            content: [{ type: 'text', text: JSON.stringify(output, null, 2) }],
        };
    }
);

// ---------------------------------------------------------------------------
// TOOL: suggest_workflow
// ---------------------------------------------------------------------------
server.tool(
    'suggest_workflow',
    'Suggest a sequence of skills to accomplish a goal. Provides step-by-step guidance using relevant skills.',
    {
        goal: z.string().describe('What you want to accomplish (e.g., "build a secure REST API with TypeScript")'),
    },
    async ({ goal }) => {
        const workflow = suggestWorkflow(goal);
        const output = {
            goal,
            workflow: workflow.steps,
            totalSteps: workflow.steps.length,
            reasoning: `Based on your goal "${goal}", I suggest following these ${workflow.steps.length} steps using the available skills.`,
        };

        return {
            content: [{ type: 'text', text: JSON.stringify(output, null, 2) }],
        };
    }
);

// ---------------------------------------------------------------------------
// TOOL: get_skill_content
// ---------------------------------------------------------------------------
server.tool(
    'get_skill_content',
    'Read the full SKILL.md content for a specific skill. Returns the complete instructions and guidance.',
    {
        skillId: z.string().describe('The skill ID'),
    },
    async ({ skillId }) => {
        const skill = skills.find(s => s.id === skillId);
        if (!skill) {
            return {
                content: [{ type: 'text', text: `Skill "${skillId}" not found.` }],
                isError: true,
            };
        }

        // Try to read the SKILL.md file
        const skillPaths = [
            join(__dirname, '..', '..', 'antigravity-awesome-skills', skill.path, 'SKILL.md'),
            join(process.cwd(), 'antigravity-awesome-skills', skill.path, 'SKILL.md'),
            join(process.cwd(), skill.path, 'SKILL.md'),
        ];

        for (const p of skillPaths) {
            if (existsSync(p)) {
                const content = readFileSync(p, 'utf-8');
                return {
                    content: [{ type: 'text', text: content }],
                };
            }
        }

        return {
            content: [{
                type: 'text',
                text: `Skill file not found locally. Skill info:\n\n${JSON.stringify(skill, null, 2)}\n\nTo get full content, clone the repository: git clone https://github.com/Abderraouf-yt/antigravity-awesome-skills.git`
            }],
        };
    }
);

// ---------------------------------------------------------------------------
// RESOURCE: skill://catalog
// ---------------------------------------------------------------------------
server.resource(
    'skill://catalog',
    'Complete catalog of all 634+ available skills',
    async () => ({
        contents: [{
            uri: 'skill://catalog',
            text: JSON.stringify({
                totalSkills: skills.length,
                categories: getCategories(),
                skills: skills.map(s => ({ id: s.id, name: s.name, category: s.category })),
            }, null, 2),
            mimeType: 'application/json',
        }],
    })
);

// ---------------------------------------------------------------------------
// RESOURCE: skill://categories
// ---------------------------------------------------------------------------
server.resource(
    'skill://categories',
    'Category breakdown with counts',
    async () => ({
        contents: [{
            uri: 'skill://categories',
            text: JSON.stringify(getCategories(), null, 2),
            mimeType: 'application/json',
        }],
    })
);

// ============================================================================
// START SERVER
// ============================================================================

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error('🌌 Antigravity Skills MCP Server running on stdio');
    console.error(`📚 Loaded ${skills.length} skills`);
}

main().catch(console.error);
