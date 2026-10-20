"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/layout/section-header";
import { AGENCY } from "@/data";
import type { Service } from "@/types";

/** Kartu paket harga per divisi + CTA WhatsApp */
export function ServicePricingTiers({ service }: { service: Service }) {
  const openWhatsApp = (tierName: string) => {
    const message = encodeURIComponent(
      `Halo ${AGENCY.name}! 👋\n\nSaya berminat dengan *${service.title}* - Paket *${tierName}*.\n\nBisa dibantu untuk konsultasi detail?`
    );
    window.open(`https://wa.me/${AGENCY.whatsapp}?text=${message}`, "_blank");
  };

  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          badge="Pricing"
          title="Paket"
          titleHighlight={service.title}
          description={service.page.pricingDescription}
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
              <div className="group cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:-rotate-1 h-full w-full relative">
                <div className="text-white rounded-3xl border border-slate-400/30 bg-gradient-to-br from-[#010101] via-[#090909] to-[#010101] shadow-2xl relative backdrop-blur-xl overflow-hidden hover:border-slate-200/60 hover:shadow-slate-300/10 hover:shadow-3xl w-full h-full p-6 lg:p-8 flex flex-col justify-between">
                  {/* Background ambient lighting & animated effects */}
                  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-400/10 via-transparent to-white/5 opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
                    <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-gradient-to-tr from-slate-300/20 to-transparent blur-3xl opacity-30 group-hover:opacity-50 transform group-hover:scale-110 transition-all duration-700 animate-bounce" />
                    <div className="absolute top-10 left-10 w-16 h-16 rounded-full bg-slate-300/15 blur-xl animate-ping" />
                    <div className="absolute bottom-16 right-16 w-12 h-12 rounded-full bg-white/5 blur-lg animate-ping" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-300/20 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex flex-col justify-between h-full">
                    <div>
                      <h3 className="mb-1 text-xl font-bold text-white group-hover:text-slate-100 transition-colors">{tier.name}</h3>
                      <p className="mb-4 text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">
                        {tier.description}
                      </p>
                      <div className="mb-6">
                        <span className="text-3xl font-bold bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                          Rp {tier.price}
                        </span>
                      </div>
                      <ul className="mb-8 space-y-3">
                        {tier.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2 text-sm">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-slate-300" />
                            <span className="text-zinc-300 group-hover:text-zinc-200 transition-colors">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="w-full flex justify-center pt-4 border-t border-white/10">
                      <Button onClick={() => openWhatsApp(tier.name)} className="w-full">
                        <span>Pilih Paket {tier.name}</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Decorative Glass Corners */}
                  <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-slate-300/20 to-transparent rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-slate-300/20 to-transparent rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
