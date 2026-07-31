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

const webStudioFaqData: FaqData = {
  mainTitle: "Pertanyaan Umum Web Studio",
  mainSubtitle:
    "Segala hal yang perlu Anda ketahui tentang layanan pembuatan website modern & landing page performa tinggi kami.",
  rows: [
    {
      id: "ws-row1",
      speed: "55s",
      direction: "left",
      faqItems: [
        {
          id: "ws-q1",
          question: "Berapa lama proses pembuatan website hingga siap diakses?",
          answer:
            "Landing page dan website bisnis standar selesai dalam 3–7 hari kerja. Aplikasi web custom membutuhkan 2–3 minggu."
        },
        {
          id: "ws-q2",
          question: "Apakah website sudah dioptimasi untuk perangkat HP / Mobile?",
          answer:
            "100% responsif. Website dirancang presisi untuk semua ukuran layar (Mobile, Tablet, Desktop) dengan tampilan modern."
        },
        {
          id: "ws-q3",
          question: "Apakah sudah termasuk Domain, Hosting, dan SSL Gratis?",
          answer:
            "Ya! Semua paket Web Studio sudah termasuk gratis domain .com/.id, hosting cloud ultra-cepat, dan enkripsi SSL HTTPS."
        }
      ]
    },
    {
      id: "ws-row2",
      speed: "45s",
      direction: "right",
      faqItems: [
        {
          id: "ws-q4",
          question: "Apakah website menggunakan arsitektur Next.js 16 terbaru?",
          answer:
            "Ya, kami membangun website menggunakan Next.js 16 Server Components & TypeScript untuk performa skor Lighthouse 95-100."
        },
        {
          id: "ws-q5",
          question: "Bagaimana jika saya ingin menambah halaman/fitur di kemudian hari?",
          answer:
            "Struktur koding berarsitektur modular kami memudahkan penambahan fitur baru atau upgrade paket kapan saja tanpa bongkar ulang."
        },
        {
          id: "ws-q6",
          question: "Apakah saya bisa mengelola isi konten dan gambar sendiri?",
          answer:
            "Tentu. Setiap website dilengkapi CMS Admin intuitif agar Anda dapat memperbarui produk, berita, dan promo mandiri."
        }
      ]
    },
    {
      id: "ws-row3",
      speed: "65s",
      direction: "left",
      faqItems: [
        {
          id: "ws-q7",
          question: "Apakah ada garansi jika timbul masalah/bug pada website?",
          answer:
            "Kami memberikan garansi pemeliharaan teknis & perbaikan bug gratis selama 30 hingga 90 hari pasca peluncuran."
        },
        {
          id: "ws-q8",
          question: "Apakah terintegrasi dengan Meta Pixel, Google Analytics & WA?",
          answer:
            "Sudah terpasang integrasi lengkap untuk tombol WhatsApp langsung, Meta Pixel, Google Tag Manager, dan Analytics."
        },
        {
          id: "ws-q9",
          question: "Bagaimana cara melakukan pemesanan paket Web Studio?",
          answer:
            "Klik tombol Pilih Paket atau Hubungi Kami via WhatsApp. Tim teknis kami akan langsung memproses konsultasi kebutuhan Anda."
        }
      ]
    }
  ]
};

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
      <section className="relative pt-20 pb-16 sm:py-24 lg:py-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-tight text-white">
                Website Performance Tinggi &{" "}
                <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
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
                      {/* Browser Window Header Bar */}
                      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 px-2">
                        <div className="flex items-center gap-1.5">
                          <div className="h-3 w-3 rounded-full bg-slate-400/80" />
                          <div className="h-3 w-3 rounded-full bg-zinc-400/80" />
                          <div className="h-3 w-3 rounded-full bg-slate-300/80" />
                        </div>
                        <div className="flex items-center gap-2 rounded-full border border-slate-400/30 bg-slate-400/10 px-3 py-1 text-[11px] text-zinc-300 w-3/5 justify-center">
                          <Lock className="h-3 w-3 text-slate-300" />
                          <span className="truncate">client-website.com</span>
                        </div>
                        <div className="w-8" />
                      </div>

                      {/* Browser Content Video Showcase */}
                      <div className="relative overflow-hidden rounded-xl border border-slate-400/20 bg-slate-900 aspect-video flex items-center justify-center">
                        <video
                          src="/bc.mp4"
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover rounded-xl"
                        />

                        {/* Floating Metric Pill #1: Performance Score */}
                        <div className="absolute top-3 right-3 flex items-center gap-2 rounded-full border border-slate-300/40 bg-slate-950/90 backdrop-blur-md px-3 py-1 shadow-lg z-10">
                          <CheckCircle2 className="h-3.5 w-3.5 text-slate-200" />
                          <span className="text-xs font-semibold text-slate-200">Score 100/100</span>
                        </div>

                        {/* Floating Metric Pill #2: Growth */}
                        <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full border border-slate-300/40 bg-slate-950/90 backdrop-blur-md px-3 py-1 shadow-lg z-10">
                          <Activity className="h-3.5 w-3.5 text-slate-300" />
                          <span className="text-xs font-semibold text-slate-200">Fast & SEO Ready</span>
                        </div>
                      </div>

                      {/* Technology Badges Footer */}
                      <div className="mt-4 flex items-center justify-between px-2 pt-2 text-[11px] text-zinc-400 border-t border-white/5">
                        <div className="flex items-center gap-1.5">
                          <Code className="h-3.5 w-3.5 text-slate-300" />
                          <span>Next.js • React • Tailwind CSS</span>
                        </div>
                        <span className="text-zinc-400 font-medium text-[10px]">ULTRA FAST</span>
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
          glowColor="#06b6d4"
        />
      )}

      {/* TARGET AUDIENCE SECTION */}
      {service.targetAudience && (
        <TargetAudienceSection 
          targetAudience={service.targetAudience}
          serviceTitle={service.title}
          glowColor="#3b82f6"
        />
      )}

      {/* Related Portfolio */}
      {relatedPortfolio.length > 0 && (
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-10">
            <SectionHeader
              badge="Portfolio"
              title="Proyek"
              titleHighlight="Web Studio"
              description="Lihat hasil karya dan proyek impian klien yang telah kami realisasikan."
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
                          <p className="mb-4 text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">
                            {tier.description}
                          </p>
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
                                `Halo ${AGENCY.name}! 👋\n\nSaya berminat dengan *Web Studio* - Paket *${tier.name}*.\n\nBisa dibantu untuk konsultasi detail?`
                              );
                              window.open(`https://wa.me/${AGENCY.whatsapp}?text=${message}`, "_blank");
                            }}
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
        <FaqSection data={webStudioFaqData} />
      </section>
    </div>
  );
}
