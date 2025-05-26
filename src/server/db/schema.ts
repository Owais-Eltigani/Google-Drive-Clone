import { boolean } from "drizzle-orm/gel-core";
import { date } from "drizzle-orm/mysql-core";
import {
  int,
  text,
  singlestoreTableCreator,
  bigint,
} from "drizzle-orm/singlestore-core";

export const createTable = singlestoreTableCreator(
  (name) => `db_owais_52cdd_${name}`,
);

export const files_schema = createTable("files", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  url: text("url").notNull(),
  parentId: bigint("parentId", { mode: "number" }).notNull(),
  type: text("type").notNull(),
  size: int("size").notNull(),
  modified: date("modified").notNull(),
  starred: boolean("starred").notNull(),
  filename: text("filename").notNull(),
  file_id: text("file_id").notNull(),
});

export const folders_schema = createTable("folders", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  name: text("name").notNull(),
  parentId: text("parentId").notNull(),
  itemCount: bigint("itemCount", { mode: "number" }).notNull(),
  section: text("section").notNull(),
  folder_id: text("folder_id").notNull(),
});

// export type DB_FolderType = typeof folders_table.$inferSelect;
// Create table with prefix for SingleStore
// export const createTable = singlestoreTableCreator(
//   (name) => `db_owais_52cdd_${name}`,
// );

// export const files_schema = createTable("files", {
//   id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
//   url: text("url").notNull(),
//   parentId: bigint("parentId", { mode: "number" }).notNull(),
//   type: text("type").notNull(),
//   size: int("size").notNull(),
//   modified: date("modified").notNull(),
//   starred: boolean("starred").notNull(),
//   filename: text("filename").notNull(),
// });

// export const folders_schema = createTable("folders", {
//   id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
//   name: text("name").notNull(),
//   parentId: bigint("parentId", { mode: "number" }),
//   itemCount: int("itemCount").notNull(),
//   section: text("section").notNull(),
// });

//! theo code
// export const createTable = singlestoreTableCreator(
//   (name) => `db_owais_52cdd_${name}`,
// );

// export const folders_schema = createTable(
//   "folders",
//   {
//     id: bigint("id", { mode: "bigint" }).primaryKey().autoincrement(),
//     name: text("name"),
//     parentId: bigint("parentId", { mode: "number", unsigned: true }),
//     itemCount: int("itemCount"),
//     section: text("section"),
//   },
//   // (table) => {
//   //   return [index("parent_index").on(table.parentId)];
//   // },
// );

// export const files_schema = createTable(
//   "files",
//   {
//     id: bigint("id", { mode: "bigint" }).primaryKey().autoincrement(),
//     url: text("url").notNull(),
//     parentId: bigint("parentId", { mode: "number", unsigned: true }).notNull(),
//     type: text("type").notNull(),
//     size: int("size").notNull(),
//     modified: date("modified").notNull(),
//     starred: boolean("starred").notNull(),
//     filename: text("filename").notNull(),
//   },
// (table) => {
//   return [index("parent_index").on(table.parentId)];
// },
// );
