import type { ClientLogo } from "@/types";

/**
 * KLIEN & MITRA YANG DITAMPILKAN DI BAWAH HERO BERANDA
 * Daftar ini sengaja berdiri sendiri (bukan turunan data/portfolio.ts) karena
 * nama yang ditampilkan adalah wordmark brand, bukan judul proyek:
 * "Website Aureo Coffee" ≠ "AUREO COFFEE". `portfolioSlug` tetap dipakai untuk
 * menautkan entri ke proyek aslinya, dan sektor industri mengacu pada nilai
 * judul di data/industries.ts supaya istilahnya konsisten.
 *
 * Belum ada file logo dari klien, jadi wordmark dirender sebagai teks
 * (components/sections/client-logos.tsx). Saat aset resmi diterima: taruh
 * filenya di public/clients/<slug>.avif, daftarkan path lengkapnya di
 * data/assets.ts (wajib literal, periksa lewat npm run check:assets), lalu
 * ganti teks dengan <Image />.
 */
export const CLIENT_LOGOS: ClientLogo[] = [
  {
    id: "fh-unpal",
    name: "FH UNPAL",
    sector: "Perguruan Tinggi",
    accent: "#3b82f6",
    portfolioSlug: "website-fh-unpal",
  },
  {
    id: "univ-sjakhyakirti",
    name: "UNIVERSITAS SJAKHYAKIRTI",
    sector: "Perguruan Tinggi",
    accent: "#f59e0b",
    portfolioSlug: "website-univ-sjakhyakirti",
  },
  {
    id: "aureo-coffee",
    name: "AUREO COFFEE",
    sector: "Kafe & Coffee Shop",
    accent: "#d97706",
    portfolioSlug: "website-aureo-coffee",
  },
  {
    id: "perumahan-modern",
    name: "PERUMAHAN MODERN",
    sector: "Real Estate & Properti",
    accent: "#22d3ee",
    portfolioSlug: "website-perumahan",
  },
  {
    id: "rental-mobil",
    name: "RENTAL MOBIL",
    sector: "Bengkel & Otomotif",
    accent: "#a78bfa",
    portfolioSlug: "website-rental-mobil",
  },
  {
    id: "marketplace-skincare",
    name: "MARKETPLACE SKINCARE",
    sector: "Toko Skincare & Kecantikan",
    accent: "#f472b6",
    portfolioSlug: "marketplace-skincare",
  },
  {
    id: "resto-pos",
    name: "SISTEM POS RESTO",
    sector: "Restoran & Catering",
    accent: "#34d399",
    portfolioSlug: "restaurant-system",
  },
  {
    id: "sistem-pemesanan-cafe",
    name: "SISTEM PESAN CAFE",
    sector: "Kafe & Coffee Shop",
    accent: "#fbbf24",
    portfolioSlug: "sistem-pemesanan-cafe",
  },
];
