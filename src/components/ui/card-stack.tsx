"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type CardStackItem = {
  id: string | number;
  title: string;
  description?: string;
  imageSrc?: string;
  href?: string;
  ctaLabel?: string;
  tag?: string;
};

export type CardStackProps<T extends CardStackItem> = {
  items: T[];

  /** Selected index on mount */
  initialIndex?: number;

  /** How many cards are visible around the active (odd recommended) */
  maxVisible?: number;

  /** Card sizing */
  cardWidth?: number;
  cardHeight?: number;

  /** How much cards overlap each other (0..0.8). Higher = more overlap */
  overlap?: number;

  /** Total fan angle (deg). Higher = wider arc */
  spreadDeg?: number;

  /** 3D / depth feel */
  perspectivePx?: number;
  depthPx?: number;
  tiltXDeg?: number;

  /** Active emphasis */
  activeLiftPx?: number;
  activeScale?: number;
  inactiveScale?: number;

  /** Motion */
  springStiffness?: number;
  springDamping?: number;

  /** Behavior */
  loop?: boolean;
  autoAdvance?: boolean;
  intervalMs?: number;
  pauseOnHover?: boolean;

  /** UI */
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;

  /** Hooks */
  onChangeIndex?: (index: number, item: T) => void;

  /** Custom renderer (optional) */
  renderCard?: (item: T, state: { active: boolean; index: number }) => React.ReactNode;
};

function wrapIndex(n: number, len: number) {
  if (len <= 0) return 0;
  return ((n % len) + len) % len;
}

/** Minimal signed offset from active index to i, with wrapping (for loop behavior). */
function signedOffset(i: number, active: number, len: number, loop: boolean) {
  const raw = i - active;
  if (!loop || len <= 1) return raw;

  // consider wrapped alternative
  const alt = raw > 0 ? raw - len : raw + len;
  return Math.abs(alt) < Math.abs(raw) ? alt : raw;
}

