import { createClient, SupabaseClient } from "@supabase/supabase-js";

let supabaseInstance: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (!supabaseInstance) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error(
        "NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY harus dikonfigurasi."
      );
    }
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabaseInstance;
}

export const supabase = {
  get storage() {
    return getSupabaseClient().storage;
  },
};

/**
 * Upload file ke Supabase Storage bucket
 */
export async function uploadToSupabaseStorage(
  fileBuffer: Buffer | File | Blob | ArrayBuffer,
  filename: string,
  contentType: string = "image/jpeg",
  bucket: string = "agency-assets"
): Promise<{ url: string | null; error: Error | null }> {
  try {
    const client = getSupabaseClient();
    const { data, error } = await client.storage
      .from(bucket)
      .upload(filename, fileBuffer, {
        contentType,
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      return { url: null, error };
    }

    const { data: publicUrlData } = client.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return { url: publicUrlData.publicUrl, error: null };
  } catch (err) {
    return { url: null, error: err as Error };
  }
}
