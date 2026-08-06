"use client";

import React, { useState, useRef } from "react";
import { Upload, X, Loader2, Video, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FileUploadProps {
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
  accept?: string;
  label?: string;
  placeholder?: string;
  isVideo?: boolean;
}

export function FileUpload({
  value = "",
  onChange,
  folder = "general",
  accept = "image/*,video/*",
  label,
  placeholder = "Upload file atau masukkan URL",
  isVideo = false,
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Gagal mengunggah file");
      } else if (data.url) {
        onChange(data.url);
      }
    } catch {
      setError("Terjadi kesalahan koneksi saat mengunggah file");
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  const isVideoFile = isVideo || (value && value.match(/\.(mp4|webm|ogg)$/i));

  return (
    <div className="space-y-2">
      {label && <p className="text-sm font-medium text-white/70">{label}</p>}

      <div className="space-y-3">
        {/* Preview block if value exists */}
        {value ? (
          <div className="relative group rounded-xl border border-white/10 bg-white/5 p-2 overflow-hidden flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              {isVideoFile ? (
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                  <Video className="w-6 h-6" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-black/40 border border-white/10 relative shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={value}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://via.placeholder.com/150?text=Preview";
                    }}
                  />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="text-xs font-mono text-white/80 truncate">{value}</p>
                <p className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5">
                  <Check className="w-3 h-3" /> Tersimpan di Supabase
                </p>
              </div>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => onChange("")}
              className="text-white/40 hover:text-red-400 shrink-0"
              title="Hapus"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ) : null}

        {/* Upload Button + Input Row */}
        <div className="flex gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
          />

          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="flex-1"
          />

          <Button
            type="button"
            variant="outline"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
            className="gap-2 shrink-0 border-white/15 bg-white/5 hover:bg-white/10 text-white rounded-xl"
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 text-blue-400" />
                <span>Upload</span>
              </>
            )}
          </Button>
        </div>

        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    </div>
  );
}
