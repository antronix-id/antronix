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
  Eye,
} from "lucide-react";
import { LiquidMetalButton } from "@/components/animations/liquid-metal-button";
import { BorderGlow } from "@/components/animations/border-glow";
import { SectionHeader } from "@/components/shared/section-header";
import { ServiceCard } from "@/components/features/service-card";
import { PortfolioCard } from "@/components/features/portfolio-card";
import { TestimonialCard } from "@/components/features/testimonial-card";
import { TestimonialsSection } from "@/components/features/testimonial-v2";
import { PricingCalculator } from "@/components/features/pricing-calculator";
import { ContactForm } from "@/components/features/contact-form";
import { LocationMap } from "@/components/mockups/location-map";
import { SplitText, GradientText } from "@/components/animations/animated-text";
import { SERVICES, PORTFOLIO, TESTIMONIALS, AGENCY, PortfolioItem } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function HomePage() {
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

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-4xl text-center">
            {/* Headline */}
            <h1 className="mt-4 sm:mt-8 text-3xl font-bold tracking-tight sm:text-5xl lg:text-7xl leading-tight sm:leading-none">
              <SplitText text="Solusi Digital" delay={0.3} />
              <br />
              <SplitText text="Terdepan Untuk" delay={0.5} />
              <br />
              <GradientText
                text="Akselerasi Bisnis"
                className="text-3xl sm:text-5xl lg:text-7xl font-bold"
              />
            </h1>

            {/* Sub-headline */}
            <p className="mt-4 sm:mt-6 text-base sm:text-xl leading-relaxed text-muted-foreground max-w-2xl mx-auto">
              Artificial Ripe hadir membantu Anda mengubah tantangan bisnis menjadi peluang dengan
              layanan Web Studio, AI Media Lab, dan System Lab terbaik.
            </p>

            {/* CTA Buttons - Side-by-side Left-Right on Mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 sm:mt-10 flex flex-row items-center justify-center gap-2.5 sm:gap-4 w-full max-w-md mx-auto px-2"
            >
              <div className="flex justify-center shrink-0">
                <LiquidMetalButton href="#pricing">
                  <span className="text-xs sm:text-sm whitespace-nowrap">Mulai Proyek</span>
                  <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </LiquidMetalButton>
              </div>
              <div className="flex justify-center shrink-0">
                <LiquidMetalButton href="#services">
                  <span className="text-xs sm:text-sm whitespace-nowrap">Lihat Layanan</span>
                </LiquidMetalButton>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SERVICES SECTION */}
      {/* ============================================ */}
      <section id="services" className="relative py-16 sm:py-32">

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader
            title="Solusi Unggulan Untuk"
            titleHighlight="Setiap Kebutuhan"
            description="Kami menyediakan tiga divisi utama yang siap merealisasikan visi digital perusahaan Anda."
          />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* PORTFOLIO SECTION */}
      {/* ============================================ */}
      <section id="portfolio" className="relative py-24 sm:py-32">
        <div className="relative mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-10">
          <SectionHeader
            title="Karya Terbaik"
            titleHighlight="Yang Telah Kami Bangun"
            description="Lihat bagaimana kami membantu berbagai perusahaan mencapai hasil terbaik melalui teknologi dan desain."
          />
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
            {featuredPortfolio.map((item, index) => (
              <PortfolioCard
                key={item.id}
                item={item}
                index={index}
                className={index >= 3 ? "hidden md:block" : undefined}
              />
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <LiquidMetalButton href="/portfolio">
              <span>Lihat Semua Portofolio</span>
              <ChevronRight className="h-4 w-4" />
            </LiquidMetalButton>
          </motion.div>
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
              className="relative flex flex-col h-full min-h-[320px] sm:min-h-[480px] rounded-3xl overflow-hidden border border-white/10 bg-slate-950 shadow-2xl"
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
                className="min-h-[320px] sm:min-h-[480px]"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
