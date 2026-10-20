import React from "react";
import {
  Lock,
  ChevronLeft,
  ChevronRight,
  PanelLeft,
  Shield,
  RotateCw,
  Share,
  Plus,
  Copy,
} from "lucide-react";
import { IMAGES } from "@/data";

export interface LaptopMockupProps extends React.HTMLAttributes<HTMLDivElement> {
  url?: string;
  src?: string;
  videoSrc?: string;
  showSafariHeader?: boolean;
  className?: string;
  children?: React.ReactNode;
  playOnHover?: boolean;
  isHovered?: boolean;
}

export function LaptopMockup({
  url = "magicui.design",
  src,
  videoSrc,
  showSafariHeader = true,
  className = "",
  children,
  playOnHover = true,
  isHovered: externalHovered,
  onMouseEnter,
  onMouseLeave,
  ...props
}: LaptopMockupProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [internalHovered, setInternalHovered] = React.useState(false);
  const [initialPreviewDone, setInitialPreviewDone] = React.useState(false);

  const activeHovered = externalHovered !== undefined ? externalHovered : internalHovered;

  // Continuously play video in loop
  React.useEffect(() => {
    if (!videoSrc || !videoRef.current) return;
    const video = videoRef.current;
    video.play().catch(() => {});
  }, [videoSrc]);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setInternalHovered(true);
    onMouseEnter?.(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setInternalHovered(false);
    onMouseLeave?.(e);
  };

  return (
    <div
      className={`relative w-full select-none ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {/* Laptop Hardware Frame Overlay */}
      <img
        src={IMAGES.laptopFrame}
        alt="Laptop Frame"
        className="pointer-events-none relative z-20 w-full h-auto object-contain filter drop-shadow-2xl"
      />

      {/* Laptop Screen Content Container */}
      <div
        className="absolute z-10 overflow-hidden bg-slate-950 flex flex-col rounded-t-[4px] sm:rounded-t-[6px]"
        style={{
          top: "5.6%",
          left: "8.8%",
          width: "82.4%",
          height: "85.8%",
        }}
      >
        {/* Safari Browser Bar inside Laptop Screen */}
        {showSafariHeader && (
          <div className="flex h-3 sm:h-4 md:h-[18px] w-full shrink-0 items-center justify-between border-b border-white/10 bg-[#1e1e20] px-1.5 sm:px-2.5 text-[8px] sm:text-[9.5px] text-white/50 select-none">
            {/* Left Controls */}
            <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
              {/* Traffic lights */}
              <div className="flex items-center gap-0.5 mr-0.5">
                <div className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-white/20" />
                <div className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-white/20" />
                <div className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-white/20" />
              </div>
              <PanelLeft className="h-2 w-2 sm:h-2.5 sm:w-2.5 text-white/40 hidden sm:block shrink-0" />
              <div className="flex items-center gap-0.5 shrink-0">
                <ChevronLeft className="h-2 w-2 sm:h-2.5 sm:w-2.5 text-white/40 shrink-0" />
                <ChevronRight className="h-2 w-2 sm:h-2.5 sm:w-2.5 text-white/40 shrink-0" />
              </div>
              <Shield className="h-2 w-2 sm:h-2.5 sm:w-2.5 text-white/40 ml-0.5 hidden md:block shrink-0" />
            </div>

            {/* Center URL Address Bar */}
            <div className="flex h-2 sm:h-2.5 md:h-3 max-w-[100px] sm:max-w-[160px] md:max-w-[200px] flex-1 items-center justify-between rounded bg-white/[0.08] px-1 text-[6.5px] sm:text-[8px] text-white/70 mx-1 sm:mx-1.5 shadow-inner overflow-hidden">
              <div className="flex items-center gap-0.5 min-w-0 mx-auto">
                <Lock className="h-1.5 w-1.5 sm:h-2 sm:w-2 text-white/50 shrink-0" />
                <span className="truncate font-sans tracking-tight text-white/80 text-[6.5px] sm:text-[8px]">{url}</span>
              </div>
              <RotateCw className="h-1.5 w-1.5 sm:h-2 sm:w-2 text-white/40 shrink-0 hidden sm:block" />
            </div>

            {/* Right Action Icons */}
            <div className="flex items-center gap-0.5 sm:gap-1 text-white/40 shrink-0">
              <Share className="h-2 w-2 sm:h-2.5 sm:w-2.5 hidden sm:block shrink-0" />
              <Plus className="h-2 w-2 sm:h-2.5 sm:w-2.5 hidden sm:block shrink-0" />
              <Copy className="h-2 w-2 sm:h-2.5 sm:w-2.5 hidden sm:block shrink-0" />
            </div>
          </div>
        )}

        {/* Video / Image Screen Media */}
        <div className="relative flex-1 w-full h-full overflow-hidden bg-slate-950">
          {videoSrc ? (
            <video
              ref={videoRef}
              src={videoSrc}
              poster={src || undefined}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="h-full w-full object-cover"
            />
          ) : src ? (
            <img src={src} alt={url} className="h-full w-full object-cover" />
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
}
