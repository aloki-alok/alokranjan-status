# alokranjan status

Personal deployment configuration for the reusable `uptime-status` platform. The first public component is the portfolio at `https://alokranjan.me/`.

The live page is [status.alokranjan.me](https://status.alokranjan.me). It checks the portfolio at least once every 60 seconds while the page is open, shows delayed data honestly, and keeps gaps in monitoring history visible rather than inventing uptime.

The checked-in identity asset is copied from `alokranjan.me` so builds do not depend on another repository. The production and visual-preview contracts stay separate. The preview uses generated status data and must never be presented as live monitoring.

## Build the visual preview

From the platform checkout:

```sh
STATUS_SITE_CONFIG=../alokranjan-status/status.preview.config.json STATUS_SNAPSHOT_PATH= bun run build
```

Then serve the generated site:

```sh
bunx serve apps/web/dist
```

This validates branding, content, responsive layout, routes, and site isolation. It does not validate monitoring.

## Production build contract

The production build accepts only the production site contract and a validated live snapshot:

```sh
STATUS_SITE_CONFIG=../alokranjan-status/status.config.json STATUS_SNAPSHOT_PATH=/absolute/path/to/current.json bun run build
```

The build must fail when the snapshot is absent, malformed, stale in shape, or contains a component topology other than `portfolio`.

## Deployment path

1. Check out the reviewed `uptime-status` platform revision.
2. Install the pinned Bun dependencies with `bun install --frozen-lockfile`.
3. Set `UPTIME_STATUS_PLATFORM` only when the platform is not at the default local path.
4. Run `bun run build`. The build validates this site's contract, performs one real HTTPS check, and creates the production artifact.
5. Run `bun run check` to verify the exact Wrangler bundle without uploading it.
6. Seed `sites/alokranjan-me/current.json` in the configured KV namespace from `dist/current.json`.
7. Run `bun run deploy` and verify the isolated `workers.dev` URL.
8. Attach `status.alokranjan.me` only after HTTP, browser, static asset, freshness, latency, and rollback checks pass.

The personal deployment uses a separate Cloudflare Worker with its own status state. A one-minute scheduled probe is configured, and stale reads also perform a validated probe so an open status page remains current if background scheduling is delayed. It does not share application code or runtime state with the portfolio Worker.

## Email updates

Email updates are intentionally off. The personal deployment will use Resend after subscriber storage, double opt-in, abuse controls, suppression, unsubscribe, retries, and a real canary delivery are complete. Store the Resend API key as a managed secret reference, never in Git or `wrangler.jsonc`.

## Rollback

List recent Worker versions with `bunx wrangler versions list`. Roll back the Worker with `bunx wrangler rollback <version-id>`. The KV current snapshot is retained separately, so a Worker rollback does not erase monitoring history. If the custom domain is unhealthy, detach its route and keep the verified `workers.dev` deployment available while investigating.

## Release gates

- No generated fixture in a production build.
- No internal Kuma URL, monitor ID, credentials, or host topology in public output.
- No status claim after the last observation becomes older than 120 seconds.
- No DNS or public launch without Ryu's explicit approval.
- Subscriptions remain disabled until delivery, confirmation, suppression, and unsubscribe are complete and tested end to end.
- Personal email delivery will use Resend through a secret reference. No API key belongs in this repository.
