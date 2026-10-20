"use client";

import React, { useRef, useCallback } from "react";
import { buildGlowVars, buildGradientVars } from "./glow-vars";
import { useBorderSweep } from "./use-border-sweep";
import "./border-glow.css";

interface BorderGlowProps {
  children?: React.ReactNode;
  className?: string;
  edgeSensitivity?: number;
  glowColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  glowRadius?: number;
  glowIntensity?: number;
  coneSpread?: number;
  animated?: boolean;
  colors?: string[];
  fillOpacity?: number;
}

export function BorderGlow({
  children,
  className = "",
  edgeSensitivity = 30,
  glowColor = "330 85 70",
  backgroundColor = "rgba(18, 15, 23, 0.75)",
  borderRadius = 24,
  glowRadius = 40,
  glowIntensity = 1.0,
  coneSpread = 25,
  animated = false,
  colors = ["#FF2A85", "#00A3FF", "#39E500"],
  fillOpacity = 0,
}: BorderGlowProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const rafRef = useRef<number | null>(null);

  const handlePointerEnter = useCallback(() => {
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;

      if (rafRef.current) return;

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        if (!rectRef.current && card) {
          rectRef.current = card.getBoundingClientRect();
        }
        const rect = rectRef.current;
        if (!rect) return;

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;

        const dx = x - cx;
        const dy = y - cy;

        let kx = Infinity;
        let ky = Infinity;
        if (dx !== 0) kx = cx / Math.abs(dx);
        if (dy !== 0) ky = cy / Math.abs(dy);
        const edge = Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);

        let angle = 0;
        if (dx !== 0 || dy !== 0) {
          const radians = Math.atan2(dy, dx);
          angle = radians * (180 / Math.PI) + 90;
          if (angle < 0) angle += 360;
        }

        card.style.setProperty("--edge-proximity", `${(edge * 100).toFixed(1)}`);
        card.style.setProperty("--cursor-angle", `${angle.toFixed(1)}deg`);
      });
    },
    []
  );

  const handlePointerLeave = useCallback(() => {
    rectRef.current = null;
  }, []);

  useBorderSweep(cardRef, animated);

  const glowVars = buildGlowVars(glowColor, glowIntensity);

  return (
    <div
      ref={cardRef}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`border-glow-card ${className}`}
      style={
        {
          "--card-bg": backgroundColor,
          "--edge-sensitivity": edgeSensitivity,
          "--border-radius": `${borderRadius}px`,
          "--glow-padding": `${glowRadius}px`,
          "--cone-spread": coneSpread,
          "--fill-opacity": fillOpacity,
          willChange: "transform",
          ...glowVars,
          ...buildGradientVars(colors),
        } as React.CSSProperties
      }
    >
      <span className="edge-light" />
      <div className="border-glow-inner">{children}</div>
    </div>
  );
}

export default BorderGlow;
