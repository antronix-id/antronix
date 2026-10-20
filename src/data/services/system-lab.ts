import type { Service } from "@/types";

export const SYSTEM_LAB_SERVICE: Service = {
  id: "system-lab",
  slug: "system-lab",
  title: "System Lab",
  shortTitle: "System Lab",
  icon: "cpu",
  description:
    "Kami membangun sistem kasir POS, platform SaaS khusus, dan infrastruktur DevOps teruji untuk mengotomatisasi operasional bisnis Anda.",
  shortDescription: "POS, Custom SaaS, & DevOps Infrastructure",
  color: "hsl(160, 90%, 45%)",
  gradient: "from-emerald-500 via-green-500 to-lime-500",
  problemsAndSolutions: [
    {
      problemTitle: "Pencatatan Kasir & Stok Manual Rawan Error",
      problemDescription: "Pencatatan nota manual atau spreadsheet memicu selisih stok, kecurangan transaksi, dan laporan keuangan tidak akurat.",
      solutionTitle: "Sistem Kasir POS Cloud Real-Time",
      solutionDescription: "Setiap transaksi langsung memotong stok barang secara otomatis, terhubung ke cetak struk, dan mencatat kas instan.",
    },
    {
      problemTitle: "Pemilik Bisnis Tidak Bisa Pantau dari Jauh",
      problemDescription: "Harus datang ke lokasi setiap hari hanya untuk melihat pendapatan dan laporan harian tim operasional.",
      solutionTitle: "Dasbor Analitik & Laporan Mobile",
      solutionDescription: "Pantau omset, performa produk terlaris, dan arus kas dari HP atau laptop di mana saja secara live 24/7.",
    },
    {
      problemTitle: "Pekerjaan Admin Berulang Buang Waktu & Biaya",
      problemDescription: "Staf menghabiskan berjam-jam untuk kirim tagihan manual, rekap absensi, dan update resi pengiriman satu per satu.",
      solutionTitle: "Otomatisasi Workflow & Integrasi API",
      solutionDescription: "Kirim invoice WhatsApp otomatis, cetak resi otomatis, dan integrasi payment gateway tanpa campur tangan manual.",
    },
    {
      problemTitle: "Aplikasi Sering Crash / Down Saat Jam Ramai",
      problemDescription: "Server tidak kuat menampung lonjakan pengguna sehingga transaksi terhenti dan reputasi bisnis rusak.",
      solutionTitle: "Infrastruktur Cloud DevOps & Auto-Scaling",
      solutionDescription: "Infrastruktur server cloud tangguh dengan arsitektur mikro, pemantauan otomatis, dan jaminan uptime 99.9%.",
    },
  ],
  keyBenefits: [
    {
      title: "Otomatisasi Operasional 80%",
      description: "Pangkas tugas administratif yang membuang waktu dan fokus pada pertumbuhan ekspansi bisnis Anda.",
      stat: "80% Efficiency",
    },
    {
      title: "Visibilitas Keuangan Real-Time",
      description: "Laporan grafik penjualan, margin laba rugi, dan tren pelanggan disajikan secara presisi setiap saat.",
      stat: "Real-Time Insight",
    },
    {
      title: "Skalabilitas Tanpa Batas",
      description: "Sistem dirancang modular sehingga siap dikembangkan seiring bertambahnya jumlah cabang atau pengguna.",
      stat: "Unlimited Scale",
    },
  ],
  features: [
    {
      title: "Sistem Kasir & Transaksi (POS)",
      icon: "creditCard",
      description:
        "Sistem kasir toko/restoran terintegrasi dengan pemantauan stok barang secara real-time.",
    },
    {
      title: "Pengembangan Platform SaaS Custom",
      icon: "server",
      description:
        "Pengembangan aplikasi Software-as-a-Service bertaraf perusahaan dari nol.",
    },
    {
      title: "Infrastruktur Server & DevOps",
      icon: "cloud",
      description:
        "Pemasangan alur CI/CD, peluncuran cloud server, pemantauan & skalabilitas sistem.",
    },
    {
      title: "Otomatisasi Alur Kerja Bisnis",
      icon: "workflow",
      description:
        "Mengotomatiskan proses bisnis berulang untuk efisiensi biaya operasional.",
    },
    {
      title: "Integrasi API & Layanan Pihak Ketiga",
      icon: "network",
      description:
        "Menghubungkan pembayaran otomatis, WhatsApp API, pengiriman ekspedisi & e-commerce.",
    },
    {
      title: "Dasbor Analitik Real-Time",
      icon: "barChart3",
      description:
        "Visualisasi grafik penjualan dan laporan kinerja keuangan secara langsung.",
    },
  ],
  pricing: [
    {
      name: "Esensial",
      price: "15 Juta",
      description: "Sistem dasar untuk memulai digitalisasi operasional toko/bisnis",
      features: [
        "1 Modul Utama (CRM / Stok Barang / Kasir)",
        "Laporan Dasbor Penjualan",
        "Manajemen Pengguna (Hingga 5 Akun)",
        "Integrasi Dasar",
        "Buku Panduan & Pelatihan",
        "Dukungan Teknis 3 Bulan",
      ],
    },
    {
      name: "Bisnis (Business)",
      price: "40 Juta",
      description: "Sistem terintegrasi penuh untuk bisnis yang sedang berkembang cepat",
      features: [
        "3 Modul Sistem Terintegrasi Penuh",
        "Dasbor Analitik Lanjutan",
        "Manajemen Pengguna (Hingga 25 Akun)",
        "Integrasi WhatsApp & Email Otomatis",
        "Otomatisasi Alur Kerja",
        "Pelatihan Tim Lengkap",
        "Dukungan Teknis 6 Bulan",
        "Perawatan Server Bulanan",
      ],
      popular: true,
    },
    {
      name: "Korporasi (Enterprise)",
      price: "100 Juta+",
      description: "Transformasi digital total khusus perusahaan skala nasional/enterprise",
      features: [
        "Sistem Aplikasi Custom Penuh",
        "Modul Sistem Tanpa Batas",
        "Jumlah Pengguna Tanpa Batas",
        "Integrasi API Tingkat Lanjut",
        "Analitik Prediktif Berbasis AI",
        "Aplikasi Mobile iOS & Android",
        "Tim DevOps Khusus",
        "Jaminan Server Online 99.9%",
        "Dukungan Teknis Prioritas 12 Bulan",
      ],
    },
  ],
  page: {
    heroTagline:
      "Otomatisasi Sistem, Arsitektur Cloud DevOps, POS Kasir, Custom SaaS",
    heroGlow: "green",
    accentColor: "#10b981",
    portfolioDescription:
      "Lihat arsitektur sistem dan aplikasi khusus yang telah kami bangun.",
    portfolioLimit: 3,
    featuresTitle: "Kapabilitas Sistem",
    featuresHighlight: "System Lab",
    featuresDescription:
      "Solusi teknologi andal untuk menyederhanakan dan mengotomatiskan operasional bisnis Anda.",
    pricingDescription:
      "Investasi tepat sasaran untuk otomatisasi dan efisiensi operasional bisnis.",
  },
};
