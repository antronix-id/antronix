"use client";

import React from "react";
import { motion } from "framer-motion";

// --- Types ---
export interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

// --- Data (12 Testimonials for 4 Columns) ---
const testimonials: Testimonial[] = [
  {
    text: "Artificial Ripe benar-benar mengubah cara operasional perusahaan kami. Sistem yang mereka bangun meningkatkan efisiensi tim hingga 60%. Sangat direkomendasikan!",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Ahmad Rizky",
    role: "Direktur Utama, TechVenture",
  },
  {
    text: "Website e-commerce yang dibuat sangat memukau! Penjualan kami meningkat 45% sejak diluncurkan. Timnya sangat profesional dan cepat tanggap.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Sarah Putri",
    role: "Direktur Pemasaran, FashionHub",
  },
  {
    text: "Layanan AI Media Lab mereka luar biasa. Kami bisa memproduksi 10x lebih banyak konten promosi dengan anggaran yang sama!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Budi Santoso",
    role: "Pendiri, ContentFirst",
  },
  {
    text: "Dasbor pemantauan yang dibangun sangat mudah digunakan dan akurat secara real-time. Tim kami kini dapat memantau seluruh armada dari satu layar.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Diana Kusuma",
    role: "Kepala Operasional, LogisTech",
  },
  {
    text: "Kualitas struktur kode yang dibangun sangat rapi dan mudah dikembangkan di masa depan. Mereka adalah mitra teknologi terbaik kami.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Reza Firmansyah",
    role: "CTO, StartupXYZ",
  },
  {
    text: "Pelayanan sangat luar biasa, pengerjaan proyek tepat waktu dengan standar internasional. Hasilnya melebihi ekspektasi tim kami.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Saman Malik",
    role: "Product Lead, GlobalTech",
  },
  {
    text: "Sistem kasir & inventory custom yang dikembangkan sangat membantu operasional multi-cabang kami secara real-time.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Aliza Khan",
    role: "Business Analyst",
  },
  {
    text: "Kecepatan loading website kami meningkat Drastis! Peringkat Google naik ke halaman pertama dalam 2 bulan.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Sana Sheikh",
    role: "Sales Manager",
  },
  {
    text: "Otomatisasi AI Generatif yang diintegrasikan menghemat waktu tim kreatif hingga puluhan jam setiap bulannya.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Hassan Ali",
    role: "Head of Marketing",
  },
  {
    text: "Integrasi API backend yang cepat dan terstruktur membuat aplikasi kami berjalan stabil bagi ratusan ribu penggunanya.",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Kevin Pratama",
    role: "VP Engineering, MobileCore",
  },
  {
    text: "Desain UI/UX yang futuristik dan responsif dari Web Studio membuat brand kami terlihat jauh lebih modern dan tepercaya.",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Nadia Wijaya",
    role: "Brand Strategist, CreativeCo",
  },
  {
    text: "Tim pengembang sangat komunikatif, profesional, dan mampu memberikan solusi atas tantangan bisnis yang paling kompleks.",
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=150&h=150",
    name: "Rian Hidayat",
    role: "Founder, InnovationHub",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);
const fourthColumn = testimonials.slice(9, 12);

// --- Sub-Components ---
const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.ul
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 14,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-transparent transition-colors duration-300 list-none m-0 p-0"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <motion.li 
                  key={`${index}-${i}`}
                  aria-hidden={index === 1 ? "true" : "false"}
                  tabIndex={index === 1 ? -1 : 0}
                  whileHover={{ 
                    scale: 1.02,
                    y: -6,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.3)",
                    transition: { type: "spring", stiffness: 400, damping: 17 }
                  }}
                  whileFocus={{ 
                    scale: 1.02,
                    y: -6,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.3)",
                    transition: { type: "spring", stiffness: 400, damping: 17 }
                  }}
                  className="p-6 sm:p-7 rounded-3xl border border-white/10 shadow-xl w-full bg-slate-900/80 backdrop-blur-xl transition-all duration-300 cursor-default select-none group focus:outline-none focus:ring-2 focus:ring-primary/30" 
                >
                  <blockquote className="m-0 p-0">
                    <p className="text-slate-300 leading-relaxed font-normal text-sm m-0 transition-colors duration-300">
                      &ldquo;{text}&rdquo;
                    </p>
                    <footer className="flex items-center gap-3.5 mt-6">
                      <img
                        width={44}
                        height={44}
                        src={image}
                        alt={`Avatar of ${name}`}
                        className="h-11 w-11 rounded-full object-cover ring-2 ring-white/10 group-hover:ring-cyan-400/50 transition-all duration-300 ease-in-out"
                      />
                      <div className="flex flex-col">
                        <cite className="font-semibold not-italic tracking-tight leading-5 text-white transition-colors duration-300 text-sm">
                          {name}
                        </cite>
                        <span className="text-xs leading-5 tracking-tight text-slate-400 mt-0.5 transition-colors duration-300">
                          {role}
                        </span>
                      </div>
                    </footer>
                  </blockquote>
                </motion.li>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.ul>
    </div>
  );
};

export function TestimonialsSection() {
  return (
    <section 
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="bg-transparent py-20 relative overflow-hidden w-full"
    >
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ 
          duration: 0.8, 
          ease: [0.16, 1, 0.3, 1]
        }}
        className="max-w-7xl px-6 sm:px-8 lg:px-12 z-10 mx-auto w-full"
      >
        <div className="flex flex-col items-center justify-center max-w-[640px] mx-auto mb-14 text-center">
          <h2 id="testimonials-heading" className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-b from-white via-slate-200 to-slate-400 bg-clip-text text-transparent leading-tight">
            Kata Mereka Tentang <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent">Layanan Kami</span>
          </h2>
          <p className="text-center mt-4 text-slate-400 text-base md:text-lg leading-relaxed max-w-lg">
            Kepercayaan dan kepuasan klien adalah pencapaian terbesar bagi perusahaan kami.
          </p>
        </div>

        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 mt-6 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[720px] overflow-hidden w-full"
          role="region"
          aria-label="Scrolling Testimonials"
        >
          <TestimonialsColumn testimonials={firstColumn} duration={18} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden sm:block" duration={24} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={20} />
          <TestimonialsColumn testimonials={fourthColumn} className="hidden xl:block" duration={26} />
        </div>
      </motion.div>
    </section>
  );
}

export default TestimonialsSection;

