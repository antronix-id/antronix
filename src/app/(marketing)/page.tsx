"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MessageCircle,
  ChevronRight,
  Zap,
  Shield,
  Clock,
  Headphones,
  TrendingUp,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { BorderGlow } from "@/components/ui/border-glow";
import { SectionHeader } from "@/components/shared/section-header";
import { ServiceCard } from "@/components/features/service-card";
import { PortfolioCard } from "@/components/features/portfolio-card";
import { TestimonialCard } from "@/components/features/testimonial-card";
import { TestimonialsSection } from "@/components/ui/testimonial-v2";
import { PricingCalculator } from "@/components/features/pricing-calculator";
import { ContactForm } from "@/components/features/contact-form";
import { LocationMap } from "@/components/ui/location-map";
import { SplitText, GradientText } from "@/components/react-bits/animated-text";
import { SERVICES, PORTFOLIO, TESTIMONIALS, WHY_CHOOSE_US, AGENCY, PortfolioItem } from "@/lib/constants";
import { cn } from "@/lib/utils";

const whyUsConfigs = [
  {
    icon: Zap,
    gradient: "from-blue-500 via-cyan-500 to-teal-400",
    glow: "shadow-cyan-500/25",
    glowBg: "from-blue-500/10 to-cyan-500/10",
    number: "01",
  },
  {
    icon: Shield,
    gradient: "from-purple-500 via-indigo-500 to-blue-500",
    glow: "shadow-purple-500/25",
    glowBg: "from-purple-500/10 to-indigo-500/10",
    number: "02",
  },
  {
    icon: Clock,
    gradient: "from-amber-500 via-orange-500 to-yellow-400",
    glow: "shadow-amber-500/25",
    glowBg: "from-amber-500/10 to-orange-500/10",
    number: "03",
  },
  {
    icon: Headphones,
    gradient: "from-emerald-500 via-teal-500 to-green-400",
    glow: "shadow-emerald-500/25",
    glowBg: "from-emerald-500/10 to-teal-500/10",
    number: "04",
  },
  {
    icon: TrendingUp,
    gradient: "from-rose-500 via-pink-500 to-purple-500",
    glow: "shadow-rose-500/25",
    glowBg: "from-rose-500/10 to-pink-500/10",
    number: "05",
  },
  {
    icon: Users,
    gradient: "from-fuchsia-500 via-purple-500 to-violet-500",
    glow: "shadow-fuchsia-500/25",
    glowBg: "from-fuchsia-500/10 to-purple-500/10",
    number: "06",
  },
];

