import { singlestoreTableCreator } from "drizzle-orm/singlestore-core";

export const createTable = singlestoreTableCreator(
  (name) => `db_owais_52cdd_${name}`,
);
