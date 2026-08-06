import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { uploadToSupabaseStorage } from "@/lib/supabase";
import { headers } from "next/headers";

export async function POST(request: NextRequest) {
  // Verify authentication
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "general";

    if (!file) {
      return Response.json({ error: "File tidak ditemukan" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/avif",
      "image/gif",
      "video/mp4",
      "video/webm",
    ];

    if (!allowedTypes.includes(file.type)) {
      return Response.json(
        { error: "Format file tidak didukung" },
        { status: 400 }
      );
    }

    // Validate file size (max 50MB)
    const maxSize = 50 * 1024 * 1024;
    if (file.size > maxSize) {
      return Response.json(
        { error: "Ukuran file maksimal 50MB" },
        { status: 400 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const ext = file.name.split(".").pop();
    const safeName = file.name
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9-_]/g, "-")
      .substring(0, 50);
    const filename = `${folder}/${timestamp}-${safeName}.${ext}`;

    const buffer = Buffer.from(await file.arrayBuffer());
    const { url, error } = await uploadToSupabaseStorage(
      buffer,
      filename,
      file.type
    );

    if (error) {
      return Response.json(
        { error: `Upload gagal: ${error.message}` },
        { status: 500 }
      );
    }

    return Response.json({ url }, { status: 200 });
  } catch (err) {
    console.error("Upload error:", err);
    return Response.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}
