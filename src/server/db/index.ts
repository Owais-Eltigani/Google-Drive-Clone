import { createClient, type Client } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import { env } from "@/env";
import * as schema from "./schema";
import { defineConfig } from "drizzle-kit";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  client: Client | undefined;
};

const conn =
  globalForDb.client ??
  createClient({
    // url: `${process.env.DATABASE_HOST!}://${process.env.DATABASE_USER!}:${process
    //   .env
    //   .DATABASE_PASSWORD!}@${process.env.DATABASE_NAME!}:${process.env.DATABASE_PORT!}`,
    host: process.env.DATABASE_HOST!,
    user: process.env.DATABASE_USER!,
    password: process.env.DATABASE_PASSWORD!,
    port: process.env.DATABASE_PORT!,
    database: process.env.DATABASE_NAME!,
    ssl: {},
    maxIdle: 0,
  });

export const client =
  globalForDb.client ?? createClient({ url: env.DATABASE_URL });
if (env.NODE_ENV !== "production") globalForDb.client = client;

export const db = drizzle(client, { schema });
