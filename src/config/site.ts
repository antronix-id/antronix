import { AGENCY } from "@/data/brand";

/**
 * ==============================================================================
 * KONFIGURASI DEPLOYMENT
 * ==============================================================================
 * Bedanya dengan `data/brand.ts`: brand berisi identitas yang dibaca pengunjung
 * di halaman, config berisi fakta teknis yang dibutuhkan mesin — metadata,
 * canonical URL, sitemap, robots, dan ImageResponse.
 *
 * `name` diimpor dari brand supaya satu fakta tidak ditulis dua kali.
 * `description` sengaja dipisah dari `AGENCY.description` (paragraf footer):
 * teks meta ini varian khusus SEO, jadi keduanya memang berbeda isi.
 */
export const SITE = {
  /** Origin publik. Ganti satu baris ini saat domain produksi berubah. */
  url: "https://antronix.com",
  name: AGENCY.name,
  /** Judul tab untuk route yang tidak menyetel judul sendiri (beranda). */
  defaultTitle:
    "Antronix Mempercepat Pertumbuhan melalui Kreativitas dan Sistem Full-Stack",
  /** Varian judul untuk kartu berbagi (og:title) — pakai en-dash. */
  ogTitle:
    "Antronix — Mempercepat Pertumbuhan melalui Kreativitas dan Sistem Full-Stack",
  description:
    "Agency digital terdepan yang mengakselerasi pertumbuhan bisnis Anda melalui website modern & sistem full-stack terintegrasi.",
  /** Template judul child segment: "%s" diisi judul halaman. */
  titleTemplate: `%s | ${AGENCY.name}`,
  locale: "id_ID",
  keywords: [
    "digital agency",
    "web studio",
    "system lab",
    "custom web",
    "POS",
    "SaaS",
    "DevOps",
    "Indonesia",
    "Jakarta",
  ],
} as const;

/** Path absolut untuk metadataBase / canonical ("/portfolio" → URL penuh). */
export function absoluteUrl(path = "/"): string {
  const clean = path === "/" ? "" : path.replace(/\/+$/, "");
  return `${SITE.url}${clean}`;
}

/**
 * GAMBAR BERBAGI
 * `app/opengraph-image.tsx` mengambil angka & teks dari sini, dan
 * `lib/metadata.ts` memasangnya di `openGraph.images`. Penulisan eksplisit itu
 * perlu karena segmen yang menyetel `openGraph` sendiri (tiap halaman
 * marketing) menimpa openGraph warisan dari root, termasuk images hasil file
 * convention.
 */
export const OG_IMAGE = {
  path: "/opengraph-image",
  width: 1200,
  height: 630,
  type: "image/png",
  alt: SITE.defaultTitle,
} as const;
