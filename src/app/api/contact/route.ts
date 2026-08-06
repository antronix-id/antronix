import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { contactSubmissions } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { headers } from "next/headers";

// POST — Submit contact form (public)
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.email || !body.message) {
      return Response.json(
        { error: "Nama, email, dan pesan wajib diisi" },
        { status: 400 }
      );
    }

    const [submission] = await db
      .insert(contactSubmissions)
      .values({
        name: body.name,
        email: body.email,
        phone: body.phone,
        subject: body.subject,
        message: body.message,
      })
      .returning();

    return Response.json(
      { success: true, id: submission.id },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/contact error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

// GET — Fetch all contact submissions (admin only)
export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const submissions = await db
      .select()
      .from(contactSubmissions)
      .orderBy(desc(contactSubmissions.createdAt));

    return Response.json(submissions);
  } catch (err) {
    console.error("GET /api/contact error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

// PATCH — Mark contact as read (admin only)
export async function PATCH(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    const [updated] = await db
      .update(contactSubmissions)
      .set({ isRead: true })
      .where(eq(contactSubmissions.id, body.id))
      .returning();

    if (!updated) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }

    return Response.json(updated);
  } catch (err) {
    console.error("PATCH /api/contact error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
