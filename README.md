# 🌌 Antigravity Skills MCP Server

**634+ AI development skills for any MCP-compatible client**

---

## ⚡ Quick Start

### Local (stdio)
```bash
npm install && npm run build
npm run setup:gemini   # or: setup:claude, setup:cursor, setup:all
```

### Docker
```bash
docker run -p 3000:3000 abderraoufyt/skills-mcp-server
```

---

## 🛠️ Tools

| Tool | Description |
|------|-------------|
| `list_skills` | Browse by category |
| `search_skills` | Find by keyword |
| `get_skill` | Get skill details |
| `get_categories` | View categories |
| `suggest_workflow` | Step-by-step guidance |
| `get_skill_content` | Read SKILL.md content |

---

## 📦 Manual Config

Add to your MCP config:

```json
{
  "mcpServers": {
    "antigravity-skills": {
      "command": "node",
      "args": ["/path/to/dist/index.js"]
    }
  }
}
```

**Locations:**
- Gemini: `~/.gemini/settings.json`
- Claude: `~/.config/claude/mcp_config.json`
- Cursor: `~/.cursor/mcp.json`

---

## 🐳 Docker

```bash
docker-compose up -d
```

**Endpoints:**
- `GET /` - Info
- `GET /health` - Health check
- `GET /sse` - MCP SSE

**Env vars:** `PORT=3000`, `MCP_TRANSPORT=http`

---

## 📊 Categories

| Category | Skills |
|----------|--------|
| Security | 107 |
| General | 95 |
| Data & AI | 81 |
| Development | 72 |
| Infrastructure | 72 |
| Architecture | 52 |
| Business | 35 |
| Testing | 21 |

---

## License

MIT © Antigravity
