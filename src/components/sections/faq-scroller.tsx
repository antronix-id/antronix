"use client";

import React from "react";
import { HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { FaqData } from "@/types";
import "./faq-scroller.css";

/**
 * FaqCard
 * Reusable card for a single FAQ item (styled exactly like TestimonialCard).
 */
export const FaqCard = ({ question, answer }: { question: string; answer: string }) => {
  return (
    <div className="flex flex-col items-start justify-between gap-4 p-5 sm:p-7 bg-black rounded-3xl border border-white/10 hover:border-white/25 backdrop-blur-xl w-[280px] xs:w-[320px] sm:w-[420px] flex-shrink-0 faq-card transition-all duration-300 hover:scale-[1.02] shadow-2xl group cursor-default">

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 text-slate-300 border border-white/10 group-hover:border-white/30 group-hover:text-white transition-all duration-300">
            <HelpCircle className="h-4 w-4" />
          </div>
          <h3 className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug faq-title group-hover:text-slate-100 transition-colors">
            {question}
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal faq-answer mt-1">
          {answer}
        </p>
      </div>
    </div>
  );
};

/**
 * HorizontalScroller
 * Wraps children and creates a seamless horizontal looping animation.
 */
export const HorizontalScroller = ({
  children,
  speed = "50s",
  direction = "left",
}: {
  children: React.ReactNode;
  speed?: string;
  direction?: "left" | "right";
}) => {
  const animationClass =
    direction === "right"
      ? "animate-scroll-horizontal-reverse"
      : "animate-scroll-horizontal";

  const style = { "--scroll-duration": speed } as React.CSSProperties;

  return (
    <div className="w-full overflow-hidden group relative scroller-mask py-0.5">
      <div className={cn("flex", animationClass)} style={style}>
        <div className="flex items-stretch justify-center flex-shrink-0 gap-6 px-3">
          {children}
        </div>
        {/* Duplicate for seamless loop */}
        <div
          className="flex items-stretch justify-center flex-shrink-0 gap-6 px-3"
          aria-hidden="true"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

/**
 * FaqSection
 * Assembles title, subtitle, and multiple horizontal rows.
 */
export const FaqSection = ({ data }: { data: FaqData }) => {
  return (
    <div className="relative flex flex-col items-center gap-8 py-8 w-full max-w-7xl mx-auto">
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[600px] rounded-full bg-white/5 blur-[140px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-4 text-center z-10 max-w-3xl px-4"
      >
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-b from-white via-slate-200 to-slate-400 bg-clip-text text-transparent leading-tight">
          {data.mainTitle}
        </h2>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
          {data.mainSubtitle}
        </p>
      </motion.div>

      <div className="flex flex-col gap-3.5 z-10 w-full mt-2">
        {data.rows.map((row) => (
          <HorizontalScroller
            key={row.id}
            speed={row.speed}
            direction={row.direction}
          >
            {row.faqItems.map((item) => (
              <FaqCard
                key={item.id}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </HorizontalScroller>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
