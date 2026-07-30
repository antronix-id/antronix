"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  MessageCircle,
  Sparkles,
  ArrowRight,
  Zap,
  Wand2,
  Image as ImageIcon,
  Cpu,
  Layers,
  Play,
  Video,
  Palette,
  Bot,
  ShieldCheck
} from "lucide-react";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BorderGlow } from "@/components/ui/border-glow";
import { SectionHeader } from "@/components/shared/section-header";
import { PortfolioCard } from "@/components/features/portfolio-card";
import { AnimatedBackground } from "@/components/react-bits/animated-background";
import { SERVICES, PORTFOLIO, AGENCY } from "@/lib/constants";
import { cn } from "@/lib/utils";

const service = SERVICES.find((s) => s.id === "ai-media-lab")!;
const relatedPortfolio = PORTFOLIO.filter((p) => p.category === "ai-media-lab").slice(0, 3);

const aiMediaFeatureConfig: Record<string, { icon: React.ElementType; color: string; bg: string; glow: string }> = {
  "Iklan Video Berbasis AI": {
    icon: Video,
    color: "text-purple-400",
    bg: "bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30",
    glow: "#a855f7",
  },
  "Visual Branding AI": {
    icon: Palette,
    color: "text-pink-400",
    bg: "bg-gradient-to-br from-pink-500/20 to-rose-500/20 border-pink-500/30",
    glow: "#ec4899",
  },
  "Otomatisasi Konten Pemasaran": {
    icon: Sparkles,
    color: "text-amber-400",
    bg: "bg-gradient-to-br from-amber-500/20 to-yellow-500/20 border-amber-500/30",
    glow: "#f59e0b",
  },
  "Narator & Avatar AI Realistis": {
    icon: Bot,
    color: "text-cyan-400",
    bg: "bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-cyan-500/30",
    glow: "#06b6d4",
  },
  "Peningkatan Kualitas Visual AI": {
    icon: Wand2,
    color: "text-indigo-400",
    bg: "bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border-indigo-500/30",
    glow: "#6366f1",
  },
  "Produksi Konten Skala Besar": {
    icon: Layers,
    color: "text-rose-400",
    bg: "bg-gradient-to-br from-rose-500/20 to-red-500/20 border-rose-500/30",
    glow: "#f43f5e",
  },
};

