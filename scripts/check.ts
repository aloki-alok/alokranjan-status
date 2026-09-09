import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { deployConfigPath, readJson, run, siteRoot } from "./shared";

const deployment = readJson(deployConfigPath);
const namespaceId = deployment.kv_namespaces[0]?.id;
if (!/^[a-f0-9]{32}$/.test(namespaceId) || /^0+$/.test(namespaceId)) {
  throw new Error("A real 32-character KV namespace ID is required");
}

for (const path of [
  resolve(siteRoot, "dist/site/index.html"),
  resolve(siteRoot, "dist/worker/index.js"),
]) {
  if (!existsSync(path) || readFileSync(path).byteLength === 0) {
    throw new Error(`Missing production artifact: ${path}`);
  }
}

await run(
  ["bunx", "wrangler", "deploy", "--dry-run", "--outdir", "/private/tmp/alokranjan-status-dry-run"],
  siteRoot,
);
console.log("Deployment artifact verified");
