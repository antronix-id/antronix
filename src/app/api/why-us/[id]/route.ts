import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { whyChooseUs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

// GET — Fetch single item
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const [item] = await db
      .select()
      .from(whyChooseUs)
      .where(eq(whyChooseUs.id, parseInt(id)))
      .limit(1);

    if (!item) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }

    return Response.json(item);
  } catch (err) {
    console.error("GET /api/why-us/[id] error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

// PUT — Update item (admin only)
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
      .update(whyChooseUs)
      .set({
        icon: body.icon,
        title: body.title,
        description: body.description,
        displayOrder: body.displayOrder,
        updatedAt: new Date(),
      })
      .where(eq(whyChooseUs.id, parseInt(id)))
      .returning();

    if (!updated) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }

    return Response.json(updated);
  } catch (err) {
    console.error("PUT /api/why-us/[id] error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE — Delete item (admin only)
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
      .delete(whyChooseUs)
      .where(eq(whyChooseUs.id, parseInt(id)))
      .returning();

    if (!deleted) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/why-us/[id] error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
