"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Sparkles, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LiquidMetalButton } from "@/components/animations/liquid-metal-button";
import { Badge } from "@/components/ui/badge";
import { BorderGlow } from "@/components/animations/border-glow";
import type { Service } from "@/lib/constants";
import { cn } from "@/lib/utils";

const logoMap: Record<string, string> = {
  "web-studio": "/Web-Studio.avif",
  "ai-media-lab": "/Media-Lab.avif",
  "system-lab": "/System-Lab.avif",
  globe: "/Web-Studio.avif",
  sparkles: "/Media-Lab.avif",
  cpu: "/System-Lab.avif",
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
    "/Web-Studio.avif";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="h-full"
    >
      <Link href={`/services/${service.slug}`} className="block h-full">
        <div className="group cursor-pointer transform transition-all duration-300 active:scale-[0.98] hover:scale-[1.02] hover:-rotate-1 h-full w-full">
          <div className="text-white rounded-3xl border border-slate-400/30 bg-gradient-to-br from-[#010101] via-[#090909] to-[#010101] shadow-2xl relative backdrop-blur-xl overflow-hidden hover:border-slate-200/60 hover:shadow-slate-300/10 hover:shadow-3xl w-full h-full flex flex-col justify-between p-5 sm:p-8">

            {/* Background ambient lighting & animated effects */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-400/10 via-transparent to-white/5 opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-gradient-to-tr from-slate-300/20 to-transparent blur-3xl opacity-30 group-hover:opacity-50 transform group-hover:scale-110 transition-all duration-700 animate-bounce" />
              <div className="absolute top-10 left-10 w-16 h-16 rounded-full bg-slate-300/15 blur-xl animate-ping" />
              <div className="absolute bottom-16 right-16 w-12 h-12 rounded-full bg-white/5 blur-lg animate-ping" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-300/20 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-between h-full">
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
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-slate-100 transition-colors">
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="mb-4 text-sm leading-relaxed text-zinc-400 group-hover:text-zinc-300 transition-colors">
                  {service.shortDescription}
                </p>

                {/* Target Audience / Highlights preview */}
                {service.targetAudience && service.targetAudience.length > 0 && (
                  <div className="mb-4">
                    <div className="text-[11px] font-mono font-semibold uppercase text-slate-300 mb-2">
                      Cocok Untuk:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {service.targetAudience.slice(0, 3).map((target) => (
                        <Badge
                          key={target.title}
                          variant="outline"
                          className="bg-slate-400/10 border-slate-300/30 text-[11px] text-slate-200 rounded-full px-2.5 py-0.5"
                        >
                          {target.title}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Features preview */}
                <div className="mb-6 flex flex-wrap gap-2">
                  {service.features.slice(0, 2).map((feature) => (
                    <Badge
                      key={feature.title}
                      variant="secondary"
                      className="bg-slate-400/15 border border-slate-300/20 text-slate-200 text-xs rounded-full"
                    >
                      {feature.title}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-4 border-t border-white/10 flex justify-center">
                <LiquidMetalButton>
                  <span>Pelajari Detail & Harga</span>
                  <ArrowRight className="h-4 w-4" />
                </LiquidMetalButton>
              </div>
            </div>

            {/* Decorative Glass Corners */}
            <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-slate-300/20 to-transparent rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-slate-300/20 to-transparent rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
