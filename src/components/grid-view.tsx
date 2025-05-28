"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Folder,
  MoreVertical,
  StarIcon,
  Share,
  Download,
  Star,
  Trash2,
  Upload,
} from "lucide-react";
import type { IFile, IFolder } from "../types";
import type { Section } from "../constants";
import { getFileIcon } from "./google-drive";

interface FileGridViewProps {
  folders: IFolder[];
  files: IFile[];
  currentSection: Section;
  onFolderClick: (folderName: string) => void;
  onToggleStarred: (fileId: string) => void;
  onRestoreFromTrash: (itemId: string) => void;
  onPermanentlyDelete: (itemId: string) => void;
}

export function FileGridView({
  folders,
  files,
  currentSection,
  onFolderClick,
  onToggleStarred,
  onRestoreFromTrash,
  onPermanentlyDelete,
}: FileGridViewProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {/* Folders */}
      {folders?.map((folder) => (
        <div
          key={folder.folder_id}
          className="group cursor-pointer"
          onClick={() => onFolderClick(folder.name)}
        >
          <div className="flex flex-col items-center rounded-lg p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
            <Folder className="mb-2 h-12 w-12 text-blue-500" />
            <span className="text-center text-sm text-gray-700 group-hover:text-blue-600 dark:text-gray-300">
              {folder.name}
            </span>
            <span className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {currentSection === "trash"
                ? `Deleted Sam`
                : `${folder.itemCount || 0} items`}
            </span>
            {currentSection === "shared" && (
              <span className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                by Mikel
              </span>
            )}
          </div>
        </div>
      ))}

      {/* Files */}
      {files?.map((file) => (
        <div key={file.file_id} className="group">
          <div className="relative">
            <a
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block flex flex-col items-center rounded-lg p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <div className="relative">
                {getFileIcon(file.type)}
                {file.starred && (
                  <StarIcon className="absolute -top-1 -right-1 h-4 w-4 fill-yellow-500 text-yellow-500" />
                )}
              </div>
              <span className="mt-2 text-center text-sm text-gray-700 group-hover:text-blue-600 dark:text-gray-300">
                {file.filename}
              </span>
              <span className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {file.size}
              </span>
              {currentSection === "shared" && (
                <span className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                  by Sally
                </span>
              )}
              {currentSection === "trash" && (
                <span className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                  Deleted John Doe
                </span>
              )}
            </a>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {currentSection === "trash" ? (
                  <>
                    <DropdownMenuItem
                      onClick={() => onRestoreFromTrash(file.file_id)}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      Restore
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => onPermanentlyDelete(file.file_id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete forever
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem>
                      <Share className="mr-2 h-4 w-4" />
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onToggleStarred(file.file_id)}
                    >
                      <Star className="mr-2 h-4 w-4" />
                      {file.starred ? "Remove from starred" : "Add to starred"}
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Move to trash
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  );
}
