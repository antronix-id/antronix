"use client";

import { cn } from "@/lib/utils";

export type MarkerConfig = {
  lng: number;
  lat: number;
  label: string;
  popupTitle?: string;
  popupDesc?: string;
  icon?: "hq" | "media" | "system";
};

export type LocationMapProps = {
  center?: [number, number];
  zoom?: number;
  pitch?: number;
  bearing?: number;
  markers?: MarkerConfig[];
  className?: string;
};

export function LocationMap({
  center = [104.7565, -2.9845],
  className,
}: LocationMapProps) {
  const [lng, lat] = center;
  const embedUrl = `https://maps.google.com/maps?q=${lat},${lng}&hl=id&z=14&output=embed`;

  return (
    <div className={cn("relative w-full h-full min-h-[320px] sm:min-h-[480px] overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-2xl group", className)}>


      {/* Interactive Custom Pin Overlay in Center */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
        <div className="group/pin relative flex flex-col items-center justify-center -translate-y-4">
          {/* Popup Card */}
          <div className="mb-2 flex items-center gap-2 rounded-2xl border border-red-500/30 bg-slate-950/95 px-3.5 py-2 text-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.85)] backdrop-blur-2xl">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
            <h4 className="text-xs font-bold tracking-wide text-white whitespace-nowrap">Artificial Ripe HQ</h4>
          </div>

          {/* Red Pin SVG */}
          <svg
            width="34"
            height="44"
            viewBox="0 0 34 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="filter drop-shadow-[0_4px_14px_rgba(239,68,68,0.7)] transition-transform duration-300 group-hover/pin:scale-110"
          >
            <path
              d="M17 0C7.611 0 0 7.611 0 17C0 29 17 42 17 42C17 42 34 29 34 17C34 7.611 26.389 0 17 0Z"
              fill="#ef4444"
            />
            <circle cx="17" cy="16" r="7.5" fill="#FFFFFF" />
            <path
              d="M5 43.5C5 41 29 41 29 43.5"
              stroke="#ef4444"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.8"
            />
          </svg>
        </div>
      </div>

      {/* Dark Styled Google Maps Iframe Embed */}
      <iframe
        title="Google Maps Location"
        src={embedUrl}
        className="w-full h-full min-h-[320px] sm:min-h-[480px] border-0 filter invert-[0.92] hue-rotate-180 contrast-125 saturate-50 opacity-80 transition-opacity duration-300 hover:opacity-100"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
