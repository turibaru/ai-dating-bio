import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

const here = dirname(fileURLToPath(import.meta.url));
const text = readFileSync(join(here, "entry.txt"), "utf8");
// The competition allows a single line of 1-180 characters. Count code
// points (not UTF-16 units) so an emoji counts as one character, and
// reject a blank-only line so whitespace alone can never pass as an entry.
const length = [...text].length;
if (length < 1 || length > 180 || text.trim().length === 0) {
  console.error(`entry.txt must be 1-180 non-blank characters, got ${length} — shorten the line to fit`);
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(join(here, "entry.txt"), join(outDir, "entry.txt"));
