"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Sparkles, Cpu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BorderGlow } from "@/components/ui/border-glow";
import type { Service } from "@/lib/constants";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  globe: Globe,
  sparkles: Sparkles,
  cpu: Cpu,
};

interface ServiceCardProps {
  service: Service;
  index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = iconMap[service.icon] || Globe;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="h-full"
    >
      <Link href={`/services/${service.slug}`} className="block h-full">
        <BorderGlow className="group h-full cursor-pointer transition-all duration-300">
          <div className="relative p-8 flex flex-col justify-between h-full">
            {/* Gradient top line */}
            <div
              className={cn(
                "absolute inset-x-0 top-0 h-1 bg-gradient-to-r opacity-60 transition-opacity duration-500 group-hover:opacity-100",
                service.gradient
              )}
            />

            <div>
              {/* Icon */}
              <div
                className={cn(
                  "mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br transition-all duration-500 group-hover:scale-110 shadow-lg",
                  service.gradient
                )}
              >
                <Icon className="h-7 w-7 text-white" />
              </div>

              {/* Title */}
              <h3 className="mb-3 text-xl font-bold tracking-tight">
                {service.title}
              </h3>

              {/* Description */}
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                {service.shortDescription}
              </p>

              {/* Features preview */}
              <div className="mb-6 flex flex-wrap gap-2">
                {service.features.slice(0, 3).map((feature) => (
                  <Badge
                    key={feature.title}
                    variant="secondary"
                    className="bg-secondary/80 text-xs rounded-full"
                  >
                    {feature.title}
                  </Badge>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-2 text-sm font-medium text-primary transition-all group-hover:gap-3 pt-4 border-t border-border/40">
              <span>Pelajari Lebih Lanjut</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </BorderGlow>
      </Link>
    </motion.div>
  );
}
