import { Suspense } from "react";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
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
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 relative z-10">{children}</main>

            <Footer />
          </div>
        </PageTransitionProvider>
      </Suspense>
    </PreloaderWrapper>
  );
}


