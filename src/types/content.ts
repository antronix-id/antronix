/**
 * TYPES KONTEN MARKETING
 * Bentuk data yang dikonsumsi oleh src/data/* dan komponen di src/components/sections.
 */

export interface ServiceFeature {
  title: string;
  description: string;
  /** Kunci ikon pada FEATURE_ICONS (services/[slug]/sections/feature-grid.tsx) */
  icon?: string;
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

/** Nama slug divisi layanan (sumber tunggal untuk route /services/[slug]) */
export type ServiceSlug = "web-studio" | "system-lab";

/**
 * Kunci sampul portofolio — sama dengan slug proyek di data/portfolio.ts.
 * Sampul bersifat opsional (lihat PORTFOLIO_THUMBS di data/assets.ts), jadi
 * tidak semua slug wajib punya entri di sini.
 */
export type PortfolioSlug =
  | "website-perumahan"
  | "restaurant-system"
  | "website-aureo-coffee"
  | "logistics-dashboard"
  | "website-rental-mobil"
  | "hr-management"
  | "marketplace-skincare"
  | "website-fh-unpal"
  | "website-univ-sjakhyakirti"
  | "sistem-pemesanan-cafe";

/**
 * Kunci ikon segmen industri — sama dengan `id` di data/industries.ts.
 * Nama file mengikuti id (public/icons/<id>.avif) supaya path bisa dituliskan
 * apa adanya di INDUSTRY_ICONS dan diperiksa oleh scripts/check-assets.ts.
 */
export type IndustrySlug =
  | "kafe-coffeeshop"
  | "toko-skincare"
  | "sekolah-pendidikan"
  | "klinik-kesehatan"
  | "toko-fashion"
  | "bengkel-otomotif"
  | "hotel-penginapan"
  | "supermarket-retail"
  | "agensi-konsultan"
  | "restoran-catering"
  | "barbershop-salon"
  | "realestate-properti";

/** Varian warna glow latar ParallaxCosmic */
export type CosmicGlowColor = "cyan" | "pink" | "green";

/**
 * SALINAN HALAMAN DIVISI (/services/[slug])
 * Semua teks dan aksen yang dulu hardcoded di masing-masing halaman layanan
 * pindah ke sini, sehingga divisi baru hanya perlu menambah file data.
 */
export interface ServicePageCopy {
  /** Subjudul animasi pada hero cosmic */
  heroTagline: string;
  /** Varian glow hero; default komponen "cyan" */
  heroGlow?: CosmicGlowColor;
  /** HEX aksen divisi — glow seksi masalah/solusi & fallback ikon fitur */
  accentColor: string;
  portfolioDescription: string;
  /** Batas jumlah proyek yang ditampilkan; tanpa nilai = semua */
  portfolioLimit?: number;
  featuresTitle: string;
  featuresHighlight: string;
  featuresDescription: string;
  /** Class Tailwind glow ambient di balik grid fitur (opsional) */
  featuresAmbientClass?: string;
  pricingDescription: string;
}

export interface Service {
  id: string;
  slug: ServiceSlug;
  title: string;
  shortTitle: string;
  /** Kunci ikon lucide, dipakai juga sebagai fallback pemetaan logo */
  icon: string;
  description: string;
  shortDescription: string;
  color: string;
  gradient: string;
  problemsAndSolutions?: ProblemSolution[];
  keyBenefits?: KeyBenefit[];
  features: ServiceFeature[];
  pricing: PricingTier[];
  page: ServicePageCopy;
}

export interface PortfolioItem {
  id: string;
  title: string;
  slug: PortfolioSlug;
  category: ServiceSlug;
  description: string;
  /**
   * Sampul statis proyek. Kosong bila file gambarnya memang belum ada:
   * LaptopMockup hanya memakai nilai ini sebagai `poster`/`<img>`, sehingga
   * menghilangkan entri yang menggantung lebih baik daripada meminta aset
   * yang tidak pernah disediakan.
   */
  thumbnailUrl?: string;
  videoUrl?: string;
  liveUrl?: string;
  techStack: string[];
  isFeatured: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  /** URL avatar eksternal (Unsplash) — aset lokal daftarkan di data/assets.ts */
  avatarUrl: string;
}

/** Segmen industri/target klien pada seksi "Siapa yang Membutuhkan" */
export interface IndustrySegment {
  id: IndustrySlug;
  title: string;
  image: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqRow {
  id: string;
  speed: string;
  direction?: "left" | "right";
  faqItems: FaqItem[];
}

export interface FaqData {
  mainTitle: string;
  mainSubtitle: string;
  rows: FaqRow[];
}
