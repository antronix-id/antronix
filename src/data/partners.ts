import type { PartnerStrip, ServiceSlug } from "@/types";

/**
 * STRIP PARTNERSHIP / TEKNOLOGI
 * Sumber konten LogoCarousel (components/sections/logo-carousel.tsx) di bawah
 * hero halaman divisi. Ditaruh di modul sendiri — bukan di dalam Service.page —
 * karena beranda mengimpor SERVICES dan meneruskan objek itu ke kartu klien,
 * sehingga URL logo ikut ter-serialize ke browser walau tak pernah dirender.
 * Divisi tanpa entri di PARTNER_STRIPS tidak menampilkan strip. Strip dirender
 * tanpa judul; `title` hanyalah label aksesibel untuk screen reader.
 *
 * URL eksternal (brand teknologi) sengaja tidak lewat data/assets.ts —
 * mengikuti pola avatar testimoni; skrip check:assets hanya memeriksa literal
 * yang diawali "/". Logo diambil dari CDN Simple Icons (cdn.simpleicons.org)
 * yang menyajikan warna brand asli; merek yang mark-nya hitam pekat (Vercel,
 * Next.js, Express, GitHub, shadcn/ui) memakai varian putih lewat segmen warna
 * di URL supaya tetap terbaca di latar gelap — bukan filter CSS. AWS tidak ada
 * di Simple Icons, jadi memakai wordmark Devicon lewat jsDelivr.
 * Saat ingin aset lokal: taruh file di
 * public/tech-logos/<slug>.svg, daftarkan tiap path literal di data/assets.ts,
 * lalu ganti `src` menjadi "/...".
 */
export const TECH_PARTNER_STRIP: PartnerStrip = {
  title: "Teknologi yang kami gunakan",
  logos: [
    { src: "https://cdn.simpleicons.org/vercel/FFFFFF", alt: "Vercel" },
    { src: "https://cdn.simpleicons.org/vite", alt: "Vite.js" },
    { src: "https://cdn.simpleicons.org/wordpress", alt: "WordPress" },
    { src: "https://cdn.simpleicons.org/react", alt: "React.js" },
    { src: "https://cdn.simpleicons.org/javascript", alt: "JavaScript" },
    { src: "https://cdn.simpleicons.org/html5", alt: "HTML5" },
    { src: "https://cdn.simpleicons.org/css/1572B6", alt: "CSS3" },
    { src: "https://cdn.simpleicons.org/python", alt: "Python" },
    { src: "https://cdn.simpleicons.org/mysql", alt: "MySQL" },
    { src: "https://cdn.simpleicons.org/supabase", alt: "Supabase" },
    { src: "https://cdn.simpleicons.org/nextdotjs/FFFFFF", alt: "Next.js" },
    { src: "https://cdn.simpleicons.org/postgresql", alt: "PostgreSQL" },
    { src: "https://cdn.simpleicons.org/drizzle", alt: "Drizzle ORM" },
    { src: "https://cdn.simpleicons.org/express/FFFFFF", alt: "Express.js" },
    { src: "https://cdn.simpleicons.org/typescript", alt: "TypeScript" },
    { src: "https://cdn.simpleicons.org/mongodb", alt: "MongoDB" },
    { src: "https://cdn.simpleicons.org/cpanel", alt: "cPanel" },
    { src: "https://cdn.simpleicons.org/betterauth", alt: "Better Auth" },
    { src: "https://cdn.simpleicons.org/nodedotjs", alt: "Node.js" },
    { src: "https://cdn.simpleicons.org/tailwindcss", alt: "Tailwind CSS" },
    { src: "https://cdn.simpleicons.org/docker", alt: "Docker" },
    { src: "https://cdn.simpleicons.org/shadcnui/FFFFFF", alt: "shadcn/ui" },
    { src: "https://cdn.simpleicons.org/coolify", alt: "Coolify" },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
      alt: "AWS",
    },
    { src: "https://cdn.simpleicons.org/git", alt: "Git" },
    { src: "https://cdn.simpleicons.org/github/FFFFFF", alt: "GitHub" },
  ],
};

/**
 * Strip per divisi, dibaca /services/[slug] lewat slug route.
 * Web Studio dan System Lab memakai daftar teknologi yang sama, jadi keduanya
 * menunjuk ke objek TECH_PARTNER_STRIP yang sama — bukan salinan terpisah,
 * supaya penambahan logo cukup diubah sekali.
 */
export const PARTNER_STRIPS: Partial<Record<ServiceSlug, PartnerStrip>> = {
  "web-studio": TECH_PARTNER_STRIP,
  "system-lab": TECH_PARTNER_STRIP,
};
