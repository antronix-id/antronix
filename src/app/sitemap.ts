import type { MetadataRoute } from "next";
import { NAV_LINKS } from "@/data";
import { absoluteUrl } from "@/config/site";

/**
 * Sitemap dibangun dari NAV_LINKS, bukan dari daftar URL yang ditulis ulang.
 * NAV_LINKS sendiri menurunkan submenu "Layanan" dari SERVICES, jadi menambah
 * divisi baru otomatis menambah entry sitemap tanpa menyentuh file ini.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const paths: string[] = [];
  for (const link of NAV_LINKS) {
    if (link.children && link.children.length > 0) {
      // href induk hanya menunjuk divisi pertama — anak-anaknya yang dipakai.
      paths.push(...link.children.map((child) => child.href));
    } else {
      paths.push(link.href);
    }
  }

  return paths.map((path) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/services/") ? 0.8 : 0.7,
  }));
}
