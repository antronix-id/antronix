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
import { LiquidMetalButton } from "@/components/animations/liquid-metal-button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BorderGlow } from "@/components/animations/border-glow";
import { SectionHeader } from "@/components/shared/section-header";
import { PortfolioCard } from "@/components/features/portfolio-card";
import { ProblemSolutionSection } from "@/components/features/problem-solution-section";
import { TargetAudienceSection } from "@/components/features/target-audience-section";
import { FaqSection, FaqData } from "@/components/features/faq-scroller";
import { SERVICES, PORTFOLIO, AGENCY } from "@/lib/constants";
import { cn } from "@/lib/utils";

const aiMediaLabFaqData: FaqData = {
  mainTitle: "Pertanyaan Umum AI Media Lab",
  mainSubtitle:
    "Semua informasi mengenai efisiensi produksi media visual 4K, video sintetis, dan avatar AI bertaraf sinematik.",
  rows: [
    {
      id: "ai-row1",
      speed: "55s",
      direction: "left",
      faqItems: [
        {
          id: "ai-q1",
          question: "Berapa lama proses pembuatan video iklan dengan AI?",
          answer:
            "Video iklan dan konten visual siap rilis diproduksi hanya dalam 24–48 jam, jauh lebih cepat daripada syuting studio konvensional."
        },
        {
          id: "ai-q2",
          question: "Apakah konten gambar & video beresolusi tinggi 4K?",
          answer:
            "Ya! Semua hasil rendering gambar 4K ultra-photorealistic dan video sinematik dirancang untuk tampilan layar besar & promosi sosial media."
        },
        {
          id: "ai-q3",
          question: "Apakah hak cipta konten 100% menjadi milik saya?",
          answer:
            "Tentu saja. Lisensi penuh hak cipta komersial diserahkan 100% kepada Anda untuk iklan TikTok, Meta Ads, YouTube, dan website."
        }
      ]
    },
    {
      id: "ai-row2",
      speed: "45s",
      direction: "right",
      faqItems: [
        {
          id: "ai-q4",
          question: "Bagaimana cara membuat avatar AI khusus untuk brand kami?",
          answer:
            "Kami melakukan kloning visual avatar dan sampel suara emosional hiper-realistis untuk menjadi juru bicara resmi produk Anda."
        },
        {
          id: "ai-q5",
          question: "Berapa penghematan biaya dibanding produksi studio tradisional?",
          answer:
            "Menggunakan AI Media Lab memangkas biaya produksi hingga 70% karena tidak memerlukan sewa studio, kamera, talent, dan kru lapangan."
        },
        {
          id: "ai-q6",
          question: "Apakah bisa request narasi/voiceover dalam berbagai bahasa?",
          answer:
            "Bisa! Voiceover AI mendukung puluhan bahasa dan dialek lokal (Bahasa Indonesia, Inggris, Mandarin, dll.) dengan artikulasi alami."
        }
      ]
    },
    {
      id: "ai-row3",
      speed: "65s",
      direction: "left",
      faqItems: [
        {
          id: "ai-q7",
          question: "Apakah ada revisi jika visual belum sesuai dengan keinginan?",
          answer:
            "Setiap paket sudah termasuk kuota revisi penyesuaian gaya visual, narasi, dan hook untuk memastikan hasil sesuai ekspektasi."
        },
        {
          id: "ai-q8",
          question: "Format file apa yang akan saya dapatkan?",
          answer:
            "Aset dikirim dalam format siap tayang: MP4 4K (16:9 & 9:16 untuk Reels/TikTok) dan image WebP/PNG ultra HD."
        },
        {
          id: "ai-q9",
          question: "Bagaimana cara memesan paket AI Media Lab?",
          answer:
            "Klik tombol Mulai Produksi AI atau hubungi kami via WhatsApp untuk mengirimkan brief produk & gaya visual yang diinginkan."
        }
      ]
    }
  ]
};

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
    <div className="relative min-h-screen">
      {/* Hero */}
      <section className="relative flex min-h-[75vh] sm:min-h-[85vh] items-center overflow-hidden pt-20 pb-12 sm:pt-28 sm:pb-16 lg:pt-36 lg:pb-24">
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
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-[1.15] text-white">
                  Konten Visual & Media{" "}
                  <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent drop-shadow-sm">
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
                <div className="group cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:-rotate-1 h-full w-full">
                  <div className="text-white rounded-3xl border border-slate-400/30 bg-gradient-to-br from-[#010101] via-[#090909] to-[#010101] shadow-2xl relative backdrop-blur-xl overflow-hidden hover:border-slate-200/60 hover:shadow-slate-300/10 hover:shadow-3xl w-full h-full p-4 sm:p-5 flex flex-col justify-between">
                    {/* Background ambient lighting & animated effects */}
                    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-tr from-slate-400/10 via-transparent to-white/5 opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                      <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-gradient-to-tr from-slate-300/20 to-transparent blur-3xl opacity-30 group-hover:opacity-50 transform group-hover:scale-110 transition-all duration-700 animate-bounce" />
                      <div className="absolute top-10 left-10 w-16 h-16 rounded-full bg-slate-300/15 blur-xl animate-ping" />
                      <div className="absolute bottom-16 right-16 w-12 h-12 rounded-full bg-white/5 blur-lg animate-ping" />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-300/20 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Console Top Bar */}
                      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 px-2">
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-slate-300" />
                          <span className="text-xs font-medium text-zinc-300">AI Media Production Studio</span>
                        </div>
                        {/* Pill Badge */}
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-white/10 text-slate-300 text-xs font-semibold shadow-inner backdrop-blur-md">
                          <Sparkles className="w-3.5 h-3.5 text-slate-300 animate-pulse" />
                          <span>AI Media Lab — Generative Content & Visual 4K</span>
                        </div>
                      </div>

                      {/* Video Showcase Content */}
                      <div className="relative overflow-hidden rounded-xl border border-slate-400/20 bg-slate-900 aspect-video flex items-center justify-center">
                        <video
                          src="/bc.mp4"
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover rounded-xl"
                        />

                        {/* Floating Badge 1: Render Speed */}
                        <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border border-slate-300/40 bg-slate-950/90 backdrop-blur-md px-3 py-1 text-[10px] font-semibold text-slate-200 shadow-md z-10">
                          <Zap className="h-3 w-3 text-slate-300" />
                          <span>Rendering 4K</span>
                        </div>

                        {/* Floating Badge 2: Output format */}
                        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full border border-slate-300/40 bg-slate-950/90 backdrop-blur-md px-3 py-1 text-[10px] font-semibold text-slate-200 shadow-md z-10">
                          <ImageIcon className="h-3 w-3 text-slate-300" />
                          <span>Aset Siap Pakai</span>
                        </div>
                      </div>

                      {/* AI Tools Footer Badges */}
                      <div className="mt-4 flex items-center justify-between px-2 pt-2 text-[11px] text-zinc-400 border-t border-white/5">
                        <div className="flex items-center gap-1.5">
                          <Layers className="h-3.5 w-3.5 text-slate-300" />
                          <span>AI Generator • Video Editing • Sound Design</span>
                        </div>
                        <span className="text-zinc-400 font-medium text-[10px]">4K ULTRA HD</span>
                      </div>
                    </div>

                    {/* Decorative Glass Corners */}
                    <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-slate-300/20 to-transparent rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-slate-300/20 to-transparent rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM & SOLUTION SECTION */}
      {service.problemsAndSolutions && (
        <ProblemSolutionSection 
          problemsAndSolutions={service.problemsAndSolutions}
          serviceTitle={service.title}
          glowColor="#a855f7"
        />
      )}

      {/* TARGET AUDIENCE SECTION */}
      {service.targetAudience && (
        <TargetAudienceSection 
          targetAudience={service.targetAudience}
          serviceTitle={service.title}
          glowColor="#ec4899"
        />
      )}

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
                          {/* Icon Header Badge */}
                          <div className="mb-6 flex items-center justify-between">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-300/40 bg-slate-400/15 text-slate-200 backdrop-blur-md shadow-lg transition-transform duration-300 group-hover:scale-110">
                              <FeatureIcon className="h-6 w-6 text-slate-200" />
                            </div>
                            <span className="text-xs font-mono font-bold text-slate-400">
                              0{index + 1}
                            </span>
                          </div>

                          {/* Feature Title */}
                          <h3 className="mb-3 text-lg font-bold text-white group-hover:text-slate-100 transition-colors">
                            {feature.title}
                          </h3>

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

                      {tier.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                          <Badge className="border border-slate-300/40 bg-slate-400/20 text-slate-100 backdrop-blur-md text-xs font-semibold rounded-full px-3.5 py-1 shadow-lg">
                            Most Popular
                          </Badge>
                        </div>
                      )}

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
                            {tier.features.map((feature) => (
                              <li key={feature} className="flex items-start gap-2 text-sm">
                                <Check className="mt-0.5 h-4 w-4 shrink-0 text-slate-300" />
                                <span className="text-zinc-300 group-hover:text-zinc-200 transition-colors">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="w-full flex justify-center pt-4 border-t border-white/10">
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
        <FaqSection data={aiMediaLabFaqData} />
      </section>
    </div>
  );
}
