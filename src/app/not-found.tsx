import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/data";

/**
 * 404 BERMEREK
 * Dipakai untuk URL yang tidak terdaftar (mis. /portfolio/lama) dan untuk
 * notFound() pada /services/[slug] saat slug tidak ada di registry. Link divisi
 * diambil dari SERVICES, jadi menambah divisi baru otomatis ikut muncul di sini.
 */
export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center px-6 py-24">
      <div className="max-w-2xl text-center">
        <p className="gradient-text text-6xl font-extrabold tracking-tight sm:text-8xl">
          404
        </p>
        <h1 className="mt-4 text-2xl font-extrabold tracking-tight sm:text-4xl text-foreground">
          Halaman Tidak Ditemukan
        </h1>
        <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
          Tautan yang Anda buka mungkin sudah berpindah atau tidak tersedia.
          Mulai dari salah satu divisi kami atau kembali ke beranda.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          {SERVICES.map((service) => (
            <Link key={service.id} href={`/services/${service.slug}`}>
              <Button variant="outline">{service.title}</Button>
            </Link>
          ))}
          <Link href="/">
            <Button size="lg">Kembali ke Beranda</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
