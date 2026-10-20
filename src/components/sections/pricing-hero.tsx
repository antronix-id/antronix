"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, CreditCard, Code2 } from "lucide-react";

const VALUE_PROPOSITIONS = [
  {
    icon: ShieldCheck,
    title: "Garansi Teknis 30–90 Hari",
    description: "Perbaikan bug gratis dan pemeliharaan teknis pasca peluncuran untuk memastikan sistem 100% stabil.",
    badge: "Bebas Risiko",
  },
  {
    icon: CreditCard,
    title: "Skema Pembayaran Fleksibel",
    description: "Pembayaran transparan dengan skema DP 50% di awal dan 50% sisanya setelah sistem selesai dan disetujui.",
    badge: "Transparan",
  },
  {
    icon: Code2,
    title: "100% Kepemilikan Penuh",
    description: "Seluruh hak cipta, source code, aset digital, serta akses server diserahkan sepenuhnya kepada Anda.",
    badge: "Hak Milik Klien",
  },
];

/**
 * Hero halaman pricing: judul + tiga kartu nilai. Animasi masuk berjalan di
 * klien, jadi blok ini dipisah dari page.tsx.
 */
export function PricingHero() {
  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-4 bg-white/10 text-slate-300 border-white/20 px-3.5 py-1 rounded-full text-xs font-medium">
            Transparansi Biaya & Nilai Nyata
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl leading-tight text-white">
            Investasi Terukur untuk{" "}
            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Akselerasi Bisnis Anda
            </span>
          </h1>
          <p className="mt-6 text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Pilih paket layanan pembuatan website modern atau arsitektur sistem full-stack yang sesuai dengan kebutuhan operasional dan skala pertumbuhan bisnis Anda. Tanpa biaya tersembunyi.
          </p>
        </motion.div>

        {/* 3 Value Propositions Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
          {VALUE_PROPOSITIONS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * idx }}
                className="rounded-2xl border border-white/10 bg-slate-950/60 p-6 backdrop-blur-xl hover:border-white/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-400/15 border border-slate-300/30 text-white shadow-md">
                      <Icon className="h-5 w-5 text-slate-200" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-300 border border-slate-400/30 bg-slate-400/10 px-2.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
