import type { Service } from "@/types/agency";

export const WEB_STUDIO_SERVICE: Service = {
  id: "web-studio",
  slug: "web-studio",
  title: "Web Studio",
  shortTitle: "Web Studio",
  icon: "globe",
  logo: "/Web-Studio.avif",
  description:
    "Kami membangun website modern, SEO-optimized, dan landing page berkinerja tinggi yang dirancang khusus untuk meningkatkan konversi dan citra brand Anda.",
  shortDescription: "Custom Web, SEO, & Landing Pages",
  color: "hsl(220, 90%, 60%)",
  gradient: "from-blue-500 via-cyan-500 to-teal-500",
  targetAudience: [
    {
      title: "UMKM",
      description: "Pelaku usaha kecil & menengah yang ingin membangun kredibilitas instan di mata calon pembeli.",
      icon: "UserCheck",
      image: "/image/umkm.avif",
      badge: "Kredibilitas Instan",
    },
    {
      title: "Personal Branding",
      description: "Profesional & public figure yang ingin tampil percaya diri dan menonjolkan keahlian.",
      icon: "UserCheck",
      image: "/image/personal-barending.avif",
      badge: "Personal Brand",
    },
    {
      title: "Brand D2C",
      description: "Bisnis Direct-to-Consumer yang membutuhkan website visual memikat.",
      icon: "ShoppingBag",
      image: "/image/toko-online.avif",
      badge: "Visual Memikat",
    },
    {
      title: "Toko Online",
      description: "E-commerce yang membutuhkan checkout mulus dan konversi penjualan tinggi.",
      icon: "Store",
      image: "/image/toko-online.avif",
      badge: "Konversi Tinggi",
    },
    {
      title: "Perusahaan B2B",
      description: "Perusahaan korporat yang memerlukan profil terpercaya menggaet klien bernilai tinggi.",
      icon: "Building2",
      image: "/image/prusahaan-b2b.avif",
      badge: "Profil Kelas Dunia",
    },
    {
      title: "Startup",
      description: "Perusahaan rintisan yang ingin menggaet investor & meluncurkan produk dengan cepat.",
      icon: "Sparkles",
      image: "/image/startup.avif",
      badge: "Siap Scale-Up",
    },
    {
      title: "Penyedia Jasa",
      description: "Praktisi digital & bisnis jasa yang memerlukan landing page efisien.",
      icon: "Target",
      image: "/image/penyedia-jasa.avif",
      badge: "Optimasi Jasa",
    },
    {
      title: "Agensi",
      description: "Agensi kreatif & marketing yang membutuhkan landing page performa tinggi untuk campaign.",
      icon: "Megaphone",
      image: "/image/agensi.avif",
      badge: "Optimasi Ads",
    },
  ],
  problemsAndSolutions: [
    {
      problemTitle: "Website Lemot & Calon Pembeli Kabur",
      problemDescription: "Loading lebih dari 3 detik membuat 60%+ calon pelanggan membatalkan niat beli dan berpindah ke kompetitor.",
      solutionTitle: "Arsitektur Next.js 16 Ultra-Fast",
      solutionDescription: "Website dibuka secepat kilat (skor Lighthouse 95-100), menjaga perhatian calon pembeli sejak detik pertama.",
    },
    {
      problemTitle: "Tampilan Jadul & Tidak Menjual",
      problemDescription: "Desain yang kaku dan tidak responsif di HP membuat brand terlihat kurang tepercaya dan amatir.",
      solutionTitle: "UI/UX Aesthetic & Responsive Dynamic",
      solutionDescription: "Desain modern kelas dunia dengan animasi halus, tata letak presisi, dan pengalaman pengguna memukau di semua perangkat.",
    },
    {
      problemTitle: "Sulit Ditemukan di Google (SEO Buruk)",
      problemDescription: "Website tidak muncul di halaman utama pencarian sehingga kehilangan potensi ribuan pembeli organik setiap bulan.",
      solutionTitle: "Advanced Technical & On-Page SEO",
      solutionDescription: "Struktur HTML5 semantik, optimasi kata kunci, schema markup, dan meta tags presisi agar mendominasi mesin pencari.",
    },
    {
      problemTitle: "Ketergantungan Pada Developer & Sulit Edit Content",
      problemDescription: "Harus membayar mahal dan menunggu lama setiap kali ingin memperbarui teks, produk, atau foto promo.",
      solutionTitle: "CMS Admin Dashboard Intuitif",
      solutionDescription: "Panel kelola konten yang mudah digunakan kapan saja tanpa perlu menyentuh baris kode sedikit pun.",
    },
  ],
  keyBenefits: [
    {
      title: "Peningkatan Konversi Penjualan",
      description: "Struktur landing page dirancang khusus berdasarkan psikologi pembeli untuk memaksimalkan ROI iklan Anda.",
      stat: "+145%",
    },
    {
      title: "Kecepatan Muat Ultra Tinggi",
      description: "Menggunakan teknologi server-side rendering Next.js terbaru untuk performa tanpa tanding.",
      stat: "< 1 Detik",
    },
    {
      title: "Perlindungan & Keamanan Maksimal",
      description: "Disertai sertifikat enkripsi SSL, perlindungan anti-DDoS, dan backup otomatis berkala.",
      stat: "100% Secure",
    },
  ],
  features: [
    {
      title: "Pengembangan Web Custom",
      description:
        "Pengembangan web khusus yang disesuaikan dengan kebutuhan dan identitas unik brand Anda.",
    },
    {
      title: "Optimasi SEO Tingkat Lanjut",
      description:
        "Dioptimalkan untuk mesin pencari agar bisnis Anda mudah ditemukan pelanggan di Google.",
    },
    {
      title: "Landing Page Konversi Tinggi",
      description:
        "Landing page dengan desain modern & copywriting terfokus untuk tingkat konversi penjualan maksimal.",
    },
    {
      title: "Integrasi Panel Admin CMS",
      description:
        "Panel admin intuitif dan mudah digunakan untuk mengelola konten website kapan saja.",
    },
    {
      title: "Kecepatan Performa Utama",
      description:
        "Waktu muat halaman ultra-cepat menggunakan teknologi Next.js & optimasi tingkat tinggi.",
    },
    {
      title: "Animasi & Interaksi Modern",
      description:
        "Micro-interactions dan animasi halus untuk memberikan pengalaman pengguna tingkat premium.",
    },
  ],
  pricing: [
    {
      name: "Pemula (Starter)",
      price: "5 Juta",
      description: "Sangat cocok untuk UMKM, bisnis lokal & personal branding",
      features: [
        "Landing Page (1-3 Halaman)",
        "Desain Responsif Ponsel & Tablet",
        "Optimasi SEO Dasar",
        "Formulir Kontak WhatsApp",
        "1x Revisi Desain",
        "Gratis Hosting 1 Tahun",
      ],
    },
    {
      name: "Profesional",
      price: "15 Juta",
      description: "Solusi ideal untuk bisnis berkembang yang ingin tampil terpercaya",
      features: [
        "Website Komplit 5-10 Halaman",
        "Panel Admin CMS Custom",
        "Optimasi SEO Tingkat Lanjut",
        "Integrasi Artikel & Blog",
        "3x Revisi Desain",
        "Gratis Domain & Hosting 1 Tahun",
        "Setup Google Analytics & Piksel Iklan",
      ],
      popular: true,
    },
    {
      name: "Skala Besar (Enterprise)",
      price: "35 Juta+",
      description: "Solusi sistem terintegrasi lengkap untuk korporasi skala besar",
      features: [
        "Aplikasi Web Custom Kompleks",
        "Toko Online E-Commerce / Marketplace",
        "Sistem CMS Tingkat Lanjut",
        "Integrasi API & Payment Gateway",
        "Revisi Tanpa Batas",
        "Garansi & Maintenance 6 Bulan",
        "Dukungan Prioritas 24/7",
        "Optimasi Performa Server Maksimal",
      ],
    },
  ],
};
