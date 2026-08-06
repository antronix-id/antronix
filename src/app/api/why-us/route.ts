import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { whyChooseUs } from "@/lib/db/schema";
import { asc } from "drizzle-orm";
import { headers } from "next/headers";

// GET — Fetch all why choose us items (public)
export async function GET() {
  try {
    const items = await db
      .select()
      .from(whyChooseUs)
      .orderBy(asc(whyChooseUs.displayOrder));

    return Response.json(items);
  } catch (err) {
    console.error("GET /api/why-us error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

// POST — Create new item (admin only)
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
      .insert(whyChooseUs)
      .values({
        icon: body.icon,
        title: body.title,
        description: body.description,
        displayOrder: body.displayOrder ?? 0,
      })
      .returning();

    return Response.json(newItem, { status: 201 });
  } catch (err) {
    console.error("POST /api/why-us error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
