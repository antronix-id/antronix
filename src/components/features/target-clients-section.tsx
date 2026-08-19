"use client";

import React from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { SectionHeader } from "@/components/shared/section-header";

interface TargetClient {
  id: string;
  title: string;
  image: string;
}

const TARGET_CLIENTS: TargetClient[] = [
  { id: "kafe-coffeeshop", title: "Kafe & Coffee Shop", image: "/icon/Kafe & Coffee Shop.avif" },
  { id: "toko-skincare", title: "Toko Skincare & Kecantikan", image: "/icon/Toko Skincare & Kecantikan.avif" },
  { id: "sekolah-pendidikan", title: "Sekolah & Lembaga Pendidikan", image: "/icon/Sekolah & Lembaga Pendidikan.avif" },
  { id: "klinik-kesehatan", title: "Klinik & Layanan Kesehatan", image: "/icon/Klinik & Layanan Kesehatan.avif" },
  { id: "toko-fashion", title: "Toko Fashion & Distro", image: "/icon/Toko Fashion & Distro.avif" },
  { id: "bengkel-otomotif", title: "Bengkel & Otomotif", image: "/icon/Bengkel & Otomotif.avif" },
  { id: "hotel-penginapan", title: "Hotel & Penginapan", image: "/icon/Hotel & Penginapan.avif" },
  { id: "supermarket-retail", title: "Supermarket & Retail", image: "/icon/Supermarket & Retail.avif" },
  { id: "agensi-konsultan", title: "Agensi & Konsultan", image: "/icon/Agensi & Konsultan.avif" },
  { id: "restoran-catering", title: "Restoran & Catering", image: "/icon/Restoran & Catering.avif" },
  { id: "barbershop-salon", title: "Barbershop & Salon", image: "/icon/Barbershop & Salon.avif" },
  { id: "realestate-properti", title: "Real Estate & Properti", image: "/icon/Real Estate & Propertii.avif" }
];

export function HomeTargetClientsSection() {
  return (
    <section
      id="target-clients"
      className="relative py-20 sm:py-28 overflow-hidden bg-background"
    >
      {/* Subtle Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[900px] rounded-full bg-primary/5 blur-[160px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeader
          badge="Target Klien & Segmen Bisnis"
          title="Siapa Saja yang Membutuhkan"
          titleHighlight="Solusi Antronix?"
          description="Solusi teknologi dan kreatif yang dirancang spesifik untuk menjawab kebutuhan operasional serta pertumbuhan berbagai segmen bisnis."
        />

        {/* 3D TILT CARDS GRID (Symmetrical 12 items: 4 cols x 3 rows on desktop) */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 items-stretch perspective-[1000px]">
          {TARGET_CLIENTS.map((client, index) => (
            <TiltCard key={client.id} client={client} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Tilt 3D Profile / Client Card ---------- */

function TiltCard({ client, index }: { client: TargetClient; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative h-full w-full cursor-pointer"
    >
      {/* Outer Card Shell with 3D Depth */}
      <div
        style={{ transform: "translateZ(30px)" }}
        className="absolute inset-0 rounded-4xl bg-neutral-900/90 border border-neutral-800 shadow-2xl transition-all duration-500 group-hover:border-neutral-700 group-hover:bg-neutral-800/90 group-hover:shadow-[0_0_50px_-10px_rgba(255,255,255,0.15)] flex flex-col items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
      </div>

      {/* Border glow */}
      <div
        style={{ transform: "translateZ(40px)" }}
        className="absolute inset-0 rounded-4xl ring-1 ring-inset ring-white/10 transition-colors duration-300 group-hover:ring-white/30 pointer-events-none"
      />

      {/* Content Container (Image + Floating Title in 3D Space) */}
      <div
        style={{ transform: "translateZ(60px)" }}
        className="relative z-10 flex flex-col items-center justify-center text-center h-full p-6 sm:p-8 min-h-[220px] pointer-events-none"
      >
        {/* Large 3D Icon Image */}
        <div className="relative mb-4 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl opacity-40 group-hover:opacity-80 group-hover:scale-125 transition-all duration-500" />
          
          <div className="relative h-24 w-24 sm:h-28 sm:w-28 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1">
            <Image
              src={client.image}
              alt={client.title}
              width={128}
              height={128}
              priority={index < 4}
              className="h-full w-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)] relative z-10"
            />
          </div>
        </div>

        {/* 3D Floating Title */}
        <div style={{ transform: "translateZ(20px)" }}>
          <h3 className="text-sm sm:text-base font-bold leading-tight text-neutral-200 drop-shadow-md transition-colors duration-300 group-hover:text-white">
            {client.title}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}







