"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { BorderGlow } from "@/components/ui/border-glow";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, CheckCircle2, Loader2, MessageCircle, Mail, MapPin } from "lucide-react";
import { SERVICES, AGENCY } from "@/lib/constants";
import Dock, { DockItemData } from "@/components/ui/dock";

interface FormData {
  name: string;
  whatsapp: string;
  service: string;
  details: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    whatsapp: "",
    service: "",
    details: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const socialDockItems: DockItemData[] = [
    {
      icon: (
        <svg className="h-5 w-5 fill-[#25D366]" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      ),
      label: "WhatsApp",
      onClick: () => window.open(AGENCY.socials.whatsapp, "_blank"),
    },
    {
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24">
          <path fill="#EA4335" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      ),
      label: "Email Resmi",
      onClick: () => window.open(`mailto:${AGENCY.email}`, "_blank"),
    },
    {
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24">
          <defs>
            <linearGradient id="ig-brand-grad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f09433" />
              <stop offset="25%" stopColor="#e6683c" />
              <stop offset="50%" stopColor="#dc2743" />
              <stop offset="75%" stopColor="#cc2366" />
              <stop offset="100%" stopColor="#bc1888" />
            </linearGradient>
          </defs>
          <path fill="url(#ig-brand-grad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      label: "Instagram",
      onClick: () => window.open(AGENCY.socials.instagram, "_blank"),
    },
    {
      icon: (
        <svg className="h-5 w-5 fill-[#25F4EE]" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V5.8a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 12a6.34 6.34 0 0 0 10.86 4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.14z" />
        </svg>
      ),
      label: "TikTok",
      onClick: () => window.open(AGENCY.socials.tiktok, "_blank"),
    },
    {
      icon: (
        <svg className="h-5 w-5 fill-[#0A66C2]" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      ),
      label: "LinkedIn",
      onClick: () => window.open(AGENCY.socials.linkedin, "_blank"),
    },
    {
      icon: (
        <svg className="h-4.5 w-4.5 fill-white" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      label: "X / Twitter",
      onClick: () => window.open(AGENCY.socials.x, "_blank"),
    },
  ];

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = "Nama wajib diisi";
    if (!formData.whatsapp.trim()) newErrors.whatsapp = "WhatsApp wajib diisi";
    else if (!/^[\d+]{10,15}$/.test(formData.whatsapp.replace(/\s/g, "")))
      newErrors.whatsapp = "Format nomor tidak valid";
    if (!formData.service) newErrors.service = "Pilih layanan";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form submitted:", formData);
    setStatus("success");
  };

  if (status === "success") {
    return (
      <BorderGlow className="p-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-12 text-center"
        >
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="h-10 w-10 text-primary" />
          </div>
          <h3 className="mb-2 text-2xl font-bold">Terima Kasih! 🎉</h3>
          <p className="mb-6 max-w-md text-muted-foreground">
            Pesan Anda telah kami terima. Tim kami akan menghubungi Anda melalui
            WhatsApp dalam 1x24 jam.
          </p>
          <Button
            variant="outline"
            className="rounded-full px-6"
            onClick={() => {
              setStatus("idle");
              setFormData({ name: "", whatsapp: "", service: "", details: "" });
            }}
          >
            Kirim Pesan Lagi
          </Button>
        </motion.div>
      </BorderGlow>
    );
  }

  return (
    <BorderGlow>
      <div className="p-6 sm:p-8">
        {/* React Bits Dock Component inside top of Form Card */}
        <div className="mb-6 flex flex-col items-center justify-center space-y-2 border-b border-white/10 pb-6 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Sosial Media & Quick Link
          </p>
          <Dock items={socialDockItems} baseItemSize={42} magnification={58} panelHeight={54} />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="contact-name">
              Nama Lengkap <span className="text-destructive">*</span>
            </Label>
            <Input
              id="contact-name"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name}</p>
            )}
          </div>

          {/* WhatsApp */}
          <div className="space-y-2">
            <Label htmlFor="contact-whatsapp">
              Nomor WhatsApp <span className="text-destructive">*</span>
            </Label>
            <Input
              id="contact-whatsapp"
              placeholder="08123456789"
              value={formData.whatsapp}
              onChange={(e) =>
                setFormData({ ...formData, whatsapp: e.target.value })
              }
              className={errors.whatsapp ? "border-destructive" : ""}
            />
            {errors.whatsapp && (
              <p className="text-xs text-destructive">{errors.whatsapp}</p>
            )}
          </div>

          {/* Service Selection */}
          <div className="space-y-2">
            <Label>
              Layanan yang Diminati <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.service}
              onValueChange={(val) =>
                setFormData({ ...formData, service: val ?? "" })
              }
            >
              <SelectTrigger
                className={errors.service ? "border-destructive" : ""}
              >
                <SelectValue placeholder="Pilih layanan..." />
              </SelectTrigger>
              <SelectContent>
                {SERVICES.map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.service && (
              <p className="text-xs text-destructive">{errors.service}</p>
            )}
          </div>

          {/* Project Details */}
          <div className="space-y-2">
            <Label htmlFor="contact-details">Detail Proyek</Label>
            <Textarea
              id="contact-details"
              placeholder="Ceritakan kebutuhan proyek Anda..."
              rows={4}
              value={formData.details}
              onChange={(e) =>
                setFormData({ ...formData, details: e.target.value })
              }
            />
          </div>

          {/* Submit */}
          <div className="w-full flex justify-center">
            <LiquidMetalButton
              type="submit"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Mengirim...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Kirim Pesan
                </>
              )}
            </LiquidMetalButton>
          </div>
        </form>
      </div>
    </BorderGlow>
  );
}

