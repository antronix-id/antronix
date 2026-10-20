"use client";

import React, { useEffect, useRef } from 'react';
import type { CosmicGlowColor } from "@/types";
import "./parallax-cosmic.css";

interface ParallaxCosmicProps {
  /**
   * Main heading text (displayed large in the center)
   */
  head: string;
  
  /**
   * Subtitle text (displayed below the heading)
   * Comma-separated string that will be split into animated parts
   */
  text: string;
  
  /**
   * Whether the text animations should loop
   * @default true
   */
  loop?: boolean;
  
  /**
   * Custom class name for additional styling
   */
  className?: string;

  /**
   * Glow color variant ("cyan" | "pink" | "green")
   * @default "cyan"
   */
  glowColor?: CosmicGlowColor;
  
  /**
   * Optional children elements (e.g. CTA buttons)
   */
  children?: React.ReactNode;
}

/**
 * A cosmic parallax background component with animated stars and text
 */
const ParallaxCosmic: React.FC<ParallaxCosmicProps> = ({
  head,
  text,
  loop = true,
  className = '',
  glowColor = 'cyan',
  children,
}) => {
  const smallStarsRef = useRef<HTMLDivElement>(null);
  const mediumStarsRef = useRef<HTMLDivElement>(null);
  const bigStarsRef = useRef<HTMLDivElement>(null);
  
  // Split the text by commas and trim whitespace
  const textParts = text.split(',').map(part => part.trim());
  
  // Theme class selection
  const themeClass = glowColor === "pink" 
    ? "cosmic-theme-pink" 
    : glowColor === "green" 
    ? "cosmic-theme-green" 
    : "cosmic-theme-cyan";
  
  // Generate random star positions
  useEffect(() => {
    const buildStarBoxShadow = (count: number): string => {
      const shadows: string[] = [];

      for (let i = 0; i < count; i++) {
        const x = Math.floor(Math.random() * 2000);
        const y = Math.floor(Math.random() * 2000);
        shadows.push(`${x}px ${y}px #FFF`);
      }

      return shadows.join(', ');
    };

    // Star shadow ditulis langsung ke DOM: posisinya acak per mount, jadi tidak
    // boleh ikut HTML server (hydration mismatch) maupun memicu render berulang.
    if (smallStarsRef.current) smallStarsRef.current.style.boxShadow = buildStarBoxShadow(700);
    if (mediumStarsRef.current) mediumStarsRef.current.style.boxShadow = buildStarBoxShadow(200);
    if (bigStarsRef.current) bigStarsRef.current.style.boxShadow = buildStarBoxShadow(100);

    // Set animation iteration based on loop prop
    document.documentElement.style.setProperty(
      '--animation-iteration', 
      loop ? 'infinite' : '1'
    );
  }, [loop]);
  
  return (
    <div className={`cosmic-parallax-container ${themeClass} ${className}`}>
      {/* Stars layers */}
      <div 
        ref={smallStarsRef} 
        id="stars" 
        className="cosmic-stars"
      ></div>
      <div 
        ref={mediumStarsRef} 
        id="stars2" 
        className="cosmic-stars-medium"
      ></div>
      <div 
        ref={bigStarsRef} 
        id="stars3" 
        className="cosmic-stars-large"
      ></div>
      
      {/* Main Title in space */}
      <div id="title">{head.toUpperCase()}</div>

      {/* Horizon and Earth Arc */}
      <div id="horizon">
        <div className="glow"></div>
      </div>
      <div id="earth"></div>
      
      {/* Subtitle & CTA in lower dark area */}
      <div id="subtitle">
        {textParts.map((part, index) => (
          <React.Fragment key={index}>
            <span className={`subtitle-part-${index + 1}`}>{part.toUpperCase()}</span>
            {index < textParts.length - 1 && ' '}
          </React.Fragment>
        ))}
      </div>
      {children && <div className="relative z-10 mt-6 flex flex-wrap items-center justify-center gap-4">{children}</div>}
    </div>
  );
};

export { ParallaxCosmic };
