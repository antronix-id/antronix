import type { AgencyInfo, NavLink, StatItem, WhyChooseUsItem } from "@/types/agency";

/**
 * 1. INFORMASI UTAMA BRAND & KONTAK AGENCY
 */
export const AGENCY: AgencyInfo = {
  name: "Antronix",
  tagline: "Akselerasi Pertumbuhan Bisnis dengan Kreativitas AI & Sistem Full-Stack.",
  description:
    "Agensi digital terdepan yang mengakselerasi pertumbuhan bisnis Anda melalui kreativitas AI & sistem full-stack terintegrasi.",
  email: "hello@antronix.com",
  phone: "+62 812 3456 7890",
  whatsapp: "6281234567890",
  address: "Jakarta, Indonesia",
  socials: {
    whatsapp: "https://wa.me/6281234567890",
    instagram: "https://instagram.com/antronix",
    tiktok: "https://tiktok.com/@antronix",
    linkedin: "https://linkedin.com/company/antronix",
    x: "https://x.com/antronix",
    youtube: "https://youtube.com/@antronix",
  },
};

/**
 * 2. MENU NAVIGASI WEBSITE (NAVBAR & FOOTER)
 */
export const NAV_LINKS: NavLink[] = [
  { label: "Beranda", href: "/" },
  { label: "Web Studio", href: "/services/web-studio" },
  { label: "AI Media Lab", href: "/services/ai-media-lab" },
  { label: "System Lab", href: "/services/system-lab" },
];

/**
 * 3. ANGKA STATISTIK / PRESTASI
 */
export const STATS: StatItem[] = [
  { value: 50, suffix: "+", label: "Proyek Selesai" },
  { value: 30, suffix: "+", label: "Klien Puas" },
  { value: 3, suffix: " Thn", label: "Pengalaman Industri" },
  { value: 99, suffix: "%", label: "Tingkat Kepuasan" },
];

/**
 * 4. KEUNGGULAN ANTRONIX (WHY CHOOSE US)
 */
export const WHY_CHOOSE_US: WhyChooseUsItem[] = [
  {
    icon: "zap",
    title: "Teknologi Terdepan",
    description:
      "Kami menggunakan kombinasi Next.js, AI mutakhir, dan infrastruktur cloud terpercaya untuk hasil terbaik.",
  },
  {
    icon: "shield",
    title: "Kualitas Terjamin",
    description:
      "Setiap proyek melalui pengujian kualitas ketat dan penjaminan mutu sebelum diserahterimakan.",
  },
  {
    icon: "clock",
    title: "Tepat Waktu",
    description:
      "Kami berkomitmen pada tenggat waktu yang disepakati dengan laporan perkembangan berkala.",
  },
  {
    icon: "headphones",
    title: "Dukungan Berkelanjutan",
    description:
      "Dukungan purnajual dan perawatan berkala untuk memastikan sistem Anda selalu berjalan lancar.",
  },
  {
    icon: "trending-up",
    title: "Fokus Pada Hasil & ROI Nyata",
    description:
      "Setiap solusi dirancang khusus untuk memberikan hasil pertumbuhan bisnis yang nyata dan terukur.",
  },
  {
    icon: "users",
    title: "Tim Ahli Berpengalaman",
    description:
      "Dikerjakan oleh tim pengembang web, perancang visual, dan spesialis AI berpengalaman di industri.",
  },
];
