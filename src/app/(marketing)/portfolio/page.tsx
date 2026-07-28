"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/shared/section-header";
import { PortfolioCard } from "@/components/features/portfolio-card";
import { VideoLightbox } from "@/components/features/video-lightbox";
import { AnimatedBackground } from "@/components/react-bits/animated-background";
import { PORTFOLIO } from "@/lib/constants";
import type { PortfolioItem } from "@/lib/constants";
import { cn } from "@/lib/utils";

const FILTERS = [
  { id: "all", label: "Semua Proyek" },
  { id: "web-studio", label: "Web Studio" },
  { id: "ai-media-lab", label: "AI Media Lab" },
  { id: "system-lab", label: "System Lab" },
] as const;

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null);

  const filteredPortfolio =
    activeFilter === "all"
      ? PORTFOLIO
      : PORTFOLIO.filter((p) => p.category === activeFilter);

  return (
    <>
      {/* Hero */}
      <section className="relative flex items-center overflow-hidden py-32 lg:py-40">

        <div className="relative mx-auto max-w-7xl px-6 text-center lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Karya Digital{" "}
            <span className="gradient-text">Terbaik Kami</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
          >
            Jelajahi koleksi proyek yang telah kami bangun untuk berbagai klien
            di seluruh Indonesia.
          </motion.p>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 flex flex-wrap items-center justify-center gap-2"
          >
            {FILTERS.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(filter.id)}
                className={cn(
                  "rounded-full transition-all",
                  activeFilter === filter.id &&
                    "brand-gradient-btn text-white border-0 shadow-lg"
                )}
              >
                {filter.label}
              </Button>
            ))}
          </motion.div>

          {/* Portfolio Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredPortfolio.map((item, index) => (
                <PortfolioCard
                  key={item.id}
                  item={item}
                  index={index}
                  onVideoClick={setLightboxItem}
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

      {/* Video Lightbox */}
      <VideoLightbox
        item={lightboxItem}
        open={!!lightboxItem}
        onClose={() => setLightboxItem(null)}
      />
    </>
  );
}
