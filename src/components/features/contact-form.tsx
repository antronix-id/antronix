"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LiquidMetalButton } from "@/components/animations/liquid-metal-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { BorderGlow } from "@/components/animations/border-glow";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, CheckCircle2, Loader2, MessageCircle, Mail, MapPin } from "lucide-react";
import { SERVICES, AGENCY } from "@/lib/constants";
import { SocialIcons } from "@/components/shared/social-icons";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    const message = encodeURIComponent(
      `Halo ${AGENCY.name}! 👋\n\nNama: ${formData.name}\nWhatsApp: ${formData.whatsapp}\nLayanan: ${formData.service}\n\nDetail:\n${formData.details || "Mohon info lebih lanjut."}`
    );
    window.open(`https://wa.me/${AGENCY.whatsapp}?text=${message}`, "_blank");
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
    <div className="group relative cursor-pointer transform transition-all duration-500 hover:scale-[1.01] h-full w-full">
      <div className="text-white rounded-3xl border border-slate-400/30 bg-gradient-to-br from-[#010101] via-[#090909] to-[#010101] shadow-2xl relative backdrop-blur-xl overflow-hidden hover:border-slate-200/60 hover:shadow-slate-300/10 hover:shadow-3xl w-full h-full p-6 sm:p-8">
        {/* Background ambient lighting & animated effects */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-400/10 via-transparent to-white/5 opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-gradient-to-tr from-slate-300/20 to-transparent blur-3xl opacity-30 group-hover:opacity-50 transform group-hover:scale-110 transition-all duration-700 animate-bounce" />
          <div className="absolute top-10 left-10 w-16 h-16 rounded-full bg-slate-300/15 blur-xl animate-ping" />
          <div className="absolute bottom-16 right-16 w-12 h-12 rounded-full bg-white/5 blur-lg animate-ping" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-300/20 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Animated Social Icons Component inside top of Form Card */}
          <div className="mb-6 flex flex-col items-center justify-center space-y-3 border-b border-white/10 pb-6 text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Sosial Media & Quick Link
            </p>
            <SocialIcons />
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

        {/* Decorative Glass Corners */}
        <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-slate-300/20 to-transparent rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-slate-300/20 to-transparent rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </div>
  );
}

