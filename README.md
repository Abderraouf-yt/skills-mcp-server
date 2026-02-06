# 🌌 Antigravity Skills MCP Server

**Universal MCP server for 634+ AI development skills**

Works with: Gemini CLI • Claude Code • Cursor • VS Code • GitHub Copilot • OpenCode & more

---

## ⚡ Quick Start (3 steps)

```bash
# 1. Install
npm install

# 2. Build
npm run build

# 3. Setup for your AI client
npm run setup:gemini    # or setup:claude, setup:cursor, setup:all
```

**That's it!** Restart your AI client and start using the skills.

---

## 🛠️ Available Tools

| Tool | Description | Example |
|------|-------------|---------|
| `list_skills` | Browse skills by category | "List all security skills" |
| `search_skills` | Find skills by keyword | "Search for react testing" |
| `get_skill` | Get full skill details | "Get the typescript-expert skill" |
| `get_categories` | View all categories | "Show me skill categories" |
| `suggest_workflow` | Get step-by-step guidance | "Workflow for building a REST API" |
| `get_skill_content` | Read SKILL.md content | "Read the react-patterns skill" |

---

## 📦 Manual Setup

Add this to your MCP config file:

```json
{
  "mcpServers": {
    "antigravity-skills": {
      "command": "node",
      "args": ["/path/to/skills-mcp-server/dist/index.js"]
    }
  }
}
```

**Config locations:**
- **Gemini CLI**: `~/.gemini/settings.json`
- **Claude**: `~/.config/claude/mcp_config.json` or `%APPDATA%/Claude/claude_desktop_config.json`
- **Cursor**: `~/.cursor/mcp.json`
- **VS Code**: `~/.vscode/mcp.json`

---

## 🔍 Usage Examples

```
# In any MCP-compatible AI client:

"Use antigravity-skills to find API design patterns"

"Search for skills related to Kubernetes"

"Suggest a workflow for building a secure TypeScript API"

"Get the senior-architect skill and apply its principles"
```

---

## 📂 Skill Categories

| Category | Count | Examples |
|----------|-------|----------|
| **Security** | 107 | `sql-injection-testing`, `vulnerability-scanner` |
| **General** | 95 | `brainstorming`, `doc-coauthoring` |
| **Data & AI** | 81 | `rag-engineer`, `prompt-engineer`, `langchain` |
| **Development** | 72 | `typescript-expert`, `python-patterns` |
| **Infrastructure** | 72 | `docker-expert`, `kubernetes-architect` |
| **Architecture** | 52 | `senior-architect`, `microservices-patterns` |
| **Business** | 35 | `copywriting`, `pricing-strategy` |
| **Testing** | 21 | `test-driven-development`, `playwright-skill` |
| **Workflow** | 17 | `workflow-automation`, `trigger-dev` |

---

## 🧪 Testing

```bash
# Test with MCP Inspector
npm run inspector

# In the inspector, try:
# - Call list_skills with category: "security"
# - Call search_skills with query: "react"
# - Call get_categories
```

---

## 📁 Project Structure

```
skills-mcp-server/
├── src/
│   └── index.ts       # Main MCP server
├── scripts/
│   └── setup.js       # One-click setup
├── data/
│   └── skills_index.json  # Skills catalog
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🤝 Contributing

1. Fork the repo
2. Add new skills to `antigravity-awesome-skills/skills/`
3. Update `skills_index.json`
4. Submit a PR

---

## 📄 License

MIT © Antigravity
