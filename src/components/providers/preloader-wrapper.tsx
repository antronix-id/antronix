"use client";

import { useState, useEffect } from "react";
import Preloader from "@/components/animations/preloader";

export function PreloaderWrapper({ children }: { children: React.ReactNode }) {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    // Lock body scroll while preloader is active
    if (showPreloader) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showPreloader]);

  return (
    <>
      {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}
      {children}
    </>
  );
}
