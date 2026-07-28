"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface LiquidMetalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  children?: React.ReactNode;
  viewMode?: "text" | "icon";
  variant?: "default" | "brand" | "outline";
  className?: string;
}

export function LiquidMetalButton({
  label = "Get Started",
  children,
  onClick,
  viewMode = "text",
  variant = "default",
  className = "",
  ...props
}: LiquidMetalButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [ripples, setRipples] = useState<
    Array<{ x: number; y: number; id: number }>
  >([]);
  const shaderRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const shaderMount = useRef<any>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleId = useRef(0);

  const isIcon = viewMode === "icon";

  useEffect(() => {
    const styleId = "shader-canvas-style-exploded";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        .shader-container-exploded canvas {
          width: 100% !important;
          height: 100% !important;
          display: block !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          border-radius: 100px !important;
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

    let isMounted = true;
    let resizeObserver: ResizeObserver | null = null;

    const loadShader = async () => {
      try {
        const { liquidMetalFragmentShader, ShaderMount } = await import(
          "@paper-design/shaders"
        );

        if (shaderRef.current && isMounted) {
          if (shaderMount.current?.destroy) {
            shaderMount.current.destroy();
          }

          shaderMount.current = new ShaderMount(
            shaderRef.current,
            liquidMetalFragmentShader,
            {
              u_repetition: 4,
              u_softness: 0.3,
              u_shiftRed: 0.35,
              u_shiftBlue: 0.35,
              u_distortion: 0.15,
              u_contour: 0.2,
              u_angle: 45,
              u_scale: 3,
              u_shape: 0,
              u_offsetX: 0.1,
              u_offsetY: -0.1,
            },
            undefined,
            0.45
          );

          const updateCanvasSize = () => {
            if (shaderRef.current) {
              const canvas = shaderRef.current.querySelector("canvas");
              const rect = shaderRef.current.getBoundingClientRect();
              if (canvas && rect.width > 0 && rect.height > 0) {
                const dpr = Math.min(window.devicePixelRatio || 1, 2);
                canvas.width = Math.round(rect.width * dpr);
                canvas.height = Math.round(rect.height * dpr);
                canvas.style.width = "100%";
                canvas.style.height = "100%";
                if (typeof shaderMount.current?.resize === "function") {
                  shaderMount.current.resize();
                }
              }
            }
          };

          updateCanvasSize();

          resizeObserver = new ResizeObserver(() => {
            updateCanvasSize();
          });
          resizeObserver.observe(shaderRef.current);
        }
      } catch (error) {
        console.error("Failed to load shader:", error);
      }
    };

    loadShader();

    return () => {
      isMounted = false;
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (shaderMount.current?.destroy) {
        shaderMount.current.destroy();
        shaderMount.current = null;
      }
    };
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    shaderMount.current?.setSpeed?.(0.85);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
    shaderMount.current?.setSpeed?.(0.45);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (shaderMount.current?.setSpeed) {
      shaderMount.current.setSpeed(1.8);
      setTimeout(() => {
        if (isHovered) {
          shaderMount.current?.setSpeed?.(0.85);
        } else {
          shaderMount.current?.setSpeed?.(0.45);
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

  const content = children || (isIcon ? <Sparkles size={16} className="text-slate-300" /> : label);

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center select-none group/liquid",
        className
      )}
    >
      <div
        style={{
          perspective: "1000px",
          perspectiveOrigin: "50% 50%",
          width: "100%",
        }}
      >
        <div
          className="relative w-full flex items-center justify-center"
          style={{
            transformStyle: "preserve-3d",
            transition:
              "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.4s ease, height 0.4s ease",
          }}
        >
          {/* Label / Children Layer */}
          <div
            className={cn(
              "relative z-30 flex items-center justify-center gap-2 text-sm font-medium text-slate-200 pointer-events-none transition-all duration-300 px-6 py-2.5 min-h-[44px] whitespace-nowrap",
              isIcon && "p-2.5 min-w-[44px] min-h-[44px]"
            )}
            style={{
              transformStyle: "preserve-3d",
              transform: "translateZ(20px)",
              textShadow: "0px 1px 3px rgba(0, 0, 0, 0.8)",
            }}
          >
            {content}
          </div>

          {/* Inner Metallic Pill Layer */}
          <div
            className="absolute inset-[2px] z-20 rounded-full"
            style={{
              transformStyle: "preserve-3d",
              transform: `translateZ(10px) ${
                isPressed ? "translateY(1px) scale(0.98)" : "translateY(0) scale(1)"
              }`,
              transition:
                "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.15s ease",
            }}
          >
            <div
              className={cn(
                "h-full w-full rounded-full transition-all duration-300",
                variant === "brand"
                  ? "bg-gradient-to-r from-[oklch(0.68_0.25_340)] via-[oklch(0.68_0.22_230)] to-[oklch(0.72_0.22_135)] opacity-90 shadow-lg shadow-primary/20"
                  : "bg-gradient-to-b from-[#222225] to-[#08080a]"
              )}
              style={{
                boxShadow: isPressed
                  ? "inset 0px 2px 4px rgba(0, 0, 0, 0.6), inset 0px 1px 2px rgba(0, 0, 0, 0.5)"
                  : "none",
              }}
            />
          </div>

          {/* Shader Canvas Background Layer */}
          <div
            className="absolute inset-0 z-10 rounded-full overflow-hidden"
            style={{
              transformStyle: "preserve-3d",
              transform: `translateZ(0px) ${
                isPressed ? "translateY(1px) scale(0.98)" : "translateY(0) scale(1)"
              }`,
              boxShadow: isPressed
                ? "0px 0px 0px 1px rgba(255, 255, 255, 0.2)"
                : isHovered
                ? "0px 0px 0px 1.5px rgba(255, 255, 255, 0.5), 0px 0px 16px rgba(255, 255, 255, 0.2)"
                : "0px 0px 0px 1.5px rgba(255, 255, 255, 0.35), 0px 0px 10px rgba(255, 255, 255, 0.1)",
            }}
          >
            <div
              ref={shaderRef}
              className="shader-container-exploded h-full w-full rounded-full"
            />
          </div>

          {/* Trigger Button Layer */}
          <button
            ref={buttonRef}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            className="absolute inset-0 z-40 w-full h-full bg-transparent border-0 cursor-pointer outline-none rounded-full overflow-hidden"
            style={{
              transformStyle: "preserve-3d",
              transform: "translateZ(25px)",
            }}
            aria-label={typeof content === "string" ? content : label || "button"}
            {...props}
          >
            {ripples.map((ripple) => (
              <span
                key={ripple.id}
                style={{
                  position: "absolute",
                  left: `${ripple.x}px`,
                  top: `${ripple.y}px`,
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 70%)",
                  pointerEvents: "none",
                  animation: "ripple-animation 0.6s ease-out",
                }}
              />
            ))}
          </button>
        </div>
      </div>
    </div>
  );
}
