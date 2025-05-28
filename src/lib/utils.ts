import { files, folders, type Section } from "@/constants";
import { files_schema, folders_schema } from "@/server/db/schema";
import type { IFile, IFolder } from "@/types";
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

//? ai generated code

export function getSectionTitle(section: Section): string {
  switch (section) {
    case "my-drive":
      return "My Drive";
    case "shared":
      return "Shared with me";
    case "recent":
      return "Recent";
    case "starred":
      return "Starred";
    case "trash":
      return "Trash";
    default:
      return "My Drive";
  }
}

export function getCurrentData(
  section: Section,
  folders: IFolder[],
  files: IFile[],
): { folders: IFolder[]; files: IFile[] } {
  switch (section) {
    case "my-drive":
      const currentFolders = folders?.filter(
        (folder) => folder.section === "my-drive",
      );
      const currentFiles = files?.filter((file) => {
        const parentFolder = folders.find(
          (f) => f.folder_id === file?.parentId,
        );
        return parentFolder?.section === "my-drive";
      });
      return { folders: currentFolders, files: currentFiles };

    case "shared":
      return {
        folders: folders?.filter((folder) => folder.section === "shared"),
        files: files?.filter((file) => {
          const parentFolder = folders.find(
            (f) => f.folder_id === file.parentId,
          );
          return parentFolder?.section === "shared";
        }),
      };

    case "recent":
      return {
        folders: folders?.filter((folder) => folder.section === "recent"),
        files: getRecentFiles(),
      };

    case "starred":
      return {
        folders: folders?.filter((folder) => folder.section === "starred"),
        files: getStarredFiles(),
      };

    case "trash":
      return {
        folders: folders?.filter((folder) => folder.section === "trash"),
        files: files?.filter((file) => {
          const parentFolder = folders.find(
            (f) => f.folder_id === file.parentId,
          );
          return parentFolder?.section === "trash";
        }),
      };

    default:
      return { folders: [], files: [] };
  }
}
