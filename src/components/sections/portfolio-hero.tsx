"use client";

import { motion } from "framer-motion";

/**
 * Judul halaman portofolio. Dipisah dari page.tsx supaya route-nya bisa
 * menjadi Server Component; animasi masuk memang wajib berjalan di klien.
 */
export function PortfolioHero() {
  return (
    <section className="relative pt-24 sm:pt-32 pb-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-6xl text-foreground">
            Portofolio <span className="gradient-text">Antronix</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Jelajahi koleksi proyek yang telah kami bangun, untuk berbagai klien di seluruh Indonesia.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
