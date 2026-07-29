"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { RipplePulseLoader } from "@/components/ui/ripple-pulse-loader";

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const loadingStartTimeRef = useRef<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const currentPathRef = useRef(pathname);

  const triggerExactLoading = (duration = 1000) => {
    const now = Date.now();
    // Prevent re-triggering or stacking if loading is already active
    if (loadingStartTimeRef.current && now - loadingStartTimeRef.current < duration) {
      return;
    }

    loadingStartTimeRef.current = now;
    setIsLoading(true);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setIsLoading(false);
      loadingStartTimeRef.current = null;
    }, duration);
  };

  // Route change listener: ensure exact 1-second loading
  useEffect(() => {
    if (currentPathRef.current !== pathname) {
      currentPathRef.current = pathname;
      triggerExactLoading(1000);
    }
  }, [pathname, searchParams]);

  // Click listener for different page route navigation
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Do NOT trigger loading for hash-only or same-page section links
      if (href.startsWith("#")) return;

      const targetPath = href.split("#")[0];

      // If destination is a different page route
      if (
        targetPath &&
        targetPath !== currentPathRef.current &&
        !anchor.target
      ) {
        triggerExactLoading(1000);
      }
    };

    document.addEventListener("click", handleAnchorClick, true);
    return () => {
      document.removeEventListener("click", handleAnchorClick, true);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <>
      {isLoading && (
        <div className="fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col items-center justify-center bg-background/80 backdrop-blur-xl animate-in fade-in duration-150 pointer-events-none select-none">
          <RipplePulseLoader />
        </div>
      )}
      {children}
    </>
  );
}
