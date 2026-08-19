"use client";

import { liquidMetalFragmentShader, ShaderMount } from "@paper-design/shaders";
import { Sparkles } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface LiquidMetalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  viewMode?: "text" | "icon";
  children?: React.ReactNode;
  variant?: "default" | "outline" | "secondary" | "ghost" | "destructive" | "link";
  size?: "default" | "sm" | "lg" | "icon" | "xs" | "icon-xs" | "icon-sm" | "icon-lg";
}

export function LiquidMetalButton({
  label,
  onClick,
  viewMode = "text",
  children,
  className,
  variant = "default",
  size = "default",
  disabled,
  type = "button",
  ...props
}: LiquidMetalButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [hasWebglError, setHasWebglError] = useState(false);
  const [ripples, setRipples] = useState<
    Array<{ x: number; y: number; id: number }>
  >([]);
  const shaderRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const shaderMount = useRef<any>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleId = useRef(0);

  const isIconOnly = viewMode === "icon" || size === "icon" || size === "icon-xs" || size === "icon-sm" || size === "icon-lg";

  const sizeClasses = isIconOnly
    ? size === "xs" || size === "icon-xs"
      ? "h-7 w-7 p-0"
      : size === "sm" || size === "icon-sm"
      ? "h-8 w-8 p-0"
      : size === "lg" || size === "icon-lg"
      ? "h-11 w-11 p-0"
      : "h-10 w-10 p-0"
    : size === "xs"
    ? "h-7 px-3 text-xs"
    : size === "sm"
    ? "h-8.5 px-4 text-xs sm:text-sm"
    : size === "lg"
    ? "h-11.5 px-6 text-base"
    : "h-10 px-5 text-sm";

  useEffect(() => {
    const styleId = "shader-canvas-style-exploded";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        .shader-container-exploded {
          width: 100% !important;
          height: 100% !important;
          position: absolute !important;
          inset: 0 !important;
        }
        .shader-container-exploded canvas {
          width: 100% !important;
          height: 100% !important;
          display: block !important;
          position: absolute !important;
          inset: 0 !important;
          border-radius: 9999px !important;
        }
        @keyframes ripple-animation {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0.6;
          }
          100% {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }

    const loadShader = async () => {
      try {
        if (shaderRef.current) {
          if (shaderMount.current?.destroy) {
            shaderMount.current.destroy();
          }

          // Test WebGL context availability safely
          const testCanvas = document.createElement("canvas");
          const gl = testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl");
          if (!gl) {
            setHasWebglError(true);
            return;
          }

          shaderMount.current = new ShaderMount(
            shaderRef.current,
            liquidMetalFragmentShader,
            {
              u_repetition: 4,
              u_softness: 0.5,
              u_shiftRed: 0.3,
              u_shiftBlue: 0.3,
              u_distortion: 0,
              u_contour: 0,
              u_angle: 45,
              u_scale: 8,
              u_shape: 1,
              u_offsetX: 0.1,
              u_offsetY: -0.1,
            },
            undefined,
            0.6,
          );

          testCanvas.addEventListener("webglcontextlost", (e) => {
            e.preventDefault();
            setHasWebglError(true);
          });

          setHasWebglError(false);
        }
      } catch (error) {
        setHasWebglError(true);
      }
    };

    loadShader();

    return () => {
      if (shaderMount.current?.destroy) {
        try {
          shaderMount.current.destroy();
        } catch {
          // Ignore cleanup error
        }
        shaderMount.current = null;
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (disabled) return;
    setIsHovered(true);
    shaderMount.current?.setSpeed?.(1);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
    shaderMount.current?.setSpeed?.(0.6);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    if (shaderMount.current?.setSpeed) {
      shaderMount.current.setSpeed(2.4);
      setTimeout(() => {
        if (isHovered) {
          shaderMount.current?.setSpeed?.(1);
        } else {
          shaderMount.current?.setSpeed?.(0.6);
        }
      }, 300);
    }

    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const ripple = { x, y, id: rippleId.current++ };

      setRipples((prev) => [...prev, ripple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
      }, 600);
    }

    onClick?.(e);
  };

  const displayContent = children || label;

  return (
    <button
      ref={buttonRef}
      type={type}
      disabled={disabled}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      aria-label={typeof label === "string" ? label : undefined}
      className={cn(
        "relative inline-flex items-center justify-center rounded-full overflow-hidden select-none cursor-pointer outline-none shrink-0 transition-transform duration-200 active:scale-95",
        isPressed ? "scale-95" : isHovered ? "scale-[1.02]" : "scale-100",
        sizeClasses,
        disabled && "opacity-50 pointer-events-none cursor-not-allowed",
        className
      )}
      {...props}
    >
      {/* 1. Outer Border Liquid Metal Shader Ring */}
      <div
        className={cn(
          "absolute inset-0 z-0 rounded-full overflow-hidden pointer-events-none liquid-metal-sheen-bg transition-all duration-300"
        )}
        style={{
          boxShadow: isHovered
            ? "0px 0px 0px 1px rgba(255, 255, 255, 0.35), 0px 8px 20px rgba(0, 0, 0, 0.5)"
            : "0px 0px 0px 1px rgba(255, 255, 255, 0.15), 0px 4px 12px rgba(0, 0, 0, 0.4)",
        }}
      >
        {!hasWebglError && (
          <div
            ref={shaderRef}
            className="shader-container-exploded absolute inset-0 w-full h-full rounded-full overflow-hidden"
          />
        )}
      </div>

      {/* 2. Solid Dark Center Cap (Covers Center, Exposing Only Outer Liquid Ring) */}
      <div
        className="absolute inset-[2.5px] z-10 rounded-full pointer-events-none"
        style={{
          background: "linear-gradient(180deg, #18181c 0%, #09090b 100%)",
          boxShadow: isPressed
            ? "inset 0px 2px 4px rgba(0, 0, 0, 0.8)"
            : "inset 0px 1px 1px rgba(255, 255, 255, 0.12), inset 0px -1px 2px rgba(0, 0, 0, 0.6)",
        }}
      />

      {/* 3. Button Content (Text / Icon) */}
      <div className="relative z-20 pointer-events-none flex items-center justify-center gap-2 whitespace-nowrap font-medium text-slate-200 group-hover:text-white transition-colors">
        {isIconOnly && !children && (
          <Sparkles
            size={16}
            className="text-slate-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
          />
        )}
        {!isIconOnly && (
          <span className="text-slate-200 group-hover:text-white font-medium text-shadow-[0_1px_2px_rgba(0,0,0,0.8)] flex items-center gap-2">
            {displayContent}
          </span>
        )}
        {isIconOnly && children && (
          <span className="text-slate-200 group-hover:text-white flex items-center justify-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            {children}
          </span>
        )}
      </div>

      {/* 4. Ripple Effects */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute z-30 pointer-events-none rounded-full"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
            width: "20px",
            height: "20px",
            background: "radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 70%)",
            animation: "ripple-animation 0.6s ease-out",
          }}
        />
      ))}
    </button>
  );
}
