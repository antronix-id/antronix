import type { Service } from "@/types";

export const WEB_STUDIO_SERVICE: Service = {
  id: "web-studio",
  slug: "web-studio",
  title: "Web Studio",
  shortTitle: "Web Studio",
  icon: "globe",
  description:
    "Kami membangun website modern, SEO-optimized, dan landing page berkinerja tinggi yang dirancang khusus untuk meningkatkan konversi dan citra brand Anda.",
  shortDescription: "Custom Web, SEO, & Landing Pages",
  color: "hsl(220, 90%, 60%)",
  gradient: "from-blue-500 via-cyan-500 to-teal-500",
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
      icon: "code2",
      description:
        "Pengembangan web khusus yang disesuaikan dengan kebutuhan dan identitas unik brand Anda.",
    },
    {
      title: "Optimasi SEO Tingkat Lanjut",
      icon: "searchCheck",
      description:
        "Dioptimalkan untuk mesin pencari agar bisnis Anda mudah ditemukan pelanggan di Google.",
    },
    {
      title: "Landing Page Konversi Tinggi",
      icon: "target",
      description:
        "Landing page dengan desain modern & copywriting terfokus untuk tingkat konversi penjualan maksimal.",
    },
    {
      title: "Integrasi Panel Admin CMS",
      icon: "layoutDashboard",
      description:
        "Panel admin intuitif dan mudah digunakan untuk mengelola konten website kapan saja.",
    },
    {
      title: "Kecepatan Performa Utama",
      icon: "gauge",
      description:
        "Waktu muat halaman ultra-cepat menggunakan teknologi Next.js & optimasi tingkat tinggi.",
    },
    {
      title: "Animasi & Interaksi Modern",
      icon: "sparkles",
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
  page: {
    heroTagline:
      "Website Performance Tinggi, Konversi Maksimal, Modern, Cepat, SEO Optimized",
    accentColor: "#06b6d4",
    portfolioDescription:
      "Lihat hasil karya dan proyek impian klien yang telah kami realisasikan.",
    featuresTitle: "Apa yang Kami",
    featuresHighlight: "Tawarkan",
    featuresDescription:
      "Setiap website yang kami bangun dirancang khusus untuk performa tinggi, konversi maksimal, dan pengalaman pengguna tingkat premium.",
    featuresAmbientClass: "bg-blue-600/10",
    pricingDescription:
      "Pilih paket yang sesuai dengan kebutuhan dan skala bisnis Anda.",
  },
};
