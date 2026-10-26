"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Mail, MapPin, Phone } from "lucide-react";
import { SocialIcons } from "@/components/layout/social-icons";
import { AGENCY, SERVICES, BRAND_LOGOS } from "@/data";
import { Marquee } from "@/components/effects/marquee";
import { handleSectionNavigation } from "@/lib/navigation";
import { TextHoverEffect, FooterBackgroundGradient } from "@/components/effects/hover-footer";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const router = useRouter();

  const contactInfo = [
    {
      icon: <MapPin size={18} className="text-slate-300 shrink-0" />,
      text: AGENCY.address,
    },
    {
      icon: <Phone size={18} className="text-slate-300 shrink-0" />,
      text: AGENCY.phone,
      href: `tel:${AGENCY.phone.replace(/[^0-9+]/g, "")}`,
    },
    {
      icon: <Mail size={18} className="text-slate-300 shrink-0" />,
      text: AGENCY.email,
      href: `mailto:${AGENCY.email}`,
    },
  ];

  return (
    <footer className="bg-[#0F0F11]/40 backdrop-blur-xl relative h-fit rounded-t-3xl overflow-hidden w-full border-t border-white/10 shadow-2xl">
      {/* Moving Marquee Banner */}
      <div className="py-5 border-b border-white/10 bg-black/20 relative z-40">
        <Marquee text="Web Studio • System Lab • Web Studio • System Lab" fontSize="lg" />
      </div>

      <div className="w-full px-6 sm:px-12 lg:px-16 py-10 sm:py-14 z-50 relative pointer-events-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-16 pb-12">
          {/* Brand section */}
          <div className="flex flex-col space-y-4">
            <Link
              href="/"
              className="group flex items-center"
              onClick={(e) => handleSectionNavigation(e, "/", pathname, router)}
            >
              <div className="relative flex h-11 shrink-0 items-center justify-center transition-transform group-hover:scale-105">
                <Image
                  src={BRAND_LOGOS.lockup.src}
                  alt={BRAND_LOGOS.lockup.alt}
                  width={BRAND_LOGOS.lockup.width}
                  height={BRAND_LOGOS.lockup.height}
                  sizes="180px"
                  className="h-11 w-auto max-w-full object-contain"
                />
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-zinc-400">
              {AGENCY.description}
            </p>
            {/* Social Icons directly under description */}
            <div className="pt-2">
              <SocialIcons socials={AGENCY.socials} email={AGENCY.email} />
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">
              Layanan Utama
            </h4>
            <ul className="space-y-3">
              {SERVICES.map((service) => (
                <li key={service.id} className="relative">
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-zinc-400 hover:text-white transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">
              Navigasi Cepat
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                  onClick={(e) => handleSectionNavigation(e, "/", pathname, router)}
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="/#services"
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                  onClick={(e) => handleSectionNavigation(e, "/#services", pathname, router)}
                >
                  Layanan
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                  onClick={(e) => handleSectionNavigation(e, "/portfolio", pathname, router)}
                >
                  Portofolio
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                  onClick={(e) => handleSectionNavigation(e, "/pricing", pathname, router)}
                >
                  Harga & Paket
                </Link>
              </li>
              <li>
                <Link
                  href="/tentang-kami"
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                  onClick={(e) => handleSectionNavigation(e, "/tentang-kami", pathname, router)}
                >
                  Tentang Kami
                </Link>
              </li>
              <li className="relative">
                <Link
                  href="/tentang-kami#contact"
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                  onClick={(e) => handleSectionNavigation(e, "/tentang-kami#contact", pathname, router)}
                >
                  Hubungi Kami
                </Link>
                <span className="absolute top-1 -right-3 w-2 h-2 rounded-full bg-slate-300 animate-pulse"></span>
              </li>
            </ul>
          </div>

          {/* Contact section */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">
              Kontak Kami
            </h4>
            <ul className="space-y-4">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-start space-x-3 text-sm text-zinc-400">
                  <span className="mt-0.5">{item.icon}</span>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="hover:text-white transition-colors"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="hover:text-white transition-colors">
                      {item.text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="border-t border-gray-800 my-8" />

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0 text-zinc-400">
          <p className="text-center md:text-left">
            &copy; {currentYear} {AGENCY.name}. All rights reserved.
          </p>
          <div className="flex items-center space-x-3">
            <p className="text-center md:text-right text-xs text-zinc-500">
              Digital Agency & AI Innovation Partner
            </p>
          </div>
        </div>
      </div>

      {/* Text hover effect */}
      <div className="w-full flex justify-center h-[14rem] sm:h-[18rem] md:h-[22rem] lg:h-[26rem] -mt-24 sm:-mt-36 md:-mt-44 -mb-16 sm:-mb-24 relative z-30 px-4 sm:px-8 pointer-events-auto">
        <TextHoverEffect text="ANTRONIX" className="z-30 w-full" />
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
}

export default Footer;
