"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function SplitText({ text, className, delay = 0 }: SplitTextProps) {
  const words = text.split(" ");

  return (
    <span className={cn("inline-flex flex-wrap", className)}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="mr-[0.25em] inline-flex overflow-hidden">
          <motion.span
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: delay + wordIndex * 0.08,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

interface GradientTextProps {
  text: string;
  className?: string;
}

export function GradientText({ text, className }: GradientTextProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn("gradient-text-animated", className)}
    >
      {text}
    </motion.span>
  );
}

interface CountUpProps {
  target: number;
  suffix?: string;
  className?: string;
  duration?: number;
}

export function CountUp({ target, suffix = "", className, duration = 2 }: CountUpProps) {
  return (
    <motion.span
      className={cn("tabular-nums", className)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{
          opacity: 1,
          transition: { duration: 0.3 },
        }}
        viewport={{ once: true }}
      >
        <CountUpInner target={target} duration={duration} />
      </motion.span>
      {suffix}
    </motion.span>
  );
}

function CountUpInner({ target, duration }: { target: number; duration: number }) {
  const ref = useCountUp(target, duration);
  return <span ref={ref}>0</span>;
}

function useCountUp(target: number, duration: number) {
  const ref = { current: null as HTMLSpanElement | null };
  const callbackRef = (node: HTMLSpanElement | null) => {
    ref.current = node;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateValue(node, 0, target, duration * 1000);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(node);
  };

  return callbackRef;
}

function animateValue(
  element: HTMLElement,
  start: number,
  end: number,
  duration: number
) {
  const startTime = performance.now();

  const update = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    const current = Math.round(start + (end - start) * eased);
    element.textContent = current.toString();

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  };

  requestAnimationFrame(update);
}
