"use client";

import { useEffect, useState } from "react";
import { BarChart3, Save, Loader2, Plus, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

interface StatItem {
  id?: number;
  value: number;
  suffix: string;
  label: string;
}

export default function AdminStatsPage() {
  const [stats, setStats] = useState<StatItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => setStats(Array.isArray(data) ? data : []))
      .catch(() => setMessage("Gagal memuat statistik"))
      .finally(() => setLoading(false));
  }, []);

  function handleChange(index: number, field: keyof StatItem, value: any) {
    const updated = [...stats];
    updated[index] = { ...updated[index], [field]: value };
    setStats(updated);
  }

  function handleAdd() {
    setStats([...stats, { value: 0, suffix: "+", label: "Statistik Baru" }]);
  }

  function handleDelete(index: number) {
    setStats(stats.filter((_, i) => i !== index));
  }

  async function handleSave() {
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/stats", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stats }),
      });

      if (res.ok) {
        setMessage("✅ Statistik berhasil diperbarui!");
      } else {
        setMessage("❌ Gagal memperbarui statistik");
      }
    } catch {
      setMessage("❌ Terjadi kesalahan server");
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

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-emerald-400" />
            Statistik Agency
          </h1>
          <p className="text-sm text-white/50 mt-1">
            Edit angka-angka statistik yang tampil di halaman beranda
          </p>
        </div>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="gap-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Simpan Semua
        </Button>
      </div>

      {message && (
        <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white/80">
          {message}
        </div>
      )}

      {/* Stats Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-36">Angka Nilai</TableHead>
            <TableHead className="w-32">Suffix</TableHead>
            <TableHead>Label Keterangan</TableHead>
            <TableHead className="text-right w-20">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stats.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <Input
                  type="number"
                  value={item.value}
                  onChange={(e) => handleChange(index, "value", parseInt(e.target.value) || 0)}
                />
              </TableCell>
              <TableCell>
                <Input
                  value={item.suffix}
                  onChange={(e) => handleChange(index, "suffix", e.target.value)}
                  placeholder="+, %, Thn"
                />
              </TableCell>
              <TableCell>
                <Input
                  value={item.label}
                  onChange={(e) => handleChange(index, "label", e.target.value)}
                />
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => handleDelete(index)}
                  className="text-white/40 hover:text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button
        variant="outline"
        onClick={handleAdd}
        className="w-full gap-2 rounded-2xl border-dashed border-white/20 bg-transparent text-white/60 hover:text-white hover:border-white/40 py-6"
      >
        <Plus className="w-4 h-4" /> Tambah Stat Baris
      </Button>
    </div>
  );
}
