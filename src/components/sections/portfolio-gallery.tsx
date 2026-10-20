"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PortfolioCard } from "@/components/sections/portfolio-card";
import type { PortfolioItem } from "@/types";

const FILTERS = [
  { id: "all", label: "Semua Proyek" },
  { id: "web-studio", label: "Web Studio" },
  { id: "system-lab", label: "System Lab" },
] as const;

/**
 * Tab filter + grid proyek. Satu-satunya bagian halaman portofolio yang punya
 * state, sehingga data proyek masuk lewat prop dari Server Component.
 */
export function PortfolioGallery({ items }: { items: PortfolioItem[] }) {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredPortfolio =
    activeFilter === "all"
      ? items
      : items.filter((item) => item.category === activeFilter);

  return (
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
  );
}
