import type { Service, ServiceSlug } from "@/types";
import { SYSTEM_LAB_SERVICE } from "./system-lab";
import { WEB_STUDIO_SERVICE } from "./web-studio";

/**
 * REGISTRY DIVISI LAYANAN
 * Menambah divisi baru = buat file baru di folder ini, tambahkan ke array di
 * bawah. Route /services/[slug], submenu navigasi, kartu di beranda, dan
 * sitemap semuanya mengikuti array ini tanpa mengubah komponen.
 */
export const SERVICES: Service[] = [WEB_STUDIO_SERVICE, SYSTEM_LAB_SERVICE];

export const SERVICE_SLUGS: ServiceSlug[] = SERVICES.map((service) => service.slug);

/** Cari divisi berdasarkan slug route; `undefined` jika tidak dikenal */
export function getService(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}
