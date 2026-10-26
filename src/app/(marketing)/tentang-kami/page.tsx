import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  ArrowRight,
  Zap,
  Target,
  ShieldCheck,
  HeartHandshake,
  Sparkles,
} from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BorderGlow } from "@/components/effects/border-glow";
import { SectionHeader } from "@/components/layout/section-header";
import { ContactGrid } from "@/components/sections/contact-grid";
import { ABOUT_COMPACT, BRAND_LOGOS, DIVISION_LOGOS } from "@/data";
import { createMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  return createMetadata({
    title: "Tentang Kami",
    description:
      "Mitra teknologi digital untuk akselerasi pertumbuhan bisnis Anda melalui Web Studio (website modern) dan System Lab (sistem kasir cloud POS).",
    path: "/tentang-kami",
  });
}

export default function TentangKamiPage() {
  const { hero, stats, services, values } = ABOUT_COMPACT;

  const valueIcons = {
    zap: <Zap className="h-5 w-5 text-cyan-400" />,
    target: <Target className="h-5 w-5 text-blue-400" />,
    shield: <ShieldCheck className="h-5 w-5 text-emerald-400" />,
    handshake: <HeartHandshake className="h-5 w-5 text-cyan-300" />,
  };

  return (
    <div className="relative min-h-screen pt-20 pb-20 overflow-hidden">
      {/* Ambient background glows matching other pages & logo */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute left-1/2 top-10 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-blue-600/10 blur-[150px]" />
        <div className="absolute right-1/4 top-1/2 h-[450px] w-[450px] rounded-full bg-cyan-500/10 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-28">
        {/* ========================================================= */}
        {/* 1. HERO SECTION (Ringkas & Langsung ke Inti)              */}
        {/* ========================================================= */}
        <section className="text-center pt-8 sm:pt-14 max-w-3xl mx-auto">
          <Badge
            variant="outline"
            className="mb-4 bg-cyan-500/10 text-cyan-400 border-cyan-500/30 px-3 py-1 text-xs font-medium"
          >
            <Sparkles className="h-3.5 w-3.5 mr-1" />
            {hero.badge}
          </Badge>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {hero.title}{" "}
            <span className="gradient-text">{hero.titleHighlight}</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg leading-relaxed text-zinc-300/90 max-w-2xl mx-auto">
            {hero.description}
          </p>

          {/* 4 Kartu Stat Ringkas (shadcn Card) */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {stats.map((stat, idx) => (
              <Card
                key={idx}
                className="bg-slate-950/70 border-white/10 backdrop-blur-md p-4 text-center rounded-2xl hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs sm:text-sm font-semibold text-white">
                  {stat.label}
                </div>
                <div className="text-[11px] text-zinc-400">{stat.sub}</div>
              </Card>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 2. LAYANAN & JASA SPESIALIS (Web Studio & System Lab)     */}
        {/* ========================================================= */}
        <section>
          <SectionHeader
            badge="Layanan Utama"
            title="Dua Pilar Layanan"
            titleHighlight="Yang Kami Tawarkan"
            description="Solusi teknologi terpadu: dari tampilan web modern berkonversi hingga sistem kasir & operasional cloud."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {services.map((svc) => {
              const logoSrc = DIVISION_LOGOS[svc.slug as "web-studio" | "system-lab"];

              return (
                <BorderGlow key={svc.id} glowColor={svc.accentColor} glowIntensity={0.6}>
                  <Card className="h-full flex flex-col justify-between bg-slate-950/85 border-white/10 backdrop-blur-2xl rounded-3xl p-6 sm:p-8">
                    <div>
                      {/* Header Kartu: Badge & Logo */}
                      <CardHeader className="p-0 mb-5">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="relative h-12 w-12 shrink-0 rounded-2xl bg-white/5 border border-white/10 p-2 flex items-center justify-center">
                              <Image
                                src={logoSrc}
                                alt={svc.title}
                                width={48}
                                height={48}
                                className="h-full w-full object-contain filter drop-shadow"
                              />
                            </div>
                            <div>
                              <Badge className={svc.badgeClass}>
                                {svc.badge}
                              </Badge>
                              <CardTitle className="text-2xl font-bold text-white mt-1">
                                {svc.title}
                              </CardTitle>
                            </div>
                          </div>
                        </div>

                        <div className="mt-3 text-sm font-semibold text-zinc-200">
                          {svc.tagline}
                        </div>

                        <CardDescription className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                          {svc.description}
                        </CardDescription>
                      </CardHeader>

                      <hr className="border-white/10 my-4" />

                      {/* Poin-Poin Inti Layanan */}
                      <CardContent className="p-0 space-y-2.5">
                        <div className="text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-2">
                          Fitur & Cakupan Jasa:
                        </div>

                        {svc.points.map((pt, pIdx) => (
                          <div
                            key={pIdx}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300"
                          >
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-400 mt-0.5" />
                            <div>
                              <span className="font-semibold text-white">
                                {pt.label}:{" "}
                              </span>
                              <span className="text-zinc-400">{pt.desc}</span>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </div>

                    {/* Footer: Tech Badges & CTA Button */}
                    <CardFooter className="p-0 mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-1.5">
                        {svc.techStack.map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="text-[11px] font-mono bg-white/5 border-white/10 text-zinc-300"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <Link href={svc.href} className="w-full sm:w-auto">
                        <Button size="sm" className="w-full sm:w-auto gap-1.5">
                          <span>Detail Layanan</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </BorderGlow>
              );
            })}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 3. KEUNGGULAN ANTRONIX (4 Poin Inti)                      */}
        {/* ========================================================= */}
        <section>
          <SectionHeader
            badge="Nilai Unggulan"
            title="Mengapa Memilih"
            titleHighlight="Antronix?"
            description="Standar kualitas tanpa kompromi untuk memastikan solusi digital Anda sukses di pasaran."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((val, idx) => (
              <Card
                key={idx}
                className="bg-slate-950/70 border-white/10 p-5 rounded-2xl hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="mb-3 inline-flex p-2.5 rounded-xl bg-white/5 border border-white/10">
                    {valueIcons[val.icon as keyof typeof valueIcons]}
                  </div>
                  <CardTitle className="text-base font-bold text-white mb-1.5">
                    {val.title}
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {val.description}
                  </CardDescription>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 4. KONTAK & KONSULTASI LANGSUNG (#contact)                */}
        {/* ========================================================= */}
        <section id="contact" className="pt-6">
          <SectionHeader
            badge="Konsultasi Proyek"
            title="Mulai Konsultasi"
            titleHighlight="Proyek Anda"
            description="Diskusikan kebutuhan website modern atau sistem kasir cloud bisnis Anda langsung bersama kami."
          />

          <ContactGrid />
        </section>
      </div>
    </div>
  );
}
