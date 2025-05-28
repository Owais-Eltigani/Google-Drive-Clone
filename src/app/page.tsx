"use client";

import { useEffect, useState } from "react";
import type { IFile, IFolder } from "@/types";
import { folders as mockFolders, files as mockFiles } from "@/constants";
import { getCurrentData } from "@/lib/utils";
import { useDriveNavigation } from "@/components/drive-navigation";
import { DriveHeader } from "@/components/header";
import { DriveSidebar } from "@/components/sidebar";
import { DriveToolbar } from "@/components/toolbar";
import { FileGridView } from "@/components/grid-view";
import { FileListView } from "@/components/list-view";
import { EmptyState } from "@/components/empty-state";

export default function GoogleDriveClone() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [folders, setFolders] = useState<IFolder[] | null>(null);
  const [files, setFiles] = useState<IFile[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    currentSection,
    currentPath,
    navigateToFolder,
    navigateToPath,
    handleSectionChange,
  } = useDriveNavigation();

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setFolders(mockFolders);
      setFiles(mockFiles);
      setIsLoading(false);
    }, 500);
  }, []);

  // Handle browser navigation
  useEffect(() => {
    const handlePopState = () => {
      // Component will re-render automatically due to searchParams change
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleFolderClick = (folderName: string) => {
    navigateToFolder(folderName, folders);
  };

  const handleToggleStarred = (fileId: string) => {
    console.log(`Toggle starred for file: ${fileId}`);
  };

  const handleRestoreFromTrash = (itemId: string) => {
    console.log(`Restore item: ${itemId}`);
  };

  const handlePermanentlyDelete = (itemId: string) => {
    console.log(`Permanently delete item: ${itemId}`);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  const currentData = getCurrentData(currentSection, folders, files);
  const hasNoContent =
    currentData.folders?.length === 0 && currentData.files?.length === 0;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <DriveHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <div className="flex">
        <DriveSidebar
          currentSection={currentSection}
          onSectionChange={handleSectionChange}
        />

        <main className="flex-1 bg-white dark:bg-gray-900">
          <DriveToolbar
            currentSection={currentSection}
            currentPath={currentPath}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onNavigateToPath={navigateToPath}
          />

          <div className="p-6">
            {hasNoContent ? (
              <EmptyState section={currentSection} />
            ) : viewMode === "grid" ? (
              <FileGridView
                folders={currentData.folders}
                files={currentData.files}
                currentSection={currentSection}
                onFolderClick={handleFolderClick}
                onToggleStarred={handleToggleStarred}
                onRestoreFromTrash={handleRestoreFromTrash}
                onPermanentlyDelete={handlePermanentlyDelete}
              />
            ) : (
              <FileListView
                folders={currentData.folders}
                files={currentData.files}
                currentSection={currentSection}
                onFolderClick={handleFolderClick}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
