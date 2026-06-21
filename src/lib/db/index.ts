import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

export const isDatabaseEnabled = Boolean(connectionString);

let _db: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function getDb() {
  if (!isDatabaseEnabled) return null;
  if (_db) return _db;
  const client = postgres(connectionString!, { prepare: false });
  _db = drizzle(client, { schema });
  return _db;
}

export { schema };
