"use client";

import Image from "next/image";
import { BRAND_LOGOS } from "@/data";
import { cn } from "@/lib/utils";
import "./ripple-pulse-loader.css";

export const RipplePulseLoader = ({ className }: { className?: string }) => {
  return (
    <div className={cn("loader", className)}>
      <div className="box">
        <div className="logo">
          {/* Mark punya ruang transparan lebih besar di atas, jadi digeser naik agar optis tengah */}
          <Image
            src={BRAND_LOGOS.mark.src}
            alt={BRAND_LOGOS.mark.alt}
            width={BRAND_LOGOS.mark.width}
            height={BRAND_LOGOS.mark.height}
            sizes="48px"
            className="h-11 w-auto -translate-y-[7%] object-contain filter drop-shadow-md"
            priority
          />
        </div>
      </div>
      <div className="box"></div>
      <div className="box"></div>
      <div className="box"></div>
      <div className="box"></div>
    </div>
  );
};

export const Component = RipplePulseLoader;
export default RipplePulseLoader;
