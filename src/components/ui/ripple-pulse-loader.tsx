"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import "./ripple-pulse-loader.css";

export const RipplePulseLoader = ({ className }: { className?: string }) => {
  return (
    <div className={cn("loader", className)}>
      <div className="box">
        <div className="logo">
          <Image
            src="/logo-agency.png"
            alt="Artificial Ripe Logo"
            width={32}
            height={32}
            className="h-8 w-8 object-contain filter drop-shadow-md"
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
