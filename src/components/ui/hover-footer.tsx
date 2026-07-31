"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextHoverEffect = ({
  text,
  duration,
  className,
}: {
  text: string;
  duration?: number;
  automatic?: boolean;
  className?: string;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 1400 200"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={cn("select-none uppercase cursor-pointer w-full h-full", className)}
    >
      <defs>
        {/* Continuous Flowing Liquid Silver Gradient */}
        <motion.linearGradient
          id="liquidSilverFlow"
          gradientUnits="userSpaceOnUse"
          initial={{ x1: "0%", y1: "0%", x2: "100%", y2: "100%" }}
          animate={{
            x1: ["0%", "100%", "-50%", "0%"],
            y1: ["0%", "100%", "50%", "0%"],
            x2: ["100%", "200%", "50%", "100%"],
            y2: ["100%", "0%", "150%", "100%"],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <stop offset="0%" stopColor="#334155" />
          <stop offset="20%" stopColor="#94a3b8" />
          <stop offset="40%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#e2e8f0" />
          <stop offset="80%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </motion.linearGradient>

        {/* Hover Silver Metallic Gradient */}
        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="25%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#f1f5f9" />
              <stop offset="75%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="25%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>

        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>
      </defs>

      {/* Base stroke & subtle liquid fill layer */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#liquidSilverFlow)"
        strokeWidth="1.5"
        fill="url(#liquidSilverFlow)"
        fillOpacity="0.12"
        className="font-extrabold text-[96px] tracking-[0.2em]"
        style={{ opacity: hovered ? 0.8 : 0.4 }}
      >
        {text}
      </text>

      {/* Flowing Liquid Animated Text Stroke */}
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#liquidSilverFlow)"
        strokeWidth="1.8"
        fill="url(#liquidSilverFlow)"
        fillOpacity="0.18"
        className="font-extrabold text-[96px] tracking-[0.2em]"
        initial={{ strokeDashoffset: 2500, strokeDasharray: 2500 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 2500,
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.text>

      {/* Hover reveal gradient layer */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="2"
        fill="url(#textGradient)"
        fillOpacity="0.3"
        mask="url(#textMask)"
        className="font-extrabold text-[96px] tracking-[0.2em]"
      >
        {text}
      </text>
    </svg>
  );
};

export const FooterBackgroundGradient = () => {
  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(125% 125% at 50% 10%, #0F0F1166 40%, rgba(203, 213, 225, 0.15) 100%)",
      }}
    />
  );
};
