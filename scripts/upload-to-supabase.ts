import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET_NAME = "agency-assets";

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error("❌ NEXT_PUBLIC_SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY wajib diisi di .env.local");
  process.exit(1);
}

// Admin client using service role key to manage buckets and bypass RLS
const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

// Helper for MIME types
function getMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case ".avif":
      return "image/avif";
    case ".webp":
      return "image/webp";
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".svg":
      return "image/svg+xml";
    case ".mp4":
      return "video/mp4";
    case ".webm":
      return "video/webm";
    default:
      return "application/octet-stream";
  }
}

// Recursively get all files in a directory
function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      if (!file.startsWith(".")) {
        arrayOfFiles.push(fullPath);
      }
    }
  });

  return arrayOfFiles;
}

async function main() {
  console.log("🚀 Memulai upload media public/ ke Supabase Storage...\n");

  // 1. Ensure Bucket Exists
  console.log(`📦 Memeriksa bucket '${BUCKET_NAME}'...`);
  const { data: buckets, error: getBucketError } = await supabaseAdmin.storage.listBuckets();

  if (getBucketError) {
    console.error("❌ Gagal list buckets:", getBucketError.message);
    process.exit(1);
  }

  const existingBucket = buckets?.find((b) => b.name === BUCKET_NAME);
  if (!existingBucket) {
    console.log(`🔨 Membuat public bucket '${BUCKET_NAME}'...`);
    const { error: createError } = await supabaseAdmin.storage.createBucket(BUCKET_NAME, {
      public: true,
    });
    if (createError) {
      console.error("❌ Gagal membuat bucket:", createError.message);
      process.exit(1);
    }
    console.log(`  ✅ Bucket '${BUCKET_NAME}' berhasil dibuat!`);
  } else {
    console.log(`  ✅ Bucket '${BUCKET_NAME}' sudah ada.`);
  }

  // 2. Upload all files from public/
  const publicDir = path.join(process.cwd(), "public");
  const allFiles = getAllFiles(publicDir);

  console.log(`\n📤 Menemukan ${allFiles.length} file di folder public/. Memulai upload...\n`);

  const urlMapping: Record<string, string> = {};

  for (const filePath of allFiles) {
    // Relative path inside public folder (e.g. "image/Advertiser.avif" or "bc.mp4")
    const relativePath = path.relative(publicDir, filePath).replace(/\\/g, "/");
    const mimeType = getMimeType(filePath);
    const fileBuffer = fs.readFileSync(filePath);

    console.log(`  ⬆️  Uploading: ${relativePath} (${mimeType})...`);

    const { error: uploadError } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .upload(relativePath, fileBuffer, {
        contentType: mimeType,
        upsert: true,
        cacheControl: "3600",
      });

    if (uploadError) {
      console.error(`  ❌ Gagal upload ${relativePath}:`, uploadError.message);
      continue;
    }

    const { data: publicUrlData } = supabaseAdmin.storage
      .from(BUCKET_NAME)
      .getPublicUrl(relativePath);

    const publicUrl = publicUrlData.publicUrl;
    const localKey = `/${relativePath}`;
    urlMapping[localKey] = publicUrl;

    console.log(`  ✅ OK -> ${publicUrl}`);
  }

  console.log("\n🔄 Memperbarui URL media di database PostgreSQL...\n");

  const { db } = await import("../src/lib/db");
  const { portfolioItems, services, serviceTargetAudiences } = await import("../src/lib/db/schema");
  const { eq } = await import("drizzle-orm");

  // 3. Update Database Portfolio Items
  const allPortfolio = await db.select().from(portfolioItems);
  for (const item of allPortfolio) {
    let updatedThumbnail = item.thumbnailUrl;
    let updatedVideo = item.videoUrl;

    if (item.thumbnailUrl && urlMapping[item.thumbnailUrl]) {
      updatedThumbnail = urlMapping[item.thumbnailUrl];
    }
    if (item.videoUrl && urlMapping[item.videoUrl]) {
      updatedVideo = urlMapping[item.videoUrl];
    }

    if (updatedThumbnail !== item.thumbnailUrl || updatedVideo !== item.videoUrl) {
      await db
        .update(portfolioItems)
        .set({
          thumbnailUrl: updatedThumbnail,
          videoUrl: updatedVideo,
        })
        .where(eq(portfolioItems.id, item.id));
      console.log(`  ✅ Updated Portfolio #${item.id} (${item.title})`);
    }
  }

  // 4. Update Database Services
  const allServices = await db.select().from(services);
  for (const service of allServices) {
    if (service.logo && urlMapping[service.logo]) {
      await db
        .update(services)
        .set({ logo: urlMapping[service.logo] })
        .where(eq(services.id, service.id));
      console.log(`  ✅ Updated Service #${service.id} (${service.title})`);
    }
  }

  // 5. Update Database Service Target Audiences
  const allAudiences = await db.select().from(serviceTargetAudiences);
  for (const audience of allAudiences) {
    if (audience.image && urlMapping[audience.image]) {
      await db
        .update(serviceTargetAudiences)
        .set({ image: urlMapping[audience.image] })
        .where(eq(serviceTargetAudiences.id, audience.id));
      console.log(`  ✅ Updated Target Audience #${audience.id} (${audience.title})`);
    }
  }

  console.log("\n🎉 SEMUA GAMBAR & VIDEO BERHASIL DI-PUSH KE SUPABASE STORAGE!");
  console.log("   URL media di Database PostgreSQL telah diperbarui ke CDN Supabase.\n");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Fatal error:", err);
    process.exit(1);
  });
