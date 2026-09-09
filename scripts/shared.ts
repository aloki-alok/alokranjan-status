import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

export const siteRoot = resolve(import.meta.dir, "..");
export const platformRoot = resolve(
  process.env.UPTIME_STATUS_PLATFORM ?? resolve(siteRoot, "../../omnidim/omnidim-status"),
);
export const siteConfigPath = resolve(siteRoot, "status.config.json");
export const deployConfigPath = resolve(siteRoot, "wrangler.jsonc");

export function requirePlatform() {
  if (!existsSync(resolve(platformRoot, "package.json"))) {
    throw new Error(`Platform checkout not found: ${platformRoot}`);
  }
}

export async function run(command: string[], cwd: string) {
  const process = Bun.spawn(command, { cwd, stdout: "inherit", stderr: "inherit" });
  const exitCode = await process.exited;
  if (exitCode !== 0)
    throw new Error(`Command failed with exit code ${exitCode}: ${command.join(" ")}`);
}

export function readJson(path: string) {
  return JSON.parse(readFileSync(path, "utf8"));
}
