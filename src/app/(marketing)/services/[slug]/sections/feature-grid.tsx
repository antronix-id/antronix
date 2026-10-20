"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  Check,
  Cloud,
  Code2,
  CreditCard,
  Gauge,
  LayoutDashboard,
  Network,
  SearchCheck,
  Server,
  Sparkles,
  Target,
  Workflow,
} from "lucide-react";
import { SectionHeader } from "@/components/layout/section-header";
import type { Service } from "@/types";

/**
 * Peta kunci `ServiceFeature.icon` (data/services/*.ts) ke komponen lucide.
 * Ikon yang tidak dikenal jatuh ke ikon default divisi (`Service.icon`).
 */
const FEATURE_ICONS: Record<string, React.ElementType> = {
  code2: Code2,
  searchCheck: SearchCheck,
  target: Target,
  layoutDashboard: LayoutDashboard,
  gauge: Gauge,
  sparkles: Sparkles,
  creditCard: CreditCard,
  server: Server,
  cloud: Cloud,
  workflow: Workflow,
  network: Network,
  barChart3: BarChart3,
};

/** Grid "Fitur Unggulan" halaman divisi layanan */
export function ServiceFeatureGrid({ service }: { service: Service }) {
  const { page } = service;
  const defaultIcon = FEATURE_ICONS[service.icon] ?? Check;

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Ambient background glow */}
      {page.featuresAmbientClass && (
        <div
          className={`pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full ${page.featuresAmbientClass} blur-[140px]`}
        />
      )}

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          badge="Fitur Unggulan"
          title={page.featuresTitle}
          titleHighlight={page.featuresHighlight}
          description={page.featuresDescription}
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12">
          {service.features.map((feature, index) => {
            const FeatureIcon = (feature.icon && FEATURE_ICONS[feature.icon]) || defaultIcon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="h-full"
              >
                <div className="group cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:-rotate-1 h-full w-full">
                  <div className="text-white rounded-3xl border border-slate-400/30 bg-gradient-to-br from-[#010101] via-[#090909] to-[#010101] shadow-2xl relative backdrop-blur-xl overflow-hidden hover:border-slate-200/60 hover:shadow-slate-300/10 hover:shadow-3xl w-full h-full flex flex-col justify-between p-7">
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
                        {/* Header with Icon, Title next to Icon, and Index number */}
                        <div className="mb-5 flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3.5 min-w-0 flex-1">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-slate-300/40 bg-slate-400/15 text-slate-200 backdrop-blur-md shadow-lg transition-transform duration-300 group-hover:scale-110">
                              <FeatureIcon className="h-6 w-6 text-slate-200" />
                            </div>
                            <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-slate-100 transition-colors leading-snug">
                              {feature.title}
                            </h3>
                          </div>
                          <span className="text-xs font-mono font-bold text-slate-400 shrink-0 pt-1">
                            0{index + 1}
                          </span>
                        </div>

                        {/* Feature Description */}
                        <p className="text-sm leading-relaxed text-zinc-400 group-hover:text-zinc-300 transition-colors">
                          {feature.description}
                        </p>
                      </div>
                    </div>

                    {/* Decorative Glass Corners */}
                    <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-slate-300/20 to-transparent rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-slate-300/20 to-transparent rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
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
