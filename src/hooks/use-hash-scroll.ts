"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scroll otomatis ke elemen target saat URL membawa hash (#services, #contact),
 * termasuk ketika hash muncul setelah navigasi antar route dan ketika hash
 * tertulis ganda (#contact#contact).
 *
 * Helper non-hook `handleSectionNavigation` sengaja TIDAK ada di sini —
 * lihat src/lib/navigation.ts.
 */
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