export default function AIMediaLabPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[75vh] sm:min-h-[85vh] items-center overflow-hidden pt-20 pb-12 sm:pt-28 sm:pb-16 lg:pt-36 lg:pb-24">
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
                  Konten Visual & Media{" "}
                  <span className="bg-gradient-to-r from-purple-400 via-fuchsia-300 to-pink-400 bg-clip-text text-transparent drop-shadow-sm">
                    Powered by AI
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground max-w-2xl">
                  Akselerasi produksi media marketing Anda. Kami mengombinasikan kreativitas AI generasi terbaru, visual 4K photorealistic, video animasi sintetis, dan avatar brand yang memikat dalam hitungan jam.
                </p>

                {/* CTA Action Buttons */}
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <Link href={AGENCY.socials.whatsapp} target="_blank">
                    <LiquidMetalButton>
                      <MessageCircle className="h-4 w-4 text-emerald-400" />
                      <span>Mulai Produksi AI</span>
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
                <div className="relative rounded-2xl border border-purple-500/25 bg-slate-950/85 p-4 shadow-2xl backdrop-blur-xl ring-1 ring-purple-500/20">
                  {/* Console Top Bar */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 px-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-fuchsia-400" />
                      <span className="text-xs font-semibold text-foreground">AI Creative Engine v4.5</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-2.5 py-0.5 text-[10px] text-fuchsia-300 font-mono">
                      <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400 animate-pulse" />
                      RENDERING LIVE
                    </div>
                  </div>

                  {/* Simulated AI Prompt Box */}
                  <div className="space-y-3.5">
                    <div className="rounded-xl border border-white/10 bg-slate-900/80 p-3.5">
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 flex justify-between">
                        <span>Generative Prompt</span>
                        <span className="text-fuchsia-400">FLUX-ULTRA AI</span>
                      </div>
                      <div className="font-mono text-xs text-purple-200 bg-purple-950/40 p-2.5 rounded-lg border border-purple-500/20 leading-relaxed">
                        &quot;Cyberpunk brand commercial teaser, 8K ultra detail, photorealistic lighting, cinematic motion, vibrant neon accent...&quot;
                      </div>
                    </div>

                    {/* Generative Visual Canvas Box */}
                    <div className="relative h-44 rounded-xl border border-white/10 bg-gradient-to-br from-purple-950/60 via-slate-900/80 to-fuchsia-950/60 overflow-hidden flex items-center justify-center p-4">
                      {/* Ambient background particles graphic */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,70,239,0.15)_0,transparent_70%)]" />
                      
                      <div className="relative z-10 text-center">
                        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 to-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/30">
                          <Play className="h-5 w-5 fill-white ml-0.5" />
                        </div>
                        <div className="text-xs font-semibold text-slate-200">4K Cinematic Video Preview</div>
                        <div className="text-[10px] text-muted-foreground mt-0.5">3840 x 2160 • 60 FPS • High Dynamic Range</div>
                      </div>

                      {/* Floating Badge 1: Render Speed */}
                      <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border border-fuchsia-500/40 bg-slate-950/90 px-3 py-1 text-[10px] font-bold text-fuchsia-300 shadow-lg backdrop-blur-md">
                        <Zap className="h-3 w-3 text-amber-400" />
                        <span>Render: 0.8s/frame</span>
                      </div>

                      {/* Floating Badge 2: Output format */}
                      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full border border-purple-500/40 bg-slate-950/90 px-3 py-1 text-[10px] font-bold text-purple-300 shadow-lg backdrop-blur-md">
                        <ImageIcon className="h-3 w-3 text-purple-400" />
                        <span>PRO Visual Asset</span>
                      </div>
                    </div>
                  </div>

                  {/* AI Tools Footer Badges */}
                  <div className="mt-4 flex items-center justify-between px-2 pt-2 text-[11px] text-muted-foreground border-t border-white/5">
                    <div className="flex items-center gap-1.5">
                      <Layers className="h-3.5 w-3.5 text-fuchsia-400" />
                      <span>Midjourney • Flux • Runway • ComfyUI</span>
                    </div>
                    <div className="font-mono text-fuchsia-400 text-[10px]">ULTRA HD 4K</div>
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
          <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-10">
            <SectionHeader
              badge="Portfolio"
              title="Proyek"
              titleHighlight="AI Media Lab"
              description="Lihat hasil karya visual dan media berteknologi AI yang telah kami hasilkan."
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
            badge="Kapabilitas AI"
            title="Kekuatan"
            titleHighlight="AI Media Lab"
            description="Produksi konten media sinematik berkualitas tinggi secara efisien dengan bantuan teknologi AI terdepan."
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12">
            {service.features.map((feature, index) => {
              const cfg = aiMediaFeatureConfig[feature.title] || {
                icon: Sparkles,
                color: "text-purple-400",
                bg: "bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30",
                glow: "#a855f7",
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
            titleHighlight="AI Media Lab"
            description="Investasi cerdas untuk produksi konten berkualitas tinggi."
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
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-purple-400" />
                              <span className="text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="w-full flex justify-center">
                        <LiquidMetalButton
                          onClick={() => {
                            const message = encodeURIComponent(
                              `Halo ${AGENCY.name}! 👋\n\nSaya berminat dengan *AI Media Lab* - Paket *${tier.name}*.\n\nBisa dibantu untuk konsultasi detail?`
                            );
                            window.open(`https://wa.me/${AGENCY.whatsapp}?text=${message}`, "_blank");
                          }}
                          className="w-full"
                        >
                          <span>Pilih Paket {tier.name}</span>
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </LiquidMetalButton>
                      </div>
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
