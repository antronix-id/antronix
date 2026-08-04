"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { PortfolioItem } from "@/lib/constants";
import { LaptopMockup } from "@/components/mockups/laptop-mockup";
import { LiquidMetalButton } from "@/components/animations/liquid-metal-button";

import { cn } from "@/lib/utils";

interface PortfolioCardProps {
  item: PortfolioItem;
  index: number;
  className?: string;
  onVideoClick?: (item: PortfolioItem) => void;
}

export function PortfolioCard({ item, index, className }: PortfolioCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const displayUrl = item.liveUrl
    ? item.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : `${item.slug || "project"}.artificialripe.com`;
  const targetUrl = item.liveUrl || `https://${displayUrl}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={cn("group", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Laptop Frame Mockup Container */}
      <div className="relative transition-transform duration-300 group-hover:-translate-y-1">
        <LaptopMockup
          url={displayUrl}
          videoSrc={item.videoUrl || "/bc.mp4"}
          src={item.thumbnailUrl}
          isHovered={isHovered}
          className="w-full filter drop-shadow-xl group-hover:drop-shadow-2xl transition-all duration-300"
        />
      </div>

      {/* Info Section Below Thumbnail */}
      <div className="mt-3 flex items-center justify-between gap-3 px-1">
        {/* Left Spacer to keep title centered relative to the button */}
        <div className="w-9 shrink-0" />

        {/* Title */}
        <div className="min-w-0 flex-1 text-center">
          <h3 className="text-sm font-bold text-foreground tracking-tight truncate">
            {item.title}
          </h3>
        </div>

        {/* Visit Web Button */}
        <LiquidMetalButton
          onClick={(e) => {
            e?.stopPropagation();
            window.open(targetUrl, "_blank", "noopener,noreferrer");
          }}
          viewMode="icon"
          className="shrink-0"
          aria-label="Kunjungi website"
        >
          <ArrowUpRight className="h-4 w-4 text-slate-200" />
        </LiquidMetalButton>
      </div>
    </motion.div>
  );
}




