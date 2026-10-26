/**
 * ==============================================================================
 * REGISTRI ASET PUBLIK
 * ==============================================================================
 * Satu-satunya tempat path file di `public/` dituliskan. Komponen & modul data
 * lain mengimpor dari sini, sehingga pemindahan/rename file aset cukup diubah
 * di satu tempat dan bisa diverifikasi lewat `npm run check:assets`.
 *
 * Aturan: hanya path lokal (diawali "/") yang terdaftar di sini. URL eksternal
 * (mis. video Supabase) tetap ditulis pada modul datanya masing-masing.
 *
 * Layout `public/` per domain:
 *   brand/                 logo mark & wordmark
 *   clients/               logo klien strip beranda — belum ada filenya, jadi
 *                          wordmark dirender sebagai teks (docs/ARCHITECTURE.md);
 *                          daftarkan path di sini saat file resmi diterima
 *   icons/<slug>.avif      ikon segmen industri (slug = IndustrySlug)
 *   imagery/               foto lintas halaman (tantangan, solusi, hero divisi)
 *   media/                 video loop latar & hero
 *   services/<divisi>/     logo divisi, gambar studi kasus, video demo
 *
 * Nama file aset memakai gaya slug (kecil, tanda hubung, tanpa spasi maupun
 * "&"): optimizer `/_next/image` menolak path berisi spasi/"&" dengan 400
 * "The requested resource isn't a valid image".
 */
import type { BrandLogo, IndustrySlug, PortfolioSlug, ServiceSlug } from "@/types";

/** Mark = ikon saja, lockup = ikon + wordmark "ANTRONIX" */
export const BRAND_LOGOS: Record<"mark" | "lockup", BrandLogo> = {
  mark: { src: "/brand/mark.avif", width: 1779, height: 1672, alt: "Antronix" },
  lockup: { src: "/brand/wordmark.avif", width: 1774, height: 461, alt: "Antronix" },
};

export const DIVISION_LOGOS: Record<ServiceSlug, string> = {
  "web-studio": "/services/web-studio/Web-Studio.avif",
  "system-lab": "/services/system-lab/System-Lab.avif",
};

export const DIVISION_HERO_IMAGES: Record<ServiceSlug, string> = {
  "web-studio": "/imagery/web.avif",
  "system-lab": "/imagery/system.avif",
};

export const IMAGES = {
  /** Seksi "tantangan" di beranda & halaman layanan */
  challenge: "/imagery/tantangan.avif",
  /** Seksi "solusi" */
  solution: "/imagery/solusi.avif",
  /** Foto tangan di atas laptop (hero beranda) */
  handsOnLaptop: "/imagery/tangan-leptop.avif",
  /** Bingkai laptop untuk mockup portofolio */
  laptopFrame: "/imagery/border-leptop.avif",
} as const;

export const VIDEOS = {
  /** Loop latar untuk preloader & fallback kartu portofolio */
  ambient: "/media/bc.mp4",
  /** Loop hero beranda */
  heroLoop: "/media/h.mp4",
  /** Demo sistem kasir/cafe pada portofolio System Lab */
  posDemo: "/services/system-lab/sistem-pemesan-caffe.mp4",
} as const;

/**
 * Gambar sampul portofolio per proyek, keyed by PortfolioSlug. Opsional:
 * slug yang tidak terdaftar berarti proyeknya belum punya file sampul, jadi
 * LaptopMockup tidak merender `poster`/`<img>` sama sekali. Saat screenshot
 * asli tersedia, tambahkan satu baris di sini (path-nya wajib ada di public/).
 */
export const PORTFOLIO_THUMBS: Partial<Record<PortfolioSlug, string>> = {
  "website-fh-unpal": "/services/web-studio/website-fhunpal.avif",
  "website-univ-sjakhyakirti": "/services/web-studio/website-univ-sjakhyakirti.avif",
};

/**
 * Ikon segmen industri (lihat data/industries.ts). Ditulis sebagai literal
 * lengkap per slug — bukan gabungan prefix + nama — supaya check-assets bisa
 * memverifikasi setiap path tanpa harus menjalankan kode.
 */
export const INDUSTRY_ICONS: Record<IndustrySlug, string> = {
  "kafe-coffeeshop": "/icons/kafe-coffeeshop.avif",
  "toko-skincare": "/icons/toko-skincare.avif",
  "sekolah-pendidikan": "/icons/sekolah-pendidikan.avif",
  "klinik-kesehatan": "/icons/klinik-kesehatan.avif",
  "toko-fashion": "/icons/toko-fashion.avif",
  "bengkel-otomotif": "/icons/bengkel-otomotif.avif",
  "hotel-penginapan": "/icons/hotel-penginapan.avif",
  "supermarket-retail": "/icons/supermarket-retail.avif",
  "agensi-konsultan": "/icons/agensi-konsultan.avif",
  "restoran-catering": "/icons/restoran-catering.avif",
  "barbershop-salon": "/icons/barbershop-salon.avif",
  "realestate-properti": "/icons/realestate-properti.avif",
};
