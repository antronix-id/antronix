import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  boolean,
  timestamp,
  pgEnum,
  uuid,
  jsonb,
  decimal,
} from "drizzle-orm/pg-core";

// ============================================
// ENUMS
// ============================================
export const userRoleEnum = pgEnum("user_role", ["admin", "editor"]);

// ============================================
// BETTER AUTH TABLES (required by Better Auth)
// ============================================
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  role: userRoleEnum("role").default("admin"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ============================================
// AGENCY CONTENT TABLES
// ============================================

// 1. Agency Settings (singleton row)
export const agencySettings = pgTable("agency_settings", {
  id: integer("id").primaryKey().default(1),
  name: varchar("name", { length: 100 }).notNull(),
  tagline: text("tagline").notNull(),
  description: text("description").notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 30 }).notNull(),
  whatsapp: varchar("whatsapp", { length: 30 }).notNull(),
  address: text("address").notNull(),
  // Social links stored as JSON
  socials: jsonb("socials").notNull().$type<{
    whatsapp: string;
    instagram: string;
    tiktok: string;
    linkedin: string;
    x: string;
    youtube: string;
  }>(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 2. Statistics
export const stats = pgTable("stats", {
  id: serial("id").primaryKey(),
  value: integer("value").notNull(),
  suffix: varchar("suffix", { length: 20 }).notNull(),
  label: varchar("label", { length: 100 }).notNull(),
  displayOrder: integer("display_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 3. Services (main table)
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  title: varchar("title", { length: 100 }).notNull(),
  shortTitle: varchar("short_title", { length: 50 }).notNull(),
  icon: varchar("icon", { length: 50 }).notNull(),
  logo: text("logo"),
  description: text("description").notNull(),
  shortDescription: text("short_description").notNull(),
  color: varchar("color", { length: 50 }).notNull(),
  gradient: varchar("gradient", { length: 100 }).notNull(),
  displayOrder: integer("display_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 3a. Service Target Audiences
export const serviceTargetAudiences = pgTable("service_target_audiences", {
  id: serial("id").primaryKey(),
  serviceId: integer("service_id")
    .references(() => services.id, { onDelete: "cascade" })
    .notNull(),
  title: varchar("title", { length: 100 }).notNull(),
  description: text("description").notNull(),
  icon: varchar("icon", { length: 50 }),
  image: text("image"),
  badge: varchar("badge", { length: 50 }),
  displayOrder: integer("display_order").default(0).notNull(),
});

// 3b. Service Problems & Solutions
export const serviceProblemsAndSolutions = pgTable("service_problems_solutions", {
  id: serial("id").primaryKey(),
  serviceId: integer("service_id")
    .references(() => services.id, { onDelete: "cascade" })
    .notNull(),
  problemTitle: varchar("problem_title", { length: 200 }).notNull(),
  problemDescription: text("problem_description").notNull(),
  solutionTitle: varchar("solution_title", { length: 200 }).notNull(),
  solutionDescription: text("solution_description").notNull(),
  impactBadge: varchar("impact_badge", { length: 50 }),
  displayOrder: integer("display_order").default(0).notNull(),
});

// 3c. Service Key Benefits
export const serviceKeyBenefits = pgTable("service_key_benefits", {
  id: serial("id").primaryKey(),
  serviceId: integer("service_id")
    .references(() => services.id, { onDelete: "cascade" })
    .notNull(),
  title: varchar("title", { length: 100 }).notNull(),
  description: text("description").notNull(),
  stat: varchar("stat", { length: 50 }),
  displayOrder: integer("display_order").default(0).notNull(),
});

// 3d. Service Features
export const serviceFeatures = pgTable("service_features", {
  id: serial("id").primaryKey(),
  serviceId: integer("service_id")
    .references(() => services.id, { onDelete: "cascade" })
    .notNull(),
  title: varchar("title", { length: 100 }).notNull(),
  description: text("description").notNull(),
  displayOrder: integer("display_order").default(0).notNull(),
});

// 3e. Service Pricing Tiers
export const servicePricingTiers = pgTable("service_pricing_tiers", {
  id: serial("id").primaryKey(),
  serviceId: integer("service_id")
    .references(() => services.id, { onDelete: "cascade" })
    .notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  price: varchar("price", { length: 50 }).notNull(),
  description: text("description").notNull(),
  features: jsonb("features").notNull().$type<string[]>(),
  popular: boolean("popular").default(false).notNull(),
  displayOrder: integer("display_order").default(0).notNull(),
});

// 4. Portfolio Items
export const portfolioItems = pgTable("portfolio_items", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  slug: varchar("slug", { length: 200 }).notNull().unique(),
  category: varchar("category", { length: 50 }).notNull(),
  description: text("description").notNull(),
  thumbnailUrl: text("thumbnail_url").notNull(),
  videoUrl: text("video_url"),
  liveUrl: text("live_url"),
  techStack: jsonb("tech_stack").notNull().$type<string[]>(),
  isFeatured: boolean("is_featured").default(false).notNull(),
  displayOrder: integer("display_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 5. Testimonials
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  clientName: varchar("client_name", { length: 100 }).notNull(),
  companyOrRole: varchar("company_or_role", { length: 200 }).notNull(),
  avatarUrl: text("avatar_url").notNull(),
  content: text("content").notNull(),
  rating: integer("rating").notNull().default(5),
  displayOrder: integer("display_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 6. Why Choose Us
export const whyChooseUs = pgTable("why_choose_us", {
  id: serial("id").primaryKey(),
  icon: varchar("icon", { length: 50 }).notNull(),
  title: varchar("title", { length: 100 }).notNull(),
  description: text("description").notNull(),
  displayOrder: integer("display_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 7. Contact Submissions (inbox)
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 30 }),
  subject: varchar("subject", { length: 200 }),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 8. Navigation Links
export const navLinks = pgTable("nav_links", {
  id: serial("id").primaryKey(),
  label: varchar("label", { length: 50 }).notNull(),
  href: varchar("href", { length: 200 }).notNull(),
  displayOrder: integer("display_order").default(0).notNull(),
  // Children stored as JSON for simplicity
  children: jsonb("children").$type<{
    label: string;
    href: string;
    icon?: string;
    logo?: string;
    description?: string;
  }[]>(),
});
