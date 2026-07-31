export interface SocialLinks {
  whatsapp: string;
  instagram: string;
  tiktok: string;
  linkedin: string;
  x: string;
  youtube: string;
}

export interface AgencyInfo {
  name: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  socials: SocialLinks;
}

export interface NavChild {
  label: string;
  href: string;
  icon?: string;
  logo?: string;
  description?: string;
}

export interface NavLink {
  label: string;
  href: string;
  children?: NavChild[];
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export interface ServiceFeature {
  title: string;
  description: string;
}

export interface TargetAudience {
  title: string;
  description: string;
  icon?: string;
  image?: string;
  badge?: string;
}

export interface ProblemSolution {
  problemTitle: string;
  problemDescription: string;
  solutionTitle: string;
  solutionDescription: string;
  impactBadge?: string;
}

export interface KeyBenefit {
  title: string;
  description: string;
  stat?: string;
}

export interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  icon: string;
  logo?: string;
  description: string;
  shortDescription: string;
  color: string;
  gradient: string;
  targetAudience?: TargetAudience[];
  problemsAndSolutions?: ProblemSolution[];
  keyBenefits?: KeyBenefit[];
  features: ServiceFeature[];
  pricing: PricingTier[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  thumbnailUrl: string;
  videoUrl?: string;
  liveUrl?: string;
  techStack: string[];
  isFeatured: boolean;
}

export interface Testimonial {
  id: string;
  clientName: string;
  companyOrRole: string;
  avatarUrl: string;
  content: string;
  rating: number;
}

export interface WhyChooseUsItem {
  icon: string;
  title: string;
  description: string;
}
