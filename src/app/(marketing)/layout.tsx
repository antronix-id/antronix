import { Suspense } from "react";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { BeamsBackground } from "@/components/ui/beams-background";
import { PreloaderWrapper } from "@/components/providers/preloader-wrapper";
import { PageTransitionProvider } from "@/components/providers/page-transition-provider";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PreloaderWrapper>
      <Suspense fallback={null}>
        <PageTransitionProvider>
          <BeamsBackground intensity="strong">
            <Navbar />
            <main className="flex-1 relative z-10">{children}</main>
            <Footer />
          </BeamsBackground>
        </PageTransitionProvider>
      </Suspense>
    </PreloaderWrapper>
  );
}
