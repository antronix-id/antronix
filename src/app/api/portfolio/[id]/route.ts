import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { portfolioItems } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

// GET — Fetch single portfolio item
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const [item] = await db
      .select()
      .from(portfolioItems)
      .where(eq(portfolioItems.id, parseInt(id)))
      .limit(1);

    if (!item) {
      return Response.json({ error: "Item not found" }, { status: 404 });
    }

    return Response.json(item);
  } catch (err) {
    console.error("GET /api/portfolio/[id] error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

// PUT — Update portfolio item (admin only)
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
    const body = await request.json();

    const [updated] = await db
      .update(portfolioItems)
      .set({
        title: body.title,
        slug: body.slug,
        category: body.category,
        description: body.description,
        thumbnailUrl: body.thumbnailUrl,
        videoUrl: body.videoUrl,
        liveUrl: body.liveUrl,
        techStack: body.techStack,
        isFeatured: body.isFeatured,
        displayOrder: body.displayOrder,
        updatedAt: new Date(),
      })
      .where(eq(portfolioItems.id, parseInt(id)))
      .returning();

    if (!updated) {
      return Response.json({ error: "Item not found" }, { status: 404 });
    }

    return Response.json(updated);
  } catch (err) {
    console.error("PUT /api/portfolio/[id] error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE — Delete portfolio item (admin only)
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

    const [deleted] = await db
      .delete(portfolioItems)
      .where(eq(portfolioItems.id, parseInt(id)))
      .returning();

    if (!deleted) {
      return Response.json({ error: "Item not found" }, { status: 404 });
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/portfolio/[id] error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
