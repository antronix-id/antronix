import type {
  AgencyInfo,
  NavLink,
  StatItem,
  Service,
  PortfolioItem,
  Testimonial,
  WhyChooseUsItem,
} from "@/types/agency";

/**
 * ==============================================================================
 * 🚀 ARTIFICIAL RIPE - MASTER DATA WEBSITE (Bahasa Indonesia)
 * ==============================================================================
 */

// 1. INFORMASI UTAMA BRAND & KONTAK AGENCY
export const AGENCY: AgencyInfo = {
  name: "Artificial Ripe",
  tagline: "Akselerasi Pertumbuhan Bisnis dengan Kreativitas AI & Sistem Full-Stack.",
  description:
    "Agensi digital terdepan yang mengakselerasi pertumbuhan bisnis Anda melalui kreativitas AI & sistem full-stack terintegrasi.",
  email: "hello@artificialripe.com",
  phone: "+62 812 3456 7890",
  whatsapp: "6281234567890",
  address: "Jakarta, Indonesia",
  socials: {
    whatsapp: "https://wa.me/6281234567890",
    instagram: "https://instagram.com/artificialripe",
    tiktok: "https://tiktok.com/@artificialripe",
    linkedin: "https://linkedin.com/company/artificialripe",
    x: "https://x.com/artificialripe",
    youtube: "https://youtube.com/@artificialripe",
  },
};

// 2. MENU NAVIGASI WEBSITE (NAVBAR & FOOTER)
export const NAV_LINKS: NavLink[] = [
  { label: "Beranda", href: "/" },
  { label: "Web Studio", href: "/services/web-studio" },
  { label: "AI Media Lab", href: "/services/ai-media-lab" },
  { label: "System Lab", href: "/services/system-lab" },
];

