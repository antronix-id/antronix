"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/shared/section-header";
import { PortfolioCard } from "@/components/features/portfolio-card";
import { VideoLightbox } from "@/components/features/video-lightbox";
import { AnimatedBackground } from "@/components/animations/animated-background";
import { PORTFOLIO } from "@/lib/constants";
import type { PortfolioItem } from "@/lib/constants";
import { cn } from "@/lib/utils";

const FILTERS = [
  { id: "all", label: "Semua Proyek" },
  { id: "web-studio", label: "Web Studio" },
  { id: "system-lab", label: "System Lab" },
] as const;

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null);

  const filteredPortfolio =
    activeFilter === "all"
      ? PORTFOLIO
      : PORTFOLIO.filter((item) => item.category === activeFilter);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-24 sm:pt-32 pb-16 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-6xl text-foreground">
              Portofolio <span className="gradient-text">Antronix</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Jelajahi koleksi proyek yang telah kami bangun, untuk berbagai klien di seluruh Indonesia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-10">
          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 sm:mb-12 flex flex-col sm:flex-row items-center justify-center gap-2.5 w-full max-w-xs sm:max-w-none mx-auto"
          >
            {FILTERS.map((filter) => {
              const isActive = activeFilter === filter.id;
              return (
                <div key={filter.id} className="w-full sm:w-auto flex justify-center">
                  <Button
                    variant={isActive ? "default" : "outline"}
                    onClick={() => setActiveFilter(filter.id)}
                    className="w-full sm:w-auto"
                  >
                    <span className="whitespace-nowrap">{filter.label}</span>
                  </Button>
                </div>
              );
            })}
          </motion.div>



          {/* Portfolio Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16"
            >
              {filteredPortfolio.map((item, index) => (
                <PortfolioCard
                  key={item.id}
                  item={item}
                  index={index}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredPortfolio.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-muted-foreground">
                Belum ada proyek untuk kategori ini.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
