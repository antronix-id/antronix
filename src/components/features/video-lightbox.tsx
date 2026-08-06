"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import type { PortfolioItem } from "@/lib/constants";
import { Safari } from "@/components/mockups/safari";

interface VideoLightboxProps {
  item: PortfolioItem | null;
  open: boolean;
  onClose: () => void;
}

export function VideoLightbox({ item, open, onClose }: VideoLightboxProps) {
  if (!item) return null;

  const displayUrl = `${item.slug || "project"}.antronix.com`;

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="max-w-5xl border-white/20 bg-slate-950 p-0 overflow-hidden shadow-2xl">
        <DialogTitle className="sr-only">Video Preview: {item.title}</DialogTitle>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-3 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-colors hover:bg-black/80 border border-white/20"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-4 sm:p-6">
          <Safari
            url={displayUrl}
            videoSrc={item.videoUrl || "/bc.mp4"}
            className="w-full shadow-2xl"
          />
          <div className="mt-4 px-2">
            <h3 className="text-xl font-bold text-white tracking-tight">{item.title}</h3>
            <p className="mt-1 text-sm text-slate-300">{item.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {item.techStack.map((tech) => (
                <span key={tech} className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-mono text-cyan-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
