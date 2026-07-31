"use client";

import { useState } from "react";
import { AGENCY } from "@/lib/constants";

export interface SocialItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const defaultSocials: SocialItem[] = [
  {
    name: "WhatsApp",
    href: AGENCY.socials.whatsapp,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-[18px]">
        <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.764.459 3.487 1.333 5.006L2 22l5.129-1.341c1.464.798 3.111 1.218 4.88 1.219h.004c5.507 0 9.99-4.479 9.99-9.986 0-2.668-1.039-5.176-2.927-7.062A9.925 9.925 0 0 0 12.012 2zm5.791 14.126c-.244.688-1.427 1.319-1.967 1.362-.511.042-1.157.194-3.791-.84-2.836-1.112-4.636-4.004-4.778-4.195-.141-.19-1.152-1.533-1.152-2.924 0-1.391.73-2.076.989-2.359.259-.283.565-.353.753-.353.188 0 .376.002.54.01.176.009.412-.067.646.494.244.588.835 2.036.906 2.18.07.144.118.312.024.499-.094.188-.141.306-.283.471-.141.165-.296.368-.423.494-.141.141-.289.294-.124.577.165.283.734 1.21 1.575 1.958 1.082.964 1.994 1.263 2.277 1.405.283.141.447.118.612-.07.165-.188.706-.823.894-1.106.188-.283.376-.235.635-.141.259.094 1.647.777 1.93 1.188.283.412.283.777.141 1.06z" />
      </svg>
    ),
  },
  {
    name: "Email",
    href: `mailto:${AGENCY.email}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-[18px]">
        <path d="M1.5 4.5a3 3 0 0 1 3-3h15a3 3 0 0 1 3 3v15a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3v-15zm3-1.5a1.5 1.5 0 0 0-1.5 1.5v.425l10.5 6.562 10.5-6.562V4.5a1.5 1.5 0 0 0-1.5-1.5h-15zm19.5 4.325-9.975 6.234a1 1 0 0 1-1.05 0L1.5 7.325V19.5a1.5 1.5 0 0 0 1.5 1.5h15a1.5 1.5 0 0 0 1.5-1.5V7.325z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: AGENCY.socials.instagram,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-[18px]">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: AGENCY.socials.tiktok,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-[18px]">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V5.8a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 12a6.34 6.34 0 0 0 10.86 4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.14z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: AGENCY.socials.linkedin,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-[18px]">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "X",
    href: AGENCY.socials.x,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-[18px]">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: AGENCY.socials.youtube,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-[18px]">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

interface SocialIconsProps {
  items?: SocialItem[];
}

export function SocialIcons({ items = defaultSocials }: SocialIconsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative inline-flex items-center gap-0.5 px-1.5 py-1.5 rounded-2xl bg-neutral-950/80 backdrop-blur-md border border-white/[0.08] shadow-lg">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />

      {items.map((social, index) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center size-10 rounded-xl transition-colors duration-200"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          aria-label={social.name}
        >
          <span
            className={`absolute inset-1 rounded-lg bg-white/[0.08] transition-all duration-300 ease-out ${
              hoveredIndex === index ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          />

          <span
            className={`relative z-10 transition-all duration-300 ease-out ${
              hoveredIndex === index ? "text-white scale-110" : "text-neutral-500"
            }`}
          >
            {social.icon}
          </span>

          <span
            className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 h-[2px] rounded-full bg-white transition-all duration-300 ease-out ${
              hoveredIndex === index ? "w-3 opacity-100" : "w-0 opacity-0"
            }`}
          />

          <span
            className={`absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-white text-neutral-950 text-[11px] font-medium whitespace-nowrap transition-all duration-300 ease-out z-20 ${
              hoveredIndex === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 pointer-events-none"
            }`}
          >
            {social.name}
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 size-2 rotate-45 bg-white" />
          </span>
        </a>
      ))}
    </div>
  );
}
