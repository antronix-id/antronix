"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  MessageCircle,
  Cpu,
  ArrowRight,
  Zap,
  Server,
  Database,
  CreditCard,
  Cloud,
  Workflow,
  Network,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BorderGlow } from "@/components/animations/border-glow";
import { SectionHeader } from "@/components/shared/section-header";
import { PortfolioCard } from "@/components/features/portfolio-card";
import { ProblemSolutionSection } from "@/components/features/problem-solution-section";
import { FaqSection } from "@/components/features/faq-scroller";
import { CosmicParallaxBg } from "@/components/ui/parallax-cosmic-background";
import { SERVICES, PORTFOLIO, AGENCY, SYSTEM_LAB_FAQ } from "@/lib/constants";
import { cn } from "@/lib/utils";

import { useState, useEffect } from "react";

const defaultService = SERVICES.find((s) => s.id === "system-lab")!;
const relatedPortfolio = PORTFOLIO.filter((p) => p.category === "system-lab").slice(0, 3);

const systemLabFeatureConfig: Record<string, { icon: React.ElementType; color: string; bg: string; glow: string }> = {
  "Sistem Kasir & Transaksi (POS)": {
    icon: CreditCard,
    color: "text-emerald-400",
    bg: "bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-emerald-500/30",
    glow: "#10b981",
  },
  "Pengembangan Platform SaaS Custom": {
    icon: Server,
    color: "text-cyan-400",
    bg: "bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-cyan-500/30",
    glow: "#06b6d4",
  },
  "Infrastruktur Server & DevOps": {
    icon: Cloud,
    color: "text-blue-400",
    bg: "bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border-blue-500/30",
    glow: "#3b82f6",
  },
  "Otomatisasi Alur Kerja Bisnis": {
    icon: Workflow,
    color: "text-lime-400",
    bg: "bg-gradient-to-br from-lime-500/20 to-emerald-500/20 border-lime-500/30",
    glow: "#84cc16",
  },
  "Integrasi API & Layanan Pihak Ketiga": {
    icon: Network,
    color: "text-purple-400",
    bg: "bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border-purple-500/30",
    glow: "#a855f7",
  },
  "Dasbor Analitik Real-Time": {
    icon: BarChart3,
    color: "text-teal-400",
    bg: "bg-gradient-to-br from-teal-500/20 to-cyan-500/20 border-teal-500/30",
    glow: "#14b8a6",
  },
};

export default function SystemLabPage() {
  const service = SERVICES.find((s) => s.slug === "system-lab") || SERVICES[2] || SERVICES[0];
  return (
    <div className="relative min-h-screen">
      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden -mt-16 sm:-mt-20">
        <CosmicParallaxBg 
          head="System Lab"
          text="Otomatisasi Sistem, Arsitektur Cloud DevOps, POS Kasir, Custom SaaS"
          glowColor="green"
          className="w-full min-h-[500px] sm:min-h-[600px]"
        />
      </section>

      {/* PROBLEM & SOLUTION SECTION */}
      {service.problemsAndSolutions && (
        <ProblemSolutionSection 
          problemsAndSolutions={service.problemsAndSolutions}
          serviceTitle={service.title}
          glowColor="#10b981"
        />
      )}

      {/* Related Portfolio */}
      {relatedPortfolio.length > 0 && (
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-10">
            <SectionHeader
              badge="Portfolio"
              title="Proyek"
              titleHighlight="System Lab"
              description="Lihat arsitektur sistem dan aplikasi khusus yang telah kami bangun."
            />
            <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
              {relatedPortfolio.map((item, index) => (
                <PortfolioCard key={item.id} item={item} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader
            badge="Fitur Unggulan"
            title="Kapabilitas Sistem"
            titleHighlight="System Lab"
            description="Solusi teknologi andal untuk menyederhanakan dan mengotomatiskan operasional bisnis Anda."
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12">
            {(service.features || []).map((feature: any, index: number) => {
              const cfg = systemLabFeatureConfig[feature.title] || {
                icon: Cpu,
                color: "text-emerald-400",
                bg: "bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-emerald-500/30",
                glow: "#10b981",
              };
              const FeatureIcon = cfg.icon;

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

      {/* Pricing */}
      <section id="pricing" className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader
            badge="Pricing"
            title="Paket"
            titleHighlight="System Lab"
            description="Investasi tepat sasaran untuk otomatisasi dan efisiensi operasional bisnis."
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {(service.pricing || []).map((tier: any, index: number) => (
              <motion.div
                key={tier.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="h-full"
                >
                  <div className="group cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:-rotate-1 h-full w-full relative">
                    <div className="text-white rounded-3xl border border-slate-400/30 bg-gradient-to-br from-[#010101] via-[#090909] to-[#010101] shadow-2xl relative backdrop-blur-xl overflow-hidden hover:border-slate-200/60 hover:shadow-slate-300/10 hover:shadow-3xl w-full h-full p-6 lg:p-8 flex flex-col justify-between">
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
                          <h3 className="mb-1 text-xl font-bold text-white group-hover:text-slate-100 transition-colors">{tier.name}</h3>
                          <p className="mb-4 text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">{tier.description}</p>
                          <div className="mb-6">
                            <span className="text-3xl font-bold bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                              Rp {tier.price}
                            </span>
                          </div>
                          <ul className="mb-8 space-y-3">
                            {(tier.features || []).map((feature: any) => (
                              <li key={feature} className="flex items-start gap-2 text-sm">
                                <Check className="mt-0.5 h-4 w-4 shrink-0 text-slate-300" />
                                <span className="text-zinc-300 group-hover:text-zinc-200 transition-colors">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="w-full flex justify-center pt-4 border-t border-white/10">
                          <Button
                            onClick={() => {
                              const message = encodeURIComponent(
                                `Halo ${AGENCY.name}! 👋\n\nSaya berminat dengan *System Lab* - Paket *${tier.name}*.\n\nBisa dibantu untuk konsultasi detail?`
                              );
                              window.open(`https://wa.me/${AGENCY.whatsapp}?text=${message}`, "_blank");
                            }}
                            className="w-full"
                          >
                            <span>Pilih Paket {tier.name}</span>
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Decorative Glass Corners */}
                      <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-slate-300/20 to-transparent rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-slate-300/20 to-transparent rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </div>
                  </div>
                </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="relative py-12 sm:py-20 border-t border-white/5 overflow-hidden">
        <FaqSection data={SYSTEM_LAB_FAQ} />
      </section>
    </div>
  );
}
