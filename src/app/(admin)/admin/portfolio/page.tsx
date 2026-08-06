"use client";

import { useEffect, useState } from "react";
import { FolderOpen, Plus, Trash2, Pencil, ExternalLink, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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

interface PortfolioItem {
  id: number;
  title: string;
  slug: string;
  category: string;
  description: string;
  thumbnailUrl: string;
  videoUrl?: string | null;
  liveUrl?: string | null;
  techStack: string[];
  isFeatured: boolean;
}

export default function AdminPortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editItem, setEditItem] = useState<Partial<PortfolioItem> | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function fetchItems() {
    try {
      const res = await fetch("/api/portfolio");
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch {
      console.error("Failed to fetch portfolio");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchItems(); }, []);

  async function handleSave() {
    if (!editItem) return;
    setSaving(true);
    setMessage("");

    const method = editItem.id ? "PUT" : "POST";
    const url = editItem.id ? `/api/portfolio/${editItem.id}` : "/api/portfolio";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editItem),
      });

      if (res.ok) {
        setMessage("✅ Berhasil disimpan!");
        setEditItem(null);
        fetchItems();
      } else {
        setMessage("❌ Gagal menyimpan");
      }
    } catch {
      setMessage("❌ Terjadi kesalahan");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Yakin hapus item ini?")) return;

    try {
      await fetch(`/api/portfolio/${id}`, { method: "DELETE" });
      fetchItems();
    } catch {
      console.error("Failed to delete");
    }
  }

  function openNew() {
    setEditItem({
      title: "",
      slug: "",
      category: "web-studio",
      description: "",
      thumbnailUrl: "",
      videoUrl: "",
      liveUrl: "",
      techStack: [],
      isFeatured: false,
    });
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
            <FolderOpen className="w-6 h-6 text-blue-400" />
            Manajemen Portofolio
          </h1>
          <p className="text-sm text-white/50 mt-1">
            Total {items.length} item karya di website
          </p>
        </div>
        <Button
          onClick={openNew}
          className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl"
        >
          <Plus className="w-4 h-4" />
          Tambah Karya
        </Button>
      </div>

      {message && (
        <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white/80">
          {message}
        </div>
      )}

      {/* Editing Form */}
      {editItem && (
        <Card className="border-white/[0.08] bg-white/[0.02] p-6">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-lg font-semibold text-white">
              {editItem.id ? "Edit Karya" : "Tambah Karya Baru"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-white/70 mb-1.5">Judul Karya</Label>
                <Input
                  value={editItem.title || ""}
                  onChange={(e) => setEditItem({ ...editItem, title: e.target.value })}
                  placeholder="Misal: Website E-Commerce"
                />
              </div>
              <div>
                <Label className="text-white/70 mb-1.5">Slug URL</Label>
                <Input
                  value={editItem.slug || ""}
                  onChange={(e) => setEditItem({ ...editItem, slug: e.target.value })}
                  placeholder="ecommerce-fashion"
                />
              </div>
              <div>
                <Label className="text-white/70 mb-1.5">Kategori Layanan</Label>
                <select
                  value={editItem.category || "web-studio"}
                  onChange={(e) => setEditItem({ ...editItem, category: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-white/10 bg-[#121212] text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer"
                >
                  <option value="web-studio">Web Studio (web-studio)</option>
                  <option value="ai-media-lab">AI Media Lab (ai-media-lab)</option>
                  <option value="system-lab">System Lab (system-lab)</option>
                </select>
              </div>

              <div className="md:col-span-2 space-y-2 pt-2 border-t border-white/10">
                <Label className="text-white/70">Pilih Tipe Tampilan Utama</Label>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant={!editItem.videoUrl ? "default" : "outline"}
                    size="sm"
                    onClick={() => setEditItem({ ...editItem, videoUrl: null })}
                    className="gap-2 rounded-xl"
                  >
                    📷 Foto / Gambar
                  </Button>
                  <Button
                    type="button"
                    variant={editItem.videoUrl ? "default" : "outline"}
                    size="sm"
                    onClick={() => setEditItem({ ...editItem, videoUrl: editItem.videoUrl || "" })}
                    className="gap-2 rounded-xl"
                  >
                    🎥 Video Preview
                  </Button>
                </div>
              </div>

              {Boolean(editItem.videoUrl !== null && editItem.videoUrl !== undefined) ? (
                <div className="md:col-span-2">
                  <FileUpload
                    label="Upload Video Preview / Demo (Supabase Storage)"
                    value={editItem.videoUrl || ""}
                    onChange={(url) => setEditItem({ ...editItem, videoUrl: url })}
                    folder="portfolio/videos"
                    accept="video/*,image/*"
                    isVideo={true}
                    placeholder="Upload video mp4/webm atau tempel URL video"
                  />
                </div>
              ) : (
                <div className="md:col-span-2">
                  <FileUpload
                    label="Upload Gambar / Foto Portfolio (Supabase Storage)"
                    value={editItem.thumbnailUrl || ""}
                    onChange={(url) => setEditItem({ ...editItem, thumbnailUrl: url })}
                    folder="portfolio"
                    accept="image/*"
                    placeholder="Upload gambar / foto atau tempel URL"
                  />
                </div>
              )}

              <div>
                <Label className="text-white/70 mb-1.5">Live Demo URL (opsional)</Label>
                <Input
                  value={editItem.liveUrl || ""}
                  onChange={(e) => setEditItem({ ...editItem, liveUrl: e.target.value })}
                  placeholder="https://example.com"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isFeatured"
                checked={editItem.isFeatured || false}
                onChange={(e) => setEditItem({ ...editItem, isFeatured: e.target.checked })}
                className="w-4 h-4 rounded border-white/20 bg-white/5 text-blue-600 focus:ring-blue-500/20"
              />
              <Label htmlFor="isFeatured" className="text-white/70 cursor-pointer">
                Featured (tampil di beranda)
              </Label>
            </div>

            <div className="flex gap-3 pt-2">
              <Button onClick={handleSave} disabled={saving} className="gap-2 rounded-xl">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                Simpan
              </Button>
              <Button onClick={() => setEditItem(null)} variant="outline" className="rounded-xl border-white/10 text-white/70 hover:text-white">
                Batal
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* List Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-20">Preview</TableHead>
            <TableHead>Karya & Slug</TableHead>
            <TableHead>Kategori</TableHead>
            <TableHead>Tipe Media</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <div className="w-14 h-10 rounded-lg overflow-hidden bg-black/40 border border-white/10 shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.thumbnailUrl || "https://via.placeholder.com/150?text=No+Img"}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://via.placeholder.com/150?text=No+Img";
                    }}
                  />
                </div>
              </TableCell>
              <TableCell className="font-medium text-white">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{item.title}</span>
                  {item.isFeatured && (
                    <Badge variant="outline" className="border-amber-500/30 bg-amber-500/10 text-amber-400 text-[10px]">
                      Featured
                    </Badge>
                  )}
                </div>
                <p className="text-xs font-mono text-white/40 mt-0.5">/{item.slug}</p>
              </TableCell>
              <TableCell>
                <Badge variant="secondary" className="bg-white/5 text-white/70 border-white/10 uppercase tracking-wider text-[10px]">
                  {item.category}
                </Badge>
              </TableCell>
              <TableCell>
                {item.videoUrl ? (
                  <Badge variant="outline" className="border-purple-500/30 bg-purple-500/10 text-purple-400 text-[10px]">
                    🎥 Video
                  </Badge>
                ) : (
                  <Badge variant="outline" className="border-blue-500/30 bg-blue-500/10 text-blue-400 text-[10px]">
                    📷 Foto
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  {item.liveUrl && (
                    <Link href={item.liveUrl} target="_blank" rel="noopener">
                      <Button variant="ghost" size="icon-sm" className="text-white/50 hover:text-white">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </Link>
                  )}
                  <Button variant="ghost" size="icon-sm" onClick={() => setEditItem(item)} className="text-white/50 hover:text-white">
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon-sm" onClick={() => handleDelete(item.id)} className="text-white/50 hover:text-red-400">
                    <Trash2 className="w-4 h-4" />
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
