"use client";

import type React from "react";
import { cn } from "@/lib/utils";

export interface SafariProps extends React.HTMLAttributes<HTMLDivElement> {
  url?: string;
  src?: string;
  imageSrc?: string;
  videoSrc?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
}

export function Safari({
  url = "https://example.com",
  src,
  imageSrc,
  videoSrc,
  width,
  height,
  className,
  ...props
}: SafariProps) {
  const displayImage = imageSrc || src;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-slate-700/60 bg-slate-900 shadow-2xl",
        className
      )}
      style={{ width, height }}
      {...props}
    >
      {/* Safari Window Header Bar */}
      <div className="flex h-9 items-center justify-between border-b border-slate-800 bg-slate-950/90 px-4">
        {/* Window controls (red, yellow, green dots) */}
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-rose-500/80" />
          <div className="h-3 w-3 rounded-full bg-amber-500/80" />
          <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
        </div>

        {/* Address Bar */}
        <div className="flex h-6 max-w-sm flex-1 items-center justify-center rounded-md border border-slate-800 bg-slate-900/80 px-3 text-xs font-mono text-slate-400">
          <span className="truncate">{url}</span>
        </div>

        <div className="w-12" />
      </div>

      {/* Safari Content Window */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
        {videoSrc ? (
          <video
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          />
        ) : displayImage ? (
          <img
            src={displayImage}
            alt={url}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-500 text-sm">
            Safari Preview
          </div>
        )}
      </div>
    </div>
  );
}

export default Safari;
