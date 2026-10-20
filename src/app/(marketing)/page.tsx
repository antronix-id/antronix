import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BorderGlow } from "@/components/effects/border-glow";
import { SectionHeader } from "@/components/layout/section-header";
import { HomeHero } from "@/components/sections/home-hero";
import { ServiceCard } from "@/components/sections/service-card";
import { TargetClientsSection } from "@/components/sections/target-clients";
import { TestimonialsSection } from "@/components/sections/testimonial-marquee";
import { SERVICES } from "@/data";
import { SITE } from "@/config/site";
import { createMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  return createMetadata({ description: SITE.description, path: "/" });
}

export default function HomePage() {
  return (
    <>
      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <HomeHero />

      {/* ============================================ */}
      {/* SERVICES SECTION */}
      {/* ============================================ */}
      <section id="services" className="relative py-16 sm:py-32">

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader
            title="Solusi Unggulan Untuk"
            titleHighlight="Setiap Kebutuhan"
            description="Kami menyediakan dua pilar divisi utama yang siap merealisasikan visi digital perusahaan Anda."
          />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-5xl mx-auto">
            {SERVICES.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* TARGET CLIENTS & AUDIENCE SECTION */}
      {/* ============================================ */}
      <TargetClientsSection />

      {/* ============================================ */}
      {/* PORTFOLIO SHOWCASE TEASER SECTION */}
      {/* ============================================ */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
          <BorderGlow glowColor="#3b82f6">
            <div className="rounded-3xl bg-slate-950/90 p-8 sm:p-14 text-center border border-white/10 backdrop-blur-2xl relative overflow-hidden">
              <SectionHeader
                badge="Portofolio & Studi Kasus"
                title="Karya Digital Terbaik"
                titleHighlight="Yang Telah Kami Bangun"
                description="Jelajahi rekam jejak solusi website interaktif dan arsitektur sistem full-stack yang telah kami selesaikan untuk berbagai brand dan enterprise di seluruh Indonesia."
              />
              <div className="mt-8 flex justify-center">
                <Link href="/portfolio">
                  <Button size="lg">
                    <span>Lihat Semua Portofolio</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </BorderGlow>
        </div>
      </section>

      {/* ============================================ */}
      {/* TESTIMONIALS SECTION */}
      {/* ============================================ */}
      <TestimonialsSection />
    </>
  );
}
