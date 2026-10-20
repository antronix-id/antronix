"use client";

import React from "react";
import Link from "next/link";
import { RetroButton } from "@/components/ui/retro-button";

/** Satu tautan nav (tanpa submenu) sebagai RetroButton aktif/nonaktif */
export function NavLinkItem({
  href,
  label,
  active,
  onNavigate,
  fullWidth = false,
}: {
  href: string;
  label: string;
  active: boolean;
  onNavigate: (e: React.MouseEvent) => void;
  /** Versi drawer mobile: tautan & tombol melebar penuh */
  fullWidth?: boolean;
}) {
  const variant = active ? "active" : "darkGray";

  if (fullWidth) {
    return (
      <Link href={href} className="w-full flex justify-center" onClick={onNavigate}>
        <RetroButton variant={variant} className="w-full">
          {label}
        </RetroButton>
      </Link>
    );
  }

  return (
    <Link href={href} onClick={onNavigate}>
      <RetroButton variant={variant}>{label}</RetroButton>
    </Link>
  );
}
