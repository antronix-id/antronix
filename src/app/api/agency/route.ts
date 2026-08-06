import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { agencySettings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

// GET — Fetch agency settings (public)
export async function GET() {
  try {
    const [settings] = await db
      .select()
      .from(agencySettings)
      .where(eq(agencySettings.id, 1))
      .limit(1);

    if (!settings) {
      return Response.json({ error: "Settings not found" }, { status: 404 });
    }

    return Response.json(settings);
  } catch (err) {
    console.error("GET /api/agency error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

// PUT — Update agency settings (admin only)
export async function PUT(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    const [updated] = await db
      .update(agencySettings)
      .set({
        name: body.name,
        tagline: body.tagline,
        description: body.description,
        email: body.email,
        phone: body.phone,
        whatsapp: body.whatsapp,
        address: body.address,
        socials: body.socials,
        updatedAt: new Date(),
      })
      .where(eq(agencySettings.id, 1))
      .returning();

    return Response.json(updated);
  } catch (err) {
    console.error("PUT /api/agency error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
