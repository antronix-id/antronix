"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string
  repeat?: number
  duration?: number
  fontSize?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"
  strokeWidth?: string
}

const fontSizeClasses = {
  sm: "text-3xl sm:text-4xl md:text-5xl",
  md: "text-4xl sm:text-5xl md:text-6xl",
  lg: "text-5xl sm:text-6xl md:text-7xl",
  xl: "text-6xl sm:text-7xl md:text-8xl",
  "2xl": "text-7xl sm:text-8xl md:text-9xl",
  "3xl": "text-8xl sm:text-9xl md:text-[10rem]",
}

export const Marquee = React.forwardRef<HTMLDivElement, MarqueeProps>(
  ({
    className,
    text,
    repeat = 4,
    duration = 20,
    fontSize = "lg",
    strokeWidth = "1px",
    ...props
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden py-1 sm:py-2 select-none bg-transparent pointer-events-none",
          className
        )}
        {...props}
      >
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ 
            x: ["0%", "-50%"]
          }}
          transition={{ 
            repeat: Number.POSITIVE_INFINITY, 
            ease: "linear", 
            duration,
          }}
        >
          {[...Array(repeat)].map((_, index) => (
            <div key={index} className="flex items-center mx-4 shrink-0">
              <span
                className={cn(
                  fontSizeClasses[fontSize],
                  "font-bold text-transparent px-4 tracking-normal"
                )}
                style={{
                  WebkitTextStroke: `${strokeWidth} rgba(156, 163, 175, 0.45)`,
                }}
              >
                {text}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    )
  }
)

Marquee.displayName = "Marquee"
