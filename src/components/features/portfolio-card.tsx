"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Play, Users, Heart } from "lucide-react";
import type { PortfolioItem } from "@/lib/constants";
import { cn } from "@/lib/utils";

const statsMap: Record<string, { views: string; likes: string }> = {
  "1": { views: "4.4K", likes: "711" },
  "2": { views: "7.2K", likes: "1.2K" },
  "3": { views: "2.0K", likes: "323" },
  "4": { views: "1.4K", likes: "284" },
  "5": { views: "3.6K", likes: "515" },
  "6": { views: "1.8K", likes: "419" },
  "7": { views: "2.9K", likes: "602" },
  "8": { views: "5.1K", likes: "930" },
  "9": { views: "3.2K", likes: "440" },
};

const categoryGradients: Record<string, string> = {
  "web-studio": "from-blue-600/80 via-cyan-600/60 to-slate-950",
  "ai-media-lab": "from-purple-600/80 via-fuchsia-600/60 to-slate-950",
  "system-lab": "from-emerald-600/80 via-teal-600/60 to-slate-950",
};

const categoryBadgeColor: Record<string, string> = {
  "web-studio": "bg-blue-500/20 text-cyan-300 border-blue-500/40",
  "ai-media-lab": "bg-purple-500/20 text-fuchsia-300 border-purple-500/40",
  "system-lab": "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
};

interface PortfolioCardProps {
  item: PortfolioItem;
  index: number;
  onVideoClick?: (item: PortfolioItem) => void;
}

export function PortfolioCard({ item, index, onVideoClick }: PortfolioCardProps) {
  const stats = statsMap[item.id] || { views: "2.5K", likes: "380" };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group cursor-pointer"
      onClick={() => item.videoUrl && onVideoClick?.(item)}
    >
      {/* Thumbnail Frame */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900/90 shadow-lg transition-all duration-300 group-hover:border-white/25 group-hover:shadow-2xl">
        {/* Visual Canvas Background / Thumbnail Image */}
        <div className={cn("absolute inset-0 bg-gradient-to-br transition-transform duration-500 ease-out group-hover:scale-105", categoryGradients[item.category])}>
          {/* Decorative Mockup Graphics */}
          <div className="absolute inset-0 flex flex-col justify-between p-5 opacity-90">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-white/30" />
                <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
              </div>
              <div className="h-4 w-28 rounded-full bg-white/10" />
            </div>
            
            <div className="my-auto space-y-2">
              <h4 className="text-xl font-bold text-white tracking-tight drop-shadow-md line-clamp-2">
                {item.title}
              </h4>
              <p className="text-xs text-white/70 line-clamp-2 font-normal">
                {item.description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/10">
              <div className="flex gap-1.5">
                {item.techStack.slice(0, 3).map((t) => (
                  <span key={t} className="rounded-md border border-white/15 bg-white/10 px-2 py-0.5 text-[10px] font-mono text-white/90">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Hover Dark Overlay */}
        <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/30" />

        {/* Play Button Overlay for Video Items */}
        {item.videoUrl && (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/50 backdrop-blur-md transition-transform duration-300 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-black">
              <Play className="h-5 w-5 fill-current ml-0.5" />
            </div>
          </div>
        )}

        {/* Category Pill Tag inside Top-Left */}
        <div className="absolute left-3 top-3 z-10">
          <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold backdrop-blur-md shadow-md", categoryBadgeColor[item.category])}>
            {item.category === "web-studio" ? "Web Studio" : item.category === "ai-media-lab" ? "AI Media Lab" : "System Lab"}
          </span>
        </div>

        {/* Featured Tag inside Top-Right */}
        {item.isFeatured && (
          <div className="absolute right-3 top-3 z-10">
            <span className="inline-flex items-center rounded-full bg-amber-400/90 text-[10px] font-bold text-slate-950 px-2.5 py-0.5 shadow-md">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Info Section Below Thumbnail (Super Clean Dribbble/Godly Style) */}
      <div className="mt-3 flex items-center gap-3 px-1">
        {/* Brand Avatar */}
        <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-slate-900 shadow-sm overflow-hidden">
          <Image
            src="/logo-agency.png"
            alt="Artificial Ripe"
            width={28}
            height={28}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Title & Stats */}
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-bold text-foreground tracking-tight truncate transition-colors group-hover:text-cyan-400">
            {item.title}
          </h3>
          <div className="mt-0.5 flex items-center gap-3 text-xs text-muted-foreground font-medium">
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3 text-slate-400" />
              <span>{stats.views}</span>
            </span>
            <span className="flex items-center gap-1">
              <Heart className="h-3 w-3 text-rose-400/80" />
              <span>{stats.likes}</span>
            </span>
            <span className="text-white/20">•</span>
            <span className="truncate text-slate-400 font-mono text-[11px]">
              {item.techStack.slice(0, 2).join(", ")}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

