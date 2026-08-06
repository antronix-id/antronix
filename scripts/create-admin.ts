import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function createAdmin() {
  const email = "admin@antronix.com";
  const password = "AdminPassword123!";
  const name = "Admin Antronix";

  console.log(`🔐 Membuat akun admin: ${email}...`);

  try {
    const { auth } = await import("../src/lib/auth");

    const res = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });

    console.log("\n=========================================");
    console.log("  🎉 AKUN ADMIN BERHASIL DIBUAT!");
    console.log("=========================================");
    console.log(`  Email    : ${email}`);
    console.log(`  Password : ${password}`);
    console.log("=========================================");
    console.log("  Gunakan kredensial di atas untuk login di http://localhost:3000/login\n");
  } catch (error: any) {
    console.error("❌ Gagal membuat akun admin:", error?.message || error);
  }
}

createAdmin()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
