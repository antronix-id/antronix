"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Check, MessageCircle, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BorderGlow } from "@/components/ui/border-glow";
import { SectionHeader } from "@/components/shared/section-header";
import { PortfolioCard } from "@/components/features/portfolio-card";
import { AnimatedBackground } from "@/components/react-bits/animated-background";
import { SERVICES, PORTFOLIO, AGENCY } from "@/lib/constants";
import { cn } from "@/lib/utils";

const service = SERVICES.find((s) => s.id === "ai-media-lab")!;
const relatedPortfolio = PORTFOLIO.filter((p) => p.category === "ai-media-lab").slice(0, 3);

export default function AIMediaLabPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-center overflow-hidden">
        <div className="pointer-events-none absolute -left-40 top-1/4 h-80 w-80 rounded-full bg-purple-500 opacity-10 blur-[100px]" />
        <div className="pointer-events-none absolute -right-40 bottom-1/4 h-80 w-80 rounded-full bg-pink-500 opacity-10 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-32 lg:px-8 lg:py-40">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Home
            </Link>
          </motion.div>

          <div className="max-w-3xl">

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            >
              Konten Media{" "}
              <span className="gradient-text">
                Powered by AI
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-lg leading-relaxed text-muted-foreground"
            >
              {service.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex flex-col gap-4 sm:flex-row"
            >
              <Button
                asChild
                size="lg"
                className="brand-gradient-btn text-white font-semibold border-0 shadow-lg"
              >
                <Link href={AGENCY.socials.whatsapp} target="_blank">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Mulai Produksi AI
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#pricing">
                  Lihat Harga
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader
            badge="Features"
            title="Kekuatan"
            titleHighlight="AI Media Lab"
            description="Produksi konten media berkualitas tinggi dengan teknologi AI terdepan."
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {service.features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="h-full"
              >
                <BorderGlow className="group h-full transition-all duration-300">
                  <div className="p-6 h-full flex flex-col justify-between">
                    <div>
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 transition-colors group-hover:from-purple-500/30 group-hover:to-pink-500/30">
                        <Sparkles className="h-6 w-6 text-purple-400" />
                      </div>
                      <h3 className="mb-2 font-bold">{feature.title}</h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </BorderGlow>
              </motion.div>
            ))}
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
                  <BorderGlow className="relative h-full transition-all duration-300">
                    {tier.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                        <Badge className="border-0 brand-gradient-btn text-white text-xs rounded-full px-3 py-1">
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    <div className="p-6 lg:p-8 flex flex-col justify-between h-full">
                      <div>
                        <h3 className="mb-1 text-xl font-bold">{tier.name}</h3>
                        <p className="mb-4 text-sm text-muted-foreground">{tier.description}</p>
                        <div className="mb-6">
                          <span className="text-3xl font-bold gradient-text">
                            Rp {tier.price}
                          </span>
                        </div>
                        <ul className="mb-8 space-y-3">
                          {tier.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-2 text-sm">
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-purple-400" />
                              <span className="text-muted-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Button
                        asChild
                        className={cn(
                          "w-full rounded-full font-semibold",
                          tier.popular
                            ? "brand-gradient-btn text-white border-0"
                            : "bg-secondary text-foreground hover:bg-accent"
                        )}
                      >
                        <Link href={AGENCY.socials.whatsapp} target="_blank">
                          Pilih Paket
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </BorderGlow>
                </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Portfolio */}
      {relatedPortfolio.length > 0 && (
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <SectionHeader
              badge="Portfolio"
              title="Proyek"
              titleHighlight="AI Media Lab"
            />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPortfolio.map((item, index) => (
                <PortfolioCard key={item.id} item={item} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
