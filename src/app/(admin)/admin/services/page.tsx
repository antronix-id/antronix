"use client";

import { useEffect, useState } from "react";
import {
  Briefcase,
  Pencil,
  ExternalLink,
  Loader2,
  Save,
  Plus,
  Trash2,
  Tag,
  DollarSign,
} from "lucide-react";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { FileUpload } from "@/components/ui/file-upload";
import Link from "next/link";

interface PricingTier {
  id?: number;
  name: string;
  price: string;
  description?: string | null;
  features: string[];
  popular?: boolean;
}

interface TargetAudience {
  id?: number;
  title: string;
  description: string;
  icon?: string | null;
  image?: string | null;
  badge?: string | null;
}

interface KeyBenefit {
  id?: number;
  title: string;
  description: string;
  stat?: string | null;
}

interface Service {
  id: number;
  slug: string;
  title: string;
  shortTitle: string;
  icon: string;
  logo?: string | null;
  description: string;
  shortDescription: string;
  color: string;
  gradient: string;
  pricing?: PricingTier[];
  targetAudience?: TargetAudience[];
  keyBenefits?: KeyBenefit[];
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Service | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [activeTab, setActiveTab] = useState<"general" | "pricing" | "benefits">("pricing");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function fetchServices() {
    try {
      const res = await fetch("/api/services");
      const data = await res.json();
      setServices(Array.isArray(data) ? data : []);
    } catch {
      console.error("Gagal mengambil data layanan");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchServices();
  }, []);

  async function startEditing(service: Service) {
    setLoadingDetail(true);
    setEditing(service);
    setMessage("");
    setActiveTab("pricing");

    try {
      const res = await fetch(`/api/services/${service.id}`);
      if (res.ok) {
        const fullData = await res.json();
        setEditing({
          ...fullData,
          pricing: fullData.pricing || [],
          targetAudience: fullData.targetAudience || [],
          keyBenefits: fullData.keyBenefits || [],
        });
      }
    } catch (err) {
      console.error("Gagal mengambil detail layanan:", err);
    } finally {
      setLoadingDetail(false);
    }
  }

