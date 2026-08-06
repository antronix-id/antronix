import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { Pool } from "pg";

async function check() {
  const p = new Pool({ connectionString: process.env.DATABASE_URL });
  try {
    const res = await p.query(
      "SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'user'"
    );
    console.log("USER COLUMNS IN DB:", res.rows);
  } catch (err) {
    console.error("ERROR:", err);
  } finally {
    await p.end();
  }
}
check();
