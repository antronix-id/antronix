import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  services,
  serviceTargetAudiences,
  serviceProblemsAndSolutions,
  serviceKeyBenefits,
  serviceFeatures,
  servicePricingTiers,
} from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";
import { headers } from "next/headers";

// GET — Fetch single service by ID (public)
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const serviceId = parseInt(id);

    const [service] = await db
      .select()
      .from(services)
      .where(eq(services.id, serviceId))
      .limit(1);

    if (!service) {
      return Response.json({ error: "Service not found" }, { status: 404 });
    }

    const [audiences, problems, benefits, features, pricing] =
      await Promise.all([
        db
          .select()
          .from(serviceTargetAudiences)
          .where(eq(serviceTargetAudiences.serviceId, serviceId))
          .orderBy(asc(serviceTargetAudiences.displayOrder)),
        db
          .select()
          .from(serviceProblemsAndSolutions)
          .where(eq(serviceProblemsAndSolutions.serviceId, serviceId))
          .orderBy(asc(serviceProblemsAndSolutions.displayOrder)),
        db
          .select()
          .from(serviceKeyBenefits)
          .where(eq(serviceKeyBenefits.serviceId, serviceId))
          .orderBy(asc(serviceKeyBenefits.displayOrder)),
        db
          .select()
          .from(serviceFeatures)
          .where(eq(serviceFeatures.serviceId, serviceId))
          .orderBy(asc(serviceFeatures.displayOrder)),
        db
          .select()
          .from(servicePricingTiers)
          .where(eq(servicePricingTiers.serviceId, serviceId))
          .orderBy(asc(servicePricingTiers.displayOrder)),
      ]);

    return Response.json({
      ...service,
      targetAudience: audiences,
      problemsAndSolutions: problems,
      keyBenefits: benefits,
      features: features,
      pricing: pricing,
    });
  } catch (err) {
    console.error("GET /api/services/[id] error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

// PUT — Update service (admin only)
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const serviceId = parseInt(id);
    const body = await request.json();

    // Update main service
    const [updated] = await db
      .update(services)
      .set({
        slug: body.slug,
        title: body.title,
        shortTitle: body.shortTitle,
        icon: body.icon,
        logo: body.logo,
        description: body.description,
        shortDescription: body.shortDescription,
        color: body.color,
        gradient: body.gradient,
        displayOrder: body.displayOrder,
        updatedAt: new Date(),
      })
      .where(eq(services.id, serviceId))
      .returning();

    if (!updated) {
      return Response.json({ error: "Service not found" }, { status: 404 });
    }

    // Replace related data if provided
    if (body.targetAudience) {
      await db.delete(serviceTargetAudiences).where(eq(serviceTargetAudiences.serviceId, serviceId));
      if (body.targetAudience.length > 0) {
        await db.insert(serviceTargetAudiences).values(
          body.targetAudience.map((item: Record<string, unknown>, index: number) => ({
            serviceId,
            title: item.title,
            description: item.description,
            icon: item.icon,
            image: item.image,
            badge: item.badge,
            displayOrder: index,
          }))
        );
      }
    }

    if (body.problemsAndSolutions) {
      await db.delete(serviceProblemsAndSolutions).where(eq(serviceProblemsAndSolutions.serviceId, serviceId));
      if (body.problemsAndSolutions.length > 0) {
        await db.insert(serviceProblemsAndSolutions).values(
          body.problemsAndSolutions.map((item: Record<string, unknown>, index: number) => ({
            serviceId,
            problemTitle: item.problemTitle,
            problemDescription: item.problemDescription,
            solutionTitle: item.solutionTitle,
            solutionDescription: item.solutionDescription,
            impactBadge: item.impactBadge,
            displayOrder: index,
          }))
        );
      }
    }

    if (body.keyBenefits) {
      await db.delete(serviceKeyBenefits).where(eq(serviceKeyBenefits.serviceId, serviceId));
      if (body.keyBenefits.length > 0) {
        await db.insert(serviceKeyBenefits).values(
          body.keyBenefits.map((item: Record<string, unknown>, index: number) => ({
            serviceId,
            title: item.title,
            description: item.description,
            stat: item.stat,
            displayOrder: index,
          }))
        );
      }
    }

    if (body.features) {
      await db.delete(serviceFeatures).where(eq(serviceFeatures.serviceId, serviceId));
      if (body.features.length > 0) {
        await db.insert(serviceFeatures).values(
          body.features.map((item: Record<string, unknown>, index: number) => ({
            serviceId,
            title: item.title,
            description: item.description,
            displayOrder: index,
          }))
        );
      }
    }

    if (body.pricing) {
      await db.delete(servicePricingTiers).where(eq(servicePricingTiers.serviceId, serviceId));
      if (body.pricing.length > 0) {
        await db.insert(servicePricingTiers).values(
          body.pricing.map((item: Record<string, unknown>, index: number) => ({
            serviceId,
            name: item.name,
            price: item.price,
            description: item.description,
            features: item.features,
            popular: item.popular ?? false,
            displayOrder: index,
          }))
        );
      }
    }

    return Response.json(updated);
  } catch (err) {
    console.error("PUT /api/services/[id] error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE — Delete service (admin only)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const serviceId = parseInt(id);

    const [deleted] = await db
      .delete(services)
      .where(eq(services.id, serviceId))
      .returning();

    if (!deleted) {
      return Response.json({ error: "Service not found" }, { status: 404 });
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/services/[id] error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
