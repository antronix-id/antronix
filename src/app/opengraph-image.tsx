import { ImageResponse } from "next/og";
import { AGENCY, SERVICES } from "@/data";
import { OG_IMAGE, SITE } from "@/config/site";

/**
 * GAMBAR BERBAGI (og:image / twitter:image)
 * Ukuran & alt text diambil dari OG_IMAGE di config yang sama, supaya route
 * ini dan tag meta yang menunjuknya tidak bisa berbeda. Teksnya seluruhnya
 * bersumber dari brand.ts + SERVICES registry.
 */
export const alt = OG_IMAGE.alt;
export const size = { width: OG_IMAGE.width, height: OG_IMAGE.height };
export const contentType = OG_IMAGE.type;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#020617",
          backgroundImage:
            "radial-gradient(circle at 78% 18%, rgba(59,130,246,0.35) 0%, rgba(2,6,23,0) 55%), linear-gradient(135deg, #020617 0%, #0b1220 100%)",
          color: "#ffffff",
          fontFamily: "Geist",
        }}
      >
        {/* Brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              backgroundImage: "linear-gradient(135deg, #3b82f6, #06b6d4)",
              display: "flex",
            }}
          />
          <div style={{ fontSize: "34px", display: "flex" }}>{SITE.name}</div>
        </div>

        {/* Headline — seluruh teks bersumber dari brand.ts / config site.ts */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div style={{ fontSize: "66px", lineHeight: "78px", display: "flex" }}>
            {AGENCY.tagline}
          </div>
          <div
            style={{
              fontSize: "28px",
              lineHeight: "40px",
              color: "#cbd5e1",
              display: "flex",
            }}
          >
            {SITE.description}
          </div>
        </div>

        {/* Divisi */}
        <div style={{ display: "flex", gap: "18px" }}>
          {SERVICES.map((service) => (
            <div
              key={service.id}
              style={{
                display: "flex",
                padding: "14px 28px",
                borderRadius: "999px",
                border: "2px solid rgba(148,163,184,0.45)",
                backgroundColor: "rgba(148,163,184,0.12)",
                fontSize: "26px",
                color: "#e2e8f0",
              }}
            >
              {service.title}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
