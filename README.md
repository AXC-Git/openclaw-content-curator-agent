# OpenClaw Content Curator Agent

![OpenClaw](https://img.shields.io/badge/OpenClaw-Agent-violet)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=orange)
![Docker](https://img.shields.io/badge/Docker-Sandboxed-2496ED?style=flat&logo=docker&logoColor=blue)

> An autonomous AI agent skill for OpenClaw (Moltbot) that ingests links, PDFs, and text via Telegram, extracts key insights, and auto-syncs them to either a local Obsidian vault or a Notion database.

## Overview
This agent turns a standard Telegram chat into a universal inbox for your research and content curation. Instead of manually categorizing bookmarks, you forward content to the bot, and it autonomously reads, summarizes, and routes the formatted data to your preferred storage solution (Obsidian or Notion).

## ⚙️ Architecture Flow
1. **Ingress:** User sends a message/link via Telegram.
2. **Gateway:** OpenClaw webhook receives the payload.
3. **Processing:** Local LLM extracts the core thesis, tags the content, and formats it into clean Markdown.
4. **Action:** The agent executes a sandboxed file-write to the local Obsidian directory OR makes an API call to append the data to a Notion database.

## Security Measures
Because this agent handles file-system execution and API keys, it is designed with a strict security posture:
* **Docker Sandboxing:** The agent runs in an isolated container with volume mounts restricted *only* to the designated Obsidian directory.
* **Prompt Injection Defense:** Input payloads are sanitized before being passed to the LLM to prevent arbitrary command execution.

## Quick Start

Clone the repository and spin up the secure container:

```bash
git clone openclaw-content-curator-agent.git
cd openclaw-content-curator-agent
cp .env.example .env
docker-compose up --build
```

<details>
<summary>Click to view the required .env variables</summary>

Code snippet
TELEGRAM_BOT_TOKEN=your_token_here
OPENCLAW_API_KEY=local_key_here
# Storage Routing
STORAGE_MODE=obsidian # or 'notion'
OBSIDIAN_VAULT_PATH=/restricted/path/to/vault
NOTION_API_KEY=your_notion_secret
NOTION_DATABASE_ID=your_database_id
</details>
