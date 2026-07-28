"use client";

import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerPopup,
  MarkerLabel,
  MapControls,
  MapArc,
} from "@/components/ui/mapcn-marker-popup";
import { cn } from "@/lib/utils";
import { Building2, Sparkles, Cpu } from "lucide-react";

export type MarkerConfig = {
  lng: number;
  lat: number;
  label: string;
  popupTitle?: string;
  popupDesc?: string;
  icon?: "hq" | "media" | "system";
};

export type LocationMapProps = {
  center?: [number, number];
  zoom?: number;
  pitch?: number;
  bearing?: number;
  markers?: MarkerConfig[];
  className?: string;
};

const defaultArcs: { id: string; from: [number, number]; to: [number, number] }[] = [];

const markerIconMap = {
  hq: Building2,
  media: Sparkles,
  system: Cpu,
};

export function LocationMap({
  center = [104.7565, -2.9845],
  zoom = 12.8,
  pitch = 0,
  bearing = 0,
  markers = [
    {
      lng: 104.7565,
      lat: -2.9845,
      label: "Artificial Ripe",
      popupTitle: "Artificial Ripe",
    },
  ],
  className,
}: LocationMapProps) {
  return (
    <div className={cn("relative w-full h-full min-h-[480px] overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-2xl", className)}>
      <Map
        center={center}
        zoom={zoom}
        pitch={pitch}
        bearing={bearing}
        theme="dark"
        className="w-full h-full"
      >
        <MapControls
          position="bottom-right"
          showZoom
          showCompass
          showLocate
          showFullscreen
        />

        {markers.map((m, idx) => {
          return (
            <MapMarker key={idx} longitude={m.lng} latitude={m.lat} anchor="bottom">
              <MarkerContent>
                <div className="group relative flex flex-col items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105">
                  {/* Premium Red Pin */}
                  <svg
                    width="34"
                    height="44"
                    viewBox="0 0 34 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="filter drop-shadow-[0_4px_12px_rgba(239,68,68,0.5)] transition-transform duration-300 group-hover:-translate-y-1"
                  >
                    <path
                      d="M17 0C7.611 0 0 7.611 0 17C0 29 17 42 17 42C17 42 34 29 34 17C34 7.611 26.389 0 17 0Z"
                      fill="#ef4444"
                    />
                    <circle cx="17" cy="16" r="7.5" fill="#FFFFFF" />
                    <path
                      d="M5 43.5C5 41 29 41 29 43.5"
                      stroke="#ef4444"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      fill="none"
                      opacity="0.8"
                    />
                  </svg>
                </div>
              </MarkerContent>

              {m.popupTitle && (
                <MarkerPopup closeButton offset={28} className="border border-red-500/30 bg-slate-950/95 pl-4 pr-9 py-2.5 text-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.85)] backdrop-blur-2xl rounded-2xl min-w-[170px]">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                    </span>
                    <h4 className="text-xs font-bold tracking-wide text-white whitespace-nowrap">{m.popupTitle}</h4>
                  </div>
                </MarkerPopup>
              )}
            </MapMarker>
          );
        })}
      </Map>

      <style jsx global>{`
        .maplibregl-popup-content {
          background: transparent !important;
          box-shadow: none !important;
          padding: 0 !important;
          border-radius: 0 !important;
          border: none !important;
        }
        .maplibregl-popup-tip {
          border-top-color: rgba(2, 6, 23, 0.95) !important;
          border-bottom-color: rgba(2, 6, 23, 0.95) !important;
          border-left-color: rgba(2, 6, 23, 0.95) !important;
          border-right-color: rgba(2, 6, 23, 0.95) !important;
        }
      `}</style>
    </div>
  );
}

