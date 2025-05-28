"use client";

import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Grid3X3, List, Home, Users, Clock, Star, Trash2 } from "lucide-react";
import type { Section } from "../constants";
import { getSectionTitle } from "../lib/utils";

interface DriveToolbarProps {
  currentSection: Section;
  currentPath: string;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  onNavigateToPath: (index: number) => void;
}

export function DriveToolbar({
  currentSection,
  currentPath,
  viewMode,
  onViewModeChange,
  onNavigateToPath,
}: DriveToolbarProps) {
  const pathSegments = currentPath.split("/").filter(Boolean);

  return (
    <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
      <Breadcrumb>
        <BreadcrumbList>
          {currentSection === "my-drive" ? (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="#"
                  onClick={() => onNavigateToPath(-1)}
                  className="flex items-center gap-1"
                >
                  <Home className="h-4 w-4" />
                  My Drive
                </BreadcrumbLink>
              </BreadcrumbItem>
              {pathSegments.map((segment, index) => (
                <div key={index} className="flex items-center">
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {index === pathSegments.length - 1 ? (
                      <BreadcrumbPage>{segment}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink
                        href="#"
                        onClick={() => onNavigateToPath(index)}
                      >
                        {segment}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </div>
              ))}
            </>
          ) : (
            <BreadcrumbItem>
              <BreadcrumbPage className="flex items-center gap-2">
                {currentSection === "shared" && <Users className="h-4 w-4" />}
                {currentSection === "recent" && <Clock className="h-4 w-4" />}
                {currentSection === "starred" && <Star className="h-4 w-4" />}
                {currentSection === "trash" && <Trash2 className="h-4 w-4" />}
                {getSectionTitle(currentSection)}
              </BreadcrumbPage>
            </BreadcrumbItem>
          )}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex items-center gap-2">
        <Button
          variant={viewMode === "grid" ? "secondary" : "ghost"}
          size="icon"
          onClick={() => onViewModeChange("grid")}
        >
          <Grid3X3 className="h-4 w-4" />
        </Button>
        <Button
          variant={viewMode === "list" ? "secondary" : "ghost"}
          size="icon"
          onClick={() => onViewModeChange("list")}
        >
          <List className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
