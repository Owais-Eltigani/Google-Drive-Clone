import { files, folders } from "@/constants";
import { files_schema, folders_schema } from "@/server/db/schema";
import type { IFile } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getAllFiles = () => {
  const allFiles: IFile[] = [];
  for (const fileDate of files) {
    allFiles.push(fileDate);
  }
  return allFiles;
};

export const getStarredFiles = () => {
  return getAllFiles().filter((file) => file.starred);
};

export const getRecentFiles = () => {
  const allFiles = getAllFiles();
  // Sort by modified date (most recent first)
  return allFiles
    .sort((a, b) => {
      const dateA = new Date(
        a.modified.includes("day")
          ? Date.now() - Number.parseInt(a.modified) * 24 * 60 * 60 * 1000
          : Date.now(),
      );
      const dateB = new Date(
        b.modified.includes("day")
          ? Date.now() - Number.parseInt(b.modified) * 24 * 60 * 60 * 1000
          : Date.now(),
      );
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, 10); // Show only 10 most recent
};
