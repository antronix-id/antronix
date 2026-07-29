"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function useHashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash;
      if (!rawHash) return;

      // Clean up duplicated hashes like #contact#contact -> contact
      const cleanParts = rawHash.split("#").filter(Boolean);
      if (cleanParts.length === 0) return;

      const cleanId = cleanParts[cleanParts.length - 1];

      // Fix URL if duplicated hash was found
      if (cleanParts.length > 1) {
        window.history.replaceState(null, "", `${pathname}#${cleanId}`);
      }

      // Scroll to element if available
      const scrollToElement = () => {
        const el = document.getElementById(cleanId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          return true;
        }
        return false;
      };

      if (!scrollToElement()) {
        const timer = setTimeout(scrollToElement, 50);
        return () => clearTimeout(timer);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [pathname]);
}

export function handleSectionNavigation(
  e: React.MouseEvent,
  href: string,
  pathname: string,
  router: { push: (url: string) => void },
  onNavigate?: () => void
) {
  if (onNavigate) onNavigate();

  if (!href) return;

  // 1. Home link ("/")
  if (href === "/") {
    e.preventDefault();
    if (typeof window !== "undefined" && window.location.hash) {
      window.history.pushState(null, "", "/");
    }
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
    return;
  }

  // 2. Section Hash link (e.g. "/#services", "/#contact", "#contact")
  if (href.includes("#")) {
    const parts = href.split("#").filter(Boolean);
    const cleanId = parts[parts.length - 1];
    const targetHash = `#${cleanId}`;

    if (pathname === "/") {
      e.preventDefault();
      window.history.pushState(null, "", `/${targetHash}`);
      const target = document.getElementById(cleanId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      e.preventDefault();
      router.push(`/${targetHash}`);
    }
    return;
  }

  // 3. Same route link (e.g. "/portfolio" when already on "/portfolio")
  if (pathname === href) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