// 3. ANGKA STATISTIK / PRESTASI
export const STATS: StatItem[] = [
  { value: 50, suffix: "+", label: "Proyek Selesai" },
  { value: 30, suffix: "+", label: "Klien Puas" },
  { value: 3, suffix: " Thn", label: "Pengalaman Industri" },
  { value: 99, suffix: "%", label: "Tingkat Kepuasan" },
]// 4. DAFTAR LAYANAN & PAKET HARGA (SERVICES & PRICING)
export const SERVICES: Service[] = [
  {
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
  },
  {
    id: "ai-media-lab",
    slug: "ai-media-lab",
    title: "AI Media Lab",
    shortTitle: "AI Media Lab",
    icon: "sparkles",
    logo: "/Media-Lab.avif",
    description:
      "Manfaatkan teknologi AI terkini untuk memproduksi iklan video, visual branding, dan konten pemasaran berkualitas sinematik yang menghemat biaya produksi.",
    shortDescription: "AI Video Ads, Visual Branding, & Marketing Content",
    color: "hsl(280, 90%, 60%)",
    gradient: "from-purple-500 via-pink-500 to-rose-500",
    targetAudience: [
      {
        title: "Brand Owner",
        description: "Pemilik brand e-commerce & marketer yang membutuhkan puluhan materi visual promosi variatif setiap bulan.",
        icon: "ShoppingBag",
        image: "/image/Brand-Owner.avif",
        badge: "Visual Brand",
      },
      {
        title: "Advertiser",
        description: "Pengiklan digital yang membutuhkan konten video cepat untuk kampanye ads.",
        icon: "Video",
        image: "/image/Advertiser.avif",
        badge: "Produksi Masal Iklan",
      },
      {
        title: "Content Creator",
        description: "Kreator konten yang ingin memproduksi konten video sinematik dengan narator & efek AI.",
        icon: "Sparkles",
        image: "/image/Media Company.avif",
        badge: "Kreativitas AI",
      },
      {
        title: "Influencer",
        description: "Influencer yang ingin meningkatkan kualitas visual konten tanpa studio mahal.",
        icon: "Share2",
        image: "/image/personal-barending.avif",
        badge: "Visual Premium",
      },
      {
        title: "Agensi Digital",
        description: "Agensi yang memperluas layanan pembuatan video promosi untuk klien secara efisien.",
        icon: "Megaphone",
        image: "/image/Agensi-Digital.avif",
        badge: "White-Label Solution",
      },
      {
        title: "Media Company",
        description: "Perusahaan media yang membutuhkan produksi konten visual skala besar.",
        icon: "Share2",
        image: "/image/Media Company.avif",
        badge: "Media Skala Besar",
      },
      {
        title: "Corporate",
        description: "Perusahaan yang membutuhkan video edukasi & materi branding profesional.",
        icon: "Building2",
        image: "/image/Korporasi.avif",
        badge: "Video Korporat",
      },
      {
        title: "Public Relations",
        description: "Tim PR yang membutuhkan avatar AI pembicara & rilis pers visual.",
        icon: "Megaphone",
        image: "/image/Public-Relations.avif",
        badge: "Avatar AI",
      },
    ],
    problemsAndSolutions: [
      {
        problemTitle: "Biaya Produksi Video Iklan Sangat Mahal",
        problemDescription: "Sewa studio, kru produksi, talent, dan video editor profesional memakan biaya hingga puluhan juta rupiah sekali syuting.",
        solutionTitle: "Generatif AI Video & Visual 4K",
        solutionDescription: "Menghasilkan video promo sinematik dan foto produk berkualitas studio dengan efisiensi biaya hingga 70%.",
      },
      {
        problemTitle: "Waktu Pembuatan Konten Terlalu Lama",
        problemDescription: "Proses syuting hingga editing butuh 1-2 minggu, membuat Anda sering ketinggalan tren viral di sosial media.",
        solutionTitle: "Alur Kerja AI Ultra Cepat",
        solutionDescription: "Video iklan dan aset visual siap rilis diproduksi hanya dalam hitungan jam dengan beberapa kali penyesuaian.",
      },
      {
        problemTitle: "Iklan Membosankan & Di-Skip Audiens",
        problemDescription: "Konten biasa tanpa 'hook' visual yang kuat dilewati audiens dalam 2 detik pertama di TikTok/Instagram.",
        solutionTitle: "Formulasi Psikologi Hook AI & Avatar Realistis",
        solutionDescription: "Menggabungkan visual AI photorealistic, avatar hiper-realistis, dan narasi suara emosional yang menghentikan scroll pembeli.",
      },
      {
        problemTitle: "Visual Branding Tidak Konsisten",
        problemDescription: "Hasil desain dari sumber berbeda membuat identitas visual brand tampak acak dan merusak persepsi profesionalisme.",
        solutionTitle: "AI Visual Branding Systems",
        solutionDescription: "Sistem aset visual terstandarisasi yang memastikan setiap materi promosi tetap sesuai dengan pedoman brand Anda.",
      },
    ],
    keyBenefits: [
      {
        title: "Efisiensi Anggaran Produksi",
        description: "Pangkas biaya produksi studio & talent tanpa mengorbankan kualitas visual sinematik.",
        stat: "70% More Affordable",
      },
      {
        title: "Kecepatan Peluncuran Kampanye",
        description: "Uji coba puluhan variasi video iklan secara bersamaan untuk menemukan materi iklan terbaik (Winning Creative).",
        stat: "10x Faster R&D",
      },
      {
        title: "Resolusi Visual & Audio Premium",
        description: "Output video beresolusi 4K ultra-sharp disertai pengisi suara AI bersuara alami & profesional.",
        stat: "4K HDR Quality",
      },
    ],
    features: [
      {
        title: "Iklan Video Berbasis AI",
        description:
          "Video promosi produk sinematik diproduksi lebih cepat menggunakan teknologi generatif AI.",
      },
      {
        title: "Visual Branding AI",
        description:
          "Desain identitas visual, panduan logo, dan aset branding berbasis AI mutakhir.",
      },
      {
        title: "Otomatisasi Konten Pemasaran",
        description:
          "Produksi masal materi promosi untuk media sosial dan kampanye iklan digital.",
      },
      {
        title: "Narator & Avatar AI Realistis",
        description:
          "Suara narator profesional dan avatar digital realistis untuk video promosi produk.",
      },
      {
        title: "Peningkatan Kualitas Visual AI",
        description:
          "Peningkatan resolusi gambar dan penyuntingan visual otomatis berbasis AI.",
      },
      {
        title: "Produksi Konten Skala Besar",
        description:
          "Menghasilkan puluhan materi iklan sekaligus dengan alur kerja template otomatis.",
      },
    ],
    pricing: [
      {
        name: "Dasar (Basic)",
        price: "3 Juta",
        description: "Solusi praktis untuk kebutuhan konten promosi produk sederhana",
        features: [
          "5 Video Iklan AI (Durasi 30-60 detik)",
          "10 Desain Sampul (Thumbnail)",
          "Narasi Suara AI (Voice Over)",
          "2x Revisi per Konten",
          "Format Siap Upload MP4 / WebM",
        ],
      },
      {
        name: "Kreator (Creator)",
        price: "10 Juta",
        description: "Paket lengkap produksi rutin untuk kreator & pemilik brand",
        features: [
          "15 Video AI Sinematik (Hingga 3 menit)",
          "30 Desain Thumbnail Menarik",
          "Narasi Suara AI Premium",
          "Avatar Digital AI Custom",
          "5x Revisi per Konten",
          "Paket Aset Media Sosial",
          "Kalender Konten Bulanan",
        ],
        popular: true,
      },
      {
        name: "Agensi (Agency)",
        price: "25 Juta+",
        description: "Solusi produksi konten komprehensif untuk korporasi & agensi",
        features: [
          "Produksi Video AI Tanpa Batas",
          "Sistem Otomatisasi AI Custom",
          "Pelatihan Karakter Suara Brand",
          "Alur Kerja Konten Otomatis",
          "Revisi Tanpa Batas",
          "Manajer Akun Khusus",
          "Akses API Langsung",
          "Opsi Label Putih (White-label)",
        ],
      },
    ],
  },
  {
    id: "system-lab",
    slug: "system-lab",
    title: "System Lab",
    shortTitle: "System Lab",
    icon: "cpu",
    logo: "/System-Lab.avif",
    description:
      "Kami membangun sistem kasir POS, platform SaaS khusus, dan infrastruktur DevOps teruji untuk mengotomatisasi operasional bisnis Anda.",
    shortDescription: "POS, Custom SaaS, & DevOps Infrastructure",
    color: "hsl(160, 90%, 45%)",
    gradient: "from-emerald-500 via-green-500 to-lime-500",
    targetAudience: [
      {
        title: "Toko Retail",
        description: "Toko ritel yang memerlukan kasir POS cloud & integrasi stok barang otomatis.",
        icon: "Store",
        image: "/image/toko-reateil.avif",
        badge: "Kasir POS Cloud",
      },
      {
        title: "Chain F&B",
        description: "Bisnis kuliner multi-cabang yang membutuhkan rekap transaksi real-time.",
        icon: "Store",
        image: "/image/chain-f&b.avif",
        badge: "Multi-Cabang F&B",
      },
      {
        title: "Perusahaan Logistik",
        description: "Bisnis pengiriman yang membutuhkan dasbor pengawasan real-time & pelacakan.",
        icon: "Truck",
        image: "/image/Perusahaan-Logistik.avif",
        badge: "Pelacakan Real-Time",
      },
      {
        title: "Manufaktur",
        description: "Pabrik & manufaktur yang membutuhkan manajemen persediaan & otomatisasi stok.",
        icon: "Server",
        image: "/image/Manufaktur.avif",
        badge: "Otomatisasi Stok",
      },
      {
        title: "Founder SaaS",
        description: "Wirausahawan teknologi yang membutuhkan mitra untuk membangun platform SaaS.",
        icon: "Cpu",
        image: "/image/startup.avif",
        badge: "Platform Custom SaaS",
      },
      {
        title: "Tech Startup",
        description: "Startup teknologi yang membutuhkan arsitektur backend & API tangguh.",
        icon: "Cpu",
        image: "/image/startup.avif",
        badge: "Arsitektur Tangguh",
      },
      {
        title: "Korporasi",
        description: "Perusahaan skala besar yang ingin modernisasi sistem lama (legacy system).",
        icon: "Building2",
        image: "/image/Korporasi.avif",
        badge: "Modernisasi Sistem",
      },
      {
        title: "Bisnis Menengah",
        description: "Perusahaan berkembang yang memerlukan arsitektur server Cloud DevOps tangguh.",
        icon: "Server",
        image: "/image/prusahaan-b2b.avif",
        badge: "Cloud DevOps 99.9%",
      },
    ],
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
        description:
          "Sistem kasir toko/restoran terintegrasi dengan pemantauan stok barang secara real-time.",
      },
      {
        title: "Pengembangan Platform SaaS Custom",
        description:
          "Pengembangan aplikasi Software-as-a-Service bertaraf perusahaan dari nol.",
      },
      {
        title: "Infrastruktur Server & DevOps",
        description:
          "Pemasangan alur CI/CD, peluncuran cloud server, pemantauan & skalabilitas sistem.",
      },
      {
        title: "Otomatisasi Alur Kerja Bisnis",
        description:
          "Mengotomatiskan proses bisnis berulang untuk efisiensi biaya operasional.",
      },
      {
        title: "Integrasi API & Layanan Pihak Ketiga",
        description:
          "Menghubungkan pembayaran otomatis, WhatsApp API, pengiriman ekspedisi & e-commerce.",
      },
      {
        title: "Dasbor Analitik Real-Time",
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
  },
];

