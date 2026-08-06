import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { stats } from "@/lib/db/schema";
import { asc } from "drizzle-orm";
import { headers } from "next/headers";

// GET — Fetch all statistics (public)
export async function GET() {
  try {
    const items = await db
      .select()
      .from(stats)
      .orderBy(asc(stats.displayOrder));

    return Response.json(items);
  } catch (err) {
    console.error("GET /api/stats error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

// PUT — Bulk update all statistics (admin only)
export async function PUT(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const items: Array<{ id?: number; value: number; suffix: string; label: string }> = body.stats;

    // Delete all existing and re-insert (simple bulk replace)
    await db.delete(stats);

    if (items.length > 0) {
      const inserted = await db
        .insert(stats)
        .values(
          items.map((item, index) => ({
            value: item.value,
            suffix: item.suffix,
            label: item.label,
            displayOrder: index,
          }))
        )
        .returning();

      return Response.json(inserted);
    }

    return Response.json([]);
  } catch (err) {
    console.error("PUT /api/stats error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
