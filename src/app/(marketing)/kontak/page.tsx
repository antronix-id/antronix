"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/shared/section-header";
import { ContactForm } from "@/components/features/contact-form";
import { LocationMap } from "@/components/mockups/location-map";

export default function ContactPage() {
  return (
    <div className="relative min-h-screen pt-20 pb-20">
      {/* Background glowing effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-[oklch(0.5_0.18_270)] opacity-5 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-[oklch(0.5_0.2_310)] opacity-5 blur-[120px]" />
      </div>

      <section id="contact" className="relative py-12 sm:py-20">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          {/* Centered Section Header */}
          <SectionHeader
            title="Siap Memulai Proyek"
            titleHighlight="Digital Anda?"
            description="Diskusikan kebutuhan proyek Anda dengan tim spesialis kami. Kami siap memberikan solusi teknologi terbaik untuk akselerasi pertumbuhan bisnis Anda."
          />

          {/* 2-Column Grid: Contact Form & Location Map */}
          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2 max-w-7xl mx-auto items-stretch">
            {/* Contact Form Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col h-full"
            >
              <ContactForm />
            </motion.div>

            {/* Location Map Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative flex flex-col h-full min-h-[320px] sm:min-h-[480px] rounded-3xl overflow-hidden border border-white/10 bg-slate-950 shadow-2xl"
            >
              <LocationMap
                center={[104.7565, -2.9845]}
                zoom={12.8}
                pitch={0}
                bearing={0}
                markers={[
                  {
                    lng: 104.7565,
                    lat: -2.9845,
                    label: "Antronix",
                    popupTitle: "Antronix",
                    icon: "hq",
                  },
                ]}
                className="min-h-[320px] sm:min-h-[480px]"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
