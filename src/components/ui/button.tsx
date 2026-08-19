import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { RetroButton } from "./retro-button";

const buttonVariants = cva("", {
  variants: {
    variant: {
      default: "darkGray",
      destructive: "destructive",
      outline: "outline",
      secondary: "secondary",
      ghost: "darkGray",
      link: "default",
      active: "active",
      white: "white",
      darkGray: "darkGray",
      orange: "orange",
    },
    size: {
      default: "default",
      xs: "xs",
      sm: "sm",
      lg: "lg",
      icon: "icon",
      "icon-xs": "icon-xs",
      "icon-sm": "icon-sm",
      "icon-lg": "icon-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      children,
      onClick,
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    const retroVariant =
      variant === "outline"
        ? "outline"
        : variant === "destructive"
        ? "destructive"
        : variant === "secondary"
        ? "secondary"
        : variant === "white"
        ? "white"
        : variant === "active"
        ? "active"
        : variant === "orange"
        ? "orange"
        : "darkGray";

    return (
      <RetroButton
        ref={ref}
        className={className}
        variant={retroVariant as any}
        size={size as any}
        onClick={onClick}
        disabled={disabled}
        type={type}
        {...props}
      >
        {children}
      </RetroButton>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
