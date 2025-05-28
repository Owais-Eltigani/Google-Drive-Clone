// drizzle.config.ts

import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "singlestore",
  schema: "./src/server/db/schema.ts",
  dbCredentials: {
    host: process.env.DATABASE_HOST!,
    user: process.env.DATABASE_USER!,
    password: process.env.DATABASE_PASSWORD!,
    port: process.env.DATABASE_PORT
      ? parseInt(process.env.DATABASE_PORT)
      : 3306,
    database: process.env.DATABASE_NAME!,
    ssl: {},
  },
});
