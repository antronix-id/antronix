"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/sections/error-state";

/**
 * Error boundary level root: menangani error yang lolos dari segmen mana pun
 * di bawah app/ (kecuali error di root layout — itu ranah global-error.tsx).
 */
export default function RootError({
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
