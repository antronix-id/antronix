"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/layout/section-header";
import type { ProblemSolution } from "@/types";
import { cn } from "@/lib/utils";
import { ChallengeCard } from "./challenge-card";
import { SolutionCard } from "./solution-card";

interface ProblemSolutionSectionProps {
  problemsAndSolutions: ProblemSolution[];
  serviceTitle?: string;
  badgeText?: string;
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

/**
 * Slider "Tantangan & Solusi": state slide di sini, markup kartunya di
 * ChallengeCard / SolutionCard.
 */
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
              <ChallengeCard item={currentItem} index={currentIndex} />

              {/* RIGHT CARD: SOLUSI KAMI */}
              <SolutionCard item={currentItem} />
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
