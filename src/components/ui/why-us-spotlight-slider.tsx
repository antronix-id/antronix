"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Zap,
  Shield,
  Clock,
  Headphones,
  TrendingUp,
  Users,
  LucideIcon,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface SpotlightReasonItem {
  id: number;
  tag: string;
  preheaderText: string;
  icon: LucideIcon;
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix?: string;
  description: string;
  buttonText: string;
  href?: string;
  gradient: string;
  badgeGlow: string;
  image?: string;
  bgAccent: string;
}

export const whyUsSpotlightData: SpotlightReasonItem[] = [
  {
    id: 1,
    tag: "ALASAN #01",
    preheaderText: "Hyper-Performance & AI Tech Stack",
    icon: Zap,
    titlePrefix: "Teknologi Terdepan",
    titleHighlight: "Untuk Akselerasi Masa Depan",
    titleSuffix: "Bisnis Anda",
    description:
      "Kami menggabungkan Next.js, kecerdasan buatan (AI) mutakhir, dan infrastruktur cloud terpercaya untuk memastikan website & sistem Anda berjalan super cepat (<1 Detik Load Time) dan mengonversi pengunjung menjadi pembeli secara presisi.",
    buttonText: "Mulai Akselerasi Bisnis",
    href: "#contact",
    gradient: "from-pink-500 via-rose-500 to-purple-500",
    badgeGlow: "shadow-pink-500/30",
    image: "https://forecaster.biz/wp-content/uploads/2025/06/screener-1536x993.avif",
    bgAccent: "from-pink-500/10 via-purple-500/5 to-transparent",
  },
  {
    id: 2,
    tag: "ALASAN #02",
    preheaderText: "Enterprise Standard Quality Audit",
    icon: Shield,
    titlePrefix: "Kualitas Terjamin",
    titleHighlight: "Dengan Standard Audit 100/100",
    titleSuffix: "",
    description:
      "Setiap proyek melalui pengujian kualitas ketat, penjaminan mutu visual, optimasi Lighthouse 100/100, serta enkripsi proteksi data otomatis sebelum diserahterimakan ke bisnis Anda.",
    buttonText: "Pelajari Standar Kualitas",
    href: "#services",
    gradient: "from-purple-400 via-indigo-500 to-cyan-500",
    badgeGlow: "shadow-purple-500/30",
    image: "https://forecaster.biz/wp-content/uploads/2025/06/screener-1536x993.avif",
    bgAccent: "from-purple-500/10 via-cyan-500/5 to-transparent",
  },
  {
    id: 3,
    tag: "ALASAN #03",
    preheaderText: "Ultra-Fast Speed to Market",
    icon: Clock,
    titlePrefix: "Tepat Waktu & Eksekusi",
    titleHighlight: "3x Lebih Cepat",
    titleSuffix: "Dari Agency Konvensional",
    description:
      "Kami sangat menghargai momentum bisnis Anda. Dengan alur kerja AI-driven, pembuatan landing page, materi iklan video sinematik, dan software custom diselesaikan dalam hitungan hari, bukan bulanan.",
    buttonText: "Konsultasi Proyek Cepat",
    href: "#contact",
    gradient: "from-amber-400 via-orange-500 to-rose-500",
    badgeGlow: "shadow-amber-500/30",
    image: "https://forecaster.biz/wp-content/uploads/2025/06/screener-1536x993.avif",
    bgAccent: "from-amber-500/10 via-orange-500/5 to-transparent",
  },
  {
    id: 4,
    tag: "ALASAN #04",
    preheaderText: "Plug-and-Play Tech Department",
    icon: Headphones,
    titlePrefix: "Dukungan Berkelanjutan",
    titleHighlight: "& Server Reliability 99.99%",
    titleSuffix: "",
    description:
      "Dukungan purnajual prioritas tinggi, maintenance cloud server 24/7, serta perbaikan proaktif untuk memastikan seluruh sistem web & software bisnis Anda berjalan tanpa hambatan.",
    buttonText: "Hubungi Tim Support",
    href: "#contact",
    gradient: "from-emerald-400 via-teal-500 to-cyan-500",
    badgeGlow: "shadow-emerald-500/30",
    image: "https://forecaster.biz/wp-content/uploads/2025/06/screener-1536x993.avif",
    bgAccent: "from-emerald-500/10 via-teal-500/5 to-transparent",
  },
  {
    id: 5,
    tag: "ALASAN #05",
    preheaderText: "70% Cost Reduction & Exponential ROI",
    icon: TrendingUp,
    titlePrefix: "Fokus Pada Hasil",
    titleHighlight: "& ROI Nyata Pertumbuhan Bisnis",
    titleSuffix: "",
    description:
      "Bukan sekadar estetik visual semata. Setiap strategi kami persiapkan khusus untuk memotong biaya operasional hingga 70%, menaikkan angka konversi pembeli, dan memberikan efisiensi ROI terukur.",
    buttonText: "Hitung Estimasi Paket",
    href: "#pricing",
    gradient: "from-rose-400 via-pink-500 to-purple-500",
    badgeGlow: "shadow-rose-500/30",
    image: "https://forecaster.biz/wp-content/uploads/2025/06/screener-1536x993.avif",
    bgAccent: "from-rose-500/10 via-pink-500/5 to-transparent",
  },
  {
    id: 6,
    tag: "ALASAN #06",
    preheaderText: "Multidisciplinary Software & AI Specialists",
    icon: Users,
    titlePrefix: "Tim Ahli Berpengalaman",
    titleHighlight: "Software Engineer & AI Specialist",
    titleSuffix: "",
    description:
      "Dikerjakan langsung oleh gabungan Prompt Engineer, UI/UX Designer, dan Full-Stack Developer berpengalaman yang siap membawa ekosistem digital perusahaan Anda ke standar tertinggi.",
    buttonText: "Diskusikan Kebutuhan",
    href: "#contact",
    gradient: "from-fuchsia-400 via-purple-500 to-indigo-500",
    badgeGlow: "shadow-fuchsia-500/30",
    image: "https://forecaster.biz/wp-content/uploads/2025/06/screener-1536x993.avif",
    bgAccent: "from-fuchsia-500/10 via-purple-500/5 to-transparent",
  },
];

