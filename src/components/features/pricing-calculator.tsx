"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LiquidMetalButton } from "@/components/animations/liquid-metal-button";
import { Badge } from "@/components/ui/badge";
import { BorderGlow } from "@/components/animations/border-glow";
import { Check, MessageCircle, Zap } from "lucide-react";
import { SERVICES, AGENCY } from "@/lib/constants";
import { cn } from "@/lib/utils";

const divisionLogos: Record<string, string> = {
  "web-studio": "/Web-Studio.avif",
  "ai-media-lab": "/Media-Lab.avif",
  "system-lab": "/System-Lab.avif",
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
  const [servicesList, setServicesList] = useState(SERVICES);
  const [selectedServiceId, setSelectedServiceId] = useState<string>("web-studio");

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setServicesList(data);
        }
      })
      .catch((err) => console.error("Error fetching services in calculator:", err));
  }, []);

  const activeService =
    servicesList.find((s) => s.id === selectedServiceId || s.slug === selectedServiceId) ||
    servicesList[0];

  const handleWhatsApp = (tierName: string) => {
    const serviceName = activeService.title;
    const message = encodeURIComponent(
      `Halo ${AGENCY.name}! 👋\n\nSaya berminat dengan *${serviceName}* - Paket *${tierName}*.\n\nBisa dibantu untuk konsultasi detail dan alur pengerjaannya?`
    );
    window.open(`https://wa.me/${AGENCY.whatsapp}?text=${message}`, "_blank");
  };

  return (
    <div className="w-full space-y-10">
      {/* Service Division Tabs Selector - 2 Top (Left/Right) + 1 Bottom Centered on Mobile */}
      <div className="grid grid-cols-2 sm:flex sm:flex-row items-center justify-center gap-2.5 sm:gap-3 w-full max-w-sm sm:max-w-none mx-auto px-2">
        {servicesList.map((service, index) => {
          const serviceKey = String(service.id || service.slug);
          const logoSrc = service.logo || divisionLogos[serviceKey] || divisionLogos[service.slug] || "/Web-Studio.avif";

          return (
            <div
              key={serviceKey}
              className={cn(
                "flex justify-center sm:w-auto",
                index === 2 ? "col-span-2 justify-center" : "col-span-1"
              )}
            >
              <LiquidMetalButton
                onClick={() => setSelectedServiceId(serviceKey)}
                className="w-full sm:w-auto justify-center"
              >
                <Image
                  src={logoSrc}
                  alt={service.title}
                  width={20}
                  height={20}
                  className="h-5 w-5 object-contain filter drop-shadow-sm shrink-0"
                />
                <span className="whitespace-nowrap text-xs sm:text-sm">{service.shortTitle || service.title}</span>
              </LiquidMetalButton>
            </div>
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
              <div key={tier.name} className="group cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:-rotate-1 h-full w-full relative">
                <div className="text-white rounded-3xl border border-slate-400/30 bg-gradient-to-br from-[#010101] via-[#090909] to-[#010101] shadow-2xl relative backdrop-blur-xl overflow-hidden hover:border-slate-200/60 hover:shadow-slate-300/10 hover:shadow-3xl w-full h-full p-5 sm:p-6 lg:p-8 flex flex-col justify-between">
                  {/* Background ambient lighting & animated effects */}
                  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-400/10 via-transparent to-white/5 opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                    <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-gradient-to-tr from-slate-300/20 to-transparent blur-3xl opacity-30 group-hover:opacity-50 transform group-hover:scale-110 transition-all duration-700 animate-bounce" />
                    <div className="absolute top-10 left-10 w-16 h-16 rounded-full bg-slate-300/15 blur-xl animate-ping" />
                    <div className="absolute bottom-16 right-16 w-12 h-12 rounded-full bg-white/5 blur-lg animate-ping" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-300/20 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
                    <div>
                      {/* Tier Title & Description */}
                      <h3 className="text-xl font-bold text-white mb-1.5 group-hover:text-slate-100 transition-colors">{tier.name}</h3>
                      <p className="text-xs text-zinc-400 leading-relaxed mb-6 group-hover:text-zinc-300 transition-colors">
                        {tier.description}
                      </p>

                      {/* Price Header */}
                      <div className="mb-6 pb-6 border-b border-white/10">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-sm font-semibold text-slate-300">Rp</span>
                          <motion.span
                            key={tier.name + tier.price}
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-2xl sm:text-3xl font-extrabold text-white"
                          >
                            {finalPriceNumber > 0
                              ? `${new Intl.NumberFormat("id-ID").format(finalPriceNumber)}${tier.price.includes("+") ? "+" : ""}`
                              : tier.price}
                          </motion.span>
                        </div>
                        <div className="mt-1 text-[11px] text-zinc-400 font-medium">
                          Estimasi pengerjaan per proyek
                        </div>
                      </div>

                      {/* Feature List */}
                      <ul className="space-y-3">
                        {tier.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2.5 text-xs text-zinc-300">
                            <Check className="h-4 w-4 shrink-0 text-slate-300 mt-0.5" />
                            <span className="leading-relaxed group-hover:text-zinc-200 transition-colors">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <div className="w-full flex justify-center pt-4 border-t border-white/10">
                      <LiquidMetalButton
                        onClick={() => handleWhatsApp(tier.name)}
                      >
                        <MessageCircle className="h-4 w-4 text-slate-300" />
                        <span>Pilih Paket {tier.name}</span>
                      </LiquidMetalButton>
                    </div>
                  </div>

                  {/* Decorative Glass Corners */}
                  <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-slate-300/20 to-transparent rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-slate-300/20 to-transparent rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

