import type { MetadataRoute } from "next";
import { SITE, absoluteUrl } from "@/config/site";

/**
 * robots.txt — seluruh halaman marketing sengaja boleh dirayapi (tidak ada
 * area privat di app ini). Ganti `disallow: ["/"]` bila deployment staging
 * perlu ditutup dari mesin pencari.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE.url,
  };
}
