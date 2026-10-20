"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/sections/error-state";

/**
 * Error boundary khusus segmen (marketing). Karena error.js hanya membalut
 * segmen di bawahnya, header & footer tetap tampil saat sebuah section gagal
 * render — pengunjung tidak kehilangan navigasi.
 */
export default function MarketingError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <ErrorState onRetry={unstable_retry} digest={error.digest} />;
}
