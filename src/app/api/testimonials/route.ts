import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import { asc } from "drizzle-orm";
import { headers } from "next/headers";

// GET — Fetch all testimonials (public)
export async function GET() {
  try {
    const items = await db
      .select()
      .from(testimonials)
      .orderBy(asc(testimonials.displayOrder));

    return Response.json(items);
  } catch (err) {
    console.error("GET /api/testimonials error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

// POST — Create new testimonial (admin only)
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
      .insert(testimonials)
      .values({
        clientName: body.clientName,
        companyOrRole: body.companyOrRole,
        avatarUrl: body.avatarUrl,
        content: body.content,
        rating: body.rating ?? 5,
        displayOrder: body.displayOrder ?? 0,
      })
      .returning();

    return Response.json(newItem, { status: 201 });
  } catch (err) {
    console.error("POST /api/testimonials error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
