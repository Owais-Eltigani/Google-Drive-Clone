"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Section } from "../constants";
import type { IFolder } from "@/types";

export function useDriveNavigation() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSection = (searchParams.get("section") as Section) || "my-drive";
  const currentPath = searchParams.get("path") ?? "/";

  const navigateToFolder = (folderName: string, folders: IFolder[]) => {
    if (currentSection !== "my-drive") return;

    const newPath =
      currentPath === "/" ? `/${folderName}` : `${currentPath}/${folderName}`;
    const folderExists = folders?.some(
      (folder) => folder.name === folderName && folder.section === "my-drive",
    );

    if (folderExists) {
      const params = new URLSearchParams(searchParams);
      params.set("path", newPath);
      router.push(`?${params.toString()}`);
    }
  };

  const navigateToPath = (index: number) => {
    if (currentSection !== "my-drive") return;

    const pathSegments = currentPath.split("/").filter(Boolean);
    const params = new URLSearchParams(searchParams);

    if (index === -1) {
      params.set("path", "/");
    } else {
      const newPath = "/" + pathSegments.slice(0, index + 1).join("/");
      params.set("path", newPath);
    }
    router.push(`?${params.toString()}`);
  };

  const handleSectionChange = (section: Section) => {
    const params = new URLSearchParams(searchParams);
    params.set("section", section);
    if (section === "my-drive") {
      params.set("path", "/");
    } else {
      params.delete("path");
    }
    router.push(`?${params.toString()}`);
  };

  return {
    currentSection,
    currentPath,
    navigateToFolder,
    navigateToPath,
    handleSectionChange,
  };
}
