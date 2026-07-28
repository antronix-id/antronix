"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import "./gooey-nav.css";

export interface GooeyNavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; icon: string }[];
}

interface GooeyNavProps {
  items: GooeyNavItem[];
  animationTime?: number;
  particleCount?: number;
  particleDistances?: [number, number];
  particleR?: number;
  timeVariance?: number;
  colors?: number[];
  initialActiveIndex?: number;
  className?: string;
}

export function GooeyNav({
  items,
  animationTime = 600,
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  timeVariance = 300,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
  initialActiveIndex = 0,
  className = "",
}: GooeyNavProps) {
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const filterRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  // Helper to determine active index
  const getActiveIndex = useCallback(() => {
    if (typeof window === "undefined") return initialActiveIndex;
    const hash = window.location.hash;

    if (hash) {
      const hIdx = items.findIndex((item) => item.href === hash);
      if (hIdx !== -1) return hIdx;
    }

    const idx = items.findIndex((item) => {
      if (item.href === "/" && pathname === "/" && !hash) return true;
      if (item.href !== "/" && !item.href.startsWith("#") && pathname.startsWith(item.href)) return true;
      if (item.children) {
        return item.children.some((c) => pathname.startsWith(c.href));
      }
      return false;
    });

    return idx !== -1 ? idx : 0;
  }, [items, pathname, initialActiveIndex]);

  // Sync active index when pathname or hash changes
  useEffect(() => {
    const sync = () => {
      const idx = getActiveIndex();
      setActiveIndex(idx);
    };

    sync();
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);

    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
    };
  }, [pathname, getActiveIndex]);

  const updateEffectPosition = useCallback((element: HTMLElement) => {
    if (!containerRef.current || !filterRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const pos = element.getBoundingClientRect();

    const styles = {
      left: `${pos.x - containerRect.x}px`,
      top: `${pos.y - containerRect.y}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`,
    };
    Object.assign(filterRef.current.style, styles);
  }, []);

  useEffect(() => {
    if (!navRef.current || !containerRef.current) return;
    const activeLi = navRef.current.querySelectorAll("li")[activeIndex];
    if (activeLi) {
      updateEffectPosition(activeLi as HTMLElement);
    }
  }, [activeIndex, updateEffectPosition]);

  const noise = (n = 1) => n / 2 - Math.random() * n;

  const getXY = (distance: number, pointIndex: number, totalPoints: number) => {
    const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };

  const createParticle = (i: number, t: number, d: [number, number], r: number) => {
    const rotate = noise(r / 10);
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
    };
  };

  const makeParticles = (element: HTMLElement) => {
    const d = particleDistances;
    const r = particleR;
    const bubbleTime = animationTime * 2 + timeVariance;
    element.style.setProperty("--time", `${bubbleTime}ms`);

    for (let i = 0; i < particleCount; i++) {
      const t = animationTime * 2 + noise(timeVariance * 2);
      const p = createParticle(i, t, d, r);
      element.classList.remove("active");

      setTimeout(() => {
        const particle = document.createElement("span");
        const point = document.createElement("span");
        particle.classList.add("particle");
        particle.style.setProperty("--start-x", `${p.start[0]}px`);
        particle.style.setProperty("--start-y", `${p.start[1]}px`);
        particle.style.setProperty("--end-x", `${p.end[0]}px`);
        particle.style.setProperty("--end-y", `${p.end[1]}px`);
        particle.style.setProperty("--time", `${p.time}ms`);
        particle.style.setProperty("--scale", `${p.scale}`);
        particle.style.setProperty("--color", `var(--color-${p.color}, white)`);
        particle.style.setProperty("--rotate", `${p.rotate}deg`);

        point.classList.add("point");
        particle.appendChild(point);
        element.appendChild(particle);
        requestAnimationFrame(() => {
          element.classList.add("active");
        });
        setTimeout(() => {
          try {
            element.removeChild(particle);
          } catch {
            // Do nothing
          }
        }, t);
      }, 30);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>, index: number) => {
    const liEl = e.currentTarget.closest("li");
    if (!liEl) return;

    setActiveIndex(index);
    updateEffectPosition(liEl as HTMLElement);

    if (filterRef.current) {
      const particles = filterRef.current.querySelectorAll(".particle");
      particles.forEach((p) => {
        try {
          filterRef.current?.removeChild(p);
        } catch {
          // Do nothing
        }
      });
      makeParticles(filterRef.current);
    }
  };

  return (
    <div className={cn("gooey-nav-container", className)} ref={containerRef}>
      <nav>
        <ul ref={navRef}>
          {items.map((item, index) => {
            const isActive = activeIndex === index;

            return (
              <li
                key={item.label}
                className={cn("relative", isActive ? "active" : "")}
                onMouseEnter={() =>
                  item.children ? setActiveDropdown(item.label) : null
                }
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.children ? (
                  <button
                    type="button"
                    style={{
                      color: isActive ? "#000000" : "#ffffff",
                      fontWeight: isActive ? 700 : 500,
                      zIndex: 20,
                      position: "relative",
                    }}
                    className={cn(
                      "relative z-20 transition-colors flex items-center gap-1 px-4 py-2 text-sm font-semibold",
                      isActive ? "!text-black font-bold" : "text-white hover:text-white/80"
                    )}
                    onClick={(e) => {
                      handleClick(e, index);
                      setActiveDropdown(
                        activeDropdown === item.label ? null : item.label
                      );
                    }}
                  >
                    <span style={{ color: isActive ? "#000000" : "#ffffff", position: "relative", zIndex: 20 }}>
                      {item.label}
                    </span>
                    <ChevronDown
                      style={{ color: isActive ? "#000000" : "#ffffff", position: "relative", zIndex: 20 }}
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-200",
                        activeDropdown === item.label && "rotate-180"
                      )}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    style={{
                      color: isActive ? "#000000" : "#ffffff",
                      fontWeight: isActive ? 700 : 500,
                      zIndex: 20,
                      position: "relative",
                    }}
                    className={cn(
                      "relative z-20 transition-colors inline-block px-4 py-2 text-sm font-semibold",
                      isActive ? "!text-black font-bold" : "text-white hover:text-white/80"
                    )}
                    onClick={(e) => handleClick(e, index)}
                  >
                    <span style={{ color: isActive ? "#000000" : "#ffffff", position: "relative", zIndex: 20 }}>
                      {item.label}
                    </span>
                  </Link>
                )}

                {/* Dropdown Menu for Services */}
                <AnimatePresence>
                  {item.children && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute left-0 top-full mt-2 w-56 overflow-hidden rounded-2xl glass-strong shadow-2xl border border-white/10 z-50"
                    >
                      <div className="p-2 flex flex-col gap-1">
                        {item.children.map((child) => {
                          const isChildActive = pathname === child.href;

                          return (
                            <Link
                              key={child.label}
                              href={child.href}
                              className={cn(
                                "flex items-center rounded-xl px-4 py-2.5 transition-all text-sm font-medium",
                                isChildActive
                                  ? "bg-white/20 text-white font-bold"
                                  : "text-neutral-300 hover:bg-white/10 hover:text-white"
                              )}
                            >
                              <span>{child.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </nav>
      <span className="effect filter" ref={filterRef} />
      <span className="effect text" ref={textRef} />
    </div>
  );
}

export default GooeyNav;
