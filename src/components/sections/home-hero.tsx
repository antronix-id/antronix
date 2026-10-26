"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SplitText, GradientText } from "@/components/effects/animated-text";
import { IMAGES, VIDEOS } from "@/data";

/**
 * Hero beranda: judul beranimasi, CTA, dan mockup laptop berisi video loop.
 * Semua animasi masuk ada di sisi klien, jadi blok ini dipisah dari page.tsx.
 */
export function HomeHero() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden -mt-16 sm:-mt-20 pt-20 sm:pt-32 lg:pt-52 pb-36 sm:pb-48 lg:pb-64">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-12 lg:items-center mt-0 sm:mt-8">
          {/* Left Content */}
          <div className="order-2 lg:order-1 lg:col-span-6 xl:col-span-6 text-center lg:text-left z-10 -mt-10 sm:-mt-14 lg:mt-0">
            {/* Headline */}
            <h1 className="text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl leading-tight sm:leading-none">
              <SplitText text="Solusi Digital" delay={0.3} />
              <br />
              <SplitText text="Terdepan Untuk" delay={0.5} />
              <br />
              <GradientText
                text="Akselerasi Bisnis"
                className="text-3xl sm:text-5xl lg:text-6xl font-bold"
              />
            </h1>

            {/* Sub-headline */}
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground max-w-xl mx-auto lg:mx-0">
              Antronix hadir membantu Anda mengubah tantangan bisnis menjadi peluang dengan
              layanan Web Studio dan System Lab terbaik
            </p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 sm:mt-10 flex flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-4 w-full max-w-md mx-auto lg:mx-0"
            >
            </motion.div>
          </div>

          {/* Right Hero Image Showcase */}
          <div className="order-1 lg:order-2 lg:col-span-6 xl:col-span-6 relative mt-0 lg:mt-0 flex justify-center lg:justify-end items-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative w-full max-w-md sm:max-w-xl lg:max-w-3xl xl:max-w-4xl mx-auto transform translate-x-0 lg:translate-x-20 xl:translate-x-28 translate-y-0 lg:translate-y-8 lg:scale-110 xl:scale-125 origin-center lg:origin-bottom-right"
            >
              {/* Hero Image Container */}
              <div className="relative w-full flex justify-center lg:justify-end">
                <div className="relative w-full overflow-hidden">
                  {/* Video inside laptop screen */}
                  <div
                    className="absolute z-0 overflow-hidden bg-black rounded-t-[4px]"
                    style={{
                      top: "8.6%",
                      left: "23.35%",
                      width: "53.0%",
                      height: "47.5%",
                    }}
                  >
                    <video
                      src={VIDEOS.heroLoop}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="auto"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Laptop Frame Image */}
                  <Image
                    src={IMAGES.handsOnLaptop}
                    alt="Antronix Laptop Showcase"
                    width={1100}
                    height={850}
                    priority
                    className="relative z-10 w-full h-auto object-contain pointer-events-none"
                    style={{
                      maskImage: "linear-gradient(to bottom, black 40%, transparent 95%)",
                      WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 95%)"
                    }}
                  />

                  {/* Bottom Shadow Fade Gradient Overlay */}
                  <div className="pointer-events-none absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-background via-background/90 to-transparent z-20" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
