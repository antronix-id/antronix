/**
 * ==============================================================================
 * CHECK ASSET — npm run check:assets
 * ==============================================================================
 * Menjaga dua arah sekaligus:
 *   1. Setiap literal path lokal di src/ ("/...avif", "/...mp4", dst.) wajib
 *      punya file di public/. Ini yang menggagalkan build/refactor sejak awal
 *      ketika nama file diganti tapi registri aset lupa diperbarui.
 *   2. Setiap file di public/ dicocokkan balik dengan referensi yang ada.
 *      File yang tidak dipakai dilaporkan sebagai peringatan (tidak membuat
 *      gagal, supaya aset cadangan tetap boleh ada).
 *
 * Hanya path literal yang dibaca — tidak ada kode yang dijalankan. Karena itu
 * data/industries.ts menuliskan seluruh ikon sebagai literal lengkap di
 * data/assets.ts, bukan hasil penyusunan string dinamis.
 *
 * Dijalankan dengan type stripping Node (>=22.6):
 *   node --experimental-strip-types scripts/check-assets.ts
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, extname, join, posix, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC_DIR = join(ROOT, "src");
const PUBLIC_DIR = join(ROOT, "public");

/** Ekstensi aset yang diakui; sama dengan yang dipakai di public/ */
const ASSET_EXTENSIONS = [
  "avif",
  "webp",
  "png",
  "jpg",
  "jpeg",
  "svg",
  "mp4",
  "webm",
  "gif",
  "ico",
] as const;

/**
 * Literal string (petik satu/double/backtick) yang seluruh isinya diawali "/"
 * dan ditutup salah satu ekstensi di atas. URL eksternal tidak ikut karena
 * karakter pertama setelah tanda petik harus "/".
 */
const ASSET_LITERAL = new RegExp(
  `["'\`]\\/(?:[^"'\`\\r\\n]*?)\\.(?:${ASSET_EXTENSIONS.join("|")})["'\`]`,
  "g",
);

const SOURCE_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".mjs", ".css"]);

/** Kumpulkan path + lokasi sumbernya supaya pesan error bisa ditelusuri. */
type Reference = { path: string; location: string };

function collectSourceFiles(dir: string): string[] {
  const found: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      // Folder hasil build Next tidak relevan dengan sumber aset.
      if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
      found.push(...collectSourceFiles(full));
    } else if (SOURCE_EXTENSIONS.has(extname(entry.name))) {
      found.push(full);
    }
  }
  return found;
}

function extractAssetPaths(file: string): Reference[] {
  const text = readFileSync(file, "utf8");
  const references: Reference[] = [];
  for (const match of text.match(ASSET_LITERAL) ?? []) {
    const lineNumber = text.slice(0, text.indexOf(match)).split("\n").length;
    references.push({
      path: match.slice(1, -1),
      location: `${relative(ROOT, file).split(sep).join("/")}:${lineNumber}`,
    });
  }
  return references;
}

function collectPublicFiles(dir: string): string[] {
  const found: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) found.push(...collectPublicFiles(full));
    else if (statSync(full).isFile()) found.push(full);
  }
  return found;
}

/** Buang query/hash dan normalisasi percent-encoding agar cocok dengan nama file. */
function normalize(path: string): string {
  const clean = path.split(/[?#]/)[0];
  try {
    return decodeURIComponent(clean);
  } catch {
    return clean;
  }
}

function main(): number {
  const sourceFiles = collectSourceFiles(SRC_DIR);
  const references = sourceFiles.flatMap(extractAssetPaths);

  const referenced = new Map<string, Reference>();
  for (const ref of references) {
    const key = normalize(ref.path);
    if (!referenced.has(key)) referenced.set(key, ref);
  }

  const missing: Array<{ path: string; location: string }> = [];
  for (const [path, ref] of referenced) {
    const segments = path.split("/").filter(Boolean);
    if (!existsSync(join(PUBLIC_DIR, ...segments))) {
      missing.push({ path, location: ref.location });
    }
  }

  const publicFiles = existsSync(PUBLIC_DIR) ? collectPublicFiles(PUBLIC_DIR) : [];
  const toPublicUrl = (file: string) =>
    posix.join("/", file.slice(PUBLIC_DIR.length).split(sep).join("/"));
  const unreferenced = publicFiles.filter((file) => !referenced.has(toPublicUrl(file)));

  console.log(
    `Path aset direferensikan: ${referenced.size} (dari ${sourceFiles.length} file sumber)`,
  );
  console.log(`File di public/: ${publicFiles.length}`);

  if (missing.length > 0) {
    console.error(`\nFAIL: ${missing.length} path aset tanpa file di public/`);
    for (const item of missing.sort((a, b) => a.path.localeCompare(b.path))) {
      console.error(`  ${item.path}  <- ${item.location}`);
    }
    return 1;
  }

  if (unreferenced.length > 0) {
    console.warn(
      `\nWARNING: ${unreferenced.length} file public/ tidak direferensikan`,
    );
    for (const file of unreferenced) console.warn(`  ${toPublicUrl(file)}`);
    console.warn("  (peringatan saja — hapus file atau daftarkan di data/assets.ts)");
  }

  console.log("\nOK: semua path aset punya file di public/");
  return 0;
}

process.exit(main());
