"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Sparkles, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { Badge } from "@/components/ui/badge";
import { BorderGlow } from "@/components/ui/border-glow";
import type { Service } from "@/lib/constants";
import { cn } from "@/lib/utils";

const logoMap: Record<string, string> = {
  "web-studio": "/Web-Studio.png",
  "ai-media-lab": "/Media-Lab.png",
  "system-lab": "/System-Lab.png",
  globe: "/Web-Studio.png",
  sparkles: "/Media-Lab.png",
  cpu: "/System-Lab.png",
};

interface ServiceCardProps {
  service: Service;
  index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  const logoSrc =
    service.logo ||
    logoMap[service.id] ||
    logoMap[service.slug] ||
    logoMap[service.icon] ||
    "/Web-Studio.png";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="h-full"
    >
      <Link href={`/services/${service.slug}`} className="block h-full">
        <BorderGlow className="group h-full cursor-pointer transition-all duration-300 overflow-hidden">
          <div className="relative p-5 sm:p-8 flex flex-col justify-between h-full overflow-hidden rounded-[24px]">
            <div>
              {/* Logo & Title Side-by-Side */}
              <div className="mb-6 flex items-center gap-4">
                <div className="relative flex items-center shrink-0">
                  {/* Soft ambient theme glow behind logo */}
                  <div
                    className={cn(
                      "absolute -inset-1 rounded-full blur-2xl opacity-40 transition-all duration-500 group-hover:opacity-80 group-hover:scale-125 bg-gradient-to-r",
                      service.gradient
                    )}
                  />
                  
                  {/* 3D Logo Image */}
                  <div className="relative h-14 w-14 sm:h-16 sm:w-16 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-0.5">
                    <Image
                      src={logoSrc}
                      alt={service.title}
                      width={64}
                      height={64}
                      className="h-full w-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]"
                    />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                  {service.title}
                </h3>
              </div>

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

            {/* CTA Button */}
            <div className="pt-4 border-t border-border/40 flex justify-center">
              <LiquidMetalButton>
                <span>Pelajari Lebih Lanjut</span>
                <ArrowRight className="h-4 w-4" />
              </LiquidMetalButton>
            </div>
          </div>
        </BorderGlow>
      </Link>
    </motion.div>
  );
}
