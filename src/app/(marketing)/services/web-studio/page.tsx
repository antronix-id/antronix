"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Check,
  MessageCircle,
  ArrowRight,
  Zap,
  Shield,
  TrendingUp,
  Star,
  Lock,
  CheckCircle2,
  Activity,
  Code,
  Code2,
  SearchCheck,
  Target,
  LayoutDashboard,
  Gauge,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BorderGlow } from "@/components/ui/border-glow";
import { SectionHeader } from "@/components/shared/section-header";
import { PortfolioCard } from "@/components/features/portfolio-card";
import { AnimatedBackground } from "@/components/react-bits/animated-background";
import { SERVICES, PORTFOLIO, AGENCY } from "@/lib/constants";
import { cn } from "@/lib/utils";

const service = SERVICES.find((s) => s.id === "web-studio")!;
const relatedPortfolio = PORTFOLIO.filter((p) => p.category === "web-studio").slice(0, 3);

const webStudioFeatureConfig: Record<string, { icon: React.ElementType; color: string; bg: string; glow: string }> = {
  "Pengembangan Web Custom": {
    icon: Code2,
    color: "text-cyan-400",
    bg: "bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-cyan-500/30",
    glow: "#06b6d4",
  },
  "Optimasi SEO Tingkat Lanjut": {
    icon: SearchCheck,
    color: "text-emerald-400",
    bg: "bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-emerald-500/30",
    glow: "#10b981",
  },
  "Landing Page Konversi Tinggi": {
    icon: Target,
    color: "text-purple-400",
    bg: "bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30",
    glow: "#a855f7",
  },
  "Integrasi Panel Admin CMS": {
    icon: LayoutDashboard,
    color: "text-amber-400",
    bg: "bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-amber-500/30",
    glow: "#f59e0b",
  },
  "Kecepatan Performa Utama": {
    icon: Gauge,
    color: "text-blue-400",
    bg: "bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border-blue-500/30",
    glow: "#3b82f6",
  },
  "Animasi & Interaksi Modern": {
    icon: Sparkles,
    color: "text-fuchsia-400",
    bg: "bg-gradient-to-br from-fuchsia-500/20 to-pink-500/20 border-fuchsia-500/30",
    glow: "#ec4899",
  },
};