  async function handleSave() {
    if (!editing) return;
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch(`/api/services/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });

      if (res.ok) {
        setMessage("✅ Berhasil memperbarui layanan dan paket harga!");
        setEditing(null);
        fetchServices();
      } else {
        setMessage("❌ Gagal memperbarui layanan");
      }
    } catch {
      setMessage("❌ Terjadi kesalahan server");
    } finally {
      setSaving(false);
    }
  }

  function addPricingTier() {
    if (!editing) return;
    const newTier: PricingTier = {
      name: "Paket Baru",
      price: "Rp 5.000.000",
      description: "Estimasi pengerjaan per proyek",
      features: ["Landing Page 1-3 Halaman", "Desain Responsif Mobile"],
      popular: false,
    };
    setEditing({
      ...editing,
      pricing: [...(editing.pricing || []), newTier],
    });
  }

  function updatePricingTier(index: number, field: keyof PricingTier, value: any) {
    if (!editing || !editing.pricing) return;
    const updated = [...editing.pricing];
    updated[index] = { ...updated[index], [field]: value };
    setEditing({ ...editing, pricing: updated });
  }

  function deletePricingTier(index: number) {
    if (!editing || !editing.pricing) return;
    const updated = editing.pricing.filter((_, i) => i !== index);
    setEditing({ ...editing, pricing: updated });
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-white/40" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-blue-400" />
            Manajemen Layanan & Paket Harga
          </h1>
          <p className="text-sm text-white/50 mt-1">
            Kelola {services.length} layanan utama dan paket investasi digital
          </p>
        </div>
      </div>

      {message && (
        <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white/80">
          {message}
        </div>
      )}

      {/* Editing Form */}
      {editing && (
        <Card className="border-white/10 bg-white/[0.02] p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                Edit Layanan: <span className="text-blue-400">{editing.title}</span>
              </CardTitle>
              {loadingDetail && (
                <p className="text-xs text-blue-400 flex items-center gap-1 mt-1">
                  <Loader2 className="w-3 h-3 animate-spin" /> Memuat detail relasi & paket harga...
                </p>
              )}
            </div>

            {/* Form Sub-Tabs */}
            <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
              <Button
                type="button"
                variant={activeTab === "general" ? "default" : "ghost"}
                size="xs"
                onClick={() => setActiveTab("general")}
                className="gap-1.5"
              >
                <Tag className="w-3.5 h-3.5" /> Informasi Umum
              </Button>
              <Button
                type="button"
                variant={activeTab === "pricing" ? "default" : "ghost"}
                size="xs"
                onClick={() => setActiveTab("pricing")}
                className="gap-1.5"
              >
                <DollarSign className="w-3.5 h-3.5" /> Paket Harga ({editing.pricing?.length || 0})
              </Button>
            </div>
          </div>

          <CardContent className="p-0 space-y-6">
            {/* TAB 1: General Info */}
            {activeTab === "general" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-white/70 mb-1.5">Judul Layanan</Label>
                    <Input
                      value={editing.title}
                      onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label className="text-white/70 mb-1.5">Short Title</Label>
                    <Input
                      value={editing.shortTitle}
                      onChange={(e) => setEditing({ ...editing, shortTitle: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label className="text-white/70 mb-1.5">Slug</Label>
                    <Input
                      value={editing.slug}
                      onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label className="text-white/70 mb-1.5">Icon Name (Lucide)</Label>
                    <Input
                      value={editing.icon}
                      onChange={(e) => setEditing({ ...editing, icon: e.target.value })}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <FileUpload
                      label="Logo / Gambar Layanan (Supabase Storage)"
                      value={editing.logo || ""}
                      onChange={(url) => setEditing({ ...editing, logo: url })}
                      folder="services"
                      accept="image/*"
                      placeholder="Upload gambar logo layanan atau tempel URL"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-white/70 mb-1.5">Deskripsi Singkat</Label>
                  <Input
                    value={editing.shortDescription}
                    onChange={(e) => setEditing({ ...editing, shortDescription: e.target.value })}
                  />
                </div>

                <div>
                  <Label className="text-white/70 mb-1.5">Deskripsi Lengkap</Label>
                  <Textarea
                    value={editing.description}
                    onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                    rows={3}
                  />
                </div>
              </div>
            )}

            {/* TAB 2: Pricing Tiers */}
            {activeTab === "pricing" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-white">Estimasi Paket Investasi Digital</h3>
                    <p className="text-xs text-white/50">Kelola opsi harga yang akan tampil di kartu pricing beranda</p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addPricingTier}
                    className="gap-1.5 text-xs border-blue-500/30 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                  >
                    <Plus className="w-3.5 h-3.5" /> Tambah Paket Harga
                  </Button>
                </div>

                {(!editing.pricing || editing.pricing.length === 0) ? (
                  <div className="p-8 rounded-xl border border-dashed border-white/10 text-center text-sm text-white/40">
                    Belum ada paket harga untuk layanan ini. Klik &quot;Tambah Paket Harga&quot; untuk menambahkan.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {editing.pricing.map((tier, index) => (
                      <div
                        key={index}
                        className={`rounded-2xl border p-5 space-y-4 relative flex flex-col justify-between ${
                          tier.popular
                            ? "border-purple-500/40 bg-purple-500/[0.04]"
                            : "border-white/10 bg-white/[0.02]"
                        }`}
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-[10px] uppercase font-mono text-white/60">
                              Paket #{index + 1}
                            </Badge>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon-xs"
                              onClick={() => deletePricingTier(index)}
                              className="text-white/40 hover:text-red-400"
                              title="Hapus Paket"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>

                          <div>
                            <Label className="text-white/60 mb-1 text-xs">Nama Paket</Label>
                            <Input
                              value={tier.name}
                              onChange={(e) => updatePricingTier(index, "name", e.target.value)}
                              placeholder="Misal: Pemula (Starter)"
                              className="text-sm font-semibold"
                            />
                          </div>

                          <div>
                            <Label className="text-white/60 mb-1 text-xs">Nominal Harga</Label>
                            <Input
                              value={tier.price}
                              onChange={(e) => updatePricingTier(index, "price", e.target.value)}
                              placeholder="Misal: Rp 5.000.000"
                              className="text-sm font-bold font-mono text-emerald-400"
                            />
                          </div>

                          <div>
                            <Label className="text-white/60 mb-1 text-xs">Sub-Keterangan</Label>
                            <Input
                              value={tier.description || ""}
                              onChange={(e) => updatePricingTier(index, "description", e.target.value)}
                              placeholder="Estimasi pengerjaan per proyek"
                              className="text-xs"
                            />
                          </div>

                          <div>
                            <Label className="text-white/60 mb-1 text-xs">Fitur-Fitur (1 fitur per baris)</Label>
                            <Textarea
                              value={tier.features.join("\n")}
                              onChange={(e) =>
                                updatePricingTier(
                                  index,
                                  "features",
                                  e.target.value.split("\n").filter((f) => f.trim() !== "")
                                )
                              }
                              rows={4}
                              placeholder="Landing Page (1-3 Halaman)&#10;Desain Responsif&#10;SEO Basic"
                              className="text-xs font-mono"
                            />
                          </div>

                          <label className="flex items-center gap-2 cursor-pointer pt-1">
                            <input
                              type="checkbox"
                              checked={tier.popular || false}
                              onChange={(e) => updatePricingTier(index, "popular", e.target.checked)}
                              className="rounded border-white/20 bg-white/5 text-purple-600 focus:ring-purple-500"
                            />
                            <span className="text-xs font-medium text-purple-300">Tandai sebagai Paket Populer</span>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-3 pt-4 border-t border-white/10">
              <Button onClick={handleSave} disabled={saving} className="gap-2 rounded-xl">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Simpan Perubahan
              </Button>
              <Button
                variant="outline"
                onClick={() => setEditing(null)}
                className="rounded-xl border-white/10 text-white/70 hover:text-white"
              >
                Batal
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Services Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">Logo</TableHead>
            <TableHead>Layanan & Kode</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Deskripsi Singkat</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-black/40 border border-white/10 flex items-center justify-center text-blue-400 shrink-0 font-bold text-xs">
                  {item.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.logo}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  ) : (
                    item.shortTitle.substring(0, 2).toUpperCase()
                  )}
                </div>
              </TableCell>
              <TableCell className="font-medium text-white">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{item.title}</span>
                  <Badge variant="outline" className="border-blue-500/30 bg-blue-500/10 text-blue-400 font-semibold uppercase text-[10px]">
                    {item.shortTitle}
                  </Badge>
                </div>
              </TableCell>
              <TableCell className="text-xs font-mono text-white/50">
                /{item.slug}
              </TableCell>
              <TableCell className="text-xs text-white/70 max-w-xs truncate">
                {item.shortDescription}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <Link href={`/services/${item.slug}`} target="_blank">
                    <Button variant="ghost" size="icon-sm" className="text-white/50 hover:text-white">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon-sm" onClick={() => startEditing(item)} className="text-white/50 hover:text-white" title="Edit Layanan & Paket Harga">
                    <Pencil className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
