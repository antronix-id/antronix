"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NumberFlow from "@number-flow/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BorderGlow } from "@/components/ui/border-glow";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { Check, ArrowRight, ArrowLeft, MessageCircle, Sparkles } from "lucide-react";
import { SERVICES, AGENCY } from "@/lib/constants";
import { cn } from "@/lib/utils";

const PricingSwitch = ({ onSwitch }: { onSwitch: (isYearly: boolean) => void }) => {
  const [selected, setSelected] = useState<"monthly" | "yearly">("monthly");

  const handleSwitch = (type: "monthly" | "yearly") => {
    setSelected(type);
    onSwitch(type === "yearly");
  };

  return (
    <div className="flex justify-center my-6">
      <div className="relative z-10 mx-auto flex w-fit rounded-full bg-neutral-900/90 border border-primary/30 p-1.5 backdrop-blur-md shadow-xl">
        <button
          onClick={() => handleSwitch("monthly")}
          className={cn(
            "relative z-10 w-fit h-9 rounded-full sm:px-6 px-4 font-semibold transition-colors text-xs sm:text-sm",
            selected === "monthly" ? "text-white" : "text-muted-foreground"
          )}
        >
          {selected === "monthly" && (
            <motion.span
              layoutId="pricing-switch"
              className="absolute inset-0 h-full w-full rounded-full border border-primary/50 brand-gradient-btn shadow-lg shadow-primary/30"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative">Project Base</span>
        </button>

        <button
          onClick={() => handleSwitch("yearly")}
          className={cn(
            "relative z-10 w-fit h-9 flex-shrink-0 rounded-full sm:px-6 px-4 font-semibold transition-colors text-xs sm:text-sm",
            selected === "yearly" ? "text-white" : "text-muted-foreground"
          )}
        >
          {selected === "yearly" && (
            <motion.span
              layoutId="pricing-switch"
              className="absolute inset-0 h-full w-full rounded-full border border-primary/50 brand-gradient-btn shadow-lg shadow-primary/30"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative flex items-center gap-1.5">
            Retainer (Hemat 20%)
            <Sparkles className="h-3.5 w-3.5 text-yellow-300" />
          </span>
        </button>
      </div>
    </div>
  );
};

// Helper to parse price string to number for NumberFlow
function parseNumericPrice(priceStr: string): number {
  const cleanStr = priceStr.replace(/[^0-9]/g, "");
  return parseInt(cleanStr, 10) || 0;
}

export function PricingCalculator() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [isYearly, setIsYearly] = useState(false);

  const activeService = SERVICES.find((s) => s.id === selectedService);

  const handleWhatsApp = () => {
    const service = activeService?.title || "Unknown";
    const tier = selectedTier || "Unknown";
    const billingType = isYearly ? "Retainer / Tahunan" : "Project Base / Bulanan";
    const message = encodeURIComponent(
      `Halo ${AGENCY.name}! 👋\n\nSaya tertarik dengan layanan *${service}* paket *${tier}* (${billingType}).\n\nBisa tolong berikan informasi estimasi dan prosedur pengerjaannya?`
    );
    window.open(
      `https://wa.me/${AGENCY.whatsapp}?text=${message}`,
      "_blank"
    );
  };

  return (
    <div className="space-y-8">
      {/* Switch billing toggle */}
      <PricingSwitch onSwitch={(yearly) => setIsYearly(yearly)} />

      {/* Step 1 & 2 Container */}
      <AnimatePresence mode="wait">
        {!selectedService ? (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 gap-4 md:grid-cols-3"
          >
            {SERVICES.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="h-full"
              >
                <div onClick={() => setSelectedService(service.id)} className="h-full cursor-pointer">
                  <BorderGlow className="group h-full transition-all duration-300">
                    <div className="p-6 text-center h-full flex flex-col justify-between">
                      <div>
                        <div
                          className={cn(
                            "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br transition-transform group-hover:scale-110 shadow-lg",
                            service.gradient
                          )}
                        >
                          <span className="text-2xl text-white">
                            {service.icon === "globe"
                              ? "🌐"
                              : service.icon === "sparkles"
                              ? "✨"
                              : "⚙️"}
                          </span>
                        </div>
                        <h3 className="mb-2 font-bold text-lg">{service.title}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {service.shortDescription}
                        </p>
                      </div>
                    </div>
                  </BorderGlow>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Back button */}
            <button
              onClick={() => {
                setSelectedService(null);
                setSelectedTier(null);
              }}
              className="mb-6 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Pilih divisi layanan lain
            </button>

            {/* Service info */}
            <div className="mb-8 text-center">
              <Badge
                className={cn(
                  "mb-3 border-0 bg-gradient-to-r text-white rounded-full px-4 py-1",
                  activeService?.gradient
                )}
              >
                {activeService?.title}
              </Badge>
              <h3 className="text-3xl font-bold tracking-tight">
                <VerticalCutReveal splitBy="words" staggerDuration={0.1}>
                  Pilihan Paket Investasi
                </VerticalCutReveal>
              </h3>
            </div>

            {/* Pricing Tiers */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {activeService?.pricing.map((tier, index) => {
                const numericBasePrice = parseNumericPrice(tier.price);
                const finalPrice = isYearly
                  ? Math.round(numericBasePrice * 0.8)
                  : numericBasePrice;

                return (
                  <motion.div
                    key={tier.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="h-full"
                  >
                    <div onClick={() => setSelectedTier(tier.name)} className="h-full cursor-pointer">
                      <BorderGlow
                        className={cn(
                          "relative h-full transition-all duration-300",
                          selectedTier === tier.name && "ring-2 ring-primary"
                        )}
                      >
                        {tier.popular && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                            <Badge className="border-0 brand-gradient-btn text-white text-xs rounded-full px-3 py-1 shadow-lg">
                              Paling Populer
                            </Badge>
                          </div>
                        )}
                        <div className="p-6 lg:p-8 h-full flex flex-col justify-between">
                          <div>
                            <h4 className="mb-1 text-xl font-bold">{tier.name}</h4>
                            <p className="mb-4 text-xs text-muted-foreground leading-relaxed">
                              {tier.description}
                            </p>

                            {/* Price with NumberFlow */}
                            <div className="mb-6 flex items-baseline gap-1">
                              <span className="text-sm font-semibold text-muted-foreground">Rp</span>
                              <span className="text-3xl font-bold gradient-text">
                                <NumberFlow
                                  value={finalPrice}
                                  format={{
                                    useGrouping: true,
                                  }}
                                />
                              </span>
                              <span className="text-xs text-muted-foreground ml-1 font-normal">
                                {isYearly ? "/bln (ret.)" : "/proyek"}
                              </span>
                            </div>

                            <ul className="space-y-3 pt-2 border-t border-border/40">
                              {tier.features.map((feature) => (
                                <li
                                  key={feature}
                                  className="flex items-start gap-2 text-sm"
                                >
                                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                  <span className="text-muted-foreground text-xs leading-relaxed">
                                    {feature}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </BorderGlow>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}
            <AnimatePresence>
              {selectedTier && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-8 text-center"
                >
                  <div className="flex items-center justify-center">
                    <Button
                      onClick={handleWhatsApp}
                      size="lg"
                      className="brand-gradient-btn px-8"
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Konsultasi Paket {selectedTier}
                    </Button>
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">
                    Free konsultasi awal — tanpa komitmen
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