// 5. PORTOFOLIO / HASIL KARYA PROYEK
export const PORTFOLIO: PortfolioItem[] = [
  {
    id: "1",
    title: "Platform E-Commerce Busana Modern",
    slug: "ecommerce-fashion",
    category: "web-studio",
    description:
      "Platform e-commerce busana modern dengan fitur uji coba pakaian AR, daftar keinginan, dan pembayaran otomatis. Dibangun dengan Next.js & Supabase.",
    thumbnailUrl: "/portfolio/ecommerce-fashion.jpg",
    videoUrl: "/bc.mp4",
    techStack: ["Next.js", "Supabase", "Tailwind CSS", "Stripe"],
    isFeatured: true,
  },
  {
    id: "2",
    title: "Pembuat Video Iklan AI Otomatis",
    slug: "ai-product-video",
    category: "ai-media-lab",
    description:
      "Alat AI yang mengubah foto produk menjadi video promosi profesional dalam hitungan menit. Telah digunakan oleh 50+ brand ternama.",
    thumbnailUrl: "/portfolio/ai-product-video.jpg",
    videoUrl: "/bc.mp4",
    techStack: ["Python", "Stable Diffusion", "FFmpeg", "React"],
    isFeatured: true,
  },
  {
    id: "3",
    title: "Sistem Manajemen Restoran & Kasir",
    slug: "restaurant-system",
    category: "system-lab",
    description:
      "Sistem manajemen restoran terpadu — kasir POS, stok bahan baku, layar dapur, dan laporan keuangan terintegrasi online.",
    thumbnailUrl: "/portfolio/restaurant-system.jpg",
    videoUrl: "/bc.mp4",
    techStack: ["Next.js", "PostgreSQL", "Node.js", "WebSocket"],
    isFeatured: true,
  },
  {
    id: "4",
    title: "Pembaruan Website Perusahaan Korporat",
    slug: "corporate-redesign",
    category: "web-studio",
    description:
      "Pembaruan total website korporat dengan fokus pencitraan merek premium, animasi halus, dan peningkatan kunjungan Google hingga 300%.",
    thumbnailUrl: "/portfolio/corporate-redesign.jpg",
    videoUrl: "/bc.mp4",
    techStack: ["Next.js", "Framer Motion", "Tailwind CSS"],
    isFeatured: false,
  },
  {
    id: "5",
    title: "Mesin Produksi Konten Media Sosial AI",
    slug: "social-media-engine",
    category: "ai-media-lab",
    description:
      "Alur otomatisasi konten media sosial — dari naskah, desain visual, hingga render video akhir. Memproduksi 100+ konten per bulan.",
    thumbnailUrl: "/portfolio/social-media-engine.jpg",
    videoUrl: "/bc.mp4",
    techStack: ["GPT-4", "Runway ML", "Python", "Next.js"],
    isFeatured: true,
  },
  {
    id: "6",
    title: "Dasbor Pemantauan Pengiriman Ekspedisi",
    slug: "logistics-dashboard",
    category: "system-lab",
    description:
      "Dasbor pemantauan kurir real-time, manajemen armada pengiriman, dan peta interaktif analitik kinerja logistik.",
    thumbnailUrl: "/portfolio/logistics-dashboard.jpg",
    videoUrl: "/bc.mp4",
    techStack: ["React", "MapboxGL", "Node.js", "PostgreSQL"],
    isFeatured: true,
  },
  {
    id: "7",
    title: "Landing Page Startup Teknologi",
    slug: "startup-landing",
    category: "web-studio",
    description:
      "Landing page konversi tinggi untuk perusahaan keuangan fintech dilengkapi dengan kalkulator simulasi dan animasi 3D.",
    thumbnailUrl: "/portfolio/startup-landing.jpg",
    videoUrl: "/bc.mp4",
    techStack: ["Next.js", "Three.js", "GSAP", "Supabase"],
    isFeatured: false,
  },
  {
    id: "8",
    title: "Sistem Manajemen Kepegawaian (HRIS)",
    slug: "hr-management",
    category: "system-lab",
    description:
      "Sistem kepegawaian terpadu — absensi online, penggajian otomatis, penilaian kinerja, dan perekrutan karyawan perusahaan.",
    thumbnailUrl: "/portfolio/hr-management.jpg",
    videoUrl: "/bc.mp4",
    techStack: ["Next.js", "PostgreSQL", "Drizzle ORM", "Redis"],
    isFeatured: false,
  },
];

