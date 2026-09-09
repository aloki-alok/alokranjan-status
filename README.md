# alokranjan status

Personal deployment configuration for the reusable `uptime-status` platform. The first public component is the portfolio at `https://alokranjan.me/`.

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

1. Version the generic platform and pin this deployment to a reviewed platform revision.
2. Add an external HTTPS monitor for `https://alokranjan.me/` with a 60 second interval and stable public reference `portfolio`.
3. Implement the versioned Uptime Kuma export and the generic snapshot publisher. A failed fetch or invalid document must preserve the last known good snapshot.
4. Generate a real `current.json` with unknown history for time before monitoring began. Never invent 100 percent uptime.
5. Build this production site with the validated snapshot.
6. Deploy first to an isolated preview hostname. The status read path must not depend on the Cloudflare Worker serving the portfolio.
7. Verify page routes, asset decoding, schema validation, freshness, delayed-data behavior, recovery, and rollback.
8. Burn in the preview before requesting approval for `status.alokranjan.me` DNS.

The intended live read path is a private versioned S3 origin behind CloudFront. It provides a separate failure domain from the portfolio's Cloudflare Worker. DNS and certificate setup are intentionally deferred until the raw CloudFront preview is verified.

## Release gates

- No generated fixture in a production build.
- No internal Kuma URL, monitor ID, credentials, or host topology in public output.
- No status claim after the last observation becomes older than 120 seconds.
- No DNS or public launch without Ryu's explicit approval.
- Subscriptions remain disabled until delivery, confirmation, suppression, and unsubscribe are complete and tested end to end.
