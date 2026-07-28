import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { BeamsBackground } from "@/components/ui/beams-background";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BeamsBackground intensity="strong">
      <Navbar />
      <main className="flex-1 relative z-10">{children}</main>
      <Footer />
    </BeamsBackground>
  );
}
