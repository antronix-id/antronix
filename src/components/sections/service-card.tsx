"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Globe, Sparkles, Cpu } from "lucide-react";
import { BorderGlow } from "@/components/effects/border-glow";
import { DIVISION_HERO_IMAGES, DIVISION_LOGOS } from "@/data";
import type { Service } from "@/types";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  service: Service;
  index: number;
}

export function ServiceCard({ service, index }: ServiceCardProps) {
  const logoSrc = DIVISION_LOGOS[service.slug];
  const bgSrc = DIVISION_HERO_IMAGES[service.slug];

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
          <div className="text-white rounded-3xl border border-slate-400/30 bg-slate-950 shadow-2xl relative backdrop-blur-xl overflow-hidden hover:border-slate-200/60 hover:shadow-slate-300/10 hover:shadow-3xl w-full h-full min-h-[250px] sm:min-h-[270px] flex flex-col justify-between p-6 sm:p-8">

            {/* Background Image & Ambient lighting */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              <Image
                src={bgSrc}
                alt={service.title}
                fill
                className="object-cover object-center opacity-55 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700 pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/70 to-slate-950/40 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/80 pointer-events-none" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-between h-full my-auto space-y-4">
              {/* Logo & Title Side-by-Side */}
              <div className="flex items-center gap-4">
                <div className="relative flex items-center shrink-0">
                  {/* Soft ambient theme glow behind logo */}
                  <div
                    className={cn(
                      "absolute -inset-1 rounded-full blur-2xl opacity-40 transition-all duration-500 group-hover:opacity-80 group-hover:scale-125 bg-gradient-to-r",
                      service.gradient
                    )}
                  />
                  
                  {/* 3D Logo Image */}
                  <div className="relative h-12 w-12 sm:h-14 sm:w-14 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-0.5">
                    <Image
                      src={logoSrc}
                      alt={service.title}
                      width={56}
                      height={56}
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
              <p className="text-xs sm:text-sm leading-relaxed text-zinc-300/90 group-hover:text-slate-100 transition-colors line-clamp-3">
                {service.description}
              </p>
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
