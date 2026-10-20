import type { IndustrySegment, IndustrySlug } from "@/types";
import { INDUSTRY_ICONS } from "./assets";

/**
 * SEGMEN INDUSTRI / TARGET KLIEN
 * `id` adalah IndustrySlug dan kunci lookup ke INDUSTRY_ICONS, sehingga nama
 * file ikon tidak lagi diturunkan dari judul (dulu: "Kafe & Coffee Shop.avif"
 * di public/icon — spasi dan "&" membuat optimizer gambar mengembalikan 400).
 * Segmen baru = tambah nilai di tipe IndustrySlug + entri INDUSTRY_ICONS +
 * file public/icons/<slug>.avif + satu baris di bawah.
 */
const SEGMENTS: Array<{ id: IndustrySlug; title: string }> = [
  { id: "kafe-coffeeshop", title: "Kafe & Coffee Shop" },
  { id: "toko-skincare", title: "Toko Skincare & Kecantikan" },
  { id: "sekolah-pendidikan", title: "Sekolah & Lembaga Pendidikan" },
  { id: "klinik-kesehatan", title: "Klinik & Layanan Kesehatan" },
  { id: "toko-fashion", title: "Toko Fashion & Distro" },
  { id: "bengkel-otomotif", title: "Bengkel & Otomotif" },
  { id: "hotel-penginapan", title: "Hotel & Penginapan" },
  { id: "supermarket-retail", title: "Supermarket & Retail" },
  { id: "agensi-konsultan", title: "Agensi & Konsultan" },
  { id: "restoran-catering", title: "Restoran & Catering" },
  { id: "barbershop-salon", title: "Barbershop & Salon" },
  { id: "realestate-properti", title: "Real Estate & Properti" },
];

export const INDUSTRIES: IndustrySegment[] = SEGMENTS.map((segment) => ({
  id: segment.id,
  title: segment.title,
  image: INDUSTRY_ICONS[segment.id],
}));
