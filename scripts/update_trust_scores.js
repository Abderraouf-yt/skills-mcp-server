/**
 * Updates skills_index.json with Context7 trust scores
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const skillsPath = path.join(__dirname, '..', 'data', 'skills_index.json');
const skills = JSON.parse(fs.readFileSync(skillsPath, 'utf8'));

// Context7 verified skills from https://context7.com/skills
const context7TrustedSkills = {
    'frontend-design': { trustScore: 8.5, source: 'anthropics/skills' },
    'vercel-react-best-practices': { trustScore: 9.6, source: 'vercel-labs/agent-skills' },
    'skill-creator': { trustScore: 8.5, source: 'anthropics/skills' },
    'pdf': { trustScore: 8.5, source: 'anthropics/skills' },
    'senior-frontend': { trustScore: 8.9, source: 'alirezarezvani/claude-skills' },
    'webapp-testing': { trustScore: 8.5, source: 'anthropics/skills' },
    'web-artifacts-builder': { trustScore: 8.5, source: 'anthropics/skills' },
    'mcp-builder': { trustScore: 8.5, source: 'anthropics/skills' },
    'web-design-guidelines': { trustScore: 9.6, source: 'vercel-labs/agent-skills' },
    'canvas-design': { trustScore: 8.5, source: 'anthropics/skills' },
    // Additional anthropics/skills from GitHub
    'algorithmic-art': { trustScore: 8.5, source: 'anthropics/skills' },
    'brand-guidelines': { trustScore: 8.5, source: 'anthropics/skills' },
    'doc-coauthoring': { trustScore: 8.5, source: 'anthropics/skills' },
    'docx': { trustScore: 8.5, source: 'anthropics/skills' },
    'internal-comms': { trustScore: 8.5, source: 'anthropics/skills' },
    'pptx': { trustScore: 8.5, source: 'anthropics/skills' },
    'slack-gif-creator': { trustScore: 8.5, source: 'anthropics/skills' },
    'theme-factory': { trustScore: 8.5, source: 'anthropics/skills' },
    'xlsx': { trustScore: 8.5, source: 'anthropics/skills' }
};

let updated = 0;
skills.forEach(skill => {
    if (context7TrustedSkills[skill.id]) {
        const trusted = context7TrustedSkills[skill.id];
        skill.risk = 'safe';
        skill.source = trusted.source;
        skill.trustScore = trusted.trustScore;
        updated++;
        console.log(`✓ Updated: ${skill.id} (Trust: ${trusted.trustScore}, Source: ${trusted.source})`);
    }
});

// Write with proper formatting
fs.writeFileSync(skillsPath, JSON.stringify(skills, null, 2).replace(/\n/g, '\r\n'), 'utf8');
console.log(`\n✅ Updated ${updated} skills with Context7 trust data`);
