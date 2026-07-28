"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import NumberFlow from "@number-flow/react";
import { Button } from "@/components/ui/button";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { Badge } from "@/components/ui/badge";
import { BorderGlow } from "@/components/ui/border-glow";
import { Check, MessageCircle, Zap } from "lucide-react";
import { SERVICES, AGENCY } from "@/lib/constants";
import { cn } from "@/lib/utils";

const divisionLogos: Record<string, string> = {
  "web-studio": "/Web-Studio.png",
  "ai-media-lab": "/Media-Lab.png",
  "system-lab": "/System-Lab.png",
};

function parsePriceToNumber(priceStr: string): number {
  if (priceStr.includes("Juta")) {
    const clean = priceStr.replace("Juta", "").replace("+", "").trim();
    const val = parseFloat(clean);
    return isNaN(val) ? 0 : Math.round(val * 1000000);
  }
  const cleanStr = priceStr.replace(/[^0-9]/g, "");
  return parseInt(cleanStr, 10) || 0;
}

export function PricingCalculator() {
  const [selectedServiceId, setSelectedServiceId] = useState<string>("web-studio");

  const activeService = SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];

  const handleWhatsApp = (tierName: string) => {
    const serviceName = activeService.title;
    const message = encodeURIComponent(
      `Halo ${AGENCY.name}! 👋\n\nSaya berminat dengan *${serviceName}* - Paket *${tierName}*.\n\nBisa dibantu untuk konsultasi detail dan alur pengerjaannya?`
    );
    window.open(`https://wa.me/${AGENCY.whatsapp}?text=${message}`, "_blank");
  };

  return (
    <div className="w-full space-y-10">
      {/* Service Division Tabs Selector */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {SERVICES.map((service) => {
          const logoSrc = service.logo || divisionLogos[service.id] || "/Web-Studio.png";
          const isSelected = selectedServiceId === service.id;

          return (
            <LiquidMetalButton
              key={service.id}
              onClick={() => setSelectedServiceId(service.id)}
            >
              <Image
                src={logoSrc}
                alt={service.title}
                width={20}
                height={20}
                className="h-5 w-5 object-contain filter drop-shadow-sm"
              />
              <span>{service.shortTitle || service.title}</span>
            </LiquidMetalButton>
          );
        })}
      </div>

      {/* Active Service Description */}
      <motion.div
        key={activeService.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center max-w-2xl mx-auto"
      >
        <p className="text-sm text-muted-foreground leading-relaxed">
          {activeService.description}
        </p>
      </motion.div>

      {/* Pricing Cards Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeService.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {activeService.pricing.map((tier) => {
            const finalPriceNumber = parsePriceToNumber(tier.price);

            return (
              <BorderGlow
                key={tier.name}
                className={cn(
                  "relative h-full transition-all duration-300",
                  tier.popular ? "border-cyan-500/50 shadow-2xl shadow-cyan-500/10" : ""
                )}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                    <Badge className="border-0 brand-gradient-btn text-white text-xs font-semibold rounded-full px-3.5 py-1 shadow-lg">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <div className="p-6 lg:p-8 flex flex-col justify-between h-full space-y-6">
                  <div>
                    {/* Tier Title & Description */}
                    <h3 className="text-xl font-bold text-white mb-1.5">{tier.name}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                      {tier.description}
                    </p>

                    {/* Price Header */}
                    <div className="mb-6 pb-6 border-b border-white/10">
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm font-semibold text-cyan-400">Rp</span>
                        <span className="text-3xl font-extrabold bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                          <NumberFlow
                            value={finalPriceNumber}
                            format={{ useGrouping: true }}
                          />
                        </span>
                      </div>
                      <div className="mt-1 text-[11px] text-muted-foreground font-medium">
                        Estimasi pengerjaan per proyek
                      </div>
                    </div>

                    {/* Feature List */}
                    <ul className="space-y-3">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-xs text-slate-300">
                          <Check className="h-4 w-4 shrink-0 text-cyan-400 mt-0.5" />
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <div className="w-full flex justify-center pt-2">
                    <LiquidMetalButton
                      onClick={() => handleWhatsApp(tier.name)}
                      className="w-full"
                    >
                      <MessageCircle className="h-4 w-4 text-emerald-400" />
                      <span>Pilih Paket {tier.name}</span>
                    </LiquidMetalButton>
                  </div>
                </div>
              </BorderGlow>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

