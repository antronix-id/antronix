/**
 * DATA RINGKAS HALAMAN TENTANG KAMI
 * Teks fokus pada inti layanan, padat, dan scannable.
 */

export const ABOUT_COMPACT = {
  hero: {
    badge: "Tentang Antronix",
    title: "Mitra Teknologi &",
    titleHighlight: "Akselerasi Bisnis",
    description:
      "Agensi digital full-stack yang menghadirkan website modern berkonversi tinggi dan sistem operasional cloud terintegrasi untuk pertumbuhan bisnis Anda.",
  },

  stats: [
    { value: "99.9%", label: "Uptime Sistem", sub: "Cloud berstandar enterprise" },
    { value: "< 1s", label: "Speed Standar", sub: "Arsitektur Next.js 16" },
    { value: "2 Divisi", label: "Layanan Spesialis", sub: "Web Studio & System Lab" },
    { value: "100%", label: "Milik Anda", sub: "Full source code & data" },
  ],

  services: [
    {
      id: "web-studio",
      slug: "web-studio",
      badge: "Divisi 01",
      title: "Web Studio",
      tagline: "Website Modern & Mesin Konversi Penjualan",
      description:
        "Solusi website interaktif berkecepatan tinggi yang dirancang untuk memperkuat citra brand dan melipatgandakan konversi prospek bisnis.",
      href: "/services/web-studio",
      accentColor: "#3b82f6",
      badgeClass: "bg-blue-500/10 text-blue-400 border-blue-500/30",
      points: [
        { label: "Landing Page Konversi Tinggi", desc: "Copywriting terarah & tombol CTA tajam" },
        { label: "Website Korporat & Institusi", desc: "Tampilan profesional & mobile-friendly" },
        { label: "Arsitektur Next.js 16 SSR", desc: "Loading secepat kilat (skor 95-100)" },
        { label: "Technical SEO & Schema", desc: "Optimal di halaman pencarian Google" },
        { label: "CMS Admin Intuitif", desc: "Kelola artikel & promo tanpa coding" },
      ],
      techStack: ["Next.js 16", "React 19", "Tailwind CSS", "TypeScript", "SEO"],
    },
    {
      id: "system-lab",
      slug: "system-lab",
      badge: "Divisi 02",
      title: "System Lab",
      tagline: "Sistem Kasir Cloud POS & Otomasi Operasional",
      description:
        "Software operasional dan aplikasi kasir berbasis cloud untuk menyederhanakan proses bisnis, mencegah human-error, dan memantau omzet harian.",
      href: "/services/system-lab",
      accentColor: "#06b6d4",
      badgeClass: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
      points: [
        { label: "Sistem Kasir Cloud POS", desc: "Multi-outlet, cetak struk & scan QRIS" },
        { label: "Manajemen Stok Otomatis", desc: "Potong bahan real-time, cegah selisih" },
        { label: "Integrasi WA & Gateway", desc: "Invoice otomatis via WA & payment gateway" },
        { label: "Dasbor Finansial Live", desc: "Pantau omzet harian dari HP 24/7" },
        { label: "Infrastruktur Cloud Tangguh", desc: "Docker & PostgreSQL dengan backup aman" },
      ],
      techStack: ["PostgreSQL", "Docker", "Redis", "Supabase", "WhatsApp API"],
    },
  ],

  values: [
    {
      icon: "zap",
      title: "Performa Kilat",
      description: "Kode bespoke berkecepatan tinggi tanpa template pasaran yang berat.",
    },
    {
      icon: "target",
      title: "Fokus Konversi",
      description: "Desain visual yang dirancang untuk menghasilkan penjualan nyata.",
    },
    {
      icon: "shield",
      title: "Aset 100% Milik Anda",
      description: "Kepemilikan source code dan database penuh tanpa vendor lock-in.",
    },
    {
      icon: "handshake",
      title: "Dukungan & Garansi",
      description: "Pendampingan tim teknis, garansi bug, dan pelatihan operasional staf.",
    },
  ],
};