export default function WebStudioPage() {
  return (
    <div className="relative min-h-screen">
      {/* HERO SECTION */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-tight">
                Website Performance Tinggi &{" "}
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                  Konversi Maksimal
                </span>
              </h1>

              {/* Subtitle */}
              <p className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground max-w-2xl">
                Kami merancang website modern, cepat, SEO-optimized, dan landing page performa tinggi yang tidak hanya tampil memukau, tapi secara terukur meningkatkan trust dan konversi bisnis Anda.
              </p>

              {/* CTA Action Buttons */}
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link href={AGENCY.socials.whatsapp} target="_blank">
                  <LiquidMetalButton>
                    <MessageCircle className="h-4 w-4 text-emerald-400" />
                    <span>Mulai Proyek Web</span>
                  </LiquidMetalButton>
                </Link>

                <Link href="#pricing">
                  <LiquidMetalButton>
                    <span>Lihat Paket & Harga</span>
                    <ArrowRight className="h-4 w-4" />
                  </LiquidMetalButton>
                </Link>
              </div>
            </motion.div>

            {/* Right Interactive Visual Graphic Showcase */}
            <div className="lg:col-span-1 relative mt-6 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                {/* Visual Card Glass Frame */}
                <div className="relative rounded-2xl border border-white/15 bg-slate-950/80 p-4 shadow-2xl backdrop-blur-xl ring-1 ring-white/10">
                  {/* Browser Window Header Bar */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 px-2">
                    <div className="flex items-center gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-red-500/80" />
                      <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                      <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                    </div>
                    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-muted-foreground w-3/5 justify-center">
                      <Lock className="h-3 w-3 text-emerald-400" />
                      <span className="truncate">webstudio.artificialripe.com</span>
                    </div>
                    <div className="w-8" />
                  </div>

                  {/* Browser Content Simulated Showcase */}
                  <div className="relative overflow-hidden rounded-xl border border-white/10 bg-slate-900/60 p-5">
                    {/* Simulated Modern Web Layout Graphic */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center border-b border-white/10 pb-3">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-lg bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center text-[10px] font-bold text-white">
                            AR
                          </div>
                          <div className="h-2.5 w-20 rounded-full bg-white/20" />
                        </div>
                        <div className="h-6 w-16 rounded-full bg-cyan-500/20 border border-cyan-500/40" />
                      </div>

                      {/* Web Hero Banner Simulator */}
                      <div className="rounded-lg bg-gradient-to-r from-blue-900/40 via-cyan-950/30 to-slate-900/60 p-4 border border-blue-500/20">
                        <div className="h-3 w-3/4 rounded bg-cyan-400/80 mb-2" />
                        <div className="h-2 w-1/2 rounded bg-white/40 mb-4" />
                        <div className="flex gap-2">
                          <div className="h-6 w-20 rounded bg-cyan-500 text-[10px] font-semibold text-slate-950 flex items-center justify-center">
                            Explore
                          </div>
                          <div className="h-6 w-16 rounded border border-white/20 bg-white/5" />
                        </div>
                      </div>

                      {/* Feature Blocks Mockup */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-lg border border-white/10 bg-slate-800/40 p-3">
                          <div className="h-2 w-12 rounded bg-blue-400 mb-2" />
                          <div className="h-1.5 w-full rounded bg-white/20 mb-1" />
                          <div className="h-1.5 w-4/5 rounded bg-white/20" />
                        </div>
                        <div className="rounded-lg border border-white/10 bg-slate-800/40 p-3">
                          <div className="h-2 w-12 rounded bg-cyan-400 mb-2" />
                          <div className="h-1.5 w-full rounded bg-white/20 mb-1" />
                          <div className="h-1.5 w-3/5 rounded bg-white/20" />
                        </div>
                      </div>
                    </div>

                    {/* Floating Metric Pill #1: Lighthouse Score */}
                    <div className="absolute -top-2 -right-2 flex items-center gap-2 rounded-full border border-emerald-500/40 bg-slate-900/90 px-3.5 py-1.5 shadow-xl backdrop-blur-md">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      <div className="text-left">
                        <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Performa</div>
                        <div className="text-xs font-bold text-emerald-400">100/100 Score</div>
                      </div>
                    </div>

                    {/* Floating Metric Pill #2: Conversion Growth */}
                    <div className="absolute -bottom-2 -left-2 flex items-center gap-2 rounded-full border border-cyan-500/40 bg-slate-900/90 px-3.5 py-1.5 shadow-xl backdrop-blur-md">
                      <Activity className="h-4 w-4 text-cyan-400" />
                      <div className="text-left">
                        <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Konversi Sales</div>
                        <div className="text-xs font-bold text-cyan-300">+145% Growth</div>
                      </div>
                    </div>
                  </div>

                  {/* Technology Badges Footer */}
                  <div className="mt-4 flex items-center justify-between px-2 pt-2 text-[11px] text-muted-foreground border-t border-white/5">
                    <div className="flex items-center gap-1.5">
                      <Code className="h-3.5 w-3.5 text-blue-400" />
                      <span>Next.js 16 • React 19 • Tailwind CSS</span>
                    </div>
                    <div className="font-mono text-cyan-400 text-[10px]">FAST & SECURE</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Portfolio */}
      {relatedPortfolio.length > 0 && (
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <SectionHeader
              badge="Portfolio"
              title="Proyek"
              titleHighlight="Web Studio"
              description="Lihat hasil karya dan proyek impian klien yang telah kami realisasikan."
            />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPortfolio.map((item, index) => (
                <PortfolioCard key={item.id} item={item} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        {/* Ambient background glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full bg-blue-600/10 blur-[140px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader
            badge="Fitur Unggulan"
            title="Apa yang Kami"
            titleHighlight="Tawarkan"
            description="Setiap website yang kami bangun dirancang khusus untuk performa tinggi, konversi maksimal, dan pengalaman pengguna tingkat premium."
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12">
            {service.features.map((feature, index) => {
              const cfg = webStudioFeatureConfig[feature.title] || {
                icon: Check,
                color: "text-blue-400",
                bg: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30",
                glow: "#3b82f6",
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
                  <BorderGlow glowColor={cfg.glow} className="group relative h-full transition-all duration-300 hover:scale-[1.02]">
                    <div className="p-7 h-full flex flex-col justify-between rounded-2xl bg-card/40 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                      <div>
                        {/* Icon Header Badge */}
                        <div className="mb-6 flex items-center justify-between">
                          <div className={cn("flex h-12 w-12 items-center justify-center rounded-2xl border backdrop-blur-md shadow-lg transition-transform duration-300 group-hover:scale-110", cfg.bg)}>
                            <FeatureIcon className={cn("h-6 w-6", cfg.color)} />
                          </div>
                          <span className="text-xs font-mono font-bold text-muted-foreground/50">
                            0{index + 1}
                          </span>
                        </div>

                        {/* Feature Title */}
                        <h3 className="mb-3 text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                          {feature.title}
                        </h3>

                        {/* Feature Description */}
                        <p className="text-sm leading-relaxed text-muted-foreground group-hover:text-muted-foreground/90 transition-colors">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </BorderGlow>
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
            titleHighlight="Web Studio"
            description="Pilih paket yang sesuai dengan kebutuhan dan skala bisnis Anda."
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {service.pricing.map((tier, index) => (
              <motion.div
                key={tier.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="h-full"
                >
                  <BorderGlow className="relative h-full transition-all duration-300">
                    {tier.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                        <Badge className="border-0 brand-gradient-btn text-white text-xs rounded-full px-3 py-1">
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    <div className="p-6 lg:p-8 flex flex-col justify-between h-full">
                      <div>
                        <h3 className="mb-1 text-xl font-bold">{tier.name}</h3>
                        <p className="mb-4 text-sm text-muted-foreground">
                          {tier.description}
                        </p>
                        <div className="mb-6">
                          <span className="text-3xl font-bold gradient-text">
                            Rp {tier.price}
                          </span>
                        </div>
                        <ul className="mb-8 space-y-3">
                          {tier.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-2 text-sm">
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
                              <span className="text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Button
                        asChild
                        className={cn(
                          "w-full rounded-full font-semibold",
                          tier.popular
                            ? "brand-gradient-btn text-white border-0"
                            : "bg-secondary text-foreground hover:bg-accent"
                        )}
                      >
                        <Link href={AGENCY.socials.whatsapp} target="_blank">
                          Pilih Paket
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </BorderGlow>
                </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
