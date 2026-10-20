"use client";

import { SITE } from "@/config/site";

/**
 * Batas error terakhir: hanya dipakai kalau root layout yang gagal render.
 * File ini menggantikan layout root, jadi harus menyusun dokumen <html>/<body>
 * sendiri — dan tidak ikut membawa globals.css, sehingga semua gaya ditulis
 * inline. Metadata tidak boleh diekspor dari sini (boundary-nya komponen
 * klien), jadi judul dokumen dipakai lewat elemen <title> React.
 */
export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html lang="id">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#020617",
          color: "#f8fafc",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <title>{`Terjadi Kesalahan | ${SITE.name}`}</title>

        <main style={{ maxWidth: "560px", padding: "48px 24px", textAlign: "center" }}>
          <h1 style={{ fontSize: "30px", fontWeight: 700, margin: 0 }}>
            Terjadi Kesalahan
          </h1>
          <p style={{ marginTop: "16px", fontSize: "16px", lineHeight: "26px", color: "#94a3b8" }}>
            Aplikasi gagal dimuat. Coba muat ulang halaman ini; jika masih gagal,
            silakan hubungi kami lewat halaman kontak.
          </p>

          <div style={{ marginTop: "28px", display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => unstable_retry()}
              style={{
                padding: "12px 22px",
                borderRadius: "10px",
                border: "none",
                backgroundColor: "#2563eb",
                color: "#ffffff",
                fontSize: "15px",
                cursor: "pointer",
              }}
            >
              Coba Lagi
            </button>
            {/* Sengaja <a>, bukan <Link>: file ini menggantikan root layout saat
                ia gagal render, jadi tautan harus memaksa muat penuh dokumen dan
                tidak bergantung pada router context. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/"
              style={{
                padding: "12px 22px",
                borderRadius: "10px",
                border: "1px solid rgba(148,163,184,0.45)",
                backgroundColor: "rgba(148,163,184,0.12)",
                color: "#e2e8f0",
                fontSize: "15px",
                textDecoration: "none",
              }}
            >
              Kembali ke Beranda
            </a>
          </div>

          {error.digest ? (
            <p style={{ marginTop: "24px", fontSize: "12px", color: "#64748b", fontFamily: "ui-monospace, monospace", wordBreak: "break-all" }}>
              Kode referensi: {error.digest}
            </p>
          ) : null}
        </main>
      </body>
    </html>
  );
}
