"use client";

import React from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RetroButton } from "@/components/ui/retro-button";
import { cn } from "@/lib/utils";
import { MenuToggleIcon } from "@/components/layout/menu-toggle-icon";
import { BRAND_LOGOS, NAV_LINKS } from "@/data";
import { NavChildItem } from "./nav-child-item";
import { NavLinkItem } from "./nav-link-item";
import type { SiteMenu } from "./use-site-menu";

/** Drawer mobile (portal) + accordion submenu layanan */
export function MobileDrawer({ menu }: { menu: SiteMenu }) {
  const {
    mounted,
    open,
    setOpen,
    pathname,
    mobileSubmenuOpen,
    setMobileSubmenuOpen,
    navigate,
    closeMobile,
  } = menu;

  if (!mounted || !open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-2xl flex flex-col pt-4 pb-8 px-6 md:hidden overflow-y-auto">
      {/* Mobile Header Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
        <Link href="/" className="flex items-center" onClick={navigate("/", closeMobile)}>
          <div className="relative flex h-9 shrink-0 items-center justify-center">
            <Image
              src={BRAND_LOGOS.lockup.src}
              alt={BRAND_LOGOS.lockup.alt}
              width={BRAND_LOGOS.lockup.width}
              height={BRAND_LOGOS.lockup.height}
              sizes="140px"
              className="h-9 w-auto object-contain"
            />
          </div>
        </Link>
        <Button
          size="icon"
          variant="ghost"
          onClick={closeMobile}
          aria-label="Close Navigation Menu"
        >
          <MenuToggleIcon open={true} className="size-5 text-white" duration={300} />
        </Button>
      </div>

      {/* Centered Links List & CTA */}
      <div className="flex-1 flex flex-col justify-start items-center pt-8 sm:pt-12 pb-6 gap-5">
        <div className="flex flex-col items-center justify-center gap-3 w-full max-w-sm">
          {NAV_LINKS.map((link) => {
            const items = link.children ?? [];
            const isActive =
              pathname === link.href || items.some((item) => pathname === item.href);

            if (items.length === 0) {
              return (
                <NavLinkItem
                  key={link.label}
                  href={link.href}
                  label={link.label}
                  active={isActive}
                  fullWidth
                  onNavigate={navigate(link.href, closeMobile)}
                />
              );
            }

            const isSubmenuOpen = mobileSubmenuOpen === link.label;

            return (
              <div key={link.label} className="w-full">
                <RetroButton
                  type="button"
                  variant={isActive ? "active" : "darkGray"}
                  className="w-full"
                  aria-haspopup="true"
                  aria-expanded={isSubmenuOpen}
                  onClick={() =>
                    setMobileSubmenuOpen(isSubmenuOpen ? null : link.label)
                  }
                >
                  {link.label}
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      isSubmenuOpen && "rotate-180"
                    )}
                  />
                </RetroButton>

                <AnimatePresence initial={false}>
                  {isSubmenuOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-2 pt-2">
                        {items.map((child) => (
                          <NavChildItem
                            key={child.href}
                            child={child}
                            active={pathname === child.href}
                            onNavigate={navigate(child.href, () => {
                              setOpen(false);
                              setMobileSubmenuOpen(null);
                            })}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Mobile CTA */}
        <div className="pt-6 border-t border-white/10 w-full max-w-xs flex justify-center shrink-0">
          <Link
            href="/tentang-kami#contact"
            onClick={navigate("/tentang-kami#contact", closeMobile)}
            className="w-full flex justify-center"
          >
            <Button className="w-full">
              <MessageCircle className="h-4 w-4" />
              <span>Hubungi Kami</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>,
    document.body
  );
}
