"use client";

import { SectionHeader } from "@/components/layout/section-header";
import type { ProblemSolution, Service } from "@/types";
import { CardStack, type CardStackItem } from "@/components/ui/card-stack";

interface ProblemSolutionSectionProps {
  problemsAndSolutions?: ProblemSolution[];
  serviceTitle?: string;
  badgeText?: string;
  glowColor?: string;
  services?: Service[];
}

/**
 * 10 Masalah / Tantangan Bisnis Utama (m1 - m10)
 * Dipasangkan langsung dengan aset visual di public/problem/m1.avif - m10.avif
 */
export const BUSINESS_PROBLEMS_M1_M10: CardStackItem[] = [
  {
    id: "m1",
    title: "Krisis Kredibilitas dan Reputasi",
    description:
      "Publik atau calon pelanggan modern selalu mencari informasi di internet terlebih dahulu. Tidak adanya kehadiran digital—atau memiliki website yang rusak dan usang—membuat entitas terlihat tidak profesional, tidak kompeten, dan sulit dipercaya.",
    imageSrc: "/problem/m1.avif",
    tag: "Kredibilitas",
  },
  {
    id: "m2",
    title: "Kalah Cepat dari Kompetitor",
    description:
      "Saat informasi bisnis Anda sulit dicari atau layanan Anda sulit diakses secara digital, audiens akan langsung beralih ke kompetitor yang menawarkan kemudahan transaksi dan transparansi informasi di genggaman mereka.",
    imageSrc: "/problem/m2.avif",
    tag: "Daya Saing",
  },
  {
    id: "m3",
    title: "Biaya Operasional yang Tinggi dan Inefisien",
    description:
      "Ketergantungan pada proses manual menghabiskan anggaran besar untuk tenaga kerja, kertas, dan ruang penyimpanan fisik, yang memicu lambatnya proses administratif yang seharusnya bisa diotomatisasi.",
    imageSrc: "/problem/m3.avif",
    tag: "Efisiensi Biaya",
  },
  {
    id: "m4",
    title: "Rentan Kehilangan Data dan Human Error",
    description:
      "Sistem pencatatan manual sangat rawan terhadap kesalahan input, dokumen terselip, atau bahkan kehilangan data penting secara permanen akibat bencana (seperti banjir atau kebakaran) karena tidak ada cadangan (backup) cloud.",
    imageSrc: "/problem/m4.avif",
    tag: "Keamanan Data",
  },
  {
    id: "m5",
    title: "Jangkauan Pasar dan Audiens Terbatas",
    description:
      "Tanpa website atau ekosistem pencarian organik (SEO), bisnis mengisolasi diri hanya pada pasar lokal atau pemasaran tradisional, membuang potensi untuk menjangkau audiens di skala nasional maupun global.",
    imageSrc: "/problem/m5.avif",
    tag: "Ekspansi Pasar",
  },
  {
    id: "m6",
    title: "Pelayanan Lambat yang Memicu Ketidakpuasan",
    description:
      "Tanpa portal digital mandiri (aplikasi/website), masyarakat atau pelanggan dipaksa hadir secara fisik, mengambil nomor antrean, dan menunggu lama, sehingga menciptakan bottleneck (leher botol) pelayanan yang memicu keluhan.",
    imageSrc: "/problem/m6.avif",
    tag: "Layanan Pelanggan",
  },
  {
    id: "m7",
    title: "Komunikasi Layanan yang Bebani Staf",
    description:
      "Informasi dasar seperti jam operasional, harga, atau syarat administrasi menjadi sulit diakses. Hal ini memaksa staf menghabiskan waktu setiap hari hanya untuk menjawab pertanyaan berulang secara manual melalui telepon atau pesan singkat.",
    imageSrc: "/problem/m7.avif",
    tag: "Otomatisasi Staf",
  },
  {
    id: "m8",
    title: "Pengambilan Keputusan Bisnis Lambat",
    description:
      "Tanpa sistem digital terintegrasi yang menyediakan data dan analitik secara real-time, manajemen harus menunggu laporan manual disusun berhari-hari, membuat mereka terlambat merespons tren pasar atau krisis operasional.",
    imageSrc: "/problem/m8.avif",
    tag: "Real-Time Analitik",
  },
  {
    id: "m9",
    title: "Kegagalan Membangun Loyalitas Jangka Panjang",
    description:
      "Tanpa aplikasi, bisnis kehilangan akses komunikasi langsung dan eksklusif dengan pengguna. Program retensi pelanggan (seperti poin loyalitas atau promo personal) menjadi sulit dieksekusi secara mulus.",
    imageSrc: "/problem/m9.avif",
    tag: "Retensi Pelanggan",
  },
  {
    id: "m10",
    title: "Gesekan Transaksi (Friction) yang Tinggi",
    description:
      "Untuk layanan berulang, ketiadaan aplikasi memaksa pengguna melewati banyak langkah (seperti mencari situs di browser atau memasukkan data berulang kali) yang sering kali berujung pada pembatalan niat transaksi (drop-off).",
    imageSrc: "/problem/m10.avif",
    tag: "Konversi Transaksi",
  },
];

/**
 * Section "Tantangan Bisnis":
 * Menggabungkan tantangan/masalah operasional bisnis m1 - m10
 * dalam tampilan 3D Card Stack (Fanned Cards) interaktif dengan gambar dari public/problem.
 */
export function ProblemSolutionSection({
  problemsAndSolutions,
  serviceTitle,
  badgeText = "Tantangan Bisnis",
  glowColor = "#3b82f6",
}: ProblemSolutionSectionProps = {}) {
  // Gunakan data m1 - m10 sebagai default, atau custom problems jika diberikan secara spesifik
  const stackItems: CardStackItem[] = problemsAndSolutions
    ? problemsAndSolutions.map((p, index) => ({
        id: `problem-${index}`,
        title: p.problemTitle,
        description: p.problemDescription,
        tag: serviceTitle || "Tantangan",
        imageSrc: BUSINESS_PROBLEMS_M1_M10[index % BUSINESS_PROBLEMS_M1_M10.length].imageSrc,
      }))
    : BUSINESS_PROBLEMS_M1_M10;

  return (
    <section id="problem-solution" className="relative py-16 sm:py-24 overflow-hidden">
      {/* Background Subtle Ambient Light */}
      <div
        className="pointer-events-none absolute right-1/4 top-1/4 h-[400px] w-[600px] rounded-full opacity-[0.08] blur-[150px] transition-colors duration-700"
        style={{ backgroundColor: glowColor }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          badge={badgeText}
          title="Tantangan Bisnis &"
          titleHighlight="Kendala Operasional"
          description="Berbagai kendala kritis pada performa website dan sistem operasional yang kerap menghambat pertumbuhan bisnis Anda."
        />

        {/* 3D FANNED CARD STACK CONTAINER */}
        <div className="mt-12 sm:mt-16">
          <CardStack
            items={stackItems}
            initialIndex={0}
            cardWidth={560}
            cardHeight={350}
            overlap={0.48}
            spreadDeg={46}
            depthPx={140}
            perspectivePx={1200}
            autoAdvance
            intervalMs={3500}
            pauseOnHover
            showDots
            showArrows
          />
        </div>
      </div>
    </section>
  );
}

export default ProblemSolutionSection;
