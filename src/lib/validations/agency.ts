import { z } from "zod";

export const agencySettingsSchema = z.object({
  name: z.string().min(1, "Nama agency wajib diisi").max(100),
  tagline: z.string().min(1, "Tagline wajib diisi"),
  description: z.string().min(1, "Deskripsi wajib diisi"),
  email: z.string().email("Format email tidak valid"),
  phone: z.string().min(1, "Nomor telepon wajib diisi"),
  whatsapp: z.string().min(1, "Nomor WhatsApp wajib diisi"),
  address: z.string().min(1, "Alamat wajib diisi"),
  socials: z.object({
    whatsapp: z.string().url(),
    instagram: z.string().url(),
    tiktok: z.string().url(),
    linkedin: z.string().url(),
    x: z.string().url(),
    youtube: z.string().url(),
  }),
});

export type AgencySettingsInput = z.infer<typeof agencySettingsSchema>;
