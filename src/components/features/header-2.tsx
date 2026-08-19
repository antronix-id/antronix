"use client";

import React from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RetroButton } from "@/components/ui/retro-button";
import { cn } from "@/lib/utils";
import { MenuToggleIcon } from "@/components/shared/menu-toggle-icon";
import { useScroll } from "@/hooks/use-scroll";
import { NAV_LINKS } from "@/lib/constants";
import { useHashScroll, handleSectionNavigation } from "@/hooks/use-hash-scroll";

export function Header() {
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const scrolled = useScroll(10);
  const pathname = usePathname();
  const router = useRouter();

  // Handle hash scrolling and clean duplicate hashes across all routes
  useHashScroll();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (open) {
      // Disable scroll
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scroll
      document.body.style.overflow = "";
    }

    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

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
          <Link
            href="/"
            className="flex items-center gap-3 group"
            onClick={(e) => handleSectionNavigation(e, "/", pathname, router)}
          >
            <div className="relative flex h-9 w-9 shrink-0 items-center justify-center transition-transform group-hover:scale-105">
              <Image
                src="/logo-agency.webp"
                alt="Antronix Logo"
                width={36}
                height={36}
                className="h-full w-full object-contain"
                priority
              />
            </div>
            <span className="text-xl font-bold gradient-text tracking-tight">
              Antronix
            </span>
          </Link>

          {/* Desktop Links with RetroButton */}
          <div className="hidden items-center gap-2 md:flex">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleSectionNavigation(e, link.href, pathname, router)}
                >
                  <RetroButton variant={isActive ? "active" : "darkGray"}>
                    {link.label}
                  </RetroButton>
                </Link>
              );
            })}
          </div>

          {/* Desktop Action CTA */}
          <div className="hidden items-center gap-2 md:flex">
            <Link
              href="/#contact"
              onClick={(e) => handleSectionNavigation(e, "/#contact", pathname, router)}
            >
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
      {mounted && open && createPortal(
        <div className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-2xl flex flex-col pt-4 pb-8 px-6 md:hidden overflow-y-auto">
          {/* Mobile Header Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
            <Link
              href="/"
              className="flex items-center gap-3"
              onClick={(e) =>
                handleSectionNavigation(e, "/", pathname, router, () => setOpen(false))
              }
            >
              <div className="relative flex h-8 w-8 shrink-0 items-center justify-center">
                <Image
                  src="/logo-agency.webp"
                  alt="Antronix Logo"
                  width={32}
                  height={32}
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="text-lg font-bold gradient-text tracking-tight">
                Antronix
              </span>
            </Link>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setOpen(false)}
              aria-label="Close Navigation Menu"
            >
              <MenuToggleIcon open={true} className="size-5 text-white" duration={300} />
            </Button>
          </div>

          {/* Centered Links List & CTA */}
          <div className="flex-1 flex flex-col justify-start items-center pt-8 sm:pt-12 pb-6 gap-5">
            <div className="flex flex-col items-center justify-center gap-3 w-full max-w-sm">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="w-full flex justify-center"
                    onClick={(e) =>
                      handleSectionNavigation(e, link.href, pathname, router, () =>
                        setOpen(false)
                      )
                    }
                  >
                    <RetroButton
                      variant={isActive ? "active" : "darkGray"}
                      className="w-full"
                    >
                      {link.label}
                    </RetroButton>
                  </Link>
                );
              })}
            </div>

            {/* Mobile CTA */}
            <div className="pt-6 border-t border-white/10 w-full max-w-xs flex justify-center shrink-0">
              <Link
                href="/#contact"
                onClick={(e) =>
                  handleSectionNavigation(e, "/#contact", pathname, router, () => setOpen(false))
                }
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
      )}
    </>
  );
}

export default Header;
