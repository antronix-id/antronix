"use client";

import { useEffect, useState } from "react";
import { Award, Plus, Trash2, Pencil, Loader2, Save } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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

interface WhyItem {
  id?: number;
  icon: string;
  title: string;
  description: string;
}

export default function AdminWhyUsPage() {
  const [items, setItems] = useState<WhyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<WhyItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function fetchItems() {
    try {
      const res = await fetch("/api/why-us");
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch {
      console.error("Gagal mengambil data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  async function handleSave() {
    if (!editing) return;
    setSaving(true);
    setMessage("");

    const method = editing.id ? "PUT" : "POST";
    const url = editing.id ? `/api/why-us/${editing.id}` : "/api/why-us";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });

      if (res.ok) {
        setMessage("✅ Berhasil disimpan!");
        setEditing(null);
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
    if (!confirm("Hapus keunggulan ini?")) return;
    await fetch(`/api/why-us/${id}`, { method: "DELETE" });
    fetchItems();
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-white/40" />
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-400" />
            Keunggulan Agency
          </h1>
          <p className="text-sm text-white/50 mt-1">
            Poin &quot;Mengapa Memilih Kami&quot; di beranda
          </p>
        </div>
        <Button
          onClick={() => setEditing({ icon: "zap", title: "", description: "" })}
          className="gap-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl"
        >
          <Plus className="w-4 h-4" /> Tambah Poin
        </Button>
      </div>

      {message && (
        <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white/80">
          {message}
        </div>
      )}

      {editing && (
        <Card className="border-white/[0.08] bg-white/[0.02] p-6 space-y-4">
          <CardHeader className="p-0">
            <CardTitle className="text-lg font-semibold text-white">
              {editing.id ? "Edit" : "Tambah"} Keunggulan
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-white/70 mb-1.5">Judul</Label>
                <Input
                  value={editing.title}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                />
              </div>
              <div>
                <Label className="text-white/70 mb-1.5">Icon (Lucide)</Label>
                <Input
                  value={editing.icon}
                  onChange={(e) => setEditing({ ...editing, icon: e.target.value })}
                  placeholder="zap, shield, clock, headphones"
                />
              </div>
            </div>
            <div>
              <Label className="text-white/70 mb-1.5">Deskripsi</Label>
              <Textarea
                value={editing.description}
                onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button onClick={handleSave} disabled={saving} className="gap-2 rounded-xl">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Simpan
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

      {/* Why Us Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-24">Ikon</TableHead>
            <TableHead>Judul Keunggulan</TableHead>
            <TableHead>Deskripsi</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Badge variant="outline" className="border-amber-500/30 bg-amber-500/20 text-amber-300 font-mono text-xs">
                  {item.icon}
                </Badge>
              </TableCell>
              <TableCell className="font-semibold text-white">
                {item.title}
              </TableCell>
              <TableCell className="text-xs text-white/70 max-w-md leading-relaxed">
                {item.description}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => setEditing(item)}
                    className="text-white/50 hover:text-white"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  {item.id && (
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => handleDelete(item.id!)}
                      className="text-white/50 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
