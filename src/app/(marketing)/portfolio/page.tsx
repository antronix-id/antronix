import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PortfolioGallery } from "@/components/sections/portfolio-gallery";
import { PortfolioHero } from "@/components/sections/portfolio-hero";
import { PORTFOLIO } from "@/data";
import { createMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  return createMetadata({
    title: "Portofolio",
    description:
      "Jelajahi koleksi proyek yang telah kami bangun, untuk berbagai klien di seluruh Indonesia.",
    path: "/portfolio",
  });
}

export default function PortfolioPage() {
  return (
    <>
      <PortfolioHero />
      <PortfolioGallery items={PORTFOLIO} />

      {/* CTA SECTION */}
      <section className="relative py-16 sm:py-24 border-t border-white/5">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="rounded-3xl bg-slate-950 p-8 sm:p-14 text-center border border-white/10 backdrop-blur-2xl">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Tertarik Membangun Proyek Serupa?
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Konsultasikan ide dan visi Anda bersama tim pengembang Antronix. Kami siap mewujudkan solusi digital berkualitas tinggi untuk bisnis Anda.
            </p>
            <div className="mt-8 flex justify-center">
              <Link href="/kontak">
                <Button size="lg">
                  <span>Mulai Konsultasi Proyek</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
