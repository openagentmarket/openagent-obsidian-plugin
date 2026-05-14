# OpenAgent

OpenAgent is an Obsidian plugin for running local AI agent workflows from your vault and Canvas.

It connects Obsidian to a local OpenAgent daemon so you can start Codex tasks from selected Canvas nodes or notes, track active threads, write results back to Canvas, and keep agent work anchored in your vault.

## Requirements

- Obsidian desktop
- Community plugins enabled
- A local OpenAgent daemon running on your machine
- Codex Desktop or a compatible local Codex/OpenAgent setup

OpenAgent is desktop-only because it uses local filesystem access and a local daemon connection.

## Install

After this plugin is published in the Obsidian Community directory:

1. Open Obsidian.
2. Go to **Settings -> Community plugins**.
3. Search for **OpenAgent**.
4. Install and enable the plugin.

For manual testing, download `main.js`, `manifest.json`, and `styles.css` from a GitHub release and place them in:

```text
.obsidian/plugins/openagent/
```

Then enable **OpenAgent** in **Settings -> Community plugins**.

## Local Daemon

OpenAgent expects a local daemon to be available. The plugin can start the daemon when configured, or you can run it manually from the OpenAgent project:

```bash
pnpm dev:daemon
```

The plugin stores local daemon configuration under your home directory at `.openagent/daemon-config.json`.

## Privacy And Security

OpenAgent is local-first. The plugin communicates with a daemon running on your machine and sends the selected note or Canvas context you choose to use for an agent task.

The plugin may:

- Read selected notes and Canvas nodes in your vault.
- Write task results, follow-up nodes, and metadata back to your vault.
- Read and write local OpenAgent configuration under `.openagent`.
- Communicate with a local HTTP daemon using an authentication token.

The plugin does not include its own payment system. It may connect to local tools or services that require separate accounts, API keys, subscriptions, or usage-based billing.

## Development

This repository is the publishable Obsidian Community plugin package. The broader OpenAgent project lives at:

https://github.com/openagentmarket/openagent

## License

MIT
