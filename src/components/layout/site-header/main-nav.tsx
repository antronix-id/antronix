"use client";

import { NAV_LINKS } from "@/data";
import { NavLinkItem } from "./nav-link-item";
import { ServicesMenu } from "./services-menu";
import type { SiteMenu } from "./use-site-menu";

/** Daftar tautan desktop: tautan biasa vs grup dengan dropdown */
export function MainNav({ menu }: { menu: SiteMenu }) {
  const { navRef, pathname, dropdownOpen, setDropdownOpen, navigate } = menu;

  return (
    <div ref={navRef} className="hidden items-center gap-2 md:flex">
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
              onNavigate={navigate(link.href)}
            />
          );
        }

        return (
          <ServicesMenu
            key={link.label}
            label={link.label}
            items={items}
            pathname={pathname}
            active={isActive}
            isOpen={dropdownOpen === link.label}
            onOpenChange={(next) => setDropdownOpen(next ? link.label : null)}
            onChildNavigate={(href) => navigate(href, () => setDropdownOpen(null))}
          />
        );
      })}
    </div>
  );
}
