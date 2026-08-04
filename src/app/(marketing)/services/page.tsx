"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Globe, 
  Sparkles, 
  Cpu, 
  ArrowRight, 
  Check, 
  MessageCircle, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  TrendingUp, 
  Users,
  Target,
  BarChart2,
  ChevronRight
} from "lucide-react";
import { LiquidMetalButton } from "@/components/animations/liquid-metal-button";
import { BorderGlow } from "@/components/animations/border-glow";
import { SectionHeader } from "@/components/shared/section-header";
import { Badge } from "@/components/ui/badge";
import { PricingCalculator } from "@/components/features/pricing-calculator";
import { FaqSection, FaqData } from "@/components/features/faq-scroller";
import { SERVICES, AGENCY, Service } from "@/lib/constants";
import { cn } from "@/lib/utils";

const logoMap: Record<string, string> = {
  "web-studio": "/Web-Studio.avif",
  "ai-media-lab": "/Media-Lab.avif",
  "system-lab": "/System-Lab.avif",
};

const servicesFaqData: FaqData = {
  mainTitle: "Frequently Asked Questions",
  mainSubtitle:
    "Punya pertanyaan seputar layanan Web Studio, AI Media Lab, atau System Lab? Temukan jawaban lengkapnya di bawah ini.",
  rows: [
    {
      id: "row1",
      speed: "24s",
      direction: "left",
      faqItems: [
        {
          id: "q1",
          question: "Berapa lama proses pengerjaan pembuatan website?",
          answer:
            "Landing page dan website standar selesai dalam 3–7 hari kerja. Pembuatan web application custom memerlukan waktu 2–3 minggu tergantung skala fitur."
        },
        {
          id: "q2",
          question: "Apakah website buatan Artificial Ripe ramah SEO & cepat?",
          answer:
            "Sangat ramah SEO. Kami menggunakan Next.js 16 terbaru dengan skor Google Lighthouse 95-100, arsitektur HTML5 semantik, serta meta tags presisi."
        },
        {
          id: "q3",
          question: "Apakah saya bisa mengedit sendiri konten website setelah selesai?",
          answer:
            "Ya! Kami menyediakan panel CMS admin yang intuitif sehingga Anda bisa memperbarui teks, foto produk, dan promo kapan saja tanpa koding."
        }
      ]
    },
    {
      id: "row2",
      speed: "18s",
      direction: "right",
      faqItems: [
        {
          id: "q4",
          question: "Apakah aset visual & video AI Media Lab bebas hak cipta?",
          answer:
            "100% lisensi komersial penuh milik Anda. Semua konten gambar 4K, video promo, dan avatar AI bebas digunakan untuk promosi & iklan komersial."
        },
        {
          id: "q5",
          question: "Berapa persen penghematan biaya menggunakan AI Media Lab?",
          answer:
            "Produksi media dengan AI menghemat biaya hingga 70% dibanding biaya sewa studio, kru produksi, talent, dan video editor profesional."
        },
        {
          id: "q6",
          question: "Apakah bisa membuat avatar AI yang mirip wajah owner/brand?",
          answer:
            "Tentu. Kami dapat melakukan kloning visual avatar dan sampel suara hiper-realistis untuk menjadi presenter resmi brand Anda."
        }
      ]
    },
    {
      id: "row3",
      speed: "28s",
      direction: "left",
      faqItems: [
        {
          id: "q7",
          question: "Bagaimana sistem garansi dan dukungan pasca pengerjaan?",
          answer:
            "Setiap proyek dilindungi garansi pemeliharaan teknis gratis 30–90 hari untuk memastikan sistem Anda berjalan 100% stabil tanpa error."
        },
        {
          id: "q8",
          question: "Bagaimana skema pembayaran layanan di Artificial Ripe?",
          answer:
            "Pembayaran transparan dengan skema DP 50% di awal sebelum pengerjaan dimulai dan 50% sisanya dilunasi setelah proyek selesai & siap launch."
        },
        {
          id: "q9",
          question: "Bagaimana cara memulai konsultasi proyek kami?",
          answer:
            "Cukup klik tombol WhatsApp atau Hubungi Kami. Tim spesialis kami siap berdiskusi dan memberikan analisa strategi teknis gratis."
        }
      ]
    }
  ]
};

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredServices = activeTab === "all" 
    ? SERVICES 
    : SERVICES.filter((s) => s.id === activeTab);

  return (
    <div className="relative min-h-screen pt-20 pb-20">
      {/* Ambient background lighting */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-blue-600/10 blur-[150px]" />

      {/* HERO SECTION */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-white/10 text-slate-300 border-white/20 px-3.5 py-1 rounded-full text-xs font-medium">
              Eksosistem Layanan Full-Stack
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl leading-tight text-white">
              Layanan Digital &{" "}
              <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Akselerasi Pertumbuhan Bisnis
              </span>
            </h1>
            <p className="mt-6 text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Kami menyatukan 3 kekuatan pilar teknologi — **Web Studio**, **AI Media Lab**, dan **System Lab** — untuk menyelesaikan tantangan operasional, meningkatkan trust brand, dan mendongkrak omset penjualan Anda.
            </p>
          </motion.div>

          {/* Filter Pills */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <button
              onClick={() => setActiveTab("all")}
              className={cn(
                "px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 border",
                activeTab === "all"
                  ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-lg shadow-cyan-500/20"
                  : "bg-slate-900/60 text-muted-foreground border-white/10 hover:border-white/20"
              )}
            >
              Semua Layanan (3 Pilar)
            </button>
            {SERVICES.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveTab(s.id)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 border flex items-center gap-2",
                  activeTab === s.id
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-lg shadow-cyan-500/20"
                    : "bg-slate-900/60 text-muted-foreground border-white/10 hover:border-white/20"
                )}
              >
                <span>{s.title}</span>
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SERVICES DETAILED LIST CARDS */}
      <section className="relative py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-16 sm:space-y-24">
          {filteredServices.map((service, index) => {
            const logoSrc = logoMap[service.id] || "/Web-Studio.avif";

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                id={service.slug}
              >
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 p-8 sm:p-12 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-slate-900/60">
                {/* Header Row */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center border-b border-white/10 pb-8 mb-8">
                  <div className="lg:col-span-8 flex items-center gap-6">
                    <div className="relative shrink-0 h-16 w-16 sm:h-20 sm:w-20">
                      <Image
                        src={logoSrc}
                        alt={service.title}
                        width={80}
                        height={80}
                        className="relative h-full w-full object-contain"
                      />
                    </div>
                    <div>
                      <span className="inline-block mb-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-0.5 text-[11px] font-semibold text-cyan-300">
                        PILAR LAYANAN #0{index + 1}
                      </span>
                      <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                        {service.title}
                      </h2>
                      <p className="text-sm sm:text-base text-zinc-400 mt-1">
                        {service.description}
                      </p>
                    </div>
                  </div>

                      {/* Header CTA Action */}
                      <div className="lg:col-span-4 flex lg:justify-end gap-3">
                        <Link href={`/services/${service.slug}`}>
                          <LiquidMetalButton>
                            <span>Detail & Paket Harga</span>
                            <ArrowRight className="h-4 w-4" />
                          </LiquidMetalButton>
                        </Link>
                      </div>
                    </div>

                    {/* SECTION CONTENT GRID: TARGET AUDIENCE & KEY BENEFITS */}
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                      
                      {/* Left: Target Audiens */}
                      {service.targetAudience && (
                        <div className="lg:col-span-6 space-y-4">
                          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                            <Target className="h-4 w-4 text-cyan-400" />
                            <span>Siapa Target Audiens Layanan Ini?</span>
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {service.targetAudience.map((target) => (
                              <div 
                                key={target.title}
                                className="rounded-xl border border-white/10 bg-slate-900/60 p-4 transition-all hover:border-white/20"
                              >
                                <div className="text-xs font-bold text-slate-100 mb-1 flex items-center gap-1.5">
                                  <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                                  <span>{target.title}</span>
                                </div>
                                <p className="text-[11px] text-muted-foreground leading-relaxed">
                                  {target.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Right: Solusi & Impact */}
                      {service.problemsAndSolutions && (
                        <div className="lg:col-span-6 space-y-4">
                          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                            <Zap className="h-4 w-4 text-emerald-400" />
                            <span>Masalah Klien & Solusi Konkrit</span>
                          </h3>
                          <div className="space-y-3">
                            {service.problemsAndSolutions.slice(0, 2).map((ps) => (
                              <div 
                                key={ps.problemTitle}
                                className="rounded-xl border border-white/10 bg-slate-900/60 p-4 flex flex-col justify-between"
                              >
                                <div className="flex items-center justify-between gap-2 mb-1.5">
                                  <span className="text-xs font-bold text-slate-200">{ps.problemTitle}</span>
                                  {ps.impactBadge && (
                                    <span className="text-[10px] font-bold text-emerald-300 border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 rounded-full shrink-0">
                                      {ps.impactBadge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-slate-400">
                                  <strong className="text-emerald-400 font-semibold">Solusi: </strong>
                                  {ps.solutionDescription}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>

                    {/* KEY BENEFITS METRICS FOOTER */}
                    {service.keyBenefits && (
                      <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {service.keyBenefits.map((b) => (
                          <div key={b.title} className="flex items-center gap-3 rounded-xl bg-white/5 p-3 border border-white/5">
                            {b.stat && (
                              <div className="text-lg font-extrabold text-cyan-300 font-mono shrink-0">
                                {b.stat}
                              </div>
                            )}
                            <div>
                              <div className="text-xs font-bold text-white">{b.title}</div>
                              <div className="text-[11px] text-muted-foreground line-clamp-1">{b.description}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                  </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* PRICING CALCULATOR SECTION */}
      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader
            badge="Pricing & Simulator"
            title="Kalkulator Estimasi"
            titleHighlight="Investasi Layanan"
            description="Hitung dan sesuaikan paket layanan digital yang paling pas untuk skala bisnis Anda."
          />
          <PricingCalculator />
        </div>
      </section>

      {/* CONSULTATION WHATSAPP CTA */}
      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <BorderGlow glowColor="#06b6d4">
            <div className="rounded-3xl bg-slate-950 p-8 sm:p-14 text-center border border-white/10 backdrop-blur-2xl">
              <Badge className="mb-4 bg-emerald-500/10 text-emerald-400 border-emerald-500/30 px-3.5 py-1 rounded-full text-xs">
                Konsultasi Gratis Tanpa Komitmen
              </Badge>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Bingung Memilih Layanan yang Tepat?
              </h2>
              <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Tim teknis Artificial Ripe siap mendiskusikan tantangan bisnis Anda dan memberikan rekomendasi strategi digital terbaik secara cuma-cuma.
              </p>
              <div className="mt-8 flex justify-center">
                <Link href={AGENCY.socials.whatsapp} target="_blank">
                  <LiquidMetalButton>
                    <MessageCircle className="h-5 w-5 text-emerald-400" />
                    <span>Konsultasi Langsung via WhatsApp</span>
                    <ArrowRight className="h-4 w-4" />
                  </LiquidMetalButton>
                </Link>
              </div>
            </div>
          </BorderGlow>
        </div>
      </section>

      {/* FAQ HORIZONTAL SCROLLER SECTION (DEAK DEKAT FOOTER) */}
      <section className="relative py-12 sm:py-20 border-t border-white/5 overflow-hidden">
        <FaqSection data={servicesFaqData} />
      </section>
    </div>
  );
}
