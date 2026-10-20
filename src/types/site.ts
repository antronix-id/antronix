/**
 * TYPES IDENTITAS BRAND
 */

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

/** Aset logo dengan dimensi asli file supaya rasio tidak saat di-resize CSS */
export interface BrandLogo {
  src: string;
  width: number;
  height: number;
  alt: string;
}