export default function HomePage() {
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null);
  const featuredPortfolio = PORTFOLIO.filter((p) => p.isFeatured).slice(0, 6);

  return (
    <>
      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <section id="hero" className="relative flex min-h-screen items-center overflow-hidden">
        {/* Decorative orbs */}
        <div className="pointer-events-none absolute -left-40 top-1/4 h-80 w-80 rounded-full bg-[oklch(0.5_0.18_270)] opacity-10 blur-[100px]" />
        <div className="pointer-events-none absolute -right-40 bottom-1/4 h-80 w-80 rounded-full bg-[oklch(0.5_0.2_310)] opacity-10 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-32 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-4xl text-center">
            {/* Headline */}
            <h1 className="mt-8 text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl">
              <SplitText text="Solusi Digital" delay={0.3} />
              <br />
              <SplitText text="Terdepan Untuk" delay={0.5} />
              <br />
              <GradientText
                text="Akselerasi Bisnis"
                className="text-4xl sm:text-5xl lg:text-7xl font-bold"
              />
            </h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
            >
              {AGENCY.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
            >
              <Link href={AGENCY.socials.whatsapp} target="_blank">
                <LiquidMetalButton variant="default">
                  <MessageCircle className="h-4 w-4 text-emerald-400" />
                  <span>Mulai Proyek</span>
                </LiquidMetalButton>
              </Link>

              <Link href="/portfolio">
                <LiquidMetalButton variant="default">
                  <span>Lihat Portofolio</span>
                </LiquidMetalButton>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SERVICES SECTION */}
      {/* ============================================ */}
      <section id="services" className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader
            title="Solusi Digital"
            titleHighlight="Terintegrasi"
            description="Tiga pilar layanan utama yang dirancang saling melengkapi untuk membawa bisnis Anda ke tingkat digital berikutnya."
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {SERVICES.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FEATURED PORTFOLIO SECTION */}
      {/* ============================================ */}
      <section id="portfolio" className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader
            title="Hasil Karya"
            titleHighlight="Terbaik Kami"
            description="Lihat bagaimana kami membantu berbagai pemilik bisnis dan perusahaan bertransformasi secara digital."
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPortfolio.map((item, index) => (
              <PortfolioCard
                key={item.id}
                item={item}
                index={index}
                onVideoClick={setLightboxItem}
              />
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-10 text-center"
          >
            <Link href="/portfolio">
              <LiquidMetalButton>
                <span>Lihat Semua Portofolio</span>
                <ChevronRight className="h-4 w-4" />
              </LiquidMetalButton>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ============================================ */}
      {/* WHY CHOOSE US SECTION */}
      {/* ============================================ */}
      <section id="why-us" className="relative py-16 sm:py-24 overflow-hidden">
        {/* Ambient Background Glow Orbs */}
        <div className="pointer-events-none absolute -left-40 top-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[130px]" />
        <div className="pointer-events-none absolute -right-40 top-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[130px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader
            title="Mengapa Memilih"
            titleHighlight="Artificial Ripe?"
            description="Kami bukan sekadar penyedia jasa — kami adalah mitra teknologi terpercaya yang berkomitmen penuh pada kesuksesan bisnis Anda."
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_CHOOSE_US.map((item, index) => {
              const config = whyUsConfigs[index % whyUsConfigs.length];
              const Icon = config.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: index * 0.08 }}
                  className="h-full"
                >
                  <BorderGlow className="group h-full transition-all duration-300 overflow-hidden">
                    <div className="relative p-7 h-full flex flex-col justify-between overflow-hidden rounded-[24px] bg-slate-950/50 backdrop-blur-xl border border-white/10 transition-all duration-300 group-hover:border-white/20 group-hover:shadow-2xl">
                      {/* Background gradient overlay on hover */}
                      <div
                        className={cn(
                          "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                          config.glowBg
                        )}
                      />

                      {/* Number Watermark */}
                      <span className="absolute top-5 right-6 text-3xl font-black tracking-tight text-white/10 group-hover:text-white/25 transition-colors select-none">
                        {config.number}
                      </span>

                      <div className="relative z-10">
                        {/* Glowing Icon Badge */}
                        <div className="mb-6 relative flex items-center">
                          <div
                            className={cn(
                              "flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg transition-transform duration-300 group-hover:scale-110",
                              config.gradient,
                              config.glow
                            )}
                          >
                            <Icon className="h-6 w-6 text-white filter drop-shadow" />
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="mb-2.5 text-lg font-bold tracking-tight text-white transition-colors group-hover:text-cyan-200">
                          {item.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {item.description}
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

      {/* ============================================ */}
      {/* TESTIMONIALS SECTION */}
      {/* ============================================ */}
      <TestimonialsSection />

      {/* ============================================ */}
      {/* PRICING CALCULATOR SECTION */}
      {/* ============================================ */}
      <section id="pricing" className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <SectionHeader
            title="Estimasi Paket"
            titleHighlight="Investasi Digital"
            description="Pilih pilar layanan dan paket yang paling sesuai dengan kebutuhan dan anggaran bisnis Anda."
          />
          <PricingCalculator />
        </div>
      </section>

      {/* ============================================ */}
      {/* CONTACT / CTA SECTION */}
      {/* ============================================ */}
      <section id="contact" className="relative py-16 sm:py-24">
        {/* Background effect */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-[oklch(0.5_0.18_270)] opacity-5 blur-[120px]" />
          <div className="absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-[oklch(0.5_0.2_310)] opacity-5 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          {/* Centered Section Header */}
          <SectionHeader
            title="Siap Memulai Proyek"
            titleHighlight="Digital Anda?"
            description="Diskusikan kebutuhan proyek Anda dengan tim spesialis kami. Kami siap memberikan solusi teknologi terbaik untuk akselerasi pertumbuhan bisnis Anda."
          />

          {/* 2-Column Grid: Contact Form & Location Map */}
          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2 max-w-7xl mx-auto items-stretch">
            {/* Contact Form Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col h-full"
            >
              <ContactForm />
            </motion.div>

            {/* Location Map Card (Full Bleed Reference Design) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative flex flex-col h-full min-h-[480px] rounded-3xl overflow-hidden border border-white/10 bg-slate-950 shadow-2xl"
            >
              <LocationMap
                center={[104.7565, -2.9845]}
                zoom={12.8}
                pitch={0}
                bearing={0}
                markers={[
                  {
                    lng: 104.7565,
                    lat: -2.9845,
                    label: "Artificial Ripe",
                    popupTitle: "Artificial Ripe",
                    icon: "hq",
                  },
                ]}
                className="min-h-[480px]"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
