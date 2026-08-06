import { z } from "zod";

export const serviceSchema = z.object({
  slug: z.string().min(1).max(100),
  title: z.string().min(1).max(100),
  shortTitle: z.string().min(1).max(50),
  icon: z.string().min(1).max(50),
  logo: z.string().optional().nullable(),
  description: z.string().min(1),
  shortDescription: z.string().min(1),
  color: z.string().min(1).max(50),
  gradient: z.string().min(1).max(100),
  displayOrder: z.number().int().default(0),
  targetAudience: z.array(z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    icon: z.string().optional().nullable(),
    image: z.string().optional().nullable(),
    badge: z.string().optional().nullable(),
  })).optional(),
  problemsAndSolutions: z.array(z.object({
    problemTitle: z.string().min(1),
    problemDescription: z.string().min(1),
    solutionTitle: z.string().min(1),
    solutionDescription: z.string().min(1),
    impactBadge: z.string().optional().nullable(),
  })).optional(),
  keyBenefits: z.array(z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    stat: z.string().optional().nullable(),
  })).optional(),
  features: z.array(z.object({
    title: z.string().min(1),
    description: z.string().min(1),
  })).optional(),
  pricing: z.array(z.object({
    name: z.string().min(1),
    price: z.string().min(1),
    description: z.string().min(1),
    features: z.array(z.string()),
    popular: z.boolean().default(false),
  })).optional(),
});

export type ServiceInput = z.infer<typeof serviceSchema>;
