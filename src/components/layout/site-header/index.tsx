"use client";

import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MenuToggleIcon } from "@/components/layout/menu-toggle-icon";
import { BRAND_LOGOS } from "@/data";
import { MainNav } from "./main-nav";
import { MobileDrawer } from "./mobile-drawer";
import { useSiteMenu } from "./use-site-menu";

/**
 * Shell header: gaya sticky/scrolled, logo, daftar nav desktop, CTA, dan
 * pemicu drawer mobile. State menu hidup di useSiteMenu dan diwariskan ke
 * MainNav / MobileDrawer.
 */
export function SiteHeader() {
  const menu = useSiteMenu();
  const { scrolled, open, setOpen, navigate } = menu;

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 mx-auto w-full max-w-7xl bg-transparent border-none transition-all duration-300 ease-out",
          {
            "bg-transparent md:bg-background/95 supports-[backdrop-filter]:md:bg-background/50 md:border md:border-white/10 md:backdrop-blur-xl md:top-4 md:max-w-5xl md:shadow-2xl md:shadow-black/70 md:rounded-2xl":
              scrolled && !open,
            "bg-black/90 backdrop-blur-2xl": open,
          }
        )}
      >
        <nav
          className={cn(
            "flex h-16 w-full items-center justify-between px-4 md:h-14 md:transition-all md:ease-out",
            {
              "md:px-4": scrolled,
            }
          )}
        >
          {/* Logo */}
          <Link href="/" className="group flex items-center" onClick={navigate("/")}>
            <div className="relative flex h-10 shrink-0 items-center justify-center transition-transform group-hover:scale-105">
              <Image
                src={BRAND_LOGOS.lockup.src}
                alt={BRAND_LOGOS.lockup.alt}
                width={BRAND_LOGOS.lockup.width}
                height={BRAND_LOGOS.lockup.height}
                sizes="160px"
                className="h-10 w-auto object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Links with RetroButton */}
          <MainNav menu={menu} />

          {/* Desktop Action CTA */}
          <div className="hidden items-center gap-2 md:flex">
            <Link href="/kontak" onClick={navigate("/kontak")}>
              <Button size="sm">
                <MessageCircle className="h-4 w-4" />
                <span>Hubungi Kami</span>
              </Button>
            </Link>
          </div>

          {/* Mobile Toggle Button */}
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setOpen(!open)}
            className="md:hidden"
            aria-label="Toggle Navigation Menu"
          >
            <MenuToggleIcon open={open} className="size-5 text-white" duration={300} />
          </Button>
        </nav>
      </header>

      {/* Mobile Drawer Menu Overlay via React Portal */}
      <MobileDrawer menu={menu} />
    </>
  );
}

export default SiteHeader;
