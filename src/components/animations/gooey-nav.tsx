"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { handleSectionNavigation } from "@/hooks/use-hash-scroll";
import "@/components/styles/gooey-nav.css";

const logoMap: Record<string, string> = {
  globe: "/Web-Studio.avif",
  sparkles: "/Media-Lab.avif",
  cpu: "/System-Lab.avif",
};

export interface GooeyNavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; icon?: string; logo?: string; description?: string }[];
}

interface GooeyNavProps {
  items: GooeyNavItem[];
  initialActiveIndex?: number;
  className?: string;
}

export function GooeyNav({
  items,
  initialActiveIndex = 0,
  className,
}: GooeyNavProps) {
  const pathname = usePathname();
  const router = useRouter();

  const getActiveIndex = useCallback(() => {
    const currentHash = typeof window !== "undefined" ? window.location.hash : "";
    const currentFull = currentHash ? `${pathname}${currentHash}` : pathname;

    const idx = items.findIndex((item) => {
      if (item.href === currentFull || item.href === pathname) return true;
      if (item.children) {
        return item.children.some((child) => child.href === currentFull || child.href === pathname);
      }
      return false;
    });

    return idx !== -1 ? idx : initialActiveIndex;
  }, [items, pathname, initialActiveIndex]);

  const [activeIndex, setActiveIndex] = useState(getActiveIndex());
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setActiveIndex(getActiveIndex());
  }

  const handleClick = (e: React.MouseEvent<HTMLElement>, index: number, href?: string) => {
    setActiveIndex(index);
    if (href) {
      handleSectionNavigation(e, href, pathname, router);
    }
  };

  return (
    <div className={cn("gooey-nav-container", className)}>
      <nav>
        <ul>
          {items.map((item, index) => {
            const isParentActive = item.children
              ? item.children.some((c) => pathname.startsWith(c.href))
              : false;
            const isActive = activeIndex === index || isParentActive;

            return (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() =>
                  item.children ? setActiveDropdown(item.label) : null
                }
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.children ? (
                  <button
                    type="button"
                    className={cn(
                      "relative z-30 flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200",
                      isActive
                        ? "bg-white text-black shadow-md"
                        : "text-zinc-300 hover:text-white hover:bg-white/10"
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setActiveDropdown((prev) => (prev === item.label ? null : item.label));
                      handleClick(e, index, item.href);
                    }}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 transition-transform duration-200",
                        activeDropdown === item.label && "rotate-180"
                      )}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "relative z-30 inline-block px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200",
                      isActive
                        ? "bg-white text-black shadow-md"
                        : "text-zinc-300 hover:text-white hover:bg-white/10"
                    )}
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
                      className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-72 overflow-hidden rounded-2xl gooey-dropdown-menu backdrop-blur-2xl p-2 z-[100] shadow-2xl border border-white/10 bg-black/80"
                    >
                      <div className="flex flex-col gap-1">
                        {item.children.map((child) => {
                          const isChildActive = pathname === child.href;
                          const logoSrc = child.logo || (child.icon ? logoMap[child.icon] : null);

                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={cn(
                                "gooey-dropdown-item flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 text-sm font-medium",
                                isChildActive
                                  ? "bg-white/15 text-white font-semibold shadow-inner border border-white/10"
                                  : "text-zinc-300 hover:text-white hover:bg-white/10 border border-transparent"
                              )}
                              onClick={() => setActiveDropdown(null)}
                            >
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center relative rounded-xl bg-white/5 p-1.5 border border-white/10">
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
                              <div className="flex flex-col text-left">
                                <span className="text-white text-sm font-semibold leading-tight">{child.label}</span>
                                {child.description && (
                                  <span className="text-[11px] text-zinc-400 font-normal mt-0.5 leading-tight">{child.description}</span>
                                )}
                              </div>
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
    </div>
  );
}

export default GooeyNav;
