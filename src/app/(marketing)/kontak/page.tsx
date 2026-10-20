import type { Metadata } from "next";
import { SectionHeader } from "@/components/layout/section-header";
import { ContactGrid } from "@/components/sections/contact-grid";
import { createMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  return createMetadata({
    title: "Kontak",
    description:
      "Diskusikan kebutuhan proyek Anda dengan tim spesialis kami. Kami siap memberikan solusi teknologi terbaik untuk akselerasi pertumbuhan bisnis Anda.",
    path: "/kontak",
  });
}

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
          <ContactGrid />
        </div>
      </section>
    </div>
  );
}
