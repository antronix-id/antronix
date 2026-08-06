/**
 * Database Seed Script
 * Migrasi semua data existing dari src/data/index.ts ke database PostgreSQL
 *
 * Jalankan: npm run db:seed
 */
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

// Import data existing
import {
  AGENCY,
  NAV_LINKS,
  STATS,
  SERVICES,
  PORTFOLIO,
  TESTIMONIALS,
  WHY_CHOOSE_US,
} from "../../data";

async function seed() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL! });
  const db = drizzle(pool, { schema });

  console.log("🌱 Mulai seeding database...\n");

  try {
    // ============================================
    // 1. Seed Agency Settings
    // ============================================
    console.log("📋 Seeding agency settings...");
    await db.delete(schema.agencySettings);
    await db.insert(schema.agencySettings).values({
      id: 1,
      name: AGENCY.name,
      tagline: AGENCY.tagline,
      description: AGENCY.description,
      email: AGENCY.email,
      phone: AGENCY.phone,
      whatsapp: AGENCY.whatsapp,
      address: AGENCY.address,
      socials: AGENCY.socials,
    });
    console.log("  ✅ Agency settings seeded");

    // ============================================
    // 2. Seed Navigation Links
    // ============================================
    console.log("🔗 Seeding navigation links...");
    await db.delete(schema.navLinks);
    for (let i = 0; i < NAV_LINKS.length; i++) {
      const link = NAV_LINKS[i];
      await db.insert(schema.navLinks).values({
        label: link.label,
        href: link.href,
        displayOrder: i,
        children: link.children || null,
      });
    }
    console.log(`  ✅ ${NAV_LINKS.length} nav links seeded`);

    // ============================================
    // 3. Seed Statistics
    // ============================================
    console.log("📊 Seeding statistics...");
    await db.delete(schema.stats);
    for (let i = 0; i < STATS.length; i++) {
      const stat = STATS[i];
      await db.insert(schema.stats).values({
        value: stat.value,
        suffix: stat.suffix,
        label: stat.label,
        displayOrder: i,
      });
    }
    console.log(`  ✅ ${STATS.length} statistics seeded`);

    // ============================================
    // 4. Seed Services + Relations
    // ============================================
    console.log("🛠️  Seeding services...");
    // Clear all service-related tables (cascade should handle sub-tables)
    await db.delete(schema.serviceTargetAudiences);
    await db.delete(schema.serviceProblemsAndSolutions);
    await db.delete(schema.serviceKeyBenefits);
    await db.delete(schema.serviceFeatures);
    await db.delete(schema.servicePricingTiers);
    await db.delete(schema.services);

    for (let i = 0; i < SERVICES.length; i++) {
      const service = SERVICES[i];

      // Insert main service
      const [insertedService] = await db
        .insert(schema.services)
        .values({
          slug: service.slug,
          title: service.title,
          shortTitle: service.shortTitle,
          icon: service.icon,
          logo: service.logo || null,
          description: service.description,
          shortDescription: service.shortDescription,
          color: service.color,
          gradient: service.gradient,
          displayOrder: i,
        })
        .returning();

      const serviceId = insertedService.id;

      // Insert target audiences
      if (service.targetAudience) {
        for (let j = 0; j < service.targetAudience.length; j++) {
          const audience = service.targetAudience[j];
          await db.insert(schema.serviceTargetAudiences).values({
            serviceId,
            title: audience.title,
            description: audience.description,
            icon: audience.icon || null,
            image: audience.image || null,
            badge: audience.badge || null,
            displayOrder: j,
          });
        }
      }

      // Insert problems & solutions
      if (service.problemsAndSolutions) {
        for (let j = 0; j < service.problemsAndSolutions.length; j++) {
          const ps = service.problemsAndSolutions[j];
          await db.insert(schema.serviceProblemsAndSolutions).values({
            serviceId,
            problemTitle: ps.problemTitle,
            problemDescription: ps.problemDescription,
            solutionTitle: ps.solutionTitle,
            solutionDescription: ps.solutionDescription,
            impactBadge: ps.impactBadge || null,
            displayOrder: j,
          });
        }
      }

      // Insert key benefits
      if (service.keyBenefits) {
        for (let j = 0; j < service.keyBenefits.length; j++) {
          const benefit = service.keyBenefits[j];
          await db.insert(schema.serviceKeyBenefits).values({
            serviceId,
            title: benefit.title,
            description: benefit.description,
            stat: benefit.stat || null,
            displayOrder: j,
          });
        }
      }

      // Insert features
      if (service.features) {
        for (let j = 0; j < service.features.length; j++) {
          const feature = service.features[j];
          await db.insert(schema.serviceFeatures).values({
            serviceId,
            title: feature.title,
            description: feature.description,
            displayOrder: j,
          });
        }
      }

      // Insert pricing tiers
      if (service.pricing) {
        for (let j = 0; j < service.pricing.length; j++) {
          const tier = service.pricing[j];
          await db.insert(schema.servicePricingTiers).values({
            serviceId,
            name: tier.name,
            price: tier.price,
            description: tier.description,
            features: tier.features,
            popular: tier.popular || false,
            displayOrder: j,
          });
        }
      }

      console.log(`  ✅ Service "${service.title}" seeded with all relations`);
    }

    // ============================================
    // 5. Seed Portfolio Items
    // ============================================
    console.log("🖼️  Seeding portfolio items...");
    await db.delete(schema.portfolioItems);

    for (let i = 0; i < PORTFOLIO.length; i++) {
      const item = PORTFOLIO[i];
      await db.insert(schema.portfolioItems).values({
        title: item.title,
        slug: item.slug,
        category: item.category,
        description: item.description,
        thumbnailUrl: item.thumbnailUrl,
        videoUrl: item.videoUrl || null,
        liveUrl: item.liveUrl || null,
        techStack: item.techStack,
        isFeatured: item.isFeatured,
        displayOrder: i,
      });
    }
    console.log(`  ✅ ${PORTFOLIO.length} portfolio items seeded`);

    // ============================================
    // 6. Seed Testimonials
    // ============================================
    console.log("💬 Seeding testimonials...");
    await db.delete(schema.testimonials);

    for (let i = 0; i < TESTIMONIALS.length; i++) {
      const testimonial = TESTIMONIALS[i];
      await db.insert(schema.testimonials).values({
        clientName: testimonial.clientName,
        companyOrRole: testimonial.companyOrRole,
        avatarUrl: testimonial.avatarUrl,
        content: testimonial.content,
        rating: testimonial.rating,
        displayOrder: i,
      });
    }
    console.log(`  ✅ ${TESTIMONIALS.length} testimonials seeded`);

    // ============================================
    // 7. Seed Why Choose Us
    // ============================================
    console.log("⭐ Seeding why choose us...");
    await db.delete(schema.whyChooseUs);

    for (let i = 0; i < WHY_CHOOSE_US.length; i++) {
      const item = WHY_CHOOSE_US[i];
      await db.insert(schema.whyChooseUs).values({
        icon: item.icon,
        title: item.title,
        description: item.description,
        displayOrder: i,
      });
    }
    console.log(`  ✅ ${WHY_CHOOSE_US.length} why choose us items seeded`);

    // ============================================
    // SUMMARY
    // ============================================
    console.log("\n✨ Database seeding selesai!");
    console.log("   Total data yang di-seed:");
    console.log(`   - 1 Agency Settings`);
    console.log(`   - ${NAV_LINKS.length} Navigation Links`);
    console.log(`   - ${STATS.length} Statistics`);
    console.log(`   - ${SERVICES.length} Services (+ relasi)`);
    console.log(`   - ${PORTFOLIO.length} Portfolio Items`);
    console.log(`   - ${TESTIMONIALS.length} Testimonials`);
    console.log(`   - ${WHY_CHOOSE_US.length} Why Choose Us`);
    console.log("\n⚠️  CATATAN: Admin user harus dibuat melalui Better Auth signup.");
    console.log("   Buka http://localhost:3000/login dan buat akun pertama.\n");
  } catch (error) {
    console.error("❌ Seeding gagal:", error);
    throw error;
  } finally {
    await pool.end();
  }
}

seed()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
