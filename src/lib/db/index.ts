import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env, isDatabaseConfigured } from "@/lib/env";
import * as schema from "./schema";

const connectionString = env.DATABASE_URL;

export const isDatabaseEnabled = isDatabaseConfigured;

let _db: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function getDb() {
  if (!isDatabaseEnabled) return null;
  if (_db) return _db;
  const client = postgres(connectionString!, { prepare: false });
  _db = drizzle(client, { schema });
  return _db;
}

export { schema };
export type { ProductRow, OrderRow } from "./schema";
