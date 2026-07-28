"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Globe, Sparkles, Cpu, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import "./gooey-nav.css";

const logoMap: Record<string, string> = {
  globe: "/Web-Studio.png",
  sparkles: "/Media-Lab.png",
  cpu: "/System-Lab.png",
};

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
  className,
}: GooeyNavProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const filterRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const pathname = usePathname();
  const router = useRouter();

  // Determine initial active index based on route (deterministic on SSR & client)
  const getActiveIndex = useCallback(() => {
    const idx = items.findIndex((item) => {
      if (item.href === "/" && pathname === "/") return true;
      if (item.href !== "/" && !item.href.includes("#") && pathname.startsWith(item.href)) return true;
      if (item.children) {
        return item.children.some((c) => pathname.startsWith(c.href));
      }
      return false;
    });

    return idx !== -1 ? idx : initialActiveIndex;
  }, [items, pathname, initialActiveIndex]);

  const [activeIndex, setActiveIndex] = useState(getActiveIndex());
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

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

  const updateEffectPosition = useCallback((element: HTMLElement) => {
    if (!containerRef.current || !filterRef.current || !textRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const pos = element.getBoundingClientRect();

    const styles = {
      left: `${pos.x - containerRect.x}px`,
      top: `${pos.y - containerRect.y}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`,
    };
    Object.assign(filterRef.current.style, styles);
    Object.assign(textRef.current.style, styles);
    textRef.current.innerText = element.innerText;
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLElement>, index: number, href?: string) => {
    const liEl = e.currentTarget.closest("li");
    if (!liEl) return;

    setActiveIndex(index);
    updateEffectPosition(liEl as HTMLElement);

    if (filterRef.current) {
      const particles = filterRef.current.querySelectorAll(".particle");
      particles.forEach((p) => filterRef.current?.removeChild(p));
    }

    if (textRef.current) {
      textRef.current.classList.remove("active");
      void textRef.current.offsetWidth;
      textRef.current.classList.add("active");
    }

    if (filterRef.current) {
      makeParticles(filterRef.current);
    }

    if (href && href.includes("#")) {
      const rawHash = href.split("#")[1];
      const targetHash = `#${rawHash}`;

      if (pathname === "/") {
        e.preventDefault();
        window.history.pushState(null, "", targetHash);
        const target = document.querySelector(targetHash);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        e.preventDefault();
        router.push(`/${targetHash}`);
      }
    }
  };

  // Sync activeIndex on pathname or hash change post-mount
  useEffect(() => {
    const newIdx = getActiveIndex();
    const rawHash = typeof window !== "undefined" ? window.location.hash : "";

    if (rawHash) {
      const cleanHash = rawHash.includes("#") ? `#${rawHash.split("#")[1]}` : rawHash;
      const hIdx = items.findIndex(
        (item) => item.href === cleanHash || item.href === `/${cleanHash}` || item.href.endsWith(cleanHash)
      );
      if (hIdx !== -1) {
        setActiveIndex(hIdx);
        return;
      }
    }

    setActiveIndex(newIdx);
  }, [pathname, items, getActiveIndex]);

  useEffect(() => {
    if (!navRef.current || !containerRef.current) return;
    const activeLi = navRef.current.querySelectorAll("li")[activeIndex];
    if (activeLi) {
      updateEffectPosition(activeLi as HTMLElement);
      textRef.current?.classList.add("active");
    }

    const resizeObserver = new ResizeObserver(() => {
      const currentActiveLi = navRef.current?.querySelectorAll("li")[activeIndex];
      if (currentActiveLi) {
        updateEffectPosition(currentActiveLi as HTMLElement);
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [activeIndex, updateEffectPosition]);

  return (
    <div className={cn("gooey-nav-container", className)} ref={containerRef}>
      <nav>
        <ul ref={navRef}>
          {items.map((item, index) => {
            const isParentActive = item.children
              ? item.children.some((c) => pathname.startsWith(c.href))
              : false;
            const isActive = activeIndex === index || isParentActive;

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
                    className="relative z-30 transition-colors flex items-center gap-1.5 px-4 py-2 text-sm font-semibold"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setActiveDropdown((prev) => (prev === item.label ? null : item.label));
                      handleClick(e, index, item.href);
                    }}
                  >
                    <span className="font-semibold relative z-30">{item.label}</span>
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-200 relative z-30",
                        activeDropdown === item.label && "rotate-180"
                      )}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="relative z-30 transition-colors inline-block px-4 py-2 text-sm font-semibold"
                    onClick={(e) => handleClick(e, index, item.href)}
                  >
                    <span>{item.label}</span>
                  </Link>
                )}

                {/* Dropdown Menu for Services */}
                <AnimatePresence>
                  {item.children && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-64 overflow-hidden rounded-2xl gooey-dropdown-menu backdrop-blur-2xl p-2 z-[100] shadow-2xl"
                    >
                      <div className="flex flex-col gap-1">
                        {item.children.map((child, childIdx) => {
                          const isChildActive = pathname === child.href;
                          const logoSrc = (child as any).logo || (child.icon ? logoMap[child.icon] : null);

                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={cn(
                                "gooey-dropdown-item flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-150 text-sm font-medium",
                                isChildActive
                                  ? "bg-white/20 text-white font-semibold shadow-inner"
                                  : "text-zinc-300 hover:text-white hover:bg-white/10"
                              )}
                              onClick={() => setActiveDropdown(null)}
                            >
                              <div className="flex h-7 w-7 shrink-0 items-center justify-center relative">
                                {logoSrc && (
                                  <Image
                                    src={logoSrc}
                                    alt={child.label}
                                    width={28}
                                    height={28}
                                    className="h-full w-full object-contain filter drop-shadow-sm"
                                  />
                                )}
                              </div>
                              <span className="text-white">{child.label}</span>
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
