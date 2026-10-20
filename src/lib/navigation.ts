import type { MouseEvent } from "react";

/**
 * HELPER NAVIGASI TAUTAN (BUKAN HOOK)
 * Dipakai tombol tautan yang targetnya bisa berupa route biasa, hash section di
 * beranda (mis. "/#services"), atau tautan beranda "/".
 * Perilakunya sama persis dengan implementasi lama di hooks/use-hash-scroll.
 */
export function handleSectionNavigation(
  e: MouseEvent,
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
