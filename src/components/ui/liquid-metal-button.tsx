"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface LiquidMetalButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  label?: string;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  viewMode?: "text" | "icon";
  href?: string;
  target?: string;
  className?: string;
}

export function LiquidMetalButton({
  label = "Get Started",
  children,
  onClick,
  viewMode = "text",
  href,
  target,
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
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
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

    const loadShader = async () => {
      try {
        const { liquidMetalFragmentShader, ShaderMount } = await import(
          "@paper-design/shaders"
        );

        if (shaderRef.current && isMounted) {
          if (shaderMount.current?.dispose) {
            shaderMount.current.dispose();
          } else if (shaderMount.current?.destroy) {
            shaderMount.current.destroy();
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
              u_shape: 0,
              u_offsetX: 0.1,
              u_offsetY: -0.1,
            },
            undefined,
            0.6
          );
        }
      } catch (error) {
        console.error("Failed to load shader:", error);
      }
    };

    loadShader();

    return () => {
      isMounted = false;
      if (shaderMount.current?.dispose) {
        shaderMount.current.dispose();
        shaderMount.current = null;
      } else if (shaderMount.current?.destroy) {
        shaderMount.current.destroy();
        shaderMount.current = null;
      }
    };
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    shaderMount.current?.setSpeed?.(1);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
    shaderMount.current?.setSpeed?.(0.6);
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
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

  const content = children || (
    <>
      {isIcon && (
        <Sparkles
          size={16}
          style={{
            color: "#e0e0e6",
            filter: "drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.5))",
            transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
            transform: "scale(1)",
          }}
        />
      )}
      {!isIcon && (
        <span
          style={{
            fontSize: "14px",
            color: "#e0e0e6",
            fontWeight: 500,
            textShadow: "0px 1px 2px rgba(0, 0, 0, 0.5)",
            transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
            transform: "scale(1)",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
      )}
    </>
  );

  return (
    <div className={cn("relative inline-flex items-center justify-center select-none group/liquid", className)}>
      <div
        className="relative h-full flex items-center justify-center"
        style={{
          perspective: "1000px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        <div
          className={cn(
            "relative flex items-center justify-center min-h-[46px] h-full",
            isIcon ? "w-[46px] h-[46px] min-w-[46px]" : "px-6 py-2.5"
          )}
          style={{
            transformStyle: "preserve-3d",
            transition:
              "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.4s ease, height 0.4s ease",
            transform: "none",
          }}
        >
          {/* Layer 1: Content Layer */}
          <div
            className="relative z-30 flex items-center justify-center gap-2 text-sm font-medium text-[#e0e0e6] pointer-events-none whitespace-nowrap h-full"
            style={{
              transformStyle: "preserve-3d",
              transform: "translateZ(20px)",
              textShadow: "0px 1px 2px rgba(0, 0, 0, 0.5)",
            }}
          >
            {content}
          </div>

          {/* Layer 2: Inner Metallic Pill Layer (Solid Dark Pill to prevent diagonal streak through text) */}
          <div
            className="absolute inset-0 z-20 w-full h-full pointer-events-none"
            style={{
              transformStyle: "preserve-3d",
              transform: `translateZ(10px) ${
                isPressed ? "translateY(1px) scale(0.98)" : "translateY(0) scale(1)"
              }`,
              transition:
                "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.4s ease, height 0.4s ease",
            }}
          >
            <div
              style={{
                width: "calc(100% - 4px)",
                height: "calc(100% - 4px)",
                margin: "2px",
                borderRadius: "100px",
                background: "linear-gradient(180deg, #202020 0%, #000000 100%)",
                boxShadow: isPressed
                  ? "inset 0px 2px 4px rgba(0, 0, 0, 0.4), inset 0px 1px 2px rgba(0, 0, 0, 0.3)"
                  : "inset 0px 1.5px 2px rgba(255, 255, 255, 0.4), inset 0px -1.5px 3px rgba(255, 255, 255, 0.2)",
                transition:
                  "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.4s ease, height 0.4s ease, box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
          </div>

          {/* Layer 3: Shader Canvas Background & Shadow Layer */}
          <div
            className="absolute inset-0 z-10 w-full h-full pointer-events-none"
            style={{
              transformStyle: "preserve-3d",
              transform: `translateZ(0px) ${
                isPressed ? "translateY(1px) scale(0.98)" : "translateY(0) scale(1)"
              }`,
              transition:
                "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.4s ease, height 0.4s ease",
            }}
          >
            <div
              style={{
                height: "100%",
                width: "100%",
                borderRadius: "100px",
                boxShadow: isPressed
                  ? "0px 0px 0px 1px rgba(0, 0, 0, 0.5), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)"
                  : isHovered
                  ? "0px 0px 0px 1px rgba(0, 0, 0, 0.4), 0px 12px 6px 0px rgba(0, 0, 0, 0.05), 0px 8px 5px 0px rgba(0, 0, 0, 0.1), 0px 4px 4px 0px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.2)"
                  : "0px 0px 0px 1px rgba(0, 0, 0, 0.3), 0px 36px 14px 0px rgba(0, 0, 0, 0.02), 0px 20px 12px 0px rgba(0, 0, 0, 0.08), 0px 9px 9px 0px rgba(0, 0, 0, 0.12), 0px 2px 5px 0px rgba(0, 0, 0, 0.15)",
                transition:
                  "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.4s ease, height 0.4s ease, box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
                background: "rgb(0 0 0 / 0)",
              }}
            >
              <div
                ref={shaderRef}
                className="shader-container-exploded relative w-full h-full rounded-[100px] overflow-hidden"
              />
            </div>
          </div>

          {/* Layer 4: Interactive Trigger Layer */}
          {href ? (
            <Link
              ref={buttonRef as unknown as React.Ref<HTMLAnchorElement>}
              href={href}
              target={target}
              onClick={handleClick}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseDown={() => setIsPressed(true)}
              onMouseUp={() => setIsPressed(false)}
              className="absolute inset-0 z-40 w-full h-full bg-transparent border-0 cursor-pointer outline-none rounded-[100px] overflow-hidden block"
              style={{
                transformStyle: "preserve-3d",
                transform: "translateZ(25px)",
              }}
              aria-label={typeof content === "string" ? content : label || "button"}
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
                      "radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 70%)",
                    pointerEvents: "none",
                    animation: "ripple-animation 0.6s ease-out",
                  }}
                />
              ))}
            </Link>
          ) : (
            <button
              ref={buttonRef as unknown as React.Ref<HTMLButtonElement>}
              onClick={handleClick}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseDown={() => setIsPressed(true)}
              onMouseUp={() => setIsPressed(false)}
              className="absolute inset-0 z-40 w-full h-full bg-transparent border-0 cursor-pointer outline-none rounded-[100px] overflow-hidden block"
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
                      "radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 70%)",
                    pointerEvents: "none",
                    animation: "ripple-animation 0.6s ease-out",
                  }}
                />
              ))}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
