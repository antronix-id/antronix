"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { BorderGlow } from "@/components/ui/border-glow";
import { Play } from "lucide-react";
import type { PortfolioItem } from "@/lib/constants";
import { cn } from "@/lib/utils";

const categoryGradients: Record<string, string> = {
  "web-studio": "from-cyan-500 to-blue-600",
  "ai-media-lab": "from-pink-500 to-rose-600",
  "system-lab": "from-lime-400 to-emerald-500",
};

const categoryLabels: Record<string, string> = {
  "web-studio": "Web Studio",
  "ai-media-lab": "AI Media Lab",
  "system-lab": "System Lab",
};

interface PortfolioCardProps {
  item: PortfolioItem;
  index: number;
  onVideoClick?: (item: PortfolioItem) => void;
}

export function PortfolioCard({ item, index, onVideoClick }: PortfolioCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <BorderGlow className="group h-full overflow-hidden transition-all duration-500">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden rounded-t-[22px] bg-gradient-to-br from-secondary to-accent">
          {/* Placeholder pattern */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={cn("h-20 w-20 rounded-2xl bg-gradient-to-br opacity-30", categoryGradients[item.category])} />
          </div>

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/40" />

          {/* Category Badge */}
          <div className="absolute left-3 top-3 z-10">
            <Badge
              className={cn(
                "border-0 bg-gradient-to-r text-xs font-medium text-white rounded-full px-3 py-1",
                categoryGradients[item.category]
              )}
            >
              {categoryLabels[item.category]}
            </Badge>
          </div>

          {/* Play button for video items */}
          {item.videoUrl && (
            <button
              onClick={() => onVideoClick?.(item)}
              className="absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-transform hover:scale-110">
                <Play className="h-6 w-6 text-white fill-white" />
              </div>
            </button>
          )}

          {/* Featured badge */}
          {item.isFeatured && (
            <div className="absolute right-3 top-3 z-10">
              <Badge className="border-0 bg-yellow-500/90 text-xs font-medium text-black rounded-full px-3 py-1">
                Featured
              </Badge>
            </div>
          )}
        </div>

        <div className="p-5 flex flex-col justify-between flex-1">
          <div>
            {/* Title */}
            <h3 className="mb-2 text-lg font-bold tracking-tight transition-colors group-hover:text-primary">
              {item.title}
            </h3>

            {/* Description */}
            <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {item.techStack.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="bg-secondary/60 text-[11px] font-normal rounded-full"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </BorderGlow>
    </motion.div>
  );
}
