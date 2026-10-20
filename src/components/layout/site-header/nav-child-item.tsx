"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { NavChild } from "@/types";

/** Baris submenu layanan: logo divisi + judul */
export function NavChildItem({
  child,
  active,
  onNavigate,
}: {
  child: NavChild;
  active: boolean;
  onNavigate: (e: React.MouseEvent) => void;
}) {
  return (
    <Link
      href={child.href}
      onClick={onNavigate}
      className={cn(
        "flex items-center gap-3 rounded-xl border p-2.5 transition-colors",
        active
          ? "border-white/15 bg-white/15"
          : "border-transparent hover:border-white/10 hover:bg-white/10"
      )}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 p-1.5">
        {child.logo && (
          <Image
            src={child.logo}
            alt={child.label}
            width={28}
            height={28}
            className="h-full w-full object-contain"
          />
        )}
      </span>
      <span className="text-left text-sm font-semibold leading-tight text-white">
        {child.label}
      </span>
    </Link>
  );
}
