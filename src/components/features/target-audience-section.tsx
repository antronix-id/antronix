"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { 
  UserCheck, 
  ShoppingBag, 
  Building2, 
  Target, 
  Video, 
  Sparkles, 
  Share2, 
  Megaphone, 
  Store, 
  Truck, 
  Cpu, 
  Server,
  Users
} from "lucide-react";
import { SectionHeader } from "@/components/shared/section-header";
import type { TargetAudience } from "@/lib/constants";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  UserCheck,
  ShoppingBag,
  Building2,
  Target,
  Video,
  Sparkles,
  Share2,
  Megaphone,
  Store,
  Truck,
  Cpu,
  Server,
};

interface TargetAudienceSectionProps {
  targetAudience: TargetAudience[];
  serviceTitle?: string;
  badgeText?: string;
  gradient?: string;
  glowColor?: string;
}

export function TargetAudienceSection({
  targetAudience,
  serviceTitle = "Layanan Kami",
  badgeText = "Target Audiens",
  glowColor = "#06b6d4",
}: TargetAudienceSectionProps) {
  if (!targetAudience || targetAudience.length === 0) return null;

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      {/* Background Subtle Ambient Light */}
      <div 
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] rounded-full opacity-[0.06] blur-[140px]" 
        style={{ backgroundColor: glowColor }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          badge={badgeText}
          title="Siapa yang Paling Cocok"
          titleHighlight={`Menggunakan ${serviceTitle}?`}
          description="Solusi yang dirancang secara terukur untuk memenuhi kebutuhan spesifik berbagai segmen bisnis."
        />

        <div className="mt-12 max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 justify-center">
          {targetAudience.map((item, index) => {
            const imgSrc = item.image || (item.icon?.startsWith("/") ? item.icon : null);
            const IconComponent = (item.icon && iconMap[item.icon]) || Users;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="h-full flex justify-center"
              >
                <div className="group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-rotate-1 h-full w-full max-w-[260px]">
                  <div className="text-white rounded-2xl border border-slate-400/30 bg-gradient-to-br from-[#010101] via-[#090909] to-[#010101] shadow-2xl relative backdrop-blur-xl overflow-hidden hover:border-slate-200/60 hover:shadow-slate-300/10 hover:shadow-3xl w-full h-full flex flex-col justify-between p-5 sm:p-6">
                    {/* Background ambient lighting & animated effects */}
                    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-white/10 opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                      <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-gradient-to-tr from-white/10 to-transparent blur-3xl opacity-30 group-hover:opacity-50 transform group-hover:scale-110 transition-all duration-700 animate-bounce" />
                      <div className="absolute top-10 left-10 w-16 h-16 rounded-full bg-white/5 blur-xl animate-ping" />
                      <div className="absolute bottom-16 right-16 w-12 h-12 rounded-full bg-white/5 blur-lg animate-ping" />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center text-center my-auto">
                      <div className="relative mb-5 flex items-center justify-center">
                        <div className="relative h-20 w-20 sm:h-24 sm:w-24 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
                          {imgSrc ? (
                            <Image
                              src={imgSrc}
                              alt={item.title}
                              width={96}
                              height={96}
                              className="h-full w-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
                            />
                          ) : (
                            <IconComponent className="h-10 w-10 text-slate-200 transition-colors" />
                          )}
                        </div>
                      </div>

                      <h3 className="mb-2 text-base sm:text-lg font-bold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent animate-pulse transform group-hover:scale-105 transition-transform duration-300">
                        {item.title}
                      </h3>

                      <div className="mt-4 w-1/3 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent rounded-full transform group-hover:w-1/2 group-hover:h-1 transition-all duration-500 animate-pulse" />

                      <div className="flex space-x-2 mt-3 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                      </div>
                    </div>

                    {/* Decorative Corners */}
                    <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-white/10 to-transparent rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-white/10 to-transparent rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
