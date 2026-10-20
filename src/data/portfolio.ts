import type { PortfolioItem } from "@/types";
import { PORTFOLIO_THUMBS, VIDEOS } from "./assets";

/**
 * DAFTAR PORTOFOLIO / HASIL KARYA PROYEK ANTRONIX
 * Sampul gambar tidak dituliskan di sini — ia diambil dari PORTFOLIO_THUMBS
 * (data/assets.ts) lewat `slug`, sehingga path file hanya ada di satu tempat.
 * Menambah proyek baru = tambah slug pada tipe PortfolioSlug + satu entri di
 * PORTFOLIO_THUMBS, lalu tambahkan objek di bawah.
 */
const PORTFOLIO_ITEMS: Array<Omit<PortfolioItem, "thumbnailUrl">> = [
  {
    id: "1",
    title: "Website Perumahan Modern",
    slug: "website-perumahan",
    category: "web-studio",
    description:
      "Platform website perumahan modern dengan tampilan visual interaktif, galeri tipe unit, dan integrasi pemesanan WhatsApp.",
    videoUrl: "https://knsvwymkmdjyxtmzgtvb.supabase.co/storage/v1/object/public/agency-assets/vidio/website--perumahan.mp4",
    liveUrl: "https://website-perumahan-nu.vercel.app/",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
    isFeatured: true,
  },
  {
    id: "3",
    title: "Sistem Manajemen Restoran & Kasir",
    slug: "restaurant-system",
    category: "system-lab",
    description:
      "Sistem manajemen restoran terpadu — kasir POS, stok bahan baku, layar dapur, dan laporan keuangan terintegrasi online.",
    videoUrl: VIDEOS.ambient,
    techStack: ["Next.js", "PostgreSQL", "Node.js", "WebSocket"],
    isFeatured: true,
  },
  {
    id: "4",
    title: "Website Aureo Coffee",
    slug: "website-aureo-coffee",
    category: "web-studio",
    description:
      "Landing page & website brand Aureo Coffee dengan desain visual modern, animasi interaktif, dan performa tinggi.",
    videoUrl: "https://knsvwymkmdjyxtmzgtvb.supabase.co/storage/v1/object/public/agency-assets/vidio/website-aureo-coffe.mp4",
    liveUrl: "https://energy-drink-five.vercel.app/",
    techStack: ["Next.js", "Framer Motion", "Tailwind CSS", "TypeScript"],
    isFeatured: true,
  },
  {
    id: "6",
    title: "Dasbor Pemantauan Pengiriman Ekspedisi",
    slug: "logistics-dashboard",
    category: "system-lab",
    description:
      "Dasbor pemantauan kurir real-time, manajemen armada pengiriman, dan peta interaktif analitik kinerja logistik.",
    videoUrl: VIDEOS.ambient,
    techStack: ["React", "MapboxGL", "Node.js", "PostgreSQL"],
    isFeatured: true,
  },
  {
    id: "7",
    title: "Website Rental Mobil",
    slug: "website-rental-mobil",
    category: "web-studio",
    description:
      "Platform website rental & sewa mobil modern dengan sistem katalog kendaraan, reservasi armada, dan integrasi pemesanan WhatsApp.",
    videoUrl: "https://knsvwymkmdjyxtmzgtvb.supabase.co/storage/v1/object/public/agency-assets/vidio/website-rental-mobil.mp4",
    liveUrl: "https://rental-mobil-kappa.vercel.app/",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
    isFeatured: true,
  },
  {
    id: "8",
    title: "Sistem Manajemen Kepegawaian (HRIS)",
    slug: "hr-management",
    category: "system-lab",
    description:
      "Sistem kepegawaian terpadu — absensi online, penggajian otomatis, penilaian kinerja, dan perekrutan karyawan perusahaan.",
    videoUrl: VIDEOS.ambient,
    techStack: ["Next.js", "PostgreSQL", "Drizzle ORM", "Redis"],
    isFeatured: false,
  },
  {
    id: "9",
    title: "Website Marketplace Skincare",
    slug: "marketplace-skincare",
    category: "web-studio",
    description:
      "Platform website e-commerce & marketplace skincare modern dengan desain visual anggun, katalog produk interaktif, dan integrasi pemesanan WhatsApp.",
    videoUrl: "https://knsvwymkmdjyxtmzgtvb.supabase.co/storage/v1/object/public/agency-assets/vidio/marketplace-skincare.mp4",
    liveUrl: "https://skincare-lime-zeta.vercel.app/",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
    isFeatured: true,
  },
  {
    id: "10",
    title: "Website Fakultas Hukum Universitas Palembang",
    slug: "website-fh-unpal",
    category: "web-studio",
    description:
      "Platform website resmi Fakultas Hukum Universitas Palembang dengan desain modern, struktur informasi akademik, serta aksesibilitas tinggi.",
    liveUrl: "https://fhunpal.id/",
    techStack: ["Next.js", "Tailwind CSS", "TypeScript"],
    isFeatured: true,
  },
  {
    id: "11",
    title: "Website Universitas Sjakhyakirti",
    slug: "website-univ-sjakhyakirti",
    category: "web-studio",
    description:
      "Platform website resmi Universitas Sjakhyakirti dengan desain intuitif, informasi akademik terpadu, serta tampilan responsif.",
    liveUrl: "https://web-univ-eight.vercel.app/",
    techStack: ["Next.js", "Tailwind CSS", "TypeScript"],
    isFeatured: true,
  },
  {
    id: "12",
    title: "Sistem Pemesanan & POS Cafe Modern",
    slug: "sistem-pemesanan-cafe",
    category: "system-lab",
    description:
      "Aplikasi sistem pemesanan online & kasir cafe interaktif dengan alur pemesanan efisien, dasbor manajemen menu, dan integrasi transaksi real-time.",
    videoUrl: VIDEOS.posDemo,
    liveUrl: "https://caffe-app-woad.vercel.app/",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    isFeatured: true,
  },
];

export const PORTFOLIO: PortfolioItem[] = PORTFOLIO_ITEMS.map((item) => ({
  ...item,
  thumbnailUrl: PORTFOLIO_THUMBS[item.slug],
}));
