"use client";

import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import type { LogoItem } from "@/types";
import "./logo-carousel.css";

interface LogoCarouselProps {
  logos: LogoItem[];
  /** Opsional — hanya label aksesibel; tidak ada teks yang dirender */
  title?: string;
  /** Durasi satu putaran penuh rail, mis. "60s" */
  speed?: string;
  className?: string;
}

/**
 * Strip logo teknologi di bawah hero halaman divisi (Web Studio & System Lab).
 * Hanya rail berisi logo, tanpa judul. Gerak rail murni CSS (lihat
 * logo-carousel.css) sehingga tidak perlu dependensi carousel pihak ketiga.
 * Ini daun klien — halaman /services/[slug] tetap server component.
 *
 * Default 60s dipilih untuk rail 26 logo: durasi tetap, jadi tempo px/detik
 * ikut naik saat daftar bertambah — nilai ini menjaga laju tetap tenang.
 */
export function LogoCarousel({ logos, title, speed = "60s", className }: LogoCarouselProps) {
  if (logos.length === 0) return null;

  return (
    <section
      aria-label={title}
      className={cn(
        // Latar transparan tanpa garis tepi, dan sedikit ditarik ke atas agar
        // menempel ke strip di atasnya (hero / strip klien).
        "relative -mt-10 overflow-hidden py-10 sm:-mt-14 sm:py-14",
        className,
      )}
    >
      {/* Rail full-bleed: kedua ujung di-mask agar logo menguap ke tepi */}
      <div className="logo-carousel-rail w-full overflow-hidden py-1">
        <div
          className="logo-carousel-track flex w-max"
          style={{ "--logo-duration": speed } as CSSProperties}
        >
          <LogoRow logos={logos} />
          {/* Baris kedua mengulang baris pertama — salinan dekoratif */}
          <LogoRow logos={logos} ariaHidden />
        </div>
      </div>
    </section>
  );
}

function LogoRow({ logos, ariaHidden = false }: { logos: LogoItem[]; ariaHidden?: boolean }) {
  return (
    <ul
      className="flex shrink-0 grow items-center justify-center gap-10 px-5 sm:gap-14"
      aria-hidden={ariaHidden || undefined}
    >
      {logos.map((logo, index) => (
        <li key={`${logo.alt}-${index}`} className="flex w-24 shrink-0 items-center justify-center sm:w-32">
          {/* URL eksternal (brand teknologi) — dipisah dari next/image seperti
              avatar testimoni; tampil warna asli tanpa perlu disentuh. */}
          <img
            src={logo.src}
            alt={logo.alt}
            width={128}
            height={40}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="h-9 w-auto max-w-full object-contain"
          />
        </li>
      ))}
    </ul>
  );
}
