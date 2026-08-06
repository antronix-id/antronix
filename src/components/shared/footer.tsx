"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Mail, MapPin, Phone, LogIn } from "lucide-react";
import { SocialIcons } from "@/components/shared/social-icons";
import { AGENCY, SERVICES } from "@/lib/constants";
import { Marquee } from "@/components/animations/marquee";
import { handleSectionNavigation } from "@/hooks/use-hash-scroll";
import { TextHoverEffect, FooterBackgroundGradient } from "@/components/ui/hover-footer";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const router = useRouter();

  const [agency, setAgency] = useState(AGENCY);

  useEffect(() => {
    fetch("/api/agency")
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) {
          setAgency((prev) => ({
            ...prev,
            ...data,
            socials: {
              ...prev.socials,
              ...(data.socials || {}),
            },
          }));
        }
      })
      .catch((err) => console.error("Error fetching agency in footer:", err));
  }, []);

  const contactInfo = [
    {
      icon: <MapPin size={18} className="text-slate-300 shrink-0" />,
      text: agency.address || AGENCY.address,
    },
    {
      icon: <Phone size={18} className="text-slate-300 shrink-0" />,
      text: agency.phone || AGENCY.phone,
      href: `tel:${(agency.phone || AGENCY.phone).replace(/[^0-9+]/g, "")}`,
    },
    {
      icon: <Mail size={18} className="text-slate-300 shrink-0" />,
      text: agency.email || AGENCY.email,
      href: `mailto:${agency.email || AGENCY.email}`,
    },
  ];

  return (
    <footer className="bg-[#0F0F11]/40 backdrop-blur-xl relative h-fit rounded-t-3xl overflow-hidden w-full border-t border-white/10 shadow-2xl">
      {/* Moving Marquee Banner */}
      <div className="py-5 border-b border-white/10 bg-black/20 relative z-40">
        <Marquee text="Web Studio • AI Media Lab • System Lab" fontSize="lg" />
      </div>

      <div className="w-full px-6 sm:px-12 lg:px-16 py-10 sm:py-14 z-50 relative pointer-events-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-16 pb-12">
          {/* Brand section */}
          <div className="flex flex-col space-y-4">
            <Link
              href="/"
              className="flex items-center space-x-3 group"
              onClick={(e) => handleSectionNavigation(e, "/", pathname, router)}
            >
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center transition-transform group-hover:scale-105">
                <Image
                  src="/logo-agency.webp"
                  alt="Antronix Logo"
                  width={40}
                  height={40}
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="text-white text-2xl font-bold tracking-tight">
                {agency.name || AGENCY.name}
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-zinc-400">
              {agency.description || AGENCY.description}
            </p>
            {/* Social Icons directly under description */}
            <div className="pt-2">
              <SocialIcons socials={agency.socials} email={agency.email} />
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
                  href="/portfolio"
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                  onClick={(e) => handleSectionNavigation(e, "/portfolio", pathname, router)}
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/#pricing"
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                  onClick={(e) => handleSectionNavigation(e, "/#pricing", pathname, router)}
                >
                  Kalkulator Harga
                </Link>
              </li>
              <li className="relative">
                <Link
                  href="/#contact"
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                  onClick={(e) => handleSectionNavigation(e, "/#contact", pathname, router)}
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
            &copy; {currentYear} {agency.name || AGENCY.name}. All rights reserved.
          </p>
          <div className="flex items-center space-x-3">
            <p className="text-center md:text-right text-xs text-zinc-500">
              Digital Agency & AI Innovation Partner
            </p>
            <Link
              href="/login"
              title="Admin Login"
              aria-label="Admin Login"
              className="relative z-50 text-zinc-500 hover:text-white transition-colors p-1.5 rounded-md hover:bg-white/10 flex items-center justify-center group cursor-pointer"
            >
              <LogIn size={15} className="group-hover:scale-110 transition-transform" />
            </Link>
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
