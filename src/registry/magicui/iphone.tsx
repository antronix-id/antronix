import React, { HTMLAttributes } from "react";

export interface IphoneProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  videoSrc?: string;
  className?: string;
  children?: React.ReactNode;
}

export function Iphone({
  src,
  videoSrc,
  className = "",
  children,
  ...props
}: IphoneProps) {
  return (
    <div
      className={`relative mx-auto aspect-[433/882] w-full max-w-[434px] select-none ${className}`}
      {...props}
    >
      {/* Screen Media Container */}
      <div className="absolute inset-[3.2%] z-0 overflow-hidden rounded-[38px] sm:rounded-[42px] bg-black">
        {videoSrc ? (
          <video
            className="h-full w-full object-cover"
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
          />
        ) : src ? (
          <img
            className="h-full w-full object-cover"
            src={src}
            alt="iPhone screen content"
          />
        ) : (
          children
        )}
      </div>

      {/* iPhone 15 Pro Frame SVG */}
      <svg
        className="pointer-events-none relative z-10 h-full w-full select-none"
        viewBox="0 0 433 882"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Phone Border with Metallic Gradient feel */}
        <rect
          x="4"
          y="4"
          width="425"
          height="874"
          rx="52"
          stroke="url(#iphone-metal-gradient)"
          strokeWidth="6"
        />
        <rect
          x="1"
          y="1"
          width="431"
          height="880"
          rx="55"
          stroke="#1e1e24"
          strokeWidth="2"
        />

        {/* Inner Screen Bezel */}
        <rect
          x="11"
          y="11"
          width="411"
          height="860"
          rx="45"
          stroke="#000000"
          strokeWidth="8"
        />

        {/* Dynamic Island */}
        <rect
          x="156"
          y="24"
          width="121"
          height="30"
          rx="15"
          fill="#000000"
        />
        {/* Dynamic Island Lens Details */}
        <circle cx="256" cy="39" r="5.5" fill="#101015" />
        <circle cx="256" cy="39" r="2.5" fill="#050508" />
        <circle cx="178" cy="39" r="4.5" fill="#09090d" />

        {/* Speaker Slot */}
        <rect
          x="191"
          y="16"
          width="51"
          height="2.5"
          rx="1.25"
          fill="#1c1c1e"
        />

        {/* Side Hardware Buttons */}
        {/* Action Button */}
        <rect x="0" y="115" width="3.5" height="26" rx="1.75" fill="#3a3a3c" />
        {/* Volume Up */}
        <rect x="0" y="158" width="3.5" height="50" rx="1.75" fill="#3a3a3c" />
        {/* Volume Down */}
        <rect x="0" y="222" width="3.5" height="50" rx="1.75" fill="#3a3a3c" />
        {/* Power Button */}
        <rect x="429.5" y="178" width="3.5" height="75" rx="1.75" fill="#3a3a3c" />

        <defs>
          <linearGradient
            id="iphone-metal-gradient"
            x1="0"
            y1="0"
            x2="433"
            y2="882"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#48484a" />
            <stop offset="0.3" stopColor="#2c2c2e" />
            <stop offset="0.7" stopColor="#3a3a3c" />
            <stop offset="1" stopColor="#1c1c1e" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
