import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function testSelectUser() {
  // Dynamically import db AFTER dotenv has loaded process.env
  const { db } = await import("../src/lib/db");
  const { user } = await import("../src/lib/db/schema");
  const { eq } = await import("drizzle-orm");

  try {
    const res = await db.select().from(user).where(eq(user.email, "admin@antronix.com"));
    console.log("SUCCESS! SELECT RES:", res);
  } catch (err) {
    console.error("EXACT DB ERROR:", err);
  }
}

testSelectUser()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
