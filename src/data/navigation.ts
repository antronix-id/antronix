import type { NavLink } from "@/types";
import { DIVISION_LOGOS } from "./assets";
import { SERVICES } from "./services";

/** Tujuan default menu "Layanan" = divisi pertama pada registry */
export const SERVICES_HREF = `/services/${SERVICES[0].slug}`;

/**
 * MENU NAVIGASI UTAMA (HEADER & DRAWER MOBILE)
 * Anak menu "Layanan" diturunkan dari SERVICES, jadi menambah divisi baru
 * cukup menambahkan satu file di data/services — navigasi ikut terbarui.
 */
export const NAV_LINKS: NavLink[] = [
  { label: "Beranda", href: "/" },
  {
    label: "Layanan",
    href: SERVICES_HREF,
    children: SERVICES.map((service) => ({
      label: service.shortTitle,
      href: `/services/${service.slug}`,
      icon: service.icon,
      logo: DIVISION_LOGOS[service.slug],
    })),
  },
  { label: "Portofolio", href: "/portfolio" },
  { label: "Harga", href: "/pricing" },
  { label: "Tentang Kami", href: "/tentang-kami" },
];
