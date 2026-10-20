"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  titleHighlight,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div className="relative w-full mb-8 sm:mb-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className={cn(
          "relative z-10 max-w-3xl",
          align === "center" && "mx-auto text-center",
          className
        )}
      >
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight sm:leading-snug bg-gradient-to-b from-white via-slate-200 to-slate-400 bg-clip-text text-transparent drop-shadow-sm">
          {title}{" "}
          {titleHighlight && (
            <span className="gradient-text">{titleHighlight}</span>
          )}
        </h2>

        {description && (
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </motion.div>
    </div>
  );
}