interface WhyUsSpotlightSliderProps {
  items?: SpotlightReasonItem[];
  autoPlayInterval?: number;
}

export function WhyUsSpotlightSlider({
  items = whyUsSpotlightData,
  autoPlayInterval = 2000,
}: WhyUsSpotlightSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  // Auto-play timer
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(timer);
  }, [currentIndex, isHovered, autoPlayInterval, items.length]);

  const activeItem = items[currentIndex];
  const IconComponent = activeItem.icon;

  const handleButtonClick = (href?: string) => {
    if (!href) return;
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="relative w-full max-w-6xl mx-auto py-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Outer Card Wrapper (Spotlight Frame Style) */}
      <div className="relative rounded-3xl bg-slate-950/80 backdrop-blur-2xl border border-white/15 p-8 md:p-12 overflow-hidden shadow-2xl">
        {/* Dynamic Background Glow Effect */}
        <div
          className={cn(
            "pointer-events-none absolute inset-0 bg-gradient-to-br transition-all duration-700 opacity-60",
            activeItem.bgAccent
          )}
        />
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-cyan-500/10 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-purple-500/10 blur-[100px]" />

        {/* Content Animated Slide Transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10"
          >
            {/* Left Column: Headline, Description */}
            <div className="flex flex-col space-y-6 text-left items-start">
              {/* Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15]">
                {activeItem.titlePrefix}{" "}
                <span
                  className={cn(
                    "bg-gradient-to-r bg-clip-text text-transparent",
                    activeItem.gradient
                  )}
                >
                  {activeItem.titleHighlight}
                </span>{" "}
                {activeItem.titleSuffix}
              </h2>

              {/* Description */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl font-normal">
                {activeItem.description}
              </p>
            </div>

            {/* Right Column: 3D Visual Graphic */}
            <div className="relative w-full min-h-[260px] md:min-h-[340px] flex items-center justify-center">
              {/* Floating 3D Graphic with Ambient Backdrop Glow */}
              <div className="relative flex items-center justify-center w-full h-full">
                {/* Decorative Glowing Rings */}
                <div className="absolute h-64 w-64 rounded-full bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 blur-2xl animate-pulse" />

                {/* 3D Glass Badge Visual Container */}
                <motion.div
                  initial={{ scale: 0.9, rotate: -2 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative z-10 w-full max-w-sm flex items-center justify-center"
                >
                  {activeItem.image ? (
                    <img
                      src={activeItem.image}
                      alt={activeItem.titlePrefix}
                      className="w-full max-w-md object-contain filter drop-shadow-[0_20px_50px_rgba(8,112,184,0.3)] animate-float"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-10 rounded-3xl bg-slate-900/90 border border-white/20 backdrop-blur-2xl shadow-2xl">
                      <div
                        className={cn(
                          "flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br shadow-2xl mb-6",
                          activeItem.gradient,
                          activeItem.badgeGlow
                        )}
                      >
                        <IconComponent className="h-12 w-12 text-white filter drop-shadow" />
                      </div>
                      <span className="text-sm font-semibold tracking-wider text-cyan-300 uppercase">
                        {activeItem.tag}
                      </span>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
