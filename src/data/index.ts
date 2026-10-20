/**
 * ==============================================================================
 * MASTER DATA INDEX
 * ==============================================================================
 * Pintu tunggal untuk seluruh konten marketing. Komponen mengimpor dari
 * "@/data", bukan dari file spesifik, sehingga isi data boleh dipecah/rename
 * tanpa menyentuh komponen.
 *
 * - assets.ts      : satu-satunya tempat path file public/ dituliskan
 * - brand.ts       : identitas & kontak agency
 * - navigation.ts  : menu header/footer (submenu diturunkan dari SERVICES)
 * - services/      : registry divisi layanan (1 file per divisi)
 * - portfolio.ts   : hasil karya / studi kasus
 * - testimonials.ts: testimoni klien
 * - industries.ts  : segmen industri yang dilayani
 * - faq.ts         : pertanyaan umum per divisi
 *
 * Tipe data TIDAK diimpor ulang dari sini — gunakan "@/types".
 */
export * from "./assets";
export * from "./brand";
export * from "./faq";
export * from "./industries";
export * from "./navigation";
export * from "./portfolio";
export * from "./services";
export * from "./testimonials";
