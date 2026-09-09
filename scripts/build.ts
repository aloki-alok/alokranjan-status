import { cpSync, mkdirSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { resolve } from "node:path";
import {
  deployConfigPath,
  platformRoot,
  readJson,
  requirePlatform,
  run,
  siteConfigPath,
  siteRoot,
} from "./shared";

function allFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = resolve(directory, entry.name);
    return entry.isDirectory() ? allFiles(path) : [path];
  });
}

function assertDeploymentMatchesSite() {
  const site = readJson(siteConfigPath);
  const deployment = readJson(deployConfigPath);
  const source = site.monitoring.sources[0];
  const component = site.components[0];
  const expected = {
    SITE_ID: site.siteId,
    TARGET_URL: source.url,
    COMPONENT_SLUG: component.componentId,
    COMPONENT_NAME: component.name,
    COMPONENT_GROUP: component.group,
    SHOW_LATENCY: String(component.showLatency),
    POLL_INTERVAL_SECONDS: String(site.monitoring.pollIntervalSeconds),
  };
  if (JSON.stringify(deployment.vars) !== JSON.stringify(expected)) {
    throw new Error("Wrangler runtime variables do not match status.config.json");
  }
  if (deployment.kv_namespaces[0]?.id === "00000000000000000000000000000000") {
    throw new Error("Wrangler still contains the placeholder KV namespace ID");
  }
}

async function build() {
  requirePlatform();
  assertDeploymentMatchesSite();
  const dist = resolve(siteRoot, "dist");
  const snapshotPath = resolve(dist, "current.json");
  rmSync(dist, { recursive: true, force: true });
  mkdirSync(dist, { recursive: true });

  await run(["bun", "run", "status", "validate", siteConfigPath], platformRoot);
  await run(
    ["bun", "run", "status", "snapshot", "probe", "--site", siteConfigPath, "--out", snapshotPath],
    platformRoot,
  );
  await run(
    ["bun", "run", "status", "build", "--site", siteConfigPath, "--snapshot", snapshotPath],
    platformRoot,
  );
  await run(["bun", "run", "--cwd", "apps/cloudflare-worker", "build"], platformRoot);

  cpSync(resolve(platformRoot, "apps/web/dist"), resolve(dist, "site"), { recursive: true });
  mkdirSync(resolve(dist, "worker"), { recursive: true });
  cpSync(
    resolve(platformRoot, "apps/cloudflare-worker/dist/index.js"),
    resolve(dist, "worker/index.js"),
  );

  const forbidden = ["Example Service", "example-site", "status.example.com"];
  for (const file of allFiles(dist)) {
    const content = readFileSync(file, "utf8");
    const leaked = forbidden.find((value) => content.includes(value));
    if (leaked) throw new Error(`Build contains forbidden fixture identity in ${file}: ${leaked}`);
  }
  if (allFiles(resolve(dist, "site")).some((file) => file.includes("/v/"))) {
    throw new Error("Production build contains visual review routes");
  }
  console.log(`Production artifact built at ${dist}`);
}

await build();
