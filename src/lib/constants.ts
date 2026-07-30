// ============================================
// TYPES & DATA RE-EXPORT FROM DATA.JS
// ============================================
import {
  AGENCY,
  NAV_LINKS,
  STATS,
  SERVICES,
  PORTFOLIO,
  TESTIMONIALS,
  WHY_CHOOSE_US,
} from "../../data.js";

export interface NavLink {
  label: string;
  href: string;
  children?: { label: string; href: string; icon?: string; logo?: string }[];
}

export interface ServiceFeature {
  title: string;
  description: string;
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

export {
  AGENCY,
  NAV_LINKS,
  STATS,
  SERVICES,
  PORTFOLIO,
  TESTIMONIALS,
  WHY_CHOOSE_US,
};
