import { redirect } from "next/navigation";

/**
 * Route /kontak diarahkan secara otomatis ke seksi formulir kontak pada
 * halaman /tentang-kami (#contact), menjaga kecocokan tautan eksternal lama.
 */
export default function ContactPage() {
  redirect("/tentang-kami#contact");
}
