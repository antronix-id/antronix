"use client";

import { motion } from "framer-motion";
import { ContactForm } from "@/components/sections/contact-form";
import { LocationMap } from "@/components/mockups/location-map";

const OFFICE_MAP_PROPS = {
  center: [104.7565, -2.9845] as [number, number],
  zoom: 12.8,
  pitch: 0,
  bearing: 0,
  markers: [
    {
      lng: 104.7565,
      lat: -2.9845,
      label: "Antronix",
      popupTitle: "Antronix",
      icon: "hq" as const,
    },
  ],
};

/**
 * Form kontak + peta lokasi, berdampingan dengan animasi masuk per kolom.
 */
export function ContactGrid() {
  return (
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
          {...OFFICE_MAP_PROPS}
          className="min-h-[320px] sm:min-h-[480px]"
        />
      </motion.div>
    </div>
  );
}
