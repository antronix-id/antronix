import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone, AtSign, Link2, MessageCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { AGENCY, SERVICES } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-[oklch(0.08_0.005_270)]">
      {/* Gradient top accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[oklch(0.7_0.18_270)] to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center">
                <Image
                  src="/logo-agency.png"
                  alt="Artificial Ripe Logo"
                  width={40}
                  height={40}
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="text-xl font-bold gradient-text">
                Artificial Ripe
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {AGENCY.description}
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <Link
                href={AGENCY.socials.whatsapp}
                target="_blank"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent transition-all hover:bg-primary/20 hover:scale-110"
              >
                <MessageCircle className="h-5 w-5" />
              </Link>
              <Link
                href={AGENCY.socials.instagram}
                target="_blank"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent transition-all hover:bg-primary/20 hover:scale-110"
              >
                <AtSign className="h-5 w-5" />
              </Link>
              <Link
                href={AGENCY.socials.linkedin}
                target="_blank"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent transition-all hover:bg-primary/20 hover:scale-110"
              >
                <Link2 className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Services
            </h3>
            <ul className="space-y-3">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">
                  {AGENCY.address}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">
                  {AGENCY.phone}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">
                  {AGENCY.email}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-10 bg-border" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {currentYear} {AGENCY.name}. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built with 💜 by{" "}
            <span className="gradient-text font-medium">{AGENCY.name}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
