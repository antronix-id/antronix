"use client";

import { motion } from "framer-motion";
import { BorderGlow } from "@/components/animations/border-glow";
import { Quote, Star } from "lucide-react";
import type { Testimonial } from "@/lib/constants";

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

export function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <BorderGlow className="group relative h-full transition-all duration-500">
        {/* Quote icon */}
        <div className="absolute right-6 top-6 opacity-10 pointer-events-none">
          <Quote className="h-12 w-12 text-primary" />
        </div>

        <div className="relative p-6 pt-8 flex flex-col justify-between h-full">
          <div>
            {/* Stars */}
            <div className="mb-4 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < testimonial.rating
                      ? "fill-yellow-500 text-yellow-500"
                      : "fill-muted text-muted"
                  }`}
                />
              ))}
            </div>

            {/* Content */}
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground italic">
              &ldquo;{testimonial.content}&rdquo;
            </p>
          </div>

          {/* Author */}
          <div className="flex items-center gap-3 pt-4 border-t border-border/40">
            {/* Avatar placeholder */}
            <div className="flex h-11 w-11 items-center justify-center rounded-full brand-gradient-btn text-white font-bold text-sm">
              <span>
                {testimonial.clientName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold">{testimonial.clientName}</p>
              <p className="text-xs text-muted-foreground">
                {testimonial.companyOrRole}
              </p>
            </div>
          </div>
        </div>
      </BorderGlow>
    </motion.div>
  );
}
