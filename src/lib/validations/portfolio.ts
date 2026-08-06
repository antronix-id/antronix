import { z } from "zod";

export const portfolioItemSchema = z.object({
  title: z.string().min(1, "Judul wajib diisi").max(200),
  slug: z.string().min(1, "Slug wajib diisi").max(200)
    .regex(/^[a-z0-9-]+$/, "Slug hanya boleh huruf kecil, angka, dan dash"),
  category: z.enum(["web-studio", "ai-media-lab", "system-lab"], {
    message: "Kategori wajib dipilih",
  }),
  description: z.string().min(1, "Deskripsi wajib diisi"),
  thumbnailUrl: z.string().min(1, "Thumbnail wajib diisi"),
  videoUrl: z.string().optional().nullable(),
  liveUrl: z.string().url("URL tidak valid").optional().nullable(),
  techStack: z.array(z.string()).min(1, "Minimal 1 tech stack"),
  isFeatured: z.boolean().default(false),
  displayOrder: z.number().int().default(0),
});

export type PortfolioItemInput = z.infer<typeof portfolioItemSchema>;
