"use client";

import { useEffect, type RefObject } from "react";

export function easeOutCubic(x: number) {
  return 1 - Math.pow(1 - x, 3);
}

function easeInCubic(x: number) {
  return x * x * x;
}

interface AnimateOptions {
  start?: number;
  end?: number;
  duration?: number;
  delay?: number;
  ease?: (x: number) => number;
  onUpdate: (v: number) => void;
  onEnd?: () => void;
}

function animateValue({
  start = 0,
  end = 100,
  duration = 1000,
  delay = 0,
  ease = easeOutCubic,
  onUpdate,
  onEnd,
}: AnimateOptions) {
  let startTime: number | null = null;
  let rafId: number;

  const step = (now: number) => {
    if (!startTime) startTime = now;
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = ease(progress);
    const val = start + (end - start) * eased;
    onUpdate(val);
    if (progress < 1) {
      rafId = requestAnimationFrame(step);
    } else {
      if (onEnd) onEnd();
    }
  };

  const delayTimeout = setTimeout(() => {
    rafId = requestAnimationFrame(step);
  }, delay);

  return () => {
    clearTimeout(delayTimeout);
    cancelAnimationFrame(rafId);
  };
}

/**
 * Animasi "sweep" otomatis (prop `animated`): menyapu sudut & intensitas glow
 * dengan menulis CSS variable langsung ke kartu.
 */
export function useBorderSweep(
  cardRef: RefObject<HTMLDivElement | null>,
  animated: boolean
) {
  useEffect(() => {
    if (!animated || !cardRef.current) return;
    const card = cardRef.current;
    const angleStart = 110;
    const angleEnd = 465;
    card.classList.add("sweep-active");
    card.style.setProperty("--cursor-angle", `${angleStart}deg`);

    animateValue({
      duration: 500,
      onUpdate: (v) => card.style.setProperty("--edge-proximity", `${v}`),
    });
    animateValue({
      ease: easeInCubic,
      duration: 1500,
      end: 50,
      onUpdate: (v) => {
        card.style.setProperty(
          "--cursor-angle",
          `${(angleEnd - angleStart) * (v / 100) + angleStart}deg`
        );
      },
    });
    animateValue({
      ease: easeOutCubic,
      delay: 1500,
      duration: 2250,
      start: 50,
      end: 100,
      onUpdate: (v) => {
        card.style.setProperty(
          "--cursor-angle",
          `${(angleEnd - angleStart) * (v / 100) + angleStart}deg`
        );
      },
    });
    animateValue({
      ease: easeInCubic,
      delay: 2500,
      duration: 1500,
      start: 100,
      end: 0,
      onUpdate: (v) => card.style.setProperty("--edge-proximity", `${v}`),
      onEnd: () => card.classList.remove("sweep-active"),
    });
  }, [animated, cardRef]);
}
