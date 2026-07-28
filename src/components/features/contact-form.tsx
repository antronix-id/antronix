"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { BorderGlow } from "@/components/ui/border-glow";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { SERVICES } from "@/lib/constants";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    // Simulate submission
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
          <div className="w-full">
            <Button
              type="submit"
              disabled={status === "loading"}
              className="w-full brand-gradient-btn"
              size="lg"
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
            </Button>
          </div>
        </form>
      </div>
    </BorderGlow>
  );
}
