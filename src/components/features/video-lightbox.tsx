"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import type { PortfolioItem } from "@/lib/constants";

interface VideoLightboxProps {
  item: PortfolioItem | null;
  open: boolean;
  onClose: () => void;
}

export function VideoLightbox({ item, open, onClose }: VideoLightboxProps) {
  if (!item?.videoUrl) return null;

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="max-w-4xl border-border bg-card p-0 overflow-hidden">
        <DialogTitle className="sr-only">Video Preview: {item.title}</DialogTitle>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Video placeholder */}
        <div className="aspect-video w-full bg-black flex items-center justify-center">
          <div className="text-center">
            <div className="mb-4 flex h-20 w-20 mx-auto items-center justify-center rounded-full bg-white/10">
              <svg className="h-10 w-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <p className="text-white/60 text-sm">{item.title}</p>
            <p className="text-white/40 text-xs mt-1">Video demo akan tersedia saat integrasi backend</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
