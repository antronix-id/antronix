import { SiteHeader } from "@/components/layout/site-header";
import { Footer } from "@/components/layout/site-footer";
import { PageTransitionProvider } from "@/components/providers/page-transition-provider";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageTransitionProvider>
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 relative z-10">{children}</main>

        <Footer />
      </div>
    </PageTransitionProvider>
  );
}
