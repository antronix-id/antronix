import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { portfolioItems } from "@/lib/db/schema";
import { asc } from "drizzle-orm";
import { headers } from "next/headers";

// GET — Fetch all portfolio items (public)
export async function GET() {
  try {
    const items = await db
      .select()
      .from(portfolioItems)
      .orderBy(asc(portfolioItems.displayOrder));

    return Response.json(items);
  } catch (err) {
    console.error("GET /api/portfolio error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

// POST — Create new portfolio item (admin only)
export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    const [newItem] = await db
      .insert(portfolioItems)
      .values({
        title: body.title,
        slug: body.slug,
        category: body.category,
        description: body.description,
        thumbnailUrl: body.thumbnailUrl,
        videoUrl: body.videoUrl,
        liveUrl: body.liveUrl,
        techStack: body.techStack || [],
        isFeatured: body.isFeatured ?? false,
        displayOrder: body.displayOrder ?? 0,
      })
      .returning();

    return Response.json(newItem, { status: 201 });
  } catch (err) {
    console.error("POST /api/portfolio error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
