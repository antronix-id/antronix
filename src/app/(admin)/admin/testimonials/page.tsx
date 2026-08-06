"use client";

import { useEffect, useState } from "react";
import { MessageSquareQuote, Plus, Trash2, Pencil, Star, Loader2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { FileUpload } from "@/components/ui/file-upload";

interface Testimonial {
  id: number;
  clientName: string;
  companyOrRole: string;
  avatarUrl: string;
  content: string;
  rating: number;
}

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editItem, setEditItem] = useState<Partial<Testimonial> | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function fetchItems() {
    const res = await fetch("/api/testimonials");
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => { fetchItems(); }, []);

  async function handleSave() {
    if (!editItem) return;
    setSaving(true);
    const method = editItem.id ? "PUT" : "POST";
    const url = editItem.id ? `/api/testimonials/${editItem.id}` : "/api/testimonials";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editItem),
    });

    if (res.ok) {
      setMessage("✅ Berhasil!");
      setEditItem(null);
      fetchItems();
    } else {
      setMessage("❌ Gagal menyimpan");
    }
    setSaving(false);
  }

  async function handleDelete(id: number) {
    if (!confirm("Hapus testimoni ini?")) return;
    await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
    fetchItems();
  }

  if (loading) {
    return <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-white/40" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <MessageSquareQuote className="w-6 h-6 text-purple-400" />
            Testimoni
          </h1>
          <p className="text-sm text-white/50 mt-1">{items.length} testimoni klien</p>
        </div>
        <Button
          onClick={() => setEditItem({ clientName: "", companyOrRole: "", avatarUrl: "/testimonials/avatar-1.jpg", content: "", rating: 5 })}
          className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl"
        >
          <Plus className="w-4 h-4" /> Tambah
        </Button>
      </div>

      {message && <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white/80">{message}</div>}

      {editItem && (
        <Card className="border-white/[0.08] bg-white/[0.02] p-6 space-y-4">
          <CardHeader className="p-0">
            <CardTitle className="text-lg font-semibold text-white">{editItem.id ? "Edit" : "Tambah"} Testimoni</CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-white/70 mb-1.5">Nama Klien</Label>
                <Input value={editItem.clientName || ""} onChange={(e) => setEditItem({ ...editItem, clientName: e.target.value })} />
              </div>
              <div>
                <Label className="text-white/70 mb-1.5">Jabatan / Perusahaan</Label>
                <Input value={editItem.companyOrRole || ""} onChange={(e) => setEditItem({ ...editItem, companyOrRole: e.target.value })} />
              </div>

              <div className="md:col-span-2">
                <FileUpload
                  label="Avatar Klien (Supabase Storage)"
                  value={editItem.avatarUrl || ""}
                  onChange={(url) => setEditItem({ ...editItem, avatarUrl: url })}
                  folder="testimonials"
                  accept="image/*"
                  placeholder="Upload avatar foto klien atau masukkan URL"
                />
              </div>

              <div>
                <Label className="text-white/70 mb-1.5">Rating (1-5)</Label>
                <Input type="number" min={1} max={5} value={editItem.rating || 5} onChange={(e) => setEditItem({ ...editItem, rating: parseInt(e.target.value) })} />
              </div>
            </div>
            <div>
              <Label className="text-white/70 mb-1.5">Konten Testimoni</Label>
              <Textarea value={editItem.content || ""} onChange={(e) => setEditItem({ ...editItem, content: e.target.value })} rows={3} />
            </div>
            <div className="flex gap-3 pt-2">
              <Button onClick={handleSave} disabled={saving} className="gap-2 rounded-xl">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : null} Simpan
              </Button>
              <Button variant="outline" onClick={() => setEditItem(null)} className="rounded-xl border-white/10 text-white/70 hover:text-white">Batal</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Testimonials Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">Avatar</TableHead>
            <TableHead>Nama Klien</TableHead>
            <TableHead>Jabatan / Perusahaan</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Konten Testimoni</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <div className="w-9 h-9 rounded-full overflow-hidden bg-black/40 border border-white/10 shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.avatarUrl || "https://via.placeholder.com/100?text=Avatar"}
                    alt={item.clientName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://via.placeholder.com/100?text=Avatar";
                    }}
                  />
                </div>
              </TableCell>
              <TableCell className="font-semibold text-white">
                {item.clientName}
              </TableCell>
              <TableCell className="text-xs text-white/60">
                {item.companyOrRole}
              </TableCell>
              <TableCell>
                <div className="flex gap-0.5">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-xs text-white/70 max-w-sm truncate">
                {item.content}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
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
