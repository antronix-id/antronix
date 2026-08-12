import type { Service } from "@/types/agency";

export const MEDIA_LAB_SERVICE: Service = {
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
};
