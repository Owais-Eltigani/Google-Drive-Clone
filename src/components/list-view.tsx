"use client";

import { Folder, StarIcon } from "lucide-react";
import type { IFile, IFolder } from "../types";
import type { Section } from "../constants";
import { getFileIcon } from "./google-drive";

interface FileListViewProps {
  folders: IFolder[];
  files: IFile[];
  currentSection: Section;
  onFolderClick: (folderName: string) => void;
}

export function FileListView({
  folders,
  files,
  currentSection,
  onFolderClick,
}: FileListViewProps) {
  return (
    <div className="space-y-1">
      {/* List Header */}
      <div className="grid grid-cols-12 gap-4 border-b px-4 py-2 text-sm font-medium text-gray-600 dark:border-gray-700 dark:text-gray-400">
        <div className="col-span-6">Name</div>
        <div className="col-span-2">
          {currentSection === "shared"
            ? "Owner"
            : currentSection === "trash"
              ? "Deleted"
              : "Owner"}
        </div>
        <div className="col-span-2">Last modified</div>
        <div className="col-span-2">File size</div>
      </div>

      {/* Folders */}
      {folders?.map((folder) => (
        <div
          key={folder.folder_id}
          className="group grid cursor-pointer grid-cols-12 gap-4 rounded-lg px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800"
          onClick={() => onFolderClick(folder.name)}
        >
          <div className="col-span-6 flex items-center gap-3">
            <Folder className="h-5 w-5 text-blue-500" />
            <span className="text-sm text-gray-700 group-hover:text-blue-600 dark:text-gray-300">
              {folder.name}
            </span>
          </div>
          <div className="col-span-2 text-sm text-gray-500 dark:text-gray-400">
            {currentSection === "shared"
              ? "Sally"
              : currentSection === "trash"
                ? "Sam"
                : "me"}
          </div>
          <div className="col-span-2 text-sm text-gray-500 dark:text-gray-400">
            —
          </div>
          <div className="col-span-2 text-sm text-gray-500 dark:text-gray-400">
            {folder.itemCount || 0} items
          </div>
        </div>
      ))}

      {/* Files */}
      {files?.map((file) => (
        <div
          key={file.file_id}
          className="group grid grid-cols-12 gap-4 rounded-lg px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <div className="col-span-6 flex items-center gap-3">
            <div className="relative">
              {getFileIcon(file.type)}
              {file.starred && (
                <StarIcon className="absolute -top-1 -right-1 h-3 w-3 fill-yellow-500 text-yellow-500" />
              )}
            </div>
            <a
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-700 hover:text-blue-600 hover:underline dark:text-gray-300"
            >
              {file.filename}
            </a>
          </div>
          <div className="col-span-2 text-sm text-gray-500 dark:text-gray-400">
            {currentSection === "shared"
              ? "Sally"
              : currentSection === "trash"
                ? "John Doe"
                : "me"}
          </div>
          <div className="col-span-2 text-sm text-gray-500 dark:text-gray-400">
            {file.modified}
          </div>
          <div className="col-span-2 text-sm text-gray-500 dark:text-gray-400">
            {file.size}
          </div>
        </div>
      ))}
    </div>
  );
}
