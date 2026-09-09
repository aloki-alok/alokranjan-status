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
- The repository is ready for its first public commit. No monitor, cloud resource, certificate, deployment, or DNS record has been created yet.

## Verified facts

- `alokranjan.me` is an Astro site deployed as the Cloudflare Worker named `alokranjan`.
- Its Worker owns `alokranjan.me` and `www.alokranjan.me` as custom domains.
- The generic status platform rejects fixture sources in production mode.
- A production platform build requires `STATUS_SNAPSHOT_PATH` and exact component topology.

## Open blockers

- The offline Uptime Kuma 2.2 SQLite history extractor exists, but this new personal site has no legacy history to import and the live HTTPS adapter does not exist.
- The versioned public-safe Kuma export does not exist yet.
- The snapshot publisher and independent AWS read-path infrastructure do not exist yet.
- There is no real validated `current.json` for this site.

Until those blockers close, only the local visual preview is truthful. Do not deploy it as a real status service.

## Next executable work

1. Implement and test the generic Kuma export and adapter in their owning repositories.
2. Implement the last-known-good snapshot publisher and minimal private S3 plus CloudFront preview stack.
3. Produce the first real snapshot and run failure injection before asking for DNS approval.

## Verification log

- Shared CLI validation: production and preview site contracts valid.
- Personal preview build: 14 static pages built successfully.
- Light screenshot: `/private/tmp/alokranjan-status-handoff-light.png`.
- Dark screenshot: `/private/tmp/alokranjan-status-handoff-dark.png`.
- Platform browser matrix: 45 tests passed across Chromium, WebKit, and exact 390 px mobile.
