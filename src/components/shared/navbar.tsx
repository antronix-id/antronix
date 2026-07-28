"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Globe, Sparkles, Cpu, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { NAV_LINKS, AGENCY } from "@/lib/constants";
import { GooeyNav } from "@/components/ui/gooey-nav";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  globe: Globe,
  sparkles: Sparkles,
  cpu: Cpu,
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "glass-strong shadow-lg shadow-black/20" : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center">
            <Image
              src="/logo-agency.png"
              alt="Artificial Ripe Logo"
              width={40}
              height={40}
              className="h-full w-full object-contain"
              priority
            />
          </div>
          <span className="text-xl font-bold gradient-text-animated">
            Artificial Ripe
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center">
          <GooeyNav items={NAV_LINKS} />
        </div>

        {/* CTA Button */}
        <div className="hidden items-center gap-2 lg:flex">
          <Button
            asChild
            className="brand-gradient-btn"
          >
            <Link href={AGENCY.socials.whatsapp} target="_blank">
              <MessageCircle className="mr-2 h-4 w-4" />
              Hubungi Kami
            </Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger
            className="lg:hidden"
            render={<Button variant="ghost" size="icon" />}
          >
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent side="right" className="w-80 glass-strong border-border">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="flex flex-col gap-6 pt-8">
              <Link href="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center">
                  <Image
                    src="/logo-agency.png"
                    alt="Artificial Ripe Logo"
                    width={40}
                    height={40}
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="text-lg font-bold gradient-text">
                  Artificial Ripe
                </span>
              </Link>

              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <div key={link.label}>
                    {link.children ? (
                      <>
                        <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          {link.label}
                        </p>
                        {link.children.map((child) => {
                          const Icon = child.icon
                            ? iconMap[child.icon]
                            : null;
                          return (
                            <Link
                              key={child.label}
                              href={child.href}
                              className="flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-accent"
                              onClick={() => setMobileOpen(false)}
                            >
                              {Icon && (
                                <Icon className="h-5 w-5 text-primary" />
                              )}
                              <span className="text-sm font-medium">
                                {child.label}
                              </span>
                            </Link>
                          );
                        })}
                      </>
                    ) : (
                      <Link
                        href={link.href}
                        className="rounded-xl px-3 py-3 text-sm font-medium transition-colors hover:bg-accent block"
                        onClick={() => setMobileOpen(false)}
                      >
                        {link.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              <Button
                asChild
                className="mt-4 brand-gradient-btn text-white border-0 font-semibold"
              >
                <Link href={AGENCY.socials.whatsapp} target="_blank" onClick={() => setMobileOpen(false)}>
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Hubungi Kami
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </motion.header>
  );
}
