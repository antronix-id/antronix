import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { services, serviceTargetAudiences, serviceProblemsAndSolutions, serviceKeyBenefits, serviceFeatures, servicePricingTiers } from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";
import { headers } from "next/headers";

// GET — Fetch all services (public)
export async function GET() {
  try {
    const allServices = await db
      .select()
      .from(services)
      .orderBy(asc(services.displayOrder));

    // Fetch related data for each service
    const servicesWithRelations = await Promise.all(
      allServices.map(async (service) => {
        const [audiences, problems, benefits, features, pricing] =
          await Promise.all([
            db
              .select()
              .from(serviceTargetAudiences)
              .where(eq(serviceTargetAudiences.serviceId, service.id))
              .orderBy(asc(serviceTargetAudiences.displayOrder)),
            db
              .select()
              .from(serviceProblemsAndSolutions)
              .where(eq(serviceProblemsAndSolutions.serviceId, service.id))
              .orderBy(asc(serviceProblemsAndSolutions.displayOrder)),
            db
              .select()
              .from(serviceKeyBenefits)
              .where(eq(serviceKeyBenefits.serviceId, service.id))
              .orderBy(asc(serviceKeyBenefits.displayOrder)),
            db
              .select()
              .from(serviceFeatures)
              .where(eq(serviceFeatures.serviceId, service.id))
              .orderBy(asc(serviceFeatures.displayOrder)),
            db
              .select()
              .from(servicePricingTiers)
              .where(eq(servicePricingTiers.serviceId, service.id))
              .orderBy(asc(servicePricingTiers.displayOrder)),
          ]);

        return {
          ...service,
          targetAudience: audiences,
          problemsAndSolutions: problems,
          keyBenefits: benefits,
          features: features,
          pricing: pricing,
        };
      })
    );

    return Response.json(servicesWithRelations);
  } catch (err) {
    console.error("GET /api/services error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

// POST — Create new service (admin only)
export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    const [newService] = await db
      .insert(services)
      .values({
        slug: body.slug,
        title: body.title,
        shortTitle: body.shortTitle,
        icon: body.icon,
        logo: body.logo,
        description: body.description,
        shortDescription: body.shortDescription,
        color: body.color,
        gradient: body.gradient,
        displayOrder: body.displayOrder ?? 0,
      })
      .returning();

    return Response.json(newService, { status: 201 });
  } catch (err) {
    console.error("POST /api/services error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
