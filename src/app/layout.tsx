import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SITE } from "@/config/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Metadata global: kerangka saja (template judul, keywords, metadataBase).
 * Judul & deskripsi per halaman ada di `generateMetadata` tiap route, lewat
 * helper `lib/metadata.ts`. Gambar og disuplai file convention
 * `app/opengraph-image.tsx` sehingga tidak perlu ditulis di sini (menghindari
 * tag `og:image` ganda).
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.defaultTitle,
    template: SITE.titleTemplate,
  },
  description: SITE.description,
  // SITE memakai `as const` (readonly); metadata menuntut array mutable.
  keywords: [...SITE.keywords],
  authors: [{ name: SITE.name }],
  // Favicon & apple-icon diambil dari file convention src/app/icon.png dan
  // src/app/apple-icon.png (dibuat dari public/logo1.avif), jadi tidak perlu
  // didefinisikan ulang lewat metadata.
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.ogTitle,
    description: SITE.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} font-sans dark h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
