import type { Metadata } from "next";
import { OG_IMAGE, SITE, absoluteUrl } from "@/config/site";

export interface PageMetadataInput {
  /**
   * Judul pendek halaman. Digabung dengan `SITE.titleTemplate` sehingga hasil
   * akhirnya "Portofolio | Antronix". Jika tidak diisi, judul brand penuh
   * dipakai apa adanya (tanpa template, agar brand tidak ditulis dua kali).
   */
  title?: string;
  /** Deskripsi untuk `<meta name="description">` dan kartu berbagi. */
  description: string;
  /** Path route relatif, mis. "/" atau "/services/web-studio". */
  path: string;
}

/**
 * SATU POLA METADATA UNTUK SEMUA ROUTE MARKETING
 * `openGraph.images` ditunjuk eksplisit ke route yang dihasilkan
 * `app/opengraph-image.tsx`; tanpa itu gambar konvensi tersebut hilang lagi
 * karena tiap halaman menyetel `openGraph` sendiri.
 */
export function createMetadata({
  title,
  description,
  path,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);

  return {
    title: title ?? { absolute: SITE.defaultTitle },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: SITE.locale,
      url,
      siteName: SITE.name,
      title: title ? `${title} | ${SITE.name}` : SITE.ogTitle,
      description,
      images: [
        {
          url: absoluteUrl(OG_IMAGE.path),
          width: OG_IMAGE.width,
          height: OG_IMAGE.height,
          type: OG_IMAGE.type,
          alt: OG_IMAGE.alt,
        },
      ],
    },
  };
}
