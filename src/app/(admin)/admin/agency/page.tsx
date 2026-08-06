"use client";

import { useEffect, useState } from "react";
import { Save, Loader2, Building2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface AgencyData {
  name: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  socials: {
    whatsapp: string;
    instagram: string;
    tiktok: string;
    linkedin: string;
    x: string;
    youtube: string;
  };
}

export default function AdminAgencyPage() {
  const [data, setData] = useState<AgencyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/agency")
      .then((r) => r.json())
      .then(setData)
      .catch(() => setMessage("Gagal memuat data"))
      .finally(() => setLoading(false));
  }, []);

  async function handleSave() {
    if (!data) return;
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/agency", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setMessage("✅ Berhasil disimpan!");
      } else {
        setMessage("❌ Gagal menyimpan");
      }
    } catch {
      setMessage("❌ Terjadi kesalahan");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-white/40" />
      </div>
    );
  }

  if (!data) return <p className="text-white/50">Data tidak ditemukan</p>;

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Building2 className="w-6 h-6 text-blue-400" />
            Agency Info
          </h1>
          <p className="text-sm text-white/50 mt-1">
            Edit informasi brand, kontak, dan media sosial
          </p>
        </div>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Simpan
        </Button>
      </div>

      {message && (
        <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white/80">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Brand Info */}
        <Card className="border-white/[0.08] bg-white/[0.02] p-6 space-y-5 lg:col-span-2">
          <CardHeader className="p-0">
            <CardTitle className="text-lg font-semibold text-white">Informasi Brand</CardTitle>
          </CardHeader>
          <CardContent className="p-0 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-white/70 mb-1.5">Nama Agency</Label>
              <Input
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
            </div>
            <div>
              <Label className="text-white/70 mb-1.5">Tagline</Label>
              <Input
                value={data.tagline}
                onChange={(e) => setData({ ...data, tagline: e.target.value })}
              />
            </div>
            <div className="md:col-span-2">
              <Label className="text-white/70 mb-1.5">Deskripsi</Label>
              <Textarea
                value={data.description}
                onChange={(e) => setData({ ...data, description: e.target.value })}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="border-white/[0.08] bg-white/[0.02] p-6 space-y-5">
          <CardHeader className="p-0">
            <CardTitle className="text-lg font-semibold text-white">Kontak</CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-4">
            {[
              { label: "Email", key: "email" as const },
              { label: "Telepon", key: "phone" as const },
              { label: "WhatsApp", key: "whatsapp" as const },
              { label: "Alamat", key: "address" as const },
            ].map((field) => (
              <div key={field.key}>
                <Label className="text-white/70 mb-1.5">{field.label}</Label>
                <Input
                  value={data[field.key]}
                  onChange={(e) => setData({ ...data, [field.key]: e.target.value })}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Social Links */}
        <Card className="border-white/[0.08] bg-white/[0.02] p-6 space-y-5">
          <CardHeader className="p-0">
            <CardTitle className="text-lg font-semibold text-white">Media Sosial</CardTitle>
          </CardHeader>
          <CardContent className="p-0 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(data.socials).map(([key, value]) => (
              <div key={key}>
                <Label className="text-white/70 mb-1.5 capitalize">{key}</Label>
                <Input
                  value={value}
                  onChange={(e) =>
                    setData({
                      ...data,
                      socials: { ...data.socials, [key]: e.target.value },
                    })
                  }
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
