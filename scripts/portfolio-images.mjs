import { createHash } from "node:crypto";
import { readFile, readdir, mkdir, writeFile, rename } from "node:fs/promises";
import { watch } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

// Sharp is provided by the installed Next.js image optimizer; no extra dependency.
const require = createRequire(import.meta.url);
const sharp = require("next/dist/server/image-optimizer").getSharp();
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = path.join(root, "public/portfolio");
const outputFile = path.join(root, "lib/portfolio-images.generated.json");

/** Read-only source inspection. Output changes only when image bytes change. */
export async function generatePortfolioImages(options = {}) {
  const source = options.sourceRoot ?? sourceRoot;
  const output = options.outputFile ?? outputFile;
  const manifest = {};
  const folders = (await readdir(source, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
  for (const folder of folders) {
    const names = (await readdir(path.join(source, folder)))
      .filter((name) => /^0[123]-(overview|detail|material)\.(jpg|jpeg|png|webp|avif)$/i.test(name)).sort();
    if (names.length !== 3 || !["01-overview", "02-detail", "03-material"].every((stem, index) => names[index].toLowerCase().startsWith(stem + "."))) {
      throw new Error(`Expected overview, detail and material photographs in ${folder}`);
    }
    manifest[folder] = await Promise.all(names.map(async (name) => {
      const buffer = await readFile(path.join(source, folder, name));
      const metadata = await sharp(buffer).metadata();
      const rotated = [5, 6, 7, 8].includes(metadata.orientation);
      const width = rotated ? metadata.height : metadata.width;
      const height = rotated ? metadata.width : metadata.height;
      if (!width || !height) throw new Error(`Cannot read image dimensions: ${folder}/${name}`);
      return {
        id: name.slice(3, name.lastIndexOf(".")),
        src: `/portfolio/${folder}/${name}`,
        version: createHash("sha256").update(buffer).digest("hex"),
        width, height,
      };
    }));
  }
  const content = JSON.stringify(manifest, null, 2) + "\n";
  let previous;
  try { previous = await readFile(output, "utf8"); }
  catch (error) { if (error.code !== "ENOENT") throw error; }
  if (content !== previous) {
    await mkdir(path.dirname(output), { recursive: true });
    await writeFile(output + ".tmp", content);
    await rename(output + ".tmp", output);
  }
  return { changed: content !== previous, manifest };
}

/** Serial, debounced regeneration accommodates editors replacing files by rename. */
export function watchPortfolioImages(options = {}) {
  let timer;
  let pending = Promise.resolve();
  const watcher = watch(options.sourceRoot ?? sourceRoot, { recursive: true }, (_event, filename) => {
    if (filename && !/^0[123]-(overview|detail|material)\.(jpg|jpeg|png|webp|avif)$/i.test(path.basename(String(filename)))) return;
    clearTimeout(timer);
    timer = setTimeout(() => {
      pending = pending.then(() => generatePortfolioImages(options))
        .then((result) => { if (result.changed) options.onChange?.(result); })
        .catch((error) => console.error("Portfolio image refresh failed:", error));
    }, 150);
  });
  return { close() { clearTimeout(timer); watcher.close(); } };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await generatePortfolioImages();
  if (process.argv[2] === "--dev") {
    const watcher = watchPortfolioImages({ onChange: () => console.log("Portfolio image versions and dimensions refreshed.") });
    const child = spawn(process.execPath, [require.resolve("next/dist/bin/next"), "dev", ...process.argv.slice(3)], { stdio: "inherit", cwd: root });
    for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, () => { watcher.close(); child.kill(signal); });
    child.on("exit", (code) => { watcher.close(); process.exitCode = code ?? 0; });
    child.on("error", (error) => { watcher.close(); console.error(error); process.exitCode = 1; });
  }
}
