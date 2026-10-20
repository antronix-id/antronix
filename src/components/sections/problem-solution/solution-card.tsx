"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { IMAGES } from "@/data";
import type { ProblemSolution } from "@/types";

/** Kartu kanan slider: solusi + badge dampak dari layanan */
export function SolutionCard({ item }: { item: ProblemSolution }) {
  return (
    <div className="group cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:rotate-1 h-full w-full">
      <div className="text-white rounded-3xl border border-slate-300/30 bg-gradient-to-br from-[#010101] via-[#090909] to-[#010101] shadow-2xl relative backdrop-blur-xl overflow-hidden hover:border-slate-100/60 hover:shadow-slate-200/10 hover:shadow-3xl w-full h-full flex flex-col justify-between p-5 sm:p-8">
        {/* Background ambient lighting & animated effects */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-tr from-zinc-300/10 via-transparent to-white/5 opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-gradient-to-tr from-zinc-300/20 to-transparent blur-3xl opacity-30 group-hover:opacity-50 transform group-hover:scale-110 transition-all duration-700 animate-bounce" />
          <div className="absolute top-10 left-10 w-16 h-16 rounded-full bg-zinc-300/15 blur-xl animate-ping" />
          <div className="absolute bottom-16 right-16 w-12 h-12 rounded-full bg-white/5 blur-lg animate-ping" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000" />
        </div>

        {/* Card Content */}
        <div className="relative z-10">
          <div className="flex items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-300/15 border border-slate-200/40 text-slate-100 shadow-md">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                Solusi Kami
              </span>
            </div>

            {item.impactBadge && (
              <span className="rounded-full border border-slate-300/40 bg-slate-400/15 px-3 py-1 text-xs font-semibold text-slate-200 shadow-sm">
                {item.impactBadge}
              </span>
            )}
          </div>

          <div className="flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex-1">
              <h4 className="text-xl sm:text-2xl font-bold text-white mb-3 leading-snug">
                {item.solutionTitle}
              </h4>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                {item.solutionDescription}
              </p>
            </div>

            <div className="relative h-24 w-24 sm:h-28 sm:w-28 shrink-0 self-center sm:self-auto">
              <Image
                src={IMAGES.solution}
                alt="Solusi Kami"
                width={112}
                height={112}
                className="h-full w-full object-contain filter drop-shadow-xl transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Decorative Glass Corners */}
        <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-slate-200/20 to-transparent rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-slate-200/20 to-transparent rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </div>
  );
}
