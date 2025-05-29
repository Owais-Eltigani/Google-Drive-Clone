import { boolean, date, int, text, bigint } from "drizzle-orm/singlestore-core";
import { db } from "./index";
import { createTable } from "./createTable";

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
  parentId: bigint("parentId", { mode: "number" }).notNull(),
  itemCount: int("itemCount").notNull(),
  section: text("section").notNull(),
  folder_id: text("folder_id").notNull(),
});

//? uploadThings methods

export const uploadFile = async (input: {
  file: {
    file_id: string;
    filename: string;
    type: string; // e.g., "pdf", "image", "video", etc.
    size: string; // e.g., "2.1 MB"
    parentId: string; // For files in folders  //TODO add parent ID for files in folders
    url: string; // URL to access the file
    modified: string; // Last modified date
    starred: boolean; // Whether t
  };
  userId: string;
}) => {
  return await db.insert(files_schema).values(input);
};

export async function handleFileUpload(fileData: {
  name: string;
  type: string;
  size: number;
  url: string;
  userId: string;
}) {
  try {
    await db.insert(files_schema).values({
      file_id: fileData.name,
      filename: fileData.name,
      type: fileData.type,
      size: fileData.size,
      parentId: BigInt(0), // Root folder
      url: fileData.url,
      modified: new Date(),
      starred: false,
    });
    return true;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error("Failed to save file data");
  }
}
