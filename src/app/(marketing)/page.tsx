import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BorderGlow } from "@/components/effects/border-glow";
import { SectionHeader } from "@/components/layout/section-header";
import { HomeHero } from "@/components/sections/home-hero";
import { ClientLogosSection } from "@/components/sections/client-logos";
import { ProblemSolutionSection } from "@/components/sections/problem-solution";
import InkOrbitFeatures from "@/components/ui/ink-orbit-features";
import { ServiceCard } from "@/components/sections/service-card";
import { TestimonialsSection } from "@/components/sections/testimonial-marquee";
import { SERVICES } from "@/data";
import { SITE } from "@/config/site";
import { createMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
  return createMetadata({ description: SITE.description, path: "/" });
}

export default function HomePage() {
  return (
    <>
      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <HomeHero />

      {/* ============================================ */}
      {/* CLIENTS & PARTNERSHIP LOGO STRIP */}
      {/* ============================================ */}
      <ClientLogosSection />

      {/* ============================================ */}
      {/* BUSINESS CHALLENGES & SOLUTIONS SECTION */}
      {/* ============================================ */}
      <ProblemSolutionSection />

      {/* ============================================ */}
      {/* SMART WORKFLOW & FEATURES BENTO SECTION */}
      {/* ============================================ */}
      <InkOrbitFeatures theme="dark" brand="Antronix" hideHeader /> 
      {/* ============================================ */}
      {/* TESTIMONIALS SECTION */}
      {/* ============================================ */}
      <TestimonialsSection />
    </>
  );
}
