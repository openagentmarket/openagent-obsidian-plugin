import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const dist = path.join(root, "dist");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "manifest.json"), "utf8"));
const requiredFiles = ["main.js", "manifest.json", "styles.css"];
const optionalFiles = ["logo.png", "vault-pet-mascot.png"];
const archiveName = `openagent-canvas-${manifest.version}.zip`;
const bundleDir = path.join(dist, manifest.id);

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(bundleDir, { recursive: true });

for (const file of [...requiredFiles, ...optionalFiles]) {
  const source = path.join(root, file);
  if (!fs.existsSync(source)) {
    if (requiredFiles.includes(file)) {
      throw new Error(`Missing required release file: ${file}`);
    }
    continue;
  }

  fs.copyFileSync(source, path.join(dist, file));
  fs.copyFileSync(source, path.join(bundleDir, file));
}

execFileSync("zip", ["-qr", archiveName, manifest.id], { cwd: dist });

const files = [...fs.readdirSync(dist).filter((file) => file !== manifest.id)].sort();
const checksums = files
  .map((file) => `${sha256(path.join(dist, file))}  ${file}`)
  .join("\n");

fs.writeFileSync(path.join(dist, "SHA256SUMS.txt"), `${checksums}\n`, "utf8");
fs.writeFileSync(path.join(dist, "release-notes.md"), releaseNotes(manifest, archiveName), "utf8");

console.log(`Prepared release ${manifest.version}`);
for (const file of [...files, "SHA256SUMS.txt", "release-notes.md"]) {
  console.log(`dist/${file}`);
}

function sha256(filePath) {
  const hash = createHash("sha256");
  hash.update(fs.readFileSync(filePath));
  return hash.digest("hex");
}

function releaseNotes(manifest, archiveName) {
  return [
    `## ${manifest.name} ${manifest.version}`,
    "",
    "Community plugin release assets:",
    "- `main.js`",
    "- `manifest.json`",
    "- `styles.css`",
    "",
    "Manual install bundle:",
    `- \`${archiveName}\``,
    "",
    "Checksums are attached in `SHA256SUMS.txt`.",
    "",
  ].join("\n");
}
