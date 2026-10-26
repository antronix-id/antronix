"use client";

import Image from "next/image";
import { AlertCircle } from "lucide-react";
import { IMAGES } from "@/data";
import { cn } from "@/lib/utils";

export interface ChallengeItem {
  problemTitle: string;
  problemDescription: string;
  category?: string;
}

/** Kartu tantangan (masalah) bisnis klien */
export function ChallengeCard({
  item,
  index,
  category,
}: {
  item: ChallengeItem;
  index: number;
  category?: string;
}) {
  const itemCategory = category || item.category;
  const isWeb = itemCategory?.toLowerCase().includes("web");

  return (
    <div className="group cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:-rotate-0.5 h-full w-full">
      <div className="text-white rounded-3xl border border-slate-400/30 bg-gradient-to-br from-[#010101] via-[#090909] to-[#010101] shadow-2xl relative backdrop-blur-xl overflow-hidden hover:border-slate-200/60 hover:shadow-slate-300/10 hover:shadow-3xl w-full h-full flex flex-col justify-between p-5 sm:p-8">
        {/* Background ambient lighting & animated effects */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-400/10 via-transparent to-white/5 opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-gradient-to-tr from-slate-300/20 to-transparent blur-3xl opacity-30 group-hover:opacity-50 transform group-hover:scale-110 transition-all duration-700 animate-bounce" />
          <div className="absolute top-10 left-10 w-16 h-16 rounded-full bg-slate-300/15 blur-xl animate-ping" />
          <div className="absolute bottom-16 right-16 w-12 h-12 rounded-full bg-white/5 blur-lg animate-ping" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-300/20 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000" />
        </div>

        {/* Card Content */}
        <div className="relative z-10 flex flex-col h-full justify-between">
          <div className="flex items-center justify-between gap-2.5 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-400/15 border border-slate-300/40 text-slate-200 shadow-md">
                <AlertCircle className="h-4 w-4" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Tantangan #{index + 1}
              </span>
            </div>

            {itemCategory && (
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-md",
                  isWeb
                    ? "bg-blue-500/15 text-blue-300 border-blue-500/30"
                    : "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                )}
              >
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    isWeb ? "bg-blue-400 animate-pulse" : "bg-emerald-400 animate-pulse"
                  )}
                />
                {itemCategory}
              </span>
            )}
          </div>

          <div className="flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex-1">
              <h4 className="text-xl sm:text-2xl font-bold text-white mb-3 leading-snug">
                {item.problemTitle}
              </h4>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                {item.problemDescription}
              </p>
            </div>

            <div className="relative h-24 w-24 sm:h-28 sm:w-28 shrink-0 self-center sm:self-auto">
              <Image
                src={IMAGES.challenge}
                alt={item.problemTitle}
                width={112}
                height={112}
                className="h-full w-full object-contain filter drop-shadow-xl transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Decorative Glass Corners */}
        <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-slate-300/20 to-transparent rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-slate-300/20 to-transparent rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </div>
  );
}
