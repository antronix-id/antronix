"use client";

import React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { TESTIMONIALS } from "@/data";
import type { Testimonial } from "@/types";

// --- Data dibagi rata ke 4 kolom marquee (3 entri per kolom) ---
const firstColumn = TESTIMONIALS.slice(0, 3);
const secondColumn = TESTIMONIALS.slice(3, 6);
const thirdColumn = TESTIMONIALS.slice(6, 9);
const fourthColumn = TESTIMONIALS.slice(9, 12);

// --- Sub-Components ---
const springValues = {
  damping: 25,
  stiffness: 120,
  mass: 1.5,
};

function TestimonialItem({
  quote,
  avatarUrl,
  name,
  role,
  index,
  i,
}: Testimonial & { index: number; i: number }) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(x, springValues);
  const rotateY = useSpring(y, springValues);
  const scale = useSpring(1, springValues);
  const rotateAmplitude = 12;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    x.set(rotationX);
    y.set(rotationY);
  }

  function handleMouseEnter() {
    scale.set(1.04);
  }

  function handleMouseLeave() {
    scale.set(1);
    x.set(0);
    y.set(0);
  }

  return (
    <div
      ref={cardRef}
      className="[perspective:800px] w-full"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.li
        key={`${index}-${i}`}
        aria-hidden={index === 1 ? "true" : "false"}
        tabIndex={index === 1 ? -1 : 0}
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
        }}
        className="p-5 sm:p-7 rounded-3xl border border-white/10 shadow-2xl w-full bg-black backdrop-blur-xl cursor-default select-none group focus:outline-none focus:ring-2 focus:ring-primary/30 will-change-transform transition-colors duration-300"
      >
        <blockquote className="m-0 p-0 [transform:translateZ(20px)]">
          <p className="text-slate-300 leading-relaxed font-normal text-sm m-0 transition-colors duration-300">
            &ldquo;{quote}&rdquo;
          </p>
          <footer className="flex items-center gap-3.5 mt-6">
            <img
              width={44}
              height={44}
              src={avatarUrl}
              alt={`Avatar of ${name}`}
              className="h-11 w-11 rounded-full object-cover ring-2 ring-white/10 group-hover:ring-cyan-400/50 transition-all duration-300 ease-in-out"
            />
            <div className="flex flex-col">
              <cite className="font-semibold not-italic tracking-tight leading-5 text-white transition-colors duration-300 text-sm">
                {name}
              </cite>
              <span className="text-xs leading-5 tracking-tight text-slate-400 mt-0.5 transition-colors duration-300">
                {role}
              </span>
            </div>
          </footer>
        </blockquote>
      </motion.li>
    </div>
  );
}

const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.ul
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 14,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-transparent list-none m-0 p-0"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map((testimonial, i) => (
                <TestimonialItem
                  key={`${index}-${i}`}
                  {...testimonial}
                  index={index}
                  i={i}
                />
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.ul>
    </div>
  );
};

export function TestimonialsSection() {
  return (
    <section 
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="bg-transparent py-20 relative overflow-hidden w-full"
    >
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ 
          duration: 0.8, 
          ease: [0.16, 1, 0.3, 1]
        }}
        className="max-w-7xl px-6 sm:px-8 lg:px-12 z-10 mx-auto w-full"
      >
        <div className="flex flex-col items-center justify-center max-w-[640px] mx-auto mb-14 text-center">
          <h2 id="testimonials-heading" className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-b from-white via-slate-200 to-slate-400 bg-clip-text text-transparent leading-tight">
            Kata Mereka Tentang Layanan Kami
          </h2>
          <p className="text-center mt-4 text-slate-400 text-base md:text-lg leading-relaxed max-w-lg">
            Kepercayaan dan kepuasan klien adalah pencapaian terbesar bagi perusahaan kami.
          </p>
        </div>

        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mt-6 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[520px] sm:max-h-[720px] overflow-hidden w-full"
          role="region"
          aria-label="Scrolling Testimonials"
        >
          <TestimonialsColumn testimonials={firstColumn} duration={18} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden sm:block" duration={24} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={20} />
          <TestimonialsColumn testimonials={fourthColumn} className="hidden xl:block" duration={26} />
        </div>
      </motion.div>
    </section>
  );
}

export default TestimonialsSection;

