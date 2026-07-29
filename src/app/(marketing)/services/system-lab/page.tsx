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
  Shield,
  Server,
  Terminal,
  Activity,
  CheckCircle2,
  Database,
  CreditCard,
  Cloud,
  Workflow,
  Network,
  BarChart3
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

const service = SERVICES.find((s) => s.id === "system-lab")!;
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
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[85vh] items-center overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24">
        {/* Background glow ambient */}
        <div className="pointer-events-none absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-emerald-600/15 blur-[120px]" />
        <div className="pointer-events-none absolute -right-40 bottom-1/4 h-[500px] w-[500px] rounded-full bg-teal-500/15 blur-[120px]" />
        
        {/* Subtle grid pattern background */}
        <div 
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {/* Main Headline */}
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-[1.15]">
                  Arsitektur Sistem &{" "}
                  <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-sm">
                    Aplikasi Enterprise
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground max-w-2xl">
                  Kami membangun arsitektur backend scalable, web app kustom, otokomunikasi API, dan infrastruktur cloud terintegrasi yang menjamin performa tinggi, keamanan maksimal, dan efisiensi operasional.
                </p>

                {/* CTA Action Buttons */}
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <Link href={AGENCY.socials.whatsapp} target="_blank">
                    <LiquidMetalButton>
                      <MessageCircle className="h-4 w-4 text-emerald-400" />
                      <span>Konsultasi System</span>
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
            </div>

            {/* Right Interactive Visual Graphic Showcase */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                {/* Visual Card Glass Frame */}
                <div className="relative rounded-2xl border border-emerald-500/25 bg-slate-950/85 p-4 shadow-2xl backdrop-blur-xl ring-1 ring-emerald-500/20">
                  {/* Console Header Bar */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 px-2">
                    <div className="flex items-center gap-2">
                      <Terminal className="h-4 w-4 text-emerald-400" />
                      <span className="text-xs font-semibold text-foreground">System Node #01 • Production</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] text-emerald-300 font-mono">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      SYSTEM ONLINE
                    </div>
                  </div>

                  {/* Terminal Log Console */}
                  <div className="space-y-3">
                    <div className="rounded-xl border border-white/10 bg-slate-900/90 p-4 font-mono text-[11px] space-y-2 text-emerald-400/90">
                      <div className="flex items-center justify-between text-muted-foreground border-b border-white/5 pb-1 text-[10px]">
                        <span>INFRASTRUCTURE MONITOR</span>
                        <span className="text-emerald-400 font-bold">ACTIVE</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300">
                        <span className="text-emerald-400">[OK]</span>
                        <span>API Gateway Cluster: <span className="text-emerald-300">Healthy</span></span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300">
                        <span className="text-emerald-400">[OK]</span>
                        <span>PostgreSQL DB Replication: <span className="text-cyan-300 font-mono">4ms sync</span></span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300">
                        <span className="text-emerald-400">[OK]</span>
                        <span>Automated Queue Process: <span className="text-emerald-400 font-mono">100% success</span></span>
                      </div>
                    </div>

                    {/* Infrastructure Visual Grid */}
                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-3 flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                          <Activity className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-[10px] text-muted-foreground uppercase font-bold">API Latency</div>
                          <div className="text-xs font-bold text-emerald-300">&lt;15ms Response</div>
                        </div>
                      </div>

                      <div className="rounded-xl border border-teal-500/20 bg-teal-950/20 p-3 flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-500/20 text-teal-400">
                          <Database className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-[10px] text-muted-foreground uppercase font-bold">Uptime SLA</div>
                          <div className="text-xs font-bold text-teal-300">99.99% High-Avail</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Technology Badges Footer */}
                  <div className="mt-4 flex items-center justify-between px-2 pt-2 text-[11px] text-muted-foreground border-t border-white/5">
                    <div className="flex items-center gap-1.5">
                      <Server className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Node.js • PostgreSQL • Docker • Redis</span>
                    </div>
                    <div className="font-mono text-emerald-400 text-[10px]">ENTERPRISE READY</div>
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
              titleHighlight="System Lab"
              description="Lihat implementasi sistem digital dan arsitektur aplikasi yang telah kami bangun."
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
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full bg-emerald-600/10 blur-[140px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader
            badge="Spesifikasi Sistem"
            title="Kapabilitas"
            titleHighlight="System Lab"
            description="Sistem khusus dan arsitektur backend andal yang dirancang presisi sesuai dengan alur kerja unik bisnis Anda."
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12">
            {service.features.map((feature, index) => {
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
            titleHighlight="System Lab"
            description="Investasi tepat untuk transformasi digital bisnis Anda."
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
                        <p className="mb-4 text-sm text-muted-foreground">{tier.description}</p>
                        <div className="mb-6">
                          <span className="text-3xl font-bold gradient-text">
                            Rp {tier.price}
                          </span>
                        </div>
                        <ul className="mb-8 space-y-3">
                          {tier.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-2 text-sm">
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
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
    </>
  );
}
