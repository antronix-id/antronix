"use client";

import { ClientPlates } from "@/components/ui/engraved-client-plates";

/**
 * Seksi Plat Logam Klien & Portofolio (Engraved Client Plates) di bawah hero beranda.
 * Tampilan minimalis tanpa teks judul & tanpa background groove, bergerak halus dalam mode drift.
 */
export function ClientLogosSection() {
  return (
    <section
      id="clients"
      aria-label="Klien dan mitra terpercaya"
      className="relative overflow-hidden py-4 sm:py-6"
    >
      <ClientPlates
        count={8}
        motion="drift"
        speed={35}
        stats={true}
        fixing="mixed"
        finish="auto"
        hideHeader={true}
      />
    </section>
  );
}
