"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { RetroButton } from "@/components/ui/retro-button";
import { cn } from "@/lib/utils";
import type { NavChild } from "@/types";
import { NavChildItem } from "./nav-child-item";

/** Trigger desktop + panel dropdown satu grup nav (mis. "Layanan") */
export function ServicesMenu({
  label,
  items,
  pathname,
  active,
  isOpen,
  onOpenChange,
  onChildNavigate,
}: {
  label: string;
  items: NavChild[];
  pathname: string;
  active: boolean;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onChildNavigate: (href: string) => (e: React.MouseEvent) => void;
}) {
  return (
    <div
      className="relative"
      onMouseEnter={() => onOpenChange(true)}
      onMouseLeave={() => onOpenChange(false)}
    >
      <RetroButton
        type="button"
        variant={active ? "active" : "darkGray"}
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => onOpenChange(!isOpen)}
      >
        {label}
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </RetroButton>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-1/2 top-full z-[100] w-52 -translate-x-1/2 pt-2"
          >
            <div className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-black/85 p-2 shadow-2xl shadow-black/70 backdrop-blur-2xl">
              {items.map((child) => (
                <NavChildItem
                  key={child.href}
                  child={child}
                  active={pathname === child.href}
                  onNavigate={onChildNavigate(child.href)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
