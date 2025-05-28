"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Upload,
  Folder,
  FileText,
  Home,
  Users,
  Clock,
  Star,
  Trash2,
} from "lucide-react";
import type { Section } from "../constants";

interface DriveSidebarProps {
  currentSection: Section;
  onSectionChange: (section: Section) => void;
}

export function DriveSidebar({
  currentSection,
  onSectionChange,
}: DriveSidebarProps) {
  return (
    <aside className="h-[calc(100vh-73px)] w-64 border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <div className="p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-full justify-start gap-2 bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4" />
              New
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuItem>
              <Folder className="mr-2 h-4 w-4" />
              Folder
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Upload className="mr-2 h-4 w-4" />
              File upload
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FileText className="mr-2 h-4 w-4" />
              Google Docs
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <nav className="px-2">
        <div className="space-y-1">
          <Button
            variant={currentSection === "my-drive" ? "secondary" : "ghost"}
            className="w-full justify-start gap-3"
            onClick={() => onSectionChange("my-drive")}
          >
            <Home className="h-5 w-5" />
            My Drive
          </Button>
          <Button
            variant={currentSection === "shared" ? "secondary" : "ghost"}
            className="w-full justify-start gap-3"
            onClick={() => onSectionChange("shared")}
          >
            <Users className="h-5 w-5" />
            Shared with me
          </Button>
          <Button
            variant={currentSection === "recent" ? "secondary" : "ghost"}
            className="w-full justify-start gap-3"
            onClick={() => onSectionChange("recent")}
          >
            <Clock className="h-5 w-5" />
            Recent
          </Button>
          <Button
            variant={currentSection === "starred" ? "secondary" : "ghost"}
            className="w-full justify-start gap-3"
            onClick={() => onSectionChange("starred")}
          >
            <Star className="h-5 w-5" />
            Starred
          </Button>
          <Button
            variant={currentSection === "trash" ? "secondary" : "ghost"}
            className="w-full justify-start gap-3"
            onClick={() => onSectionChange("trash")}
          >
            <Trash2 className="h-5 w-5" />
            Trash
          </Button>
        </div>
      </nav>

      <div className="mt-8 px-4">
        <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">
          Storage
        </div>
        <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className="h-2 rounded-full bg-blue-600"
            style={{ width: "45%" }}
          ></div>
        </div>
        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          6.8 GB of 15 GB used
        </div>
      </div>
    </aside>
  );
}
