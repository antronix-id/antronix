"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import type { ProblemSolution } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface ProblemSolutionSectionProps {
  problemsAndSolutions: ProblemSolution[];
  serviceTitle?: string;
  badgeText?: string;
  gradient?: string;
  glowColor?: string;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 30 : -30,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 30 : -30,
    opacity: 0,
  }),
};

export function ProblemSolutionSection({
  problemsAndSolutions,
  serviceTitle = "Layanan Kami",
  badgeText = "Masalah & Solusi",
  glowColor = "#3b82f6",
}: ProblemSolutionSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const total = problemsAndSolutions?.length || 0;

  const paginate = useCallback(
    (newDirection: number) => {
      if (total === 0) return;
      setDirection(newDirection);
      setCurrentIndex((prev) => (prev + newDirection + total) % total);
    },
    [total]
  );

  const goToSlide = (index: number) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (isHovered || total <= 1) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 3500);
    return () => clearInterval(timer);
  }, [isHovered, total, paginate]);

  if (!problemsAndSolutions || total === 0) return null;

  const currentItem = problemsAndSolutions[currentIndex];

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background Subtle Ambient Light */}
      <div 
        className="pointer-events-none absolute right-1/4 top-1/4 h-[400px] w-[600px] rounded-full opacity-[0.06] blur-[140px]" 
        style={{ backgroundColor: glowColor }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          badge={badgeText}
          title="Tantangan Bisnis &"
          titleHighlight={`Solusi ${serviceTitle}`}
          description="Bagaimana kami membantu mengatasi kendala operasional dan menghadirkan hasil pertumbuhan yang terukur."
        />

        {/* SLIDER CARD CONTAINER */}
        <div 
          className="mt-12 relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-6 items-stretch"
            >
              {/* LEFT CARD: TANTANGAN (MASALAH) */}
              <div className="group cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:-rotate-1 h-full w-full">
                <div className="text-white rounded-3xl border border-slate-400/30 bg-gradient-to-br from-[#010101] via-[#090909] to-[#010101] shadow-2xl relative backdrop-blur-xl overflow-hidden hover:border-slate-200/60 hover:shadow-slate-300/10 hover:shadow-3xl w-full h-full flex flex-col justify-between p-5 sm:p-8">
                  {/* Background ambient lighting & animated effects */}
                  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-400/10 via-transparent to-white/5 opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                    <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-gradient-to-tr from-slate-300/20 to-transparent blur-3xl opacity-30 group-hover:opacity-50 transform group-hover:scale-110 transition-all duration-700 animate-bounce" />
                    <div className="absolute top-10 left-10 w-16 h-16 rounded-full bg-slate-300/15 blur-xl animate-ping" />
                    <div className="absolute bottom-16 right-16 w-12 h-12 rounded-full bg-white/5 blur-lg animate-ping" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-300/20 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000" />
                  </div>

                  {/* Card Content */}
                  <div className="relative z-10">
                    <div className="flex items-center gap-2.5 mb-6">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-400/15 border border-slate-300/40 text-slate-200 shadow-md">
                        <AlertCircle className="h-4 w-4" />
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                        Tantangan #{currentIndex + 1}
                      </span>
                    </div>

                    <div className="flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-6">
                      <div className="flex-1">
                        <h4 className="text-xl sm:text-2xl font-bold text-white mb-3 leading-snug">
                          {currentItem.problemTitle}
                        </h4>
                        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                          {currentItem.problemDescription}
                        </p>
                      </div>

                      <div className="relative h-24 w-24 sm:h-28 sm:w-28 shrink-0 self-center sm:self-auto">
                        <Image
                          src="/image/masalah.avif"
                          alt="Tantangan Bisnis"
                          width={112}
                          height={112}
                          className="h-full w-full object-contain filter drop-shadow-xl transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Decorative Glass Corners */}
                  <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-slate-300/20 to-transparent rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-slate-300/20 to-transparent rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              </div>

              {/* RIGHT CARD: SOLUSI KAMI */}
              <div className="group cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:rotate-1 h-full w-full">
                <div className="text-white rounded-3xl border border-slate-300/30 bg-gradient-to-br from-[#010101] via-[#090909] to-[#010101] shadow-2xl relative backdrop-blur-xl overflow-hidden hover:border-slate-100/60 hover:shadow-slate-200/10 hover:shadow-3xl w-full h-full flex flex-col justify-between p-5 sm:p-8">

                  {/* Background ambient lighting & animated effects */}
                  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-tr from-zinc-300/10 via-transparent to-white/5 opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                    <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-gradient-to-tr from-zinc-300/20 to-transparent blur-3xl opacity-30 group-hover:opacity-50 transform group-hover:scale-110 transition-all duration-700 animate-bounce" />
                    <div className="absolute top-10 left-10 w-16 h-16 rounded-full bg-zinc-300/15 blur-xl animate-ping" />
                    <div className="absolute bottom-16 right-16 w-12 h-12 rounded-full bg-white/5 blur-lg animate-ping" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000" />
                  </div>

                  {/* Card Content */}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between gap-3 mb-6">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-300/15 border border-slate-200/40 text-slate-100 shadow-md">
                          <CheckCircle2 className="h-4 w-4" />
                        </div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                          Solusi Kami
                        </span>
                      </div>

                      {currentItem.impactBadge && (
                        <span className="rounded-full border border-slate-300/40 bg-slate-400/15 px-3 py-1 text-xs font-semibold text-slate-200 shadow-sm">
                          {currentItem.impactBadge}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-6">
                      <div className="flex-1">
                        <h4 className="text-xl sm:text-2xl font-bold text-white mb-3 leading-snug">
                          {currentItem.solutionTitle}
                        </h4>
                        <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                          {currentItem.solutionDescription}
                        </p>
                      </div>

                      <div className="relative h-24 w-24 sm:h-28 sm:w-28 shrink-0 self-center sm:self-auto">
                        <Image
                          src="/image/solusi.avif"
                          alt="Solusi Kami"
                          width={112}
                          height={112}
                          className="h-full w-full object-contain filter drop-shadow-xl transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Decorative Glass Corners */}
                  <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-slate-200/20 to-transparent rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-slate-200/20 to-transparent rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* SLIDER DOTS INDICATOR AT BOTTOM */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {problemsAndSolutions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                  idx === currentIndex ? "w-8 bg-slate-200 shadow-[0_0_12px_rgba(226,232,240,0.8)]" : "w-2 bg-white/20 hover:bg-white/40"
                )}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