export function CardStack<T extends CardStackItem>({
  items,
  initialIndex = 0,
  maxVisible = 7,

  cardWidth = 520,
  cardHeight = 320,

  overlap = 0.48,
  spreadDeg = 48,

  perspectivePx = 1100,
  depthPx = 140,
  tiltXDeg = 12,

  activeLiftPx = 22,
  activeScale = 1.03,
  inactiveScale = 0.94,

  springStiffness = 280,
  springDamping = 28,

  loop = true,
  autoAdvance = false,
  intervalMs = 2800,
  pauseOnHover = true,

  showDots = true,
  showArrows = true,
  className,

  onChangeIndex,
  renderCard,
}: CardStackProps<T>) {
  const reduceMotion = useReducedMotion();
  const len = items.length;

  const containerRef = React.useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = React.useState<number>(cardWidth);

  React.useEffect(() => {
    if (!containerRef.current) return;
    const update = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Responsive width calculation so cards never overflow small screens
  const actualCardWidth = Math.min(cardWidth, Math.max(280, containerWidth - 32));
  const actualCardHeight = Math.round(actualCardWidth * (cardHeight / cardWidth));

  const [active, setActive] = React.useState(() =>
    wrapIndex(initialIndex, len),
  );
  const [hovering, setHovering] = React.useState(false);

  // keep active in bounds if items change
  React.useEffect(() => {
    setActive((a) => wrapIndex(a, len));
  }, [len]);

  React.useEffect(() => {
    if (!len) return;
    onChangeIndex?.(active, items[active]!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const maxOffset = Math.max(0, Math.floor(maxVisible / 2));

  const cardSpacing = Math.max(10, Math.round(actualCardWidth * (1 - overlap)));
  const stepDeg = maxOffset > 0 ? spreadDeg / maxOffset : 0;

  const canGoPrev = loop || active > 0;
  const canGoNext = loop || active < len - 1;

  const prev = React.useCallback(() => {
    if (!len) return;
    if (!canGoPrev) return;
    setActive((a) => wrapIndex(a - 1, len));
  }, [canGoPrev, len]);

  const next = React.useCallback(() => {
    if (!len) return;
    if (!canGoNext) return;
    setActive((a) => wrapIndex(a + 1, len));
  }, [canGoNext, len]);

  // keyboard navigation (when container focused)
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  // autoplay
  React.useEffect(() => {
    if (!autoAdvance) return;
    if (reduceMotion) return;
    if (!len) return;
    if (pauseOnHover && hovering) return;

    const id = window.setInterval(
      () => {
        if (loop || active < len - 1) next();
      },
      Math.max(700, intervalMs),
    );

    return () => window.clearInterval(id);
  }, [
    autoAdvance,
    intervalMs,
    hovering,
    pauseOnHover,
    reduceMotion,
    len,
    loop,
    active,
    next,
  ]);

  if (!len) return null;

  const activeItem = items[active]!;

  return (
    <div
      ref={containerRef}
      className={cn("w-full", className)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Stage */}
      <div
        className="relative w-full outline-none"
        style={{ height: Math.max(380, actualCardHeight + 80) }}
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        {/* background wash / spotlight */}
        <div
          className="pointer-events-none absolute inset-x-0 top-6 mx-auto h-48 w-[70%] rounded-full bg-blue-500/10 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-40 w-[76%] rounded-full bg-black/40 blur-3xl"
          aria-hidden="true"
        />

        {/* Side shadow vignettes to darken cards beyond the center 3 */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-44 bg-gradient-to-r from-background via-background/80 to-transparent z-40"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-44 bg-gradient-to-l from-background via-background/80 to-transparent z-40"
          aria-hidden="true"
        />

        <div
          className="absolute inset-0 flex items-end justify-center"
          style={{
            perspective: `${perspectivePx}px`,
          }}
        >
          <AnimatePresence initial={false}>
            {items.map((item, i) => {
              const off = signedOffset(i, active, len, loop);
              const abs = Math.abs(off);
              const visible = abs <= maxOffset;

              // hide far-away cards cleanly
              if (!visible) return null;

              // fan geometry
              const rotateZ = off * stepDeg;
              const x = off * cardSpacing;
              const y = abs * 10; // subtle arc-down feel
              const z = -abs * depthPx;

              const isActive = off === 0;

              const scale = isActive ? activeScale : inactiveScale;
              const lift = isActive ? -activeLiftPx : 0;

              const rotateX = isActive ? 0 : tiltXDeg;

              const zIndex = 100 - abs;

              // drag only on the active card
              const dragProps = isActive
                ? {
                    drag: "x" as const,
                    dragConstraints: { left: 0, right: 0 },
                    dragElastic: 0.18,
                    onDragEnd: (
                      _e: any,
                      info: { offset: { x: number }; velocity: { x: number } },
                    ) => {
                      if (reduceMotion) return;
                      const travel = info.offset.x;
                      const v = info.velocity.x;
                      const threshold = Math.min(160, actualCardWidth * 0.22);

                      // swipe logic
                      if (travel > threshold || v > 650) prev();
                      else if (travel < -threshold || v < -650) next();
                    },
                  }
                : {};

              return (
                <motion.div
                  key={item.id}
                  className={cn(
                    "absolute bottom-0 rounded-2xl border-2 overflow-hidden shadow-2xl bg-slate-950",
                    "will-change-transform select-none",
                    isActive
                      ? "border-white/20 ring-1 ring-white/25 cursor-grab active:cursor-grabbing"
                      : abs === 1
                        ? "border-white/10 hover:border-white/25 cursor-pointer"
                        : "border-black/50 dark:border-white/5 cursor-pointer",
                  )}
                  style={{
                    width: actualCardWidth,
                    height: actualCardHeight,
                    zIndex,
                    transformStyle: "preserve-3d",
                  }}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: y + 40,
                          x,
                          rotateZ,
                          rotateX,
                          scale,
                        }
                  }
                  animate={{
                    opacity: 1,
                    x,
                    y: y + lift,
                    rotateZ,
                    rotateX,
                    scale,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: springStiffness,
                    damping: springDamping,
                  }}
                  onClick={() => setActive(i)}
                  {...dragProps}
                >
                  <div
                    className="relative h-full w-full"
                    style={{
                      transform: `translateZ(${z}px)`,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {renderCard ? (
                      renderCard(item, { active: isActive, index: i })
                    ) : (
                      <DefaultFanCard item={item} active={isActive} />
                    )}

                    {/* Dark shadow overlay: hanya 3 kartu (tengah, kiri, kanan) yang terlihat jelas; sisanya diberi shadow gelap pekat */}
                    {abs > 0 && (
                      <div
                        className={cn(
                          "pointer-events-none absolute inset-0 rounded-2xl transition-all duration-300",
                          abs === 1
                            ? "bg-black/15"
                            : "bg-black/85 backdrop-blur-[1px] shadow-[inset_0_0_60px_rgba(0,0,0,0.95)]",
                        )}
                        aria-hidden="true"
                      />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Controls: Arrows & Dots */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        {showArrows ? (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={prev}
              disabled={!canGoPrev}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-slate-950/70 text-zinc-300 hover:text-white hover:bg-white/10 hover:border-white/25 transition-all cursor-pointer shadow-lg backdrop-blur-md disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Tantangan sebelumnya"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {showDots ? (
              <div className="flex items-center gap-2 px-2">
                {items.map((it, idx) => {
                  const on = idx === active;
                  return (
                    <button
                      key={it.id}
                      onClick={() => setActive(idx)}
                      className={cn(
                        "rounded-full transition-all duration-300 cursor-pointer",
                        on
                          ? "h-2 w-7 bg-white shadow-[0_0_10px_rgba(255,255,255,0.7)]"
                          : "h-2 w-2 bg-white/20 hover:bg-white/40",
                      )}
                      aria-label={`Lihat tantangan ${idx + 1}`}
                    />
                  );
                })}
              </div>
            ) : null}

            <button
              type="button"
              onClick={next}
              disabled={!canGoNext}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-slate-950/70 text-zinc-300 hover:text-white hover:bg-white/10 hover:border-white/25 transition-all cursor-pointer shadow-lg backdrop-blur-md disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Tantangan berikutnya"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        ) : showDots ? (
          <div className="flex items-center gap-2">
            {items.map((it, idx) => {
              const on = idx === active;
              return (
                <button
                  key={it.id}
                  onClick={() => setActive(idx)}
                  className={cn(
                    "rounded-full transition-all duration-300 cursor-pointer",
                    on
                      ? "h-2 w-6 bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                      : "h-2 w-2 bg-white/20 hover:bg-white/40",
                  )}
                  aria-label={`Go to ${it.title}`}
                />
              );
            })}
          </div>
        ) : null}

        {activeItem.href ? (
          <Link
            href={activeItem.href}
            target="_blank"
            rel="noreferrer"
            className="text-zinc-400 hover:text-white transition"
            aria-label="Open link"
          >
            <SquareArrowOutUpRight className="h-4 w-4" />
          </Link>
        ) : null}
      </div>
    </div>
  );
}

export function DefaultFanCard({
  item,
}: {
  item: CardStackItem;
  active: boolean;
}) {
  return (
    <div className="relative h-full w-full">
      {/* image */}
      <div className="absolute inset-0">
        {item.imageSrc ? (
          <img
            src={item.imageSrc}
            alt={item.title}
            className="h-full w-full object-cover"
            draggable={false}
            loading="eager"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-secondary text-sm text-muted-foreground">
            No image
          </div>
        )}
      </div>

      {/* subtle gradient overlay at bottom for text readability */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

      {/* content - title only */}
      <div className="relative z-10 flex h-full flex-col justify-end p-4 sm:p-5">
        <div className="text-base sm:text-lg font-bold text-white tracking-tight drop-shadow-md">
          {item.title}
        </div>
      </div>
    </div>
  );
}

export default CardStack;
