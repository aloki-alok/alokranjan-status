# Handoff

Updated: 2026-09-09

## Current state

- The site repository owns only personal deployment configuration and assets.
- `status.config.json` is the production contract for `status.alokranjan.me`.
- `status.preview.config.json` is an explicitly non-live visual fixture.
- The official adaptive portfolio favicon is copied into `assets/favicon.svg` and used for all required identity asset roles.
- The first component is `portfolio`, displayed as `Portfolio`, with public latency enabled.
- The existing portfolio repository was inspected read only and has unrelated uncommitted work.
- Both site contracts pass the shared strict validator.
- The visual preview builds successfully against the generic platform.
- Light, dark, and exact 390 px previews were visually inspected. The page has one flat canvas, no header logo, aligned top-level content, three public legend categories, a full-width latency card, and no document-level horizontal overflow.
- The public repository is `aloki-alok/alokranjan-status` at initial commit `86f5c99`.
- Main prevents force pushes and deletion, requires linear history, and requires resolved review conversations.
- The Cloudflare deployment manifest and guarded Bun build pipeline are implemented locally.
- Dedicated KV namespace `alokranjan-status-state` exists and the first validated snapshot is seeded under `sites/alokranjan-me/current.json`.
- No Worker deployment or DNS record has been created yet.

## Verified facts

- `alokranjan.me` is an Astro site deployed as the Cloudflare Worker named `alokranjan`.
- Its Worker owns `alokranjan.me` and `www.alokranjan.me` as custom domains.
- The generic status platform rejects fixture sources in production mode.
- A production platform build requires `STATUS_SNAPSHOT_PATH` and exact component topology.

## Open blockers

- This new personal site has no legacy history to import.
- The direct HTTPS publisher exists and the personal runtime will use a separate Cloudflare Worker.
- The dedicated KV namespace ID is recorded in `wrangler.jsonc`. It is deployment metadata, not a secret.
- The exact platform commit is published. Quality and Browser CI are green on run `34368680427`, attempt 2.

Until those blockers close, only the local visual preview is truthful. Do not deploy it as a real status service.

## Next executable work

1. Commit and publish the verified deployment configuration, then require its hosted Deployment check on main.
2. Rebuild and seed from the exact published tree, then deploy the separate Cloudflare Worker to its isolated `workers.dev` URL.
3. Run HTTP, browser, asset, security-header, and scheduled-refresh canaries before activating `status.alokranjan.me`.
4. Add Resend only after subscriber persistence, suppression, and unsubscribe pass end to end.

## Verification log

- Shared CLI validation: production and preview site contracts valid.
- Personal preview build: 14 static pages built successfully.
- Light screenshot: `/private/tmp/alokranjan-status-handoff-light.png`.
- Dark screenshot: `/private/tmp/alokranjan-status-handoff-dark.png`.
- Platform browser matrix: 45 tests passed across Chromium, WebKit, and exact 390 px mobile.
