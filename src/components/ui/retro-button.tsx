"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const retroButtonVariants = cva(
  "relative inline-flex items-center justify-center shrink-0 border-2 border-transparent rounded-[4px] bg-[#010101] shadow-[1px_1px_1px_rgba(255,255,255,0.4)] cursor-pointer select-none transition-transform duration-150 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: [
          "text-white",
          "[--bg-color:theme(colors.neutral.800)]",
          "[--bg-color-active:theme(colors.neutral.900)]",
          "[--shadow-light:theme(colors.neutral.600)]",
          "[--shadow-dark:theme(colors.neutral.950)]",
        ],
        active: [
          "text-black font-bold",
          "[--bg-color:theme(colors.white)]",
          "[--bg-color-active:theme(colors.neutral.200)]",
          "[--shadow-light:theme(colors.white)]",
          "[--shadow-dark:theme(colors.neutral.400)]",
        ],
        darkGray: [
          "text-white",
          "[--bg-color:theme(colors.neutral.800)]",
          "[--bg-color-active:theme(colors.neutral.900)]",
          "[--shadow-light:theme(colors.neutral.600)]",
          "[--shadow-dark:theme(colors.neutral.950)]",
        ],
        orange: [
          "text-white font-bold",
          "[--bg-color:theme(colors.orange.500)]",
          "[--bg-color-active:theme(colors.orange.600)]",
          "[--shadow-light:theme(colors.orange.300)]",
          "[--shadow-dark:theme(colors.orange.700)]",
        ],
        white: [
          "text-black font-semibold",
          "[--bg-color:theme(colors.neutral.200)]",
          "[--bg-color-active:theme(colors.neutral.300)]",
          "[--shadow-light:theme(colors.white)]",
          "[--shadow-dark:theme(colors.neutral.500)]",
        ],
        lightGray: [
          "text-white",
          "[--bg-color:theme(colors.neutral.600)]",
          "[--bg-color-active:theme(colors.neutral.700)]",
          "[--shadow-light:theme(colors.neutral.400)]",
          "[--shadow-dark:theme(colors.neutral.800)]",
        ],
        outline: [
          "text-white",
          "[--bg-color:theme(colors.slate.900)]",
          "[--bg-color-active:theme(colors.slate.950)]",
          "[--shadow-light:theme(colors.slate.700)]",
          "[--shadow-dark:theme(colors.black)]",
        ],
        secondary: [
          "text-white",
          "[--bg-color:theme(colors.slate.800)]",
          "[--bg-color-active:theme(colors.slate.900)]",
          "[--shadow-light:theme(colors.slate.600)]",
          "[--shadow-dark:theme(colors.slate.950)]",
        ],
        ghost: [
          "text-white",
          "[--bg-color:theme(colors.neutral.800)]",
          "[--bg-color-active:theme(colors.neutral.900)]",
          "[--shadow-light:theme(colors.neutral.600)]",
          "[--shadow-dark:theme(colors.neutral.950)]",
        ],
        destructive: [
          "text-white",
          "[--bg-color:theme(colors.red.600)]",
          "[--bg-color-active:theme(colors.red.700)]",
          "[--shadow-light:theme(colors.red.400)]",
          "[--shadow-dark:theme(colors.red.900)]",
        ],
      },
      size: {
        default: "",
        xs: "",
        sm: "",
        lg: "",
        icon: "",
        "icon-xs": "",
        "icon-sm": "",
        "icon-lg": "",
      },
    },
    defaultVariants: {
      variant: "darkGray",
      size: "default",
    },
  }
);

const retroButtonInnerVariants = cva(
  [
    "inline-flex items-center justify-center w-full rounded-[6px] tracking-wide text-center whitespace-nowrap gap-2",
    "bg-[var(--bg-color)] transition-all duration-200",
    "shadow-[inset_1px_1px_1px_var(--shadow-light),inset_-1px_-1px_1px_var(--shadow-dark),2px_2px_4px_#000]",
    "active:scale-[0.98] active:bg-[var(--bg-color-active)]",
    "active:shadow-[inset_0_0_4px_#000,inset_1px_1px_1px_transparent,inset_-1px_-1px_1px_transparent,2px_2px_4px_transparent]",
  ],
  {
    variants: {
      size: {
        default: "px-4 py-2 sm:py-2.5 text-xs font-medium",
        xs: "px-2.5 py-1 text-[11px] font-medium",
        sm: "px-3.5 py-1.5 text-xs font-medium",
        lg: "px-6 py-3 text-sm font-semibold",
        icon: "p-2 w-9 h-9 text-xs",
        "icon-xs": "p-1 w-7 h-7 text-[10px]",
        "icon-sm": "p-1.5 w-8 h-8 text-xs",
        "icon-lg": "p-2.5 w-10 h-10 text-sm",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface RetroButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof retroButtonVariants> {
  children: React.ReactNode;
}

const RetroButton = React.forwardRef<HTMLButtonElement, RetroButtonProps>(
  ({ className, variant, size = "default", children, ...props }, ref) => {
    return (
      <button
        className={cn(retroButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <span className={retroButtonInnerVariants({ size })}>{children}</span>
      </button>
    );
  }
);
RetroButton.displayName = "RetroButton";

export { RetroButton, retroButtonVariants };
