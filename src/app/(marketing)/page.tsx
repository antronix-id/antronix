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
import { BorderGlow } from "@/components/ui/border-glow";
import { SectionHeader } from "@/components/shared/section-header";
import { ServiceCard } from "@/components/features/service-card";
import { PortfolioCard } from "@/components/features/portfolio-card";
import { TestimonialCard } from "@/components/features/testimonial-card";
import { PricingCalculator } from "@/components/features/pricing-calculator";
import { ContactForm } from "@/components/features/contact-form";
import { SplitText, GradientText } from "@/components/react-bits/animated-text";
import { SERVICES, PORTFOLIO, TESTIMONIALS, WHY_CHOOSE_US, AGENCY, PortfolioItem } from "@/lib/constants";

// Icon mapping for Why Choose Us
const whyUsIcons: Record<string, React.ElementType> = {
  zap: Zap,
  shield: Shield,
  clock: Clock,
  headphones: Headphones,
  "trending-up": TrendingUp,
  users: Users,
};

export default function HomePage() {
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null);
  const featuredPortfolio = PORTFOLIO.filter((p) => p.isFeatured).slice(0, 6);

  return (
    <>
      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
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
              <Button
                asChild
                size="lg"
                className="brand-gradient-btn px-8"
              >
                <Link href={AGENCY.socials.whatsapp} target="_blank">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Mulai Proyek
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="px-8"
              >
                <Link href="/portfolio">
                  Lihat Portofolio
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SERVICES SECTION */}
      {/* ============================================ */}
      <section id="services" className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader
            badge="Layanan Kami"
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
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader
            badge="Portofolio"
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
            className="mt-12 text-center"
          >
            <Button asChild variant="outline" size="lg" className="group">
              <Link href="/portfolio">
                Lihat Semua Portofolio
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ============================================ */}
      {/* WHY CHOOSE US SECTION */}
      {/* ============================================ */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader
            badge="Keunggulan Kami"
            title="Mengapa Memilih"
            titleHighlight="Artificial Ripe?"
            description="Kami bukan sekadar penyedia jasa — kami adalah mitra teknologi terpercaya yang berkomitmen penuh pada kesuksesan bisnis Anda."
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_CHOOSE_US.map((item, index) => {
              const Icon = whyUsIcons[item.icon] || Zap;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: index * 0.1 }}
                  className="h-full"
                >
                  <BorderGlow className="group h-full transition-all duration-300">
                    <div className="p-6 h-full flex flex-col justify-between">
                      <div>
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="mb-2 font-bold">{item.title}</h3>
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
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader
            badge="Testimoni Klien"
            title="Kata Mereka Tentang"
            titleHighlight="Layanan Kami"
            description="Kepercayaan dan kepuasan klien adalah pencapaian terbesar bagi perusahaan kami."
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.slice(0, 6).map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* PRICING CALCULATOR SECTION */}
      {/* ============================================ */}
      <section id="pricing" className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <SectionHeader
            badge="Paket Harga"
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
      <section id="contact" className="relative py-24 sm:py-32">
        {/* Background effect */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-[oklch(0.5_0.18_270)] opacity-5 blur-[120px]" />
          <div className="absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-[oklch(0.5_0.2_310)] opacity-5 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            {/* Left: CTA Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <SectionHeader
                badge="Hubungi Kami"
                title="Siap Memulai Proyek"
                titleHighlight="Digital Anda?"
                description="Diskusikan kebutuhan proyek Anda dengan tim spesialis kami. Kami siap memberikan solusi teknologi terbaik untuk akselerasi pertumbuhan bisnis Anda."
                align="left"
              />

              <div className="mt-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <MessageCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Konsultasi Cepat Via WhatsApp
                    </p>
                    <p className="text-lg font-bold">{AGENCY.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                    <Zap className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Email Resmi Perusahaan
                    </p>
                    <p className="text-lg font-bold">{AGENCY.email}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
