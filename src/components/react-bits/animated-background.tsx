"use client";

import { useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface AnimatedBackgroundProps {
  className?: string;
  particleCount?: number;
  variant?: "particles" | "aurora";
}

export function AnimatedBackground({
  className,
  particleCount = 65,
  variant = "particles",
}: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  // Exact Brand Hues: Magenta (330), Cyan (195), Lime Green (110)
  const brandHues = [330, 195, 110];

  const initParticles = useCallback(
    (canvas: HTMLCanvasElement) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      interface Particle {
        x: number;
        y: number;
        size: number;
        speedX: number;
        speedY: number;
        opacity: number;
        hue: number;
      }

      const particles: Particle[] = [];
      for (let i = 0; i < particleCount; i++) {
        const randomHue = brandHues[Math.floor(Math.random() * brandHues.length)];
        particles.push({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          size: Math.random() * 2.2 + 0.6,
          speedX: (Math.random() - 0.5) * 0.4,
          speedY: (Math.random() - 0.5) * 0.4,
          opacity: Math.random() * 0.55 + 0.15,
          hue: randomHue,
        });
      }

      const maxDist = 130;

      const animate = () => {
        ctx.clearRect(0, 0, rect.width, rect.height);

        particles.forEach((p, i) => {
          p.x += p.speedX;
          p.y += p.speedY;

          if (p.x < 0 || p.x > rect.width) p.speedX *= -1;
          if (p.y < 0 || p.y > rect.height) p.speedY *= -1;

          // Draw particle
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue}, 85%, 65%, ${p.opacity})`;
          ctx.fill();

          // Draw connections
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxDist) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              const alpha = (1 - dist / maxDist) * 0.18;
              const lineHue = (p.hue + p2.hue) / 2;
              ctx.strokeStyle = `hsla(${lineHue}, 80%, 65%, ${alpha})`;
              ctx.lineWidth = 0.6;
              ctx.stroke();
            }
          }
        });

        animationRef.current = requestAnimationFrame(animate);
      };

      animate();
    },
    [particleCount]
  );

  const initAurora = useCallback((canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    let time = 0;

    const animate = () => {
      time += 0.003;
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Aurora layers featuring logo colors: Magenta -> Cyan -> Lime
      const auroraColors = [
        { stop0: 330, stop1: 220 }, // Magenta to Cyan
        { stop0: 220, stop1: 120 }, // Cyan to Lime Green
        { stop0: 120, stop1: 330 }, // Lime Green to Magenta
      ];

      for (let layer = 0; layer < 3; layer++) {
        ctx.beginPath();
        ctx.moveTo(0, rect.height);

        for (let x = 0; x <= rect.width; x += 2) {
          const y =
            rect.height * 0.38 +
            Math.sin(x * 0.003 + time + layer * 2) * 85 +
            Math.sin(x * 0.007 + time * 1.5 + layer) * 45 +
            Math.cos(x * 0.001 + time * 0.5) * 65;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(rect.width, rect.height);
        ctx.closePath();

        const colorSet = auroraColors[layer];
        const gradient = ctx.createLinearGradient(0, 0, rect.width, 0);
        gradient.addColorStop(
          0,
          `hsla(${colorSet.stop0}, 85%, 60%, ${0.1 - layer * 0.02})`
        );
        gradient.addColorStop(
          0.5,
          `hsla(${colorSet.stop1}, 85%, 60%, ${0.14 - layer * 0.03})`
        );
        gradient.addColorStop(
          1,
          `hsla(${colorSet.stop0}, 85%, 60%, ${0.1 - layer * 0.02})`
        );

        ctx.fillStyle = gradient;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (variant === "aurora") {
      initAurora(canvas);
    } else {
      initParticles(canvas);
    }

    const handleResize = () => {
      cancelAnimationFrame(animationRef.current);
      if (variant === "aurora") {
        initAurora(canvas);
      } else {
        initParticles(canvas);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [variant, initParticles, initAurora]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  );
}
