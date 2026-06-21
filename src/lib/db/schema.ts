import {
  pgTable,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
  uuid,
} from "drizzle-orm/pg-core";

/**
 * Drizzle schema for the optional Postgres backend.
 * Mirrors the shape of `types/Product`. Run `npm run db:push` to apply.
 */

export const products = pgTable("products", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  details: jsonb("details").$type<string[]>().notNull().default([]),
  price: integer("price").notNull(),
  compareAtPrice: integer("compare_at_price"),
  category: text("category").notNull(),
  collection: text("collection").notNull(),
  sizes: jsonb("sizes").$type<string[]>().notNull().default([]),
  colors: jsonb("colors")
    .$type<{ name: string; hex: string }[]>()
    .notNull()
    .default([]),
  images: jsonb("images").$type<string[]>().notNull().default([]),
  tags: jsonb("tags").$type<string[]>().notNull().default([]),
  inStock: boolean("in_stock").notNull().default(true),
  featured: boolean("featured").notNull().default(false),
  newArrival: boolean("new_arrival").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id"),
  email: text("email").notNull(),
  status: text("status").notNull().default("pending"),
  total: integer("total").notNull(),
  items: jsonb("items").$type<unknown[]>().notNull().default([]),
  stripeSessionId: text("stripe_session_id"),
  shippingAddress: jsonb("shipping_address"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type ProductRow = typeof products.$inferSelect;
export type OrderRow = typeof orders.$inferSelect;
