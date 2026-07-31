"use client";

import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  ReactElement,
  ReactNode,
  useEffect,
  useRef
} from 'react';
import gsap from 'gsap';

export interface CardSwapProps {
  activeIndex: number;
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  skewAmount?: number;
  children: ReactNode;
  className?: string;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ customClass, ...rest }, ref) => (
  <div
    ref={ref}
    {...rest}
    className={`absolute top-1/2 left-1/2 rounded-2xl border border-white/15 bg-slate-950/95 backdrop-blur-xl [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] ${customClass ?? ''} ${rest.className ?? ''}`.trim()}
  />
));
Card.displayName = 'Card';

type CardRef = React.RefObject<HTMLDivElement | null>;

interface Slot {
  x: number;
  y: number;
  z: number;
  zIndex: number;
  scale: number;
  opacity: number;
}

const makeSlot = (i: number, distX: number, distY: number, total: number): Slot => {
  return {
    x: i * distX,
    y: -i * distY,
    z: -i * 25,
    zIndex: total - i,
    scale: Math.max(0.85, 1 - i * 0.04),
    opacity: i >= 4 ? 0 : 1 - i * 0.18,
  };
};

const CardSwap: React.FC<CardSwapProps> = ({
  activeIndex,
  width = 440,
  height = 290,
  cardDistance = 22,
  verticalDistance = 24,
  skewAmount = 4,
  children,
  className
}) => {
  const childArr = Children.toArray(children) as ReactElement<CardProps>[];
  const total = childArr.length;
  const refs = useRef<CardRef[]>([]);
  const isFirstRender = useRef<boolean>(true);

  if (refs.current.length !== total) {
    refs.current = childArr.map(() => React.createRef<HTMLDivElement>());
  }

  useEffect(() => {
    refs.current.forEach((r, idx) => {
      if (!r.current) return;

      const slotIdx = (idx - activeIndex + total) % total;
      const slot = makeSlot(slotIdx, cardDistance, verticalDistance, total);

      if (isFirstRender.current) {
        gsap.set(r.current, {
          x: slot.x,
          y: slot.y,
          z: slot.z,
          xPercent: -50,
          yPercent: -50,
          scale: slot.scale,
          opacity: slot.opacity,
          skewY: skewAmount,
          transformOrigin: 'center center',
          zIndex: slot.zIndex,
          force3D: true,
        });
      } else {
        gsap.to(r.current, {
          x: slot.x,
          y: slot.y,
          z: slot.z,
          xPercent: -50,
          yPercent: -50,
          scale: slot.scale,
          opacity: slot.opacity,
          skewY: skewAmount,
          transformOrigin: 'center center',
          zIndex: slot.zIndex,
          duration: 0.5,
          ease: slotIdx === 0 ? 'back.out(1.2)' : 'power2.out',
          force3D: true,
        });
      }
    });

    isFirstRender.current = false;
  }, [activeIndex, cardDistance, verticalDistance, skewAmount, total]);

  const rendered = childArr.map((child, i) =>
    isValidElement<CardProps>(child)
      ? cloneElement(child, {
          key: i,
          ref: refs.current[i],
          style: { width, height, ...(child.props.style ?? {}) }
        } as CardProps & React.RefAttributes<HTMLDivElement>)
      : child
  );

  return (
    <div
      className={`relative perspective-[1000px] overflow-visible ${className ?? ''}`.trim()}
      style={{ width, height }}
    >
      {rendered}
    </div>
  );
};

export default CardSwap;
