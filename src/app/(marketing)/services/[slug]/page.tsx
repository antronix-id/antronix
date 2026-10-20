import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ParallaxCosmic } from "@/components/effects/parallax-cosmic";
import { SectionHeader } from "@/components/layout/section-header";
import { PortfolioCard } from "@/components/sections/portfolio-card";
import { ProblemSolutionSection } from "@/components/sections/problem-solution";
import { FaqSection } from "@/components/sections/faq-scroller";
import { PORTFOLIO, SERVICES, SERVICE_FAQ, getService } from "@/data";
import { createMetadata } from "@/lib/metadata";
import { ServiceFeatureGrid } from "./sections/feature-grid";
import { ServicePricingTiers } from "./sections/pricing-tiers";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Registry SERVICES menutupi semua slug yang sah, jadi slug lain dipotong di
 * level routing dan benar-benar mengembalikan status 404. Kalau dibiarkan default
 * (true), slug tak dikenal dirender saat request dan di-stream, sehingga status
 * HTTP-nya 200 dan hanya ditandai <meta name="robots" content="noindex">.
 */
export const dynamicParams = false;

/**
 * Route dinamis ini hanya menghasilkan slug divisi yang ada di registry, jadi
 * URL publik /services/web-studio & /services/system-lab tetap sama seperti
 * sebelumnya (tidak ada redirect).
 */
export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return createMetadata({
    title: service.title,
    description: service.description,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const { page } = service;
  const relatedPortfolio = PORTFOLIO.filter(
    (item) => item.category === service.slug
  );
  const portfolioItems =
    typeof page.portfolioLimit === "number"
      ? relatedPortfolio.slice(0, page.portfolioLimit)
      : relatedPortfolio;

  return (
    <div className="relative min-h-screen">
      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden -mt-16 sm:-mt-20">
        <ParallaxCosmic
          head={service.title}
          text={page.heroTagline}
          glowColor={page.heroGlow}
          className="w-full min-h-[500px] sm:min-h-[600px]"
        />
      </section>

      {/* PROBLEM & SOLUTION SECTION */}
      {service.problemsAndSolutions && (
        <ProblemSolutionSection
          problemsAndSolutions={service.problemsAndSolutions}
          serviceTitle={service.title}
          glowColor={page.accentColor}
        />
      )}

      {/* Related Portfolio */}
      {portfolioItems.length > 0 && (
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-[1536px] px-4 sm:px-6 lg:px-10">
            <SectionHeader
              badge="Portfolio"
              title="Proyek"
              titleHighlight={service.title}
              description={page.portfolioDescription}
            />
            <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
              {portfolioItems.map((item, index) => (
                <PortfolioCard key={item.id} item={item} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <ServiceFeatureGrid service={service} />

      {/* Pricing */}
      <ServicePricingTiers service={service} />

      {/* FAQ SECTION */}
      <section className="relative py-12 sm:py-20 border-t border-white/5 overflow-hidden">
        <FaqSection data={SERVICE_FAQ[service.slug]} />
      </section>
    </div>
  );
}
