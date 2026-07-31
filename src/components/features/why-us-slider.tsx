"use client";

import React, { useState, useEffect, useRef } from "react";
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
} from "lucide-react";
import { BorderGlow } from "@/components/animations/border-glow";
import { cn } from "@/lib/utils";

export interface WhyUsItem {
  icon: string | LucideIcon;
  title: string;
  description: string;
}

export interface WhyUsConfig {
  icon: LucideIcon;
  gradient: string;
  glow: string;
  glowBg: string;
  number: string;
}

export const defaultWhyUsConfigs: WhyUsConfig[] = [
  {
    icon: Zap,
    gradient: "from-blue-500 via-cyan-500 to-teal-400",
    glow: "shadow-cyan-500/25",
    glowBg: "from-blue-500/10 to-cyan-500/10",
    number: "01",
  },
  {
    icon: Shield,
    gradient: "from-purple-500 via-indigo-500 to-blue-500",
    glow: "shadow-purple-500/25",
    glowBg: "from-purple-500/10 to-indigo-500/10",
    number: "02",
  },
  {
    icon: Clock,
    gradient: "from-amber-500 via-orange-500 to-yellow-400",
    glow: "shadow-amber-500/25",
    glowBg: "from-amber-500/10 to-orange-500/10",
    number: "03",
  },
  {
    icon: Headphones,
    gradient: "from-emerald-500 via-teal-500 to-green-400",
    glow: "shadow-emerald-500/25",
    glowBg: "from-emerald-500/10 to-teal-500/10",
    number: "04",
  },
  {
    icon: TrendingUp,
    gradient: "from-rose-500 via-pink-500 to-purple-500",
    glow: "shadow-rose-500/25",
    glowBg: "from-rose-500/10 to-pink-500/10",
    number: "05",
  },
  {
    icon: Users,
    gradient: "from-fuchsia-500 via-purple-500 to-violet-500",
    glow: "shadow-fuchsia-500/25",
    glowBg: "from-fuchsia-500/10 to-purple-500/10",
    number: "06",
  },
];

interface WhyUsSliderProps {
  items: WhyUsItem[];
  configs?: WhyUsConfig[];
  autoPlayInterval?: number;
}

export function WhyUsSlider({
  items,
  configs = defaultWhyUsConfigs,
  autoPlayInterval = 4000,
}: WhyUsSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  // Responsive items count calculation
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, items.length - visibleCount);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Auto-play timer
  useEffect(() => {
    if (isHovered || maxIndex === 0) return;
    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [currentIndex, isHovered, maxIndex, autoPlayInterval]);

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  return (
    <div
      className="relative w-full overflow-hidden py-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slider Controls Header / Navigation Buttons */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/20">
            Swipe or Navigate
          </span>
          <span className="text-xs text-muted-foreground hidden sm:inline">
            ({currentIndex + 1} - {Math.min(currentIndex + visibleCount, items.length)} dari {items.length} Alasan)
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/10 text-white transition-all hover:bg-slate-800 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20 active:scale-95"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/10 text-white transition-all hover:bg-slate-800 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20 active:scale-95"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Slider Viewport & Track */}
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-6"
          animate={{
            x: `-${currentIndex * (100 / visibleCount + (6 * (visibleCount - 1)) / (visibleCount * 16))}%`,
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            transform: `translateX(-${(currentIndex * 100) / visibleCount}%)`,
          }}
        >
          {items.map((item, index) => {
            const config = configs[index % configs.length];
            const IconComponent =
              typeof item.icon === "function" ? item.icon : config.icon;

            return (
              <div
                key={item.title + index}
                className={cn(
                  "shrink-0 transition-all duration-300",
                  visibleCount === 1 && "w-full",
                  visibleCount === 2 && "w-[calc(50%-12px)]",
                  visibleCount === 3 && "w-[calc(33.333%-16px)]"
                )}
              >
                <BorderGlow className="group h-full transition-all duration-300 overflow-hidden">
                  <div className="relative p-7 min-h-[280px] h-full flex flex-col justify-between overflow-hidden rounded-[24px] bg-slate-950/70 backdrop-blur-xl border border-white/10 transition-all duration-300 group-hover:border-white/25 group-hover:shadow-2xl group-hover:shadow-cyan-500/10">
                    {/* Background gradient overlay on hover */}
                    <div
                      className={cn(
                        "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                        config.glowBg
                      )}
                    />

                    {/* Number Watermark */}
                    <span className="absolute top-5 right-6 text-3xl font-black tracking-tight text-white/10 group-hover:text-white/30 transition-colors select-none">
                      {config.number}
                    </span>

                    <div className="relative z-10">
                      {/* Glowing Icon Badge */}
                      <div className="mb-6 relative flex items-center">
                        <div
                          className={cn(
                            "flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg transition-transform duration-300 group-hover:scale-110",
                            config.gradient,
                            config.glow
                          )}
                        >
                          <IconComponent className="h-6 w-6 text-white filter drop-shadow" />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="mb-3 text-lg font-bold tracking-tight text-white transition-colors group-hover:text-cyan-200">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </BorderGlow>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Pagination Dots */}
      <div className="mt-8 flex items-center justify-center gap-2">
        {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={cn(
              "h-2.5 rounded-full transition-all duration-300",
              idx === currentIndex
                ? "w-8 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-md shadow-cyan-500/30"
                : "w-2.5 bg-white/20 hover:bg-white/40"
            )}
          />
        ))}
      </div>
    </div>
  );
}
