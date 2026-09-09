# alokranjan status deployment instructions

This repository owns the personal deployment configuration for the reusable `uptime-status` platform. It does not own platform code.

Before changing files:

1. Read `README.md` and `HANDOFF.md`.
2. Read the checked-out platform repository documentation before changing deployment behavior.
3. Keep site identity, assets, monitor bindings, and deployment state in this repository.
4. Do not copy site details into platform source defaults.
5. Keep the public status page independent from the Cloudflare Worker that serves `alokranjan.me`.

Do not deploy, create monitoring resources, or change DNS without Ryu's explicit approval. Never present the visual preview fixture as live monitoring.
