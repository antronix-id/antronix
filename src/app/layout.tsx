import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Artificial Ripe — Accelerating Growth with AI Creativity & Full-Stack Systems",
    template: "%s | Artificial Ripe",
  },
  description:
    "Agency digital terdepan yang mengakselerasi pertumbuhan bisnis Anda melalui kreativitas AI & sistem full-stack terintegrasi.",
  keywords: [
    "digital agency",
    "web studio",
    "AI media lab",
    "system lab",
    "custom web",
    "AI video ads",
    "POS",
    "SaaS",
    "DevOps",
    "Indonesia",
    "Jakarta",
  ],
  authors: [{ name: "Artificial Ripe" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://artificialripe.com",
    siteName: "Artificial Ripe",
    title: "Artificial Ripe — Accelerating Growth with AI Creativity & Full-Stack Systems",
    description:
      "Agency digital terdepan yang mengakselerasi pertumbuhan bisnis Anda melalui kreativitas AI & sistem full-stack terintegrasi.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} dark h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