// 6. TESTIMONI KLIEN
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    clientName: "Ahmad Rizky",
    companyOrRole: "Direktur Utama, TechVenture Indonesia",
    avatarUrl: "/testimonials/avatar-1.jpg",
    content:
      "Artificial Ripe benar-benar mengubah cara operasional perusahaan kami. Sistem yang mereka bangun meningkatkan efisiensi tim hingga 60%. Sangat direkomendasikan!",
    rating: 5,
  },
  {
    id: "2",
    clientName: "Sarah Putri",
    companyOrRole: "Direktur Pemasaran, FashionHub",
    avatarUrl: "/testimonials/avatar-2.jpg",
    content:
      "Website e-commerce yang dibuat sangat memukau! Penjualan kami meningkat 45% sejak diluncurkan. Timnya sangat profesional dan cepat tanggap.",
    rating: 5,
  },
  {
    id: "3",
    clientName: "Budi Santoso",
    companyOrRole: "Pendiri, ContentFirst",
    avatarUrl: "/testimonials/avatar-3.jpg",
    content:
      "Layanan AI Media Lab mereka luar biasa. Kami bisa memproduksi 10x lebih banyak konten promosi dengan anggaran yang sama!",
    rating: 5,
  },
  {
    id: "4",
    clientName: "Diana Kusuma",
    companyOrRole: "Kepala Operasional, LogisTech",
    avatarUrl: "/testimonials/avatar-4.jpg",
    content:
      "Dasbor pemantauan yang dibangun sangat mudah digunakan dan akurat secara real-time. Tim kami kini dapat memantau seluruh armada dari satu layar.",
    rating: 4,
  },
  {
    id: "5",
    clientName: "Reza Firmansyah",
    companyOrRole: "Direktur Teknologi, StartupXYZ",
    avatarUrl: "/testimonials/avatar-5.jpg",
    content:
      "Kualitas struktur kode yang dibangun sangat rapi dan mudah dikembangkan di masa depan. Mereka adalah mitra teknologi terbaik kami.",
    rating: 5,
  },
];

