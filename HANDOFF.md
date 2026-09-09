# Handoff

Updated: 2026-09-10

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
- The public repository is `aloki-alok/alokranjan-status`.
- Main prevents force pushes and deletion, requires linear history, and requires resolved review conversations.
- The deployment pins generic platform revision `8a25f07f1b5f5452e7070f65530a39484e3ee083`.
- Dedicated KV namespace `alokranjan-status-state` stores current state under `sites/alokranjan-me/current.json` and immutable revisions under the site prefix.
- Worker `alokranjan-status` is live at `status.alokranjan.me` and its isolated `workers.dev` hostname.
- Current production Worker version is `3382db61-9d32-43f5-85bb-3a8cf0447584`.
- Subscriptions are disabled. No Resend API key is configured or required.

## Verified facts

- `alokranjan.me` is an Astro site deployed as the Cloudflare Worker named `alokranjan`.
- Its Worker owns `alokranjan.me` and `www.alokranjan.me` as custom domains.
- The generic status platform rejects fixture sources in production mode.
- A production platform build requires `STATUS_SNAPSHOT_PATH` and exact component topology.
- A stale `current.json` read performs a validated probe before responding. The live page polls every 60 seconds.
- A failed transport probe retains the last-known-good snapshot, which the UI labels delayed after the freshness window.

## Open follow-ups

- This new personal site has no legacy history to import.
- Cloudflare confirms the one-minute Cron Trigger is registered, but persisted telemetry has not shown a background `cron` event. Issue `#1` tracks this. The verified stale-read fallback keeps active viewers current and leaves unattended gaps truthful.
- Resend delivery remains deferred until persistence, double opt-in, abuse controls, suppression, unsubscribe, retries, and a real canary delivery pass end to end.
- Required status checks could not be added to branch protection from this environment. Existing linear-history, force-push, deletion, and conversation protections remain enabled.

## Next executable work

1. Resolve issue `#1` and prove two background revisions without a public read between them.
2. Add Resend only after the complete subscriber lifecycle passes end to end.
3. Use this proven deployment as the reference when onboarding OmniDimension at `status2.omnidim.io`.

## Verification log

- Shared CLI validation: production and preview site contracts valid.
- Personal preview build: 14 static pages built successfully.
- Light screenshot: `/private/tmp/alokranjan-status-handoff-light.png`.
- Dark screenshot: `/private/tmp/alokranjan-status-handoff-dark.png`.
- Platform browser matrix: 45 tests passed across Chromium, WebKit, and exact 390 px mobile.
- Generic platform CI run `34399032821`: Quality and Browser passed.
- Personal deployment CI run `34399349508`: Deployment passed on the pinned platform revision.
- Production routes `/`, `/current.json`, `/history/`, `/maintenance/`, CSS, JavaScript, and favicon returned 200. `/v/1/` returned 404.
- Production TLS verification passed. CSP, HSTS, no-store current state, referrer, permissions, opener, and content-type headers were present.
- The first stale production read advanced to a real operational probe. An immediate read reused it, and a read after 62 seconds advanced again and added a truthful latency point.
- Chromium light, dark, and 390 px mobile canaries passed with zero console errors, zero failed requests, no horizontal overflow, and no blinking status dot.
- Final screenshots: `/private/tmp/status-alokranjan-final-light.png`, `/private/tmp/status-alokranjan-final-dark.png`, and `/private/tmp/status-alokranjan-final-mobile.png`.
