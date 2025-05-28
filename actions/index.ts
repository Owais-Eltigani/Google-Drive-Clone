"use server";

import { files, folders } from "@/constants";
import { db } from "@/server/db";
import { files_schema, folders_schema } from "@/server/db/schema";

export const seedingFunction = async () => {
  // Helper function to convert size strings to bytes
  const convertSize = (size: string): number => {
    const num = parseFloat(size.split(" ")[0]);
    const unit = size.split(" ")[1];
    switch (unit.toLowerCase()) {
      case "kb":
        return Math.round(num * 1024);
      case "mb":
        return Math.round(num * 1024 * 1024);
      case "gb":
        return Math.round(num * 1024 * 1024 * 1024);
      default:
        return Math.round(num);
    }
  };

  try {
    // seed the database with initial files
    await db.insert(files_schema).values(
      files.map((file) => ({
        url: file.url,
        file_id: file.file_id, // Ensure unique identifier
        parentId: BigInt(file.parentId || 0), // Convert to BigInt with fallback
        type: file.type,
        size: convertSize(file.size), // Convert string size to number
        modified: new Date(file.modified),
        starred: Boolean(file.starred), // Ensure boolean type
        filename: file.name,
      })),
    );

    await db.insert(folders_schema).values(
      folders.map((folder) => ({
        name: folder.name,
        parentId: folder.parentId, // Convert to BigInt with fallback
        itemCount: folder.itemCount,
        section: folder.section,
        folder_id: folder.folder_id, // Ensure unique identifier
      })),
    );

    console.log("Files seeded successfully");
  } catch (error) {
    console.error("Error seeding files:", error);
    throw error;
  }
};

export const getFolder = async () => {
  try {
    const fetchedFolders = await db.select().from(folders_schema);
    return { data: fetchedFolders, message: "success", status: 200 };
  } catch (error) {
    console.error("Error fetching folders:", error);
    return { folders: [], message: "error", status: 500 };
  }
};

export const getFiles = async () => {
  try {
    const fetchedfiles = await db.select().from(files_schema);
    return { data: fetchedfiles, message: "success", status: 200 };
  } catch (error) {
    console.error("Error fetching files:", error);
    return { files: [], message: "error", status: 500 };
  }
};
