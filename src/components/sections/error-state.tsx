import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  /** causes the boundary to re-render; Next 16 names it `unstable_retry` */
  onRetry: () => void;
  /** digest dari error server-side, berguna saat mencocokkan log */
  digest?: string;
}

/**
 * Fallback error boundary untuk segmen marketing. Dipakai app/error.tsx dan
 * (marketing)/error.tsx supaya tampilan "gagal muat" konsisten.
 */
export function ErrorState({ onRetry, digest }: ErrorStateProps) {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center px-6 py-24">
      <div className="max-w-xl text-center">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl text-foreground">
          Terjadi <span className="gradient-text">Kesalahan</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
          Kami gagal menampilkan bagian halaman ini. Silakan coba lagi — jika
          tetap gagal, hubungkan kami lewat halaman kontak.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button onClick={onRetry}>Coba Lagi</Button>
          <Link href="/">
            <Button variant="outline">Kembali ke Beranda</Button>
          </Link>
        </div>

        {digest ? (
          <p className="mt-6 text-xs text-muted-foreground/70 font-mono break-all">
            Kode referensi: {digest}
          </p>
        ) : null}
      </div>
    </section>
  );
}
