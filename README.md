<p align="center">
  <img src="https://img.shields.io/badge/🌌-ANTIGRAVITY-7c3aed?style=for-the-badge&labelColor=1e1e2e" alt="Antigravity" height="60" />
</p>

<h1 align="center">🌌 Antigravity Skills MCP Server</h1>

<p align="center">
  <strong>634+ production-ready AI skills for any MCP-compatible client</strong>
</p>

<p align="center">
  <a href="https://abderraouf-yt.github.io/skills-mcp-server"><img src="https://img.shields.io/badge/🔗_Live_Demo-View_Skills-violet?style=for-the-badge" alt="Demo"></a>
  <a href="https://github.com/Abderraouf-yt/skills-mcp-server/releases"><img src="https://img.shields.io/github/v/release/Abderraouf-yt/skills-mcp-server?style=for-the-badge&logo=github&logoColor=white&color=7c3aed" alt="Release"></a>
  <a href="https://github.com/Abderraouf-yt/skills-mcp-server/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue?style=for-the-badge" alt="License"></a>
  <a href="https://github.com/Abderraouf-yt/skills-mcp-server/stargazers"><img src="https://img.shields.io/github/stars/Abderraouf-yt/skills-mcp-server?style=for-the-badge&logo=github&color=f59e0b" alt="Stars"></a>
  <a href="https://hub.docker.com/r/abderraoufyt/skills-mcp-server"><img src="https://img.shields.io/badge/docker-ready-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker"></a>
</p>

<p align="center">
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-features">Features</a> •
  <a href="#-tools">Tools</a> •
  <a href="#-deployment">Deployment</a> •
  <a href="#-api">API</a>
</p>

---

## 💡 Why This Exists

**Stop searching. Start building.**

You spend hours searching for best practices, design patterns, and solutions. This MCP server gives your AI instant access to **634+ curated skills** covering:

- 🔐 **Security** — Penetration testing, vulnerability scanning, secure coding
- ⚛️ **Frontend** — React, Next.js, Vue, Angular, modern CSS
- 🐍 **Backend** — Python, Node.js, Go, Rust, API design
- ☁️ **Infrastructure** — Docker, Kubernetes, AWS, Terraform
- 🧠 **AI/ML** — LangChain, RAG, prompt engineering
- 📊 **Architecture** — System design, microservices, DDD

---

## ⚡ Quick Start

### One-Liner Setup

```bash
# Clone and install
git clone https://github.com/Abderraouf-yt/skills-mcp-server.git && cd skills-mcp-server
npm install && npm run build

# Configure your AI client (pick one)
npm run setup:gemini   # Gemini CLI
npm run setup:claude   # Claude Desktop / Code
npm run setup:cursor   # Cursor
npm run setup:all      # All clients
```

**Restart your AI client. Done.**

---

## 🎯 Features

<table>
<tr>
<td width="50%">

### 🚀 Universal Compatibility
Works with **any MCP client**:
- Gemini CLI
- Claude Desktop & Code
- Cursor
- VS Code Copilot
- OpenCode
- Custom integrations

</td>
<td width="50%">

### 🐳 Cloud-Ready
Deploy anywhere in seconds:
```bash
docker run -p 3000:3000 \
  abderraoufyt/skills-mcp-server
```

</td>
</tr>
<tr>
<td width="50%">

### 📚 634+ Skills
Curated, production-tested guidance:
- Security best practices
- Modern framework patterns
- Infrastructure automation
- AI/ML workflows

</td>
<td width="50%">

### 🔧 6 Powerful Tools
Everything you need:
- Browse & search skills
- Get detailed guidance
- Suggest workflows
- Read full documentation

</td>
</tr>
</table>

---

## 🛠️ Tools

| Tool | Description | Example Prompt |
|------|-------------|----------------|
| `list_skills` | Browse by category | *"List all security skills"* |
| `search_skills` | Find by keyword | *"Search for react testing"* |
| `get_skill` | Get full details | *"Get the typescript-expert skill"* |
| `get_categories` | View all categories | *"Show skill categories"* |
| `suggest_workflow` | Step-by-step guidance | *"Workflow for building an API"* |
| `get_skill_content` | Read SKILL.md | *"Read react-patterns skill"* |

---

## 🚀 Deployment

### Local (stdio)

```bash
npm run build
npm run start
```

### Docker

```bash
# Quick run
docker run -p 3000:3000 abderraoufyt/skills-mcp-server

# Or with compose
docker-compose up -d
```

### Manual Config

Add to your MCP configuration:

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

<details>
<summary><strong>📁 Config file locations</strong></summary>

| Client | Path |
|--------|------|
| Gemini CLI | `~/.gemini/settings.json` |
| Claude | `~/.config/claude/mcp_config.json` |
| Cursor | `~/.cursor/mcp.json` |
| VS Code | `~/.vscode/mcp.json` |

</details>

---

## 📊 Skill Categories

| Category | Skills | Highlights |
|----------|--------|------------|
| 🔐 **Security** | 107 | Pentesting, OWASP, vulnerability scanning |
| 📝 **General** | 95 | Documentation, planning, brainstorming |
| 🧠 **Data & AI** | 81 | LangChain, RAG, prompt engineering |
| 💻 **Development** | 72 | TypeScript, Python, React, Node.js |
| ☁️ **Infrastructure** | 72 | Docker, K8s, AWS, Terraform |
| 🏗️ **Architecture** | 52 | System design, microservices |
| 📈 **Business** | 35 | Pricing, copywriting, SEO |
| 🧪 **Testing** | 21 | TDD, Playwright, Jest |

---

## 🌐 API Endpoints (HTTP Mode)

When running with `MCP_TRANSPORT=http`:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Server info & health |
| `/health` | GET | Health check |
| `/sse` | GET | MCP SSE connection |

**Environment Variables:**
- `PORT` — Server port (default: 3000)
- `MCP_TRANSPORT` — `stdio` or `http`

---

## 📦 Project Structure

```
skills-mcp-server/
├── src/
│   └── index.ts       # MCP server (dual transport)
├── data/
│   └── skills_index.json  # 634+ skills catalog
├── scripts/
│   └── setup.js       # One-click configurator
├── Dockerfile         # Production container
├── docker-compose.yml # Easy deployment
└── package.json
```

---

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md).

```bash
# Development
npm install
npm run dev    # Hot reload with tsx
```

---

## 📄 License

MIT © [Antigravity](https://github.com/Abderraouf-yt)

---

<p align="center">
  <strong>Built for developers who ship.</strong>
</p>

<p align="center">
  <a href="https://github.com/Abderraouf-yt/skills-mcp-server">⭐ Star this repo</a> •
  <a href="https://github.com/Abderraouf-yt/skills-mcp-server/issues">Report Bug</a> •
  <a href="https://github.com/Abderraouf-yt/skills-mcp-server/issues">Request Feature</a>
</p>
