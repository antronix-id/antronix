"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useScroll } from "@/hooks/use-scroll";
import { useHashScroll } from "@/hooks/use-hash-scroll";
import { handleSectionNavigation } from "@/lib/navigation";

/**
 * Seluruh state & listener menu header dalam satu tempat:
 * - dropdown Layanan (desktop) dengan hover/klik, tutup saat rute berubah,
 *   klik di luar panel, atau tekan Escape
 * - drawer mobile + accordion submenu + kunci scroll body
 * - gate `mounted` untuk portal
 */
export function useSiteMenu() {
  const pathname = usePathname();
  const router = useRouter();
  const scrolled = useScroll(10);

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<string | null>("Layanan");

  const navRef = useRef<HTMLDivElement>(null);

  // Handle hash scrolling and clean duplicate hashes across all routes
  useHashScroll();

  // Tutup dropdown Layanan setiap kali rute berubah
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setDropdownOpen(null);
  }

  // Dropdown juga ditutup saat klik di luar panel atau tekan Escape
  useEffect(() => {
    if (!dropdownOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setDropdownOpen(null);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDropdownOpen(null);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dropdownOpen]);

  // Portal hanya boleh dirender setelah mount (gate tanpa cascading render)
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (open) {
      // Disable scroll
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scroll
      document.body.style.overflow = "";
    }

    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /** Handler klik tautan: route biasa, hash section, atau drawer-close terlebih dahulu */
  const navigate =
    (href: string, onNavigate?: () => void) => (e: React.MouseEvent) =>
      handleSectionNavigation(e, href, pathname, router, onNavigate);

  const closeMobile = () => setOpen(false);

  return {
    pathname,
    scrolled,
    navRef,
    open,
    setOpen,
    mounted,
    dropdownOpen,
    setDropdownOpen,
    mobileSubmenuOpen,
    setMobileSubmenuOpen,
    navigate,
    closeMobile,
  };
}

export type SiteMenu = ReturnType<typeof useSiteMenu>;
