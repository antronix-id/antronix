import React from "react";
import { LaptopMockup } from "@/components/ui/laptop-mockup";

export interface SafariProps extends React.HTMLAttributes<HTMLDivElement> {
  url?: string;
  src?: string;
  videoSrc?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  children?: React.ReactNode;
}

export function Safari({
  url = "artificialripe.com",
  src,
  videoSrc,
  width,
  height,
  className = "",
  children,
  ...props
}: SafariProps) {
  return (
    <LaptopMockup
      url={url}
      src={src}
      videoSrc={videoSrc}
      showSafariHeader={true}
      className={className}
      style={{ width, height }}
      {...props}
    >
      {children}
    </LaptopMockup>
  );
}
