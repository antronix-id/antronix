import { z } from "zod";

export const testimonialSchema = z.object({
  clientName: z.string().min(1, "Nama klien wajib diisi").max(100),
  companyOrRole: z.string().min(1, "Perusahaan/jabatan wajib diisi").max(200),
  avatarUrl: z.string().min(1, "Avatar wajib diisi"),
  content: z.string().min(10, "Testimoni minimal 10 karakter"),
  rating: z.number().int().min(1).max(5).default(5),
  displayOrder: z.number().int().default(0),
});

export type TestimonialInput = z.infer<typeof testimonialSchema>;

export const contactSubmissionSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi").max(100),
  email: z.string().email("Format email tidak valid"),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, "Pesan minimal 10 karakter"),
});

export type ContactSubmissionInput = z.infer<typeof contactSubmissionSchema>;