// 7. KEUNGGULAN ARTIFICIAL RIPE (WHY CHOOSE US)
export const WHY_CHOOSE_US: WhyChooseUsItem[] = [
  {
    icon: "zap",
    title: "Teknologi Terdepan",
    description:
      "Kami menggunakan kombinasi Next.js, AI mutakhir, dan infrastruktur cloud terpercaya untuk hasil terbaik.",
  },
  {
    icon: "shield",
    title: "Kualitas Terjamin",
    description:
      "Setiap proyek melalui pengujian kualitas ketat dan penjaminan mutu sebelum diserahterimakan.",
  },
  {
    icon: "clock",
    title: "Tepat Waktu",
    description:
      "Kami berkomitmen pada tenggat waktu yang disepakati dengan laporan perkembangan berkala.",
  },
  {
    icon: "headphones",
    title: "Dukungan Berkelanjutan",
    description:
      "Dukungan purnajual dan perawatan berkala untuk memastikan sistem Anda selalu berjalan lancar.",
  },
  {
    icon: "trending-up",
    title: "Fokus Pada Hasil & ROI Nyata",
    description:
      "Setiap solusi dirancang khusus untuk memberikan hasil pertumbuhan bisnis yang nyata dan terukur.",
  },
  {
    icon: "users",
    title: "Tim Ahli Berpengalaman",
    description:
      "Dikerjakan oleh tim pengembang web, perancang visual, dan spesialis AI berpengalaman di industri.",
  },
];
