import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BorderGlow } from "@/components/effects/border-glow";
import { SectionHeader } from "@/components/layout/section-header";
import { PricingHero } from "@/components/sections/pricing-hero";
import { PricingCalculator } from "@/components/sections/pricing-calculator";
import { FaqSection } from "@/components/sections/faq-scroller";
import { AGENCY, SERVICES_FAQ } from "@/data";
import { createMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  return createMetadata({
    title: "Harga",
    description:
      "Pilih paket layanan pembuatan website modern atau arsitektur sistem full-stack yang sesuai dengan kebutuhan operasional dan skala pertumbuhan bisnis Anda. Tanpa biaya tersembunyi.",
    path: "/pricing",
  });
}

export default function PricingPage() {
  return (
    <div className="relative min-h-screen pt-20 pb-20">
      {/* Ambient background lighting */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-blue-600/10 blur-[150px]" />

      {/* HERO SECTION */}
      <PricingHero />

      {/* PRICING CALCULATOR SECTION */}
      <section className="relative py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader
            badge="Kalkulator & Simulator"
            title="Pilih Paket Layanan"
            titleHighlight="Sesuai Skala Bisnis"
            description="Gunakan simulator di bawah untuk melihat rincian paket, fitur lengkap, dan estimasi biaya pengembangan proyek Anda."
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
                Kebutuhan Custom Khusus
              </Badge>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Punya Spesifikasi Sistem yang Unik?
              </h2>
              <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Jika bisnis Anda memerlukan fitur khusus di luar paket standar, tim arsitek software kami siap merancang skema solusi dan penawaran yang disesuaikan secara presisi.
              </p>
              <div className="mt-8 flex justify-center">
                <Link href={AGENCY.socials.whatsapp} target="_blank">
                  <Button size="lg">
                    <MessageCircle className="h-4 w-4" />
                    <span>Konsultasi Paket Custom via WhatsApp</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </BorderGlow>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="relative py-12 sm:py-20 border-t border-white/5 overflow-hidden">
        <FaqSection data={SERVICES_FAQ} />
      </section>
    </div>
  );
}
